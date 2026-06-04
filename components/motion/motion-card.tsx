'use client'

import { m, useReducedMotion } from 'framer-motion'
import { cardHover, springSnappy } from '@/lib/motion'
import { cn } from '@/lib/utils'

type MotionCardProps = {
  children: React.ReactNode
  className?: string
}

/** Premium card hover — lift, scale, shadow (GPU transforms) */
export function MotionCard({ children, className }: MotionCardProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <m.div
      className={cn('h-full', className)}
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.995 }}
      transition={springSnappy}
    >
      {children}
    </m.div>
  )
}
