// Original, animated architecture diagram for the KDP Ads Platform case study.
// It shows the shape of the data pipeline - source, orchestration, warehouse,
// metrics, action - WITHOUT exposing any real workflow internals. A pulse
// travels stage-to-stage on a loop so the "data flows through" idea reads at a
// glance. Honours prefers-reduced-motion. Uses the site's ember accent + valid
// theme tokens only, so it themes correctly in ember / light / dark.
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { EXPO } from '../../../lib/motion.js'
import { icon as resolveIcon } from '../icons.js'

const STEP = 0.55 // seconds between stages lighting up
const CYCLE = 4.4 // full loop length

// The little packet that runs along a connector. `axis` is 'x' on wide screens
// (horizontal flow) and 'y' when the stages stack on mobile.
function Packet({ delay, axis, reduced }) {
  if (reduced) return null
  const horizontal = axis === 'x'
  return (
    <motion.span
      aria-hidden
      className="absolute h-2 w-2 rounded-full bg-ember shadow-[0_0_10px_2px_rgb(var(--c-ember)/0.6)]"
      style={horizontal ? { top: '50%', marginTop: -4 } : { left: '50%', marginLeft: -4 }}
      initial={horizontal ? { left: '0%', opacity: 0 } : { top: '0%', opacity: 0 }}
      animate={
        horizontal
          ? { left: ['0%', '100%'], opacity: [0, 1, 1, 0] }
          : { top: ['0%', '100%'], opacity: [0, 1, 1, 0] }
      }
      transition={{ duration: 1.1, times: [0, 0.15, 0.85, 1], ease: 'easeInOut', repeat: Infinity, repeatDelay: CYCLE - 1.1, delay }}
    />
  )
}

function Connector({ delay, reduced }) {
  return (
    <div className="relative flex shrink-0 items-center justify-center lg:w-10">
      {/* horizontal rail (lg+) */}
      <div className="relative hidden h-px w-10 bg-cream/15 lg:block">
        <Packet delay={delay} axis="x" reduced={reduced} />
      </div>
      {/* vertical rail (mobile) */}
      <div className="relative my-1 block h-6 w-px bg-cream/15 lg:hidden">
        <Packet delay={delay} axis="y" reduced={reduced} />
      </div>
      <ArrowRight className="absolute hidden h-3.5 w-3.5 text-cream-mut lg:block" style={{ right: -3 }} aria-hidden />
      <ArrowDown className="absolute bottom-[-3px] block h-3.5 w-3.5 text-cream-mut lg:hidden" aria-hidden />
    </div>
  )
}

function StageNode({ stage, index, reduced }) {
  const Icon = resolveIcon(stage.icon)
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EXPO }}
      className="relative flex-1 overflow-hidden rounded-2xl border border-cream/12 bg-base-850 p-5 text-center lg:text-left"
    >
      {/* accent sweep that pulses in sequence, echoing the flow */}
      {!reduced && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-ember to-transparent"
          initial={{ opacity: 0.25 }}
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 1.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: CYCLE - 1.2, delay: index * STEP }}
        />
      )}
      <div className="flex flex-col items-center gap-3 lg:flex-row lg:items-center">
        <motion.span
          className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-ember/12 text-ember"
          animate={reduced ? undefined : { scale: [1, 1.1, 1] }}
          transition={{ duration: 1.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: CYCLE - 1.2, delay: index * STEP }}
        >
          <Icon className="h-6 w-6" strokeWidth={1.75} />
        </motion.span>
        <div>
          <h3 className="font-display text-lg uppercase leading-none tracking-wide text-cream">{stage.title}</h3>
          <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ember/80">{stage.sub}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function PipelineFlow({ stages, note }) {
  const reduced = useReducedMotion()
  return (
    <div className="mt-8 rounded-3xl border border-cream/10 bg-base-900 p-4 sm:p-6">
      <div className="flex flex-col items-stretch lg:flex-row">
        {stages.map((stage, i) => (
          <div key={stage.key} className="contents">
            <StageNode stage={stage} index={i} reduced={reduced} />
            {i < stages.length - 1 && <Connector delay={i * STEP} reduced={reduced} />}
          </div>
        ))}
      </div>
      {note && (
        <p className="mt-4 font-mono text-[11px] leading-relaxed text-cream-mut">
          <span className="text-ember">✳</span> {note}
        </p>
      )}
    </div>
  )
}
