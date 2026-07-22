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
    { k: '3', v: 'AI products shipped' },
    { k: 'MERN + AI', v: 'Full-stack + automation' },
    { k: 'Global', v: 'Remote · USD' },
  ],
}

// `icon` is a lucide-react name — see the ICONS map in components/Marquee.jsx.
export const marqueeItems = [
  { label: 'AI Agents', icon: 'Bot' },
  { label: 'Workflow Automation', icon: 'Workflow' },
  { label: 'Voice & Chat Bots', icon: 'Mic' },
  { label: 'SEO Agents', icon: 'TrendingUp' },
  { label: 'MERN Apps', icon: 'Boxes' },
  { label: 'Next.js', icon: 'Triangle' },
  { label: 'n8n', icon: 'Waypoints' },
  { label: 'Real-time Systems', icon: 'Activity' },
  { label: 'API Integrations', icon: 'Webhook' },
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
// Projects now live one-per-file in data/projects/. Each has its own
// data shape and its own bespoke page under pages/work/, so a case
// study is never forced into a layout that does not fit it.
// Re-exported here so the homepage keeps importing from content.js.

export { projects } from './projects/index.js'

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
