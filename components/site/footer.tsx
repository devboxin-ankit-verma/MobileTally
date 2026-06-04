'use client'

import Image from 'next/image'
import { m, useReducedMotion } from 'framer-motion'
import { Mail, MapPin, Clock, Phone } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { siteLinks, externalLinkAttrs } from '@/lib/site-links'
import { footerGrowCopy, footerImportantLinks, footerOnPageLinks } from '@/lib/site-data'
import { SiteAnchor } from '@/components/site/site-anchor'
import { AppStoreBadges } from '@/components/site/app-store-badges'
import { SocialLinks } from '@/components/site/social-links'
import { fadeUp, defaultViewport, staggerContainer, staggerItem } from '@/lib/motion'

function FooterLinkList({ links }: { links: ReadonlyArray<{ href: string; label: string }> }) {
  return (
    <ul className="site-footer__links">
      {links.map((link) => (
        <li key={link.href}>
          <SiteAnchor href={link.href} className="site-footer__link">
            {link.label}
          </SiteAnchor>
        </li>
      ))}
    </ul>
  )
}

export function SiteFooter() {
  const { developerbox, contact, logo } = siteConfig
  const reduced = useReducedMotion()
  const footerLogo = 'footer' in logo && logo.footer ? logo.footer : logo.wordmark

  const grid = (
    <div className="site-footer__grid">
      <div className="site-footer__brand">
        <SiteAnchor href={siteLinks.home} className="site-footer__logo-link" aria-label={`${siteConfig.name} home`}>
          <span className="site-footer__logo-frame">
            <Image
              src={footerLogo}
              alt="MobileTally — Your Tally. In Your Pocket."
              width={240}
              height={88}
              sizes="(max-width: 768px) 180px, 200px"
              quality={75}
              loading="lazy"
              className="site-footer__logo-img h-auto w-full max-w-[200px] object-contain object-left"
            />
          </span>
        </SiteAnchor>

        <div className="site-footer__grow">
          <h2 className="site-footer__grow-headline">{footerGrowCopy.headline}</h2>
          <p className="site-footer__grow-subline">{footerGrowCopy.subline}</p>
          <p className="site-footer__grow-body">{footerGrowCopy.body}</p>
        </div>

        <AppStoreBadges layout="row" className="site-footer__stores" />
        <SocialLinks iconSize="sm" variant="footer" className="site-footer__social" />
      </div>

      <div className="site-footer__col">
        <h3 className="site-footer__col-title">On This Page</h3>
        <FooterLinkList links={footerOnPageLinks} />
      </div>

      <div className="site-footer__col">
        <h3 className="site-footer__col-title">Important</h3>
        <FooterLinkList links={footerImportantLinks} />
      </div>

      <div className="site-footer__col site-footer-contact">
        <h3 className="site-footer__col-title">Contact</h3>
        <ul className="site-footer__contact-list">
          <li className="site-footer__contact-item">
            <Phone className="site-footer__contact-icon" aria-hidden />
            <div>
              <p className="site-footer__contact-label">Phone</p>
              <a href={siteLinks.tel} className="site-footer__contact-text">
                {contact.phoneDisplay}
              </a>
            </div>
          </li>
          <li className="site-footer__contact-item">
            <Mail className="site-footer__contact-icon" aria-hidden />
            <div>
              <p className="site-footer__contact-label">Email</p>
              <a href={siteLinks.mailto} className="site-footer__contact-text break-all">
                {contact.email}
              </a>
            </div>
          </li>
          <li className="site-footer__contact-item">
            <MapPin className="site-footer__contact-icon" aria-hidden />
            <div>
              <p className="site-footer__contact-label">Address</p>
              <a href={siteLinks.googleMaps} {...externalLinkAttrs} className="site-footer__contact-text">
                {contact.addressLines.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </a>
            </div>
          </li>
          <li className="site-footer__contact-item">
            <Clock className="site-footer__contact-icon" aria-hidden />
            <div>
              <p className="site-footer__contact-label">Business Hours</p>
              <p className="site-footer__contact-text">{contact.workingHours}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )

  return (
    <footer className="site-footer-luxury text-white">
      <m.div
        className="site-container site-section-footer"
        initial={reduced ? false : 'hidden'}
        whileInView="visible"
        viewport={defaultViewport}
        variants={fadeUp}
      >
        {reduced ? (
          grid
        ) : (
          <m.div variants={staggerContainer}>
            <m.div variants={staggerItem}>{grid}</m.div>
          </m.div>
        )}
      </m.div>

      <div className="border-t border-white/[0.08]">
        <div className="site-container py-8 text-center">
          <p className="text-sm text-white/50">
            © {siteConfig.name}. All Rights Reserved. · Powered by{' '}
            <a
              href={siteLinks.developerbox}
              {...externalLinkAttrs}
              className="text-white/70 transition-colors hover:text-white"
            >
              {developerbox.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
