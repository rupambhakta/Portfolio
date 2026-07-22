// Warm ambient glow behind everything. Grain is applied via the `.grain`
// class on the app root (see index.css).
export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute left-1/2 top-[-18rem] h-[42rem] w-[70rem] -translate-x-1/2 rounded-full blur-[40px]"
        style={{ background: 'radial-gradient(circle, var(--glow-1), transparent 60%)' }}
      />
      <div
        className="absolute right-[-10rem] top-[40rem] h-[34rem] w-[34rem] rounded-full blur-[30px]"
        style={{ background: 'radial-gradient(circle, var(--glow-2), transparent 62%)' }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 120% 80% at 50% -10%, var(--glow-3), transparent 60%)' }}
      />
    </div>
  )
}
