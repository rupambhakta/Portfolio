// Warm ambient glow behind everything. Grain is applied via the `.grain`
// class on the app root (see index.css).
export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute left-1/2 top-[-18rem] h-[42rem] w-[70rem] -translate-x-1/2 rounded-full blur-[40px]"
        style={{ background: 'radial-gradient(circle, rgba(255,90,31,0.16), transparent 60%)' }}
      />
      <div
        className="absolute right-[-10rem] top-[40rem] h-[34rem] w-[34rem] rounded-full blur-[30px]"
        style={{ background: 'radial-gradient(circle, rgba(255,122,69,0.08), transparent 62%)' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,rgba(255,90,31,0.05),transparent_60%)]" />
    </div>
  )
}
