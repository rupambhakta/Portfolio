// Blog listing (/blog). Editorial hero, one featured post, a tag filter, and a
// colour-varied grid. Ember stays a light accent; covers use the theme's
// cyan / violet / green tints so the page has range without leaning on red.
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { posts, blogMeta, allTags, formatDate, readingTime } from '../data/blog/index.js'
import { EXPO } from '../lib/motion.js'
import { Reveal, MonoLabel, TINTS } from '../components/ui.jsx'
import HeroBackdrop from '../components/HeroBackdrop.jsx'
import blogBg from '../assets/bg/topo.webp'

// Solid accent per tint, for category dots / labels (keeps colour off red).
const DOT = { ember: '#FF6A3D', cyan: '#39C0D9', violet: '#9A8CFF', green: '#7BD88F' }

function Meta({ post, className = '' }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-cream-mut ${className}`}>
      <span>{formatDate(post.date)}</span>
      <span className="text-cream/20">/</span>
      <span>{post.readMinutes || readingTime(post.body)} min read</span>
    </div>
  )
}

function TagLabel({ post }) {
  return (
    <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider" style={{ color: DOT[post.tint] }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: DOT[post.tint] }} />
      {post.tag}
    </span>
  )
}

function Featured({ post }) {
  return (
    <Reveal>
      <Link
        to={`/blog/${post.slug}`}
        className="group grid overflow-hidden rounded-3xl border border-cream/10 bg-base-850 transition-colors duration-300 hover:border-cream/25 lg:grid-cols-2"
      >
        {/* content */}
        <div className="order-2 flex flex-col justify-between gap-8 p-7 sm:p-9 lg:order-1">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-cream-mut">Featured</span>
              <span className="h-px w-8 bg-cream/20" />
              <TagLabel post={post} />
            </div>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,4vw,3rem)] uppercase leading-[0.95] tracking-wide text-cream">
              {post.title}
            </h2>
            <p className="mt-4 max-w-[52ch] text-[1.05rem] leading-relaxed text-cream-dim">{post.excerpt}</p>
          </div>
          <div className="flex items-center justify-between">
            <Meta post={post} />
            <span className="flex items-center gap-2 font-mono text-[13px] font-medium text-cream transition-colors group-hover:text-ember">
              Read
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
        {/* cover */}
        <div className="relative order-1 min-h-[220px] overflow-hidden lg:order-2 lg:min-h-full">
          {post.cover ? (
            <img src={post.cover} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0" style={{ background: TINTS[post.tint] }} />
          )}
          <div className="absolute inset-0 flex items-end p-7 sm:p-9">
            <span className="font-display text-[clamp(4rem,12vw,8rem)] leading-none text-cream/85 drop-shadow">01</span>
          </div>
        </div>
      </Link>
    </Reveal>
  )
}

function PostCard({ post, index }) {
  return (
    <Reveal delay={(index % 3) * 0.06}>
      <Link
        to={`/blog/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-cream/10 bg-base-850 transition-colors duration-300 hover:border-cream/25"
      >
        <div className="relative h-40 overflow-hidden">
          {post.cover ? (
            <img src={post.cover} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
          ) : (
            <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]" style={{ background: TINTS[post.tint] }} />
          )}
          <div className="absolute right-4 top-3 font-display text-3xl text-cream/80 drop-shadow">{String(index + 2).padStart(2, '0')}</div>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <TagLabel post={post} />
          <h3 className="mt-3 font-display text-[1.35rem] uppercase leading-tight tracking-wide text-cream">{post.title}</h3>
          <p className="mt-2.5 line-clamp-3 text-[0.95rem] leading-relaxed text-cream-mut">{post.excerpt}</p>
          <div className="mt-5 flex items-center justify-between border-t border-cream/10 pt-4">
            <Meta post={post} />
            <ArrowUpRight className="h-4 w-4 text-cream-mut transition-all duration-300 group-hover:text-ember group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </Link>
    </Reveal>
  )
}

export default function BlogPage() {
  const [active, setActive] = useState('All')
  const featured = posts.find((p) => p.featured) || posts[0]
  const showFeatured = active === 'All'
  const rest = posts.filter((p) => (showFeatured ? p.slug !== featured.slug : true)).filter((p) => active === 'All' || p.tag === active)

  return (
    <article className="relative z-10 pb-28 pt-28 sm:pt-32">
      <HeroBackdrop src={blogBg} height="h-[520px]" />
      <div className="u-wrap">
        {/* Hero */}
        <motion.div className="u-eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EXPO }}>
          <span className="text-ember">✳</span> {blogMeta.eyebrow}
        </motion.div>
        <h1 className="u-display mt-4 text-[clamp(2.5rem,9vw,6rem)] text-cream">
          {blogMeta.title.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-cream-dim">{blogMeta.intro}</p>
        </Reveal>

        {/* Tag filter */}
        <Reveal delay={0.15}>
          <div className="mt-9 flex flex-wrap gap-2">
            {allTags.map((t) => {
              const on = active === t
              return (
                <button
                  key={t}
                  onClick={() => setActive(t)}
                  className={`rounded-full border px-4 py-1.5 font-mono text-[12px] uppercase tracking-wider transition-colors duration-200 ${
                    on
                      ? 'border-ember/50 bg-ember/10 text-ember'
                      : 'border-cream/12 text-cream-mut hover:border-cream/30 hover:text-cream'
                  }`}
                >
                  {t}
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Featured */}
        {showFeatured && (
          <div className="mt-10">
            <Featured post={featured} />
          </div>
        )}

        {/* Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>

        {rest.length === 0 && (
          <p className="mt-10 font-mono text-sm text-cream-mut">Nothing here yet under this tag. More soon.</p>
        )}

        {/* CTA */}
        <Reveal>
          <div className="mt-20 flex flex-col items-start justify-between gap-6 rounded-3xl border border-cream/10 bg-base-850 p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <MonoLabel><span className="text-ember">✳</span> Have a project in mind?</MonoLabel>
              <p className="mt-3 max-w-[40ch] font-display text-2xl uppercase leading-tight text-cream sm:text-3xl">
                Let’s build something worth writing about.
              </p>
            </div>
            <Link to="/contact" className="u-btn-primary shrink-0">
              Start a project <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </article>
  )
}
