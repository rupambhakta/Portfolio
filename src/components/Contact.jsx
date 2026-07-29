import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Mail, Calendar } from 'lucide-react'
import { contact, profile } from '../data/content.js'
import { EXPO } from '../lib/motion.js'
import { Reveal, DisplayLines, MonoLabel } from './ui.jsx'
import SocialLinks from './SocialLinks.jsx'

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
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.2, ease: EXPO }} className="w-full sm:w-auto">
                <Link to={contact.formCta.to} className="u-btn-primary w-full px-7 py-3.5 text-base">
                  {contact.formCta.label}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </motion.div>
              <a href={contact.primaryCta.href} className="u-btn-ghost w-full px-7 py-3.5 text-base sm:w-auto">
                <Calendar className="h-5 w-5" />
                {contact.primaryCta.label}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <a
              href={`mailto:${profile.email}`}
              className="mt-6 inline-flex items-center gap-2 text-sm text-cream-mut transition-colors hover:text-cream"
            >
              <Mail className="h-4 w-4" />
              {profile.email}
            </a>
          </Reveal>

          <Reveal delay={0.2}>
            <SocialLinks email className="mt-10 justify-center" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
