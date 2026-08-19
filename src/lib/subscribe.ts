export async function subscribeToNewsletter(email: string): Promise<void> {
  const response = await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })

  let message = 'Something went wrong. Please try again.'
  try {
    const payload = (await response.json()) as { error?: string }
    if (payload.error) message = payload.error
  } catch {
    // Keep the generic message when the Worker returns a non-JSON response.
  }

  if (!response.ok) throw new Error(message)
}
