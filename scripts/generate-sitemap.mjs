import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadSchedule } from './blog-schedule.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUTPUT = path.join(ROOT, 'public', 'sitemap.xml')
const PROJECTS = path.join(ROOT, 'src', 'data', 'projects')
const SITE = 'https://www.rupambhakta.com'

const staticRoutes = [
  ['/', '1.0'],
  ['/about', '0.8'],
  ['/blog', '0.8'],
  ['/contact', '0.7'],
]

// Work pages come from the project registry so a new project file lands in the
// sitemap on its own. The data files can't be imported here — they import .webp
// assets, which Node won't resolve — so the slug is read out of the source.
const projectRoutes = (
  await Promise.all(
    (await readdir(PROJECTS))
      .filter((file) => file.endsWith('.js') && file !== 'index.js')
      .sort()
      .map(async (file) => {
        const slug = (await readFile(path.join(PROJECTS, file), 'utf8')).match(/slug: *'([^']+)'/)?.[1]
        return slug ? [`/work/${slug}`, '0.9'] : null
      }),
  )
).filter(Boolean)

const schedule = await loadSchedule()
const publishedBlogs = schedule
  .filter((entry) => entry.status === 'published')
  .sort((a, b) => Date.parse(b.publishAt) - Date.parse(a.publishAt))
  .map((entry) => [`/blog/${entry.slug}`, '0.6'])

const urls = [...staticRoutes, ...projectRoutes, ...publishedBlogs]
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map(([route, priority]) => `  <url><loc>${SITE}${route}</loc><priority>${priority}</priority></url>`),
  '</urlset>',
  '',
].join('\n')

await writeFile(OUTPUT, xml, 'utf8')
console.log(`Generated sitemap with ${urls.length} URLs.`)
