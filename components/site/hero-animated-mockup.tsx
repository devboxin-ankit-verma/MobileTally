'use client'

import Image from 'next/image'
import { m } from 'framer-motion'
import { heroContent } from '@/lib/site-data'
import { smoothEase } from '@/lib/motion'

type HeroAnimatedMockupProps = {
  animated?: boolean
}

export function HeroAnimatedMockup({ animated = true }: HeroAnimatedMockupProps) {
  const image = (
    <Image
      src={heroContent.image.src}
      alt={heroContent.image.alt}
      width={heroContent.image.width}
      height={heroContent.image.height}
      quality={82}
      sizes="(max-width: 1024px) 92vw, (max-width: 1280px) 46vw, 560px"
      className="site-hero-mockup__img h-auto w-full object-cover object-center"
      priority
    />
  )

  if (!animated) {
    return (
      <div className="site-hero-mockup-wrap">
        <div className="site-hero-mockup-glow" aria-hidden />
        <div className="site-hero-mockup">
          {image}
        </div>
      </div>
    )
  }

  return (
    <div className="site-hero-mockup-wrap">
      <m.div
        className="site-hero-mockup-glow"
        aria-hidden
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.12, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <m.div
        className="site-hero-mockup-glow site-hero-mockup-glow--2"
        aria-hidden
        animate={{ opacity: [0.2, 0.55, 0.2], scale: [1.05, 1.18, 1.05] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      />

      <m.div
        className="site-hero-mockup"
        initial={{ opacity: 0, y: 56, scale: 0.88, rotateY: -14, rotateX: 6 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0, rotateX: 0 }}
        transition={{ duration: 1.1, delay: 0.3, ease: smoothEase }}
        style={{ transformPerspective: 1600 }}
      >
        <m.div
          className="site-hero-mockup__inner"
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <m.div
            className="site-hero-mockup__img-wrap"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          >
            <m.div
              className="site-hero-mockup__img-zoom"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            >
              {image}
            </m.div>
          </m.div>

          <m.div
            className="site-hero-mockup-shimmer"
            aria-hidden
            animate={{ x: ['-140%', '140%'] }}
            transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 3.5, ease: 'easeInOut' }}
          />

          <m.div
            className="site-hero-mockup-shimmer site-hero-mockup-shimmer--soft"
            aria-hidden
            animate={{ x: ['120%', '-120%'], opacity: [0, 0.6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut', delay: 1.2 }}
          />

          <m.div
            className="site-hero-mockup-vignette"
            aria-hidden
            animate={{ opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </m.div>
      </m.div>

      <m.span
        className="site-hero-float site-hero-float--sync"
        aria-hidden
        initial={{ opacity: 0, scale: 0.75, x: 12 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: [0, -8, 0] }}
        transition={{
          opacity: { delay: 0.9, duration: 0.5 },
          scale: { delay: 0.9, duration: 0.5, type: 'spring', stiffness: 220 },
          x: { delay: 0.9, duration: 0.5 },
          y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 },
        }}
      >
        Live Sync
      </m.span>

      <m.span
        className="site-hero-float site-hero-float--secure"
        aria-hidden
        initial={{ opacity: 0, scale: 0.75, x: -12 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.1, duration: 0.5 },
          scale: { delay: 1.1, duration: 0.5, type: 'spring', stiffness: 220 },
          x: { delay: 1.1, duration: 0.5 },
          y: { duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 },
        }}
      >
        Secure
      </m.span>
    </div>
  )
}
