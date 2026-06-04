'use client'

import { useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { m, AnimatePresence, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle2, Handshake, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import { siteConfig } from '@/lib/site-config'
import { siteLinks, externalLinkAttrs } from '@/lib/site-links'
import { scaleIn, defaultTransition, staggerContainer, staggerItem } from '@/lib/motion'
import { Section } from '@/components/layout/section'
import { BrandButton } from '@/components/site/brand-button'
import { ContactDetails } from '@/components/site/contact-details'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { MotionWrapper } from '@/components/layout/motion-wrapper'
import { cn } from '@/lib/utils'

const contactFormSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

const formFields: { id: keyof ContactFormValues; label: string; type?: string; rows?: number; span?: number }[] = [
  { id: 'fullName', label: 'Full Name', span: 2 },
  { id: 'email', label: 'Email Address', type: 'email' },
  { id: 'phone', label: 'Phone Number', type: 'tel' },
  { id: 'subject', label: 'Subject', span: 2 },
  { id: 'message', label: 'Message', span: 2, rows: 5 },
]

const panelClass = 'site-card-luxury site-contact__panel flex h-full min-h-full flex-col p-8 lg:p-10'

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const reduced = useReducedMotion()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  })

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()

      if (!res.ok) {
        toast.error(json.message ?? 'Please check the form and try again.')
        return
      }

      setSubmitted(true)
      reset()
      toast.success(json.message ?? 'Message sent successfully!')
    } catch {
      toast.error('Unable to send message. Please try again later.')
    }
  }

  const FieldWrap = ({
    index,
    children,
    className,
  }: {
    index: number
    children: ReactNode
    className?: string
  }) => {
    if (reduced) return <div className={className}>{children}</div>
    return (
      <m.div variants={staggerItem} className={className} custom={index}>
        {children}
      </m.div>
    )
  }

  return (
    <Section id="contact" variant="muted">
      <div className="site-content site-contact">
        <MotionWrapper variant="fadeUp" className="site-contact__header">
          <span className="site-badge mb-4 inline-flex">Contact</span>
          <h2 className="site-h2 text-[var(--site-text)]">
            Let&apos;s discuss your next project.
          </h2>
          <p className="site-body mt-5 max-w-2xl text-[var(--site-text-muted)]">
            Have questions about {siteConfig.name}? Our team is here to help you connect Tally with your mobile workflow.
          </p>
        </MotionWrapper>

        <div className="site-contact__grid">
          <MotionWrapper variant="fadeLeft" className="site-contact__col">
            <div className={panelClass}>
              <h3 className="site-contact__panel-title">Contact Information</h3>
              <ContactDetails variant="card" className="flex-1" />
              <div className="mt-auto border-t border-[var(--site-border)] pt-6">
                <a
                  href={siteLinks.whatsapp}
                  {...externalLinkAttrs}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--site-text)] transition-colors hover:text-[#25D366]"
                >
                  Message us on WhatsApp →
                </a>
              </div>
            </div>
          </MotionWrapper>

          <MotionWrapper variant="fadeRight" className="site-contact__col" inView>
            <div id="contact-form" className={panelClass}>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <m.div
                    key="success"
                    initial={reduced ? false : { opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.42, 0, 0.58, 1] }}
                    className="flex flex-1 flex-col items-center justify-center py-12 text-center"
                  >
                    <CheckCircle2 className="mb-4 size-16 text-[var(--site-brand)]" aria-hidden />
                    <h3 className="text-2xl font-bold">Thank you!</h3>
                    <p className="mt-2 max-w-sm text-[var(--site-text-muted)]">
                      Your message has been received. We&apos;ll respond within one business day.
                    </p>
                    <BrandButton type="button" className="mt-8" onClick={() => setSubmitted(false)}>
                      Send Another Message
                    </BrandButton>
                  </m.div>
                ) : (
                  <m.div
                    key="form"
                    className="flex flex-1 flex-col"
                    initial={reduced ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    variants={scaleIn}
                    transition={defaultTransition}
                  >
                    <h3 className="site-contact__panel-title">Send us a message</h3>
                    <m.form
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex flex-1 flex-col gap-5"
                      noValidate
                      variants={reduced ? undefined : staggerContainer}
                      initial="hidden"
                      animate="visible"
                    >
                      <div className="grid flex-1 gap-5 sm:grid-cols-2">
                        {formFields.map((field, index) => (
                          <FieldWrap
                            key={field.id}
                            index={index}
                            className={cn('space-y-2', field.span === 2 && 'sm:col-span-2')}
                          >
                            <Label htmlFor={field.id}>{field.label}</Label>
                            {field.id === 'message' ? (
                              <Textarea
                                id={field.id}
                                rows={field.rows}
                                {...register(field.id)}
                                aria-invalid={!!errors[field.id]}
                                className="site-input min-h-[140px] flex-1 rounded-[14px] transition-shadow focus:shadow-md"
                              />
                            ) : (
                              <Input
                                id={field.id}
                                type={field.type}
                                {...register(field.id)}
                                aria-invalid={!!errors[field.id]}
                                className="site-input h-11 rounded-[14px] transition-shadow focus:shadow-md"
                              />
                            )}
                            {errors[field.id] && (
                              <p className="text-sm text-destructive" role="alert">
                                {errors[field.id]?.message}
                              </p>
                            )}
                          </FieldWrap>
                        ))}
                      </div>
                      <FieldWrap index={formFields.length}>
                        <BrandButton type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </BrandButton>
                      </FieldWrap>
                    </m.form>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </MotionWrapper>
        </div>

        <MotionWrapper variant="fadeUp" className="site-contact__partner">
          <Link href={siteLinks.partnerWithUs} className="site-contact__partner-card">
            <div className="site-contact__partner-glow" aria-hidden />
            <div className="site-contact__partner-body">
              <div className="site-contact__partner-icon" aria-hidden>
                <Handshake className="site-contact__partner-icon-svg" strokeWidth={2} />
              </div>
              <div className="site-contact__partner-copy">
                <span className="site-contact__partner-badge">Partnership</span>
                <h3 className="site-contact__partner-title">Become a Partner</h3>
                <p className="site-contact__partner-text">
                  Join resellers, CA firms, and technology partners growing with {siteConfig.name} — margins,
                  training, and dedicated support for your team.
                </p>
              </div>
            </div>
            <span className="site-contact__partner-cta">
              Partner With Us
              <ArrowRight className="site-contact__partner-cta-icon" aria-hidden />
            </span>
          </Link>
        </MotionWrapper>
      </div>
    </Section>
  )
}
