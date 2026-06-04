'use client'

import { useState, useEffect, useCallback } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Star } from 'lucide-react'
import { testimonials } from '@/lib/site-data'
import { Section } from '@/components/layout/section'
import { AnimatedSectionHeading } from '@/components/motion/animated-section-heading'
import { cn } from '@/lib/utils'

const FEATURED_INTERVAL_MS = 6000

function AuthorAvatar({ name, size = 'md' }: { name: string; size?: 'md' | 'lg' }) {
  return (
    <div
      className={cn(
        'site-testimonial-avatar',
        size === 'lg' && 'site-testimonial-avatar--lg',
      )}
      aria-hidden
    >
      {name.charAt(0)}
    </div>
  )
}

function StarRating({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn('flex gap-0.5', className)} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            'size-4',
            i < rating ? 'fill-amber-400 text-amber-400' : 'fill-transparent text-[var(--site-border)]',
          )}
          aria-hidden
        />
      ))}
    </div>
  )
}

function MarqueeCard({
  quote,
  author,
  role,
  rating,
}: {
  quote: string
  author: string
  role: string
  rating: number
}) {
  return (
    <article className="site-testimonial-marquee__card">
      <div className="site-testimonial-marquee__head">
        <AuthorAvatar name={author} />
        <div className="site-testimonial-marquee__meta">
          <p className="site-testimonial-marquee__author">{author}</p>
          <p className="site-testimonial-marquee__role">{role}</p>
        </div>
      </div>
      <StarRating rating={rating} className="site-testimonial-marquee__stars" />
      <p className="site-testimonial-marquee__quote">{quote}</p>
    </article>
  )
}

function TestimonialMarquee() {
  const [paused, setPaused] = useState(false)
  const reduced = useReducedMotion()
  const items = [...testimonials, ...testimonials]

  const pause = useCallback(() => setPaused(true), [])
  const resume = useCallback(() => setPaused(false), [])

  if (reduced) {
    return (
      <div className="site-testimonial-marquee site-testimonial-marquee--static">
        <div className="site-testimonial-marquee__track site-testimonial-marquee__track--static">
          {testimonials.map((item) => (
            <MarqueeCard key={item.author} {...item} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      className="site-testimonial-marquee"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onPointerDown={pause}
      onPointerUp={resume}
      onPointerCancel={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
    >
      <div
        className={cn(
          'site-testimonial-marquee__track',
          paused && 'site-testimonial-marquee__track--paused',
        )}
        aria-live="off"
      >
        {items.map((item, i) => (
          <MarqueeCard key={`${item.author}-${i}`} {...item} />
        ))}
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  const [index, setIndex] = useState(0)
  const [featuredPaused, setFeaturedPaused] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || featuredPaused) return
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, FEATURED_INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [reduced, featuredPaused])

  return (
    <Section variant="muted">
      <AnimatedSectionHeading
        badge="Social proof"
        title="What Our Customers Say"
        subtitle="Trusted by business owners who run Tally every day."
      />

      <div className="site-content site-testimonials">
        <article
          className="site-testimonial-featured-box"
          onMouseEnter={() => setFeaturedPaused(true)}
          onMouseLeave={() => setFeaturedPaused(false)}
        >
          <div className="site-testimonial-featured-box__inner">
            <div className="site-testimonial-featured__viewport">
              {testimonials.map((item, i) => (
                <blockquote
                  key={item.author}
                  className={cn(
                    'site-testimonial-featured__panel',
                    i === index && 'site-testimonial-featured__panel--active',
                  )}
                  aria-hidden={i !== index}
                >
                  <AuthorAvatar name={item.author} size="lg" />
                  <p className="site-testimonial-featured__author">{item.author}</p>
                  <StarRating rating={item.rating} className="site-testimonial-featured__stars" />
                  <p className="site-testimonial-featured__quote">{item.quote}</p>
                </blockquote>
              ))}
            </div>

            <div className="site-testimonial-featured__dots" aria-hidden>
              {testimonials.map((item, i) => (
                <span
                  key={item.author}
                  className={cn(
                    'site-testimonial-featured__dot',
                    i === index && 'site-testimonial-featured__dot--active',
                  )}
                />
              ))}
            </div>
          </div>
        </article>

        <TestimonialMarquee />
      </div>
    </Section>
  )
}
