'use client'

import Image from 'next/image'
import { SiteAnchor } from '@/components/site/site-anchor'
import { m, useReducedMotion } from 'framer-motion'
import { siteConfig } from '@/lib/site-config'
import { siteLinks } from '@/lib/site-links'
import { cn } from '@/lib/utils'
import { navTransition } from '@/lib/motion'
import { BrandMark } from '@/components/site/brand-mark'
import { SocialLinks } from '@/components/site/social-links'
import { AppStoreBadges } from '@/components/site/app-store-badges'

type BrandLogoProps = {
  className?: string
  variant?: 'light' | 'dark'
  showSubtitle?: boolean
  /** Navbar: slight indent under logo image */
  subtitleClassName?: string
  /** Stair-step lines under logo (navbar) */
  subtitleLayout?: 'single' | 'stair'
  showSocial?: boolean
  showAppStores?: boolean
  animated?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const logoHeights = { sm: 36, md: 44, lg: 52 } as const

export function BrandLogo({
  className,
  variant = 'dark',
  showSubtitle = true,
  subtitleClassName,
  subtitleLayout = 'single',
  showSocial = false,
  showAppStores = false,
  animated = false,
  size = 'md',
}: BrandLogoProps) {
  const reduced = useReducedMotion()
  const isLight = variant === 'light'
  const wordmark = 'logo' in siteConfig && siteConfig.logo?.wordmark
  const subtitleParts = siteConfig.subtitle.split(/\s+/)
  const subtitleStair =
    subtitleLayout === 'stair' && subtitleParts.length > 1
      ? {
          line1: subtitleParts[0],
          line2: subtitleParts.slice(1).join(' '),
        }
      : null

  const content = (
    <div className={cn('inline-flex flex-col', className)}>
      <SiteAnchor
        href={siteLinks.home}
        className="site-brand-link site-navbar__brand group relative z-20 inline-flex w-full min-w-0 cursor-pointer flex-col items-start gap-0.5 no-underline"
        aria-label={`${siteConfig.name} — ${siteConfig.subtitle}, go to homepage`}
      >
        {wordmark ? (
          <>
            <Image
              src={siteConfig.logo.wordmark}
              alt={siteConfig.name}
              width={200}
              height={logoHeights[size]}
              className={cn(
                'h-auto w-auto max-w-[160px] object-contain object-left sm:max-w-[180px]',
                size === 'sm' && 'max-h-9',
                size === 'md' && 'max-h-11',
                size === 'lg' && 'max-h-14',
              )}
              sizes="(max-width: 640px) 140px, 180px"
              quality={85}
              priority
            />
            {showSubtitle &&
              (subtitleStair ? (
                <span
                  className={cn(
                    'site-navbar__subtitle-stairs',
                    isLight ? 'text-white/70' : 'text-[var(--site-text-muted)]',
                  )}
                >
                  <span className="site-navbar__subtitle-step site-navbar__subtitle-step--1">
                    {subtitleStair.line1}
                  </span>
                  <span className="site-navbar__subtitle-step site-navbar__subtitle-step--2">
                    {subtitleStair.line2}
                  </span>
                </span>
              ) : (
                <span
                  className={cn(
                    'site-navbar__subtitle max-w-[200px] text-[10px] leading-tight font-normal sm:text-[11px]',
                    isLight ? 'text-white/70' : 'text-[var(--site-text-muted)]',
                    subtitleClassName,
                  )}
                >
                  {siteConfig.subtitle}
                </span>
              ))}
          </>
        ) : (
          <span className="inline-flex items-center gap-2.5 md:gap-3">
            <BrandMark size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'} priority={size === 'lg'} />
            <span className="flex flex-col">
              <span
                className={cn(
                  'text-lg font-semibold leading-none tracking-tight md:text-xl',
                  isLight ? 'text-white' : 'text-[var(--site-text)]',
                )}
              >
                {siteConfig.name}
              </span>
              {showSubtitle && (
                <span
                  className={cn(
                    'mt-1 text-[10px] leading-snug md:text-xs',
                    isLight ? 'text-white/60' : 'text-[var(--site-text-muted)]',
                  )}
                >
                  {siteConfig.subtitle}
                </span>
              )}
            </span>
          </span>
        )}
      </SiteAnchor>
      {showSocial && <SocialLinks iconSize="sm" variant="footer" className="mt-4" />}
      {showAppStores && <AppStoreBadges className="mt-4" layout="column" />}
    </div>
  )

  if (!animated || reduced) return content

  return (
    <m.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={navTransition}>
      {content}
    </m.div>
  )
}
