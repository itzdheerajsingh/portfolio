# Talking-Video Portfolio — Dheeraj Singh
Next.js 15 · React 19 · TypeScript · Tailwind 4 · Lenis. White/black/gray only. All text comes from `src/lib/data.ts` (from Resume.pdf).

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```
## Fonts
Loaded automatically with `next/font/google` (Inter Tight, Instrument Serif, JetBrains Mono) and self-hosted by Next.js, so there is nothing to download by hand. The first `npm run dev` / `npm run build` needs an internet connection to fetch them; offline, dev mode falls back to system fonts.

## Scripts
`npm run dev` · `npm run build` · `npm start` · `npm run typecheck`

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://yourname.dev`) in production so social-share images resolve to your real domain.

## Sections
| # | id | Component |
|---|----|-----------|
| – | top | hero/Hero (looping talking video, sound toggle) |
| 01 | about | About (swinging, flippable ID card) |
| 02 | skills | Skills (periodic table + inspector) |
| 03 | work | Work (accordion) |
| 04 | certifications | Certifications (ink flood; add `url` in `data.ts` to make a row a link) |
| 05 | experience | Experience (scroll-drawn path) |
| 06 | achievements | Achievements (pinned horizontal on desktop, swipe row on mobile / reduced motion, count-up) |
| 07 | contact | Contact + footer |

## Rebuild the hero video
`python3 scripts/build-hero-assets.py intro.mp4 photo.jpg` (needs ffmpeg, numpy, Pillow). Crop is set for a 1280×720 source with the person centred (`crop=576:720:352:0`); edit `CROP` for other footage. Writes `public/hero/hero.{mp4,webm}`, `public/portrait-bust.webp`, `public/og.jpg`.

## Adding things later
Add GitHub links to `PROJECTS[].github` to show the "View on GitHub" buttons. Brand logos are not bundled yet; the skills inspector shows a symbol tile instead. If you add devicon/simple-icons SVGs to `public/logos/`, keep their LICENSE files alongside and credit them here.
# portfolio
