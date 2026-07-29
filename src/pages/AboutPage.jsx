// About: the long-form story. Person-first, photo-led, same Grain & Bold
// language as the rest of the site. Photos are WebP and shown at their natural
// aspect ratio so nothing important is cropped.
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  GraduationCap,
  Award,
  Github,
  Linkedin,
  Mail,
  Instagram,
  Facebook,
  X,
} from 'lucide-react'
import { aboutPage, about, profile } from '../data/content.js'
import { EXPO } from '../lib/motion.js'
import { Reveal, MonoLabel, DisplayLines } from '../components/ui.jsx'

function Section({ label, title, children, className = '' }) {
  return (
    <section className={`mt-16 border-t border-cream/10 pt-12 ${className}`}>
      {label && (
        <Reveal>
          <MonoLabel>
            <span className="text-ember">✳</span> {label}
          </MonoLabel>
        </Reveal>
      )}
      {title && <DisplayLines lines={title} className="mt-4 text-[clamp(1.75rem,4.5vw,3rem)] text-cream" />}
      {children}
    </section>
  )
}

const SOCIALS = [
  { href: profile.github, icon: Github, label: 'GitHub' },
  { href: profile.linkedin, icon: Linkedin, label: 'LinkedIn' },
  { href: profile.x, icon: X, label: 'X' },
  { href: profile.instagram, icon: Instagram, label: 'Instagram' },
  { href: profile.facebook, icon: Facebook, label: 'Facebook' },
]

export default function AboutPage() {
  return (
    <article className="relative z-10 pb-24 pt-28 sm:pt-32">
      <div className="u-wrap">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cream-mut transition-colors hover:text-cream"
        >
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>

        {/* Hero */}
        <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1fr_360px] lg:gap-16">
          <div>
            <motion.div
              className="u-eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EXPO }}
            >
              <span className="text-ember">✳</span> {aboutPage.eyebrow}
              {profile.available && (
                <span className="flex items-center gap-1.5 text-ok">
                  <span className="h-1.5 w-1.5 rounded-full bg-ok-strong" /> Available for work
                </span>
              )}
            </motion.div>

            <motion.h1
              className="u-display mt-4 text-[clamp(2.75rem,9vw,6.5rem)] text-cream"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: EXPO }}
            >
              {profile.first}
              <span className="text-ember">.</span>
              {profile.last}
            </motion.h1>

            <motion.p
              className="mt-2 font-display text-[clamp(1rem,2.4vw,1.5rem)] uppercase tracking-wide text-ember"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: EXPO }}
            >
              {aboutPage.role}
            </motion.p>

            <motion.p
              className="mt-5 max-w-[54ch] text-lg leading-relaxed text-cream-dim"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EXPO }}
            >
              {aboutPage.lead}
            </motion.p>

            <motion.div
              className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: EXPO }}
            >
              <span className="flex items-center gap-2 font-mono text-[12px] text-cream-mut">
                <MapPin className="h-4 w-4 text-ember" /> {aboutPage.locationFull}
              </span>
              <div className="flex items-center gap-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noreferrer"
                    className="grid h-10 w-10 place-items-center rounded-xl border border-cream/12 bg-cream/[0.04] text-cream-dim transition-colors hover:border-ember/50 hover:text-cream"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.34, ease: EXPO }}
            >
              <Link to="/contact" className="u-btn-primary">
                Let’s work together <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/" className="u-btn-ghost">
                See my work
              </Link>
            </motion.div>
          </div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: EXPO }}
            className="relative mx-auto w-full max-w-[340px] lg:mx-0"
          >
            <div
              aria-hidden="true"
              className="absolute -inset-5 rounded-full opacity-70 blur-2xl"
              style={{ background: 'radial-gradient(circle, rgba(255,90,31,0.28), transparent 70%)' }}
            />
            <img
              src={aboutPage.portrait}
              alt={profile.name}
              className="relative aspect-square w-full rounded-full border border-cream/15 object-cover"
            />
          </motion.div>
        </div>

        {/* Story + at-work photo */}
        <Section label={aboutPage.story.label} title={aboutPage.story.title}>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_minmax(300px,400px)] lg:items-start lg:gap-14">
            <div className="space-y-5">
              {aboutPage.story.body.map((t, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <p className="text-lg leading-relaxed text-cream-dim">{t}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.1}>
              <figure>
                <img
                  src={aboutPage.atWork}
                  alt="Rupam Bhakta at work"
                  loading="lazy"
                  className="w-full rounded-2xl border border-cream/10 object-cover"
                  style={{ aspectRatio: '1/1' }}
                />
                <figcaption className="mt-3 flex items-center gap-2 font-mono text-[11px] text-cream-mut">
                  <span className="text-ember">↳</span> Focus. Build. Grow.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Section>

        {/* Principles */}
        <Section label={aboutPage.principles.label} title={aboutPage.principles.title}>
          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 sm:grid-cols-2">
            {aboutPage.principles.items.map((it, i) => (
              <div key={it.k} className="bg-base-850 p-6 sm:p-7">
                <span className="font-mono text-sm text-ember">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 font-display text-xl uppercase tracking-wide text-cream">{it.k}</h3>
                <p className="mt-2 leading-relaxed text-cream-mut">{it.v}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Experience - full-width rows, each links to the company */}
        <Section label="Experience" title={['Where I’ve', 'worked.']}>
          <div className="mt-10 border-t border-cream/10">
            {about.experience.map((e, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <a
                  href={e.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group grid items-start gap-x-10 gap-y-5 border-b border-cream/10 py-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
                >
                  {/* Left: the company */}
                  <div className="flex items-start gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-cream/12 bg-base-850 font-display text-xl text-ember transition-colors group-hover:border-ember/50">
                      {e.org.trim().charAt(0)}
                    </span>
                    <div>
                      <p className="font-mono text-xs text-ember">{e.period}</p>
                      <h3 className="mt-1.5 font-display text-2xl leading-none text-cream">{e.role}</h3>
                      <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-cream-dim transition-colors group-hover:text-ember">
                        {e.org}
                        <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                      </span>
                    </div>
                  </div>
                  {/* Right: what I did there */}
                  <div className="md:pt-1">
                    <p className="max-w-[54ch] leading-relaxed text-cream-mut">{e.body}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-cream-mut transition-colors group-hover:text-cream">
                      Visit {e.short || 'website'}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Education + campus + certifications */}
        <Section label="Education & training" title={['Where it', 'started.']}>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start lg:gap-12">
            <Reveal>
              <figure>
                <img
                  src={aboutPage.campus}
                  alt="Calcutta Institute of Technology campus"
                  loading="lazy"
                  className="w-full rounded-2xl border border-cream/10 object-cover"
                  style={{ aspectRatio: '4/3' }}
                />
                <figcaption className="mt-3 font-mono text-[11px] text-cream-mut">
                  <a
                    href={about.education.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 transition-colors hover:text-ember"
                  >
                    <span className="text-ember">↳</span> {about.education.org}
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </figcaption>
              </figure>
            </Reveal>

            <div className="space-y-4">
              <Reveal>
                <div className="u-card p-6">
                  <GraduationCap className="h-5 w-5 text-ember" />
                  <p className="mt-3 font-display text-lg uppercase tracking-wide text-cream">{about.education.degree}</p>
                  <a
                    href={about.education.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group mt-1 inline-flex items-center gap-1.5 text-sm text-cream-mut transition-colors hover:text-ember"
                  >
                    {about.education.org}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-60 transition-opacity group-hover:opacity-100" />
                  </a>
                  <p className="text-sm text-cream-mut">{about.education.period}</p>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="u-card p-6">
                  <Award className="h-5 w-5 text-ember" />
                  <p className="mt-3 font-display text-lg uppercase tracking-wide text-cream">Certifications</p>
                  <ul className="mt-2 space-y-1.5 text-sm text-cream-mut">
                    {about.certifications.map((c) => (
                      <li key={c} className="flex gap-2">
                        <span className="text-ember">›</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </Section>

        {/* Skills */}
        <Section label="Toolbox" title={['What I, build with.']}>
          <div className="mt-8 space-y-4">
            {about.skills.map((g) => (
              <Reveal key={g.label}>
                <div className="flex flex-col gap-2 border-t border-cream/10 pt-4 sm:flex-row sm:gap-6">
                  <span className="w-40 shrink-0 font-mono text-[11px] uppercase tracking-wider text-cream-mut">
                    {g.label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((it) => (
                      <span key={it} className="u-chip">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Closing CTA */}
        <Reveal>
          <div className="mt-16 rounded-3xl border border-cream/10 bg-base-850 p-8 sm:p-12">
            <MonoLabel>
              <span className="text-ember">✳</span> Let’s work together
            </MonoLabel>
            <p className="mt-4 max-w-[52ch] font-display text-2xl uppercase leading-tight text-cream sm:text-3xl">
              {aboutPage.closing}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="u-btn-primary">
                Start a project <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={`mailto:${profile.email}`} className="u-btn-ghost">
                <Mail className="h-4 w-4" /> {profile.email}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </article>
  )
}
