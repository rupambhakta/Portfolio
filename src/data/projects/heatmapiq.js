// HeatMapIQ — turns heatmap exports into a ranked list of fixes.
// Source: projects/HeatMapIQ-Case-Study.docx
// Rendered by pages/work/HeatMapIQPage.jsx — this shape is specific to that page.

export default {
  slug: 'heatmapiq',
  title: 'HeatMapIQ',
  kind: 'Product Case Study · Analytics',
  year: '2026',
  status: 'BUILT',
  role: 'Product design & full-stack engineering',
  tint: 'violet',
  cover: null, // TODO: /work/heatmapiq-cover.jpg
  links: { demo: null, github: null }, // TODO: live URL / repo if you want them shown
  tags: ['React', 'FastAPI', 'PostgreSQL', 'Recharts', 'Playwright'],

  tagline: 'Turn website heatmaps into a ranked list of fixes.',
  summary:
    'A web app that reads the behaviour data you already collect and hands your team a clear, prioritised plan to improve any page — with progress tracking and one-click sharing.',

  kpis: [
    { k: '3', v: 'Heatmap types read' },
    { k: 'Minutes', v: 'From upload to report' },
    { k: '1 link', v: 'To share any report' },
    { k: 'Zero', v: 'New tracking to install' },
  ],

  overview: {
    label: 'Overview',
    title: 'What is HeatMapIQ?',
    body: [
      'Modern analytics tools can record how visitors behave on a website — where they click, how far they scroll, and which parts of a page hold their attention. This behaviour is captured as “heatmaps.” The problem is that the raw exports are dense, cryptic tables that most teams never open, let alone act on.',
      'HeatMapIQ closes that gap. It takes the heatmap exports a team already collects and turns them into a plain-English report: a ranked list of what is going wrong on each page, the evidence behind every issue, the recommended fix, and the expected impact. Teams tick off each fix as it ships, watch a progress bar fill up, and share a read-only version of the report through a single link.',
    ],
    pull: 'It converts a pile of data nobody reads into a short to-do list everybody can follow.',
  },

  problems: {
    label: 'The challenge',
    title: 'The problem it solves',
    intro:
      'Website and marketing teams collect behaviour data, but turning it into action is slow and requires specialist skill. Three pain points come up again and again.',
    items: [
      { k: 'The raw data is unreadable', v: 'Heatmap exports describe page elements in a technical shorthand, so it is hard to tell which real button, image, or link a number actually refers to.' },
      { k: 'It is hard to know what matters most', v: 'A page can have dozens of small signals. Without a way to rank them, teams either fix low-impact things or freeze because everything looks equally urgent.' },
      { k: 'Findings get lost', v: 'Insights live in one person’s spreadsheet. There is no shared place to track which fixes were done, by whom, or to show a client the results.' },
    ],
    outro:
      'The outcome is guesswork: teams redesign pages on instinct, disagree about priorities, and rarely close the loop on whether a change helped.',
  },

  signals: {
    label: 'The solution',
    title: 'Three signals, read in plain English.',
    intro:
      'HeatMapIQ was built to make behaviour data usable by anyone on the team — not just analysts. It reads the three standard heatmap types and translates them into everyday language.',
    items: [
      { k: 'Clicks', v: 'Including “dead clicks,” where people tap something that isn’t actually clickable — a clear sign the design is misleading them.', icon: 'MousePointerClick' },
      { k: 'Scroll depth', v: 'How far down the page visitors actually get, so important content and calls-to-action can be moved into view.', icon: 'ArrowDownWideNarrow' },
      { k: 'Attention', v: 'Which sections hold people’s focus and which are quietly ignored.', icon: 'Eye' },
    ],
    outro:
      'Every finding is tagged with a severity level, so the highest-impact fixes rise to the top. Teams work the list from the top down, mark each item as fixed, and share the live report — with its running progress — whenever they need to.',
    severities: ['Critical', 'High', 'Medium', 'Low'],
  },

  steps: {
    label: 'How it works',
    title: 'From raw data to action in three steps.',
    items: [
      { k: 'Upload the exports', v: 'Drop in the click, scroll, and attention files for a page. Optionally add the page’s web address so every finding is tied to the real element on the page.' },
      { k: 'Get an instant analysis', v: 'HeatMapIQ reviews the data and produces a ranked report — dead clicks, drop-off points, and attention gaps — each with the evidence and a recommended fix, in plain English.' },
      { k: 'Act, track & share', v: 'Work through the issues by priority, tick off each fix as it ships, and share a read-only link with teammates or clients — the shared view always shows the latest progress.' },
    ],
  },

  features: {
    label: 'Features',
    title: 'What’s inside',
    intro: 'Everything a team needs to act on behaviour data, organised so nothing gets lost.',
    items: [
      { title: 'Plain-English recommendations', body: 'Each issue explains what the data shows, where it is on the page, the recommended fix, and the impact you can expect.', icon: 'FileText' },
      { title: 'Severity-ranked issues', body: 'Every finding is tagged critical, high, medium, or low, so the most valuable fixes are always at the top of the list.', icon: 'ListOrdered' },
      { title: 'Dead-click detection', body: 'Automatically flags clicks that land on things that aren’t clickable — a fast route to spotting confusing design.', icon: 'MousePointerClick' },
      { title: 'Scroll & attention insights', body: 'Visual charts reveal exactly where visitors stop scrolling and where their attention concentrates on the page.', icon: 'BarChart3' },
      { title: 'Fix tracking', body: 'Tick each recommendation as done and watch an “X of Y fixed” progress bar, with a record of who completed what.', icon: 'CircleCheckBig' },
      { title: 'One-click sharing', body: 'Generate a read-only public link to any report — with live progress — and switch it off again whenever you like.', icon: 'Share2' },
      { title: 'Team workspace', body: 'Group pages under projects and invite teammates as owners, editors, or viewers, keeping every report where it belongs.', icon: 'Users' },
      { title: 'Passwordless sign-in', body: 'Members log in with a one-time code sent to their email — no passwords to create, forget, or reset.', icon: 'KeyRound' },
    ],
  },

  payoff: {
    label: 'The payoff',
    title: 'Benefits & outcomes',
    intro:
      'HeatMapIQ turns a specialist, time-consuming task into something any team member can do in minutes — and it changes how decisions get made.',
    items: [
      { k: 'Stop guessing', v: 'Decisions are grounded in what visitors actually do, not opinions — so teams stop debating and start shipping the right changes.' },
      { k: 'Focus on what pays off', v: 'Severity ranking puts the highest-impact fixes first, so limited time goes to the changes most likely to lift results.' },
      { k: 'Recover lost visitors', v: 'Surfacing drop-off points and dead clicks helps move key content into view and remove friction that quietly costs conversions.' },
      { k: 'Move faster', v: 'What used to need a specialist and hours of spreadsheet work becomes a report anyone can produce and act on in minutes.' },
      { k: 'Keep everyone aligned', v: 'A shared, always-current report means the whole team — and clients — see the same priorities and the same progress.' },
      { k: 'Show the results', v: 'A read-only link with a live progress bar makes it easy to demonstrate the work done and the improvements delivered.' },
    ],
  },

  audiences: {
    label: 'Audience',
    title: 'Who it’s for',
    intro:
      'Designed for the people responsible for how a website performs, whether or not they have a data background.',
    items: [
      { k: 'Product & UX teams', v: 'Who want evidence for design decisions and a clear list of what to improve next.' },
      { k: 'Marketing & growth teams', v: 'Focused on lifting conversions and getting more from the traffic they already have.' },
      { k: 'Agencies & freelancers', v: 'Who need a professional, shareable report to show clients the problems found and the fixes delivered.' },
      { k: 'Small business owners', v: 'Who collect behaviour data but don’t have an analyst to make sense of it.' },
    ],
  },

  stack: {
    intro:
      'A full-stack web application, built to run in a browser so the whole team can use it from anywhere — and so it can be extended over time.',
    rows: [
      ['Frontend', 'React, Vite, React Router, Recharts (interactive charts)'],
      ['Backend', 'Python, FastAPI'],
      ['Database', 'PostgreSQL (with SQLite for local development)'],
      ['AI enrichment (optional)', 'OpenAI and Anthropic — with a built-in rule-based engine so it works with no AI key at all'],
      ['Page rendering', 'Playwright headless browser (reads JavaScript-heavy pages)'],
      ['Deployment', 'Docker & Docker Compose, served behind nginx'],
      ['Security', 'Passwordless one-time-code sign-in with secure sessions'],
    ],
    highlight: {
      k: 'Design highlight',
      v: 'AI is optional by design. HeatMapIQ produces a full report on its own, and can layer AI on top for richer wording when a key is provided — so it is never dependent on a single external service.',
    },
  },

  closing: 'HeatMapIQ — see behaviour, improve results.',

  gallery: [
    { src: null, ratio: '16/10', caption: 'Report view — severity-ranked issues' }, // TODO
    { src: null, ratio: '1/1', caption: 'Scroll depth & attention charts' }, // TODO
    { src: null, ratio: '1/1', caption: 'Shared read-only report with progress' }, // TODO
  ],
}
