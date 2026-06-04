'use client'

import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { useCallback } from 'react'
import { cn } from '@/lib/utils'

type HeroParallaxProps = {
  children: React.ReactNode
  className?: string
}

/** Subtle mouse parallax for hero visual — desktop only */
export function HeroParallax({ children, className }: HeroParallaxProps) {
  const reduced = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springX = useSpring(mx, { stiffness: 80, damping: 20 })
  const springY = useSpring(my, { stiffness: 80, damping: 20 })
  const rotateY = useTransform(springX, [-0.5, 0.5], [-3, 3])
  const rotateX = useTransform(springY, [-0.5, 0.5], [3, -3])
  const x = useTransform(springX, [-0.5, 0.5], [-12, 12])
  const y = useTransform(springY, [-0.5, 0.5], [-8, 8])

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      mx.set((e.clientX - rect.left) / rect.width - 0.5)
      my.set((e.clientY - rect.top) / rect.height - 0.5)
    },
    [mx, my],
  )

  const onLeave = useCallback(() => {
    mx.set(0)
    my.set(0)
  }, [mx, my])

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <m.div
      className={cn('hidden lg:block', className)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y, rotateX, rotateY, transformPerspective: 1200 }}
    >
      <m.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {children}
      </m.div>
    </m.div>
  )
}
