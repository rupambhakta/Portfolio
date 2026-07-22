// HeatMapIQ — report layout: KPI strip up top, the three heatmap signals as
// a triad, severity chips as a visual motif, and a mocked progress bar to
// echo the "X of Y fixed" tracking the product is built around.
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import heatmapiq from '../../data/projects/heatmapiq.js'
import { EXPO } from '../../lib/motion.js'
import { Reveal, MonoLabel } from '../../components/ui.jsx'
import Media from '../../components/Media.jsx'
import { icon } from '../../components/case/icons.js'
import {
  BackLink,
  Callout,
  CardGrid,
  CaseCta,
  CaseHero,
  ClosingStatement,
  DefinitionList,
  NextProject,
  PullQuote,
  Section,
  SpecTable,
  StatBand,
} from '../../components/case/CaseUI.jsx'

const p = heatmapiq

const SEVERITY_STYLE = {
  Critical: 'border-ember/60 bg-ember/15 text-ember-soft',
  High: 'border-warn/40 bg-warn/10 text-warn',
  Medium: 'border-cream/20 bg-cream/[0.06] text-cream-dim',
  Low: 'border-cream/12 bg-cream/[0.03] text-cream-mut',
}

export default function HeatMapIQPage({ next }) {
  return (
    <article className="relative z-10 pt-28 sm:pt-32">
      <div className="u-wrap">
        <BackLink />

        <div className="mt-8">
          <CaseHero p={p} />
        </div>

        {/* KPI strip — the numbers the case study opens on */}
        <StatBand stats={p.kpis} tone="panel" />

        <Reveal className="mt-10">
          <Media src={p.cover} ratio="16/9" tint={p.tint} caption={p.cover ? null : 'Report view — ranked issues'} rounded="rounded-3xl" />
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
          <PullQuote>{p.overview.pull}</PullQuote>
        </Section>

        {/* The challenge — three pain points */}
        <Section label={p.problems.label} title={p.problems.title} intro={p.problems.intro}>
          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 md:grid-cols-3">
            {p.problems.items.map((it, i) => (
              <div key={it.k} className="bg-base-850 p-6">
                <span className="font-display text-4xl leading-none text-ember/25">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 font-display text-lg uppercase leading-tight tracking-wide text-cream">{it.k}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-mut">{it.v}</p>
              </div>
            ))}
          </div>
          <Reveal>
            <p className="mt-6 max-w-[68ch] leading-relaxed text-cream-mut">{p.problems.outro}</p>
          </Reveal>
        </Section>

        {/* The three signals */}
        <Section label={p.signals.label} title={p.signals.title} intro={p.signals.intro}>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {p.signals.items.map((s, i) => {
              const Icon = icon(s.icon)
              return (
                <Reveal key={s.k} delay={i * 0.07}>
                  <div className="h-full rounded-2xl border border-cream/10 bg-base-850 p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-ember/12 text-ember">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-4 font-display text-2xl uppercase tracking-wide text-cream">{s.k}</h3>
                    <p className="mt-2 leading-relaxed text-cream-mut">{s.v}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>

          {/* Severity motif */}
          <Reveal>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-cream-mut">Every finding is tagged</span>
              {p.signals.severities.map((s) => (
                <span key={s} className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider ${SEVERITY_STYLE[s]}`}>
                  {s}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <p className="mt-6 max-w-[68ch] leading-relaxed text-cream-dim">{p.signals.outro}</p>
          </Reveal>
        </Section>

        {/* Three steps */}
        <Section label={p.steps.label} title={p.steps.title}>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {p.steps.items.map((s, i) => (
              <Reveal key={s.k} delay={i * 0.06}>
                <li className="h-full rounded-2xl border border-cream/10 bg-base-900 p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-ember font-mono text-[13px] font-semibold text-ink">
                      {i + 1}
                    </span>
                    <h3 className="font-display text-lg uppercase tracking-wide text-cream">{s.k}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-cream-mut">{s.v}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Section>

        {/* Features */}
        <Section label={p.features.label} title={p.features.title} intro={p.features.intro}>
          <CardGrid items={p.features.items} columns={2} renderIcon={(it) => icon(it.icon)} />
        </Section>

        {/* Fix-tracking motif — a nod to the product's progress bar */}
        <Reveal>
          <div className="mt-8 rounded-2xl border border-cream/10 bg-base-850 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <MonoLabel>Fix tracking</MonoLabel>
              <span className="font-mono text-[12px] text-cream-dim">
                <span className="text-ok">7</span> of 12 fixed
              </span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-cream/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-ember to-ok-strong"
                initial={{ width: 0 }}
                whileInView={{ width: '58%' }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1.1, ease: EXPO }}
              />
            </div>
            <p className="mt-3 text-sm text-cream-mut">
              Shared reports carry the live progress bar, so a client always sees what has been shipped.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          <Media src={p.gallery[0]?.src} ratio={p.gallery[0]?.ratio} tint={p.tint} caption={p.gallery[0]?.caption} className="sm:col-span-2" />
          {p.gallery.slice(1).map((g, i) => (
            <Media key={i} src={g.src} ratio={g.ratio} tint={p.tint} caption={g.caption} />
          ))}
        </div>

        {/* Payoff */}
        <Section label={p.payoff.label} title={p.payoff.title} intro={p.payoff.intro}>
          <div className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {p.payoff.items.map((b, i) => (
              <Reveal key={b.k} delay={(i % 3) * 0.05}>
                <div className="flex gap-3.5">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-ember" />
                  <div>
                    <p className="font-display text-lg uppercase tracking-wide text-cream">{b.k}</p>
                    <p className="mt-1 leading-relaxed text-cream-dim">{b.v}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Audience */}
        <Section label={p.audiences.label} title={p.audiences.title} intro={p.audiences.intro}>
          <DefinitionList items={p.audiences.items} columns={2} />
        </Section>

        {/* Stack */}
        <Section label="Under the hood" title="Technology stack" intro={p.stack.intro}>
          <SpecTable rows={p.stack.rows} />
          <Callout label={p.stack.highlight.k}>{p.stack.highlight.v}</Callout>
        </Section>

        <ClosingStatement>{p.closing}</ClosingStatement>
        <div className="mt-8">
          <CaseCta line="Sitting on data nobody reads?" />
        </div>
        {next && <NextProject next={next} />}
      </div>
    </article>
  )
}
