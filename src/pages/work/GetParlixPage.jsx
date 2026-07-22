// GetParlix — SaaS platform layout: cost-of-the-problem stat band, audience
// grid, feature wall, integrations table, security, scale numbers, and a
// grouped stack breakdown with the role each technology plays.
import { Check, Lock, ShieldCheck } from 'lucide-react'
import getparlix from '../../data/projects/getparlix.js'
import { Reveal, MonoLabel } from '../../components/ui.jsx'
import Media from '../../components/Media.jsx'
import { icon } from '../../components/case/icons.js'
import {
  BackLink,
  CardGrid,
  CaseCta,
  CaseHero,
  ClosingStatement,
  DefinitionList,
  MetaRow,
  NextProject,
  PullQuote,
  Section,
  SpecTable,
  StatBand,
} from '../../components/case/CaseUI.jsx'

const p = getparlix

export default function GetParlixPage({ next }) {
  return (
    <article className="relative z-10 pt-28 sm:pt-32">
      <div className="u-wrap">
        <BackLink />

        <div className="mt-8">
          <CaseHero p={p}>
            <MetaRow items={p.meta} />
          </CaseHero>
        </div>

        <Reveal className="mt-10">
          <Media
            src={p.cover}
            ratio={p.coverRatio || '16/9'}
            tint={p.tint}
            caption={p.cover ? null : 'Hero screenshot or product demo'}
            rounded="rounded-3xl"
          />
        </Reveal>

        {/* What it is — prose alongside the widget itself */}
        <Section label={p.what.label} title={p.what.title}>
          <div className="mt-6 grid items-start gap-8 lg:grid-cols-[1fr_300px] lg:gap-12">
            <div className="space-y-6">
              {p.what.body.map((t, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <p className="text-lg leading-relaxed text-cream-dim">{t}</p>
                </Reveal>
              ))}
              <PullQuote>{p.what.pull}</PullQuote>
            </div>
            <Reveal delay={0.1}>
              <Media
                src={p.widgetShot.src}
                ratio={p.widgetShot.ratio}
                tint={p.tint}
                caption={p.widgetShot.caption}
                rounded="rounded-2xl"
                className="mx-auto max-w-[300px]"
              />
            </Reveal>
          </div>
        </Section>

        {/* The cost of the gap */}
        <Section label={p.problem.label} title={p.problem.title} intro={p.problem.body}>
          <StatBand stats={p.problem.stats} note={p.problem.note} tone="panel" />
        </Section>

        {/* Who it's for */}
        <Section label="Audience" title="Who it’s for">
          <CardGrid
            items={p.audiences.map((a) => ({ title: a.title, body: a.body, icon: a.icon }))}
            columns={4}
            renderIcon={(it) => icon(it.icon)}
          />
          <Reveal>
            <p className="mt-6 max-w-[68ch] leading-relaxed text-cream-mut">{p.audienceNote}</p>
          </Reveal>
        </Section>

        {/* Three steps to live — numbered rail */}
        <Section label="How it works" title="Live in three steps.">
          <ol className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 md:grid-cols-3">
            {p.steps.map((s, i) => (
              <li key={s.k} className="relative bg-base-850 p-7">
                <span className="font-display text-5xl leading-none text-ember/25">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 font-display text-xl uppercase tracking-wide text-cream">{s.k}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-mut">{s.v}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* Feature wall */}
        <Section label="Key features" title="What it does">
          <CardGrid items={p.features.map((f) => ({ ...f }))} columns={2} renderIcon={(it) => icon(it.icon)} />
        </Section>

        {/* Dashboard */}
        <Section label={p.dashboard.label} title="A control center for the business" intro={p.dashboard.intro}>
          <DefinitionList items={p.dashboard.items} columns={2} />
        </Section>

        {/* Screens — the voice call in place, then the two dashboard views */}
        <div className="mt-14">
          <Reveal>
            <MonoLabel>
              <span className="text-ember">✳</span> Screens
            </MonoLabel>
          </Reveal>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Reveal className="sm:col-span-2">
              <Media src={p.gallery[0].src} ratio={p.gallery[0].ratio} tint={p.tint} caption={p.gallery[0].caption} />
            </Reveal>
            {p.gallery.slice(1).map((g, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <Media src={g.src} ratio={g.ratio} tint={p.tint} caption={g.caption} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Business value */}
        <Section label="The payoff" title="Benefits & business value" intro="It converts attention that was previously lost into booked, confirmed revenue — while giving staff their time back.">
          <div className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {p.benefits.map((b, i) => (
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

        {/* Integrations */}
        <Section label="Integrations" title="What it connects to">
          <SpecTable rows={p.integrations} />
        </Section>

        {/* Security */}
        <Section label="Security & trust" title="Built in, not bolted on." intro={p.security.intro}>
          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 sm:grid-cols-2">
            {p.security.items.map((s, i) => (
              <div key={s.k} className="flex gap-4 bg-base-850 p-6">
                {i % 2 === 0 ? (
                  <ShieldCheck className="h-5 w-5 shrink-0 text-ember" strokeWidth={1.75} />
                ) : (
                  <Lock className="h-5 w-5 shrink-0 text-ember" strokeWidth={1.75} />
                )}
                <div>
                  <p className="font-display text-lg uppercase tracking-wide text-cream">{s.k}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-cream-mut">{s.v}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Scale */}
        <Section label="Proven at scale" title="Running in production">
          <StatBand stats={p.scale.stats} note={p.scale.note} tone="panel" />
        </Section>

        {/* Stack — grouped, with the role each piece plays */}
        <Section label="Under the hood" title="Technology stack" intro={p.stack.intro}>
          <div className="mt-8 space-y-8">
            {p.stack.groups.map((g) => (
              <Reveal key={g.group}>
                <div>
                  <MonoLabel className="text-ember">{g.group}</MonoLabel>
                  <div className="mt-3 overflow-hidden rounded-2xl border border-cream/10">
                    {g.rows.map(([tech, role], i) => (
                      <div
                        key={tech}
                        className={`grid gap-1.5 p-4 sm:grid-cols-[minmax(180px,280px)_1fr] sm:gap-6 ${
                          i % 2 ? 'bg-base-850' : 'bg-base-900'
                        }`}
                      >
                        <span className="font-mono text-[13px] text-cream">{tech}</span>
                        <span className="text-sm leading-relaxed text-cream-mut">{role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Ownership */}
        <Section label="My role" title={p.ownership.title} intro={p.ownership.intro}>
          <DefinitionList items={p.ownership.items} columns={2} />
        </Section>

        <ClosingStatement>{p.closing}</ClosingStatement>
        <div className="mt-8">
          <CaseCta line="Want an assistant like this on your site?" />
        </div>
        {next && <NextProject next={next} />}
      </div>
    </article>
  )
}
