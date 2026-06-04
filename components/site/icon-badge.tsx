import {
  BarChart3,
  Briefcase,
  Cloud,
  FileText,
  Globe,
  MessageCircle,
  Package,
  Receipt,
  Shield,
  Smartphone,
  TrendingUp,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const iconMap: Record<string, LucideIcon> = {
  smartphone: Smartphone,
  shield: Shield,
  zap: Zap,
  'file-text': FileText,
  'message-circle': MessageCircle,
  cloud: Cloud,
  briefcase: Briefcase,
  globe: Globe,
  'bar-chart': BarChart3,
  package: Package,
  receipt: Receipt,
  'trending-up': TrendingUp,
}

export function IconBadge({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const Icon = iconMap[name] ?? Zap
  return (
    <div
      className={cn(
        'flex size-12 items-center justify-center rounded-2xl bg-[var(--site-brand)]/10 text-[var(--site-brand)]',
        className,
      )}
    >
      <Icon className="size-6" aria-hidden />
    </div>
  )
}
