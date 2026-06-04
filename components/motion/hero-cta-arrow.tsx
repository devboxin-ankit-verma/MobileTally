'use client'

import { m, useReducedMotion } from 'framer-motion'
import { smoothEase } from '@/lib/motion'
import { cn } from '@/lib/utils'

/** Hand-drawn arc — left of button, tip points right (>) toward download CTA */
const ARROW_CURVE =
  'M 6 4 C 10 28, 28 50, 52 64 C 64 70, 72 68, 78 62'

const ARROW_HEAD_LONG = 'M 78 62 L 92 58'
const ARROW_HEAD_SHORT = 'M 78 62 L 84 72'

const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

type HeroCtaArrowProps = {
  className?: string
}

function ArrowPaths({ animateDraw }: { animateDraw: boolean }) {
  const pathTransition = animateDraw
    ? {
        pathLength: { duration: 1.25, delay: 0.6, ease: smoothEase },
        opacity: { duration: 0.2, delay: 0.55 },
      }
    : { pathLength: { duration: 0 }, opacity: { duration: 0 } }

  const headTransition = animateDraw
    ? {
        pathLength: { duration: 0.4, delay: 1.55, ease: smoothEase },
        opacity: { duration: 0.2, delay: 1.5 },
      }
    : { pathLength: { duration: 0 }, opacity: { duration: 0 } }

  const initial = animateDraw ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }

  return (
    <>
      <m.path
        d={ARROW_CURVE}
        {...strokeProps}
        initial={initial}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={pathTransition}
      />
      <m.path
        d={ARROW_HEAD_LONG}
        {...strokeProps}
        initial={initial}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={headTransition}
      />
      <m.path
        d={ARROW_HEAD_SHORT}
        {...strokeProps}
        initial={initial}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={headTransition}
      />
    </>
  )
}

/** SVG draw-in arrow on the left — tip points right at hero download button */
export function HeroCtaArrow({ className }: HeroCtaArrowProps) {
  const reduced = useReducedMotion()

  const rootClass = cn(
    'site-hero-cta-arrow pointer-events-none absolute right-[calc(100%+2px)] top-1/2 z-10 w-[72px] -translate-y-1/2 sm:right-[calc(100%+6px)] sm:w-[84px]',
    className,
  )

  const svg = (
    <svg viewBox="0 0 96 80" className="h-auto w-full overflow-visible" aria-hidden>
      <ArrowPaths animateDraw={!reduced} />
    </svg>
  )

  if (reduced) {
    return (
      <div className={rootClass} aria-hidden>
        {svg}
      </div>
    )
  }

  return (
    <m.div
      className={rootClass}
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, x: [0, 4, 0], y: [0, 2, 0] }}
      transition={{
        opacity: { duration: 0.35, delay: 0.5 },
        x: { duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 1.8 },
        y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1.8 },
      }}
    >
      {svg}
    </m.div>
  )
}
