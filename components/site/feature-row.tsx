'use client'

import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
import { BrandButton } from '@/components/site/brand-button'
import { SiteAnchor } from '@/components/site/site-anchor'
import { siteLinks } from '@/lib/site-links'
import { cn } from '@/lib/utils'
import { useFeatureRowGsap } from '@/hooks/use-feature-row-gsap'

type FeatureRowProps = {
  anchorId: string
  label: string
  title: string
  description: string
  benefits: readonly string[]
  cta: string
  image: string
  alt: string
  imageLeft: boolean
}

export function FeatureRow({
  anchorId,
  label,
  title,
  description,
  benefits,
  cta,
  image,
  alt,
  imageLeft,
}: FeatureRowProps) {
  const reducedMotion = useReducedMotion() ?? false

  const {
    rowRef,
    imageColRef,
    imageCardRef,
    imageParallaxRef,
    imageFloatRef,
    contentColRef,
  } = useFeatureRowGsap({ imageLeft, reducedMotion })

  const imageBlock = (
    <div
      ref={imageCardRef}
      className="site-card-luxury group relative overflow-hidden p-6 md:p-8"
      style={{ transformOrigin: 'center center' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(1,66,207,0.07)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div ref={imageParallaxRef} className="relative w-full">
        <div
          ref={imageFloatRef}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-[16px] transition-transform duration-500 group-hover:scale-[1.02]"
        >
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px"
            quality={75}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )

  const contentBlock = (
    <div
      ref={contentColRef}
      className="flex min-w-0 max-w-full flex-col justify-center gap-6 lg:gap-7"
    >
      <span
        data-feature-stagger
        className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--site-text-muted)]"
      >
        {label}
      </span>
      <h3
        data-feature-stagger
        className="site-h3 max-w-full break-words text-[var(--site-text)]"
      >
        {title}
      </h3>
      <p
        data-feature-stagger
        className="site-body max-w-full break-words text-[var(--site-text-muted)]"
      >
        {description}
      </p>
      <ul className="space-y-3">
        {benefits.map((b) => (
          <li key={b} data-feature-stagger className="flex items-start gap-3">
            <span className="mt-1.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--site-muted)]">
              <Check className="size-3 text-[var(--site-text)]" strokeWidth={2.5} aria-hidden />
            </span>
            <span className="site-body-sm min-w-0 break-words text-[var(--site-text-muted)]">
              {b}
            </span>
          </li>
        ))}
      </ul>
      <div data-feature-stagger className="pt-2">
        <SiteAnchor href={siteLinks.contact} className="inline-flex">
          <BrandButton type="button" className="pointer-events-none">
            {cta}
          </BrandButton>
        </SiteAnchor>
      </div>
    </div>
  )

  return (
    <div
      id={anchorId}
      ref={rowRef}
      className="feature-row scroll-mt-28 grid min-w-0 items-center gap-10 overflow-hidden lg:grid-cols-2 lg:gap-14 xl:gap-16"
    >
      <div
        ref={imageColRef}
        className={cn(
          'feature-row__image gpu-transform min-w-0',
          !imageLeft && 'lg:order-2',
        )}
        style={{ transformOrigin: 'center center' }}
      >
        {imageBlock}
      </div>
      <div
        className={cn('feature-row__content min-w-0 max-w-full', !imageLeft && 'lg:order-1')}
      >
        {contentBlock}
      </div>
    </div>
  )
}
