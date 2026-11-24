<div align="center">

# DEADPOOL | Maximum Effort

**An unofficial cinematic fan experience, built by IMDEV**

`Next.js 16` · `React 19` · `TypeScript` · `GSAP` · `Motion` · `Tailwind CSS 4`

</div>

---

## About

Deadpool is a single-page, scroll-driven fan site about Wade Wilson, the merc with a mouth. It opens on an intro gate, then walks the visitor through the character's story, abilities, gallery, film timeline and a fourth-wall-breaking finale. The tone is loud and the motion is heavy. The interface runs in English, and the text layer (`src/i18n`) already carries Arabic strings for a future locale switch.

Built by **Ibrahim Montaser / IMDEV**. Unofficial fan project, not affiliated with Marvel or Disney.

## Preview

### Intro gate
The first screen. Pick "Enter my world" for the full experience or skip straight in, with sound on or off.

<img width="1200" height="750" alt="Intro gate" src="https://github.com/user-attachments/assets/5d9d4784-4f47-4308-9004-37db2e96c640" />

### Story
A split layout with scroll-driven chapters: who Wade is, before the suit and after.

<img width="1200" height="750" alt="Story section" src="https://github.com/user-attachments/assets/08bd2e71-eafd-4cc7-89fa-10543149e39e" />

### Abilities
Seven flip cards: healing factor, dual katanas, firearms, martial arts, fourth-wall awareness, unpredictability and chimichangas.

<img width="1200" height="750" alt="Abilities cards" src="https://github.com/user-attachments/assets/f9417c61-e9d9-4822-83fe-cd9b0d7faef2" />

### Gallery
A horizontal-scroll gallery of original artwork.

<img width="1200" height="750" alt="Gallery" src="https://github.com/user-attachments/assets/01595e24-8c14-4d54-a9da-0d38d523967f" />

### Multiverse timeline
An interactive timeline of the films, from 2016 on.

<img width="1200" height="750" alt="Multiverse timeline" src="https://github.com/user-attachments/assets/d9b23db0-49ee-43bb-88f0-b3156d378abb" />

## Features

- **Bilingual text layer.** The strings in `src/i18n` come in English and Arabic versions. The site currently ships in English.
- **Achievement toasts** that pop up as the visitor finds hidden interactions.
- **Cinematic sections:** intro gate, hero, story, abilities, gallery, multiverse timeline, experience and finale.
- **Flip-card abilities** with tilt, glitch text and shutter headline effects.
- **Smooth scrolling** with Lenis, plus GSAP and Motion animations throughout.
- **Custom cursor ring** and a film-grain overlay for the comic-movie look.
- **Opening soundtrack** with a sound toggle.
- **Accessibility touches:** skip-to-content link, intro-gated focus handling and reduced-motion support.
- **Static build.** The home page is prerendered, so it hosts anywhere Next.js runs.

## Built with

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| UI | React 19 + TypeScript |
| Animation | GSAP, Motion |
| Scrolling | Lenis |
| Styling | Tailwind CSS 4 |
| Icons | Lucide React |

## Run locally

```bash
git clone https://github.com/klaza0/deadpool.git
cd deadpool
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build       # production build
npm run start       # serve the production build
npm run typecheck   # TypeScript check
```

## Project structure

```text
src/
  app/                    Next.js App Router entry, layout, loading and error states
  components/
    layout/               Site navigation and cursor ring
    sections/             Intro gate, hero, story, abilities, gallery, timeline, experience, finale
    providers/            Site state (intro gate, locale, sound)
    ui/                   Tilt card, glitch text, shutter headline, kinetic grid
    art/                  Logo mark
  data/                   Section content
  i18n/                   Arabic and English text
  lib/                    GSAP setup and helpers
public/
  images/                 Artwork
  audio/                  Opening soundtrack
```

---

<div align="center">

Built by **Ibrahim Montaser / IMDEV**. Unofficial fan project; Deadpool is a Marvel property. Artwork © IMDEV.

</div>
