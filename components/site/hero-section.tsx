'use client'



import { m, useReducedMotion } from 'framer-motion'

import { heroContent } from '@/lib/site-data'

import {

  heroLoadContainer,

  heroLoadItem,

  scaleIn,

  smoothEase,

} from '@/lib/motion'

import { HeroCtaBlock } from '@/components/site/hero-cta-block'

import { HeroAnimatedMockup } from '@/components/site/hero-animated-mockup'

import SplitText from '@/components/motion/split-text'

import GradientText from '@/components/motion/gradient-text'

import { HeroParallax } from '@/components/motion/hero-parallax'



const heroGradientColors = ['#0142cf', '#2a5fd4', '#000e33', '#0142cf', '#3d7cff']



export function HeroSection() {

  const reduced = useReducedMotion()



  const badge = (

    <m.span

      className="site-badge w-fit"

      variants={heroLoadItem}

    >

      Tally on Phone · Mobile & Web

    </m.span>

  )



  const headline = (

    <h1

      className="site-h1 flex flex-wrap items-baseline gap-0 text-[var(--site-text)]"

      aria-label="Tally on Phone"

    >

      <SplitText

        text="Tally on "

        tag="span"

        className="inline text-inherit"

        splitType="chars"

        delay={60}

        duration={0.65}

        ease="power3.out"

        from={{ opacity: 0, y: 32 }}

        to={{ opacity: 1, y: 0 }}

        textAlign="left"

        immediate

      />

      <GradientText

        colors={heroGradientColors}

        animationSpeed={4}

        showBorder={false}

        staticGradient={!!reduced}

        className="align-baseline"

      >

        Phone

      </GradientText>

    </h1>

  )



  const description = (

    <m.p

      className="site-body mt-5 max-w-lg text-[var(--site-text-muted)]"

      variants={heroLoadItem}

    >

      {heroContent.description}

    </m.p>

  )



  const leftContent = (

    <div className="relative z-10 flex flex-col gap-7 overflow-visible lg:max-w-xl lg:gap-8">

      {badge}

      <div>

        {headline}

        {description}

      </div>

      <HeroCtaBlock />

    </div>

  )



  if (reduced) {

    return (

      <section className="site-hero pt-[88px] pb-14 md:pt-24 md:pb-16">

        <div className="site-container">

          <div className="site-content grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

            <div className="flex flex-col gap-7 overflow-visible lg:max-w-xl lg:gap-8">

              <span className="site-badge w-fit">Tally on Phone · Mobile & Web</span>

              <div>

                <h1 className="site-h1 text-[var(--site-text)]" aria-label="Tally on Phone">

                  Tally on{' '}

                  <GradientText

                    colors={heroGradientColors}

                    animationSpeed={4}

                    showBorder={false}

                    staticGradient

                    className="align-baseline"

                  >

                    Phone

                  </GradientText>

                </h1>

                <p className="site-body mt-5 max-w-lg text-[var(--site-text-muted)]">

                  {heroContent.description}

                </p>

              </div>

              <HeroCtaBlock animated={false} />

            </div>

            <HeroAnimatedMockup animated={false} />

          </div>

        </div>

      </section>

    )

  }



  return (

    <section className="site-hero pt-[88px] pb-14 md:pt-24 md:pb-16 lg:pb-0">

      <m.div

        className="site-hero-orb site-hero-orb-1"

        aria-hidden

        animate={{ y: [0, 24, 0], opacity: [0.4, 0.55, 0.4] }}

        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}

      />

      <m.div

        className="site-hero-orb site-hero-orb-2"

        aria-hidden

        animate={{ y: [0, -18, 0], opacity: [0.3, 0.45, 0.3] }}

        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}

      />

      <div className="site-container relative w-full lg:py-10">

        <m.div

          className="site-content grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20"

          initial="hidden"

          animate="visible"

          variants={heroLoadContainer}

        >

          <m.div variants={heroLoadItem}>{leftContent}</m.div>

          <m.div

            variants={scaleIn}

            transition={{ duration: 0.75, delay: 0.35, ease: smoothEase }}

            className="relative"

          >

            <HeroParallax className="w-full">

              <HeroAnimatedMockup />

            </HeroParallax>

            <m.div

              className="lg:hidden"

              animate={{ y: [0, -8, 0] }}

              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}

            >

              <HeroAnimatedMockup />

            </m.div>

          </m.div>

        </m.div>

      </div>

    </section>

  )

}


