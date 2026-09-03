// Server entry used only by scripts/prerender.mjs. Renders one route to an HTML
// string; StaticRouter stands in for BrowserRouter, which needs a real location.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

export function render(url) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}

// Re-exported so the prerender script gets markup and head data from one bundle.
export { headFor, allRoutes } from './lib/seo.js'
