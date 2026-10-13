'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { COUNSELOR_OPTIONS } from '@/lib/safespeak/types'
import type { CategoryId, Report, Screenshot, TeacherId } from '@/lib/safespeak/types'
import { useSafeSpeak } from '../safespeak-provider'
import { CategoryPicker } from './category-picker'
import { ScreenshotUpload } from './screenshot-upload'
import { StepCard } from './step-card'
import { SuccessDialog } from './success-dialog'

const MIN_DETAILS = 10

export function ReportForm({ onCheckReplies }: { onCheckReplies: (code: string) => void }) {
  const { submitReport } = useSafeSpeak()
  const [category, setCategory] = useState<CategoryId | null>(null)
  const [assignedTo, setAssignedTo] = useState<TeacherId>('any')
  const [details, setDetails] = useState('')
  const [file, setFile] = useState<{ url: string; name: string } | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [showErrors, setShowErrors] = useState(false)
  const [submitted, setSubmitted] = useState<Report | null>(null)

  const detailsTooShort = details.trim().length < MIN_DETAILS
  const canSubmit = !!category && !detailsTooShort

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!canSubmit || !category) {
      setShowErrors(true)
      return
    }
    setSubmitting(true)
    const screenshot: Screenshot | null = file ? { ...file } : null
    // Short pause so the simulated AI triage feels like a real round-trip.
    window.setTimeout(() => {
      const report = submitReport({ category, details: details.trim(), screenshot, assignedTo })
      setSubmitted(report)
      setSubmitting(false)
      setShowErrors(false)
      setCategory(null)
      setAssignedTo('any')
      setDetails('')
      setFile(null)
    }, 1100)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-3xl flex-col gap-5" noValidate>
        <StepCard step={1} title="What kind of thing happened?" hint="Pick the one that fits best.">
          <CategoryPicker value={category} onChange={setCategory} />
          {showErrors && !category && (
            <p role="alert" className="text-sm font-semibold text-destructive">
              Please pick a category so we know how to help.
            </p>
          )}
        </StepCard>

        <StepCard step={2} title="Who should receive this?" hint="Choose the fastest available counselor or send it privately to one counselor.">
          <Select value={assignedTo} onValueChange={(value) => setAssignedTo(value as TeacherId)}>
            <SelectTrigger aria-label="Choose a counselor" className="h-auto min-h-14 rounded-2xl border-2 border-sky-200 bg-sky-50 px-4 py-3 text-left">
              <SelectValue placeholder="Choose a counselor" />
            </SelectTrigger>
            <SelectContent>
              {COUNSELOR_OPTIONS.map((option) => (
                <SelectItem key={option.id} value={option.id} className="py-3">
                  <span className="flex flex-col gap-0.5">
                    <span className="font-semibold">{option.label}</span>
                    <span className="text-xs text-muted-foreground">{option.description}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </StepCard>

        <StepCard step={3} title="Tell us what happened..." hint="Share as much or as little as you want. Don't include your name.">
          <label htmlFor="details" className="sr-only">
            Incident details
          </label>
          <Textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Tell us what happened..."
            rows={6}
            maxLength={2000}
            aria-invalid={showErrors && detailsTooShort}
            className="min-h-36 rounded-2xl border-2 border-sunny-border bg-sunny p-4 text-base leading-relaxed placeholder:text-amber-700/50 focus-visible:border-amber-400 focus-visible:ring-amber-200"
          />
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-destructive" role="alert">
              {showErrors && detailsTooShort ? 'Please write at least a few words.' : ''}
            </span>
            <span className="text-muted-foreground">{details.length}/2000</span>
          </div>
        </StepCard>

        <StepCard step={4} title="Got a screenshot?" hint="Totally optional — it can help us understand.">
          <ScreenshotUpload
            file={file}
            onFileChange={setFile}
          />
        </StepCard>

        <StepCard step={5} title="Ready when you are" hint="Nobody will know it was you.">
          <Button
            type="submit"
            disabled={submitting}
            className="h-16 w-full rounded-2xl bg-go text-xl font-bold text-go-foreground shadow-[0_6px_0_0] shadow-emerald-700/40 transition-all hover:bg-go/90 active:translate-y-1 active:shadow-[0_2px_0_0] active:shadow-emerald-700/40"
          >
            {submitting ? (
              <>
                <Loader2 className="size-6 animate-spin" aria-hidden />
                Sending safely...
              </>
            ) : (
              'Send Anonymously 🚀'
            )}
          </Button>
        </StepCard>
      </form>

      <SuccessDialog
        report={submitted}
        onClose={() => setSubmitted(null)}
        onCheckReplies={(code) => {
          setSubmitted(null)
          onCheckReplies(code)
        }}
      />
    </>
  )
}
