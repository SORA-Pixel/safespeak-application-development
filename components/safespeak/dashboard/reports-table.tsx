'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getCategory } from '@/lib/safespeak/categories'
import type { Report } from '@/lib/safespeak/types'
import { useSafeSpeak } from '../safespeak-provider'
import { CategoryIcon, FormattedTime, UrgencyBadge } from '../shared'
import { StatusSelect } from './status-select'

export function ReportsTable({ reports, onOpen }: { reports: Report[]; onOpen: (id: string) => void }) {
  const { updateStatus } = useSafeSpeak()

  if (reports.length === 0) {
    return (
      <p className="rounded-xl border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
        No reports match these filters.
      </p>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/60 hover:bg-muted/60">
            <TableHead className="w-28">ID</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>AI Urgency</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((r) => (
            <TableRow
              key={r.id}
              tabIndex={0}
              aria-label={`Open report ${r.id}`}
              onClick={() => onOpen(r.id)}
              onKeyDown={(e) => {
                if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault()
                  onOpen(r.id)
                }
              }}
              className="cursor-pointer outline-none animate-in fade-in focus-visible:bg-accent/60"
            >
              <TableCell className="font-mono text-sm font-semibold">
                <span className="flex items-center gap-2">
                  {r.isNew && <span className="size-2 rounded-full bg-sky-500" aria-label="New" />}
                  {r.id}
                </span>
              </TableCell>
              <TableCell>
                <span className="flex items-center gap-2.5">
                  <CategoryIcon category={r.category} />
                  <span className="max-w-48 truncate text-sm font-medium">{getCategory(r.category).label}</span>
                </span>
              </TableCell>
              <TableCell>
                <UrgencyBadge urgency={r.urgency} />
              </TableCell>
              <TableCell className="text-sm whitespace-nowrap text-muted-foreground">
                <FormattedTime value={r.createdAt} />
              </TableCell>
              <TableCell>
                {/* Stops row-open when interacting with the dropdown (its portal events bubble through React). */}
                <div onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
                  <StatusSelect
                    value={r.status}
                    onChange={(s) => updateStatus(r.id, s)}
                    label={`Status for report ${r.id}`}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
