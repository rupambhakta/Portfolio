import { ImageIcon, PlayCircle } from 'lucide-react'
import { TINTS } from './ui.jsx'

// Renders a real image/video when `src` is set, otherwise a labelled
// placeholder so you can see exactly where to drop assets.
export default function Media({ src, type = 'image', ratio = '16/10', caption, tint = 'ember', className = '', rounded = 'rounded-2xl' }) {
  const style = { aspectRatio: ratio }

  if (src) {
    return (
      <figure className={className}>
        {type === 'video' ? (
          <video src={src} controls className={`w-full ${rounded} border border-cream/10`} style={style} />
        ) : (
          <img src={src} alt={caption || ''} className={`w-full ${rounded} border border-cream/10 object-cover`} style={style} />
        )}
        {caption && <figcaption className="mt-2 font-mono text-[11px] text-cream-mut">{caption}</figcaption>}
      </figure>
    )
  }

  return (
    <figure className={className}>
      <div
        className={`relative flex items-center justify-center overflow-hidden border border-dashed border-cream/15 ${rounded}`}
        style={{ ...style, background: TINTS[tint] || TINTS.ember }}
      >
        <div className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.12),transparent_55%)]" />
        <div className="relative flex flex-col items-center gap-2 px-4 text-center">
          {type === 'video' ? (
            <PlayCircle className="h-8 w-8 text-cream/70" />
          ) : (
            <ImageIcon className="h-8 w-8 text-cream/70" />
          )}
          <span className="font-mono text-[11px] uppercase tracking-wider text-cream/70">
            {type === 'video' ? 'Add video' : 'Add image'}
          </span>
          {caption && <span className="max-w-[22ch] text-[12px] leading-snug text-cream/55">{caption}</span>}
        </div>
      </div>
    </figure>
  )
}
