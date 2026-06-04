'use client'

import { Header } from '@/components/site/header'
import { SiteFooter } from '@/components/site/footer'
import { WhatsAppFloat } from '@/components/site/whatsapp-float'
import { PageEnter } from '@/components/motion/page-enter'
import { HashScrollOnLoad } from '@/components/site/hash-scroll-on-load'

type SiteShellProps = {
  children: React.ReactNode
}

/** Shared chrome — header, footer, WhatsApp on every page */
export function SiteShell({ children }: SiteShellProps) {
  return (
    <PageEnter>
      <div className="site-app min-h-screen w-full overflow-x-hidden bg-transparent text-[var(--site-text)]">
        <HashScrollOnLoad />
        <Header />
        <WhatsAppFloat />
        {children}
        <SiteFooter />
      </div>
    </PageEnter>
  )
}
