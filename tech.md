# Dante Landing Page - Technical Handoff

## Executive Summary

This project is a personal landing page for Dante Galeazzi and his newsletter/project, **Make AI Do The Work**.

The site is built as a lightweight frontend-only app using:

- React
- Vite
- TypeScript
- Tailwind CSS
- lucide-react

The current implementation is intentionally simple, fast, and easy to extend. There is no backend, no auth, no analytics, no database, and no newsletter integration yet.

The page is already implemented and working. It includes:

- Compact header with brand and nav
- Left profile/sidebar area
- Main hero with newsletter positioning
- Static subscribe form
- Popular workflows section
- Compact theme selector near the bottom
- Two visual themes:
  - `brutalist`
  - `gamer`

Theme switching is client-side only and resets to `brutalist` on refresh.

## Product Goal

The page should position Dante as:

- learning to code in public
- building real products with AI
- testing practical AI workflows
- helping regular people make AI execute useful work

Primary message:

AI should do real work, not just generate text.

The site should support newsletter conversion first, with personal story as supporting context.

## Brand and Visual Direction

The design direction is:

- pixel
- brutalist
- internet-native
- sharp-edged
- bold typography
- off-white base for default theme
- electric green accent

Important: the site layout was inspired by the broad information architecture of `gregisenberg.com`, but it must not become a visual clone. The codebase currently avoids using Greg's branding, exact spacing, fonts, or design language.

## Current User Experience

Above the fold on desktop:

- header
- sidebar intro
- hero headline
- value proposition
- required subscribe line
- email input
- subscribe button

Main content order:

1. Header
2. Hero section with sidebar + hero content
3. Popular workflows
4. Theme selector
5. Footer

## Core Copy Requirements

These strings are important and already implemented:

- Brand: `DANTE GALEAZZI`
- Newsletter/project: `Make AI Do The Work`
- Hero:
  - `Make AI`
  - `Do The Work`
- Required line near form:
  - `You can subscribe below to get access to Make AI Do The Work`
- Progress line:
  - `0 → 1,000 builders learning to make AI useful.`

## Tech Stack

- React 19
- Vite
- TypeScript
- Tailwind CSS via `@import "tailwindcss"`
- lucide-react for icons

## Project Structure

```text
.
├── README.md
├── tech.md
├── index.html
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── src
    ├── App.tsx
    ├── index.css
    ├── main.tsx
    ├── vite-env.d.ts
    └── components
        ├── Header.tsx
        ├── Hero.tsx
        ├── ProfileSidebar.tsx
        ├── ThemeLab.tsx
        └── WorkflowCards.tsx
```

## Architecture Overview

### `src/main.tsx`

Bootstraps the React app and loads global CSS.

### `src/App.tsx`

Top-level page composition.

Responsibilities:

- renders the main page layout
- stores the active visual theme in React state
- applies `data-theme` to:
  - the root page container
  - `document.documentElement`

Theme state type:

```ts
type ThemeName = 'brutalist' | 'gamer'
```

Important behavior:

- default theme is `brutalist`
- no persistence to `localStorage`
- theme resets on refresh by design

### `src/components/Header.tsx`

Contains:

- top-left Dante brand mark
- top nav links

Important nav anchors:

- `#themes`
- `#workflows`
- `#about`

The `Themes` link should scroll to the compact selector section near the bottom.

### `src/components/ProfileSidebar.tsx`

Contains:

- short bio
- current build callout
- social links
- small meta label

Also includes gamer-only status UI that appears under the `gamer` theme.

### `src/components/Hero.tsx`

Contains the main conversion content:

- hero headline
- supporting copy
- required subscription line
- static email form
- success message after submit
- progress line

The form is static and only toggles an on-page confirmation. It does not send data anywhere.

Also includes gamer-only HUD/progress elements that are hidden in the brutalist theme and shown in the gamer theme.

### `src/components/WorkflowCards.tsx`

Contains the "Popular workflows" section with 3 placeholder cards.

Each card includes:

- title
- description
- icon
- `Coming soon` badge

### `src/components/ThemeLab.tsx`

Compact theme selector section.

Current behavior:

- renders a small "Choose theme" section
- shows two compact buttons:
  - `Brutalist Grid`
  - `Pixel Gamer`
- shows an `Active` indicator on the selected theme
- uses `aria-pressed`

This replaced a previous text-only "Theme notes" section.

## Styling System

All styling is centralized in `src/index.css`.

### Fonts

Currently loaded from Google Fonts:

- `Space Grotesk`
- `DM Mono`
- `Silkscreen`

### CSS Variables

The app uses theme variables such as:

- `--color-ink`
- `--color-paper`
- `--color-signal`
- `--color-orange`

### Default Theme

The base/default theme is the brutalist off-white theme.

Characteristics:

- off-white paper background
- subtle grid texture
- black borders
- sharp box shadows
- electric green highlights

### Gamer Theme

The `gamer` theme is already implemented in CSS and is activated through:

- `html[data-theme="gamer"]`
- `[data-theme="gamer"] ...`

Characteristics:

- darker retro-console background
- silkscreen/pixel-inspired title styling
- HUD/status UI
- bright green/orange/purple accents
- stronger game-interface feel

## Responsive Behavior

The landing page was already compacted so the core conversion area fits better on laptop screens, especially around 13-inch viewport heights.

Important layout intent:

- desktop-first
- mobile stacks cleanly
- above-the-fold conversion area should remain visible on smaller laptops

Do not casually increase header or hero spacing without re-checking the fold behavior.

## Known Constraints

- No backend yet
- No database
- No auth
- No routing
- No external UI library beyond `lucide-react`
- No analytics
- No newsletter provider integration

## Build and Run

Install:

```bash
npm install
```

Development:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Verified Status

Last known verified state:

- `npm run build` passes
- theme selector is wired in code
- compact theme selector replaced the old `Theme notes` list

What was not visually re-verified in-browser in the latest pass:

- clicking `Themes` anchor scroll in a live dev session
- manually switching both themes in the browser
- refresh reset to default in a live session

Reason:

The local dev server was not started in the last pass because permission to bind the local port was declined.

## Recommended Manual QA

When resuming the project, check:

1. `npm run dev`
2. Open the local page
3. Click `Themes` in the header
4. Confirm scroll reaches the compact selector near the bottom
5. Switch to `Pixel Gamer`
6. Confirm the whole page theme changes
7. Switch back to `Brutalist Grid`
8. Refresh the page
9. Confirm it resets to `Brutalist Grid`
10. Check desktop and mobile layouts

## Important Implementation Decisions

### Why theme state is not persisted

This was intentional per product direction. The selector is for comparing visual directions, not for storing user preference yet.

### Why the theme selector is compact

Large theme cards/previews were previously considered too distracting relative to the landing page's main conversion goal. The current implementation keeps theme exploration secondary.

### Why the site remains frontend-only

The current goal is brand, positioning, and layout validation. Integrations should only be added once the content and direction are stable.

## If Another AI Continues This Project

Start by reading these files first:

1. `tech.md`
2. `README.md`
3. `src/App.tsx`
4. `src/components/ThemeLab.tsx`
5. `src/index.css`

Then determine whether the next task is:

- visual polish
- content update
- responsiveness fix
- theme evolution
- newsletter integration

Safe areas to extend:

- theme selector behavior
- CTA polish
- workflow cards
- footer details
- social links
- accessibility refinements

Areas to change carefully:

- header height
- hero spacing
- hero title sizing
- form placement above the fold
- global theme variables
- `index.css` theme-specific overrides

## Suggested Next Milestones

- wire real social/profile URLs
- add real blog/workflow links
- connect the subscribe form to a newsletter tool
- add a simple content source for workflow posts
- polish theme transitions if needed
- run a full browser QA pass on laptop-sized viewports

## Final Notes

This codebase is intentionally small and direct. There is very little abstraction, which is useful here. If extending it, prefer keeping the current simplicity unless a real scaling need appears.
