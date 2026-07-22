# Rupam Bhakta — Portfolio (v2)

A distinctive, **person-first, multi-page** portfolio for **Rupam Bhakta — AI Automation Engineer & Full-Stack Developer**.
Built with **React (Vite) + React Router + Tailwind CSS + Framer Motion**.

**Design direction — "Grain & Bold":** warm near-black canvas, film-grain texture, oversized **Anton** display type,
an **ember-orange** accent, **Inter** body, **JetBrains Mono** labels. Editorial, energetic, and deliberately *not* the
generic dark-neon-gradient AI look. Fonts are **self-hosted** (bundled via `@fontsource`) — the site works offline.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → /dist
npm run preview    # preview the production build
```

## Pages / routing

- `/` — homepage (hero, selected work, services, about, contact)
- `/work/:slug` — a full **case-study page** per project (overview → challenge → approach → features → gallery → outcome → next)

Routing uses **HashRouter** (URLs look like `/#/work/nextalk`). This means deep links work on **any** static host
(Netlify, Vercel, GitHub Pages) with **zero config**, and the offline single-file preview navigates too.
Prefer clean URLs? Switch `HashRouter` → `BrowserRouter` in `src/main.jsx` and add an SPA redirect
(`/* /index.html 200`) on your host.

## Deploy (free)

- **Vercel / Netlify:** import the repo (preset: Vite) or drag the `dist/` folder into Netlify. Build `npm run build`, output `dist`.
- **GitHub Pages:** push `dist/` — HashRouter means no extra 404 trick needed.

---

## Edit everything in ONE file: `src/data/content.js`

Copy, projects, services, about, links — all there. Search `TODO` for the things to fill in:

| What | Where in `content.js` |
|------|----------------------|
| Booking link (Calendly/Cal.com) for "Book a call" / "Let's talk" | `profile.bookingUrl`, `contact.primaryCta.href` |
| LinkedIn URL | `profile.linkedin` |
| Live demo URLs (AI bot, SEO agent) | `projects[].links.demo` |
| GitHub repo URLs (NexTalk, Eventure) | `projects[].links.github` |
| Email | `profile.email` |

### Adding project images, videos & demos

Every project has a `cover` and a `gallery` array. They render a **labelled placeholder** until you add a real asset —
so you can see exactly where each image/video goes.

1. Drop files into `public/` (e.g. `public/work/nextalk-1.jpg`).
2. In `content.js`, set the `src`:

```js
cover: '/work/nextalk-cover.jpg',
gallery: [
  { src: '/work/nextalk-1.jpg', ratio: '16/10', caption: 'Chat interface' },
  { src: '/work/nextalk-demo.mp4', type: 'video', ratio: '16/9', caption: 'Live demo' },
  { src: '/work/nextalk-2.jpg', ratio: '1/1', caption: 'OTP flow' },
],
```

`type: 'video'` renders a `<video>` player; anything else renders an `<img>`. `ratio` keeps layout stable while assets load.

### Add or remove a project

Add/remove an object in the `projects` array in `content.js`. Each needs a unique `slug` — the case-study page lives at
`/work/<slug>` automatically. `tint` (`ember` | `green` | `violet` | `cyan`) colors its placeholder gradient.

---

## Structure

```
src/
  data/content.js         ← ALL content (edit here)
  main.jsx                ← app entry + HashRouter
  App.jsx                 ← routes + layout (nav, footer, grain, scroll progress)
  index.css               ← theme tokens, fonts, grain, utilities
  lib/       motion.js, scroll.js
  pages/     Home.jsx, ProjectPage.jsx
  components/
    Nav, Footer, Background, Marquee, ScrollManager, SectionLink
    Hero, WorkGrid, Services, About, Contact   (home sections)
    Media.jsx   ← image/video + labelled placeholder
    ui.jsx      ← Reveal / DisplayLines / buttons / chips (shared)
```

## Notes

- Respects `prefers-reduced-motion`. Responsive at 375 / 768 / 1024 / 1440. Fonts bundled (no network needed).
- Design direction generated with the `ui-ux-pro-max` skill; type via `@fontsource`.
