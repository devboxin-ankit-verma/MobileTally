'use client'

import { m, useReducedMotion } from 'framer-motion'
import { SectionHeading } from '@/components/layout/section-heading'
import { blurReveal, defaultViewport } from '@/lib/motion'
import { cn } from '@/lib/utils'

type AnimatedSectionHeadingProps = React.ComponentProps<typeof SectionHeading>

/** Section heading with premium scroll reveal */
export function AnimatedSectionHeading({ className, ...props }: AnimatedSectionHeadingProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <SectionHeading className={className} {...props} />
  }

  return (
    <m.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={blurReveal}
    >
      <SectionHeading {...props} />
    </m.div>
  )
}
