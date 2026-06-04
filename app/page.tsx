import dynamic from 'next/dynamic'
import { SiteShell } from '@/components/layout/site-shell'
import { HeroSection } from '@/components/site/hero-section'
import { TrustBar } from '@/components/site/trust-bar'
import { SectionSkeleton } from '@/components/motion/section-skeleton'

const FeaturesSection = dynamic(
  () => import('@/components/site/features-section').then((m) => m.FeaturesSection),
  { loading: () => <SectionSkeleton className="site-section min-h-[480px]" /> },
)

const BenefitsSection = dynamic(
  () => import('@/components/site/benefits-section').then((m) => m.BenefitsSection),
  { loading: () => <SectionSkeleton /> },
)

const WhyTallyBridgeSection = dynamic(
  () => import('@/components/site/why-tallybridge-section').then((m) => m.WhyTallyBridgeSection),
  { loading: () => <SectionSkeleton /> },
)

const PricingSection = dynamic(
  () => import('@/components/site/pricing-section').then((m) => m.PricingSection),
  { loading: () => <SectionSkeleton /> },
)

const DemoCtaSection = dynamic(
  () => import('@/components/site/demo-cta-section').then((m) => m.DemoCtaSection),
  { loading: () => <SectionSkeleton className="site-section min-h-[320px]" /> },
)

const TestimonialsSection = dynamic(
  () => import('@/components/site/testimonials-section').then((m) => m.TestimonialsSection),
  { loading: () => <SectionSkeleton className="site-section min-h-[400px]" /> },
)

const FaqSection = dynamic(
  () => import('@/components/site/faq-section').then((m) => m.FaqSection),
  { loading: () => <SectionSkeleton /> },
)

const ContactSection = dynamic(
  () => import('@/components/site/contact-section').then((m) => m.ContactSection),
  { loading: () => <SectionSkeleton className="site-section min-h-[520px]" /> },
)

export default function Page() {
  return (
    <SiteShell>
      <main className="overflow-x-hidden">
        <HeroSection />
        <TrustBar />
        <FeaturesSection />
        <BenefitsSection />
        <WhyTallyBridgeSection />
        <PricingSection />
        <DemoCtaSection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </main>
    </SiteShell>
  )
}
