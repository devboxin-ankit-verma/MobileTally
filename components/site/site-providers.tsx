'use client'

import { Toaster } from '@/components/ui/sonner'
import { MotionProvider } from '@/components/motion/motion-provider'
import { ScrollProgress } from '@/components/motion/scroll-progress'
import { SiteBackground } from '@/components/motion/site-background'
import { SmoothSiteLoad } from '@/components/motion/smooth-site-load'

export function SiteProviders({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <SmoothSiteLoad />
      <SiteBackground />
      <ScrollProgress />
      <div className="relative z-[1]">{children}</div>
      <Toaster position="top-center" richColors />
    </MotionProvider>
  )
}
