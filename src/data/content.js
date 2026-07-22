// ─────────────────────────────────────────────────────────────
// ALL SITE CONTENT LIVES HERE. Edit this file to update the site.
// Search "TODO" for the links / media you should fill in.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Rupam Bhakta',
  first: 'Rupam',
  last: 'Bhakta',
  role: 'AI Automation Engineer · Full-Stack Developer',
  email: 'rupambhakta2020@gmail.com',
  github: 'https://github.com/rupambhakta',
  linkedin: '#', // TODO: LinkedIn URL
  bookingUrl: '#contact', // TODO: Calendly / Cal.com link (or keep #contact)
  location: 'India → Worldwide',
  available: true,
}

// `href: '/#id'` → smooth-scrolls to a homepage section.
// `to: '/path'`  → a real route (react-router link).
export const nav = [
  { label: 'Work', href: '/#work' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', to: '/contact' },
]

export const hero = {
  eyebrow: ['AI Automation Engineer', 'Full-Stack Developer', 'India → Worldwide'],
  // headline rendered as display lines; {ember}/{outline} mark styling
  lines: [
    [{ t: 'I build AI systems' }],
    [{ t: 'that run the ' }, { t: 'busywork', ember: true }],
    [{ t: 'so you don’t.', outline: true }],
  ],
  sub: 'Rupam Bhakta — I design and ship AI agents, automations, and full-stack apps that save growing teams hours every week.',
  primaryCta: { label: 'See selected work', href: '/#work' },
  secondaryCta: { label: 'Book a call', href: '/#contact' },
  stats: [
    { k: '2', v: 'Live AI products' },
    { k: 'MERN + AI', v: 'Full-stack + automation' },
    { k: 'Global', v: 'Remote · USD' },
  ],
}

export const marqueeItems = [
  'AI Agents',
  'Workflow Automation',
  'Voice & Chat Bots',
  'SEO Agents',
  'MERN Apps',
  'Next.js',
  'n8n',
  'Real-time Systems',
  'API Integrations',
]

export const services = {
  eyebrow: 'What I do',
  title: ['I turn repetitive work', 'into software that runs itself.'],
  intro:
    'From always-on AI assistants to the full-stack apps behind them — I take ideas from prompt to production.',
  items: [
    {
      no: '01',
      title: 'AI Agents & Assistants',
      body: 'Voice and chat assistants that answer, qualify leads, and book appointments 24/7 — embeddable on any site.',
      tags: ['Voice AI', 'Chatbots', 'LLM APIs'],
    },
    {
      no: '02',
      title: 'Workflow Automation',
      body: 'Connect your tools so repetitive tasks run themselves — reliable, observable n8n + custom pipelines.',
      tags: ['n8n', 'Integrations', 'Webhooks'],
    },
    {
      no: '03',
      title: 'SEO & Growth Agents',
      body: 'Autonomous agents that research keywords, audit pages, and draft optimized content to climb rankings.',
      tags: ['SEO', 'Content', 'Automation'],
    },
    {
      no: '04',
      title: 'Full-Stack Web Apps',
      body: 'MERN and Next.js apps done right: real-time features, dashboards, auth, REST APIs, and CMS-driven sites.',
      tags: ['React', 'Next.js', 'Node', 'MongoDB'],
    },
  ],
}

// ─── PROJECTS ──────────────────────────────────────────────────
// Each project has a homepage card + a full case-study page at /work/<slug>.
// `cover` / gallery `src` are null → a labelled placeholder renders so you can
// see exactly where to drop screenshots, GIFs, or video embeds.
// `tint` colors the placeholder gradient. Fill TODOs when you have assets/links.

export const projects = [
  {
    slug: 'ai-voice-chat-assistant',
    title: 'AI Voice & Chat Assistant',
    kind: 'AI Product',
    year: '2026',
    status: 'LIVE',
    role: 'Design, engineering & deployment',
    tint: 'ember',
    summary:
      'A 24/7 voice + chat assistant that answers questions, qualifies leads, and books appointments — embeds on any website in one line.',
    cover: null, // TODO: /work/voicebot-cover.jpg
    links: { demo: 'https://getparlix.com', github: null, caseStudy: '/work/ai-voice-chat-assistant' },
    tags: ['LLM APIs', 'Node.js', 'Web widget', 'Voice'],
    overview:
      'Most small teams lose hours every week answering the same questions and chasing leads after hours. This assistant handles both — over voice and chat — in the business’s own tone, and hands off to a human when it should.',
    challenge:
      'Make an assistant that feels human, never sleeps, works on any tech stack with a single embed, and books real appointments — without hallucinating outside the business’s knowledge.',
    approach: [
      'Grounded the model on the business’s own content so answers stay accurate and on-brand.',
      'Built a one-line embeddable widget that drops onto any site — no framework lock-in.',
      'Wired appointment booking and lead capture straight into the conversation flow.',
      'Added graceful human hand-off and full transcripts for every conversation.',
    ],
    features: [
      { k: 'Voice + text', v: 'Natural two-way conversations' },
      { k: 'Lead capture', v: 'Qualifies and routes automatically' },
      { k: 'One-line embed', v: 'Works on any stack' },
      { k: 'Grounded', v: 'Trained on your own content' },
    ],
    outcome:
      'A live, always-on front desk that captures leads and books meetings around the clock — and a flagship demo that shows exactly what an AI agent can do for a business.',
    gallery: [
      { src: null, ratio: '16/10', caption: 'Widget in action on a live site' }, // TODO
      { src: null, ratio: '1/1', caption: 'Chat flow — lead qualification' }, // TODO
      { src: null, ratio: '1/1', caption: 'Voice call transcript view' }, // TODO
    ],
  },
  {
    slug: 'seo-ranking-agent',
    title: 'SEO Ranking Agent',
    kind: 'AI Product',
    year: '2026',
    status: 'LIVE',
    role: 'Design & engineering',
    tint: 'green',
    summary:
      'An autonomous agent that researches keywords, audits pages, and drafts optimized content so businesses climb search rankings without an agency.',
    cover: null, // TODO
    links: { demo: 'http://187.77.19.74:8090/', github: null, caseStudy: '/work/seo-ranking-agent' },
    tags: ['LLM APIs', 'n8n', 'Node.js', 'SEO'],
    overview:
      'SEO is high-leverage but time-consuming: research, audits, briefs, drafts, tracking. This agent runs that pipeline end-to-end and puts a human in the loop only where it matters.',
    challenge:
      'Turn a messy, manual SEO workflow into a repeatable pipeline that produces genuinely useful, publish-ready output — not generic AI filler.',
    approach: [
      'Chained keyword + SERP research into structured content briefs.',
      'Automated on-page audits that flag concrete, prioritized fixes.',
      'Generated drafts from the briefs, kept a human approval step before publishing.',
      'Tracked rankings over time to close the loop and re-prioritize.',
    ],
    features: [
      { k: 'Research', v: 'Keyword + SERP analysis' },
      { k: 'Audits', v: 'Prioritized on-page fixes' },
      { k: 'Drafting', v: 'Brief-driven content' },
      { k: 'Tracking', v: 'Rank monitoring' },
    ],
    outcome:
      'A working agent that compresses days of SEO busywork into an automated pipeline — and a clear upsell for automation clients who want growth on autopilot.',
    gallery: [
      { src: null, ratio: '16/10', caption: 'Agent dashboard / run output' }, // TODO
      { src: null, ratio: '1/1', caption: 'Keyword research view' }, // TODO
      { src: null, ratio: '1/1', caption: 'On-page audit report' }, // TODO
    ],
  },
]

export const about = {
  eyebrow: 'About',
  title: ['Engineer who', 'automates the', 'boring parts.'],
  paragraphs: [
    'I’m Rupam — a full-stack developer and automation engineer based in India, working with clients worldwide. I build on the MERN stack and pair it with modern AI tooling to turn slow, manual, repetitive work into reliable systems that run on their own.',
    'Right now I’m a MERN Developer at PCS Global, shipping scalable web apps. On the side, I build AI agents and automations for businesses that want to move faster without hiring a bigger team.',
    'If it’s repetitive, it can probably be automated — let’s find out what that’s worth to you.',
  ],
  skills: [
    { label: 'Frontend', items: ['React.js', 'Next.js', 'Tailwind CSS', 'JavaScript (ES6+)'] },
    { label: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'Java'] },
    { label: 'Data', items: ['MongoDB', 'SQL (basic)'] },
    { label: 'AI & Automation', items: ['AI agents', 'LLM APIs', 'n8n', 'SEO agent'] },
    { label: 'Tools', items: ['Git / GitHub', 'Strapi', 'Cloudinary', 'Socket.IO'] },
  ],
  experience: [
    {
      role: 'MERN Developer',
      org: 'PCS Global Pvt. Ltd., Kolkata',
      period: 'Jul 2025 — Present',
      body: 'Building scalable, responsive full-stack apps; optimizing performance and reliability; Git-based team collaboration.',
    },
    {
      role: 'Software Engineer',
      org: 'ASP OL Media Pvt. Ltd., Jabalpur',
      period: 'Mar 2025 — Jul 2025',
      body: 'Responsive HTML/CSS email systems; DNS/SMTP deliverability; IP warm-up and domain/IP reputation monitoring.',
    },
  ],
  education: {
    degree: 'B.Tech, Computer Science & Engineering',
    org: 'Calcutta Institute of Technology',
    period: '2025 · CGPA 8.2',
  },
  certifications: [
    'Java Programming — PW Skills (2024)',
    'JavaScript & React — Hitesh Choudhary (2025)',
    'Android App Development — Udemy (2023)',
  ],
}

export const contact = {
  eyebrow: "Let's talk",
  title: ['Let’s automate', 'the boring stuff.'],
  sub: "Tell me what’s eating your team’s time. I’ll tell you if an AI agent or automation can fix it — free, no pressure.",
  primaryCta: { label: 'Book a free call', href: '#' }, // TODO: booking link
  formCta: { label: 'Send me a message', to: '/contact' },
}

// ─── CONTACT PAGE (/contact) ───────────────────────────────────
// `endpoint`: paste a form-backend URL (Formspree, Basin, Web3Forms,
// your own /api route…) that accepts a JSON POST. Leave it empty and
// the form falls back to opening a pre-filled email in the visitor’s
// mail client — so it works with zero setup either way.

export const contactPage = {
  eyebrow: 'Contact',
  title: ['Tell me what’s', 'slowing you down.'],
  sub: 'Fill this in and I’ll reply within one business day with a straight answer: whether automation is worth it for you, roughly what it takes, and what it costs.',
  endpoint: '', // TODO: form backend URL (e.g. https://formspree.io/f/xxxxxxx)
  responseTime: 'Usually replies within 24 hours',
  aside: {
    title: 'What happens next',
    steps: [
      { k: '01', v: 'I read your message and reply within one business day.' },
      { k: '02', v: 'A short call — 20 minutes — to dig into the workflow.' },
      { k: '03', v: 'You get a written scope, timeline, and fixed price.' },
    ],
    note: 'Prefer email? Write to me directly — same inbox, same reply time.',
  },
  projectTypes: [
    'AI agent / assistant',
    'Workflow automation',
    'SEO & growth agent',
    'Full-stack web app',
    'Something else',
  ],
  budgets: ['Under $1k', '$1k — $3k', '$3k — $10k', '$10k+', 'Not sure yet'],
}
