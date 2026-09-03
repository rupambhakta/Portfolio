import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

const container = document.getElementById('root')
const tree = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

// Prerendered routes ship real markup, so attach to it instead of throwing it
// away; anything the SPA rewrite serves is still an empty shell.
if (container.hasChildNodes()) ReactDOM.hydrateRoot(container, tree)
else ReactDOM.createRoot(container).render(tree)
