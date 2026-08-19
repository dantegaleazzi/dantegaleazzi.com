export async function subscribeToNewsletter(email: string): Promise<{ alreadySubscribed: boolean }> {
  const response = await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })

  let message = 'Something went wrong. Please try again.'
  try {
    const payload = (await response.json()) as { error?: string; alreadySubscribed?: boolean }
    if (payload.error) message = payload.error
    if (response.ok) return { alreadySubscribed: payload.alreadySubscribed === true }
  } catch {
    // Keep the generic message when the Worker returns a non-JSON response.
  }

  if (!response.ok) throw new Error(message)
  return { alreadySubscribed: false }
}
