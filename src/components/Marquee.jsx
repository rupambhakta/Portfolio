import { marqueeItems } from '../data/content.js'

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
          {items.map((t, i) => (
            <span key={i} className="flex items-center gap-8 whitespace-nowrap">
              <span className="font-display text-2xl uppercase tracking-wide text-cream-dim">{t}</span>
              <span className="text-ember">✳</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
