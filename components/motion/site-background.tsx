'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

const Particles = dynamic(() => import('@/components/motion/particles'), { ssr: false })

/** Brand greens + white highlights — visible on light page background */
const brandParticleColors = ['#0142cf', '#2a5fd4', '#000e33', '#fefefe', '#6b9fff']

/** Full-viewport React Bits Particles (ogl) behind all pages */
export function SiteBackground() {
  const reduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    setMounted(true)
    const frame = requestAnimationFrame(() => setActive(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  if (!mounted || reduced) return null

  return (
    <div
      className={cn('site-background', active && 'site-background--ready')}
      aria-hidden
    >
      <div className="site-particles">
        <Particles
          particleColors={brandParticleColors}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover
          particleHoverFactor={1}
          alphaParticles={false}
          sizeRandomness={1}
          cameraDistance={20}
          disableRotation={false}
          pixelRatio={Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio : 1)}
        />
      </div>
    </div>
  )
}
