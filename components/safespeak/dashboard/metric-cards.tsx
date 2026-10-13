import { Clock, FileText, Siren, Sparkles, type LucideIcon } from 'lucide-react'
import type { Report } from '@/lib/safespeak/types'
import { cn } from '@/lib/utils'

interface Metric {
  label: string
  value: number
  icon: LucideIcon
  className: string
  iconClass: string
}

export function MetricCards({ reports }: { reports: Report[] }) {
  const metrics: Metric[] = [
    {
      label: 'Total Reports',
      value: reports.length,
      icon: FileText,
      className: 'bg-card',
      iconClass: 'bg-accent text-accent-foreground',
    },
    {
      label: 'New Reports',
      value: reports.filter((r) => r.isNew).length,
      icon: Sparkles,
      className: 'bg-card',
      iconClass: 'bg-sky-100 text-sky-700',
    },
    {
      label: 'High Urgency',
      value: reports.filter((r) => r.urgency === 'High' && r.status !== 'Resolved').length,
      icon: Siren,
      className: 'border-red-200 bg-red-50',
      iconClass: 'bg-red-500 text-white',
    },
    {
      label: 'Pending Review',
      value: reports.filter((r) => r.status === 'Pending').length,
      icon: Clock,
      className: 'bg-card',
      iconClass: 'bg-amber-100 text-amber-700',
    },
  ]

  return (
    <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {metrics.map((m) => (
        <div key={m.label} className={cn('flex flex-col gap-3 rounded-2xl border p-4 shadow-xs', m.className)}>
          <div className="flex items-center justify-between gap-2">
            <dt className={cn('text-sm font-semibold', m.label === 'High Urgency' ? 'text-red-700' : 'text-muted-foreground')}>
              {m.label}
            </dt>
            <span className={cn('flex size-8 items-center justify-center rounded-lg', m.iconClass)} aria-hidden>
              <m.icon className="size-4" />
            </span>
          </div>
          <dd
            className={cn(
              'font-display text-3xl font-semibold tabular-nums',
              m.label === 'High Urgency' && 'text-red-700',
            )}
          >
            {m.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
