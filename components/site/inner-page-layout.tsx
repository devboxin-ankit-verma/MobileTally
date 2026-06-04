'use client'



import Image from 'next/image'

import Link from 'next/link'

import { m, useReducedMotion } from 'framer-motion'

import { Section } from '@/components/layout/section'

import { siteConfig } from '@/lib/site-config'

import { siteLinks } from '@/lib/site-links'

import { defaultTransition, defaultViewport, staggerContainer, staggerItem } from '@/lib/motion'



type InnerPageLayoutProps = {

  badge: string

  title: string

  intro: string

  image: string

  imageAlt: string

  children: React.ReactNode

}



export function InnerPageLayout({

  badge,

  title,

  intro,

  image,

  imageAlt,

  children,

}: InnerPageLayoutProps) {

  const reduced = useReducedMotion()



  const hero = (

    <div className="site-inner-page__hero">

      <div className="site-inner-page__intro">

        <span className="site-badge mb-4 inline-flex">{badge}</span>

        <h1 className="site-h2 site-heading text-[var(--site-text)]">{title}</h1>

        <p className="site-body mt-5 text-[var(--site-text-muted)]">{intro}</p>

      </div>



      <div className="site-inner-page__media">

        <div className="site-inner-page__media-frame">

          <Image

            src={image}

            alt={imageAlt}

            width={1200}

            height={900}

            className="site-inner-page__media-img"

            sizes="(max-width: 1024px) 100vw, 560px"
            quality={80}
            priority

          />

        </div>

      </div>

    </div>

  )



  const body = <div className="site-inner-page__body">{children}</div>



  return (

    <main className="site-page-main overflow-x-hidden">

      <Section variant="muted">

        <div className="site-content site-inner-page">

          {reduced ? (

            <>

              {hero}

              {body}

            </>

          ) : (

            <m.div

              initial="hidden"

              whileInView="visible"

              viewport={defaultViewport}

              variants={staggerContainer}

            >

              <m.div variants={staggerItem}>{hero}</m.div>

              <m.div variants={staggerItem}>{body}</m.div>

            </m.div>

          )}



          <m.p

            className="site-inner-page__footer-note"

            {...(reduced

              ? {}

              : {

                  initial: { opacity: 0, y: 12 },

                  whileInView: { opacity: 1, y: 0 },

                  viewport: defaultViewport,

                  transition: defaultTransition,

                })}

          >

            Questions?{' '}

            <Link href={siteLinks.contact} className="font-medium text-[var(--site-brand)] hover:underline">

              Contact us

            </Link>{' '}

            or email{' '}

            <a href={siteLinks.mailto} className="font-medium text-[var(--site-brand)] hover:underline">

              {siteConfig.contact.email}

            </a>

            .

          </m.p>

        </div>

      </Section>

    </main>

  )

}

