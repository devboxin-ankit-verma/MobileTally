import type { Metadata } from 'next'
import { SiteShell } from '@/components/layout/site-shell'
import { PartnerPage } from '@/components/site/partner-page'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: `Partner With Us | ${siteConfig.name}`,
  description: `Partner with ${siteConfig.name} — resellers, CA firms, and technology partners.`,
}

export default function PartnerWithUsRoute() {
  return (
    <SiteShell>
      <PartnerPage />
    </SiteShell>
  )
}
