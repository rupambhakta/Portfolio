import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Github, Linkedin, Mail, Instagram, Facebook, X, MapPin } from 'lucide-react'
import { contact, contactPage, profile } from '../data/content.js'
import { EXPO } from '../lib/motion.js'
import { Reveal, MonoLabel } from '../components/ui.jsx'
import ContactForm from '../components/ContactForm.jsx'

export default function ContactPage() {
  return (
    <section className="relative z-10 pb-24 pt-28 sm:pb-32 sm:pt-32">
      <div className="u-wrap">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cream-mut transition-colors hover:text-cream"
        >
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>

        {/* Header */}
        <div className="mt-8 border-b border-cream/10 pb-10">
          <motion.div
            className="u-eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EXPO }}
          >
            <span className="text-ember">✳</span> {contactPage.eyebrow}
            {profile.available && (
              <span className="flex items-center gap-1.5 text-ok">
                <span className="h-1.5 w-1.5 rounded-full bg-ok-strong" /> Taking new projects
              </span>
            )}
          </motion.div>

          <motion.h1
            className="u-display mt-4 text-[clamp(2.5rem,8vw,6rem)] text-cream"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: EXPO }}
          >
            {contactPage.title.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </motion.h1>

          <motion.p
            className="mt-5 max-w-[60ch] text-lg text-cream-dim"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EXPO }}
          >
            {contactPage.sub}
          </motion.p>
        </div>

        {/* Form + aside */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-14">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="space-y-8 lg:sticky lg:top-28">
              <div>
                <MonoLabel className="mb-4">{contactPage.aside.title}</MonoLabel>
                <ul className="space-y-4">
                  {contactPage.aside.steps.map((s) => (
                    <li key={s.k} className="flex gap-4">
                      <span className="font-display text-xl leading-none text-ember">{s.k}</span>
                      <span className="text-cream-dim">{s.v}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="u-card p-6">
                <p className="text-sm text-cream-mut">{contactPage.aside.note}</p>
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-3 flex items-center gap-2 text-cream transition-colors hover:text-ember"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="break-all text-sm">{profile.email}</span>
                </a>
                <p className="mt-4 flex items-center gap-2 text-sm text-cream-mut">
                  <MapPin className="h-4 w-4 shrink-0" />
                  {profile.location}
                </p>
              </div>

              <div>
                <MonoLabel className="mb-4">Rather talk it through?</MonoLabel>
                <a href={contact.primaryCta.href} className="u-btn-ghost w-full">
                  <Calendar className="h-4 w-4" />
                  {contact.primaryCta.label}
                </a>
                <div className="mt-4 flex items-center gap-3">
                  {[
                    { href: profile.github, icon: Github, label: 'GitHub' },
                    { href: profile.linkedin, icon: Linkedin, label: 'LinkedIn' },
                    { href: profile.x, icon: X, label: 'X' },
                    { href: profile.instagram, icon: Instagram, label: 'Instagram' },
                    { href: profile.facebook, icon: Facebook, label: 'Facebook' },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      target={s.href?.startsWith('http') ? '_blank' : undefined}
                      rel={s.href?.startsWith('http') ? 'noreferrer' : undefined}
                      className="grid h-11 w-11 place-items-center rounded-xl border border-cream/12 bg-cream/[0.04] text-cream-dim transition-colors hover:border-ember/50 hover:text-cream"
                    >
                      <s.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
