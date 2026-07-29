// Seowyn — an image-led case study. The product's own screens carry the
// explanation: the landing promise, the workspace, then a four-step walkthrough
// where every claim is backed by the real screen it happens on.
// Screenshots render inside a browser frame with object-contain, so the FULL
// image is always visible — nothing is ever cropped.
import { ArrowRight, Check, X, Lock } from 'lucide-react'
import seowyn from '../../data/projects/seowyn.js'
import { Reveal, MonoLabel } from '../../components/ui.jsx'
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

// Framed, full-bleed screenshot. object-contain guarantees the whole image
// shows; the container's aspect-ratio (the file's real ratio) reserves the
// exact space so there's no layout shift and no letterboxing.
function Shot({ src, ratio, url, caption, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <figure>
        <div className="overflow-hidden rounded-2xl border border-cream/12 bg-base-900 shadow-2xl shadow-black/30">
          <div className="flex items-center gap-2 border-b border-cream/10 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-cream/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-cream/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-cream/15" />
            {url && (
              <span className="ml-3 flex min-w-0 items-center gap-1.5 rounded-md bg-base-850 px-2.5 py-1 font-mono text-[11px] text-cream-mut">
                <Lock className="h-3 w-3 shrink-0" />
                <span className="truncate">{url}</span>
              </span>
            )}
          </div>
          <div className="bg-base-950" style={{ aspectRatio: ratio }}>
            <img src={src} alt={caption || ''} loading="lazy" className="h-full w-full object-contain" />
          </div>
        </div>
        {caption && (
          <figcaption className="mt-3 flex items-start gap-2 font-mono text-[11px] leading-relaxed text-cream-mut">
            <span className="text-ember">↳</span>
            {caption}
          </figcaption>
        )}
      </figure>
    </Reveal>
  )
}

export default function SeowynPage({ next }) {
  return (
    <article className="relative z-10 pt-20 sm:pt-24">
      <div className="u-wrap">
        <CaseHero p={p}>
          <MetaRow items={p.meta} />
        </CaseHero>

        {/* Cover — the product's landing promise, shown in full */}
        <div className="mt-10">
          <Shot src={p.cover} ratio={p.coverRatio} url={p.coverUrl} caption={p.coverCaption} />
        </div>

        {/* Overview — prose, then the actual workspace it describes */}
        <Section label={p.overview.label} title={p.overview.title}>
          <div className="mt-6 grid gap-6 md:grid-cols-2 md:gap-10">
            {p.overview.body.map((t, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="text-lg leading-relaxed text-cream-dim">{t}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <Shot src={p.workspace.src} ratio={p.workspace.ratio} url={p.workspace.url} caption={p.workspace.caption} />
          </div>
        </Section>

        {/* Problem */}
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

        {/* Walkthrough — the heart of the page: every step backed by its screen */}
        <Section label={p.walkthrough.label} title={p.walkthrough.title} intro={p.walkthrough.intro}>
          <div className="mt-12 space-y-16 sm:space-y-20">
            {p.walkthrough.steps.map((s, i) => (
              <div key={s.n}>
                <div className="grid gap-3 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-8">
                  <span className="font-display text-5xl leading-none text-ember/25 sm:text-6xl">{s.n}</span>
                  <div className="max-w-[64ch]">
                    <h3 className="font-display text-2xl uppercase tracking-wide text-cream sm:text-3xl">{s.k}</h3>
                    <p className="mt-3 text-lg leading-relaxed text-cream-dim">{s.v}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <Shot src={s.src} ratio={s.ratio} url={s.url} caption={s.caption} />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Deliverables — the run manifest */}
        <Section label={p.deliverables.label} title={p.deliverables.title} intro={p.deliverables.intro}>
          <div className="mt-8 rounded-2xl border border-cream/10 bg-base-850 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-cream/10 pb-4">
              <MonoLabel>Run output</MonoLabel>
              <span className="font-mono text-[11px] text-ok">
                {p.deliverables.items.length} / {p.deliverables.items.length} complete
              </span>
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

        {/* Stack */}
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
