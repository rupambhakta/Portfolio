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
    // Labelled content blocks for editorial callouts and in-article lists.
    const directive = line.trim().match(/^:::(callout|toc)(?:\s+(.+))?$/)
    if (directive) {
      const buf = []
      i++
      while (i < lines.length && lines[i].trim() !== ':::') {
        buf.push(lines[i])
        i++
      }
      if (i < lines.length) i++
      blocks.push({ type: directive[1], title: directive[2] || '', text: buf.join('\n').trim() })
      continue
    }
    // code fence
    if (line.trim().startsWith('```')) {
      const buf = []
      const language = line.trim().slice(3).trim()
      i++
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        buf.push(lines[i])
        i++
      }
      i++ // closing fence
      blocks.push({ type: 'code', language, text: buf.join('\n') })
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
    const img = line.trim().match(/^!\[([^\]]*)\]\((\S+?)(?:\s+"([^"]*)")?\)$/)
    if (img) {
      blocks.push({ type: 'image', alt: img[3] || img[1], src: img[2] })
      i++
      continue
    }
    // GitHub-flavoured Markdown tables.
    if (
      /^\|/.test(line.trim()) &&
      i + 1 < lines.length &&
      /^\|?[\s:|-]+\|[\s:|-]*$/.test(lines[i + 1].trim())
    ) {
      const row = (value) => value.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim())
      const headers = row(line)
      i += 2
      const rows = []
      while (i < lines.length && /^\|/.test(lines[i].trim())) {
        rows.push(row(lines[i]))
        i++
      }
      blocks.push({ type: 'table', headers, rows })
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

function headingId(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export default function Markdown({ content, hideToc = false }) {
  const blocks = parse(content || '')
  return (
    <div className="blog-prose">
      {blocks.map((b, k) => {
        switch (b.type) {
          case 'heading': {
            if (b.level <= 2)
              return (
                <h2 id={headingId(b.text)} key={k} className="mt-12 scroll-mt-28 font-display text-[clamp(1.4rem,3vw,1.9rem)] uppercase tracking-wide text-cream">
                  {renderInline(b.text, `h${k}`)}
                </h2>
              )
            if (b.level === 3)
              return (
                <h3 id={headingId(b.text)} key={k} className="mt-9 scroll-mt-28 font-sans text-xl font-semibold text-cream">
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
                  <code className="block font-mono text-[0.85rem] leading-relaxed text-[#d6deeb]">
                    {b.text.split('\n').map((line, j) => {
                      const diffClass = line.startsWith('+')
                        ? 'block -mx-4 bg-[#163f38] px-4 text-[#a8e6cf] sm:-mx-5 sm:px-5'
                        : line.startsWith('-')
                          ? 'block -mx-4 bg-[#482a2d] px-4 text-[#ffb4a9] sm:-mx-5 sm:px-5'
                          : 'block'
                      const tokenized = line.split(/("(?:[^"\\]|\\.)*"|\'(?:[^\'\\]|\\.)*\'|\b(?:from|import|const|let|return|def|class|print|true|false|null)\b|\b\d+\b)/g)
                      return (
                        <span key={j} className={diffClass}>
                          {tokenized.map((token, n) => {
                            const isString = /^(["\']).*\1$/.test(token)
                            const isKeyword = /^(from|import|const|let|return|def|class|print|true|false|null)$/.test(token)
                            const isNumber = /^\d+$/.test(token)
                            return <span key={n} className={isString ? "text-[#ecc48d]" : isKeyword ? "text-[#c792ea]" : isNumber ? "text-[#f78c6c]" : ""}>{token}</span>
                          })}
                        </span>
                      )
                    })}
                  </code>
                </pre>
              </div>
            )
          case 'image':
            return (
              <figure key={k} className="mt-8">
                <img
                  src={b.src}
                  alt={b.alt}
                  loading="lazy"
                  className={`w-full rounded-2xl border border-cream/10 ${b.src.includes('unified-diffing-agent-edit') ? 'mx-auto max-w-[480px]' : ''}`}
                />
                {b.alt ? (
                  <figcaption className="mt-3 flex items-center gap-2 font-mono text-[11px] text-cream-mut">
                    <span className="text-ember">↳</span> {b.alt}
                  </figcaption>
                ) : null}
              </figure>
            )
          case 'callout':
            return (
              <aside key={k} className="mt-8 border-l-2 border-ember bg-base-850 px-5 py-5 sm:px-6">
                {b.title ? <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-ember">{b.title}</p> : null}
                <p className="mt-2 text-[1.025rem] leading-[1.8] text-cream-dim">{renderInline(b.text, 'callout' + k)}</p>
              </aside>
            )
          case 'toc':
            if (hideToc) return null
            return (
              <aside key={k} className="mt-8 border border-cream/10 bg-base-850 px-5 py-5 sm:px-6">
                {b.title ? <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-ember">{b.title}</p> : null}
                <div className="mt-3 whitespace-pre-line text-[1rem] leading-8 text-cream-dim">{renderInline(b.text, 'toc' + k)}</div>
              </aside>
            )
          case 'table':
            return (
              <div key={k} className="mt-8 overflow-x-auto rounded-2xl border border-cream/10">
                <table className="min-w-full border-collapse text-left text-[0.95rem] leading-relaxed text-cream-dim">
                  <thead className="bg-base-850 text-cream">
                    <tr>
                      {b.headers.map((header, j) => (
                        <th key={j} className="border-b border-cream/10 px-4 py-3 font-semibold">{renderInline(header, 'th' + k + '-' + j)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, j) => (
                      <tr key={j} className="border-b border-cream/10 last:border-0">
                        {b.headers.map((_, n) => (
                          <td key={n} className="px-4 py-3 align-top">{renderInline(row[n] || '', 'td' + k + '-' + j + '-' + n)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
