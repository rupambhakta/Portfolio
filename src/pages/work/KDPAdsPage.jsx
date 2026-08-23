// KDP Ads Platform - a visual, scan-first case study. Short copy, an icon on
// every point, an animated pipeline, and the n8n engine shown (blurred, so no
// node name is legible). No "01/02/03" point numbering anywhere. All visuals
// are anonymised - no client name, book titles, servers or workflow internals.
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import kdp from '../../data/projects/kdp-ads.js'
import { EXPO } from '../../lib/motion.js'
import { Reveal, MonoLabel } from '../../components/ui.jsx'
import { TechIcon } from '../../components/TechIcon.jsx'
import Media from '../../components/Media.jsx'
import { icon } from '../../components/case/icons.js'
import PipelineFlow from '../../components/case/kdp/PipelineFlow.jsx'
import {
  CaseCta,
  CaseHero,
  ClosingStatement,
  NextProject,
  PullQuote,
  Section,
} from '../../components/case/CaseUI.jsx'

const p = kdp

// One reusable icon tile - used by the KPI, metrics and payoff grids so every
// point is a glance, not a paragraph.
function IconCard({ it, big, delay = 0 }) {
  const Icon = icon(it.icon)
  return (
    <Reveal delay={delay}>
      <div className="flex h-full items-start gap-4 rounded-2xl border border-cream/10 bg-base-850 p-5">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ember/12 text-ember">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <div>
          <div className={big ? 'font-display text-3xl leading-none text-ember' : 'font-display text-lg uppercase tracking-wide text-cream'}>
            {it.k}
          </div>
          <p className="mt-1.5 text-sm leading-snug text-cream-dim">{it.v}</p>
        </div>
      </div>
    </Reveal>
  )
}

// A blurred n8n canvas with a brand badge, so the tool reads at a glance while
// no node name is legible.
function N8nShot({ shot, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <figure className="overflow-hidden rounded-2xl border border-cream/10 bg-base-900">
        <div className="relative">
          <img src={shot.src} alt="" aria-hidden className="block aspect-[16/10] w-full object-cover" />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-cream/15 bg-base-950/80 px-2.5 py-1 backdrop-blur">
            <TechIcon name="n8n" className="h-4 w-4" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-cream">n8n</span>
          </span>
        </div>
        <figcaption className="px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-cream-mut">{shot.caption}</figcaption>
      </figure>
    </Reveal>
  )
}

export default function KDPAdsPage({ next }) {
  return (
    <article className="relative z-10 pt-20 sm:pt-24">
      {/* n8n canvas as a faded hero backdrop - already blurred, then scrimmed
          on two axes so the headline stays fully legible in every theme. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px] overflow-hidden">
        <img src={p.heroBg} alt="" className="kdp-hero-bg h-full w-full object-contain object-right" />
        {/* bottom fade + a left-weighted scrim so the n8n network reads on the
            right while the headline sits on a clean, high-contrast field */}
        <div className="absolute inset-0 bg-gradient-to-b from-base-950/25 via-base-950/45 to-base-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-base-950 via-base-950/55 to-base-950/10" />
      </div>

      <div className="u-wrap">
        <CaseHero p={p} />

        {/* KPI band - icon tiles, not numbered points */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {p.kpis.map((k, i) => (
            <IconCard key={k.k + i} it={k} big delay={i * 0.05} />
          ))}
        </div>

        {/* Lead visual */}
        <Reveal className="mt-10">
          <Media src={p.cover} ratio={p.coverRatio} tint={p.tint} caption={p.dashboards.executive.caption} rounded="rounded-3xl" />
        </Reveal>

        <PullQuote>{p.statement}</PullQuote>

        {/* The problem - icon cards, no numbers */}
        <Section label={p.problems.label} title={p.problems.title}>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {p.problems.items.map((it, i) => (
              <IconCard key={it.k} it={it} delay={i * 0.06} />
            ))}
          </div>
        </Section>

        {/* What it does */}
        <Section label={p.gains.label} title={p.gains.title}>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {p.gains.items.map((it, i) => (
              <IconCard key={it.title} it={{ k: it.title, v: it.body, icon: it.icon }} delay={(i % 3) * 0.05} />
            ))}
          </div>
        </Section>

        {/* How it works - animated pipeline */}
        <Section label={p.pipeline.label} title={p.pipeline.title} intro={p.pipeline.intro}>
          <PipelineFlow stages={p.pipeline.stages} />
        </Section>

        {/* The engine - blurred n8n canvases */}
        <Section label={p.n8n.label} title={p.n8n.title} intro={p.n8n.intro}>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <N8nShot shot={p.n8n.canvas} />
            <N8nShot shot={p.n8n.flow} delay={0.08} />
          </div>
          <Reveal>
            <p className="mt-4 font-mono text-[11px] leading-relaxed text-cream-mut">
              <span className="text-ember">✳</span> {p.n8n.note}
            </p>
          </Reveal>
        </Section>

        {/* The numbers it measures */}
        <Section label={p.metrics.label} title={p.metrics.title}>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {p.metrics.items.map((it, i) => (
              <IconCard key={it.k} it={it} delay={(i % 3) * 0.05} />
            ))}
          </div>
        </Section>

        {/* The dashboards */}
        <Section label={p.dashboards.label} title={p.dashboards.title} intro={p.dashboards.intro}>
          <Reveal>
            <Media
              src={p.dashboards.marketplace.src}
              ratio={p.dashboards.marketplace.ratio}
              tint={p.tint}
              caption={p.dashboards.marketplace.caption}
              className="mt-8"
            />
          </Reveal>
        </Section>

        {/* Safe automation - icons, not numbers. Guardrails n8n canvas sits
            faded behind the whole section. */}
        <Section label={p.automation.label} title={p.automation.title} intro={p.automation.intro} className="relative isolate overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <img src={p.automation.bg} alt="" className="kdp-sec-bg h-full w-full object-contain object-center" />
            <div className="absolute inset-0 bg-gradient-to-b from-base-950 via-base-950/80 to-base-950" />
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {p.automation.steps.map((s, i) => {
              const Icon = icon(s.icon)
              return (
                <Reveal key={s.k} delay={i * 0.06}>
                  <div className="relative h-full rounded-2xl border border-cream/10 bg-base-900 p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-ember/12 text-ember">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-4 font-display text-lg uppercase tracking-wide text-cream">{s.k}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream-mut">{s.v}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>

          <Reveal>
            <div className="mt-4 rounded-2xl border border-cream/10 bg-base-850 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <MonoLabel>Guarded by</MonoLabel>
                {p.automation.guardrails.map((g) => (
                  <span key={g} className="rounded-full border border-ember/40 bg-ember/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-ember-soft">
                    {g}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-3">
                <span className="font-mono text-[12px] text-cream-dim">Dry run</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-cream/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-ember to-ok-strong"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 1.2, ease: EXPO }}
                  />
                </div>
                <span className="flex items-center gap-1.5 font-mono text-[12px] text-ok">
                  <Check className="h-3.5 w-3.5" /> Applied
                </span>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* The payoff */}
        <Section label={p.payoff.label} title={p.payoff.title}>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {p.payoff.items.map((it, i) => (
              <IconCard key={it.k} it={it} delay={(i % 3) * 0.05} />
            ))}
          </div>
        </Section>

        {/* Stack - brand logos, not a table */}
        <Section label="Under the hood" title="Built with">
          <Reveal>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {p.stack.logos.map((l) => (
                <span key={l.name} className="inline-flex items-center gap-2 rounded-full border border-cream/12 bg-base-850 px-4 py-2">
                  <TechIcon name={l.name} className="h-5 w-5" />
                  <span className="font-display text-sm uppercase tracking-wide text-cream">{l.label}</span>
                </span>
              ))}
              {p.stack.extras.map((e) => (
                <span key={e} className="inline-flex items-center rounded-full border border-cream/12 bg-base-850 px-4 py-2 font-display text-sm uppercase tracking-wide text-cream-dim">
                  {e}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <div className="mt-6 rounded-2xl border border-ember/30 bg-ember/[0.06] p-6 sm:p-8">
              <MonoLabel className="text-ember">Design highlight</MonoLabel>
              <p className="mt-3 max-w-[68ch] leading-relaxed text-cream-dim">{p.stack.highlight}</p>
            </div>
          </Reveal>
        </Section>

        <ClosingStatement>{p.closing}</ClosingStatement>
        <div className="mt-8">
          <CaseCta line="Drowning in ad data across marketplaces?" />
        </div>
        {next && <NextProject next={next} />}
      </div>
    </article>
  )
}
