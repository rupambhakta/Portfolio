// Route-aware <head> manager for the SPA. Sets a unique title, meta
// description, and canonical per route, plus Open Graph / Twitter tags and
// Person + WebSite JSON-LD on the home page. This runs client-side, so Google
// (which renders JS) sees it; for non-JS social scrapers and the strongest SEO,
// prerender the routes to static HTML (see notes). No dependency required.
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { profile } from '../data/content.js'
import { getPost } from '../data/blog.js'
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
    if (p)
      return {
        title: `${p.title} · Case Study · ${NAME}`,
        description: clean(p.tagline || p.summary || `${p.title}, a project by ${NAME}.`),
      }
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

    document.title = title
    setMeta('description', description)
    setCanonical(url)

    setProp('og:title', title)
    setProp('og:description', description)
    setProp('og:url', url)
    setProp('og:type', pathname.startsWith('/blog/') ? 'article' : 'website')
    setProp('og:site_name', `${NAME} Portfolio`)
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)

    if (pathname === '/') {
      setJsonLd('ld-person', {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: NAME,
        url: SITE + '/',
        jobTitle: 'Full-Stack Developer & AI Engineer',
        description: STATIC['/'].description,
        sameAs: [profile.linkedin, profile.github, profile.x].filter(Boolean),
      })
      setJsonLd('ld-website', {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: `${NAME} Portfolio`,
        url: SITE + '/',
      })
    } else {
      setJsonLd('ld-person', null)
      setJsonLd('ld-website', null)
    }
  }, [pathname])

  return null
}
