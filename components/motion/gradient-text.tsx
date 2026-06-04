'use client'

import { useState, useCallback, useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { m, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion'
import './gradient-text.css'

type GradientDirection = 'horizontal' | 'vertical' | 'diagonal'

type GradientTextProps = {
  children: ReactNode
  className?: string
  colors?: string[]
  animationSpeed?: number
  direction?: GradientDirection
  pauseOnHover?: boolean
  yoyo?: boolean
  showBorder?: boolean
  /** Disable motion-driven gradient shift (e.g. prefers-reduced-motion) */
  staticGradient?: boolean
}

export default function GradientText({
  children,
  className = '',
  colors = ['#5227FF', '#FF9FFC', '#B497CF'],
  animationSpeed = 8,
  showBorder = false,
  direction = 'horizontal',
  pauseOnHover = false,
  yoyo = true,
  staticGradient = false,
}: GradientTextProps) {
  const [isPaused, setIsPaused] = useState(false)
  const progress = useMotionValue(0)
  const elapsedRef = useRef(0)
  const lastTimeRef = useRef<number | null>(null)

  const animationDuration = animationSpeed * 1000

  useAnimationFrame((time) => {
    if (staticGradient || isPaused) {
      lastTimeRef.current = null
      return
    }

    if (lastTimeRef.current === null) {
      lastTimeRef.current = time
      return
    }

    const deltaTime = time - lastTimeRef.current
    lastTimeRef.current = time
    elapsedRef.current += deltaTime

    if (yoyo) {
      const fullCycle = animationDuration * 2
      const cycleTime = elapsedRef.current % fullCycle

      if (cycleTime < animationDuration) {
        progress.set((cycleTime / animationDuration) * 100)
      } else {
        progress.set(100 - ((cycleTime - animationDuration) / animationDuration) * 100)
      }
    } else {
      progress.set((elapsedRef.current / animationDuration) * 100)
    }
  })

  useEffect(() => {
    elapsedRef.current = 0
    progress.set(0)
  }, [animationSpeed, progress, yoyo])

  const backgroundPosition = useTransform(progress, (p) => {
    if (direction === 'horizontal' || direction === 'diagonal') {
      return `${p}% 50%`
    }
    return `50% ${p}%`
  })

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true)
  }, [pauseOnHover])

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false)
  }, [pauseOnHover])

  const gradientAngle =
    direction === 'horizontal' ? 'to right' : direction === 'vertical' ? 'to bottom' : 'to bottom right'
  const gradientColors = [...colors, colors[0]].join(', ')

  const gradientStyle: CSSProperties = {
    backgroundImage: `linear-gradient(${gradientAngle}, ${gradientColors})`,
    backgroundSize:
      direction === 'horizontal' ? '300% 100%' : direction === 'vertical' ? '100% 300%' : '300% 300%',
    backgroundRepeat: 'repeat',
    ...(staticGradient ? { backgroundPosition: '0% 50%' } : {}),
  }

  const motionPositionStyle = staticGradient ? {} : { backgroundPosition }

  return (
    <m.div
      className={`animated-gradient-text animated-gradient-text--inline ${showBorder ? 'with-border' : ''} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showBorder && (
        <m.div className="gradient-overlay" style={{ ...gradientStyle, ...motionPositionStyle }} />
      )}
      <m.span className="text-content" style={{ ...gradientStyle, ...motionPositionStyle }}>
        {children}
      </m.span>
    </m.div>
  )
}
