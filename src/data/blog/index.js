import blogSchedule from '../blog-schedule.json'
import unifiedDiffing from './unified-diffing-ai-coding-agents.js'
import customAiAgentVsChatbot from './custom-ai-agent-vs-chatbot.js'
import howToChooseAnAiAgentUseCase from './how-to-choose-an-ai-agent-use-case.js'
import multiAgentWorkflowArchitecture from './multi-agent-workflow-architecture.js'
import voiceAssistantThatBooksItsOwnMeetings from './voice-assistant-that-books-its-own-meetings.js'
import whichTasksAreWorthAutomating from './which-tasks-are-worth-automating.js'
import multiAgentSeoModelRouting from './multi-agent-seo-model-routing.js'
import shippingFastWithoutShippingJunk from './shipping-fast-without-shipping-junk.js'

// Page-level copy for /blog.
export const blogMeta = {
  eyebrow: 'The Journal',
  title: ['Notes from', 'the build.'],
  intro:
    'Field notes on AI agents, automation, and shipping full-stack products that people actually use. No hype, just what worked, what broke, and what I would do differently.',
}

// Each post lives in its own module. This registry controls listing order only.
const postSource = [unifiedDiffing, customAiAgentVsChatbot, howToChooseAnAiAgentUseCase, multiAgentWorkflowArchitecture, voiceAssistantThatBooksItsOwnMeetings, whichTasksAreWorthAutomating, multiAgentSeoModelRouting, shippingFastWithoutShippingJunk]

// The source bundle contains every authored post, but only posts marked
// published in the schedule are exposed to the journal and route resolver.
const scheduleBySlug = new Map(blogSchedule.map((entry) => [entry.slug, entry]))
export const posts = postSource.filter((post) => scheduleBySlug.get(post.slug)?.status === 'published')

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return `${MONTHS[m - 1]} ${d}, ${y}`
}

export function readingTime(body) {
  const words = body.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export const allTags = ['All', ...Array.from(new Set(posts.map((p) => p.tag)))]

export function getPost(slug) {
  return posts.find((p) => p.slug === slug)
}

// Posts other than slug, newest first, for the keep-reading section.
export function relatedPosts(slug, n = 2) {
  return posts.filter((p) => p.slug !== slug).slice(0, n)
}

// Previous (older) and next (newer) post, by list order (newest first).
export function adjacentPosts(slug) {
  const i = posts.findIndex((p) => p.slug === slug)
  return {
    newer: i > 0 ? posts[i - 1] : null,
    older: i >= 0 && i < posts.length - 1 ? posts[i + 1] : null,
  }
}
