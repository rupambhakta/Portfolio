// Prerenders every route to static HTML.
//
// The SPA alone ships an empty <div id="root">, so anything that does not run
// JavaScript — social scrapers, and any crawler with a JS budget — sees a blank
// page. This runs after both Vite builds: it renders each route with the SSR
// bundle, injects the markup plus the route's head tags into the client
// index.html, and writes dist/<route>/index.html.
//
// Vercel serves those files directly; the SPA rewrite in vercel.json stays as
// the fallback for anything not prerendered.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { loadSchedule } from './blog-schedule.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(ROOT, 'dist')

const escapeAttr = (s) =>
  String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')

// </script> inside JSON-LD would close the tag early.
const escapeJson = (obj) => JSON.stringify(obj).replaceAll('<', '\u003c')

function headTags({ title, canonical, meta, jsonld }) {
  return [
    `<title>${escapeAttr(title)}</title>`,
    `<link rel="canonical" href="${escapeAttr(canonical)}" />`,
    ...meta.map(
      ({ name, property, content }) =>
        `<meta ${name ? 'name' : 'property'}="${name || property}" content="${escapeAttr(content)}" />`,
    ),
    ...jsonld.map(
      ({ id, data }) => `<script type="application/ld+json" id="${id}">${escapeJson(data)}</script>`,
    ),
  ].join('\n    ')
}

// pathToFileURL: a bare Windows path is not a valid ESM specifier.
const { render, headFor, allRoutes } = await import(
  pathToFileURL(path.join(ROOT, 'dist-ssr', 'entry-server.js')).href,
)

const schedule = await loadSchedule()
const published = schedule.filter((e) => e.status === 'published').map((e) => e.slug)
const routes = allRoutes(published)

const template = await readFile(path.join(DIST, 'index.html'), 'utf8')

for (const route of routes) {
  const html = render(route)
  const head = headFor(route)

  const page = template
    // The template's placeholder <title> is replaced by the route's real head.
    .replace(/\s*<title>[\s\S]*?<\/title>/, '')
    .replace('</head>', `  ${headTags(head)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)

  const dir = route === '/' ? DIST : path.join(DIST, route)
  await mkdir(dir, { recursive: true })
  await writeFile(path.join(dir, 'index.html'), page, 'utf8')
}

console.log(`Prerendered ${routes.length} routes.`)
