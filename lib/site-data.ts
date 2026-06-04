import { siteConfig } from '@/lib/site-config'

/** Center nav — Features uses dropdown in header */
export const navLinks = [
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/about', label: 'About' },
  { href: '/partner-with-us', label: 'Partner With Us' },
  { href: '/#contact', label: 'Contact' },
] as const

/** Slug for feature row anchors (must match FeatureRow id) */
export function featureAnchorId(title: string): string {
  return `feature-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')}`
}

/** Footer — On This Page column */
export const footerOnPageLinks = [
  { href: '/about', label: 'About' },
  { href: '/#features', label: 'Features' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/terms', label: 'Terms & Conditions' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
] as const

/** Footer — Important column */
export const footerImportantLinks = [
  { href: '/partner-with-us', label: 'Partner With Us' },
  { href: '/#features', label: 'Features' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#contact', label: 'Contact' },
  { href: '/terms', label: 'Terms' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
] as const

/** Footer — grow business block (left column) */
export const footerGrowCopy = {
  headline: 'Grow Your Business',
  subline: 'Experience Financial Data on Mobile',
  body: 'Business made simpler for Business users.',
} as const

/** @deprecated Use footerOnPageLinks */
export const footerAboutLinks = footerOnPageLinks

/** @deprecated Use footerImportantLinks */
export const footerPartnerLinks = footerImportantLinks

/** @deprecated Use footerImportantLinks */
export const footerQuickLinks = footerImportantLinks

/** Marketing page content — preserved from original page.tsx */
export const heroContent = {
  title: 'Tally on Phone',
  titleHighlight: 'on Phone',
  description:
    'Access your business data seamlessly with MobileTally. Connect Tally and experience fast data sync on iOS and Android. Enjoy a fast and secure experience.',
  primaryCta: 'Get Started',
  secondaryCta: 'Book Free Demo',
  demoCta: 'Download For Free',
  androidCta: 'Download for Android',
  macCta: 'Download for Mac',
  /** Hero CTA block (screenshot layout) */
  highlights: [
    'View Data Anywhere',
    'Data Backup',
    'eWay Bills & eInvoices',
    'Payment Reminder',
  ] as const,
  downloadConnector: {
    label: 'DOWNLOAD CONNECTOR',
    subline: 'Get Started To View Your Business Data',
    integrationNote: 'Integrated with TallyPrime and Tally ERP9 *',
  },
  image: {
    src: '/images/hero-tallybridge.png',
    alt: 'MobileTally — premium business dashboard on smartphone and laptop with secure Tally sync',
    width: 1400,
    height: 933,
  },
  trustIndicators: [
    'Trusted by Businesses',
    'Secure Data',
    'GST Ready',
    'Cloud Backup',
    'WhatsApp Integration',
  ],
  platforms: ['Android', 'iOS', 'Web', 'Desktop'],
} as const

export const trustBarItems = [
  'Trusted by Businesses',
  'Secure Data',
  'GST Ready',
  'Cloud Backup',
  'WhatsApp Integration',
] as const

/** Alternating feature showcase — content preserved from original features */
export const featureShowcase = [
  {
    label: 'Payment Recovery',
    title: 'Send Payment Reminder',
    description:
      'Automate payment reminders via SMS and email to prompt timely payments and improve cash flow.',
    benefits: [
      'SMS & email payment reminders',
      'Recover dues faster',
      'Improve cash flow',
      'Works with Tally data',
    ],
    cta: 'Get Started',
    image: '/images/feature-payment-reminder.png',
    alt: 'Send payment reminders via SMS and email from MobileTally mobile',
  },
  {
    label: 'GST Compliance',
    title: 'Generate e-Way Bills & Invoices',
    description:
      'Easily generate e-Way bills and invoices on the go with our streamlined mobile interface.',
    benefits: [
      'Create e-Way bills on the go',
      'GST-ready invoices',
      'Share on WhatsApp',
      'Mobile-first workflow',
    ],
    cta: 'Get Started',
    image: '/images/feature-eway-gst.png',
    alt: 'Generate GST e-Way bills and invoices on mobile with MobileTally',
  },
  {
    label: 'Data Security',
    title: 'Data Backup and Restore',
    description:
      'Secure cloud backup for your financial data with easy restore capabilities.',
    benefits: [
      'Secure cloud backup',
      'One-tap restore',
      'Protect financial data',
      'Peace of mind',
    ],
    cta: 'Get Started',
    image: '/images/feature-data-backup.png',
    alt: 'Secure cloud backup and restore for Tally financial data',
  },
  {
    label: 'Transactions',
    title: 'Create Transactions',
    description:
      'Quickly create quotations, sales, receipts, payments, and purchase orders.',
    benefits: [
      'Quotations & sales orders',
      'Receipts & payments',
      'Purchase orders',
      'Fast mobile entry',
    ],
    cta: 'Get Started',
    image: '/images/feature-create-entries.png',
    alt: 'Create quotations, sales, receipts, and purchase orders on the go',
  },
  {
    label: 'Customer Insights',
    title: 'Track Inactive Customers',
    description:
      'Identify and manage inactive customers with detailed analytics and reports.',
    benefits: [
      'Inactive customer reports',
      'Item-wise analytics',
      'Actionable insights',
      'Grow repeat business',
    ],
    cta: 'Get Started',
    image: '/images/feature-inactive-customers.png',
    alt: 'Track inactive customers and item-wise analytics with actionable insights',
  },
  {
    label: 'Analytics',
    title: 'Premium Analytics',
    description:
      'Get comprehensive insights into your business performance with advanced dashboards.',
    benefits: [
      'Advanced dashboards',
      'Daily books & reports',
      'Balance sheet views',
      'Expense tracking',
    ],
    cta: 'Get Started',
    image: '/images/feature-premium-analytics.png',
    alt: 'Premium analytics — cloud dashboards synced across desktop and mobile',
  },
] as const

/** Features dropdown — same items as features section */
export const featureNavItems = featureShowcase.map((feature) => ({
  href: `/#${featureAnchorId(feature.title)}`,
  label: feature.title,
}))

/** Legacy grid features — same content for compatibility */
export const features = featureShowcase.map((f) => ({
  image: f.image,
  alt: f.alt,
  title: f.title,
  description: f.description,
}))

export const benefitsGrid = [
  {
    icon: 'smartphone',
    title: 'Tally on Mobile',
    description: 'Access your complete Tally data on iOS and Android, anytime.',
  },
  {
    icon: 'shield',
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with encrypted sync and backup.',
  },
  {
    icon: 'zap',
    title: 'Real-time Sync',
    description: 'Fast data sync between Tally and your phone in seconds.',
  },
  {
    icon: 'file-text',
    title: 'GST Ready',
    description: 'Generate GST bills, e-Way bills, and invoices on the go.',
  },
  {
    icon: 'message-circle',
    title: 'WhatsApp Share',
    description: 'Share bills and reports directly with customers on WhatsApp.',
  },
  {
    icon: 'cloud',
    title: 'Cloud Backup',
    description: 'Automatic cloud backup with easy restore when you need it.',
  },
] as const

export const whyTallyBridge = [
  {
    icon: 'briefcase',
    title: 'Business Automation',
    description: 'Automate reminders, billing, and reports to save hours every week.',
  },
  {
    icon: 'message-circle',
    title: 'WhatsApp Integration',
    description: 'Share invoices and payment links where your customers already are.',
  },
  {
    icon: 'cloud',
    title: 'Cloud Access',
    description: 'View books and dashboards from anywhere with secure cloud sync.',
  },
  {
    icon: 'globe',
    title: 'Remote Access',
    description: 'Manage Tally data on the go — no need to be at your office PC.',
  },
  {
    icon: 'bar-chart',
    title: 'Reports & Analytics',
    description: 'Daily books, inactive customers, and performance insights in one place.',
  },
  {
    icon: 'package',
    title: 'Inventory Visibility',
    description: 'Track items and stock movement alongside your accounting data.',
  },
  {
    icon: 'receipt',
    title: 'GST Compliance',
    description: 'Stay compliant with GST billing and e-Way bill generation built in.',
  },
  {
    icon: 'trending-up',
    title: 'Grow Your Business',
    description: 'Make faster decisions with real-time data at your fingertips.',
  },
] as const

/** Pricing plans — Growth, Pro, Pro Plus */
export const pricingPlans = [
  {
    id: 'growth',
    displayName: 'GROWTH',
    monthlyPrice: 358,
    yearlyPrice: 3000,
    highlighted: false,
    ctaSolid: false,
    features: [
      'Access Accounting Data on Mobile',
      'Share Ledger & Invoices on WhatsApp',
      'Track Outstanding Payments',
      'Automated Payment Reminders',
      'Sync Unlimited Companies',
      '20+ Business Reports',
      'Accounting Data Backup',
    ],
  },
  {
    id: 'pro',
    displayName: 'PRO',
    monthlyPrice: 595,
    yearlyPrice: 5000,
    highlighted: true,
    ctaSolid: true,
    features: ['Everything in Growth +', 'Create Custom PDF Templates'],
    featureBox: {
      title: 'Create Unlimited Vouchers',
      items: [
        'Create business vouchers instantly from your phone & web — No desktop required',
        'Edit Existing Vouchers Anywhere, Anytime with Mobile',
      ],
    },
  },
  {
    id: 'pro-plus',
    displayName: 'PRO PLUS',
    monthlyPrice: 833,
    yearlyPrice: 7000,
    highlighted: false,
    ctaSolid: false,
    features: ['Everything in Pro +'],
    featureBox: {
      title: 'E-Way & E-Invoicing',
      items: [
        'Instantly Generate E-Way Bills & E-Invoices in One Click — Right from Your Mobile!',
        'Stay GST Compliant',
      ],
    },
  },
] as const

export const testimonials = [
  {
    quote:
      'We stopped chasing staff for day-end figures. MobileTally shows live sales on my phone while I am at our second warehouse.',
    author: 'Avinish Kumar',
    role: 'Proprietor, Kumar Traders — Lucknow',
    rating: 5,
  },
  {
    quote:
      'Ledger sharing with our CA used to mean exporting files every evening. Now she reviews balances the same hour we post them.',
    author: 'Raj Patel',
    role: 'Managing Director, Patel Packaging',
    rating: 5,
  },
  {
    quote:
      'GST invoice PDFs go out on WhatsApp in under a minute. Our billing desk handles almost double the vouchers without extra hires.',
    author: 'Priya Sharma',
    role: 'Finance Head, Sharma Agro Foods',
    rating: 5,
  },
  {
    quote:
      'Payment reminders pulled back ₹4 lakh in overdue receipts in the first month alone. The tone is polite and customers respond.',
    author: 'Mohit Agarwal',
    role: 'Owner, Agarwal Home Appliances',
    rating: 4,
  },
  {
    quote:
      'Cloud backup saved us when a laptop crashed mid-week. Books were restored to Tally without re-entering a single voucher.',
    author: 'Sneha Reddy',
    role: 'Operations Manager, Reddy Pharma Dist.',
    rating: 5,
  },
  {
    quote:
      'Inactive buyer report flagged accounts we had not spoken to in ninety days. Two calls turned into repeat orders the same week.',
    author: 'Karan Mehta',
    role: 'Sales Director, Mehta Industrial Supply',
    rating: 4,
  },
  {
    quote:
      'During audit season our team checks stock and debtors from site visits. Partners no longer wait until someone returns to office.',
    author: 'Anita Desai',
    role: 'Partner, Desai & Associates CA Firm',
    rating: 5,
  },
  {
    quote:
      'Route-wise collection summary helps me decide which distributors to visit first. Decisions that took a day now take one glance.',
    author: 'Vikram Singh',
    role: 'Regional Distributor, North India FMCG',
    rating: 5,
  },
] as const

export const faqItems = [
  {
    q: `What is ${siteConfig.name}?`,
    a: `${siteConfig.name} is a mobile and web solution by Developerbox Ai Factory that connects your Tally accounting software with your phone. View ledgers, send reminders, generate GST documents, and track performance in real time — without being at your office PC.`,
  },
  {
    q: 'Is there an option to upgrade my current plan?',
    a: 'Yes. You can upgrade from Growth to Pro or Enterprise at any time. Our team will apply a fair adjustment based on your remaining subscription period so you only pay the difference for the upgrade.',
  },
  {
    q: 'How can I renew my subscription after it expires?',
    a: `Renew from the ${siteConfig.name} app under Account → Subscription, or contact us at ${siteConfig.contact.email}. We will help you restore access quickly and keep your data and settings intact.`,
  },
  {
    q: 'What payment methods are available?',
    a: 'We accept UPI, credit and debit cards, net banking, and popular digital wallets. For annual plans, invoices are shared by email after payment confirmation.',
  },
  {
    q: `Does ${siteConfig.name} work with my existing Tally version?`,
    a: `Yes. ${siteConfig.name} connects to Tally ERP 9 and TallyPrime through our desktop connector. Install the connector on the PC where Tally runs, sign in once, and your books sync securely to the mobile app.`,
  },
  {
    q: `Is my business data safe on ${siteConfig.name}?`,
    a: 'Your data is encrypted in transit and stored on secure cloud servers with regular backups. Only authorised users on your account can view company books, and you can revoke access from the app at any time.',
  },
] as const

/** @deprecated Footer uses navLinks — kept for compatibility */
export const footerLinks = {
  about: [
    { label: 'Who We Are', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Download', href: '#' },
  ],
  support: [
    { label: 'Help Center', href: '#' },
    { label: 'Contact Us', href: '#contact' },
    { label: 'Documentation', href: '#' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms', href: '/terms' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/#contact' },
  ],
} as const
