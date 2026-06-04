import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  title: string
  subtitle?: string
  className?: string
  align?: 'center' | 'left'
  badge?: string
  /** When true, children get data-features-heading for Features-section GSAP only */
  staggerMarks?: boolean
}

export function SectionHeading({
  title,
  subtitle,
  className,
  align = 'center',
  badge,
  staggerMarks = false,
}: SectionHeadingProps) {
  const stagger = staggerMarks ? { 'data-features-heading': '' } : undefined

  return (
    <div
      className={cn(
        'mb-10 md:mb-14 lg:mb-16',
        align === 'center' && 'text-center',
        className,
      )}
    >
      {badge && (
        <span className="site-badge mb-5 inline-flex" {...stagger}>
          {badge}
        </span>
      )}
      <h2 className="site-h2 site-heading text-[var(--site-text)]" {...stagger}>
        {title}
      </h2>
      {subtitle && (
        <p
          {...stagger}
          className={cn(
            'site-subheading site-body mx-auto mt-5 max-w-2xl text-[var(--site-text-muted)]',
            align === 'left' && 'mx-0',
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
