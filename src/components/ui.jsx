import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { EXPO, fadeUp, stagger, lineReveal } from '../lib/motion.js'

export function Reveal({ children, delay = 0, className = '', y = 24 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.7, delay, ease: EXPO }}
    >
      {children}
    </motion.div>
  )
}

export function Stagger({ children, className = '', delay = 0, each = 0.08 }) {
  return (
    <motion.div
      className={className}
      variants={stagger(delay, each)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-70px' }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  )
}

// Big display heading whose lines clip up into view
export function DisplayLines({ lines, className = '', delay = 0 }) {
  return (
    <motion.h2
      className={`u-display ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={stagger(delay, 0.09)}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span className="block" variants={lineReveal}>
            {line}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  )
}

export function MonoLabel({ children, className = '' }) {
  return <span className={`u-eyebrow ${className}`}>{children}</span>
}

export function PrimaryButton({ to, href, children, className = '' }) {
  const inner = (
    <>
      {children}
      <ArrowRight className="h-4 w-4" />
    </>
  )
  const cls = `u-btn-primary group ${className}`
  if (to) return <Link to={to} className={cls}>{inner}</Link>
  return <a href={href} className={cls}>{inner}</a>
}

export function GhostButton({ to, href, children, className = '' }) {
  const cls = `u-btn-ghost ${className}`
  if (to) return <Link to={to} className={cls}>{children}</Link>
  return <a href={href} className={cls}>{children}</a>
}

export function CaseLink({ to, children = 'Read the case study' }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-1.5 font-mono text-[13px] font-medium text-cream transition-colors hover:text-ember"
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  )
}

// Tint gradients used across placeholder covers — per-theme values in index.css
export const TINTS = {
  ember: 'var(--tint-ember)',
  green: 'var(--tint-green)',
  violet: 'var(--tint-violet)',
  cyan: 'var(--tint-cyan)',
}
