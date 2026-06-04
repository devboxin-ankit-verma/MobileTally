'use client'

import Image from 'next/image'
import { m, useReducedMotion } from 'framer-motion'
import { defaultViewport, fadeUp, defaultTransition } from '@/lib/motion'
import { cn } from '@/lib/utils'

type FeatureCardProps = {
  image: string
  alt: string
  title: string
  description: string
}

export function FeatureCard({ image, alt, title, description }: FeatureCardProps) {
  const reduced = useReducedMotion()

  const card = (
    <div
      className={cn(
        'site-card-premium flex h-full flex-col items-center p-8 text-center',
      )}
    >
      <div className="mb-6 overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={alt}
          width={150}
          height={150}
          className="mx-auto h-auto w-[150px] object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>
      <h4 className="mb-3 text-xl font-semibold text-[var(--site-text)]">{title}</h4>
      <p className="leading-relaxed text-[var(--site-text-muted)]">{description}</p>
    </div>
  )

  if (reduced) return card

  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={fadeUp}
      transition={defaultTransition}
      whileHover={{ y: -6, scale: 1.02 }}
      className="h-full"
    >
      {card}
    </m.div>
  )
}
