'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { STATUSES, type Status } from '@/lib/safespeak/types'
import { cn } from '@/lib/utils'

const STATUS_TONE: Record<Status, string> = {
  Pending: 'bg-amber-50 border-amber-200 text-amber-900',
  'In Progress': 'bg-violet-50 border-violet-200 text-violet-900',
  Resolved: 'bg-emerald-50 border-emerald-200 text-emerald-900',
}

export function StatusSelect({
  value,
  onChange,
  label,
  className,
}: {
  value: Status
  onChange: (s: Status) => void
  label: string
  className?: string
}) {
  return (
    <Select value={value} onValueChange={(v) => v && onChange(v as Status)}>
      <SelectTrigger aria-label={label} className={cn('h-8 w-36 font-semibold', STATUS_TONE[value], className)}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {STATUSES.map((s) => (
          <SelectItem key={s} value={s}>
            {s}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
