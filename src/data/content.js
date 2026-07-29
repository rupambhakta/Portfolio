// ─────────────────────────────────────────────────────────────
// ALL SITE CONTENT LIVES HERE. Edit this file to update the site.
// Search "TODO" for the links / media you should fill in.
// ─────────────────────────────────────────────────────────────

// About-page photos - converted to WebP so they load fast.
import aboutPortrait from '../assets/about/my-image.webp'
import aboutAtWork from '../assets/about/my-image2.webp'
import aboutCampus from '../assets/about/collage.webp'

export const profile = {
  name: 'Rupam Bhakta',
  first: 'Rupam',
  last: 'Bhakta',
  role: 'Full-Stack Developer · AI Engineer',
  email: 'rupambhakta2020@gmail.com',
  github: 'https://github.com/rupambhakta',
  linkedin: 'https://www.linkedin.com/in/rupam-bhakta-b622b0222',
  x: 'https://x.com/rupam_bhakta',
  instagram: 'https://www.instagram.com/sani.bhakta',
  facebook: 'https://www.facebook.com/rupam.bhakta.10',
  bookingUrl: '#contact',
  location: 'India, working worldwide',
  available: true,
}

// `href: '/#id'` → smooth-scrolls to a homepage section.
// `to: '/path'`  → a real route (react-router link).
export const nav = [
  { label: 'Work', href: '/#work' },
  { label: 'Services', href: '/#services' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

export const hero = {
  eyebrow: ['AI Automation Engineer', 'Full-Stack Developer', 'India, working worldwide'],
  // headline rendered as display lines; {ember}/{outline} mark styling
  lines: [
    [{ t: 'I build AI systems' }],
    [{ t: 'that run the ' }, { t: 'busywork', ember: true }],
    [{ t: 'so you don’t.', outline: true }],
  ],
  sub: 'I’m Rupam. I build AI agents, automations, and full-stack apps that hand growing teams back the hours they’d otherwise lose to busywork.',
  primaryCta: { label: 'See selected work', href: '/#work' },
  secondaryCta: { label: 'Book a call', href: '/#contact' },
  stats: [
    { k: '3', v: 'AI products shipped' },
    { k: 'MERN + AI', v: 'Full-stack and automation' },
    { k: 'Global', v: 'Remote, paid in USD' },
  ],
}

// `icon` is a lucide-react name - see the ICONS map in components/Marquee.jsx.
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
    'Always-on AI assistants, the automations behind them, and the full-stack apps they live in. I take an idea from a rough sketch to something running in production.',
  items: [
    {
      no: '01',
      title: 'AI Agents & Assistants',
      body: 'Voice and chat assistants that answer, qualify leads, and book appointments around the clock. They drop onto any site.',
      tags: ['Voice AI', 'Chatbots', 'LLM APIs'],
    },
    {
      no: '02',
      title: 'Workflow Automation',
      body: 'I connect your tools so the repetitive tasks run themselves. Reliable, observable n8n and custom pipelines.',
      tags: ['n8n', 'Integrations', 'Webhooks'],
    },
    {
      no: '03',
      title: 'SEO & Growth Agents',
      body: 'Agents that research keywords, audit your pages, and draft optimized content so you climb the rankings.',
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
    'I’m Rupam, a full-stack developer and automation engineer based in India, working with clients all over the world. I build on the MERN stack and pair it with modern AI tools, so the slow, manual, repetitive work turns into systems that just run on their own.',
    'These days I work as a Full-Stack Developer and AI Engineer at Micronix System, building production apps and AI features. On the side, I build AI agents and automations for businesses that want to move faster without hiring a bigger team.',
    'If a task is repetitive, there’s a good chance it can be automated. Tell me what’s eating your time and I’ll help you work out whether it’s worth it.',
  ],
  skills: [
    { label: 'Frontend', items: ['React.js', 'Next.js', 'Tailwind CSS', 'JavaScript'] },
    { label: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'Java'] },
    { label: 'Data', items: ['MongoDB', 'PostgreSQL'] },
    { label: 'AI & Automation', items: ['AI agents', 'LLM APIs', 'n8n', 'SEO agent'] },
    { label: 'Model APIs', items: ['Claude', 'GPT-4o', 'Gemini', 'DeepSeek'] },
    { label: 'Tools', items: ['Git / GitHub', 'Strapi', 'Cloudinary', 'Socket.IO'] },
  ],
  experience: [
    {
      role: 'Full-Stack Developer & AI Engineer',
      org: 'Micronix System Pvt. Ltd.',
      short: 'Micronix System',
      url: 'https://micronixsystem.com/',
      period: 'Nov 2025 to now',
      body: 'Building production full-stack applications and shipping AI-powered features end to end, from the data and APIs to polished, responsive interfaces.',
    },
    {
      role: 'MERN Developer',
      org: 'PCS Global Pvt. Ltd., Kolkata',
      short: 'PCS Global',
      url: 'https://www.pcsglobal.in/',
      period: 'Jul 2025 to Oct 2025',
      body: 'Built scalable, responsive full-stack apps, kept performance and reliability tight, and worked with the team through Git.',
    },
    {
      role: 'Software Engineer',
      org: 'ASP OL Media Pvt. Ltd., Jabalpur',
      short: 'ASP OL Media',
      url: 'https://www.aspolmedia.in/',
      period: 'Mar 2025 to Jul 2025',
      body: 'Built responsive HTML/CSS email systems, handled DNS and SMTP deliverability, and ran IP warm-up and domain reputation monitoring.',
    },
  ],
  education: {
    degree: 'B.Tech, Computer Science & Engineering',
    org: 'Calcutta Institute of Technology',
    url: 'https://citulb.in/',
    period: '2025 · CGPA 8.2',
  },
  certifications: [
    'Java Programming, PW Skills (2024)',
    'JavaScript & React, Hitesh Choudhary (2025)',
    'Android App Development, Udemy (2023)',
  ],
}

// ─── ABOUT PAGE (/about) ───────────────────────────────────────
// The long-form story. Reuses about.experience / skills / education /
// certifications above so there is a single source of truth.
export const aboutPage = {
  eyebrow: 'About me',
  role: 'Full-Stack Developer & AI Engineer',
  locationFull: 'Kolkata, India. Working worldwide.',
  lead: 'I build software that quietly gets the work done. Full-stack apps and AI systems that take the slow, repetitive parts of a business and handle them on their own.',
  portrait: aboutPortrait,
  atWork: aboutAtWork,
  campus: aboutCampus,
  story: {
    label: 'My story',
    title: ['From building websites', 'to building agents.'],
    body: [
      'I’m Rupam, a full-stack developer and AI engineer based in Kolkata, India, working with clients and teams around the world. I started out building websites and full MERN-stack apps, and I kept coming back to the same question on every project: which parts of this could just run themselves?',
      'That question pulled me into automation and applied AI. Now I design and ship AI agents, workflow automations, and full-stack products end to end, from the database and APIs all the way to the screen people actually use. I care about reliability and clean architecture just as much as the wow factor, because an automation is only worth anything if a business can trust it to run without someone watching over it.',
      'By day I work as a Full-Stack Developer and AI Engineer at Micronix System. Alongside that, I build my own AI products: a 24/7 voice and chat assistant, an autonomous SEO growth platform, and a few others. I build them partly to keep sharpening my craft, and partly so the people I work with have something real they can see, click, and try.',
    ],
  },
  principles: {
    label: 'How I work',
    title: ['A few things', 'I believe.'],
    items: [
      { k: 'Engineer first', v: 'I have real full-stack foundations, so the AI I add is reliable and easy to maintain. Not a flashy demo that falls over the moment it reaches production.' },
      { k: 'Automate the boring', v: 'I use AI to take busywork off people’s plates, not as a gimmick. If a task is repetitive, there’s a good chance it can run itself.' },
      { k: 'Ship end-to-end', v: 'Database, API, interface, deployment. I own the whole path from a rough idea to something you can actually use.' },
      { k: 'Clear & honest', v: 'Plain-English updates, quick replies, and a straight answer on what’s worth building and what isn’t.' },
    ],
  },
  closing:
    'If it’s repetitive, it can probably be automated. Tell me what’s slowing your team down and I’ll give you an honest answer on whether it’s worth building.',
}

export const contact = {
  eyebrow: "Let's talk",
  title: ['Let’s automate', 'the boring stuff.'],
  sub: "Tell me what’s eating your team’s time. I’ll tell you honestly whether an AI agent or automation can fix it. Free, and no pressure.",
  primaryCta: { label: 'Book a free call', href: '#' }, // TODO: booking link
  formCta: { label: 'Send me a message', to: '/contact' },
}

// ─── CONTACT PAGE (/contact) ───────────────────────────────────
// `endpoint`: server.js accepts this JSON POST and sends it through
// Nodemailer using the SMTP values in .env.

export const contactPage = {
  eyebrow: 'Contact',
  title: ['Tell me what’s', 'slowing you down.'],
  sub: 'Fill this in and I’ll get back to you within one business day with a straight answer: whether automation is worth it for you, roughly what it takes, and what it costs.',
  endpoint: '/api/contact',
  responseTime: 'Usually replies within 24 hours',
  aside: {
    title: 'What happens next',
    steps: [
      { k: '01', v: 'I read your message and reply within one business day.' },
      { k: '02', v: 'We hop on a short call, about 20 minutes, to dig into the workflow.' },
      { k: '03', v: 'You get a written scope, timeline, and fixed price.' },
    ],
    note: 'Prefer email? Write to me directly. Same inbox, same reply time.',
  },
  projectTypes: [
    'AI agent / assistant',
    'Workflow automation',
    'SEO & growth agent',
    'Full-stack web app',
    'Something else',
  ],
  budgets: ['Under $1k', '$1k to $3k', '$3k to $10k', '$10k+', 'Not sure yet'],
}
