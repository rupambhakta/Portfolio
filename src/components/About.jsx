import { GraduationCap, Award } from 'lucide-react'
import { about } from '../data/content.js'
import { Reveal, DisplayLines, MonoLabel } from './ui.jsx'

export default function About() {
  return (
    <section id="about" className="relative z-10 scroll-mt-24 py-24 sm:py-32">
      <div className="u-wrap grid gap-14 lg:grid-cols-[0.95fr_1.05fr]">
        {/* Left: intro */}
        <div>
          <Reveal>
            <MonoLabel><span className="text-ember">✳</span> {about.eyebrow}</MonoLabel>
          </Reveal>
          <DisplayLines lines={about.title} className="mt-4 text-[clamp(2rem,6vw,4rem)] text-cream" />
          <div className="mt-6 space-y-4">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="text-cream-dim">{p}</p>
              </Reveal>
            ))}
          </div>

          {/* Skills */}
          <Reveal delay={0.1}>
            <div className="mt-8 space-y-4">
              {about.skills.map((g) => (
                <div key={g.label} className="flex flex-col gap-2 border-t border-cream/10 pt-4 sm:flex-row sm:gap-6">
                  <span className="w-40 shrink-0 font-mono text-[11px] uppercase tracking-wider text-cream-mut">
                    {g.label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((it) => (
                      <span key={it} className="u-chip">{it}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right: experience */}
        <div className="lg:pt-16">
          <Reveal>
            <MonoLabel className="mb-6">Experience</MonoLabel>
          </Reveal>
          <div className="border-l border-cream/12 pl-6">
            {about.experience.map((e, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="relative pb-9">
                  <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-base-950 bg-ember" />
                  <p className="font-mono text-xs text-ember">{e.period}</p>
                  <h3 className="mt-1 font-display text-2xl text-cream">{e.role}</h3>
                  <p className="text-sm font-medium text-cream-dim">{e.org}</p>
                  <p className="mt-2 text-sm text-cream-mut">{e.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="u-card p-5">
                <GraduationCap className="h-5 w-5 text-ember" />
                <p className="mt-3 font-medium text-cream">{about.education.degree}</p>
                <p className="mt-1 text-sm text-cream-mut">{about.education.org}</p>
                <p className="text-sm text-cream-mut">{about.education.period}</p>
              </div>
              <div className="u-card p-5">
                <Award className="h-5 w-5 text-ember" />
                <p className="mt-3 font-medium text-cream">Certifications</p>
                <ul className="mt-1 space-y-1 text-sm text-cream-mut">
                  {about.certifications.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
