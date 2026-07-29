// A small, dependency-free Markdown renderer for blog posts. Supports the
// subset used in data/blog.js and styles everything for comfortable long-form
// reading on the dark canvas. Not a full CommonMark parser by design.
import { Fragment } from 'react'

// ── inline: **bold**, *italic*, `code`, [text](url) ───────────
const INLINE = /(`[^`]+`)|(\*\*[^*]+?\*\*)|(\*[^*]+?\*)|(\[[^\]]+?\]\([^)]+?\))/g

function renderInline(text, keyPrefix = 'i') {
  const nodes = []
  let last = 0
  let m
  let n = 0
  INLINE.lastIndex = 0
  while ((m = INLINE.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index))
    const tok = m[0]
    const key = `${keyPrefix}-${n++}`
    if (tok.startsWith('`')) {
      nodes.push(
        <code key={key} className="rounded-md border border-cream/10 bg-cream/[0.08] px-1.5 py-0.5 font-mono text-[0.85em] text-cream">
          {tok.slice(1, -1)}
        </code>,
      )
    } else if (tok.startsWith('**')) {
      nodes.push(
        <strong key={key} className="font-semibold text-cream">
          {tok.slice(2, -2)}
        </strong>,
      )
    } else if (tok.startsWith('*')) {
      nodes.push(
        <em key={key} className="italic text-cream">
          {tok.slice(1, -1)}
        </em>,
      )
    } else {
      const mt = tok.match(/^\[([^\]]+?)\]\(([^)]+?)\)$/)
      const label = mt ? mt[1] : tok
      const url = mt ? mt[2] : '#'
      const ext = /^https?:/.test(url)
      nodes.push(
        <a
          key={key}
          href={url}
          {...(ext ? { target: '_blank', rel: 'noreferrer' } : {})}
          className="font-medium text-ember underline decoration-ember/40 underline-offset-4 transition-colors hover:decoration-ember"
        >
          {label}
        </a>,
      )
    }
    last = m.index + tok.length
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

// ── block parser ──────────────────────────────────────────────
function parse(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n')
  const blocks = []
  let i = 0
  while (i < lines.length) {
    let line = lines[i]

    // blank
    if (!line.trim()) {
      i++
      continue
    }
    // code fence
    if (line.trim().startsWith('```')) {
      const buf = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        buf.push(lines[i])
        i++
      }
      i++ // closing fence
      blocks.push({ type: 'code', text: buf.join('\n') })
      continue
    }
    // horizontal rule
    if (/^(-{3,}|\*{3,})$/.test(line.trim())) {
      blocks.push({ type: 'hr' })
      i++
      continue
    }
    // heading
    const h = line.match(/^(#{1,4})\s+(.*)$/)
    if (h) {
      blocks.push({ type: 'heading', level: h[1].length, text: h[2].trim() })
      i++
      continue
    }
    // image on its own line
    const img = line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
    if (img) {
      blocks.push({ type: 'image', alt: img[1], src: img[2] })
      i++
      continue
    }
    // blockquote
    if (line.trim().startsWith('>')) {
      const buf = []
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        buf.push(lines[i].replace(/^\s*>\s?/, ''))
        i++
      }
      blocks.push({ type: 'quote', text: buf.join(' ') })
      continue
    }
    // unordered list
    if (/^\s*[-*]\s+/.test(line)) {
      const items = []
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ''))
        i++
      }
      blocks.push({ type: 'ul', items })
      continue
    }
    // ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items = []
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ''))
        i++
      }
      blocks.push({ type: 'ol', items })
      continue
    }
    // paragraph (join consecutive plain lines)
    const buf = [line]
    i++
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^\s*([-*]\s+|\d+\.\s+|>|#{1,4}\s+|```)/.test(lines[i]) &&
      !/^(-{3,}|\*{3,})$/.test(lines[i].trim())
    ) {
      buf.push(lines[i])
      i++
    }
    blocks.push({ type: 'p', text: buf.join(' ') })
  }
  return blocks
}

export default function Markdown({ content }) {
  const blocks = parse(content || '')
  return (
    <div className="blog-prose">
      {blocks.map((b, k) => {
        switch (b.type) {
          case 'heading': {
            if (b.level <= 2)
              return (
                <h2 key={k} className="mt-12 font-display text-[clamp(1.4rem,3vw,1.9rem)] uppercase tracking-wide text-cream">
                  {renderInline(b.text, `h${k}`)}
                </h2>
              )
            if (b.level === 3)
              return (
                <h3 key={k} className="mt-9 font-sans text-xl font-semibold text-cream">
                  {renderInline(b.text, `h${k}`)}
                </h3>
              )
            return (
              <h4 key={k} className="mt-8 font-mono text-sm uppercase tracking-wider text-cream-mut">
                {renderInline(b.text, `h${k}`)}
              </h4>
            )
          }
          case 'p':
            return (
              <p key={k} className="mt-6 text-[1.075rem] leading-[1.85] text-cream-dim">
                {renderInline(b.text, `p${k}`)}
              </p>
            )
          case 'ul':
            return (
              <ul key={k} className="mt-6 space-y-2.5">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3 text-[1.075rem] leading-[1.75] text-cream-dim">
                    <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                    <span>{renderInline(it, `ul${k}-${j}`)}</span>
                  </li>
                ))}
              </ul>
            )
          case 'ol':
            return (
              <ol key={k} className="mt-6 space-y-2.5">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3 text-[1.075rem] leading-[1.75] text-cream-dim">
                    <span className="mt-[0.15em] font-mono text-sm font-bold text-ember">{String(j + 1).padStart(2, '0')}</span>
                    <span>{renderInline(it, `ol${k}-${j}`)}</span>
                  </li>
                ))}
              </ol>
            )
          case 'quote':
            return (
              <blockquote key={k} className="mt-8 border-l-2 border-ember/60 pl-5 sm:pl-6">
                <p className="font-display text-[clamp(1.15rem,2.4vw,1.5rem)] uppercase leading-tight tracking-wide text-cream">
                  {renderInline(b.text, `q${k}`)}
                </p>
              </blockquote>
            )
          case 'code':
            return (
              <div key={k} className="mt-7 overflow-hidden rounded-2xl border border-cream/10 bg-base-900">
                <div className="flex items-center gap-1.5 border-b border-cream/10 px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-cream/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-cream/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-cream/15" />
                </div>
                <pre className="overflow-x-auto px-4 py-4 sm:px-5">
                  <code className="font-mono text-[0.85rem] leading-relaxed text-cream-dim">{b.text}</code>
                </pre>
              </div>
            )
          case 'image':
            return (
              <figure key={k} className="mt-8">
                <img src={b.src} alt={b.alt} loading="lazy" className="w-full rounded-2xl border border-cream/10" />
                {b.alt ? (
                  <figcaption className="mt-3 flex items-center gap-2 font-mono text-[11px] text-cream-mut">
                    <span className="text-ember">↳</span> {b.alt}
                  </figcaption>
                ) : null}
              </figure>
            )
          case 'hr':
            return <hr key={k} className="mt-10 border-cream/10" />
          default:
            return <Fragment key={k} />
        }
      })}
    </div>
  )
}
