'use client'

import { m, useReducedMotion } from 'framer-motion'
import { whyTallyBridge } from '@/lib/site-data'
import { siteConfig } from '@/lib/site-config'
import { defaultViewport, staggerContainer, staggerItem, defaultTransition } from '@/lib/motion'
import { Section } from '@/components/layout/section'
import { AnimatedSectionHeading } from '@/components/motion/animated-section-heading'
import { MotionCard } from '@/components/motion/motion-card'
import { IconBadge } from '@/components/site/icon-badge'

export function WhyTallyBridgeSection() {
  const reduced = useReducedMotion()

  return (
    <Section>
      <AnimatedSectionHeading
        badge="Value"
        title={`Why ${siteConfig.name}`}
        subtitle="Built for modern businesses that need Tally on phone — with automation, compliance, and control."
      />
      <m.div
        className="site-content grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
        initial={reduced ? false : 'hidden'}
        whileInView="visible"
        viewport={defaultViewport}
        variants={staggerContainer}
        transition={defaultTransition}
      >
        {whyTallyBridge.map((item) => {
          const card = (
            <div className="site-card-glass flex h-full flex-col gap-4 p-6 lg:p-7">
              <IconBadge name={item.icon} />
              <h3 className="font-semibold tracking-tight text-[var(--site-text)]">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--site-text-muted)]">
                {item.description}
              </p>
            </div>
          )

          if (reduced) return <div key={item.title}>{card}</div>

          return (
            <m.div key={item.title} variants={staggerItem}>
              <MotionCard>{card}</MotionCard>
            </m.div>
          )
        })}
      </m.div>
    </Section>
  )
}
