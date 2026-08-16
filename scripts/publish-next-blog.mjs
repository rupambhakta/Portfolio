import { writeFile } from 'node:fs/promises'
import { loadSchedule, SCHEDULE_PATH } from './blog-schedule.mjs'

const now = new Date(process.env.PUBLISH_NOW || Date.now())
if (Number.isNaN(now.getTime())) throw new Error(`Invalid PUBLISH_NOW value: ${process.env.PUBLISH_NOW}`)

const schedule = await loadSchedule()
const due = schedule
  .filter((entry) => entry.status === 'scheduled' && Date.parse(entry.publishAt) <= now.getTime())
  .sort((a, b) => Date.parse(a.publishAt) - Date.parse(b.publishAt))

if (!due.length) {
  console.log(`No scheduled blog is due as of ${now.toISOString()}.`)
  process.exit(0)
}

// Publish exactly one post per run. If the workflow is missed for several
// days, the next invocation catches up one post at a time instead of flooding
// the journal with multiple new articles.
const next = due[0]
next.status = 'published'
await writeFile(SCHEDULE_PATH, `${JSON.stringify(schedule, null, 2)}\n`, 'utf8')
console.log(`Published ${next.slug} (scheduled for ${next.publishAt}).`)
