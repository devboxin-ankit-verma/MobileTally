'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { partnerPage } from '@/lib/site-pages'
import { siteLinks } from '@/lib/site-links'
import { InnerPageLayout } from '@/components/site/inner-page-layout'
import { BrandButton } from '@/components/site/brand-button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const partnerFormSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  company: z.string().min(2, 'Company name is required'),
  message: z.string().min(10, 'Please share a brief message'),
})

type PartnerFormValues = z.infer<typeof partnerFormSchema>

export function PartnerPage() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PartnerFormValues>({ resolver: zodResolver(partnerFormSchema) })

  const onSubmit = async (data: PartnerFormValues) => {
    try {
      const res = await fetch('/api/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok || !json.success) {
        toast.error(json.message ?? 'Could not submit. Please try again.')
        return
      }
      setSubmitted(true)
      reset()
      toast.success(json.message ?? 'Thank you! We will be in touch soon.')
    } catch {
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <InnerPageLayout
      badge={partnerPage.badge}
      title={partnerPage.title}
      intro={partnerPage.intro}
      image={partnerPage.image}
      imageAlt={partnerPage.imageAlt}
    >
      <div className="site-inner-page__partner">
        <ul className="site-inner-page__benefits">
          {partnerPage.benefits.map((benefit) => (
            <li key={benefit} className="site-inner-page__benefit">
              <CheckCircle2 className="size-5 shrink-0 text-[var(--site-brand)]" aria-hidden />
              <span className="site-body-sm text-[var(--site-text-muted)]">{benefit}</span>
            </li>
          ))}
        </ul>

        <div className="site-inner-page__form-card site-card-luxury">
          {submitted ? (
            <div className="py-8 text-center">
              <CheckCircle2 className="mx-auto mb-4 size-12 text-[var(--site-brand)]" aria-hidden />
              <p className="site-h3 text-[var(--site-text)]">Application received</p>
              <p className="site-body-sm mt-2 text-[var(--site-text-muted)]">
                We will contact you within 2 business days.
              </p>
              <Link
                href={siteLinks.home}
                className="site-body-sm mt-6 inline-block font-medium text-[var(--site-brand)] hover:underline"
              >
                Back to home
              </Link>
            </div>
          ) : (
            <>
              <h2 className="site-h3 text-[var(--site-text)]">{partnerPage.formTitle}</h2>
              <p className="site-body-sm mt-2 text-[var(--site-text-muted)]">
                {partnerPage.formSubtitle}
              </p>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
                <div>
                  <Label htmlFor="partner-fullName">Full name</Label>
                  <Input id="partner-fullName" className="site-input mt-1.5 h-11" {...register('fullName')} />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-destructive">{errors.fullName.message}</p>
                  )}
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="partner-email">Email</Label>
                    <Input
                      id="partner-email"
                      type="email"
                      className="site-input mt-1.5 h-11"
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="partner-phone">Phone</Label>
                    <Input id="partner-phone" type="tel" className="site-input mt-1.5 h-11" {...register('phone')} />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="partner-company">Company</Label>
                  <Input id="partner-company" className="site-input mt-1.5 h-11" {...register('company')} />
                  {errors.company && (
                    <p className="mt-1 text-sm text-destructive">{errors.company.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="partner-message">Message</Label>
                  <Textarea id="partner-message" rows={4} className="site-input mt-1.5 min-h-[120px]" {...register('message')} />
                  {errors.message && (
                    <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>
                  )}
                </div>
                <BrandButton type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting…' : 'Submit application'}
                </BrandButton>
              </form>
            </>
          )}
        </div>
      </div>
    </InnerPageLayout>
  )
}
