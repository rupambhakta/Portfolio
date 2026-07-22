import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ExternalLink, Github, Check } from 'lucide-react'
import { projects } from '../data/content.js'
import { EXPO } from '../lib/motion.js'
import { Reveal, MonoLabel } from '../components/ui.jsx'
import Media from '../components/Media.jsx'

export default function ProjectPage() {
  const { slug } = useParams()
  const idx = projects.findIndex((p) => p.slug === slug)
  if (idx === -1) return <Navigate to="/" replace />
  const p = projects[idx]
  const next = projects[(idx + 1) % projects.length]

  return (
    <article className="relative z-10 pt-28 sm:pt-32">
      <div className="u-wrap">
        <Link to="/#work" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cream-mut transition-colors hover:text-cream">
          <ArrowLeft className="h-4 w-4" /> All work
        </Link>

        {/* Header */}
        <div className="mt-8 border-b border-cream/10 pb-10">
          <motion.div className="u-eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EXPO }}>
            <span className="text-ember">◆</span> {p.kind} <span className="text-ember/70">/</span> {p.year}
            {p.status === 'LIVE' && (
              <span className="flex items-center gap-1.5 text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live</span>
            )}
          </motion.div>

          <motion.h1
            className="u-display mt-4 text-[clamp(2.5rem,9vw,6.5rem)] text-cream"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: EXPO }}
          >
            {p.title}
          </motion.h1>

          <motion.p
            className="mt-5 max-w-[60ch] text-lg text-cream-dim"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EXPO }}
          >
            {p.summary}
          </motion.p>

          <motion.div
            className="mt-7 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: EXPO }}
          >
            {p.links.demo && (
              <a href={p.links.demo} className="u-btn-primary">
                Live demo <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {p.links.github && (
              <a href={p.links.github} className="u-btn-ghost">
                <Github className="h-4 w-4" /> GitHub
              </a>
            )}
          </motion.div>
        </div>

        {/* Cover */}
        <Reveal className="mt-10">
          <Media src={p.cover} ratio="16/9" tint={p.tint} caption={p.cover ? null : 'Hero screenshot or demo video'} rounded="rounded-3xl" />
        </Reveal>

        {/* Meta + overview */}
        <div className="mt-14 grid gap-10 border-t border-cream/10 pt-10 md:grid-cols-[220px_1fr]">
          <div className="space-y-6">
            {[
              ['Role', p.role],
              ['Year', p.year],
              ['Status', p.status],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="font-mono text-[11px] uppercase tracking-wider text-cream-mut">{k}</p>
                <p className="mt-1 text-cream">{v}</p>
              </div>
            ))}
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-cream-mut">Stack</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {p.tags.map((t) => <span key={t} className="u-chip">{t}</span>)}
              </div>
            </div>
          </div>

          <div>
            <MonoLabel className="mb-3">Overview</MonoLabel>
            <p className="text-lg leading-relaxed text-cream-dim">{p.overview}</p>

            <MonoLabel className="mb-3 mt-10">The challenge</MonoLabel>
            <p className="text-lg leading-relaxed text-cream-dim">{p.challenge}</p>
          </div>
        </div>

        {/* Approach */}
        <div className="mt-14 grid gap-10 border-t border-cream/10 pt-10 md:grid-cols-[220px_1fr]">
          <MonoLabel>The approach</MonoLabel>
          <ul className="space-y-4">
            {p.approach.map((a, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <li className="flex gap-4">
                  <span className="font-display text-2xl leading-none text-ember">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-lg text-cream-dim">{a}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Feature grid */}
        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 sm:grid-cols-4">
          {p.features.map((f) => (
            <div key={f.k} className="bg-base-850 p-6">
              <Check className="h-5 w-5 text-ember" />
              <p className="mt-3 font-display text-xl text-cream">{f.k}</p>
              <p className="mt-1 text-sm text-cream-mut">{f.v}</p>
            </div>
          ))}
        </div>

        {/* Gallery */}
        <div className="mt-14">
          <MonoLabel className="mb-5">Gallery</MonoLabel>
          <div className="grid gap-4 sm:grid-cols-2">
            <Media src={p.gallery[0]?.src} ratio={p.gallery[0]?.ratio || '16/10'} tint={p.tint} caption={p.gallery[0]?.caption} className="sm:col-span-2" rounded="rounded-2xl" />
            {p.gallery.slice(1).map((g, i) => (
              <Media key={i} src={g.src} ratio={g.ratio || '1/1'} tint={p.tint} caption={g.caption} rounded="rounded-2xl" />
            ))}
          </div>
        </div>

        {/* Outcome */}
        <div className="mt-14 rounded-3xl border border-cream/10 bg-base-850 p-8 sm:p-12">
          <MonoLabel className="mb-4"><span className="text-ember">✳</span> Outcome</MonoLabel>
          <p className="max-w-[52ch] font-display text-2xl leading-tight text-cream sm:text-3xl">{p.outcome}</p>
        </div>

        {/* Next project */}
        <Link
          to={`/work/${next.slug}`}
          className="group mt-16 flex items-center justify-between gap-4 border-t border-cream/10 py-12"
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-cream-mut">Next project</p>
            <h3 className="u-display mt-2 text-4xl text-cream transition-colors group-hover:text-ember sm:text-6xl">{next.title}</h3>
          </div>
          <ArrowRight className="h-10 w-10 shrink-0 text-cream-mut transition-all duration-300 group-hover:translate-x-2 group-hover:text-ember" />
        </Link>
      </div>
    </article>
  )
}
