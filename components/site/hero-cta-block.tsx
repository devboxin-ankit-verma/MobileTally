'use client'

import Image from 'next/image'
import { m } from 'framer-motion'
import { Check, Download } from 'lucide-react'
import { heroContent } from '@/lib/site-data'
import { siteConfig } from '@/lib/site-config'
import { externalLinkAttrs } from '@/lib/site-links'
import { heroLoadItem, springGentle } from '@/lib/motion'

type HeroCtaBlockProps = {
  animated?: boolean
}

export function HeroCtaBlock({ animated = true }: HeroCtaBlockProps) {
  const { highlights, downloadConnector } = heroContent
  const Wrapper = animated ? m.div : 'div'
  const wrapperProps = animated ? { variants: heroLoadItem } : {}

  const downloadButton = (
    <a
      href={siteConfig.apps.googlePlay}
      {...externalLinkAttrs}
      className="site-hero-cta__connector group"
      aria-label={downloadConnector.label}
    >
      <span className="site-hero-cta__connector-label">{downloadConnector.label}</span>
      <Download className="site-hero-cta__connector-icon size-6 shrink-0" strokeWidth={2.25} aria-hidden />
    </a>
  )

  return (
    <Wrapper className="site-hero-cta" {...wrapperProps}>
      <ul className="site-hero-cta__highlights">
        {highlights.map((item) => (
          <li key={item} className="site-hero-cta__highlight-item">
            <span className="site-hero-cta__check-wrap" aria-hidden>
              <Check className="site-hero-cta__check size-3.5" strokeWidth={3} />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="site-hero-cta__cta-block">
        <div className="site-hero-cta__arrow-slot" aria-hidden>
          <Image
            src="/images/hero-cta-arrow.png"
            alt=""
            width={96}
            height={80}
            sizes="96px"
            quality={75}
            loading="lazy"
            className="site-hero-cta__arrow-img"
          />
        </div>

        <div className="site-hero-cta__button-col">
          {animated ? (
            <m.div
              className="site-hero-cta__download-inner"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={springGentle}
            >
              {downloadButton}
            </m.div>
          ) : (
            <div className="site-hero-cta__download-inner">{downloadButton}</div>
          )}
        </div>

        <div className="site-hero-cta__copy">
          <p className="site-hero-cta__subline">{downloadConnector.subline}</p>
          <p className="site-hero-cta__note">{downloadConnector.integrationNote}</p>
        </div>
      </div>
    </Wrapper>
  )
}
