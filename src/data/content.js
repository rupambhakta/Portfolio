// ─────────────────────────────────────────────────────────────
// ALL SITE CONTENT LIVES HERE. Edit this file to update the site.
// Search "TODO" for the links / media you should fill in.
// ─────────────────────────────────────────────────────────────

// About-page photos — converted to WebP so they load fast.
import aboutPortrait from '../assets/about/my-image.webp'
import aboutAtWork from '../assets/about/my-image2.webp'
import aboutCampus from '../assets/about/collage.webp'

export const profile = {
  name: 'Rupam Bhakta',
  first: 'Rupam',
  last: 'Bhakta',
  role: 'AI Automation Engineer · Full-Stack Developer',
  email: 'rupambhakta2020@gmail.com',
  github: 'https://github.com/rupambhakta',
  linkedin: 'https://www.linkedin.com/in/rupam-bhakta-b622b0222',
  x: 'https://x.com/rupam_bhakta',
  instagram: 'https://www.instagram.com/sani.bhakta',
  facebook: 'https://www.facebook.com/rupam.bhakta.10',
  bookingUrl: '#contact',
  location: 'India → Worldwide',
  available: true,
}

// `href: '/#id'` → smooth-scrolls to a homepage section.
// `to: '/path'`  → a real route (react-router link).
export const nav = [
  { label: 'Work', href: '/#work' },
  { label: 'Services', href: '/#services' },
  { label: 'About', to: '/about' },
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
    'Right now I’m a Full-Stack Developer & AI Engineer at Micronix System, building production apps and AI features. On the side, I build AI agents and automations for businesses that want to move faster without hiring a bigger team.',
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
      role: 'Full-Stack Developer & AI Engineer',
      org: 'Micronix System Pvt. Ltd.',
      period: 'Nov 2025 — Present',
      body: 'Building production full-stack applications and shipping AI-powered features end-to-end — from data and APIs to polished, responsive interfaces.',
    },
    {
      role: 'MERN Developer',
      org: 'PCS Global Pvt. Ltd., Kolkata',
      period: 'Jul 2025 — Oct 2025',
      body: 'Built scalable, responsive full-stack apps; optimized performance and reliability; Git-based team collaboration.',
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

// ─── ABOUT PAGE (/about) ───────────────────────────────────────
// The long-form story. Reuses about.experience / skills / education /
// certifications above so there is a single source of truth.
export const aboutPage = {
  eyebrow: 'About me',
  role: 'Full-Stack Developer & AI Engineer',
  locationFull: 'Kolkata, India — working worldwide',
  lead: 'I build software that quietly does the work — full-stack apps and AI systems that take the slow, repetitive parts of a business and run them automatically.',
  portrait: aboutPortrait,
  atWork: aboutAtWork,
  campus: aboutCampus,
  story: {
    label: 'My story',
    title: ['From building websites', 'to building agents.'],
    body: [
      'I’m Rupam — a full-stack developer and AI engineer based in Kolkata, India, working with clients and teams around the world. I started out building websites and full MERN-stack applications, and kept coming back to the same question on every project: which parts of this could just run themselves?',
      'That question pulled me into automation and applied AI. Today I design and ship AI agents, workflow automations, and full-stack products end-to-end — from the database and APIs to the interface people actually touch. I care as much about reliability and clean architecture as I do about the wow factor, because an automation is only useful if a business can trust it to run without babysitting.',
      'By day I’m a Full-Stack Developer & AI Engineer at Micronix System. Alongside that, I build my own AI products — a 24/7 voice-and-chat assistant, an autonomous SEO growth platform, and more — both to sharpen my craft and to give the people I work with something real they can see, click, and try.',
    ],
  },
  principles: {
    label: 'How I work',
    title: ['A few things', 'I believe.'],
    items: [
      { k: 'Engineer first', v: 'Real full-stack foundations mean the AI I add is reliable and maintainable — not a demo that breaks the moment it hits production.' },
      { k: 'Automate the boring', v: 'I use AI to remove busywork, not as a gimmick. If a task is repetitive, it can probably run itself.' },
      { k: 'Ship end-to-end', v: 'Database, API, interface, deploy — I own the whole path from a rough idea to something you can actually use.' },
      { k: 'Clear & honest', v: 'Plain-English updates, fast replies, and a straight answer on what’s worth building and what isn’t.' },
    ],
  },
  closing:
    'If it’s repetitive, it can probably be automated. Tell me what’s slowing your team down — I’ll tell you honestly whether it’s worth building.',
}

export const contact = {
  eyebrow: "Let's talk",
  title: ['Let’s automate', 'the boring stuff.'],
  sub: "Tell me what’s eating your team’s time. I’ll tell you if an AI agent or automation can fix it — free, no pressure.",
  primaryCta: { label: 'Book a free call', href: '#' }, // TODO: booking link
  formCta: { label: 'Send me a message', to: '/contact' },
}

// ─── CONTACT PAGE (/contact) ───────────────────────────────────
// `endpoint`: server.js accepts this JSON POST and sends it through
// Nodemailer using the SMTP values in .env.

export const contactPage = {
  eyebrow: 'Contact',
  title: ['Tell me what’s', 'slowing you down.'],
  sub: 'Fill this in and I’ll reply within one business day with a straight answer: whether automation is worth it for you, roughly what it takes, and what it costs.',
  endpoint: '/api/contact',
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
