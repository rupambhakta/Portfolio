// One social row, used by the footer, the homepage contact section, and the
// contact page — so the links and their brand colours stay in sync everywhere.
// Marks render in their real brand colours via TechIcon; the mail link is a
// plain glyph since email has no brand.
import { Mail } from 'lucide-react'
import { profile } from '../data/content.js'
import { TechIcon } from './TechIcon.jsx'

const SOCIALS = [
  { key: 'github', href: profile.github, label: 'GitHub' },
  { key: 'linkedin', href: profile.linkedin, label: 'LinkedIn' },
  { key: 'x', href: profile.x, label: 'X' },
  { key: 'instagram', href: profile.instagram, label: 'Instagram' },
  { key: 'facebook', href: profile.facebook, label: 'Facebook' },
]

export default function SocialLinks({ email = false, size = 'md', className = '' }) {
  const box = size === 'sm' ? 'h-10 w-10' : 'h-11 w-11'
  const items = email ? [...SOCIALS, { key: 'mail', href: `mailto:${profile.email}`, label: 'Email' }] : SOCIALS

  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {items
        .filter((s) => s.href)
        .map((s) => {
          const external = s.href.startsWith('http')
          return (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer' : undefined}
              className={`group grid ${box} place-items-center rounded-xl border border-cream/12 bg-cream/[0.04] transition-colors duration-300 hover:border-ember/50`}
            >
              {s.key === 'mail' ? (
                <Mail className="h-5 w-5 text-cream-dim transition-colors group-hover:text-cream" />
              ) : (
                // Slightly muted at rest, full brand colour on hover.
                <TechIcon name={s.key} className="h-5 w-5 opacity-80 transition-opacity group-hover:opacity-100" />
              )}
            </a>
          )
        })}
    </div>
  )
}
