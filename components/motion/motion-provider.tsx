'use client'

import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion'

type MotionProviderProps = {
  children: React.ReactNode
}

/** Global motion config — respects reduced motion, GPU-friendly defaults */
export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig
        reducedMotion="user"
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  )
}
