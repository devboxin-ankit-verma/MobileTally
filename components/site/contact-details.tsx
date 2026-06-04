import { Mail, MapPin, Clock } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { siteLinks, externalLinkAttrs } from '@/lib/site-links'
import { cn } from '@/lib/utils'

type ContactDetailsProps = {
  variant?: 'card' | 'footer'
  className?: string
}

/** Shared contact block — footer & contact section use identical data */
export function ContactDetails({ variant = 'card', className }: ContactDetailsProps) {
  const { contact } = siteConfig
  const isFooter = variant === 'footer'

  const iconClass = isFooter
    ? 'size-5 shrink-0 text-[var(--site-brand)]'
    : 'mt-0.5 size-5 shrink-0 text-[var(--site-brand)]'

  const labelClass = isFooter
    ? 'text-xs font-semibold uppercase tracking-wide text-white/55'
    : 'font-medium text-[var(--site-text)]'

  const textClass = isFooter
    ? 'text-[15px] leading-relaxed text-white/90 transition-colors hover:text-white'
    : 'font-medium leading-relaxed text-[var(--site-text)]'

  const itemGap = isFooter ? 'gap-4' : 'gap-4'

  return (
    <ul className={cn('space-y-5', className)}>
      <li className={cn('flex', itemGap)}>
        <Mail className={iconClass} aria-hidden />
        <div>
          <p className={labelClass}>Email</p>
          <a href={siteLinks.mailto} className={cn(textClass, 'break-all')}>
            {contact.email}
          </a>
        </div>
      </li>
      <li className={cn('flex', itemGap)}>
        <MapPin className={iconClass} aria-hidden />
        <div>
          <p className={labelClass}>Address</p>
          <a
            href={siteLinks.googleMaps}
            {...externalLinkAttrs}
            className={textClass}
          >
            {contact.addressLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </a>
        </div>
      </li>
      <li className={cn('flex', itemGap)}>
        <Clock className={iconClass} aria-hidden />
        <div>
          <p className={labelClass}>Business Hours</p>
          <p className={isFooter ? 'text-[15px] text-white/90' : 'text-[var(--site-text-muted)]'}>
            {contact.workingHours}
          </p>
        </div>
      </li>
    </ul>
  )
}
