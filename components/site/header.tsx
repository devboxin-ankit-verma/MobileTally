'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { m, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { navLinks } from '@/lib/site-data'
import { siteConfig } from '@/lib/site-config'
import { siteLinks } from '@/lib/site-links'
import { navTransition, springGentle } from '@/lib/motion'
import { BrandLogo } from '@/components/site/brand-logo'
import { FeaturesNavDropdown } from '@/components/site/features-nav-dropdown'
import { NavLinkMotion } from '@/components/motion/nav-link-motion'
import { SiteAnchor } from '@/components/site/site-anchor'
import { BrandButton } from '@/components/site/brand-button'
import { cn } from '@/lib/utils'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeHash, setActiveHash] = useState('')
  const reduced = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileOpen])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const updateHash = () => setActiveHash(window.location.hash)
    updateHash()
    window.addEventListener('hashchange', updateHash)
    return () => window.removeEventListener('hashchange', updateHash)
  }, [])

  const closeMenu = () => setMobileOpen(false)

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const hash = href.includes('#') ? href.slice(href.indexOf('#')) : ''
    const isActive = hash ? activeHash === hash : false
    return (
      <SiteAnchor
        href={href}
        className={cn(
          'site-nav-link pointer-events-auto inline-flex min-h-[40px] shrink-0 cursor-pointer items-center whitespace-nowrap rounded-lg px-2.5 py-2 text-[14px] font-medium transition-colors duration-200 lg:px-3 lg:text-[15px]',
          isActive
            ? 'bg-[var(--site-accent-soft)] text-[var(--site-brand)]'
            : 'text-[var(--site-text-muted)] hover:bg-[var(--site-accent-soft)] hover:text-[var(--site-brand)]',
        )}
      >
        <NavLinkMotion isActive={isActive}>{label}</NavLinkMotion>
      </SiteAnchor>
    )
  }

  return (
    <m.header
      className={cn(
        'site-navbar fixed top-0 right-0 left-0 z-50',
        scrolled ? 'site-glass-scrolled' : 'site-glass',
      )}
      initial={reduced ? false : { opacity: 0, y: -16 }}
      animate={{
        opacity: 1,
        y: 0,
        backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'blur(20px) saturate(180%)',
      }}
      transition={navTransition}
    >
      <div className="site-container site-navbar__inner">
        <m.div
          className="site-navbar__logo flex min-w-0 items-center"
          animate={{ scale: scrolled ? 0.98 : 1 }}
          transition={springGentle}
        >
          <BrandLogo
            size="sm"
            animated={!reduced}
            showSubtitle
            className="site-navbar__logo-brand w-full min-w-0"
          />
        </m.div>

        <nav className="site-navbar__nav hidden md:flex" aria-label="Main navigation">
          <FeaturesNavDropdown />
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        <div className="site-navbar__actions">
          <div className="site-navbar__actions-desktop hidden items-center lg:flex">
            <a
              href={siteLinks.tel}
              className="site-navbar__phone site-nav-link hidden items-center gap-1.5 whitespace-nowrap text-sm text-[var(--site-text-muted)] transition-colors hover:text-[var(--site-text)] xl:inline-flex"
            >
              <Phone className="size-4 shrink-0" aria-hidden />
              <span>{siteConfig.contact.phoneDisplay}</span>
            </a>
            <SiteAnchor
              href={siteLinks.contact}
              className="site-nav-link inline-flex min-h-[40px] shrink-0 cursor-pointer items-center whitespace-nowrap rounded-[var(--radius-btn)] px-4 py-2 text-sm font-medium text-[var(--site-text)] transition-colors hover:bg-[var(--site-accent-soft)]"
            >
              Login
            </SiteAnchor>
            <SiteAnchor href={siteLinks.contact} className="inline-flex shrink-0 cursor-pointer">
              <BrandButton type="button" className="pointer-events-none !px-5 !py-2 !text-sm">
                Get Started
              </BrandButton>
            </SiteAnchor>
          </div>

          <button
            type="button"
            className="flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-btn)] border border-[var(--site-border)] bg-white/90 shadow-[var(--shadow-sm)] lg:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {mobileOpen && (
              <>
                <m.div
                  className="site-mobile-nav-overlay fixed inset-0 z-[200] bg-black/35 lg:hidden"
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={closeMenu}
                  aria-hidden
                />
                <m.nav
                  className="site-mobile-nav fixed top-0 right-0 z-[210] flex h-dvh w-[min(320px,90vw)] flex-col lg:hidden"
                  style={{ backgroundColor: '#ffffff' }}
                  initial={reduced ? false : { x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  aria-label="Mobile navigation"
                >
                  <div className="site-mobile-nav__header flex shrink-0 items-start justify-between gap-3 border-b border-[var(--site-border)] px-5 py-4">
                    <BrandLogo
                      size="sm"
                      showSubtitle
                      className="site-mobile-nav__logo min-w-0 flex-1"
                    />
                    <button
                      type="button"
                      className="site-mobile-nav__close flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-btn)] border border-[var(--site-border)] bg-white text-[var(--site-text)] shadow-[var(--shadow-sm)] transition-colors hover:bg-[var(--site-muted)]"
                      aria-label="Close menu"
                      onClick={closeMenu}
                    >
                      <X className="size-5" strokeWidth={2} aria-hidden />
                    </button>
                  </div>
                  <div className="site-mobile-nav__body flex min-h-0 flex-1 flex-col overflow-y-auto px-5 py-4">
                    <FeaturesNavDropdown variant="mobile" onNavigate={closeMenu} />
                    {navLinks.map((link, i) => (
                      <m.div
                        key={link.href}
                        initial={reduced ? false : { opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                      >
                        <SiteAnchor
                          href={link.href}
                          className="site-nav-link block min-h-[48px] cursor-pointer rounded-[var(--radius-btn)] px-4 py-3.5 text-lg font-medium text-[var(--site-text)] hover:bg-[var(--site-accent-soft)]"
                          onClick={closeMenu}
                        >
                          {link.label}
                        </SiteAnchor>
                      </m.div>
                    ))}
                    <div className="mt-auto flex flex-col gap-3 border-t border-[var(--site-border)] pt-6">
                      <a href={siteLinks.tel} className="text-sm text-[var(--site-text-muted)]">
                        {siteConfig.contact.phoneDisplay}
                      </a>
                      <SiteAnchor
                        href={siteLinks.contact}
                        onClick={closeMenu}
                        className="site-nav-link flex min-h-[48px] w-full cursor-pointer items-center justify-center rounded-[var(--radius-btn)] border border-[var(--site-border)] py-3.5 font-semibold"
                      >
                        Login
                      </SiteAnchor>
                      <SiteAnchor href={siteLinks.contact} onClick={closeMenu} className="block w-full cursor-pointer">
                        <BrandButton type="button" className="pointer-events-none w-full">
                          Get Started
                        </BrandButton>
                      </SiteAnchor>
                    </div>
                  </div>
                </m.nav>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </m.header>
  )
}
