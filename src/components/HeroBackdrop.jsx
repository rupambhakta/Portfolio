// A faded image backdrop for hero sections. Drop it as the first child of a
// `relative` hero container; it sits behind the content (-z-10) with the left
// side scrimmed so headlines stay legible and the bottom faded into the page.
// Opacity is theme-aware (see .hero-bg-img in index.css) so a dark image never
// turns into grey fog on the light theme.
export default function HeroBackdrop({ src, height = 'h-[640px]', position = 'object-right' }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 top-0 -z-10 overflow-hidden ${height}`}>
      <img src={src} alt="" className={`hero-bg-img absolute inset-0 h-full w-full object-cover ${position}`} />
      {/* fade into the page at the bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-base-950/40 to-base-950" />
      {/* keep the left (where headlines sit) clean and high-contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-base-950/85 via-base-950/30 to-transparent" />
    </div>
  )
}
