// Shared building blocks for case-study pages.
// Pages under pages/work/ pick and arrange these freely — the point is a
// common visual language, not a common layout.
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ExternalLink, Github } from 'lucide-react'
import { EXPO } from '../../lib/motion.js'
import { Reveal, MonoLabel } from '../ui.jsx'

export function BackLink() {
  return (
    <Link
      to="/#work"
      className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cream-mut transition-colors hover:text-cream"
    >
      <ArrowLeft className="h-4 w-4" /> All work
    </Link>
  )
}

// Page header: kind/year/status → title → tagline → summary → links.
export function CaseHero({ p, children }) {
  return (
    <div className="border-b border-cream/10 pb-10">
      <motion.div
        className="u-eyebrow"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EXPO }}
      >
        <span className="text-ember">◆</span> {p.kind} <span className="text-ember/70">/</span> {p.year}
        {p.status === 'LIVE' ? (
          <span className="flex items-center gap-1.5 text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live
          </span>
        ) : (
          <span className="text-cream-mut">{p.status}</span>
        )}
      </motion.div>

      <motion.h1
        className="u-display mt-4 text-[clamp(2.75rem,10vw,7rem)] text-cream"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.05, ease: EXPO }}
      >
        {p.title}
      </motion.h1>

      {p.tagline && (
        <motion.p
          className="mt-3 font-display text-[clamp(1.1rem,2.6vw,1.75rem)] uppercase leading-tight tracking-wide text-ember"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: EXPO }}
        >
          {p.tagline}
        </motion.p>
      )}

      <motion.p
        className="mt-5 max-w-[62ch] text-lg leading-relaxed text-cream-dim"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.18, ease: EXPO }}
      >
        {p.summary}
      </motion.p>

      <motion.div
        className="mt-7 flex flex-wrap items-center gap-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.26, ease: EXPO }}
      >
        {p.links?.demo && (
          <a href={p.links.demo} target="_blank" rel="noreferrer" className="u-btn-primary">
            Live demo <ExternalLink className="h-4 w-4" />
          </a>
        )}
        {p.links?.github && (
          <a href={p.links.github} target="_blank" rel="noreferrer" className="u-btn-ghost">
            <Github className="h-4 w-4" /> GitHub
          </a>
        )}
        {p.tags?.map((t) => (
          <span key={t} className="u-chip">
            {t}
          </span>
        ))}
      </motion.div>

      {children}
    </div>
  )
}

// Meta strip — [label, value] pairs under the hero.
export function MetaRow({ items }) {
  return (
    <dl className="mt-8 grid gap-6 border-t border-cream/10 pt-8 sm:grid-cols-3">
      {items.map(([k, v]) => (
        <div key={k}>
          <dt className="font-mono text-[11px] uppercase tracking-wider text-cream-mut">{k}</dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-cream">{v}</dd>
        </div>
      ))}
    </dl>
  )
}

export function Section({ label, title, intro, children, className = '', bordered = true }) {
  return (
    <section className={`${bordered ? 'mt-16 border-t border-cream/10 pt-12' : 'mt-16'} ${className}`}>
      {label && (
        <Reveal>
          <MonoLabel>
            <span className="text-ember">✳</span> {label}
          </MonoLabel>
        </Reveal>
      )}
      {title && (
        <Reveal delay={0.05}>
          <h2 className="u-display mt-4 text-[clamp(1.75rem,4.5vw,3rem)] text-cream">{title}</h2>
        </Reveal>
      )}
      {intro && (
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-[62ch] text-lg leading-relaxed text-cream-dim">{intro}</p>
        </Reveal>
      )}
      {children}
    </section>
  )
}

// Big-number band. `tone="panel"` puts it on a raised card.
export function StatBand({ stats, note, tone = 'plain', columns = 4 }) {
  const grid = columns === 3 ? 'sm:grid-cols-3' : 'grid-cols-2 lg:grid-cols-4'
  return (
    <div className={tone === 'panel' ? 'u-card mt-8 p-6 sm:p-8' : 'mt-8'}>
      <div className={`grid gap-x-6 gap-y-8 ${grid}`}>
        {stats.map((s, i) => (
          <Reveal key={s.k + i} delay={i * 0.06}>
            <div>
              <div className="font-display text-[clamp(1.9rem,5vw,3rem)] leading-none text-ember">{s.k}</div>
              <div className="mt-2 max-w-[24ch] text-sm leading-snug text-cream-dim">{s.v}</div>
            </div>
          </Reveal>
        ))}
      </div>
      {note && <p className="mt-6 font-mono text-[11px] leading-relaxed text-cream-mut">{note}</p>}
    </div>
  )
}

// Hairline-separated card grid (shared border trick: gap-px on a lit background).
export function CardGrid({ items, columns = 2, renderIcon }) {
  const cols = columns === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : columns === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
  return (
    <div className={`mt-8 grid gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 ${cols}`}>
      {items.map((it) => {
        const Icon = renderIcon?.(it)
        return (
          <div key={it.title} className="bg-base-850 p-6 transition-colors duration-300 hover:bg-base-800">
            {Icon && <Icon className="h-5 w-5 text-ember" strokeWidth={1.75} />}
            <h3 className="mt-3 font-display text-xl uppercase tracking-wide text-cream">{it.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-cream-mut">{it.body}</p>
          </div>
        )
      })}
    </div>
  )
}

// Key/value rows in a two-column reading layout.
export function DefinitionList({ items, columns = 2 }) {
  return (
    <dl className={`mt-8 grid gap-x-10 gap-y-7 ${columns === 2 ? 'sm:grid-cols-2' : ''}`}>
      {items.map((it, i) => (
        <Reveal key={it.k} delay={(i % 4) * 0.05}>
          <div className="border-l-2 border-ember/40 pl-4">
            <dt className="font-display text-lg uppercase tracking-wide text-cream">{it.k}</dt>
            <dd className="mt-1.5 leading-relaxed text-cream-dim">{it.v}</dd>
          </div>
        </Reveal>
      ))}
    </dl>
  )
}

export function PullQuote({ children }) {
  return (
    <Reveal>
      <p className="mt-8 border-l-2 border-ember pl-6 font-display text-[clamp(1.35rem,3.4vw,2.1rem)] uppercase leading-tight text-cream">
        {children}
      </p>
    </Reveal>
  )
}

export function Callout({ label, children }) {
  return (
    <Reveal>
      <div className="mt-8 rounded-2xl border border-ember/30 bg-ember/[0.06] p-6 sm:p-8">
        <MonoLabel className="text-ember">{label}</MonoLabel>
        <p className="mt-3 max-w-[68ch] leading-relaxed text-cream-dim">{children}</p>
      </div>
    </Reveal>
  )
}

// Two-column table: label on the left, prose on the right.
export function SpecTable({ rows }) {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-cream/10">
      {rows.map(([k, v], i) => (
        <div
          key={k}
          className={`grid gap-2 p-5 sm:grid-cols-[minmax(150px,240px)_1fr] sm:gap-6 ${
            i % 2 ? 'bg-base-850' : 'bg-base-900'
          }`}
        >
          <div className="font-mono text-[12px] uppercase tracking-wider text-ember">{k}</div>
          <div className="leading-relaxed text-cream-dim">{v}</div>
        </div>
      ))}
    </div>
  )
}

export function ClosingStatement({ children }) {
  return (
    <Reveal>
      <div className="mt-16 rounded-3xl border border-cream/10 bg-base-850 p-8 sm:p-12">
        <MonoLabel className="mb-4">
          <span className="text-ember">✳</span> In summary
        </MonoLabel>
        <p className="max-w-[54ch] font-display text-2xl uppercase leading-tight text-cream sm:text-3xl">{children}</p>
      </div>
    </Reveal>
  )
}

export function NextProject({ next }) {
  return (
    <Link
      to={`/work/${next.slug}`}
      className="group mt-16 flex items-center justify-between gap-4 border-t border-cream/10 py-12"
    >
      <div>
        <p className="font-mono text-[11px] uppercase tracking-wider text-cream-mut">Next project</p>
        <h3 className="u-display mt-2 text-4xl text-cream transition-colors group-hover:text-ember sm:text-6xl">
          {next.title}
        </h3>
      </div>
      <ArrowRight className="h-10 w-10 shrink-0 text-cream-mut transition-all duration-300 group-hover:translate-x-2 group-hover:text-ember" />
    </Link>
  )
}

export function CaseCta({ line = 'Want something like this for your team?' }) {
  return (
    <Reveal>
      <div className="mt-4 flex flex-col items-start gap-4 rounded-3xl border border-cream/10 bg-base-900 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
        <p className="max-w-[36ch] font-display text-2xl uppercase leading-tight text-cream">{line}</p>
        <Link to="/contact" className="u-btn-primary shrink-0">
          Start a project <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Reveal>
  )
}
