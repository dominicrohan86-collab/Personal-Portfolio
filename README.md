# Dominic Rohan — Developer Portfolio

A single-page, 3D-enhanced developer portfolio for Dominic Rohan. Built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, GSAP ScrollTrigger, and Three.js (@react-three/fiber + @react-three/drei). The site is responsive, accessible, and deployable as a static site (Vercel, Netlify, GitHub Pages).

## Tech Stack
- React 18 + TypeScript + Vite
- Tailwind CSS for theming and layout
- Framer Motion for UI animation; GSAP ScrollTrigger for parallax/scroll progress
- Three.js via @react-three/fiber/@react-three/drei for the hero 3D console
- ESLint + Prettier + Vitest for quality

## Features
- Data-driven content from `src/data/profile.ts`
- Dark/light theme toggle with persistence
- Sticky navigation with active section highlight and smooth scrolling
- Lazy-loaded 3D hero scene with reduced-motion and offscreen-pausing
- Interactive projects with modal details
- Accessible contact form with honeypot spam guard
- Responsive grid sections, neon-accent developer aesthetic, subtle grid background

## Getting Started
```bash
pnpm install
pnpm dev
```
Visit `http://localhost:5173`.

### Scripts
- `pnpm dev` — start dev server
- `pnpm build` — type-check and build for production
- `pnpm preview` — preview the production build
- `pnpm lint` — run ESLint
- `pnpm format` — format with Prettier
- `pnpm test` — run Vitest

## Project Structure
- `src/app` — app shell
- `src/components` — shared UI (buttons, cards, modal, timeline, navbar)
- `src/sections` — page sections (hero, about, projects, etc.)
- `src/three` — 3D scene and canvas loader
- `src/data/profile.ts` — all portfolio content (edit here to customize)
- `src/utils` — helpers/hooks (theme, reduced motion, class merging)
- `src/styles` — global Tailwind styles
- `public` — static assets (`Dominic_Rohan_Resume.pdf`, `og-image.png`)

## Customization
1. Edit `src/data/profile.ts` to change name, experience, projects, skills, and copy (hero, about, etc.).
2. Adjust theme tokens in `src/styles/index.css` and `tailwind.config.cjs` for colors or fonts.
3. Replace `public/Dominic_Rohan_Resume.pdf` with your actual resume and `public/og-image.png` with a real OG image.

## Deploy
- **Vercel/Netlify/GitHub Pages**: run `pnpm build` and deploy the `dist` directory as a static site.
- Ensure `base`/`public` paths remain default for Vite when deploying.

## Accessibility & Performance
- Honors `prefers-reduced-motion`; heavy scroll/3D animations are minimized.
- 3D canvas lazy-loads and pauses rendering when offscreen to save resources.
- Keyboard-focus styles, semantic sections, and smooth scrolling anchors are included.
