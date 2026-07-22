// Seowyn — autonomous multi-agent SEO growth platform.
// Source: projects/Seowyn_Project_Documentation.docx
// Rendered by pages/work/SeowynPage.jsx — this shape is specific to that page.

// Imported so Vite fingerprints it and the build fails on a bad path.
// `coverRatio` is the file's real aspect ratio, so nothing crops.
import cover from '../../assets/Seowyn/main.png'

export default {
  slug: 'seowyn',
  title: 'Seowyn',
  kind: 'AI Platform · Multi-agent',
  year: '2026',
  status: 'LIVE',
  role: 'Design & full-stack engineering',
  tint: 'green',
  cover,
  coverRatio: '1918/777',
  coverCaption: 'Workspace — every site added, with at-a-glance health and pending work',
  links: { demo: 'http://187.77.19.74:8090/', github: null },
  tags: ['Next.js', 'FastAPI', 'Multi-agent AI', 'Celery + Redis', 'Playwright'],

  tagline: 'An autonomous multi-agent SEO growth platform.',
  summary:
    'Point it at a website and a coordinated team of AI specialists audits the site, researches the market, studies competitors, and hands back a ready-to-use 90-day growth plan — with the articles, landing pages, and campaigns already written.',

  meta: [
    ['Input', 'One web address'],
    ['Output', '12 finished deliverables + a 90-day roadmap'],
    ['Architecture', 'Multi-agent pipeline with smart model routing'],
  ],

  overview: {
    label: 'Overview',
    title: 'One input. A whole agency’s output.',
    body: [
      'Seowyn is a full-stack platform that replaces a fragmented and expensive workflow with a single autonomous system. Getting a website found on search engines normally means hiring separate specialists for site audits, keyword research, content writing, competitor analysis, and advertising — slow, costly, and hard to coordinate.',
      'The experience is deliberately simple: the user provides a website address, and the platform delivers a comprehensive growth strategy. Beneath that simplicity is a sophisticated system in which multiple AI specialists each own a discipline and pass their findings down the line — much like the members of a real marketing team collaborating on a shared plan.',
    ],
  },

  problems: {
    label: 'The problem',
    title: 'Growth work that never quite gets done.',
    intro:
      'For most small businesses, marketers, and founders, growing a website’s visibility is slow, costly, and confusing. The typical path forces a choice between expensive agencies, scattered subscriptions, and a great deal of guesswork.',
    items: [
      'Professional agencies charge substantial monthly retainers and can take weeks to deliver a first plan.',
      'The necessary work is spread across many disconnected tools that don’t share context with one another.',
      'Reports are dense with jargon and rarely make it clear what to actually do next.',
      'Even after paying for a strategy, the client still has to write the content, build the campaigns, and run the outreach themselves.',
      'Small teams simply cannot afford a dedicated specialist for every discipline SEO requires.',
    ],
  },

  compare: {
    label: 'Before / after',
    title: 'At a glance',
    heads: ['The traditional way', 'With Seowyn'],
    rows: [
      ['Costs thousands per month and takes weeks to deliver a plan.', 'A complete strategy generated in minutes, at a fraction of the cost.'],
      ['Work is split across a dozen tools that don’t talk to each other.', 'One system covers every discipline end-to-end from a single input.'],
      ['Reports are full of jargon and rarely say what to do next.', 'Clear, prioritized actions — the next best move is always obvious.'],
      ['You still have to produce the content and campaigns yourself.', 'Deliverables arrive pre-built and ready to launch.'],
      ['Enterprise capability is out of reach for small teams.', 'Agency-grade output made accessible to solo owners and lean teams.'],
    ],
  },

  stages: {
    label: 'How it works',
    title: 'Four stages, one run.',
    items: [
      { k: 'Enter a website', v: 'The user pastes in any web address, optionally adding context such as target competitors, region, or budget — or lets the system infer it automatically.', icon: 'Link2' },
      { k: 'The agents get to work', v: 'A team of AI specialists audits the site, researches the market, studies competitors, and builds each part of the strategy in a coordinated sequence.', icon: 'Bot' },
      { k: 'Watch progress live', v: 'A real-time dashboard shows each specialist moving from pending to running to complete, so the process is transparent rather than a black box.', icon: 'Activity' },
      { k: 'Download deliverables', v: 'Once the run completes, everything is packaged and ready to use — from the audit and keyword list to drafted articles and campaigns.', icon: 'Download' },
    ],
  },

  deliverables: {
    label: 'What it produces',
    title: 'Every run ships twelve finished pieces.',
    intro: 'A full set of practical deliverables covering the entire modern search and content playbook.',
    items: [
      'A full technical and on-page website audit.',
      'A prioritized list of keyword opportunities to target.',
      'A competitor intelligence report highlighting gaps and openings.',
      'On-page optimization recommendations for the existing site.',
      'An analytics and tracking setup plan to measure results.',
      'Search-ready, long-form articles drafted and ready to publish.',
      'Conversion-focused landing pages.',
      'Paid advertising campaign plans.',
      'A backlink and outreach toolkit, including templates.',
      'A social media content calendar.',
      'Monthly performance reports.',
      'A prioritized 90-day roadmap tying it all together.',
    ],
  },

  benefits: [
    { k: 'Speed', v: 'Weeks of specialist work compressed into minutes of automated effort.' },
    { k: 'Affordability', v: 'Agency-level output without the agency-level monthly retainer.' },
    { k: 'Clarity', v: 'Prioritized, plain-language actions instead of overwhelming raw data.' },
    { k: 'Transparency', v: 'Live progress and traceable outputs, so it is always clear what was produced and why.' },
    { k: 'Completeness', v: 'One system spans the entire playbook, so nothing important slips through the cracks.' },
    { k: 'Actionability', v: 'Deliverables are ready to launch, not just recommendations to interpret.' },
    { k: 'Ownership', v: 'The platform is self-hostable and private, keeping the strategy and data in the user’s hands.' },
    { k: 'Repeatability', v: 'It can be run for any site, any time, producing a consistent, high-quality result.' },
  ],

  audiences: [
    'Small business owners who want a professional growth plan without hiring an agency or learning SEO themselves.',
    'Marketers who want to skip the busywork and start each campaign from a complete, researched foundation.',
    'Freelancers and consultants who want to deliver agency-quality work to more clients in a fraction of the time.',
    'Startups and founders who need to move fast on organic growth without a dedicated marketing hire.',
  ],

  stack: {
    intro:
      'A modern, production-grade full-stack build, designed for reliability, scale, and genuine autonomous coordination between AI agents.',
    groups: [
      { group: 'Frontend', body: 'Next.js, React, TypeScript, Tailwind CSS, and a real-time progress dashboard.' },
      { group: 'Backend & APIs', body: 'Python, FastAPI, WebSockets, and REST APIs.' },
      { group: 'AI & orchestration', body: 'A multi-agent architecture with smart model routing across leading AI models, including Claude, GPT-4o, Google Gemini, and DeepSeek.' },
      { group: 'Data & processing', body: 'PostgreSQL, Redis, a Celery task queue, and automated web crawling with Playwright.' },
      { group: 'Infrastructure & integrations', body: 'Docker, Nginx, CI/CD automation, and integrations with Google Search Console, PageSpeed Insights, and search-data APIs.' },
    ],
  },

  closing:
    'Seowyn demonstrates what becomes possible when a team of AI specialists is orchestrated to work together — taking a problem that normally requires many people, multiple tools, and weeks of effort, and solving it end-to-end from a single click.',

  gallery: [
    { src: null, ratio: '16/10', caption: 'Live run dashboard — agents in progress' }, // TODO
    { src: null, ratio: '1/1', caption: 'Keyword opportunity report' }, // TODO
    { src: null, ratio: '1/1', caption: 'Generated 90-day roadmap' }, // TODO
  ],
}
