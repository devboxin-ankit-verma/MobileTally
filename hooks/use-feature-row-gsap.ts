'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type UseFeatureRowGsapOptions = {
  imageLeft: boolean
  reducedMotion: boolean
}

/**
 * Premium ScrollTrigger animations for a single feature row.
 * Cleanup via gsap.context — no duplicate triggers.
 */
export function useFeatureRowGsap({ imageLeft, reducedMotion }: UseFeatureRowGsapOptions) {
  const rowRef = useRef<HTMLDivElement>(null)
  const imageColRef = useRef<HTMLDivElement>(null)
  const imageCardRef = useRef<HTMLDivElement>(null)
  const imageParallaxRef = useRef<HTMLDivElement>(null)
  const imageFloatRef = useRef<HTMLDivElement>(null)
  const contentColRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const row = rowRef.current
    const imageCol = imageColRef.current
    const imageCard = imageCardRef.current
    const imageParallax = imageParallaxRef.current
    const imageFloat = imageFloatRef.current
    const contentCol = contentColRef.current

    if (!row || !imageCol || !imageCard || !imageParallax || !imageFloat || !contentCol) {
      return
    }

    const staggerEls = contentCol.querySelectorAll<HTMLElement>('[data-feature-stagger]')
    const contentFromX = imageLeft ? 50 : -50
    const imageFromX = imageLeft ? -50 : 50

    const ctx = gsap.context(() => {
      const setWillChange = (on: boolean) => {
        const targets = [imageCol, imageCard, imageParallax, imageFloat, contentCol]
        targets.forEach((el) => {
          if (on) el.style.willChange = 'transform, opacity'
          else el.style.willChange = ''
        })
      }

      const runReduced = () => {
        gsap.set([imageCol, contentCol, ...staggerEls], { opacity: 0 })
        ScrollTrigger.create({
          trigger: row,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to([imageCol, contentCol, ...staggerEls], {
              opacity: 1,
              duration: 0.45,
              ease: 'power2.out',
            })
          },
        })
      }

      if (reducedMotion) {
        runReduced()
        return
      }

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        runReduced()
      })

      mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.set(imageCol, {
          opacity: 0,
          scale: 0.94,
          y: 40,
          x: imageFromX * 0.5,
          rotation: 0.3,
        })
        gsap.set(imageCard, { scale: 0.97 })
        gsap.set(contentCol, { opacity: 0, x: contentFromX * 0.5 })
        gsap.set(staggerEls, { opacity: 0, y: 10 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 78%',
            end: 'bottom 32%',
            toggleActions: 'play none none reverse',
            onEnter: () => setWillChange(true),
            onLeaveBack: () => setWillChange(false),
            onLeave: () => setWillChange(false),
          },
        })

        tl.to(
          imageCol,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            x: 0,
            rotation: 0,
            duration: 0.9,
            ease: 'power3.out',
          },
          0,
        )
          .to(
            imageCard,
            { scale: 1, duration: 0.9, ease: 'power3.out' },
            0,
          )
          .to(
            contentCol,
            { opacity: 1, x: 0, duration: 0.75, ease: 'power3.out' },
            0.12,
          )
          .to(
            staggerEls,
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.08,
              ease: 'power3.out',
            },
            0.2,
          )

        gsap.to(imageFloat, {
          y: -6,
          duration: 4.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })

        gsap.to(imageParallax, {
          y: 16,
          ease: 'none',
          scrollTrigger: {
            trigger: row,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        })
      })

      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.set(imageCol, {
          opacity: 0,
          scale: 0.9,
          y: 80,
          x: imageFromX,
          rotation: 0.5,
        })
        gsap.set(imageCard, { scale: 0.96 })
        gsap.set(contentCol, { opacity: 0, x: contentFromX })
        gsap.set(staggerEls, { opacity: 0, y: 20 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 75%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse',
            onEnter: () => setWillChange(true),
            onLeaveBack: () => setWillChange(false),
            onLeave: () => setWillChange(false),
          },
        })

        tl.to(
          imageCol,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            x: 0,
            rotation: 0,
            duration: 1.2,
            ease: 'power3.out',
          },
          0,
        )
          .to(
            imageCard,
            { scale: 1, duration: 1.2, ease: 'power3.out' },
            0,
          )
          .to(
            contentCol,
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: 'power3.out',
            },
            0.15,
          )
          .to(
            staggerEls,
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.1,
              ease: 'power3.out',
            },
            0.25,
          )

        gsap.to(imageFloat, {
          y: -8,
          duration: 5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })

        gsap.to(imageParallax, {
          y: 32,
          ease: 'none',
          scrollTrigger: {
            trigger: row,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      })
    }, row)

    return () => ctx.revert()
  }, [imageLeft, reducedMotion])

  return {
    rowRef,
    imageColRef,
    imageCardRef,
    imageParallaxRef,
    imageFloatRef,
    contentColRef,
  }
}
