'use client'

import { Check } from 'lucide-react'
import { CATEGORIES } from '@/lib/safespeak/categories'
import type { CategoryId } from '@/lib/safespeak/types'
import { cn } from '@/lib/utils'

export function CategoryPicker({
  value,
  onChange,
}: {
  value: CategoryId | null
  onChange: (id: CategoryId) => void
}) {
  return (
    <div role="radiogroup" aria-label="Report category" className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {CATEGORIES.map((c) => {
        const selected = value === c.id
        const Icon = c.icon
        return (
          <button
            key={c.id}
            type="button"
            role="radio"
            aria-checked={selected}
            data-selected={selected}
            onClick={() => onChange(c.id)}
            className={cn(
              'relative flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all outline-none hover:-translate-y-0.5 focus-visible:ring-3 focus-visible:ring-ring/50 data-[selected=true]:shadow-md',
              c.tile,
            )}
          >
            <span className={cn('flex size-12 shrink-0 items-center justify-center rounded-xl', c.iconWrap)}>
              <Icon className="size-6" aria-hidden />
            </span>
            <span className="flex flex-col">
              <span className="font-display text-base font-semibold leading-tight">{c.label}</span>
              <span className="text-xs text-muted-foreground">{c.blurb}</span>
            </span>
            {selected && (
              <span className="absolute top-2 right-2 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground animate-in zoom-in">
                <Check className="size-3" aria-hidden />
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
