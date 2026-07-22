import { motion } from 'framer-motion'
import { services } from '../data/content.js'
import { EXPO } from '../lib/motion.js'
import { Reveal, DisplayLines, MonoLabel, Stagger, StaggerItem } from './ui.jsx'

export default function Services() {
  return (
    <section id="services" className="relative z-10 scroll-mt-24 border-t border-cream/10 bg-base-900 py-24 sm:py-32">
      <div className="u-wrap">
        <div className="max-w-2xl">
          <Reveal>
            <MonoLabel><span className="text-ember">✳</span> {services.eyebrow}</MonoLabel>
          </Reveal>
          <DisplayLines lines={services.title} className="mt-4 text-[clamp(1.9rem,5.5vw,3.5rem)] text-cream" />
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg text-cream-dim">{services.intro}</p>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 sm:grid-cols-2">
          {services.items.map((s) => (
            <StaggerItem key={s.no}>
              <motion.div
                whileHover={{ backgroundColor: 'rgba(255,90,31,0.06)' }}
                transition={{ duration: 0.3, ease: EXPO }}
                className="group h-full bg-base-850 p-8"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-sm text-ember">{s.no}</span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-cream-mut">Service</span>
                </div>
                <h3 className="u-display mt-6 text-3xl text-cream">{s.title}</h3>
                <p className="mt-3 text-cream-dim">{s.body}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="u-chip">{t}</span>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
