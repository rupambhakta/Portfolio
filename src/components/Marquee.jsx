import { marqueeItems } from '../data/content.js'
import { TechIcon } from './TechIcon.jsx'

// Scrolling tech-stack strip. Each item uses its real brand logo and colour
// (see components/TechIcon.jsx). Add an item in content.js with a logo `icon` key.
export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems]
  return (
    <div className="relative z-10 border-y border-cream/10 bg-base-900 py-5">
      <div
        className="flex overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right,transparent,black 8%,black 92%,transparent)',
          WebkitMaskImage: 'linear-gradient(to right,transparent,black 8%,black 92%,transparent)',
        }}
      >
        <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8">
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-8 whitespace-nowrap">
              <span className="flex items-center gap-3">
                <TechIcon name={item.icon} className="h-6 w-6 shrink-0" />
                <span className="font-display text-2xl uppercase tracking-wide text-cream-dim">{item.label}</span>
              </span>
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cream/20" />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
