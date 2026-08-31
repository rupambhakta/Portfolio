import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
export const SCHEDULE_PATH = path.join(ROOT, 'src', 'data', 'blog-schedule.json')
const BLOG_SOURCE_DIR = path.join(ROOT, 'src', 'data', 'blog')

async function loadBlogSources() {
  const entries = await readdir(BLOG_SOURCE_DIR, { recursive: true })
  const sources = await Promise.all(
    entries
      .filter((entry) => entry.endsWith('.js'))
      .map((entry) => readFile(path.join(BLOG_SOURCE_DIR, entry), 'utf8')),
  )
  return sources.join('\n')
}

export async function loadSchedule() {
  const [scheduleText, blogSource] = await Promise.all([
    readFile(SCHEDULE_PATH, 'utf8'),
    loadBlogSources(),
  ])
  const schedule = JSON.parse(scheduleText)
  const sourceSlugs = [...blogSource.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map((match) => match[1])
  validateSchedule(schedule, sourceSlugs)
  return schedule
}

export function validateSchedule(schedule, sourceSlugs) {
  if (!Array.isArray(schedule)) throw new Error('Blog schedule must be a JSON array.')

  const sourceSet = new Set(sourceSlugs)
  const seen = new Set()
  for (const entry of schedule) {
    if (!entry || typeof entry !== 'object') throw new Error('Every blog schedule entry must be an object.')
    if (!entry.slug || !sourceSet.has(entry.slug)) throw new Error(`Schedule references missing blog slug: ${entry.slug || '(empty)'}`)
    if (seen.has(entry.slug)) throw new Error(`Duplicate blog schedule entry: ${entry.slug}`)
    if (!['draft', 'scheduled', 'published'].includes(entry.status)) throw new Error(`Invalid status for ${entry.slug}: ${entry.status}`)
    if (!entry.publishAt || Number.isNaN(Date.parse(entry.publishAt))) throw new Error(`Invalid publishAt for ${entry.slug}: ${entry.publishAt}`)
    seen.add(entry.slug)
  }

  for (const slug of sourceSet) {
    if (!seen.has(slug)) throw new Error(`Blog post is missing from the schedule: ${slug}`)
  }
}
