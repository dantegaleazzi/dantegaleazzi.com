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

Both subscribe forms are static and only show an on-page confirmation. There is no Substack or backend integration yet.

Resource entries are maintained in the `stackItems` array inside `src/components/FreeResources.tsx`.
