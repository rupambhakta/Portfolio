// Shared motion tokens
export const EXPO = [0.16, 1, 0.3, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EXPO } },
}

export const stagger = (delay = 0, each = 0.08) => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren: delay } },
})

// For big display lines that clip up into view
export const lineReveal = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 0.85, ease: EXPO } },
}
