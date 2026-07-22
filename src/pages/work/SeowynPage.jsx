// Seowyn — pipeline layout: the run is the story. A before/after ledger,
// a vertical agent pipeline with a connecting rail, and the deliverables
// rendered as the manifest a completed run hands back.
import { ArrowRight, Check, X } from 'lucide-react'
import seowyn from '../../data/projects/seowyn.js'
import { Reveal, MonoLabel } from '../../components/ui.jsx'
import Media from '../../components/Media.jsx'
import { icon } from '../../components/case/icons.js'
import {
  CaseCta,
  CaseHero,
  ClosingStatement,
  DefinitionList,
  MetaRow,
  NextProject,
  Section,
} from '../../components/case/CaseUI.jsx'

const p = seowyn

export default function SeowynPage({ next }) {
  return (
    <article className="relative z-10 pt-20 sm:pt-24">
      <div className="u-wrap">
        <div>
          <CaseHero p={p}>
            <MetaRow items={p.meta} />
          </CaseHero>
        </div>

        <Reveal className="mt-10">
          <Media src={p.cover} ratio="16/9" tint={p.tint} caption={p.cover ? null : 'Run dashboard — agents working live'} rounded="rounded-3xl" />
        </Reveal>

        {/* Overview */}
        <Section label={p.overview.label} title={p.overview.title}>
          <div className="mt-6 grid gap-6 md:grid-cols-2 md:gap-10">
            {p.overview.body.map((t, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="text-lg leading-relaxed text-cream-dim">{t}</p>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Problem — numbered pain points */}
        <Section label={p.problems.label} title={p.problems.title} intro={p.problems.intro}>
          <ul className="mt-8 space-y-4">
            {p.problems.items.map((t, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <li className="flex gap-4 border-b border-cream/10 pb-4">
                  <span className="font-mono text-[12px] text-ember">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-lg leading-relaxed text-cream-dim">{t}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </Section>

        {/* Before / after ledger */}
        <Section label={p.compare.label} title={p.compare.title}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-cream/10">
            <div className="grid grid-cols-1 gap-px bg-cream/10 sm:grid-cols-2">
              <div className="bg-base-900 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-cream-mut">
                {p.compare.heads[0]}
              </div>
              <div className="bg-base-900 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ember">
                {p.compare.heads[1]}
              </div>
              {p.compare.rows.map(([before, after], i) => (
                <CompareRow key={i} before={before} after={after} />
              ))}
            </div>
          </div>
        </Section>

        {/* Pipeline — vertical rail */}
        <Section label={p.stages.label} title={p.stages.title}>
          <ol className="mt-10 relative">
            <span className="absolute left-[19px] top-3 bottom-3 w-px bg-gradient-to-b from-ember/60 via-ember/25 to-transparent" aria-hidden="true" />
            {p.stages.items.map((s, i) => {
              const Icon = icon(s.icon)
              return (
                <Reveal key={s.k} delay={i * 0.06}>
                  <li className="relative flex gap-6 pb-10 last:pb-0">
                    <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ember/40 bg-base-900 text-ember">
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                    </span>
                    <div className="pt-1">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-[11px] text-ember">{String(i + 1).padStart(2, '0')}</span>
                        <h3 className="font-display text-2xl uppercase tracking-wide text-cream">{s.k}</h3>
                      </div>
                      <p className="mt-2 max-w-[62ch] leading-relaxed text-cream-dim">{s.v}</p>
                    </div>
                  </li>
                </Reveal>
              )
            })}
          </ol>
        </Section>

        {/* Deliverables — the run manifest */}
        <Section label={p.deliverables.label} title={p.deliverables.title} intro={p.deliverables.intro}>
          <div className="mt-8 rounded-2xl border border-cream/10 bg-base-850 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-cream/10 pb-4">
              <MonoLabel>Run output</MonoLabel>
              <span className="font-mono text-[11px] text-ok">{p.deliverables.items.length} / {p.deliverables.items.length} complete</span>
            </div>
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {p.deliverables.items.map((d, i) => (
                <Reveal key={i} delay={(i % 6) * 0.04}>
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-ok-strong" />
                    <span className="text-cream-dim">{d}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          <Media src={p.gallery[0]?.src} ratio={p.gallery[0]?.ratio} tint={p.tint} caption={p.gallery[0]?.caption} className="sm:col-span-2" />
          {p.gallery.slice(1).map((g, i) => (
            <Media key={i} src={g.src} ratio={g.ratio} tint={p.tint} caption={g.caption} />
          ))}
        </div>

        {/* Benefits */}
        <Section label="Key benefits" title="Why it wins">
          <DefinitionList items={p.benefits} columns={2} />
        </Section>

        {/* Audience */}
        <Section label="Who it’s for" title="Built for lean teams">
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {p.audiences.map((a, i) => (
              <Reveal key={i} delay={(i % 2) * 0.05}>
                <li className="flex h-full gap-3 rounded-2xl border border-cream/10 bg-base-850 p-5">
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-ember" />
                  <span className="leading-relaxed text-cream-dim">{a}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </Section>

        {/* Stack — one card per layer */}
        <Section label="Under the hood" title="Technology stack" intro={p.stack.intro}>
          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 sm:grid-cols-2">
            {p.stack.groups.map((g) => (
              <div key={g.group} className="bg-base-850 p-6">
                <MonoLabel className="text-ember">{g.group}</MonoLabel>
                <p className="mt-2.5 leading-relaxed text-cream-dim">{g.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <ClosingStatement>{p.closing}</ClosingStatement>
        <div className="mt-8">
          <CaseCta line="Want an agent team working on your growth?" />
        </div>
        {next && <NextProject next={next} />}
      </div>
    </article>
  )
}

// One before/after pair — the old way on the left, Seowyn on the right.
function CompareRow({ before, after }) {
  return (
    <>
      <div className="flex gap-3 bg-base-900 px-5 py-4">
        <X className="mt-0.5 h-4 w-4 shrink-0 text-cream-mut" />
        <span className="text-sm leading-relaxed text-cream-mut">{before}</span>
      </div>
      <div className="flex gap-3 bg-base-850 px-5 py-4">
        <Check className="mt-0.5 h-4 w-4 shrink-0 text-ok-strong" />
        <span className="text-sm leading-relaxed text-cream">{after}</span>
      </div>
    </>
  )
}
