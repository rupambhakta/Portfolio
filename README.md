# Rupam Bhakta — Portfolio (v2)

A distinctive, **person-first, multi-page** portfolio for **Rupam Bhakta — AI Automation Engineer & Full-Stack Developer**.
Built with **React (Vite) + React Router + Tailwind CSS + Framer Motion**.

**Design direction — "Grain & Bold":** film-grain texture, oversized **Anton** display type, an **ember-orange**
accent, **Inter** body, **JetBrains Mono** labels. Editorial, energetic, and deliberately *not* the generic
dark-neon-gradient AI look. Fonts are **self-hosted** (bundled via `@fontsource`) — the site works offline.

## Themes

Three palettes, switchable from the nav (the pill next to "Let's talk"), remembered in `localStorage`:

| Theme | `data-theme` | What it is |
|-------|--------------|------------|
| **Ember** (default) | `ember` | The original warm near-black canvas |
| **Light** | `light` | Paper white, deepened ember so the accent stays readable |
| **Dark** | `dark` | True black, neutral greys |

All three are driven by CSS variables in `src/index.css` (`:root[data-theme='…']`) which Tailwind reads through
`rgb(var(--…) / <alpha-value>)` — so components use plain `text-cream` / `bg-base-850` / `text-ember` classes and
never name a raw color. Tokens: `base-950…700` (surfaces), `cream` / `-dim` / `-mut` (text), `ember` / `-soft` /
`-deep` (accent), `ink` (text on ember fills), `ok` / `ok-strong`, `warn`.

**To retheme**, edit the variable block — nothing else. Every text/background pair in all three themes clears
WCAG AA (most clear AAA); keep it that way if you change values. The theme is applied by a small inline script in
`index.html` before first paint, so there's no flash of the wrong palette.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → /dist
npm run preview    # preview the production build
npm start          # serve /dist and /api/contact with Nodemailer
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

### Scheduled blog publishing

Each blog post lives in its own file in `src/data/blog/`; `src/data/blog/index.js` is the listing registry.
Publication state and release times live in `src/data/blog-schedule.json`. To queue a post, add its content file,
register it in `index.js`, and add a matching schedule entry:

```json
{
  "slug": "your-post-slug",
  "publishAt": "2026-08-18T09:00:00+05:30",
  "status": "scheduled"
}
```

The GitHub Actions workflow at `.github/workflows/publish-blog.yml` runs daily at 09:00 Asia/Kolkata, publishes
one due post, regenerates `public/sitemap.xml`, and commits the release. Vercel then deploys that commit through its
Git integration. It can also be run manually from the Actions tab. The workflow requires the repository's default
branch to be connected to the Vercel project and the workflow's `GITHUB_TOKEN` to have write access to contents.

Useful local commands:

```bash
npm run publish:blog       # publish one due post, if any
npm run sitemap:generate   # rebuild the sitemap from published posts
```

The scheduler publishes one post per run, even if several posts are overdue. This prevents a missed workflow run from
releasing multiple articles at once.

Search `TODO` for the things to fill in:

| What | Where |
|------|-------|
| Booking link (Calendly/Cal.com) for "Book a call" / "Let's talk" | `content.js` → `profile.bookingUrl`, `contact.primaryCta.href` |
| LinkedIn URL | `content.js` → `profile.linkedin` |
| Contact-form SMTP settings | `.env` / `.env.example` |
| Email | `content.js` → `profile.email` |
| Live demo / repo URLs | `projects/<name>.js` → `links.demo`, `links.github` |
| Screenshots & video | `projects/<name>.js` → `cover`, `gallery[].src` |

### The contact form

The contact form posts to `/api/contact`. `server.js` handles that request with Nodemailer and sends it through the
SMTP values in `.env`. Build the frontend first, then run `npm start` to serve both `/dist` and the API route.
For production, deploy to a host that can run the Node server or convert `/api/contact` to that host's serverless
function format; static-only hosting will not send email.

### Adding project images, videos & demos

Every project has a `cover` and a `gallery` array. They render a **labelled placeholder** until you add a real asset —
so you can see exactly where each image/video goes.

Drop files into `src/assets/<project>/` and **import** them in that project's data file — Vite fingerprints them for
caching and the build fails loudly if a path is wrong (see `data/projects/getparlix.js`):

```js
import cover from '../../assets/getparlix/getparlix.com_.png'
import shot1 from '../../assets/getparlix/voiceCall.png'

export default {
  cover,
  coverRatio: '2888/1714',
  gallery: [{ src: shot1, ratio: '1897/912', caption: 'Voice call running over the live site' }],
}
```

Files in `public/` also work if you'd rather reference them by URL (`cover: '/work/x.jpg'`) — no import needed.

Set `ratio` to the image's **real** dimensions (`width/height`) so nothing gets cropped: images render with
`object-cover`, so a mismatched ratio silently trims edges. `type: 'video'` renders a `<video>` player instead.
A `src` of `null` renders a labelled placeholder, so unfilled slots are visible rather than blank.

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
  index.css               ← the three theme palettes, fonts, grain, utilities
  lib/       motion.js, scroll.js, theme.js
  pages/
    Home.jsx, ContactPage.jsx
    ProjectPage.jsx       ← resolves /work/:slug → the project's own page
    work/                 ← GetParlixPage, SeowynPage, HeatMapIQPage
  components/
    Nav, Footer, Background, Marquee, ScrollManager, SectionLink
    ThemeToggle.jsx  ← the three-way theme switcher in the nav
    Hero, WorkGrid, Services, About, Contact   (home sections)
    ContactForm.jsx  ← validation, submit states, honeypot, mailto fallback
    Media.jsx        ← image/video + labelled placeholder
    ui.jsx           ← Reveal / DisplayLines / buttons / chips (shared)
    case/            ← CaseUI.jsx building blocks + icons.js map
```

## Notes

- Respects `prefers-reduced-motion`. Responsive at 375 / 768 / 1024 / 1440. Fonts bundled (no network needed).
- Design direction generated with the `ui-ux-pro-max` skill; type via `@fontsource`.
