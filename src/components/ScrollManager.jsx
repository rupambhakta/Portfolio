import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { navTarget } from '../lib/scroll.js'

// On route change: jump to top, or to a pending section if one was requested.
export default function ScrollManager() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (navTarget.id) {
      const id = navTarget.id
      navTarget.id = null
      requestAnimationFrame(() =>
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 80),
      )
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])
  return null
}
