// The "What I build with" toolbox. Logo tile per tool, grouped by category,
// so it stays readable on the dark canvas. Shared by the homepage About
// section and the /about page. Data + icon keys live in data/content.js.
import { Reveal } from './ui.jsx'
import { TechIcon } from './TechIcon.jsx'

export function Toolbox({ groups, className = '' }) {
  return (
    <div className={`space-y-6 ${className}`}>
      {groups.map((g, gi) => (
        <Reveal key={g.label} delay={gi * 0.04}>
          <div className="grid gap-4 border-t border-cream/10 pt-5 sm:grid-cols-[9.5rem_1fr] sm:gap-7">
            <div className="flex items-center gap-2 sm:pt-1.5">
              <span className="text-[12px] text-ember">✳</span>
              <span className="font-mono text-[13px] font-bold uppercase tracking-wider text-cream">
                {g.label}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
              {g.items.map((it) => (
                <div
                  key={it}
                  className="group flex items-center gap-3 rounded-xl border border-cream/10 bg-cream/[0.03] px-3.5 py-2.5 transition-colors duration-300 hover:border-ember/40 hover:bg-cream/[0.06]"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-cream/[0.06] transition-colors duration-300 group-hover:bg-cream/10">
                    <TechIcon label={it} className="h-[17px] w-[17px]" />
                  </span>
                  <span className="truncate font-mono text-[12.5px] text-cream-dim transition-colors duration-300 group-hover:text-cream">
                    {it}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

export default Toolbox
