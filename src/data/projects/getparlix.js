// GetParlix - AI chatbot & voice assistant platform.
// Source: projects/GetParlix_Project_Showcase.docx
// Rendered by pages/work/GetParlixPage.jsx - this shape is specific to that page.

// Screenshots live in src/assets/ and are imported so Vite fingerprints them
// and fails the build if a path is wrong. `ratio` matches each file's real
// aspect ratio so nothing gets cropped.
import cover from '../../assets/getparlix/getparlix.com_.png'
import bookingChat from '../../assets/getparlix/appointment-booking.png'
import voiceInPage from '../../assets/getparlix/voiceCall.png'
import voiceWidget from '../../assets/getparlix/voiceCall01.png'
import dashDocuments from '../../assets/getparlix/admin-dashboard1.png'
import dashScheduling from '../../assets/getparlix/admin-dashboard2-customize-appointmont-booking.png'

export default {
  slug: 'getparlix',
  title: 'GetParlix',
  kind: 'B2B SaaS · Conversational AI',
  year: '2026',
  status: 'LIVE',
  role: 'Designed, built & deployed end to end',
  tint: 'ember',
  cover,
  coverRatio: '2888/1714',
  links: { demo: 'https://getparlix.com', github: null },
  tags: ['React 19', 'Node.js', 'OpenAI Realtime', 'pgvector', 'WebSockets'],

  tagline: 'Your business. Your data. Powered by AI that sounds human.',
  summary:
    'An AI chatbot and voice assistant that answers customer questions, books appointments, and sends confirmations on any website. It runs 24/7, replies in under two seconds, and goes live with a single line of code. No developer needed.',

  meta: [
    ['Role', 'Product design → full-stack engineering → deployment'],
    ['Category', 'B2B SaaS · Conversational AI · Appointment automation'],
    ['Type', 'Multi-tenant platform with embeddable widget & voice assistant'],
  ],

  what: {
    label: 'What it is',
    title: 'A front desk that never clocks out.',
    body: [
      'GetParlix is an AI chatbot and voice assistant that lives on a business’s website and works like a front-desk employee who never clocks out. It answers customer questions, books appointments, and sends confirmations around the clock, all in natural, human-sounding conversation.',
      'The whole platform is built so any business can go live in under ten minutes. No developer, no website redesign, no new software to learn. The owner fills in a short onboarding wizard about their business, pastes one line of code into their site, and the assistant is ready to talk to customers.',
    ],
    pull: 'GetParlix turns a static website into a 24/7 conversation that captures leads, answers questions, and quietly fills the calendar.',
  },

  problem: {
    label: 'The problem',
    title: 'The gap after 5 p.m.',
    body: 'Customers don’t stop needing a business at 5 p.m., but the front desk does. Calls go unanswered, after-hours enquiries go cold, and staff burn hours every day repeating the same answers. That gap quietly leaks bookings, revenue, and trust, every single day.',
    stats: [
      { k: '60%', v: 'of inbound calls miss a live human' },
      { k: '20-30%', v: 'of after-hours bookings are lost' },
      { k: '2 hrs/day', v: 'staff spend on repeat FAQs' },
      { k: '$40K+', v: 'average yearly revenue left on the table' },
    ],
    note: 'Illustrative figures shown on the GetParlix site to frame the cost of the after-hours gap.',
  },

  audiences: [
    { title: 'Clinics & healthcare', body: 'Dental, medical, and wellness practices booking appointments and answering patient questions, all on HIPAA-eligible infrastructure.', icon: 'Stethoscope' },
    { title: 'Salons, spas & services', body: 'Beauty, fitness, and personal-care businesses that live and die by a full appointment calendar.', icon: 'Scissors' },
    { title: 'Local & home services', body: 'Trades and service providers that miss calls while on the job but still need to book the work.', icon: 'Wrench' },
    { title: 'Agencies & multi-client', body: 'Agencies rolling out branded, white-label assistants across many client websites from one platform.', icon: 'Building2' },
  ],
  audienceNote:
    'Because each client’s data is kept separate and the assistant learns only from that business’s own information, the same platform adapts to almost any industry without a custom rebuild.',

  steps: [
    { k: 'Sign up & train', v: 'The owner uploads FAQs, pricing, services, and availability through a guided wizard. GetParlix reads it all and becomes an expert on the business in minutes.' },
    { k: 'Paste one line of code', v: 'A single snippet drops into the website. It works with WordPress, Wix, Squarespace, Shopify, or any custom site.' },
    { k: 'Bookings come in', v: 'Customers chat, ask, and book 24/7. Confirmations go out automatically by email, SMS, and WhatsApp.' },
  ],

  features: [
    { title: '24/7 AI chat', body: 'Natural conversations for bookings, questions, and reschedules, any hour of any day, answered in under two seconds.', icon: 'MessagesSquare' },
    { title: 'In-chat booking', body: 'Real-time availability with clickable time slots, locked against double-booking. No forms, no redirects.', icon: 'CalendarCheck' },
    { title: 'Voice AI assistant', body: 'Phone-style, real-time voice conversations for customers who would rather talk than type.', icon: 'Mic' },
    { title: 'Email + SMS + WhatsApp', body: 'Confirmations and reminders sent automatically on whichever channel each customer prefers.', icon: 'Send' },
    { title: 'Admin dashboard', body: 'A self-service panel to manage bookings, FAQs, documents, availability, and staff in one clean workspace.', icon: 'LayoutDashboard' },
    { title: 'Analytics & insights', body: 'Track conversions, booking sources, peak hours, and no-show trends in real time.', icon: 'BarChart3' },
    { title: 'White-label widget', body: 'Match your brand colors, logo, and tone, and drop the GetParlix watermark on paid plans.', icon: 'Palette' },
    { title: 'Human handoff', body: 'When the AI can’t answer, it collects contact details and alerts the team so no lead slips through.', icon: 'UserRoundCheck' },
  ],

  dashboard: {
    label: 'The client dashboard',
    intro: 'Every business gets a self-service control center to run every part of its assistant. No technical knowledge needed.',
    items: [
      { k: 'Documents', v: 'Upload knowledge like PDFs, Word docs, and text files that train the assistant on the business.' },
      { k: 'Onboarding', v: 'A guided wizard that captures the business profile, services, products, pricing, policies, FAQs, and booking preferences.' },
      { k: 'Conversations', v: 'Review exactly what customers are asking, with search, date filters, and full transcripts.' },
      { k: 'Slots & booking history', v: 'A live daily availability grid plus a searchable, filterable log of every appointment.' },
      { k: 'Settings', v: 'Control timezone, slot duration, lead time, booking window, and working hours per day.' },
    ],
  },

  benefits: [
    { k: 'Never miss a customer', v: 'Captures and answers enquiries 24/7, including the nights and weekends when bookings are most often lost.' },
    { k: 'More booked appointments', v: 'Turns website visitors into scheduled appointments right inside the conversation, with double-booking protection.' },
    { k: 'Less repetitive work', v: 'Handles the routine FAQs that eat hours of staff time each day, so people can get on with higher-value work.' },
    { k: 'Live in minutes, not months', v: 'A ten-minute setup with one line of code. No developer, no redesign, no new platform to learn.' },
    { k: 'On-brand & trustworthy', v: 'A white-label experience that matches the business, backed by enterprise-grade security.' },
    { k: 'Decisions from real data', v: 'Analytics reveal what customers ask, when they book, and where the revenue comes from.' },
  ],

  integrations: [
    ['Website builders', 'WordPress, Wix, Squarespace, Shopify, and any site that accepts an HTML block.'],
    ['Calendars', 'Two-way sync with Google Calendar, Outlook, and Apple Calendar.'],
    ['Messaging', 'Automated confirmations and reminders over Email, SMS, and WhatsApp.'],
    ['Enterprise systems', 'Custom integrations and API access, including practice-management systems, on enterprise plans.'],
    ['Languages', 'English and Hindi at launch, with French, German, Portuguese, and Arabic on the roadmap.'],
  ],

  security: {
    intro: 'Businesses trust GetParlix with their customer conversations, so security is built into the foundation rather than bolted on afterward.',
    items: [
      { k: 'Per-client data isolation', v: 'Every business’s data is sandboxed and kept separate from every other client.' },
      { k: 'Encryption everywhere', v: 'TLS 1.3 protecting data in transit and AES-256 protecting data at rest.' },
      { k: 'Compliance-ready', v: 'HIPAA-eligible hosting with a BAA available, and GDPR-compliant data handling.' },
      { k: 'Safe fallback', v: 'A built-in human-handoff flow captures contact details whenever the AI reaches its limits.' },
    ],
  },

  scale: {
    stats: [
      { k: '100+', v: 'active client sites' },
      { k: '2.4M', v: 'conversations processed' },
      { k: '99.9%', v: 'uptime SLA' },
      { k: '~180 ms', v: 'average response time' },
    ],
    note: 'Public performance figures for the platform. Responses land in under two seconds.',
  },

  stack: {
    intro:
      'A modern, self-hosted, multi-tenant platform. I chose the stack for real-time responsiveness, solid AI understanding, and reliable scaling across many independent clients.',
    groups: [
      {
        group: 'Frontend',
        rows: [
          ['React 19', 'Component-driven UI for the marketing site, chat widget, and admin dashboard.'],
          ['Vite', 'Fast build tooling and optimized production bundles.'],
          ['Tailwind CSS', 'Utility-first styling for a consistent, responsive, brandable interface.'],
          ['React Router', 'Client-side routing across the dashboard and portal.'],
        ],
      },
      {
        group: 'Backend & APIs',
        rows: [
          ['Node.js + Express', 'Core application server and REST APIs powering chat, booking, and the portal.'],
          ['WebSockets', 'Real-time, low-latency streaming for live chat and voice.'],
          ['JWT + bcrypt', 'Secure authentication and password protection for client accounts.'],
          ['Zod', 'Strict validation of incoming data for safety and reliability.'],
        ],
      },
      {
        group: 'AI, voice & data',
        rows: [
          ['OpenAI (language + realtime voice)', 'Natural-language understanding, conversational replies, and real-time voice.'],
          ['PostgreSQL + pgvector', 'Primary database with vector search for AI knowledge retrieval over each client’s documents.'],
          ['Document processing', 'Automatic parsing of uploaded PDFs and Word docs into searchable knowledge.'],
          ['n8n', 'Workflow automation orchestrating messaging, notifications, and data ingestion.'],
        ],
      },
      {
        group: 'Infrastructure & DevOps',
        rows: [
          ['Docker & Docker Compose', 'Containerized services for consistent, reproducible deployments.'],
          ['Nginx reverse proxy', 'Traffic routing and TLS termination in front of the application.'],
          ['Let’s Encrypt (SSL/TLS 1.3)', 'Automated certificates and encrypted connections end to end.'],
          ['Self-hosted deployment', 'Full control over infrastructure, data residency, and scaling.'],
        ],
      },
    ],
  },

  ownership: {
    title: 'End-to-end ownership',
    intro: 'I designed, built, and shipped GetParlix on my own, owning every layer from the first wireframe to the live production system.',
    items: [
      { k: 'Product & design', v: 'Defined the problem, the product vision, the user flows, and the visual design of the marketing site, chat widget, and admin dashboard.' },
      { k: 'Full-stack development', v: 'Built the React front-ends and the Node.js backend, the real-time chat and voice layer, the AI knowledge retrieval, and the appointment-booking engine.' },
      { k: 'AI integration', v: 'Wired conversational AI, vector-based knowledge retrieval, and a real-time voice assistant into one coherent experience.' },
      { k: 'Deployment & operations', v: 'Containerized the platform, set up the reverse proxy, TLS, and workflow automation, and deployed it as a live, multi-tenant service.' },
    ],
  },

  closing:
    'GetParlix turns an ordinary business website into something that’s always awake. It answers instantly, books appointments in real time, and never lets a customer slip away after hours.',

  // Fills the space beside the page title.
  heroShot: {
    src: bookingChat,
    ratio: '450/642',
    caption: 'In-chat booking: the assistant taking a date, no forms',
  },

  // Portrait shot of the widget itself - sits beside the "what it is" prose.
  widgetShot: {
    src: voiceWidget,
    ratio: '456/756',
    caption: 'Voice mode: the assistant listening on a live site',
  },

  gallery: [
    { src: voiceInPage, ratio: '1897/912', caption: 'A voice call running over the live site' },
    { src: dashDocuments, ratio: '1902/925', caption: 'Admin dashboard: the documents that train the assistant' },
    { src: dashScheduling, ratio: '1900/912', caption: 'Scheduling logic, slot duration, and working hours' },
  ],
}
