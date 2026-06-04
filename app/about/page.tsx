import type { Metadata } from 'next'
import { SiteShell } from '@/components/layout/site-shell'
import { LegalPageLayout } from '@/components/site/legal-page-layout'
import { aboutPage } from '@/lib/site-pages'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: `About Us | ${siteConfig.name}`,
  description: `Learn about ${siteConfig.name} by ${siteConfig.developerbox.name} — Tally on Phone for modern businesses.`,
}

export default function AboutPage() {
  return (
    <SiteShell>
      <LegalPageLayout
        badge={aboutPage.badge}
        title={aboutPage.title}
        intro={aboutPage.intro}
        image={aboutPage.image}
        imageAlt={aboutPage.imageAlt}
        sections={aboutPage.sections}
      />
    </SiteShell>
  )
}
