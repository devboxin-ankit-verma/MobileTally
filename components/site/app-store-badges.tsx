'use client'

import { m, useReducedMotion } from 'framer-motion'
import { siteConfig } from '@/lib/site-config'
import { externalLinkAttrs } from '@/lib/site-links'
import { cn } from '@/lib/utils'

type AppStoreBadgesProps = {
  className?: string
  layout?: 'row' | 'column'
  /** Compact icon-only buttons (footer horizontal) */
  compact?: boolean
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.05L13.69 12L3.84 21.95C3.34 21.61 3 21.09 3 20.5ZM16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12ZM20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.53 12.92 20.16 13.19L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81ZM6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z"
      />
    </svg>
  )
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
      />
    </svg>
  )
}

/** Google Play & Mac App Store — full badges or compact icons */
export function AppStoreBadges({
  className,
  layout = 'column',
  compact = false,
}: AppStoreBadgesProps) {
  const reduced = useReducedMotion()
  const { apps } = siteConfig

  const items = [
    { href: apps.googlePlay, label: 'Download for Android on Google Play', Icon: PlayIcon },
    { href: apps.macAppStore, label: 'Download for Mac on the App Store', Icon: AppleIcon },
  ] as const

  const iconBtnClass =
    'flex size-10 items-center justify-center rounded-[var(--radius-btn)] border border-white/20 bg-white/10 text-white transition-all duration-300 hover:border-white/40 hover:bg-white/15 hover:text-white md:size-11'

  const badgeClass =
    'flex h-11 w-full min-w-[152px] items-center gap-2.5 rounded-[10px] border border-white/20 bg-black/90 px-3.5 text-white shadow-sm transition-colors hover:bg-white/10'

  return (
    <div
      className={cn(
        'flex gap-3',
        layout === 'column' && !compact ? 'flex-col' : 'flex-row flex-wrap items-center',
        className,
      )}
      role="list"
    >
      {items.map(({ href, label, Icon }) => {
        const link = (
          <a
            href={href}
            {...externalLinkAttrs}
            aria-label={label}
            className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--site-dark)]"
            role="listitem"
          >
            {compact ? (
              <span className={iconBtnClass}>
                <Icon className="size-5 md:size-6" />
              </span>
            ) : (
              <span className={badgeClass}>
                <Icon className="size-7 shrink-0" />
                <span className="flex flex-col leading-tight">
                  <span className="text-[9px] font-medium uppercase tracking-wide text-white/70">
                    {label.includes('Android') ? 'Get it on' : 'Download on the'}
                  </span>
                  <span className="text-[13px] font-semibold">
                    {label.includes('Android') ? 'Google Play' : 'Mac App Store'}
                  </span>
                </span>
              </span>
            )}
          </a>
        )

        if (reduced) return <div key={label}>{link}</div>

        return (
          <m.div
            key={label}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {link}
          </m.div>
        )
      })}
    </div>
  )
}
