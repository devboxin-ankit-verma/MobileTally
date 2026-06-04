/** Placeholder while below-fold sections lazy-load */
export function SectionSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={className ?? 'site-section min-h-[280px] md:min-h-[360px]'}
      aria-hidden
    />
  )
}
