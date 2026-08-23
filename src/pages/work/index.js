// Slug → page component. Each project gets its own bespoke layout; add a new
// project by dropping a data file in data/projects/ and a page here.
import GetParlixPage from './GetParlixPage.jsx'
import SeowynPage from './SeowynPage.jsx'
import HeatMapIQPage from './HeatMapIQPage.jsx'
import KDPAdsPage from './KDPAdsPage.jsx'

export const PROJECT_PAGES = {
  getparlix: GetParlixPage,
  seowyn: SeowynPage,
  heatmapiq: HeatMapIQPage,
  'kdp-ads': KDPAdsPage,
}
