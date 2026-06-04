'use client'

import { m, useReducedMotion } from 'framer-motion'
import { smoothEase } from '@/lib/motion'
import { cn } from '@/lib/utils'

type MotionRevealWordsProps = {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  delay?: number
}

/** Word-by-word headline reveal */
export function MotionRevealWords({
  text,
  className,
  as: Tag = 'span',
  delay = 0,
}: MotionRevealWordsProps) {
  const reduced = useReducedMotion()
  const words = text.split(' ')

  if (reduced) {
    return <Tag className={className}>{text}</Tag>
  }

  return (
    <Tag className={cn('inline-flex flex-wrap gap-x-[0.28em] gap-y-1', className)}>
      {words.map((word, i) => (
        <m.span
          key={`${word}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.55,
            delay: delay + i * 0.08,
            ease: smoothEase,
          }}
        >
          {word}
        </m.span>
      ))}
    </Tag>
  )
}

type MotionFadeUpProps = {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function MotionFadeUp({ children, className, delay = 0 }: MotionFadeUpProps) {
  const reduced = useReducedMotion()

  if (reduced) return <div className={className}>{children}</div>

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: smoothEase }}
    >
      {children}
    </m.div>
  )
}
