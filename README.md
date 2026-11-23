# Deadpool | Unofficial Interactive Fan Experience

An unofficial, bilingual (Arabic and English) Deadpool-themed interactive website by **Ibrahim Montaser / IMDEV**. A cinematic single-page experience: an intro gate opens into a hero scene, then story, powers, gallery, timeline, and finale sections with a custom cursor and film-grain overlay.

## Features

- Full Arabic and English content with a locale switch (`src/i18n`).
- Cinematic section-based storytelling: intro gate, hero, story, powers, gallery, timeline, experience, and finale.
- Custom cursor ring and site-wide navigation.
- Film-grain overlay for a comic-movie atmosphere.
- Smooth scrolling powered by Lenis, with GSAP and Motion animations throughout.
- Accessibility touches: skip-to-content link and intro-gated focus handling.

## Built with

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 |
| UI | React 19 + TypeScript |
| Animation | GSAP, Motion |
| Scrolling | Lenis |
| Styling | Tailwind CSS 4 |
| Icons | Lucide React |

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run typecheck   # TypeScript check
```

## Project structure

```text
src/app/                Next.js App Router entry
src/components/layout/  Cursor ring and site navigation
src/components/sections/  Intro gate, hero, story, powers, gallery, timeline, experience, finale
src/components/providers/  Site state (intro gate, locale, scroll)
src/i18n/               Arabic and English text
```

---

Built by **Ibrahim Montaser / IMDEV**. Unofficial fan project; Deadpool is a Marvel property.
