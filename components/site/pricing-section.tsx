'use client'

import { Check } from 'lucide-react'
import { pricingPlans } from '@/lib/site-data'
import { externalLinkAttrs, pricingBuyUrl } from '@/lib/site-links'
import { Section } from '@/components/layout/section'
import { AnimatedSectionHeading } from '@/components/motion/animated-section-heading'
import { cn } from '@/lib/utils'

function formatInr(amount: number) {
  return amount.toLocaleString('en-IN')
}

type FeatureBox = { title: string; items: readonly string[] }

function planFeatureBoxes(plan: (typeof pricingPlans)[number]): FeatureBox[] {
  if ('featureBoxes' in plan && plan.featureBoxes?.length) {
    return [...plan.featureBoxes]
  }
  if ('featureBox' in plan && plan.featureBox) {
    return [plan.featureBox]
  }
  return []
}

export function PricingSection() {
  return (
    <Section id="pricing" variant="muted">
      <AnimatedSectionHeading
        badge="Plans"
        title="Pricing"
        subtitle="Annual plans built for growing businesses — save more with yearly billing."
      />

      <div className="site-content site-pricing">
        <div className="site-pricing__billing">
          <div className="site-pricing__billing-inner">
            <div className="site-pricing__promo" aria-hidden>
              <p className="site-pricing__save-label">Save upto 30%</p>
              <span className="site-pricing__save-arrow" />
            </div>

            <div className="site-pricing__toggle" role="group" aria-label="Billing cycle">
              <button
                type="button"
                className="site-pricing__toggle-btn site-pricing__toggle-btn--yearly site-pricing__toggle-btn--active"
                aria-pressed
                disabled
              >
                Yearly
                <span className="site-pricing__recommended">Recommended</span>
              </button>
            </div>
          </div>
        </div>

        <p className="site-pricing__subtitle">
          <span className="site-pricing__subtitle-label">One user per plan</span>
          <span className="site-pricing__subtitle-text">
            Choose the package that matches how you run Tally on mobile.
          </span>
        </p>

        <div className="site-pricing__grid">
          {pricingPlans.map((plan) => (
            <article
              key={plan.id}
              className={cn(
                'site-pricing__card',
                plan.highlighted && 'site-pricing__card--featured',
              )}
            >
              {plan.highlighted && (
                <span className="site-pricing__sparkle" aria-hidden>
                  ✦
                </span>
              )}

              <h3 className="site-pricing__plan-name">{plan.displayName}</h3>

              <div className="site-pricing__price-block">
                <p className="site-pricing__compare" aria-label={`Original price before discount`}>
                  <span className="site-pricing__currency">₹ </span>
                  {formatInr(plan.compareAtPrice)}
                </p>
                <p className="site-pricing__price">
                  <span className="site-pricing__currency">₹ </span>
                  {formatInr(plan.yearlyPrice)}
                  <span className="site-pricing__period">/ year / user</span>
                </p>
              </div>

              <ul className="site-pricing__features">
                {plan.features.map((feature) => (
                  <li key={feature} className="site-pricing__feature">
                    <Check className="site-pricing__check" aria-hidden strokeWidth={2.5} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {planFeatureBoxes(plan).map((box) => (
                <div key={box.title} className="site-pricing__feature-box">
                  <p className="site-pricing__feature-box-title">{box.title}</p>
                  <ul className="site-pricing__feature-box-list">
                    {box.items.map((item) => (
                      <li key={item} className="site-pricing__feature">
                        <Check className="site-pricing__check" aria-hidden strokeWidth={2.5} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <a
                href={pricingBuyUrl(plan.displayName)}
                {...externalLinkAttrs}
                className={cn(
                  'site-pricing__cta',
                  plan.ctaSolid && 'site-pricing__cta--solid',
                )}
                aria-label={`Buy ${plan.displayName} yearly plan via WhatsApp`}
              >
                BUY NOW
              </a>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
