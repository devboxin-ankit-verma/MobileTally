'use client'

import { useEffect } from 'react'

/** Marks document ready for smooth fade-in after refresh */
export function SmoothSiteLoad() {
  useEffect(() => {
    const markReady = () => {
      document.documentElement.classList.add('site-ready')
    }

    markReady()

    if (document.readyState !== 'complete') {
      window.addEventListener('load', markReady, { once: true })
      return () => window.removeEventListener('load', markReady)
    }
  }, [])

  return null
}
