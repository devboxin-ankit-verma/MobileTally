import Image from 'next/image'
import { cn } from '@/lib/utils'

const sizes = {
  sm: 36,
  md: 40,
  lg: 48,
} as const

type BrandMarkProps = {
  size?: keyof typeof sizes
  className?: string
  priority?: boolean
}

/** MobileTally logo mark — matches favicon */
export function BrandMark({ size = 'md', className, priority }: BrandMarkProps) {
  const px = sizes[size]
  return (
    <Image
      src="/logo.svg"
      alt=""
      width={px}
      height={px}
      className={cn('shrink-0 rounded-lg', className)}
      priority={priority}
      aria-hidden
    />
  )
}
