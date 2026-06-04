'use client'

import { m, useReducedMotion, useScroll, useSpring } from 'framer-motion'

/** Top scroll progress indicator */
export function ScrollProgress() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  })

  if (reduced) return null

  return (
    <m.div
      className="site-scroll-progress fixed top-0 right-0 left-0 z-[60] h-[3px] origin-left bg-[var(--site-brand)]"
      style={{ scaleX }}
      aria-hidden
    />
  )
}
