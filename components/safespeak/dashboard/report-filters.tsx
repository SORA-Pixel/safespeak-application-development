'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { STATUSES, URGENCIES, type Status, type Urgency } from '@/lib/safespeak/types'

interface ReportFiltersProps {
  query: string
  onQueryChange: (q: string) => void
  urgency: Urgency | 'all'
  onUrgencyChange: (u: Urgency | 'all') => void
  status: Status | 'all'
  onStatusChange: (s: Status | 'all') => void
}

const urgencyItems = [{ value: 'all', label: 'All urgency' }, ...URGENCIES.map((u) => ({ value: u, label: u }))]
const statusItems = [{ value: 'all', label: 'All statuses' }, ...STATUSES.map((s) => ({ value: s, label: s }))]

export function ReportFilters(props: ReportFiltersProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <label htmlFor="report-search" className="sr-only">
          Search reports
        </label>
        <Input
          id="report-search"
          value={props.query}
          onChange={(e) => props.onQueryChange(e.target.value)}
          placeholder="Search ID or text..."
          className="h-9 pl-8 sm:w-56"
        />
      </div>
      <Select
        items={urgencyItems}
        value={props.urgency}
        onValueChange={(v) => v && props.onUrgencyChange(v as Urgency | 'all')}
      >
        <SelectTrigger className="h-9 w-full sm:w-36" aria-label="Filter by urgency">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {urgencyItems.map((i) => (
            <SelectItem key={i.value} value={i.value}>
              {i.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        items={statusItems}
        value={props.status}
        onValueChange={(v) => v && props.onStatusChange(v as Status | 'all')}
      >
        <SelectTrigger className="h-9 w-full sm:w-36" aria-label="Filter by status">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {statusItems.map((i) => (
            <SelectItem key={i.value} value={i.value}>
              {i.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
