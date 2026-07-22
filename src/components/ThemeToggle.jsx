import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Flame, Moon, Sun } from 'lucide-react'
import { THEMES, applyTheme, readTheme } from '../lib/theme.js'
import { EXPO } from '../lib/motion.js'

const ICONS = { ember: Flame, light: Sun, dark: Moon }

export default function ThemeToggle({ className = '', size = 'md' }) {
  const [theme, setTheme] = useState(readTheme)

  // Sync with whatever the inline boot script decided, and with other tabs.
  useEffect(() => {
    setTheme(readTheme())
    const onStorage = (e) => {
      if (e.key === 'rb-theme') setTheme(readTheme())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const pick = (id) => setTheme(applyTheme(id))
  const box = size === 'sm' ? 'h-8 w-8' : 'h-9 w-9'

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      className={`inline-flex items-center gap-0.5 rounded-full border border-cream/15 bg-cream/[0.04] p-1 ${className}`}
    >
      {THEMES.map((t) => {
        const Icon = ICONS[t.id]
        const active = theme === t.id
        return (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={active}
            title={`${t.label} — ${t.hint}`}
            onClick={() => pick(t.id)}
            className={`relative grid ${box} place-items-center rounded-full transition-colors duration-200 ${
              active ? 'text-ink' : 'text-cream-mut hover:text-cream'
            }`}
          >
            {active && (
              <motion.span
                layoutId="theme-pill"
                transition={{ duration: 0.3, ease: EXPO }}
                className="absolute inset-0 rounded-full bg-ember"
              />
            )}
            <Icon className="relative h-[15px] w-[15px]" strokeWidth={2} />
            <span className="sr-only">{t.label} theme</span>
          </button>
        )
      })}
    </div>
  )
}
