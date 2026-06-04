'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { pricingPlans } from '@/lib/site-data'
import { Section } from '@/components/layout/section'
import { AnimatedSectionHeading } from '@/components/motion/animated-section-heading'
import { cn } from '@/lib/utils'

type BillingCycle = 'monthly' | 'yearly'

function formatInr(amount: number) {
  return amount.toLocaleString('en-IN')
}

function monthlyFromYearly(yearlyPrice: number) {
  return Math.round(yearlyPrice / 12)
}

export function PricingSection() {
  const [billing, setBilling] = useState<BillingCycle>('yearly')

  return (
    <Section id="pricing" variant="muted">
      <AnimatedSectionHeading
        badge="Plans"
        title="Pricing"
        subtitle="Simple plans for every business. Choose monthly or save with yearly billing."
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
                className={cn(
                  'site-pricing__toggle-btn',
                  billing === 'monthly' && 'site-pricing__toggle-btn--active',
                )}
                onClick={() => setBilling('monthly')}
                aria-pressed={billing === 'monthly'}
              >
                Monthly
              </button>
              <button
                type="button"
                className={cn(
                  'site-pricing__toggle-btn site-pricing__toggle-btn--yearly',
                  billing === 'yearly' && 'site-pricing__toggle-btn--active',
                )}
                onClick={() => setBilling('yearly')}
                aria-pressed={billing === 'yearly'}
              >
                Yearly
                <span className="site-pricing__recommended">Recommended</span>
              </button>
            </div>
          </div>
        </div>

        <p className="site-pricing__subtitle">Choose a plan for 1 user</p>

        <div className="site-pricing__grid">
          {pricingPlans.map((plan) => {
            const isYearly = billing === 'yearly'
            const displayPrice = isYearly
              ? monthlyFromYearly(plan.yearlyPrice)
              : plan.monthlyPrice

            return (
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
                  <p className="site-pricing__price">
                    <span className="site-pricing__currency">₹</span>
                    {formatInr(displayPrice)}
                    <span className="site-pricing__period">/ month</span>
                  </p>
                  {isYearly && (
                    <p className="site-pricing__billed">
                      ₹{formatInr(plan.yearlyPrice)} billed annually
                    </p>
                  )}
                </div>

                <ul className="site-pricing__features">
                  {plan.features.map((feature) => (
                    <li key={feature} className="site-pricing__feature">
                      <Check className="site-pricing__check" aria-hidden strokeWidth={2.5} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {'featureBox' in plan && plan.featureBox && (
                  <div className="site-pricing__feature-box">
                    <p className="site-pricing__feature-box-title">{plan.featureBox.title}</p>
                    <ul className="site-pricing__feature-box-list">
                      {plan.featureBox.items.map((item) => (
                        <li key={item} className="site-pricing__feature">
                          <Check className="site-pricing__check" aria-hidden strokeWidth={2.5} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  type="button"
                  className={cn(
                    'site-pricing__cta',
                    plan.ctaSolid && 'site-pricing__cta--solid',
                  )}
                >
                  BUY NOW
                </button>
              </article>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
