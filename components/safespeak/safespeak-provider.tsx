'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { INITIAL_REPORTS } from '@/lib/safespeak/mock-data'
import { generateSecretCode, simulateGeminiTriage } from '@/lib/safespeak/triage'
import type { Message, NewReportInput, Report, Status } from '@/lib/safespeak/types'

export const STAFF_PASSCODE = 'admin123'

interface SafeSpeakContextValue {
  reports: Report[]
  isStaff: boolean
  login: (passcode: string) => boolean
  logout: () => void
  submitReport: (input: NewReportInput) => Report
  updateStatus: (id: string, status: Status) => void
  markSeen: (id: string) => void
  sendMessage: (id: string, from: Message['from'], text: string) => void
  findByCode: (code: string) => Report | undefined
}

const SafeSpeakContext = createContext<SafeSpeakContextValue | null>(null)

const uid = () => Math.random().toString(36).slice(2, 10)

export function SafeSpeakProvider({ children }: { children: React.ReactNode }) {
  const [reports, setReports] = useState<Report[]>(INITIAL_REPORTS)
  const [isStaff, setIsStaff] = useState(false)

  const login = useCallback((passcode: string) => {
    const ok = passcode === STAFF_PASSCODE
    if (ok) setIsStaff(true)
    return ok
  }, [])

  const logout = useCallback(() => setIsStaff(false), [])

  const submitReport = useCallback(
    (input: NewReportInput) => {
      const code = generateSecretCode(new Set(reports.map((r) => r.code)))
      const nextNumber = Math.max(1000, ...reports.map((r) => Number(r.id.slice(2)))) + 1
      const triage = simulateGeminiTriage(input.category, input.details)
      const report: Report = {
        id: `R-${nextNumber}`,
        code,
        category: input.category,
        details: input.details,
        urgency: triage.urgency,
        summary: triage.summary,
        createdAt: Date.now(),
        status: 'Pending',
        isNew: true,
        screenshot: input.screenshot,
        messages: [],
      }
      setReports((prev) => [report, ...prev])
      return report
    },
    [reports],
  )

  const patch = useCallback((id: string, fn: (r: Report) => Report) => {
    setReports((prev) => prev.map((r) => (r.id === id ? fn(r) : r)))
  }, [])

  const updateStatus = useCallback(
    (id: string, status: Status) => patch(id, (r) => ({ ...r, status })),
    [patch],
  )

  const markSeen = useCallback((id: string) => patch(id, (r) => ({ ...r, isNew: false })), [patch])

  const sendMessage = useCallback(
    (id: string, from: Message['from'], text: string) =>
      patch(id, (r) => ({
        ...r,
        status: from === 'counselor' && r.status === 'Pending' ? 'In Progress' : r.status,
        messages: [...r.messages, { id: uid(), from, text, sentAt: Date.now() }],
      })),
    [patch],
  )

  const findByCode = useCallback(
    (code: string) => reports.find((r) => r.code === code.trim().toUpperCase()),
    [reports],
  )

  const value = useMemo(
    () => ({
      reports,
      isStaff,
      login,
      logout,
      submitReport,
      updateStatus,
      markSeen,
      sendMessage,
      findByCode,
    }),
    [reports, isStaff, login, logout, submitReport, updateStatus, markSeen, sendMessage, findByCode],
  )

  return <SafeSpeakContext.Provider value={value}>{children}</SafeSpeakContext.Provider>
}

export function useSafeSpeak() {
  const ctx = useContext(SafeSpeakContext)
  if (!ctx) throw new Error('useSafeSpeak must be used inside SafeSpeakProvider')
  return ctx
}
