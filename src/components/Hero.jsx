import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { hero, projects } from '../data/content.js'
import { EXPO, stagger, lineReveal } from '../lib/motion.js'
import { TINTS } from './ui.jsx'
import SectionLink from './SectionLink.jsx'

function Word({ seg }) {
  return (
    <span
      className={
        seg.ember ? 'text-ember' : seg.outline ? 'u-outline' : 'text-cream'
      }
    >
      {seg.t}
    </span>
  )
}

export default function Hero() {
  return (
    <section className="relative z-10 pt-32 sm:pt-40">
      <div className="u-wrap">
        <motion.div
          className="u-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EXPO }}
        >
          <span className="text-ember">◆</span>
          {hero.eyebrow.map((e, i) => (
            <span key={i} className="flex items-center gap-2.5">
              {e}
              {i < hero.eyebrow.length - 1 && <span className="text-ember/70">/</span>}
            </span>
          ))}
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="u-display mt-6 text-[clamp(2.75rem,10vw,7.5rem)]"
          initial="hidden"
          animate="show"
          variants={stagger(0.1, 0.09)}
        >
          {hero.lines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span className="block" variants={lineReveal}>
                {line.map((seg, j) => (
                  <Word key={j} seg={seg} />
                ))}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          className="mt-7 max-w-[56ch] text-lg leading-relaxed text-cream-dim sm:text-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: EXPO }}
        >
          {hero.sub}
        </motion.p>

        <motion.div
          className="mt-9 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: EXPO }}
        >
          <SectionLink id="work"><span className="u-btn-primary">{hero.primaryCta.label}</span></SectionLink>
          <SectionLink id="contact"><span className="u-btn-ghost">{hero.secondaryCta.label}</span></SectionLink>
        </motion.div>

        {/* Film-strip of projects */}
        <motion.div
          className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: EXPO }}
        >
          {projects.map((p) => (
            <Link
              key={p.slug}
              to={`/work/${p.slug}`}
              className="group relative flex aspect-[16/11] items-end overflow-hidden rounded-xl border border-cream/10 p-3 transition-transform duration-300 hover:-translate-y-1"
              style={{ background: TINTS[p.tint] || TINTS.ember }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute right-3 top-3 z-10">
                {p.status === 'LIVE' && (
                  <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-ok">
                    <span className="h-1.5 w-1.5 rounded-full bg-ok-strong" /> Live
                  </span>
                )}
              </div>
              <span className="relative z-10 font-mono text-[11px] leading-tight text-cream">{p.title}</span>
            </Link>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-10 flex flex-wrap gap-x-12 gap-y-5 border-t border-cream/10 pt-7"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: EXPO }}
        >
          {hero.stats.map((s) => (
            <div key={s.k}>
              <div className="font-display text-3xl text-cream">{s.k}</div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-cream-mut">{s.v}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
