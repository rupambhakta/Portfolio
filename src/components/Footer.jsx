import { Link } from 'react-router-dom'
import { profile, nav } from '../data/content.js'
import SectionLink from './SectionLink.jsx'
import SocialLinks from './SocialLinks.jsx'

const idOf = (href) => href.split('#')[1] || ''

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-cream/10 bg-base-900">
      <div className="u-wrap py-16">
        {/* Big wordmark CTA */}
        <Link to="/contact" className="group block">
          <span className="u-display block text-[15vw] leading-[0.82] text-transparent [-webkit-text-stroke:1.4px_var(--stroke-mut)] transition-colors duration-500 group-hover:[-webkit-text-stroke:1.4px_rgb(var(--c-ember))] sm:text-[13vw]">
            LET’S BUILD
          </span>
        </Link>

        <div className="mt-12 flex flex-col gap-8 border-t border-cream/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link to="/" className="font-display text-lg tracking-wide text-cream">
              RUPAM<span className="text-ember">.</span>BHAKTA
            </Link>
            <p className="mt-2 max-w-xs text-sm text-cream-mut">
              AI Automation Engineer & Full-Stack Developer. {profile.location}.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.map((item) =>
              item.to ? (
                <Link key={item.label} to={item.to} className="text-sm text-cream-dim transition-colors hover:text-cream">
                  {item.label}
                </Link>
              ) : (
                <SectionLink
                  key={item.label}
                  id={idOf(item.href)}
                  className="text-sm text-cream-dim transition-colors hover:text-cream"
                >
                  {item.label}
                </SectionLink>
              ),
            )}
          </nav>

          <SocialLinks email size="sm" />
        </div>

        <p className="mt-8 font-mono text-xs text-cream-mut">
          © 2026 Rupam Bhakta. Built with React, Vite & Framer Motion.
        </p>
      </div>
    </footer>
  )
}
