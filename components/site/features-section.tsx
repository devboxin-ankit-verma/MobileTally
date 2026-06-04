'use client'

import { featureAnchorId, featureShowcase } from '@/lib/site-data'
import { Section } from '@/components/layout/section'
import { AnimatedSectionHeading } from '@/components/motion/animated-section-heading'
import { FeatureRow } from '@/components/site/feature-row'
export function FeaturesSection() {
  return (
    <Section id="features">
      <div className="site-features-panel">
        <div className="site-features-panel__heading">
        <AnimatedSectionHeading
          staggerMarks
          badge="Capabilities"
          title="Powerful Features"
          subtitle="Everything you need to manage Tally from your phone — designed for speed, compliance, and growth."
        />
        </div>
        <div className="site-features-panel__list flex flex-col site-feature-gap">
        {featureShowcase.map((feature, index) => (
          <FeatureRow
            key={feature.title}
            anchorId={featureAnchorId(feature.title)}
            label={feature.label}
            title={feature.title}
            description={feature.description}
            benefits={feature.benefits}
            cta={feature.cta}
            image={feature.image}
            alt={feature.alt}
            imageLeft={index % 2 === 0}
          />
        ))}
        </div>
      </div>
    </Section>
  )
}
