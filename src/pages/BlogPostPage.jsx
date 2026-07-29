// Blog detail (/blog/:slug). Built around a narrow, high-contrast reading
// column for comfortable long-form reading. Cover uses the post's theme tint;
// ember stays a light accent.
import { useParams, Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'
import { getPost, relatedPosts, formatDate, readingTime } from '../data/blog.js'
import { profile } from '../data/content.js'
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

function RelatedCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-cream/10 bg-base-850 transition-colors duration-300 hover:border-cream/25"
    >
      <div className="h-24" style={{ background: TINTS[post.tint] }} />
      <div className="flex flex-1 flex-col p-5">
        <TagLabel post={post} />
        <h4 className="mt-2.5 font-display text-lg uppercase leading-tight tracking-wide text-cream">{post.title}</h4>
        <div className="mt-4 flex items-center justify-between border-t border-cream/10 pt-3 font-mono text-[11px] uppercase tracking-wider text-cream-mut">
          <span>{readingTime(post.body)} min read</span>
          <ArrowUpRight className="h-4 w-4 transition-all duration-300 group-hover:text-ember group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  )
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = getPost(slug)
  if (!post) return <Navigate to="/blog" replace />
  const related = relatedPosts(slug, 2)

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
            <span className="grid h-10 w-10 place-items-center rounded-full border border-ember/40 bg-ember/10 font-display text-lg text-ember">
              {post.author.charAt(0)}
            </span>
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
          <div className="relative mt-8 h-[200px] overflow-hidden rounded-3xl border border-cream/10 sm:h-[300px]">
            <div className="absolute inset-0" style={{ background: TINTS[post.tint] }} />
            <div className="absolute inset-0 flex items-end justify-between p-7 sm:p-10">
              <span className="max-w-[60%] font-mono text-[11px] uppercase tracking-wider text-cream/70">{post.tag}</span>
              <span className="font-display text-[clamp(3rem,9vw,6rem)] leading-none text-cream/25">RB</span>
            </div>
          </div>
        </Reveal>

        {/* Body (narrow column) */}
        <div className="mx-auto mt-10 max-w-[720px]">
          <Markdown content={post.body} />

          {/* footer */}
          <div className="mt-14 border-t border-cream/10 pt-8">
            <div className="flex items-start gap-4 rounded-2xl border border-cream/10 bg-base-850 p-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ember/40 bg-ember/10 font-display text-xl text-ember">
                {post.author.charAt(0)}
              </span>
              <div>
                <p className="font-display text-lg uppercase tracking-wide text-cream">{post.author}</p>
                <p className="mt-1 text-sm leading-relaxed text-cream-mut">
                  Full-Stack Developer and AI Engineer. I build AI agents, automations, and full-stack apps that hand teams back their time.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-9 w-9 place-items-center rounded-xl border border-cream/12 bg-cream/[0.04] text-cream-dim transition-colors hover:border-ember/50 hover:text-cream">
                    <Github className="h-4 w-4" />
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-xl border border-cream/12 bg-cream/[0.04] text-cream-dim transition-colors hover:border-ember/50 hover:text-cream">
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a href={`mailto:${profile.email}`} aria-label="Email" className="grid h-9 w-9 place-items-center rounded-xl border border-cream/12 bg-cream/[0.04] text-cream-dim transition-colors hover:border-ember/50 hover:text-cream">
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Keep reading */}
        {related.length > 0 && (
          <div className="mx-auto mt-16 max-w-[760px]">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-cream-mut">Keep reading</span>
              <span className="h-px flex-1 bg-cream/10" />
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {related.map((p) => (
                <RelatedCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
