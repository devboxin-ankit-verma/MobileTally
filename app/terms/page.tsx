import type { Metadata } from 'next'
import { SiteShell } from '@/components/layout/site-shell'
import { LegalPageLayout } from '@/components/site/legal-page-layout'
import { termsPage } from '@/lib/site-pages'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: `Terms of Service | ${siteConfig.name}`,
  description: `Terms of Service for ${siteConfig.name} by ${siteConfig.developerbox.name}.`,
}

export default function TermsPage() {
  return (
    <SiteShell>
      <LegalPageLayout
        badge={termsPage.badge}
        title={termsPage.title}
        intro={termsPage.intro}
        image={termsPage.image}
        imageAlt={termsPage.imageAlt}
        sections={termsPage.sections}
      />
    </SiteShell>
  )
}
