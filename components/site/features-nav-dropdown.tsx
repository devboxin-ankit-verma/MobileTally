'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { featureNavItems } from '@/lib/site-data'
import { SiteAnchor } from '@/components/site/site-anchor'
import { cn } from '@/lib/utils'

type FeaturesNavDropdownProps = {
  className?: string
  onNavigate?: () => void
  variant?: 'desktop' | 'mobile'
}

export function FeaturesNavDropdown({
  className,
  onNavigate,
  variant = 'desktop',
}: FeaturesNavDropdownProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (variant !== 'desktop') return
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [variant])

  const linkClass =
    variant === 'mobile'
      ? 'site-nav-link block min-h-[44px] cursor-pointer rounded-[var(--radius-btn)] px-4 py-2.5 text-base text-[var(--site-text-muted)] hover:bg-[var(--site-muted)] hover:text-[var(--site-text)]'
      : 'block px-4 py-2.5 text-sm text-[var(--site-text-muted)] transition-colors hover:bg-[var(--site-muted)] hover:text-[var(--site-text)]'

  const close = () => {
    setOpen(false)
    onNavigate?.()
  }

  if (variant === 'mobile') {
    return (
      <div className={cn('border-b border-[var(--site-border)] pb-4', className)}>
        <p className="mb-2 px-4 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--site-brand)]">
          Features
        </p>
        <ul className="max-h-[50vh] space-y-0.5 overflow-y-auto">
          {featureNavItems.map((item) => (
            <li key={item.label}>
              <SiteAnchor href={item.href} className={linkClass} onClick={close}>
                {item.label}
              </SiteAnchor>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div ref={rootRef} className={cn('pointer-events-auto relative', className)}>
      <button
        type="button"
        className="site-nav-link inline-flex min-h-[40px] shrink-0 cursor-pointer items-center gap-1 whitespace-nowrap rounded-lg px-2.5 py-2 text-[14px] font-medium text-[var(--site-text-muted)] transition-colors hover:bg-[var(--site-accent-soft)] hover:text-[var(--site-brand)] lg:px-3 lg:text-[15px]"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        Features
        <ChevronDown
          className={cn('size-4 transition-transform duration-200', open && 'rotate-180')}
          aria-hidden
        />
      </button>
      {open && (
        <div
          className="absolute top-full left-0 z-50 mt-2 min-w-[240px] max-w-[min(90vw,320px)] rounded-[var(--radius-card)] border border-[var(--site-border)] bg-white py-2 shadow-[var(--shadow-lg)]"
          role="menu"
        >
          <ul className="max-h-[min(70vh,400px)] overflow-y-auto">
            {featureNavItems.map((item) => (
              <li key={item.label} role="none">
                <SiteAnchor href={item.href} className={linkClass} role="menuitem" onClick={close}>
                  {item.label}
                </SiteAnchor>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
