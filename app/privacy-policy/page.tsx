import type { Metadata } from 'next'
import { SiteShell } from '@/components/layout/site-shell'
import { LegalPageLayout } from '@/components/site/legal-page-layout'
import { privacyPolicyPage } from '@/lib/site-pages'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `Privacy Policy for ${siteConfig.name} — how we collect, use, and protect your data.`,
}

export default function PrivacyPolicyPage() {
  return (
    <SiteShell>
      <LegalPageLayout
        badge={privacyPolicyPage.badge}
        title={privacyPolicyPage.title}
        intro={privacyPolicyPage.intro}
        image={privacyPolicyPage.image}
        imageAlt={privacyPolicyPage.imageAlt}
        sections={privacyPolicyPage.sections}
      />
    </SiteShell>
  )
}
