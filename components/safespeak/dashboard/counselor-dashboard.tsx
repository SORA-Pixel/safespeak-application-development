'use client'

import { useMemo, useState } from 'react'
import type { Status, Urgency } from '@/lib/safespeak/types'
import { canStaffAccessReport, useSafeSpeak } from '../safespeak-provider'
import { MetricCards } from './metric-cards'
import { ReportDetailSheet } from './report-detail-sheet'
import { ReportFilters } from './report-filters'
import { ReportsTable } from './reports-table'

export function CounselorDashboard() {
  const { reports, markSeen, currentStaff } = useSafeSpeak()
  const [query, setQuery] = useState('')
  const [urgency, setUrgency] = useState<Urgency | 'all'>('all')
  const [status, setStatus] = useState<Status | 'all'>('all')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return [...reports]
      .sort((a, b) => b.createdAt - a.createdAt)
      .filter((r) => canStaffAccessReport(currentStaff, r.assignedTo))
      .filter((r) => urgency === 'all' || r.urgency === urgency)
      .filter((r) => status === 'all' || r.status === status)
      .filter(
        (r) =>
          !q ||
          r.id.toLowerCase().includes(q) ||
          r.details.toLowerCase().includes(q) ||
          r.summary.toLowerCase().includes(q),
      )
  }, [reports, query, urgency, status])

  const selected = reports.find((r) => r.id === selectedId) ?? null

  function openReport(id: string) {
    setSelectedId(id)
    markSeen(id)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold">Counselor Dashboard</h1>
        <p className="text-muted-foreground">
          Anonymous reports from students, triaged by Gemini AI. New submissions appear here instantly.
        </p>
      </div>

      <MetricCards reports={reports} />

      <section aria-labelledby="reports-heading" className="flex flex-col gap-4 rounded-3xl border bg-card p-4 shadow-xs md:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <h2 id="reports-heading" className="text-xl font-semibold">
            Reports <span className="text-base font-normal text-muted-foreground">({filtered.length})</span>
          </h2>
          <ReportFilters
            query={query}
            onQueryChange={setQuery}
            urgency={urgency}
            onUrgencyChange={setUrgency}
            status={status}
            onStatusChange={setStatus}
          />
        </div>
        <ReportsTable reports={filtered} onOpen={openReport} />
      </section>

      <ReportDetailSheet report={selected} onClose={() => setSelectedId(null)} />
    </div>
  )
}
