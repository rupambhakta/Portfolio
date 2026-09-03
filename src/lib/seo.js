// The head model for every route, as plain data.
//
// Both consumers read from here so they can never disagree: SeoHead.jsx applies
// it to document.head at runtime, and scripts/prerender.mjs serialises it into
// the static HTML at build time. Nothing in this file touches the DOM.
import { profile } from '../data/content.js'
import { getPost } from '../data/blog/index.js'
import { projects } from '../data/projects/index.js'

export const SITE = 'https://www.rupambhakta.com'
export const NAME = 'Rupam Bhakta'

// keep meta copy human: no em/en dashes, single spaces
const clean = (s) => (s || '').replace(/[–—]/g, ', ').replace(/\s+/g, ' ').trim()

const STATIC = {
  '/': {
    title: `${NAME} · Full-Stack Developer & AI Engineer`,
    description:
      'Rupam Bhakta is a full-stack developer and AI engineer building AI agents, automations, and full-stack apps that hand growing teams back their time.',
  },
  '/about': {
    title: `About ${NAME} · Full-Stack Developer & AI Engineer`,
    description:
      'The story behind Rupam Bhakta, a full-stack developer and AI engineer from Kolkata who ships production web apps and AI features end to end.',
  },
  '/blog': {
    title: `Blog · Notes from the Build · ${NAME}`,
    description:
      'Field notes from Rupam Bhakta on AI agents, automation, and shipping full-stack products that people actually use.',
  },
  '/contact': {
    title: `Contact · ${NAME}`,
    description:
      'Get in touch with Rupam Bhakta about an AI agent, an automation, or a full-stack build. Usually replies within one business day.',
  },
}

// Dedicated 120-155 char meta descriptions for the case studies (the project
// taglines were too short). No em/en dashes.
const WORK_DESC = {
  getparlix:
    'GetParlix is an AI chat and voice assistant I built that answers questions, qualifies leads, and books real meetings on any website, 24/7.',
  seowyn:
    'Seowyn is an autonomous multi-agent SEO platform I built that audits a site, researches competitors, and returns a 90 day growth plan.',
  heatmapiq:
    'HeatMapIQ is a tool I built that turns raw heatmap exports into a plain-English, severity-ranked list of UX fixes with tracking and sharing.',
  'kdp-ads':
    'KDP Ads Platform is an analytics and automation system I built that unifies Amazon Ads and KDP sales across four marketplaces to drive profitable, automated bid and budget decisions.',
}

const workDescription = (p) =>
  WORK_DESC[p.slug] || clean(p.summary || p.tagline || `${p.title}, a project by ${NAME}.`)

export function metaFor(pathname) {
  if (STATIC[pathname]) return STATIC[pathname]

  const blog = pathname.match(/^\/blog\/(.+)$/)
  if (blog) {
    const post = getPost(blog[1])
    if (post) return { title: `${post.title} · ${NAME}`, description: clean(post.excerpt) }
  }

  const work = pathname.match(/^\/work\/(.+)$/)
  if (work) {
    const p = projects.find((x) => x.slug === work[1])
    if (p) return { title: `${p.title} · Case Study · ${NAME}`, description: workDescription(p) }
  }

  return STATIC['/']
}

// Everything the <head> needs for one route. `meta` entries carry either a
// `name` or a `property`; `jsonld` entries keep the id so the runtime can
// replace or remove the right script on a route change.
export function headFor(pathname) {
  const { title, description } = metaFor(pathname)
  const url = SITE + (pathname === '/' ? '/' : pathname)
  const blogM = pathname.match(/^\/blog\/(.+)$/)
  const post = blogM && getPost(blogM[1])
  const image = post?.ogImage
    ? post.ogImage.startsWith('http')
      ? post.ogImage
      : SITE + post.ogImage
    : `${SITE}/favicon.svg`

  const meta = [
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:type', content: pathname.startsWith('/blog/') ? 'article' : 'website' },
    { property: 'og:site_name', content: `${NAME} Portfolio` },
    { property: 'og:image', content: image },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
  ]

  const isHome = pathname === '/'
  const author = { '@type': 'Person', name: NAME, url: SITE + '/' }
  const jsonld = []

  if (isHome) {
    jsonld.push({
      id: 'ld-person',
      data: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: NAME,
        url: SITE + '/',
        jobTitle: 'Full-Stack Developer & AI Engineer',
        description: STATIC['/'].description,
        sameAs: [profile.linkedin, profile.github, profile.x].filter(Boolean),
      },
    })
    jsonld.push({
      id: 'ld-website',
      data: { '@context': 'https://schema.org', '@type': 'WebSite', name: `${NAME} Portfolio`, url: SITE + '/' },
    })
  }

  const workM = pathname.match(/^\/work\/(.+)$/)
  const proj = workM && projects.find((x) => x.slug === workM[1])
  if (post) {
    jsonld.push({
      id: 'ld-page',
      data: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.seoTitle || post.title,
        description: clean(post.metaDescription || post.excerpt),
        datePublished: post.date,
        author,
        publisher: author,
        image: post.ogImage ? image : undefined,
        mainEntityOfPage: url,
        url,
      },
    })
  } else if (proj) {
    jsonld.push({
      id: 'ld-page',
      data: {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: proj.title,
        description: workDescription(proj),
        url,
        creator: author,
      },
    })
  }

  return { title, description, canonical: url, meta, jsonld }
}

// Every route that gets prerendered and listed in the sitemap.
export function allRoutes(publishedSlugs = []) {
  return [
    '/',
    '/about',
    '/blog',
    '/contact',
    ...projects.map((p) => `/work/${p.slug}`),
    ...publishedSlugs.map((s) => `/blog/${s}`),
  ]
}
