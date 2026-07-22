# Aabishkar Shrestha — Creative Portfolio

A cinematic, responsive portfolio for Kathmandu-based creative professional Aabishkar Shrestha. The experience combines editorial typography, real project imagery, a short cinematic loader, smooth scrolling and choreographed motion.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- GSAP + ScrollTrigger
- Lenis smooth scrolling
- Framer Motion
- Vinext / Cloudflare-compatible output

## Run locally

Node.js 22.13 or newer is required.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run lint
npm run build
npm test
```

## Content and assets

- Main site: `app/page.tsx`
- Visual system and responsive styles: `app/globals.css`
- Metadata and social preview configuration: `app/layout.tsx`
- Portraits and verified reel covers: `public/images/`
- Social preview: `public/og.png`
- Favicon: `public/favicon.png`

The four work cards use the genuine cover imagery and Instagram URLs supplied for the project. Contact links use `mailto:`, `tel:`, WhatsApp and Instagram.

## Deploy to Vercel

1. Push this folder to a Git repository.
2. Import the repository in Vercel.
3. Keep the framework preset as Next.js.
4. Use `npm run build` as the build command.
5. Deploy. No environment variables are required.

The Open Graph image URL is generated from the incoming request host, so link previews work on local, preview and production domains.

## Accessibility and motion

- Keyboard-visible focus states
- Semantic headings, sections and navigation
- Accessible mobile menu controls and image descriptions
- `prefers-reduced-motion` support
- Loader fail-safe that cannot permanently cover the page
- External links use safe new-tab attributes
