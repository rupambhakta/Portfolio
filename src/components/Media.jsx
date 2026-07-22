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
        <div
          className="absolute inset-0 opacity-40"
          style={{ background: 'radial-gradient(circle at 70% 20%, var(--media-sheen), transparent 55%)' }}
        />
        <div className="relative flex flex-col items-center gap-2 px-4 text-center">
          {type === 'video' ? (
            <PlayCircle className="h-8 w-8 text-cream/80" />
          ) : (
            <ImageIcon className="h-8 w-8 text-cream/80" />
          )}
          <span className="font-mono text-[11px] uppercase tracking-wider text-cream/80">
            {type === 'video' ? 'Add video' : 'Add image'}
          </span>
          {caption && <span className="max-w-[22ch] text-[12px] leading-snug text-cream/70">{caption}</span>}
        </div>
      </div>
    </figure>
  )
}
