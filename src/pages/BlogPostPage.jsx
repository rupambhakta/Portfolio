// Blog detail (/blog/:slug). Built around a narrow, high-contrast reading
// column for comfortable long-form reading. Cover uses the post's theme tint;
// ember stays a light accent.
import { useParams, Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, ArrowRight, Linkedin } from 'lucide-react'
import { getPost, adjacentPosts, formatDate, readingTime } from '../data/blog.js'
import { profile, aboutPage } from '../data/content.js'
import { EXPO } from '../lib/motion.js'
import { Reveal, TINTS } from '../components/ui.jsx'
import Markdown from '../components/blog/Markdown.jsx'

const DOT = { ember: '#FF6A3D', cyan: '#39C0D9', violet: '#9A8CFF', green: '#7BD88F' }

function TagLabel({ post, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-wider ${className}`} style={{ color: DOT[post.tint] }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: DOT[post.tint] }} />
      {post.tag}
    </span>
  )
}

function NavCard({ post, dir }) {
  const next = dir === 'next'
  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`group rounded-2xl border border-cream/10 bg-base-850 p-5 transition-colors duration-300 hover:border-cream/25 ${next ? 'text-right' : ''}`}
    >
      <span className={`flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-cream-mut ${next ? 'justify-end' : ''}`}>
        {next ? (
          <>Next <ArrowRight className="h-3.5 w-3.5" /></>
        ) : (
          <><ArrowLeft className="h-3.5 w-3.5" /> Previous</>
        )}
      </span>
      <p className="mt-2 font-display text-[1.05rem] uppercase leading-tight tracking-wide text-cream transition-colors group-hover:text-ember">
        {post.title}
      </p>
    </Link>
  )
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = getPost(slug)
  if (!post) return <Navigate to="/blog" replace />
  const { older, newer } = adjacentPosts(slug)

  return (
    <article className="relative z-10 pb-28 pt-28 sm:pt-32">
      <div className="u-wrap">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cream-mut transition-colors hover:text-cream"
        >
          <ArrowLeft className="h-4 w-4" /> The Journal
        </Link>

        {/* Header (narrow column) */}
        <div className="mx-auto mt-8 max-w-[760px]">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EXPO }}>
            <TagLabel post={post} />
          </motion.div>
          <motion.h1
            className="u-display mt-4 text-[clamp(2rem,6vw,3.75rem)] text-cream"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: EXPO }}
          >
            {post.title}
          </motion.h1>
          <motion.p
            className="mt-5 text-[1.2rem] leading-relaxed text-cream-dim"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: EXPO }}
          >
            {post.excerpt}
          </motion.p>

          <motion.div
            className="mt-7 flex items-center gap-3 border-y border-cream/10 py-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EXPO }}
          >
            <img
              src={aboutPage.portrait}
              alt={post.author}
              className="h-11 w-11 rounded-full border border-cream/15 object-cover"
            />
            <div className="font-mono text-[12px] uppercase tracking-wider text-cream-mut">
              <div className="text-cream">{post.author}</div>
              <div className="mt-0.5">
                {formatDate(post.date)} <span className="text-cream/20">/</span> {readingTime(post.body)} min read
              </div>
            </div>
          </motion.div>
        </div>

        {/* Cover band */}
        <Reveal>
          <div className="relative mt-8 h-[220px] overflow-hidden rounded-3xl border border-cream/10 sm:h-[320px]">
            {post.cover ? (
              <img src={post.cover} alt={post.coverAlt || ''} className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <div className="absolute inset-0" style={{ background: TINTS[post.tint] }} />
            )}
            {post.heroLines ? (
              <div className="absolute inset-y-0 left-0 flex w-[62%] flex-col justify-center bg-gradient-to-r from-base-950 via-base-950/80 to-transparent px-7 sm:px-10">
                <div className="font-display text-[clamp(1.2rem,3vw,2.2rem)] uppercase leading-[0.95] tracking-wide text-cream">
                  {post.heroLines.map((line) => <div key={line}>{line}</div>)}
                </div>
                <div className="mt-4 max-w-[24ch] font-mono text-[10px] uppercase tracking-[0.14em] text-cream-mut sm:text-[11px]">
                  {post.heroSubline}
                </div>
              </div>
            ) : null}
            <div className="absolute inset-0 flex items-end p-7 sm:p-10">
              <span className="rounded-full border border-cream/15 bg-base-950/40 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-cream/80 backdrop-blur-sm">
                {post.tag}
              </span>
            </div>
          </div>
        </Reveal>

        {/* Body (narrow column) */}
        <div className="mx-auto mt-10 max-w-[720px]">
          <Markdown content={post.body} />

          {/* Author */}
          <div className="mt-14 border-t border-cream/10 pt-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
              {/* avatar with ring + glow */}
              <div className="relative shrink-0">
                <div aria-hidden="true" className="absolute -inset-2 rounded-full opacity-60 blur-lg" style={{ background: 'radial-gradient(circle, rgba(236,231,221,0.16), transparent 70%)' }} />
                <div className="relative rounded-full p-[2px]" style={{ background: 'linear-gradient(135deg, rgba(236,231,221,0.55), rgba(236,231,221,0.12))' }}>
                  <img src={aboutPage.portrait} alt={post.author} className="h-20 w-20 rounded-full border-2 border-base-950 object-cover" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="font-display text-2xl uppercase tracking-wide text-cream">{post.author}</h3>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="grid h-6 w-6 place-items-center rounded-md bg-[#0A66C2] text-white transition-colors hover:bg-[#0955a3]"
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                  </a>
                </div>
                <p className="mt-1 font-mono text-[12px] uppercase tracking-wider text-cream-mut">{aboutPage.role}</p>
                <p className="mt-3 max-w-[60ch] text-[0.975rem] leading-relaxed text-cream-mut">
                  Full-stack developer and AI engineer from Kolkata, India. I build AI agents, automations, and full-stack products that hand growing teams back the hours they lose to busywork. Here I write about what worked, what broke, and what I would do differently.
                </p>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 font-mono text-[13px] font-medium text-[#4a9fe8] transition-colors hover:text-[#6fb4ef]"
                >
                  Connect on LinkedIn
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Previous / Next */}
        {(older || newer) && (
          <div className="mx-auto mt-14 max-w-[760px]">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-cream-mut">More writing</span>
              <span className="h-px flex-1 bg-cream/10" />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {older ? <NavCard post={older} dir="prev" /> : <span className="hidden sm:block" />}
              {newer ? <NavCard post={newer} dir="next" /> : <span className="hidden sm:block" />}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
