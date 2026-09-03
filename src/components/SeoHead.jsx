// Route-aware <head> manager for the SPA. Applies the head model from
// lib/seo.js to document.head on every route change.
//
// At build time scripts/prerender.mjs writes the same tags into the static HTML,
// so crawlers and social scrapers see them without running JS. This component
// then keeps them correct during client-side navigation.
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { headFor } from '../lib/seo.js'

function upsert(selector, make) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = make()
    document.head.appendChild(el)
  }
  return el
}

const setMeta = ({ name, property, content }) => {
  const key = name ? 'name' : 'property'
  const value = name || property
  upsert(`meta[${key}="${value}"]`, () => {
    const m = document.createElement('meta')
    m.setAttribute(key, value)
    return m
  }).setAttribute('content', content)
}

const setCanonical = (href) =>
  upsert('link[rel="canonical"]', () => {
    const l = document.createElement('link')
    l.setAttribute('rel', 'canonical')
    return l
  }).setAttribute('href', href)

function setJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!data) {
    if (el) el.remove()
    return
  }
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

const LD_IDS = ['ld-person', 'ld-website', 'ld-page']

export default function SeoHead() {
  const { pathname } = useLocation()

  useEffect(() => {
    const head = headFor(pathname)

    document.title = head.title
    setCanonical(head.canonical)
    head.meta.forEach(setMeta)

    // Drop any block the new route does not declare, then write the ones it does.
    const wanted = new Map(head.jsonld.map((entry) => [entry.id, entry.data]))
    LD_IDS.forEach((id) => setJsonLd(id, wanted.get(id) || null))
  }, [pathname])

  return null
}
