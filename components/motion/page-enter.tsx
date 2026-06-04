'use client'

import { m, useReducedMotion } from 'framer-motion'
import { pageEnter } from '@/lib/motion'

type PageEnterProps = {
  children: React.ReactNode
}

/** Soft page background / content entry */
export function PageEnter({ children }: PageEnterProps) {
  const reduced = useReducedMotion()

  if (reduced) return <>{children}</>

  return (
    <m.div initial="hidden" animate="visible" variants={pageEnter}>
      {children}
    </m.div>
  )
}
