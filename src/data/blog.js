// ─────────────────────────────────────────────────────────────
// BLOG CONTENT. Add a post by dropping a new object in `posts`.
// `body` is written in a small subset of Markdown (see components/blog/
// Markdown.jsx): ## / ### headings, **bold**, *italic*, `code`, > quotes,
// - lists, 1. lists, ```code blocks```, [links](url), ![alt](img), and ---.
// Keep the copy human: no em dashes anywhere.
// ─────────────────────────────────────────────────────────────

// Page-level copy for /blog.
export const blogMeta = {
  eyebrow: 'The Journal',
  title: ['Notes from', 'the build.'],
  intro:
    'Field notes on AI agents, automation, and shipping full-stack products that people actually use. No hype, just what worked, what broke, and what I would do differently.',
}

// Each post carries a `tint` (ember / violet / cyan / green) used for its
// cover and accents, so the listing stays colourful without leaning on red.
export const posts = [
  {
    slug: 'voice-assistant-that-books-its-own-meetings',
    title: 'How I built a 24/7 assistant that books its own meetings',
    excerpt:
      'A chat and voice agent that answers questions, qualifies leads, and puts real meetings on a calendar. Here is the architecture, the parts that were hard, and the parts that surprised me.',
    tag: 'AI Agents',
    tint: 'ember',
    date: '2026-06-24',
    featured: true,
    author: 'Rupam Bhakta',
    body: `Most "AI chat" widgets are a search box wearing a costume. They answer a question and then go quiet. I wanted the opposite: an assistant that treats a conversation like a job, carries it forward, and ends with something useful on the calendar.

That became GetParlix, a 24/7 chat and voice assistant that drops onto any website with one line of code. This is how it works under the hood.

## The shape of the problem

A good assistant has to do four things well, and they pull in different directions:

- Answer accurately from a specific business's own material, not the open internet.
- Hold the thread across a long back and forth without losing context.
- Know when a visitor is a real lead and move them toward a booking.
- Stay fast enough that talking to it never feels like waiting.

If you optimise only for accuracy you get something slow and cautious. If you optimise only for speed you get something confidently wrong. The interesting work is in the balance.

## Retrieval first, generation second

Every client uploads their own documents: pricing, policies, product notes, FAQs. I chunk that content, embed it, and store the vectors in **PostgreSQL with pgvector**. When a visitor asks something, the assistant retrieves the most relevant chunks and answers *from those*, with the raw model only used to phrase the reply.

> The model is not the source of truth. The client's documents are. The model is just the voice.

This one decision removes most hallucination. If the answer is not in the retrieved context, the assistant says so and offers to connect the visitor with a human instead of inventing a number.

## Voice without the awkward pauses

The voice layer runs on the **OpenAI Realtime API** over a WebSocket, so audio streams both ways instead of waiting for a full turn to finish. The trick that made it feel natural was letting the model start speaking as soon as it had a confident opening, then continue as retrieval finished in the background.

\`\`\`js
// Stream partial audio the moment the first sentence is ready,
// instead of blocking on the full response.
socket.on('response.audio.delta', (chunk) => {
  speaker.play(chunk)
})
\`\`\`

## Booking is a first-class feature, not a link

The part people underrate: qualifying and booking. The assistant asks a couple of natural questions, decides whether the visitor fits, and if they do it opens a real slot and writes the meeting to the calendar. No "here is a link, good luck." The booking engine is its own service so it can enforce availability and avoid double-booking.

### What surprised me

1. Visitors trust a bot that admits what it does not know far more than one that always has an answer.
2. Voice sessions are longer and convert better than chat, but only when latency stays under about a second.
3. Ninety percent of the value came from retrieval quality, not from the model choice.

## Where it goes next

The next step is memory across visits, so a returning lead does not start from zero. But the core lesson holds: an assistant is only worth embedding if a business can trust it to run without someone watching it. Build for that trust first, and the wow follows.`,
  },
  {
    slug: 'which-tasks-are-worth-automating',
    title: 'The automation mindset: which tasks are actually worth it',
    excerpt:
      'Not everything repetitive should be automated. A simple, honest way to decide what to build, what to leave alone, and how to avoid automating a mess.',
    tag: 'Automation',
    tint: 'cyan',
    date: '2026-06-10',
    author: 'Rupam Bhakta',
    body: `The fastest way to waste a month is to automate the wrong task really well. I have done it, so now I run every idea through the same short filter before writing a line of code.

## The three questions

Before automating anything, I ask:

1. **How often does it actually happen?** Not how annoying it is, how *frequent*. A painful task you do twice a year is a bad target.
2. **Is the process stable?** If the steps change every week, you will spend more time maintaining the automation than you saved.
3. **What happens when it fails?** Automation fails silently and at scale. If a failure is expensive and hard to notice, you need guardrails before you need speed.

If a task is frequent, stable, and safe to get wrong occasionally, it is a strong candidate. Miss any one of those and I think twice.

## Do not automate a mess

Here is the trap. When a workflow is messy, automation feels like the fix. It is not. You are just making the mess run faster.

> Fix the process on paper first. If you cannot explain it in five plain steps, it is not ready to be automated.

Clean, then automate. Every time I skipped the clean step, I regretted it.

## Start with the boring 80 percent

The highest return is almost never the clever, edge-case-heavy part. It is the boring, high-volume middle. Copying data between two tools. Sending the same three follow-ups. Formatting a report the same way every Monday.

Automate that first, watch it for a week, and only then reach for the hard parts. The unglamorous wins compound quietly, and they rarely break.

## A quick gut check

If you can describe the task to a new teammate in two sentences and they could do it correctly, a machine probably can too. If it takes you ten minutes and a lot of "it depends," leave it with a human for now.`,
  },
  {
    slug: 'multi-agent-seo-model-routing',
    title: 'Multi-agent SEO: putting four models on one job',
    excerpt:
      'Seowyn runs a coordinated team of AI agents that audit a site and return a real growth plan. Here is why several models beat one, and how the routing actually works.',
    tag: 'AI Agents',
    tint: 'violet',
    date: '2026-05-28',
    author: 'Rupam Bhakta',
    body: `One model doing everything is simple to build and mediocre at everything. The moment I split the work across specialised agents, quality jumped. Seowyn is the result: a platform where a team of agents audits a site, researches competitors, and hands back a ninety day growth plan with ready-to-use deliverables.

## Why more than one model

Different models are genuinely good at different things, and pretending otherwise leaves quality on the table.

- One model is a strong, structured researcher.
- Another writes with a warmer, more human voice.
- A third is cheap and fast, perfect for high-volume classification.
- A fourth is excellent at strict, schema-bound output.

Routing each step to the model that fits it is the whole game.

## The orchestration layer

A coordinator breaks a job into tasks and dispatches each to the agent best suited for it. The heavy, long-running work runs on background workers with **Celery and Redis**, so the interface stays responsive while a full audit runs for minutes.

\`\`\`python
ROUTES = {
    "keyword_research": "reasoning-heavy",
    "draft_article":    "warm-writer",
    "classify_intent":  "fast-cheap",
    "structured_audit": "schema-strict",
}

def route(task):
    return ROUTES.get(task.kind, "default")
\`\`\`

Each agent returns structured output, the coordinator stitches the pieces together, and the user watches real-time progress instead of a spinner.

## Guardrails matter more than cleverness

With several models in play, the failure modes multiply. So every agent's output is validated against a schema before it moves downstream. If an agent returns something malformed, it is retried or routed elsewhere, and the run keeps going.

> A multi-agent system is only as trustworthy as its weakest validation step. Spend your time there.

## The takeaway

Multi-agent is not about stacking models for show. It is about matching each unit of work to the tool that does it best, then being strict about what each one is allowed to hand off. Do that, and a pipeline of ordinary steps produces a result no single model could.`,
  },
  {
    slug: 'shipping-fast-without-shipping-junk',
    title: 'Shipping fast without shipping junk',
    excerpt:
      'Speed and quality are not opposites. A short, practical checklist I run before anything I build goes in front of real users.',
    tag: 'Full-Stack',
    tint: 'green',
    date: '2026-05-15',
    author: 'Rupam Bhakta',
    body: `"Move fast" gets a bad name because people hear "skip the basics." That is not it. Moving fast means having a small set of non-negotiables that are so routine they cost you almost nothing, so you can be reckless about everything else.

## My pre-ship checklist

None of this is clever. That is the point.

1. **It works on a phone.** Most first visits are mobile. If it breaks on a small screen, it is broken.
2. **The error states exist.** Empty, loading, and failed are real screens, not afterthoughts.
3. **Nothing secret is in the client.** Keys live on the server. Always.
4. **One real user could use it without me.** If it needs a tour, it needs work.

That is the whole list for a first release. Four things, done every time.

## Boring architecture, interesting product

The product should be interesting. The stack under it should be boring and predictable: **React** on the front, a clean **REST API**, a database you understand, and deployment you can repeat in your sleep. Save your creativity for the thing the user actually touches.

> Boring infrastructure is a feature. It fails less, and it fails in ways you can predict.

## Ship, watch, then decide

The last step is the one people skip: ship the smallest honest version, then *watch it* with real usage before adding anything. Half the features I was sure I needed turned out to be unnecessary once I saw how people actually used the thing.

Fast and careful are not a trade. They are the same habit, practised until it is quiet.`,
  },
]

// ── helpers ───────────────────────────────────────────────────
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

// Posts other than `slug`, newest first, for the "keep reading" section.
export function relatedPosts(slug, n = 2) {
  return posts.filter((p) => p.slug !== slug).slice(0, n)
}
