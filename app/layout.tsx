import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SiteProviders } from '@/components/site/site-providers'
import { siteConfig } from '@/lib/site-config'
import './globals.css'

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  alternateName: siteConfig.developerbox.name,
  url: siteConfig.siteUrl,
  description: `${siteConfig.name} — Tally on Phone. ${siteConfig.tagline}`,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    telephone: '+91-9111333243',
    email: siteConfig.contact.email,
    availableLanguage: 'English',
  },
}

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: `${siteConfig.name} - Tally on Phone | Business Data on Mobile & Web`,
  description: `${siteConfig.name} by ${siteConfig.developerbox.name}. ${siteConfig.tagline}`,
  keywords: `Tally on Phone, Tally on Mobile, ${siteConfig.name}, Tally ERP 9, Business Data Management, Developerbox`,
  generator: 'v0.app',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.siteUrl,
    title: `${siteConfig.name} - Tally on Phone`,
    description: `${siteConfig.name} by ${siteConfig.developerbox.name}. Connect Tally with your phone for fast, secure business data sync.`,
    images: [
      {
        url: '/images/hero-tallybridge.png',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Dashboard`,
      },
    ],
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SiteProviders>{children}</SiteProviders>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
