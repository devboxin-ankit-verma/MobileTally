'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Subtle heading reveal for Features section only */
export function useFeaturesHeadingGsap(reducedMotion: boolean) {
  const headingRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const heading = headingRef.current
    if (!heading) return

    const ctx = gsap.context(() => {
      const els = heading.querySelectorAll<HTMLElement>('[data-features-heading]')

      if (reducedMotion) {
        gsap.set(els, { opacity: 0 })
        ScrollTrigger.create({
          trigger: heading,
          start: 'top 85%',
          once: true,
          onEnter: () => gsap.to(els, { opacity: 1, duration: 0.4 }),
        })
        return
      }

      gsap.set(els, { opacity: 0, y: 24 })

      gsap.to(els, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }, heading)

    return () => ctx.revert()
  }, [reducedMotion])

  return headingRef
}
