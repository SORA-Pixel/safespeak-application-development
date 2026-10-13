'use client'

import { getCategory } from '@/lib/safespeak/categories'
import type { CategoryId, Message, Urgency } from '@/lib/safespeak/types'
import { cn } from '@/lib/utils'

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
})

export function FormattedTime({ value, className }: { value: number; className?: string }) {
  return (
    <time dateTime={new Date(value).toISOString()} className={className} suppressHydrationWarning>
      {timeFormatter.format(value)}
    </time>
  )
}

const URGENCY_STYLES: Record<Urgency, { badge: string; dot: string }> = {
  High: { badge: 'bg-red-100 text-red-700 ring-red-200', dot: 'bg-red-500' },
  Medium: { badge: 'bg-amber-100 text-amber-800 ring-amber-200', dot: 'bg-amber-500' },
  Low: { badge: 'bg-emerald-100 text-emerald-700 ring-emerald-200', dot: 'bg-emerald-500' },
}

export function UrgencyBadge({ urgency, className }: { urgency: Urgency; className?: string }) {
  const s = URGENCY_STYLES[urgency]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold ring-1 ring-inset',
        s.badge,
        className,
      )}
    >
      <span className={cn('size-1.5 rounded-full', s.dot)} aria-hidden />
      {urgency}
    </span>
  )
}

export function CategoryIcon({
  category,
  className,
}: {
  category: CategoryId
  className?: string
}) {
  const c = getCategory(category)
  const Icon = c.icon
  return (
    <span
      className={cn('flex size-8 shrink-0 items-center justify-center rounded-lg', c.iconWrap, className)}
      aria-hidden
    >
      <Icon className="size-4" />
    </span>
  )
}

export function AssignedBadge({ assignedTo, className }: { assignedTo: 'any' | 'alexis' | 'botto'; className?: string }) {
  const label = assignedTo === 'any' ? 'Any Counselor' : `Private: ${assignedTo === 'alexis' ? 'Mr. Alexis' : 'Mr. Botto'}`
  return <span className={cn('inline-flex rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground', className)}>{label}</span>
}

export function MessageThread({
  messages,
  viewer,
  emptyText,
}: {
  messages: Message[]
  viewer: Message['from']
  emptyText: string
}) {
  if (messages.length === 0) {
    return (
      <p className="rounded-xl border border-dashed bg-muted/50 px-4 py-6 text-center text-sm text-muted-foreground">
        {emptyText}
      </p>
    )
  }

  return (
    <ol className="flex flex-col gap-3" aria-label="Messages">
      {messages.map((m) => {
        const mine = m.from === viewer
        return (
          <li
            key={m.id}
            className={cn(
              'flex max-w-[85%] flex-col gap-1 animate-in fade-in slide-in-from-bottom-1',
              mine ? 'items-end self-end' : 'items-start self-start',
            )}
          >
            <span className="text-xs font-semibold text-muted-foreground">
              {m.from === 'counselor' ? 'School Counselor' : 'Anonymous Student'}
            </span>
            <p
              className={cn(
                'rounded-2xl px-3.5 py-2 text-sm leading-relaxed',
                mine
                  ? 'rounded-br-sm bg-primary text-primary-foreground'
                  : 'rounded-bl-sm bg-secondary text-secondary-foreground',
              )}
            >
              {m.text}
            </p>
            <FormattedTime value={m.sentAt} className="text-[11px] text-muted-foreground" />
          </li>
        )
      })}
    </ol>
  )
}
