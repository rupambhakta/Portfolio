// Project registry. Each project keeps its own data file and its own page
// layout (see pages/work/) — the only shape they share is the card metadata
// used by the homepage: slug, title, kind, year, status, tint, cover,
// summary, tags, links.

import getparlix from './getparlix.js'
import seowyn from './seowyn.js'
import heatmapiq from './heatmapiq.js'

// Homepage order.
export const projects = [getparlix, seowyn, heatmapiq]

export const bySlug = (slug) => projects.find((p) => p.slug === slug)

export { getparlix, seowyn, heatmapiq }
