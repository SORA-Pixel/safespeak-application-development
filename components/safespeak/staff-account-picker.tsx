'use client'

import { UserRound } from 'lucide-react'
import { TEACHER_NAMES } from '@/lib/safespeak/teachers'
import { cn } from '@/lib/utils'

interface StaffAccountPickerProps {
  name: string
  value: string
  onChange: (value: string) => void
  legend?: string
}

export function StaffAccountPicker({ name, value, onChange, legend = 'Username' }: StaffAccountPickerProps) {
  return (
    <fieldset className="flex flex-col gap-1.5">
      <legend className="mb-1.5 text-sm font-medium">{legend}</legend>
      <div className="grid grid-cols-2 gap-2">
        {TEACHER_NAMES.map((teacher) => {
          const checked = value === teacher
          return (
            <label
              key={teacher}
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded-xl border-2 px-3 py-2.5 text-sm font-semibold transition-colors has-focus-visible:ring-3 has-focus-visible:ring-ring/50',
                checked ? 'border-primary bg-accent text-accent-foreground' : 'border-border hover:bg-muted',
              )}
            >
              <input
                type="radio"
                name={name}
                value={teacher}
                checked={checked}
                onChange={() => onChange(teacher)}
                className="sr-only"
              />
              <UserRound className="size-4" aria-hidden />
              {teacher}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
