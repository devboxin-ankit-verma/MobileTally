'use client'

import { m, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

type BrandButtonProps = React.ComponentProps<'button'> & {
  variant?: 'primary' | 'outline' | 'dark'
  size?: 'default' | 'lg'
}

/** Premium CTA — 14px radius, glow on hover */
export function BrandButton({
  className,
  variant = 'primary',
  size = 'default',
  children,
  ...props
}: BrandButtonProps) {
  const reduced = useReducedMotion()

  const base = cn(
    'inline-flex min-h-11 cursor-pointer items-center justify-center font-semibold',
    'rounded-[var(--radius-btn)] transition-all duration-300 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-brand)] focus-visible:ring-offset-2',
    'active:scale-[0.98]',
  )

  const variants = {
    primary:
      'bg-[var(--site-brand)] text-white shadow-[var(--shadow-md)] hover:bg-[var(--site-brand-dark)] hover:shadow-[var(--shadow-glow)]',
    outline:
      'border border-[var(--site-border)] bg-white/80 text-[var(--site-text)] backdrop-blur-sm hover:border-[var(--site-brand)] hover:text-[var(--site-brand-dark)] hover:shadow-[var(--shadow-sm)]',
    dark:
      'bg-[var(--site-secondary)] text-white shadow-lg hover:bg-[var(--site-brand-dark)] hover:shadow-xl',
  }

  const sizes = {
    default: 'gap-2 px-7 py-3 text-[15px]',
    lg: 'gap-2.5 px-9 py-4 text-base',
  }

  const classes = cn(base, variants[variant], sizes[size], className)

  if (reduced) {
    return (
      <button className={classes} {...props}>
        {children}
      </button>
    )
  }

  return (
    <m.button
      className={classes}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </m.button>
  )
}
