'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/** Scroll to hash target after navigating to homepage (e.g. /about → /#pricing). */
export function HashScrollOnLoad() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== '/') return

    const scrollToHash = () => {
      const hash = window.location.hash
      if (!hash) return
      const id = decodeURIComponent(hash.slice(1))
      const target = document.getElementById(id)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    scrollToHash()
    const t = window.setTimeout(scrollToHash, 150)
    window.addEventListener('hashchange', scrollToHash)
    return () => {
      clearTimeout(t)
      window.removeEventListener('hashchange', scrollToHash)
    }
  }, [pathname])

  return null
}
