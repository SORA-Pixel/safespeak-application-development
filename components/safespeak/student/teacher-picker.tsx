'use client'

import { Sparkles, UserRound } from 'lucide-react'
import { TEACHER_NAMES } from '@/lib/safespeak/teachers'
import { cn } from '@/lib/utils'

const OPTIONS = [
  { value: '', label: 'Any Available Counselor', note: 'Recommended — fastest reply', icon: Sparkles },
  ...TEACHER_NAMES.map((name) => ({ value: name, label: name, note: 'Only they will see it first', icon: UserRound })),
]

export function TeacherPicker({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div role="radiogroup" aria-label="Who would you like to speak with?" className="grid gap-3 sm:grid-cols-3">
      {OPTIONS.map((opt) => {
        const checked = value === opt.value
        const Icon = opt.icon
        return (
          <label
            key={opt.label}
            className={cn(
              'flex cursor-pointer items-center gap-3 rounded-2xl border-2 p-3 transition-colors has-focus-visible:ring-3 has-focus-visible:ring-ring/50',
              checked ? 'border-primary bg-accent' : 'border-border bg-card hover:bg-muted',
            )}
          >
            <input
              type="radio"
              name="assigned-teacher"
              value={opt.value}
              checked={checked}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            <span
              className={cn(
                'flex size-10 shrink-0 items-center justify-center rounded-full',
                checked ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
              )}
            >
              <Icon className="size-5" aria-hidden />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="font-display text-base font-semibold">{opt.label}</span>
              <span className="text-xs text-muted-foreground">{opt.note}</span>
            </span>
          </label>
        )
      })}
    </div>
  )
}
