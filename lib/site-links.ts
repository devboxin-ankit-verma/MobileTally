import { siteConfig } from '@/lib/site-config'

/** Canonical external & action URLs — single source for all links */
export const siteLinks = {
  home: '/',
  features: '/#features',
  pricing: '/#pricing',
  faq: '/#faq',
  contact: '/#contact',
  about: '/about',
  partnerWithUs: '/partner-with-us',
  terms: '/terms',
  privacyPolicy: '/privacy-policy',

  /** Phone: +91 91113 33243 */
  tel: `tel:+${siteConfig.contact.whatsapp}`,
  mailto: `mailto:${siteConfig.contact.email}`,

  /** WhatsApp click-to-chat */
  whatsapp: `https://wa.me/${siteConfig.contact.whatsapp}`,

  facebook: siteConfig.social.facebook,
  instagram: siteConfig.social.instagram,

  developerbox: siteConfig.developerbox.url,

  googleMaps: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.contact.address)}`,

  /** App download */
  googlePlay: siteConfig.apps.googlePlay,
  macAppStore: siteConfig.apps.macAppStore,
} as const

/** WhatsApp with optional pre-filled message */
export function whatsAppUrl(message: string) {
  return `${siteLinks.whatsapp}?text=${encodeURIComponent(message)}`
}

/** Pricing — BUY NOW opens WhatsApp with yearly plan details */
export function pricingBuyUrl(planName: string) {
  return whatsAppUrl(
    `Hi, I would like to purchase the ${siteConfig.name} ${planName} plan (yearly subscription). Please share payment details.`,
  )
}

/** Safe attributes for external links */
export const externalLinkAttrs = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const
