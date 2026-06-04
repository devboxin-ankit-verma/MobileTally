'use client'

import { m, useReducedMotion } from 'framer-motion'
import { Facebook, Instagram } from 'lucide-react'
import { siteLinks, externalLinkAttrs } from '@/lib/site-links'
import { cn } from '@/lib/utils'

type SocialLinksProps = {
  className?: string
  iconSize?: 'sm' | 'md'
  variant?: 'default' | 'footer'
}

const items = [
  {
    href: siteLinks.facebook,
    label: 'Facebook',
    Icon: Facebook,
    hoverClass: 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]',
  },
  {
    href: siteLinks.instagram,
    label: 'Instagram',
    Icon: Instagram,
    hoverClass:
      'hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] hover:text-white hover:border-transparent',
  },
] as const

/** Facebook & Instagram — footer only */
export function SocialLinks({
  className,
  iconSize = 'md',
  variant = 'default',
}: SocialLinksProps) {
  const reduced = useReducedMotion()
  const sizeClass = iconSize === 'sm' ? 'size-9' : 'size-11'
  const iconClass = iconSize === 'sm' ? 'size-4' : 'size-5'
  const isFooter = variant === 'footer'

  return (
    <div className={cn('flex items-center gap-3', className)} role="list">
      {items.map(({ href, label, Icon, hoverClass }) => {
        const link = (
          <a
            href={href}
            {...externalLinkAttrs}
            aria-label={`${label} (opens in new tab)`}
            className={cn(
              'flex items-center justify-center rounded-[var(--radius-btn)] border transition-all duration-300',
              sizeClass,
              isFooter
                ? 'border-white/15 bg-white/5 text-white/70 hover:text-white'
                : 'border-[var(--site-border)] bg-white text-[var(--site-text-muted)] shadow-[var(--shadow-sm)]',
              hoverClass,
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-brand)] focus-visible:ring-offset-2',
            )}
          >
            <Icon className={iconClass} aria-hidden />
          </a>
        )

        if (reduced) {
          return (
            <span key={label} role="listitem">
              {link}
            </span>
          )
        }

        return (
          <m.span
            key={label}
            role="listitem"
            whileHover={{ scale: 1.06, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            {link}
          </m.span>
        )
      })}
    </div>
  )
}
