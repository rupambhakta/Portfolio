import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Calendar } from 'lucide-react'
import { contact, profile } from '../data/content.js'
import { EXPO } from '../lib/motion.js'
import { Reveal, DisplayLines, MonoLabel } from './ui.jsx'

export default function Contact() {
  return (
    <section id="contact" className="relative z-10 scroll-mt-24 border-t border-cream/10 bg-base-900 py-24 sm:py-32">
      <div className="u-wrap">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <MonoLabel className="justify-center"><span className="text-ember">✳</span> {contact.eyebrow}</MonoLabel>
          </Reveal>
          <div className="mt-5 flex flex-col items-center">
            <DisplayLines lines={contact.title} className="text-[clamp(2.2rem,7vw,5rem)] text-cream" />
          </div>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-cream-dim">{contact.sub}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <motion.a
                href={contact.primaryCta.href}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: EXPO }}
                className="u-btn-primary w-full px-7 py-3.5 text-base sm:w-auto"
              >
                <Calendar className="h-5 w-5" />
                {contact.primaryCta.label}
              </motion.a>
              <a href={`mailto:${profile.email}`} className="u-btn-ghost w-full px-7 py-3.5 text-base sm:w-auto">
                <Mail className="h-5 w-5" />
                {profile.email}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex items-center justify-center gap-3">
              {[
                { href: profile.github, icon: Github, label: 'GitHub' },
                { href: profile.linkedin, icon: Linkedin, label: 'LinkedIn' },
                { href: `mailto:${profile.email}`, icon: Mail, label: 'Email' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-11 w-11 place-items-center rounded-xl border border-cream/12 bg-cream/[0.04] text-cream-dim transition-colors hover:border-ember/50 hover:text-cream"
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
