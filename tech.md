# Dante Landing Page — Technical Handoff

## Executive summary

This is the personal site for Dante Galeazzi and the newsletter **Make AI Do The Work**. Its primary goal is newsletter conversion; Dante’s story, workflows and curated resources support that goal.

The app is frontend-only and intentionally small. It uses React, Vite, TypeScript, Tailwind CSS and lucide-react.

## Current visual direction

The launch design is fixed to the former **Desktop OS Y** direction:

- warm dotted background
- white interface panels
- strong black typography and borders
- yellow `#FFD400` accent
- compact desktop-window details
- sharp, editorial layout with restrained rounding

There is no theme state, selector or alternate theme CSS.

## Page structure

1. Header
2. Profile sidebar and hero
3. Popular Workflows
4. Newsletter
5. Free Resources
6. Footer

Header anchors:

- `#workflows`
- `#newsletter`
- `#resources`
- `#about`

## Important files

### `src/App.tsx`

Composes the page and handles the lightweight hash-based About view.

### `src/components/Header.tsx`

Contains the Dante wordmark and navigation links:

- Workflows
- Newsletter
- Free Resources
- About Me

### `src/components/Hero.tsx`

Contains the primary headline, positioning copy and main static subscribe form.

### `src/components/ProfileSidebar.tsx`

Contains Dante’s short introduction, social placeholders and the mobile shortcut to the primary subscribe form.

### `src/components/WorkflowCards.tsx`

Contains three placeholder workflow cards.

### `src/components/NewsletterSection.tsx`

Contains:

- newsletter heading
- three pinned post placeholders
- secondary static subscribe form

### `src/components/FreeResources.tsx`

Contains the curated resource directory. Resources live in the local `stackItems` array.

Supported categories:

- Tool
- Course
- Article

The section has client-side filter buttons:

- All
- Tools
- Courses
- Articles

Buttons use `aria-pressed`, and the visible resource count updates with the selected filter.

### `src/index.css`

Contains the global design tokens and fixed launch styles. The key variables are:

```css
--color-ink: #1e1e1e;
--color-paper: #f7f2e8;
--color-signal: #ffd400;
--color-orange: #ff5c1a;
```

## Known constraints

- Both subscription forms are static.
- Social links are placeholders.
- Workflow and newsletter posts are placeholders.
- Some resource links are placeholders.
- No backend, auth, database or analytics.
- SEO assets and production deployment are not configured yet.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Next launch tasks

Explicitly deferred:

1. Connect Substack.
2. Add real social, workflow, newsletter and resource links.
3. Add favicon, Open Graph image, canonical URL, sitemap and robots file.
4. Run final responsive/accessibility QA.
5. Deploy and connect the production domain.

Keep future additions focused on publishing real content rather than adding more homepage sections.
