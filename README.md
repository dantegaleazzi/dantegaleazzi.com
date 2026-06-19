# Dante Galeazzi — Make AI Do The Work

A fast, responsive personal landing page for Dante Galeazzi and the **Make AI Do The Work** newsletter. Built with React, Vite, TypeScript, Tailwind CSS, and Lucide React. The interface uses a pixel/brutalist visual system with sharp borders, bold typography and an electric green accent.

## Run locally

```bash
npm install
npm run dev
```

Vite will print the local URL, usually `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

## Project structure

```text
.
├── index.html
├── package.json
├── src
│   ├── components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── ProfileSidebar.tsx
│   │   ├── ThemeLab.tsx
│   │   └── WorkflowCards.tsx
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

The subscribe form currently provides an on-page confirmation only. It does not send data to a backend or newsletter service.

## Themes

Use the **Themes** link in the header to jump to the compact **Choose theme** section near the bottom of the page. The two selector buttons switch the full page between `Brutalist Grid` and `Pixel Gamer`.

The page always loads in `Brutalist Grid` on refresh. Theme choice is intentionally not stored in `localStorage` yet.
