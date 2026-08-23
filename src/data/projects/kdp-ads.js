// KDP Ads Platform - an analytics + automation system for Amazon KDP advertising.
// Source: internal project documentation (client name, book titles, servers and
// workflow internals deliberately omitted). Rendered by pages/work/KDPAdsPage.jsx.
//
// Copy is kept deliberately short and every point carries an icon - the page is
// built to be scanned, not read. Only anonymised dashboards are shown, and the
// n8n canvases are blurred so no node name is legible (see the two n8n-*.webp).
import dashExecutive from '../../assets/kdp/dashboard-executive.webp'
import dashMarketplace from '../../assets/kdp/dashboard-marketplace.webp'
import n8nCanvas from '../../assets/kdp/n8n-canvas.webp'
import n8nFlow from '../../assets/kdp/n8n-flow.webp'
import n8nHero from '../../assets/kdp/n8n-hero.webp'
import guardrails from '../../assets/kdp/guardrails.webp'

export default {
  slug: 'kdp-ads',
  title: 'KDP Ads Platform',
  kind: 'Client Project · Analytics & Automation',
  year: '2026',
  status: 'BUILT',
  role: 'Solo build - data pipelines, automation & dashboards',
  tint: 'cyan',
  cover: dashExecutive,
  coverRatio: '1849/802',
  links: { demo: null, github: null }, // private client work

  tags: ['n8n', 'Amazon Ads API', 'PostgreSQL', 'Metabase', 'OpenAI'],

  // Decorative n8n backgrounds (faded + scrimmed behind sections).
  heroBg: guardrails,

  tagline: 'Turn Amazon Ads data into automated, profitable decisions.',
  summary:
    'One system for a KDP publisher running 100+ book titles across four marketplaces. It pulls the ad and sales numbers every day, shows what is actually profitable, and safely automates the bid and budget work.',

  kpis: [
    { k: '4', v: 'Marketplaces, one view', icon: 'Globe' },
    { k: '100+', v: 'Book titles managed', icon: 'Layers' },
    { k: 'Daily', v: 'Hands-off data refresh', icon: 'RefreshCw' },
    { k: '0', v: 'Manual spreadsheets', icon: 'CircleCheckBig' },
  ],

  statement: 'One place to see, and to act on, exactly which books are making money.',

  problems: {
    label: 'The problem',
    title: 'Why they needed it',
    items: [
      { k: 'Numbers split apart', v: 'Ad spend in one place, royalties in another - joined by hand every week.', icon: 'Scissors' },
      { k: 'No real profit view', v: 'ACOS alone hides which titles actually make money.', icon: 'Eye' },
      { k: 'Too slow to optimise', v: 'Hundreds of campaigns, impossible to tune by hand.', icon: 'RefreshCw' },
    ],
  },

  gains: {
    label: 'What it does',
    title: 'Five jobs, fully automated',
    items: [
      { title: 'Collects the data', body: 'Campaigns, keywords and reports pulled from Amazon Ads every day.', icon: 'Plug' },
      { title: 'Joins ads to sales', body: 'Matched by book so every title shows its true cost and profit.', icon: 'Layers' },
      { title: 'Shows it clearly', body: 'Live dashboards for spend, sales and profit by title and market.', icon: 'LayoutDashboard' },
      { title: 'Warns in time', body: 'Instant alerts for overspend, ACOS drift and spend spikes.', icon: 'Bell' },
      { title: 'Optimises safely', body: 'Rule-based bid and budget changes behind an approval gate.', icon: 'SlidersHorizontal' },
    ],
  },

  pipeline: {
    label: 'How it works',
    title: 'From Amazon’s data to a decision.',
    intro: 'One loop, running on a schedule: collect, clean, measure, then act.',
    stages: [
      { key: 'source', title: 'Amazon Ads', sub: 'US · UK · EU · AU', icon: 'Globe' },
      { key: 'orchestrate', title: 'Collect', sub: 'Every day, on time', icon: 'Workflow' },
      { key: 'warehouse', title: 'Store', sub: 'Clean, one place', icon: 'Database' },
      { key: 'metrics', title: 'Measure', sub: 'True profit per book', icon: 'Gauge' },
      { key: 'act', title: 'Act', sub: 'Dashboards · alerts', icon: 'Target' },
    ],
  },

  n8n: {
    label: 'The engine',
    title: 'Built and running in n8n.',
    intro: 'The whole pipeline is orchestrated in n8n - scheduled, self-retrying, and running across every marketplace without anyone touching it.',
    note: 'Workflow detail is intentionally blurred - this shows the shape of the automation, not its internals.',
    canvas: { src: n8nCanvas, ratio: '1661/982', caption: 'The full multi-marketplace pipeline' },
    flow: { src: n8nFlow, ratio: '1910/861', caption: 'One report workflow, end to end' },
  },

  metrics: {
    label: 'The numbers',
    title: 'What it measures',
    items: [
      { k: 'ACOS', v: 'Ad cost vs ad sales', icon: 'Gauge' },
      { k: 'TACoS', v: 'The real profit test', icon: 'Target' },
      { k: 'ROAS', v: 'Return on ad spend', icon: 'TrendingUp' },
      { k: 'CTR · CVR', v: 'Clicks and conversions', icon: 'MousePointerClick' },
      { k: 'Net profit', v: 'Royalties minus spend', icon: 'DollarSign' },
      { k: 'Market mix', v: 'Where sales come from', icon: 'Globe' },
    ],
  },

  dashboards: {
    label: 'The dashboards',
    title: 'Spend, sales and profit in one look.',
    intro: 'Filter by date, marketplace or campaign - summary up top, full detail underneath.',
    executive: {
      src: dashExecutive,
      ratio: '1849/802',
      caption: 'Executive summary: royalties, spend, profit, ACOS and TACoS.',
    },
    marketplace: {
      src: dashMarketplace,
      ratio: '1837/692',
      caption: 'Where royalties come from, and ad-driven vs organic sales.',
    },
  },

  automation: {
    label: 'Safe by design',
    title: 'Automation that never acts blind.',
    intro: 'Every automated change clears the same three-step gate before it touches a live campaign.',
    bg: n8nHero,
    steps: [
      { k: 'Dry run', v: 'The rules show exactly what they would change - nothing applied yet.', icon: 'Eye' },
      { k: 'Approve', v: 'A human okays the changes to make, keeping full control of spend.', icon: 'UserRoundCheck' },
      { k: 'Apply & log', v: 'Changes go live, get logged, and can be rolled back any time.', icon: 'CircleCheckBig' },
    ],
    guardrails: ['Rate-limit aware', 'Change log', 'Rollback', 'Human approval'],
  },

  payoff: {
    label: 'The payoff',
    title: 'What changed',
    items: [
      { k: 'Hours back weekly', v: 'Reporting that was manual now runs itself.', icon: 'RefreshCw' },
      { k: 'Real-profit decisions', v: 'Budget follows the titles that actually earn.', icon: 'DollarSign' },
      { k: 'Nothing slips', v: 'Problems caught the day they happen, not month-end.', icon: 'Bell' },
      { k: 'Consistent tuning', v: 'The same logic applied across every campaign.', icon: 'SlidersHorizontal' },
      { k: 'One source of truth', v: 'Ads and sales together, owned by the client.', icon: 'Database' },
      { k: 'Safe to trust', v: 'Dry-run, approval and rollback on every change.', icon: 'ShieldCheck' },
    ],
  },

  // Brand-logo strip + a couple of plain-language notes, instead of a spec table.
  stack: {
    logos: [
      { name: 'n8n', label: 'n8n' },
      { name: 'postgresql', label: 'PostgreSQL' },
      { name: 'openai', label: 'OpenAI' },
    ],
    extras: ['Amazon Ads API', 'Metabase'],
    highlight:
      'Analytics first, automation second. The system delivers the full profit picture on its own; the automation layers on top only once the data is trusted, and always behind an approval gate.',
  },

  closing: 'See what is profitable, then let it optimise itself.',
}
