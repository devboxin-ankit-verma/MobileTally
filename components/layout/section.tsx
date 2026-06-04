import { cn } from '@/lib/utils'

type SectionProps = React.ComponentProps<'section'> & {
  variant?: 'default' | 'muted' | 'dark'
  containerClassName?: string
  tight?: boolean
}

/** Premium vertical rhythm — 70 / 100 / 140px */
export function Section({
  className,
  containerClassName,
  variant = 'default',
  tight = false,
  children,
  ...props
}: SectionProps) {
  const variants = {
    default: 'bg-white/78 backdrop-blur-[3px]',
    muted: 'bg-[var(--site-muted)]/82 backdrop-blur-[3px]',
    dark: 'bg-[var(--site-dark)] text-white',
  }

  return (
    <section
      className={cn(
        'site-section',
        !tight && '',
        variants[variant],
        className,
      )}
      {...props}
    >
      <div className={cn('site-container', containerClassName)}>{children}</div>
    </section>
  )
}
