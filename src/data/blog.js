// ─────────────────────────────────────────────────────────────
// BLOG CONTENT. Add a post by dropping a new object in `posts`.
// `body` is written in a small subset of Markdown (see components/blog/
// Markdown.jsx): ## / ### headings, **bold**, *italic*, `code`, > quotes,
// - lists, 1. lists, ```code blocks```, [links](url), ![alt](img), and ---.
// Keep the copy human: no em dashes anywhere.
// ─────────────────────────────────────────────────────────────

// Banner art per post. Swap any of these for your own image (see the banner
// prompt guide) by dropping a file in assets/blog/ and importing it here.
import coverVoice from '../assets/blog/voice-assistant-that-books-its-own-meetings.svg'
import coverAutomation from '../assets/blog/which-tasks-are-worth-automating.svg'
import coverSeo from '../assets/blog/multi-agent-seo-model-routing.svg'
import coverShipping from '../assets/blog/shipping-fast-without-shipping-junk.svg'
import coverWorkflow from '../assets/blog/multi-agent-workflow-architecture-hero.webp'
import workflowArchitecture from '../assets/blog/multi-agent-workflow-architecture-diagram.svg'
import workflowRecovery from '../assets/blog/multi-agent-workflow-recovery-flow.svg'
import blogSchedule from './blog-schedule.json'

// Page-level copy for /blog.
export const blogMeta = {
  eyebrow: 'The Journal',
  title: ['Notes from', 'the build.'],
  intro:
    'Field notes on AI agents, automation, and shipping full-stack products that people actually use. No hype, just what worked, what broke, and what I would do differently.',
}

// Each post carries a `tint` (ember / violet / cyan / green) used for its
// cover and accents, so the listing stays colourful without leaning on red.
const postSource = [
  {
    slug: 'multi-agent-workflow-architecture',
    title: 'Multi-Agent Workflow Architecture: Reliable Systems Under Control',
    excerpt:
      'How I used bounded roles, code-led orchestration, durable state, validation, and human gates to keep a complex agent workflow inspectable and recoverable.',
    tag: 'AI Agents',
    tint: 'ember',
    cover: coverWorkflow,
    coverAlt: 'Multi-agent workflow architecture hero showing a controlled orchestration rail and bounded specialist nodes.',
    ogImage: '/images/blog/multi-agent-workflow-architecture-og.webp',
    heroLines: ['BUILDING RELIABLE', 'MULTI-AGENT WORKFLOW', 'ARCHITECTURE WITH CONTROL'],
    heroSubline: 'BOUNDED ROLES. DURABLE STATE. HUMAN GATES.',
    date: '2026-08-16',
    featured: true,
    author: 'Rupam Bhakta',
    seoTitle: 'Multi-Agent Workflow Architecture: Reliable Control by Design',
    metaDescription:
      'See how a reliable multi-agent workflow architecture uses bounded agents, durable state, validation, retries, and human approval without losing control.',
    body: `A reliable multi-agent system needs a control plane that can explain what runs next, why it runs, and when it must stop.

A multi-agent workflow architecture fails when nobody can answer a simple question: who owns the next decision?

That was the core constraint behind Seowyn. The platform starts with one website address and turns it into a foundation audit, keyword and competitor research, content assets, campaign planning, and a prioritised 90-day roadmap. The [public case study](/work/seowyn) describes a multi-agent pipeline with model routing. The difficult part was never making several models produce text. It was keeping the workflow observable when tasks ran for different lengths, depended on earlier evidence, or failed for different reasons.

My direct answer is this: reliability comes from putting autonomy inside a deterministic control plane. A coordinator owns state and sequence. Specialist agents receive narrow contracts. Every output is validated before it can become another agent's input. Long-running work is queued. Retries have budgets. High-impact or ambiguous results stop at a human gate.

## The problem was coordination, not model intelligence

A single model can often complete a surprisingly long task. Splitting work across agents only earns its complexity when the task has distinct reasoning domains, incompatible toolsets, or stages that benefit from parallel execution. [OpenAI's agent guidance](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/) makes the same point: start with one agent, then split when complex instructions or overlapping tools become difficult to manage [1].

Seowyn crosses that line because a technical audit, keyword discovery, competitor evidence, long-form writing, and a 90-day plan are different jobs. They need different inputs, tools, output formats, and quality checks. Treating them as one enormous conversation would make the run hard to resume, compare, or diagnose.

The architecture therefore separates two kinds of work:

- The control plane decides what may run, what it depends on, how many times it may retry, and what constitutes completion.
- The model plane handles bounded reasoning inside a task contract. It can suggest and synthesise, but it cannot silently redefine the workflow.

## The multi-agent workflow architecture

![Control-led architecture from request through bounded specialist agents, validation, synthesis, and a human approval gate.](${workflowArchitecture})

The diagram is deliberately asymmetric. Agents are not peers chatting until they agree. A central coordinator owns the run. That manager pattern is useful when one component must combine specialist outputs and enforce shared controls. [OpenAI's orchestration documentation](https://openai.github.io/openai-agents-python/multi_agent/) distinguishes this from handoffs, where a specialist takes over the interaction [2].

## 1. Make each agent sign a contract

An agent should not receive the entire project history and a vague request to help. It should receive a versioned input, an allowed tool set, an output schema, a retry limit, and a clear stop condition. This reduces accidental scope growth and makes failures comparable across runs.

The following is a synthetic, valid JSON example. It illustrates the contract shape and does not expose Seowyn's private prompts or source code.

\`\`\`json
{
  "job_id": "seo_01HXYZ",
  "task": "keyword_research",
  "input_refs": ["site_snapshot:v3"],
  "allowed_tools": ["search_data_api"],
  "output_schema": "KeywordSetV2",
  "max_attempts": 3,
  "requires_human_approval": false
}
\`\`\`

The important detail is that the contract stores references to approved inputs rather than copying an uncontrolled transcript into every prompt. It also gives the validator something concrete to check.

## 2. Keep business state outside the model conversation

Chat history is context, not a reliable database. The run needs a durable record of task status, input versions, produced artefacts, validation results, attempt count, and reason codes. Seowyn's published stack includes PostgreSQL, Redis, and Celery. That combination supports a useful separation: durable business records belong in the database, while queue messages coordinate work that may be retried or redelivered.

[Celery's task documentation](https://docs.celeryq.dev/en/stable/userguide/tasks.html) warns that tasks should ideally be idempotent because messages can be delivered again. It also supports bounded retries, exponential backoff, and jitter [3]. Idempotency means that running the same task twice with the same inputs does not create unintended duplicate effects.

Database transactions still need care. [PostgreSQL's transaction documentation](https://www.postgresql.org/docs/18/mvcc.html) explains how Read Committed gives each command a fresh snapshot, while stronger isolation can reject conflicting work and require the application to retry [5]. In practice, the workflow should use uniqueness constraints, compare-and-set transitions, or row locks where duplicate task claims would be harmful.

## 3. Parallelise evidence collection, not dependent decisions

Parallel work is useful when tasks do not depend on one another. Audit checks, keyword discovery, and competitor collection may be able to fan out after the website snapshot is ready. The synthesis stage must wait for the required evidence set.

[Celery's workflow primitives](https://docs.celeryq.dev/en/stable/userguide/canvas.html) map cleanly to this idea. A group runs independent tasks in parallel, a chain links dependent steps, and a chord runs a callback only after a group has completed [4]. The documentation also warns that synchronisation has overhead. Parallelism should therefore reflect the dependency graph, not a desire to make the architecture look more agentic.

## Control comes from explicit gates

The most important control is not a longer system prompt. It is an executable gate between stages. I use four kinds of gate in this architecture pattern:

- Schema gate. Reject malformed or incomplete output before another task can consume it.
- Evidence gate. Require source references for claims that will influence later recommendations.
- Policy gate. Block actions outside the task's allowed tools, tenant boundary, or data scope.
- Human gate. Pause when the decision is ambiguous, high-impact, irreversible, or intended for publication.

Guardrails are layered. [OpenAI's guidance](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/) describes input, tool-use, and output guardrails, together with human intervention for sensitive or failure-prone workflows [1]. No single check proves that an answer is correct. The aim is to catch different failure classes at the boundary where they become actionable.

## Failure must have a named next state

![Failure recovery state diagram showing accepted, running, validating, succeeded, retry wait, human review, and failed states.](${workflowRecovery})

A generic failed flag is not enough. A timeout, invalid schema, rate limit, missing source, policy rejection, and human-review request have different next actions. Each transition should carry a run ID, task ID, input version, route, attempt count, timestamp, and reason code.

This is also why live progress should be an event stream rather than an optimistic spinner. Seowyn's published stack includes WebSockets. [FastAPI's WebSocket support](https://fastapi.tiangolo.com/advanced/websockets/) allows a client and server to keep a connection open and exchange messages, which is suitable for pushing state transitions to the interface [6]. The browser should still be able to reload the canonical run state from the API after a disconnect.

## What this architecture does not solve

More control does not remove uncertainty. A validator can accept a plausible but weak answer. Two agents can repeat the same source and create false confidence. A model route that worked last month can change after a provider update. Queue delivery guarantees do not automatically make business effects safe.

The architecture limits the blast radius, preserves evidence, and makes a run resumable. It does not guarantee perfect research, rankings, or business outcomes. Model and prompt changes still need versioning and evaluation against representative tasks. Sensitive actions still need explicit authorisation.

## What I would keep boring

The durable parts of this system are conventional software: task contracts, state transitions, database constraints, logs, timeouts, retry budgets, and approval queues. Model names can change without forcing the workflow to change. That is the point of model routing, which I discuss in [Multi-agent SEO: putting four models on one job](/blog/multi-agent-seo-model-routing). The same discipline appears in [shipping fast without shipping junk](/blog/shipping-fast-without-shipping-junk): define what must stay true before optimising the clever part.

The [Seowyn case study](/work/seowyn) shows the product context behind this architecture. Its public workflow starts with one URL and produces twelve deliverables plus a prioritised 90-day roadmap. The reliability lesson is smaller: every autonomous step needs a bounded role, durable state, a validator, and a clear owner when the machine cannot decide.

## The lesson

A reliable multi-agent workflow architecture is not a room full of capable agents. It is a controlled sequence of contracts, state transitions, and gates. Code owns the workflow. Models handle the uncertain reasoning inside it. Humans retain authority over the decisions that deserve judgement.

If your team has a multi-step workflow that feels too fragile to automate, send me the workflow through the [contact page](/contact). I will tell you honestly where agents help, where deterministic code is safer, and where a human should stay in the loop.

## References

1. [OpenAI, A practical guide to building agents](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/).
2. [OpenAI Agents SDK, Agent orchestration](https://openai.github.io/openai-agents-python/multi_agent/).
3. [Celery 5.6 documentation, Tasks](https://docs.celeryq.dev/en/stable/userguide/tasks.html).
4. [Celery 5.6 documentation, Canvas: Designing Workflows](https://docs.celeryq.dev/en/stable/userguide/canvas.html).
5. [PostgreSQL 18 documentation, Concurrency Control](https://www.postgresql.org/docs/18/mvcc.html).
6. [FastAPI documentation, WebSockets](https://fastapi.tiangolo.com/advanced/websockets/).`,
  },
  {
    slug: 'voice-assistant-that-books-its-own-meetings',
    title: 'How I built a 24/7 assistant that books its own meetings',
    excerpt:
      'A chat and voice agent that answers questions, qualifies leads, and puts real meetings on a calendar. Here is the architecture, the parts that were hard, and the parts that surprised me.',
    tag: 'AI Agents',
    tint: 'ember',
    cover: coverVoice,
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
    cover: coverAutomation,
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
    cover: coverSeo,
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
    cover: coverShipping,
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

// The source bundle contains every authored post, but only posts marked
// published in the schedule are exposed to the journal and route resolver.
const scheduleBySlug = new Map(blogSchedule.map((entry) => [entry.slug, entry]))
export const posts = postSource.filter((post) => scheduleBySlug.get(post.slug)?.status === 'published')

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

// Previous (older) and next (newer) post, by list order (newest first).
export function adjacentPosts(slug) {
  const i = posts.findIndex((p) => p.slug === slug)
  return {
    newer: i > 0 ? posts[i - 1] : null,
    older: i >= 0 && i < posts.length - 1 ? posts[i + 1] : null,
  }
}
