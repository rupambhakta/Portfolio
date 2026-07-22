import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/content.js'
import { EXPO } from '../lib/motion.js'
import { Reveal, DisplayLines, MonoLabel } from './ui.jsx'
import Media from './Media.jsx'

function ProjectRow({ p, i }) {
  const flip = i % 2 === 1
  return (
    <Reveal>
      <Link
        to={`/work/${p.slug}`}
        className="group grid items-center gap-6 border-t border-cream/10 py-10 md:grid-cols-2 md:gap-12"
      >
        <div className={flip ? 'md:order-2' : ''}>
          <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.35, ease: EXPO }}>
            <Media src={p.cover} ratio="16/10" tint={p.tint} caption={null} rounded="rounded-2xl" />
          </motion.div>
        </div>

        <div className={flip ? 'md:order-1' : ''}>
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-cream-mut">
            <span className="text-ember">{String(i + 1).padStart(2, '0')}</span>
            <span>{p.kind}</span>
            <span>·</span>
            <span>{p.year}</span>
            {p.status === 'LIVE' && (
              <span className="flex items-center gap-1.5 text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live
              </span>
            )}
          </div>

          <h3 className="u-display mt-3 text-4xl text-cream transition-colors duration-300 group-hover:text-ember sm:text-5xl">
            {p.title}
          </h3>
          <p className="mt-4 max-w-[46ch] text-cream-dim">{p.summary}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span key={t} className="u-chip">{t}</span>
            ))}
          </div>

          <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[13px] font-medium text-cream transition-colors group-hover:text-ember">
            Read the case study
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </Reveal>
  )
}

export default function WorkGrid() {
  return (
    <section id="work" className="relative z-10 scroll-mt-24 py-24 sm:py-32">
      <div className="u-wrap">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Reveal>
              <MonoLabel><span className="text-ember">✳</span> Selected work</MonoLabel>
            </Reveal>
            <DisplayLines
              lines={['Products &', 'projects I’ve shipped.']}
              className="mt-4 text-[clamp(2rem,6vw,4rem)] text-cream"
            />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm text-cream-mut">
              A few of the AI products and full-stack apps I’ve designed and built. Tap any project for the full story.
            </p>
          </Reveal>
        </div>

        <div className="border-b border-cream/10">
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
