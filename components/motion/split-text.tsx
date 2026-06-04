'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

type SplitTextProps = {
  text: string
  className?: string
  delay?: number
  duration?: number
  ease?: string
  splitType?: 'chars' | 'words' | 'lines' | 'words, chars'
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  threshold?: number
  rootMargin?: string
  textAlign?: React.CSSProperties['textAlign']
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  onLetterAnimationComplete?: () => void
  /** Animate on mount (hero) instead of waiting for scroll only */
  immediate?: boolean
}

type SplitInstance = {
  revert: () => void
  targets: Element[]
}

function buildSplit(
  el: HTMLElement,
  text: string,
  splitType: string,
): Element[] {
  el.textContent = ''
  el.setAttribute('aria-label', text)

  const targets: Element[] = []

  const addChar = (char: string, parent: HTMLElement) => {
    const span = document.createElement('span')
    span.className = 'split-char'
    span.style.display = 'inline-block'
    span.setAttribute('aria-hidden', 'true')
    span.textContent = char
    parent.appendChild(span)
    targets.push(span)
    return span
  }

  if (splitType.includes('lines')) {
    const lines = text.split('\n')
    lines.forEach((line, li) => {
      const lineSpan = document.createElement('span')
      lineSpan.className = 'split-line block'
      lineSpan.setAttribute('aria-hidden', 'true')
      el.appendChild(lineSpan)
      if (splitType.includes('chars')) {
        line.split('').forEach((c) => addChar(c, lineSpan))
      } else {
        lineSpan.textContent = line
        targets.push(lineSpan)
      }
      if (li < lines.length - 1) el.appendChild(document.createElement('br'))
    })
    return targets
  }

  const words = text.split(' ')
  words.forEach((word, wi) => {
    const wordSpan = document.createElement('span')
    wordSpan.className = 'split-word'
    wordSpan.style.display = 'inline-block'
    wordSpan.style.whiteSpace = 'pre'
    wordSpan.setAttribute('aria-hidden', 'true')
    el.appendChild(wordSpan)

    if (splitType.includes('chars')) {
      [...word].forEach((c) => addChar(c, wordSpan))
    } else {
      wordSpan.textContent = word
      targets.push(wordSpan)
    }

    if (wi < words.length - 1) {
      const space = document.createElement('span')
      space.className = 'split-char'
      space.style.display = 'inline-block'
      space.textContent = '\u00A0'
      space.setAttribute('aria-hidden', 'true')
      el.appendChild(space)
      targets.push(space)
    }
  })

  return targets
}

/**
 * React Bits–style SplitText (manual split + GSAP).
 * Uses free GSAP — no Club SplitText plugin required.
 */
export default function SplitText({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete,
  immediate = false,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null)
  const animationCompletedRef = useRef(false)
  const onCompleteRef = useRef(onLetterAnimationComplete)
  const splitInstanceRef = useRef<SplitInstance | null>(null)
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete
  }, [onLetterAnimationComplete])

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true)
    } else {
      document.fonts.ready.then(() => setFontsLoaded(true))
    }
  }, [])

  useGSAP(
    () => {
      const el = ref.current
      if (!el || !text || !fontsLoaded) return
      if (animationCompletedRef.current) return

      if (splitInstanceRef.current) {
        try {
          splitInstanceRef.current.revert()
        } catch {
          /* noop */
        }
        splitInstanceRef.current = null
      }

      const targets = buildSplit(el, text, splitType)
      splitInstanceRef.current = {
        targets,
        revert: () => {
          el.textContent = text
          el.removeAttribute('aria-label')
        },
      }

      const startPct = (1 - threshold) * 100
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin)
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px'
      const sign =
        marginValue === 0
          ? ''
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`
      const start = `top ${startPct}%${sign}`

      const tweenConfig: gsap.TweenVars = {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        onComplete: () => {
          animationCompletedRef.current = true
          onCompleteRef.current?.()
        },
        willChange: 'transform, opacity',
        force3D: true,
      }

      if (immediate) {
        gsap.fromTo(targets, { ...from }, tweenConfig)
      } else {
        gsap.fromTo(targets, { ...from }, {
          ...tweenConfig,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
            fastScrollEnd: true,
            anticipatePin: 0.4,
          },
        })
      }

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === el) st.kill()
        })
        gsap.killTweensOf(targets)
        try {
          splitInstanceRef.current?.revert()
        } catch {
          /* noop */
        }
        splitInstanceRef.current = null
      }
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
        immediate,
      ],
      scope: ref,
    },
  )

  const Tag = tag
  const style: React.CSSProperties = {
    textAlign,
    overflow: 'hidden',
    display: 'inline-block',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    willChange: 'transform, opacity',
  }

  return (
    <Tag ref={ref as never} style={style} className={`split-parent ${className}`}>
      {text}
    </Tag>
  )
}
