// Seowyn - autonomous multi-agent SEO growth platform.
// Rendered by pages/work/SeowynPage.jsx - this shape is specific to that page.
//
// Images are imported (so Vite fingerprints them and the build fails on a bad
// path) and each `ratio` is the file's real pixel aspect ratio, so screenshots
// are shown in full - never cropped.
import cover from '../../assets/Seowyn/main.png'
import shotWorkspace from '../../assets/Seowyn/your-sites.png'
import shotStart from '../../assets/Seowyn/start-a-free-trial.png'
import shotSetup from '../../assets/Seowyn/step-by-step-setup.png'
import shotTopics from '../../assets/Seowyn/blog-topic-based-on-keyword-research.png'
import shotDashboard from '../../assets/Seowyn/all-in-one.png'

export default {
  slug: 'seowyn',
  title: 'Seowyn',
  kind: 'AI Platform · Multi-agent',
  year: '2026',
  status: 'LIVE',
  role: 'Design & full-stack engineering',
  tint: 'green',

  cover,
  coverRatio: '1516/911',
  coverCaption: 'Seowyn: autonomous SEO that turns one URL into compounding organic traffic.',
  coverUrl: 'seowyn.com',

  links: { demo: 'http://187.77.19.74:8090/', github: null },
  tags: ['Next.js', 'FastAPI', 'Multi-agent AI', 'Celery + Redis', 'Playwright'],

  tagline: 'An autonomous multi-agent SEO growth platform.',
  summary:
    'Point it at a website and a coordinated team of AI specialists audits the site, researches the market, studies competitors, and hands back a ready-to-use 90-day growth plan. The articles, landing pages, and campaigns come already written.',

  meta: [
    ['Input', 'One web address'],
    ['Output', '12 finished deliverables plus a 90-day roadmap'],
    ['Architecture', 'Multi-agent pipeline with smart model routing'],
  ],

  overview: {
    label: 'Overview',
    title: 'One input. A whole agency’s output.',
    body: [
      'Seowyn is a full-stack platform that replaces a scattered, expensive workflow with a single autonomous system. Getting a website found on search engines normally means hiring separate specialists for site audits, keyword research, content writing, competitor analysis, and advertising. That’s slow, costly, and hard to coordinate.',
      'The experience is deliberately simple: you give it a website address, and it hands back a full growth strategy. Under that simplicity is a system where several AI specialists each own a discipline and pass their findings down the line, a lot like a real marketing team working together on one plan.',
    ],
  },

  // Full-width shot placed right after the overview - the actual product home.
  workspace: {
    src: shotWorkspace,
    ratio: '1917/861',
    url: 'app.seowyn.com/sites',
    caption: 'The workspace: every site you add, with an at-a-glance health score and the next actions waiting.',
  },

  problems: {
    label: 'The problem',
    title: 'Growth work that never quite gets done.',
    intro:
      'For most small businesses, marketers, and founders, growing a website’s visibility is slow, costly, and confusing. The usual path forces a choice between expensive agencies, scattered subscriptions, and a lot of guesswork.',
    items: [
      'Professional agencies charge substantial monthly retainers and can take weeks to deliver a first plan.',
      'The work is spread across many disconnected tools that don’t share context with one another.',
      'Reports are dense with jargon and rarely make it clear what to actually do next.',
      'Even after paying for a strategy, you still have to write the content, build the campaigns, and run the outreach yourself.',
      'Small teams simply can’t afford a dedicated specialist for every discipline SEO needs.',
    ],
  },

  compare: {
    label: 'Before / after',
    title: 'At a glance',
    heads: ['The traditional way', 'With Seowyn'],
    rows: [
      ['Costs thousands per month and takes weeks to deliver a plan.', 'A complete strategy in minutes, at a fraction of the cost.'],
      ['Work is split across a dozen tools that don’t talk to each other.', 'One system covers every discipline end to end from a single input.'],
      ['Reports are full of jargon and rarely say what to do next.', 'Clear, prioritized actions, so the next best move is always obvious.'],
      ['You still have to produce the content and campaigns yourself.', 'Deliverables arrive pre-built and ready to launch.'],
      ['Enterprise capability is out of reach for small teams.', 'Agency-grade output that solo owners and lean teams can actually use.'],
    ],
  },

  // Image-led walkthrough - each step is explained by a full screenshot.
  walkthrough: {
    label: 'How it works',
    title: 'A look inside.',
    intro:
      'Four steps take a business from a single URL to a launch-ready growth plan. Each one is a real screen from the product.',
    steps: [
      {
        n: '01',
        k: 'Start with one URL',
        v: 'Create an account and point Seowyn at your first site. A free foundation audit crawls it, finds the issues, and maps your keywords in minutes. No credit card, no setup call.',
        src: shotStart,
        ratio: '1816/905',
        url: 'app.seowyn.com/signup',
        caption: 'Onboarding: free to start, with a full foundation audit on the first site.',
      },
      {
        n: '02',
        k: 'A guided setup, not a blank page',
        v: 'A getting-started checklist walks you from the audit to a content schedule to Google Search Console. The sidebar opens up the full toolset: insights, analytics, calendar, review queue, blog topics, and social.',
        src: shotSetup,
        ratio: '1896/867',
        url: 'app.seowyn.com/insights',
        caption: 'Getting started: five guided steps unlock the full dashboard.',
      },
      {
        n: '03',
        k: 'Keyword research becomes ready-to-write content',
        v: 'The content agent turns keyword research into long-tail blog topics your site can realistically rank for, ordered most-specific first, each with the reasoning behind it and a one-click “write article”.',
        src: shotTopics,
        ratio: '1906/867',
        url: 'app.seowyn.com/blog-topics',
        caption: 'Blog Topics: keyword-researched, ranked most-specific first, ready to write.',
      },
      {
        n: '04',
        k: 'Everything tracked in one place',
        v: 'A single dashboard follows organic performance and coverage across technical setup, content, keywords, links, and social, so progress is always visible, never a black box.',
        src: shotDashboard,
        ratio: '1538/867',
        url: 'app.seowyn.com/dashboard',
        caption: 'Insights: organic performance and coverage across every discipline, in one view.',
      },
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
    { k: 'Ownership', v: 'The platform is self-hostable and private, so the strategy and data stay in your hands.' },
    { k: 'Repeatability', v: 'You can run it for any site, any time, and get a consistent, high-quality result.' },
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
    'Seowyn shows what happens when a team of AI specialists is orchestrated to work together: a problem that normally takes many people, several tools, and weeks of effort gets solved end to end from a single click.',
}
