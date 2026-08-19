interface Env {
  ASSETS: {
    fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>
  }
  RESEND_API_KEY?: string
  RESEND_FROM?: string
  RESEND_TO?: string
}

type SignupBody = { email?: unknown; website?: unknown }
type RateLimitEntry = { count: number; resetAt: number }

const attempts = new Map<string, RateLimitEntry>()
const WINDOW_MS = 60_000
const MAX_ATTEMPTS_PER_WINDOW = 5

function json(data: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  })
}

function isValidEmail(email: string): boolean {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character] ?? character,
  )
}

function isRateLimited(request: Request): boolean {
  const now = Date.now()
  const key = request.headers.get('CF-Connecting-IP') ?? request.headers.get('x-forwarded-for') ?? 'unknown'
  const current = attempts.get(key)
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  current.count += 1
  return current.count > MAX_ATTEMPTS_PER_WINDOW
}

async function handleSubscribe(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405)
  if (isRateLimited(request)) return json({ error: 'Too many attempts. Please try again in a minute.' }, 429)

  const contentType = request.headers.get('content-type') ?? ''
  if (!contentType.includes('application/json')) return json({ error: 'Invalid request.' }, 415)

  let body: SignupBody
  try {
    body = (await request.json()) as SignupBody
  } catch {
    return json({ error: 'Invalid request.' }, 400)
  }

  // Silent success for the honeypot keeps bots from learning whether they were caught.
  if (typeof body.website === 'string' && body.website.trim() !== '') return json({ ok: true })

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  if (!isValidEmail(email)) return json({ error: 'Enter a valid email address.' }, 400)
  if (!env.RESEND_API_KEY) return json({ error: 'Email signup is not configured yet.' }, 503)

  const resendHeaders = {
    Authorization: `Bearer ${env.RESEND_API_KEY}`,
    'Content-Type': 'application/json',
  }
  const existingContact = await fetch(`https://api.resend.com/contacts/${encodeURIComponent(email)}`, {
    headers: resendHeaders,
  })
  if (existingContact.ok) return json({ ok: true, alreadySubscribed: true })
  if (existingContact.status !== 404) {
    console.error('Resend contact lookup failed', existingContact.status)
    return json({ error: 'We could not check the signup. Please try again.' }, 502)
  }

  const contactResponse = await fetch('https://api.resend.com/contacts', {
    method: 'POST',
    headers: resendHeaders,
    body: JSON.stringify({ email, unsubscribed: false }),
  })
  if (!contactResponse.ok) {
    console.error('Resend contact creation failed', contactResponse.status)
    return json({ error: 'We could not save the signup. Please try again.' }, 502)
  }

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: resendHeaders,
    body: JSON.stringify({
      from: env.RESEND_FROM ?? 'onboarding@resend.dev',
      to: [env.RESEND_TO ?? 'dante@finikslabs.com'],
      subject: 'New Make AI Do The Work signup',
      html: `<p>A new person signed up for Make AI Do The Work:</p><p><strong>${escapeHtml(email)}</strong></p>`,
    }),
  })

  if (!resendResponse.ok) {
    console.error('Resend rejected signup', resendResponse.status)
    return json({ error: 'We could not complete the signup. Please try again.' }, 502)
  }
  return json({ ok: true })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    if (url.pathname === '/api/subscribe') {
      try {
        return await handleSubscribe(request, env)
      } catch (error) {
        console.error('Signup request failed', error)
        return json({ error: 'We could not complete the signup. Please try again.' }, 502)
      }
    }
    return env.ASSETS.fetch(request)
  },
}
