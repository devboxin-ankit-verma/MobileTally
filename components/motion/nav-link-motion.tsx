'use client'

import { m, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

type NavLinkMotionProps = {
  children: React.ReactNode
  className?: string
  isActive?: boolean
}

/** Premium nav link — underline + lift on hover */
export function NavLinkMotion({ children, className, isActive }: NavLinkMotionProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <span className={className}>{children}</span>
  }

  return (
    <m.span
      className={cn('relative inline-flex flex-col items-center', className)}
      whileHover={{ y: -1 }}
      transition={{ duration: 0.2 }}
    >
      {children}
      <m.span
        className="absolute -bottom-0.5 left-0 h-[2px] w-full rounded-full bg-[var(--site-brand)]"
        initial={false}
        animate={{
          scaleX: isActive ? 1 : 0,
          opacity: isActive ? 1 : 0,
        }}
        whileHover={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: 0.5 }}
      />
    </m.span>
  )
}
