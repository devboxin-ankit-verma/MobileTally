'use client'

import { m, useReducedMotion } from 'framer-motion'
import { fadeUp, defaultTransition, springGentle } from '@/lib/motion'
import { BrandButton } from '@/components/site/brand-button'
import { SiteAnchor } from '@/components/site/site-anchor'
import { siteConfig } from '@/lib/site-config'
import { siteLinks } from '@/lib/site-links'
import { cn } from '@/lib/utils'

export function DemoCtaSection() {
  const reduced = useReducedMotion()

  const content = (
    <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
      <h2 className="site-h2 text-white">Ready to Manage Tally on Phone?</h2>
      <p className="site-body mx-auto mt-5 max-w-xl text-white/90">
        Book a Free Demo Today and see how {siteConfig.name} connects your business to Tally — anywhere.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <SiteAnchor href={siteLinks.contact} className="inline-flex">
          {reduced ? (
            <BrandButton type="button" variant="dark" size="lg" className="pointer-events-none">
              Book Demo
            </BrandButton>
          ) : (
            <m.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }} transition={springGentle}>
              <BrandButton type="button" variant="dark" size="lg" className="pointer-events-none">
                Book Demo
              </BrandButton>
            </m.div>
          )}
        </SiteAnchor>
        <SiteAnchor
          href={siteLinks.contact}
          className={cn(
            'inline-flex min-h-11 items-center justify-center gap-2.5 rounded-[var(--radius-btn)] px-9 py-4 text-base font-semibold',
            'bg-white text-[var(--site-brand-dark)] shadow-[var(--shadow-md)]',
            'transition-all duration-300 hover:bg-white hover:shadow-lg',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
          )}
        >
          {reduced ? (
            'Contact Sales'
          ) : (
            <m.span
              className="inline-flex"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              Contact Sales
            </m.span>
          )}
        </SiteAnchor>
      </div>
    </div>
  )

  return (
    <section className="site-demo-cta site-section" aria-label="Book a demo">
      <div className="site-demo-cta-mesh" aria-hidden />
      {!reduced && (
        <m.div
          className="absolute top-1/4 left-1/4 size-64 rounded-full bg-white/10 blur-3xl"
          animate={{ y: [0, 20, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        />
      )}
      <div className="site-container relative">
        {reduced ? (
          content
        ) : (
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={defaultTransition}
          >
            {content}
          </m.div>
        )}
      </div>
    </section>
  )
}
