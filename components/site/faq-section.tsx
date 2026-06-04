'use client'

import { useState } from 'react'
import { m, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { faqItems } from '@/lib/site-data'
import { siteConfig } from '@/lib/site-config'
import { Section } from '@/components/layout/section'
import { AnimatedSectionHeading } from '@/components/motion/animated-section-heading'
import { springGentle, staggerContainer, staggerItem } from '@/lib/motion'
import { cn } from '@/lib/utils'

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0)
  const reduced = useReducedMotion()

  /** One panel open at a time — default first; opening another closes the previous */
  const toggleFaq = (index: number) => {
    setOpenIndex(index)
  }

  return (
    <Section id="faq">
      <div className="site-content site-faq">
        <div className="site-faq__layout">
          <AnimatedSectionHeading
            className="site-faq__intro mb-0 md:mb-0 lg:mb-0"
            align="center"
            badge="Support"
            title="Frequently Asked Questions"
            subtitle={`Quick answers about ${siteConfig.name}, plans, and getting started.`}
          />

          <m.div
            className="site-faq__accordion"
            id="faqAccordion"
            initial={reduced ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
          >
            {faqItems.map((item, index) => {
              const open = openIndex === index

              return (
                <m.div
                  key={index}
                  variants={staggerItem}
                  className={cn('site-faq-item', open && 'site-faq-item--open')}
                >
                  <h3 className="site-faq-item__heading">
                    <button
                      type="button"
                      className="site-faq-item__trigger"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={open}
                      aria-controls={`faq-panel-${index}`}
                    >
                      <span className="site-faq-item__question">{item.q}</span>
                      <m.span
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={reduced ? { duration: 0 } : springGentle}
                        className="site-faq-item__chevron"
                        aria-hidden
                      >
                        <ChevronDown className="size-[18px]" />
                      </m.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {open && (
                      <m.div
                        id={`faq-panel-${index}`}
                        initial={reduced ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={reduced ? { duration: 0 } : springGentle}
                        className="site-faq-item__collapse"
                      >
                        <div className="site-faq-item__panel">
                          <p className="site-faq-item__answer">{item.a}</p>
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </m.div>
              )
            })}
          </m.div>
        </div>
      </div>
    </Section>
  )
}
