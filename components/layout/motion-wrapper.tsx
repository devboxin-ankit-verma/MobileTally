'use client'

import { m, type HTMLMotionProps, useReducedMotion } from 'framer-motion'
import {
  defaultTransition,
  defaultViewport,
  fadeIn,
  fadeUp,
  fadeUpLight,
  fadeLeft,
  fadeRight,
  scaleIn,
  blurReveal,
  staggerContainer,
  staggerItem,
} from '@/lib/motion'
import { cn } from '@/lib/utils'

type MotionVariant =
  | 'fadeUp'
  | 'fadeUpLight'
  | 'fadeIn'
  | 'scaleIn'
  | 'blurReveal'
  | 'fadeLeft'
  | 'fadeRight'
  | 'stagger'
  | 'staggerItem'

const variantsMap = {
  fadeUp,
  fadeUpLight,
  fadeIn,
  scaleIn,
  blurReveal,
  fadeLeft,
  fadeRight,
  stagger: staggerContainer,
  staggerItem,
}

type MotionWrapperProps = HTMLMotionProps<'div'> & {
  variant?: MotionVariant
  inView?: boolean
}

/** Scroll-triggered animation wrapper with reduced-motion support */
export function MotionWrapper({
  variant = 'fadeUp',
  inView = true,
  className,
  children,
  ...props
}: MotionWrapperProps) {
  const reduced = useReducedMotion()
  const variants = variantsMap[variant]

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <m.div
      className={cn(className)}
      initial="hidden"
      whileInView={inView ? 'visible' : undefined}
      animate={inView ? undefined : 'visible'}
      viewport={inView ? defaultViewport : undefined}
      variants={variants}
      transition={defaultTransition}
      {...props}
    >
      {children}
    </m.div>
  )
}

export { m, staggerContainer, staggerItem, fadeUp, defaultViewport }
