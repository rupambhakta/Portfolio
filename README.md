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
- `/contact` — dedicated contact page with the enquiry form
- `/work/:slug` — a case-study page per project. **Each project has its own layout**, not one shared template —
  `pages/ProjectPage.jsx` just resolves the slug to that project's page in `pages/work/`.

Routing uses **HashRouter** (URLs look like `/#/work/nextalk`). This means deep links work on **any** static host
(Netlify, Vercel, GitHub Pages) with **zero config**, and the offline single-file preview navigates too.
Prefer clean URLs? Switch `HashRouter` → `BrowserRouter` in `src/main.jsx` and add an SPA redirect
(`/* /index.html 200`) on your host.

## Deploy (free)

- **Vercel / Netlify:** import the repo (preset: Vite) or drag the `dist/` folder into Netlify. Build `npm run build`, output `dist`.
- **GitHub Pages:** push `dist/` — HashRouter means no extra 404 trick needed.

---

## Where the content lives

- **`src/data/content.js`** — site copy: profile, nav, hero, marquee, services, about, contact, contact page.
- **`src/data/projects/*.js`** — one file per project. Each holds its own case-study data **in whatever shape that
  project needs**, plus the card fields the homepage reads (`slug`, `title`, `kind`, `year`, `status`, `tint`,
  `cover`, `summary`, `tags`, `links`). `projects/index.js` sets the homepage order.

Search `TODO` for the things to fill in:

| What | Where |
|------|-------|
| Booking link (Calendly/Cal.com) for "Book a call" / "Let's talk" | `content.js` → `profile.bookingUrl`, `contact.primaryCta.href` |
| LinkedIn URL | `content.js` → `profile.linkedin` |
| Contact-form backend (Formspree/Basin/your API) | `content.js` → `contactPage.endpoint` |
| Email | `content.js` → `profile.email` |
| Live demo / repo URLs | `projects/<name>.js` → `links.demo`, `links.github` |
| Screenshots & video | `projects/<name>.js` → `cover`, `gallery[].src` |

### The contact form

`contactPage.endpoint` is empty by default, so the form composes a pre-filled email and opens the visitor's mail
client — it works with zero setup. Paste a form-backend URL that accepts a JSON `POST` and it submits there instead,
falling back to a "email me directly" message if the request fails.

### Adding project images, videos & demos

Every project has a `cover` and a `gallery` array. They render a **labelled placeholder** until you add a real asset —
so you can see exactly where each image/video goes.

1. Drop files into `public/` (e.g. `public/work/getparlix-1.jpg`).
2. In that project's data file, set the `src`:

```js
cover: '/work/getparlix-cover.jpg',
gallery: [
  { src: '/work/getparlix-1.jpg', ratio: '16/10', caption: 'Chat widget on a client site' },
  { src: '/work/getparlix-demo.mp4', type: 'video', ratio: '16/9', caption: 'Live demo' },
  { src: '/work/getparlix-2.jpg', ratio: '1/1', caption: 'Booking flow' },
],
```

`type: 'video'` renders a `<video>` player; anything else renders an `<img>`. `ratio` keeps layout stable while assets load.

### Add a project

1. Add `src/data/projects/<name>.js` — card fields plus whatever sections that case study calls for.
2. Register it in `src/data/projects/index.js` (the array order is the homepage order).
3. Add `src/pages/work/<Name>Page.jsx` and map the slug in `src/pages/work/index.js`.

Build the page from the pieces in `components/case/CaseUI.jsx` (`CaseHero`, `Section`, `StatBand`, `CardGrid`,
`DefinitionList`, `SpecTable`, `PullQuote`, `Callout`, `ClosingStatement`, `CaseCta`, `NextProject`) and add bespoke
sections wherever the story needs them — the shared pieces exist for a common visual language, not a fixed layout.
`tint` (`ember` | `green` | `violet` | `cyan`) colors the placeholder gradients. Icon names in project data resolve
through `components/case/icons.js`.

---

## Structure

```
src/
  data/
    content.js            ← site copy (edit here)
    projects/             ← one file per project + index.js (order/registry)
  main.jsx                ← app entry + HashRouter
  App.jsx                 ← routes + layout (nav, footer, grain, scroll progress)
  index.css               ← theme tokens, fonts, grain, utilities
  lib/       motion.js, scroll.js
  pages/
    Home.jsx, ContactPage.jsx
    ProjectPage.jsx       ← resolves /work/:slug → the project's own page
    work/                 ← GetParlixPage, SeowynPage, HeatMapIQPage
  components/
    Nav, Footer, Background, Marquee, ScrollManager, SectionLink
    Hero, WorkGrid, Services, About, Contact   (home sections)
    ContactForm.jsx  ← validation, submit states, honeypot, mailto fallback
    Media.jsx        ← image/video + labelled placeholder
    ui.jsx           ← Reveal / DisplayLines / buttons / chips (shared)
    case/            ← CaseUI.jsx building blocks + icons.js map
```

## Notes

- Respects `prefers-reduced-motion`. Responsive at 375 / 768 / 1024 / 1440. Fonts bundled (no network needed).
- Design direction generated with the `ui-ux-pro-max` skill; type via `@fontsource`.
