import { useParams, Navigate } from 'react-router-dom'
import { projects } from '../data/projects/index.js'
import { PROJECT_PAGES } from './work/index.js'

// Resolves /work/:slug to that project's own page component and hands it the
// next project for the footer link. No shared case-study template — each
// project is laid out around its own story.
export default function ProjectPage() {
  const { slug } = useParams()
  const idx = projects.findIndex((p) => p.slug === slug)
  const Page = PROJECT_PAGES[slug]
  if (idx === -1 || !Page) return <Navigate to="/" replace />
  return <Page next={projects[(idx + 1) % projects.length]} />
}
