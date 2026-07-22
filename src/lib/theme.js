// Theme switching. Palettes live in index.css under :root[data-theme='…'].
// The initial theme is set by an inline script in index.html (before paint),
// so there is no flash of the wrong palette on load.

export const THEME_KEY = 'rb-theme'
export const DEFAULT_THEME = 'ember'

export const THEMES = [
  { id: 'ember', label: 'Ember', hint: 'Warm near-black — the original look' },
  { id: 'light', label: 'Light', hint: 'Paper white' },
  { id: 'dark', label: 'Dark', hint: 'True black' },
]

const IDS = THEMES.map((t) => t.id)

// Browser-chrome color per theme — matches --c-base-950.
const THEME_COLOR = { ember: '#131009', light: '#ffffff', dark: '#08080a' }

export const isTheme = (v) => IDS.includes(v)

export function readTheme() {
  if (typeof document === 'undefined') return DEFAULT_THEME
  const current = document.documentElement.dataset.theme
  if (isTheme(current)) return current
  try {
    const stored = localStorage.getItem(THEME_KEY)
    if (isTheme(stored)) return stored
  } catch {
    /* storage blocked — fall through to the default */
  }
  return DEFAULT_THEME
}

export function applyTheme(id) {
  const theme = isTheme(id) ? id : DEFAULT_THEME
  if (typeof document === 'undefined') return theme

  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme])
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {
    /* storage blocked — the theme still applies for this session */
  }
  return theme
}
