# Dante Galeazzi — Make AI Do The Work

A responsive personal landing page for Dante Galeazzi and the **Make AI Do The Work** newsletter.

## Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- lucide-react

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Project structure

```text
src
├── App.tsx
├── index.css
├── main.tsx
└── components
    ├── About.tsx
    ├── FreeResources.tsx
    ├── Header.tsx
    ├── Hero.tsx
    ├── NewsletterSection.tsx
    ├── ProfileSidebar.tsx
    └── WorkflowCards.tsx
```

## Current sections

- Personal introduction and primary newsletter form
- Popular workflows
- Newsletter with pinned post placeholders and a second form
- Free Resources with filters for tools, courses and articles
- About page

The visual system is fixed to the yellow **Desktop OS Y** direction. The previous theme selector and alternate themes were removed.

## Email signups with Resend

Both subscribe forms post to the server-side `/api/subscribe` Worker route. The route validates the address, includes a honeypot field, applies a small per-IP rate limit, saves new contacts in Resend, detects duplicate signups, and sends a notification for new contacts. The Resend key is never exposed to the browser.

For local Wrangler development:

```bash
cp .dev.vars.example .dev.vars
# Edit .dev.vars and replace re_xxxxxxxxx with your real Resend API key.
npm run preview
```

For a deployed Cloudflare Worker, set secrets instead of committing them:

```bash
wrangler secret put RESEND_API_KEY
wrangler secret put RESEND_FROM
wrangler secret put RESEND_TO
```

`RESEND_FROM` defaults to `onboarding@resend.dev` for testing. For production, verify your sending domain in Resend and set it to an address on that domain. `RESEND_TO` defaults to `dante@finikslabs.com`.

Resend Contacts now acts as the initial subscriber list: returning subscribers see an “already subscribed” message and do not trigger another notification. Broadcast campaigns and a double-opt-in flow can be added later.

Resource entries are maintained in the `stackItems` array inside `src/components/FreeResources.tsx`.
