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
} as const

/** Safe attributes for external links */
export const externalLinkAttrs = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const
