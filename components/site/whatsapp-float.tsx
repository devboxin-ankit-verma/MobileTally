'use client'

import { useEffect, useState } from 'react'
import { m, useReducedMotion } from 'framer-motion'
import { siteLinks, externalLinkAttrs } from '@/lib/site-links'
import { WhatsAppIcon } from '@/components/site/whatsapp-icon'

/** Fixed WhatsApp — official icon, subtle hover only */
export function WhatsAppFloat() {
  const reduced = useReducedMotion()
  const [entered, setEntered] = useState(reduced)

  useEffect(() => {
    if (reduced) return
    const t = setTimeout(() => setEntered(true), 600)
    return () => clearTimeout(t)
  }, [reduced])

  const button = (
    <a
      href={siteLinks.whatsapp}
      {...externalLinkAttrs}
      aria-label="Chat on WhatsApp"
      className="site-whatsapp-btn flex size-14 items-center justify-center rounded-full bg-white p-3 md:size-[58px]"
    >
      <WhatsAppIcon className="size-8 md:size-9" />
    </a>
  )

  if (reduced) {
    return <div className="site-whatsapp-float">{button}</div>
  }

  return (
    <m.div
      className="site-whatsapp-float"
      initial={{ opacity: 0, scale: 0.96, y: 6 }}
      animate={entered ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 6 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <m.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        {button}
      </m.div>
    </m.div>
  )
}
