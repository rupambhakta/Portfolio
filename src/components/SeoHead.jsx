// Route-aware <head> manager for the SPA. Sets a unique title, meta
// description, and canonical per route, plus Open Graph / Twitter tags and
// Person + WebSite JSON-LD on the home page. This runs client-side, so Google
// (which renders JS) sees it; for non-JS social scrapers and the strongest SEO,
// prerender the routes to static HTML (see notes). No dependency required.
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { profile } from '../data/content.js'
import { getPost } from '../data/blog/index.js'
import { projects } from '../data/projects/index.js'

// TODO: swap this for your custom domain when you have one.
const SITE = 'https://portfolio-khaki-psi-71.vercel.app'
const NAME = 'Rupam Bhakta'

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

function workDescription(p) {
  return WORK_DESC[p.slug] || clean(p.summary || p.tagline || `${p.title}, a project by ${NAME}.`)
}

function metaFor(pathname) {
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

function upsert(selector, make) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = make()
    document.head.appendChild(el)
  }
  return el
}
const setMeta = (name, content) =>
  upsert(`meta[name="${name}"]`, () => {
    const m = document.createElement('meta')
    m.setAttribute('name', name)
    return m
  }).setAttribute('content', content)
const setProp = (property, content) =>
  upsert(`meta[property="${property}"]`, () => {
    const m = document.createElement('meta')
    m.setAttribute('property', property)
    return m
  }).setAttribute('content', content)
const setCanonical = (href) =>
  upsert('link[rel="canonical"]', () => {
    const l = document.createElement('link')
    l.setAttribute('rel', 'canonical')
    return l
  }).setAttribute('href', href)
function setJsonLd(id, obj) {
  let el = document.getElementById(id)
  if (!obj) {
    if (el) el.remove()
    return
  }
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(obj)
}

export default function SeoHead() {
  const { pathname } = useLocation()

  useEffect(() => {
    const { title, description } = metaFor(pathname)
    const url = SITE + (pathname === '/' ? '/' : pathname)
    const blogM = pathname.match(/^\/blog\/(.+)$/)
    const post = blogM && getPost(blogM[1])
    const image = post?.ogImage ? (post.ogImage.startsWith('http') ? post.ogImage : SITE + post.ogImage) : null

    document.title = title
    setMeta('description', description)
    setCanonical(url)

    setProp('og:title', title)
    setProp('og:description', description)
    setProp('og:url', url)
    setProp('og:type', pathname.startsWith('/blog/') ? 'article' : 'website')
    setProp('og:site_name', `${NAME} Portfolio`)
    if (image) setProp('og:image', image)
    else setProp('og:image', `${SITE}/favicon.svg`)
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)

    const isHome = pathname === '/'
    const author = { '@type': 'Person', name: NAME, url: SITE + '/' }

    // Person + WebSite on the home page only.
    setJsonLd('ld-person', isHome ? {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: NAME,
      url: SITE + '/',
      jobTitle: 'Full-Stack Developer & AI Engineer',
      description: STATIC['/'].description,
      sameAs: [profile.linkedin, profile.github, profile.x].filter(Boolean),
    } : null)
    setJsonLd('ld-website', isHome ? {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: `${NAME} Portfolio`,
      url: SITE + '/',
    } : null)

    // BlogPosting on posts, CreativeWork on case studies.
    const workM = pathname.match(/^\/work\/(.+)$/)
    const proj = workM && projects.find((x) => x.slug === workM[1])
    if (post) {
      setJsonLd('ld-page', {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.seoTitle || post.title,
        description: clean(post.metaDescription || post.excerpt),
        datePublished: post.date,
        author,
        publisher: author,
        image: image || undefined,
        mainEntityOfPage: url,
        url,
      })
    } else if (proj) {
      setJsonLd('ld-page', {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: proj.title,
        description: workDescription(proj),
        url,
        creator: author,
      })
    } else {
      setJsonLd('ld-page', null)
    }
  }, [pathname])

  return null
}
