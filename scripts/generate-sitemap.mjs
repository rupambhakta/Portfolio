import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadSchedule } from './blog-schedule.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUTPUT = path.join(ROOT, 'public', 'sitemap.xml')
const SITE = 'https://portfolio-khaki-psi-71.vercel.app'

const staticRoutes = [
  ['/', '1.0'],
  ['/about', '0.8'],
  ['/blog', '0.8'],
  ['/contact', '0.7'],
  ['/work/getparlix', '0.9'],
  ['/work/seowyn', '0.9'],
  ['/work/heatmapiq', '0.9'],
]

const schedule = await loadSchedule()
const publishedBlogs = schedule
  .filter((entry) => entry.status === 'published')
  .sort((a, b) => Date.parse(b.publishAt) - Date.parse(a.publishAt))
  .map((entry) => [`/blog/${entry.slug}`, '0.6'])

const urls = [...staticRoutes, ...publishedBlogs]
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map(([route, priority]) => `  <url><loc>${SITE}${route}</loc><priority>${priority}</priority></url>`),
  '</urlset>',
  '',
].join('\n')

await writeFile(OUTPUT, xml, 'utf8')
console.log(`Generated sitemap with ${urls.length} URLs.`)
