'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

type SiteAnchorProps = React.ComponentProps<'a'> & {
  href: string
}

/**
 * Internal links — home scroll-to-top, hash scroll on same page, cross-page hash navigation.
 */
export function SiteAnchor({ href, className, children, onClick, ...props }: SiteAnchorProps) {
  const pathname = usePathname()
  const isHome = href === '/' || href === ''
  const hashIndex = href.indexOf('#')
  const hasHash = hashIndex !== -1
  const hash = hasHash ? href.slice(hashIndex) : ''
  const path = hasHash ? href.slice(0, hashIndex) || '/' : href

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented) return

    if (isHome) {
      if (pathname === '/') {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
        window.history.replaceState(null, '', '/')
      }
      return
    }

    if (hasHash && path === '/' && pathname === '/') {
      e.preventDefault()
      const target = document.querySelector(hash)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        window.history.replaceState(null, '', href)
      }
    }
  }

  if (isHome || (path.startsWith('/') && !path.startsWith('http'))) {
    return (
      <Link
        href={href}
        className={cn('cursor-pointer', className)}
        onClick={handleClick}
        {...(props as Omit<React.ComponentProps<typeof Link>, 'href'>)}
      >
        {children}
      </Link>
    )
  }

  return (
    <a href={href} className={cn('cursor-pointer', className)} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}
