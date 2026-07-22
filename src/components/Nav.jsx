import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { nav, profile } from '../data/content.js'
import { EXPO } from '../lib/motion.js'
import SectionLink from './SectionLink.jsx'

const idOf = (href) => href.split('#')[1] || ''

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EXPO }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`transition-colors duration-300 ${
          scrolled ? 'border-b border-cream/10 bg-base-950/80 backdrop-blur-md' : 'border-b border-transparent'
        }`}
      >
        <div className="u-wrap flex items-center justify-between py-4">
          <Link to="/" className="font-display text-xl tracking-wide text-cream">
            RUPAM<span className="text-ember">.</span>BHAKTA
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((item) => (
              <SectionLink
                key={item.label}
                id={idOf(item.href)}
                className="text-sm text-cream-dim transition-colors hover:text-cream"
              >
                {item.label}
              </SectionLink>
            ))}
          </nav>

          <SectionLink id="contact" className="hidden md:inline-flex">
            <span className="u-btn-primary">Let’s talk</span>
          </SectionLink>

          <button
            className="grid h-10 w-10 place-items-center rounded-xl border border-cream/15 bg-cream/5 text-cream md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: EXPO }}
            className="mx-4 mt-2 md:hidden"
          >
            <div className="flex flex-col gap-1 rounded-2xl border border-cream/10 bg-base-850/95 p-3 backdrop-blur-md">
              {nav.map((item) => (
                <SectionLink
                  key={item.label}
                  id={idOf(item.href)}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm text-cream-dim transition-colors hover:bg-cream/5 hover:text-cream"
                >
                  {item.label}
                </SectionLink>
              ))}
              <SectionLink id="contact" onClick={() => setOpen(false)} className="mt-1">
                <span className="u-btn-primary w-full">Let’s talk</span>
              </SectionLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
