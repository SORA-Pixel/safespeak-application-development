'use client'

import { useState } from 'react'
import { ImageOff, Maximize2, SendHorizonal, Sparkles, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { getCategory } from '@/lib/safespeak/categories'
import { RESPONSE_TEMPLATES } from '@/lib/safespeak/mock-data'
import type { Report } from '@/lib/safespeak/types'
import { useSafeSpeak } from '../safespeak-provider'
import { AssignedBadge, CategoryIcon, FormattedTime, MessageThread, UrgencyBadge } from '../shared'
import { StatusSelect } from './status-select'

export function ReportDetailSheet({ report, onClose }: { report: Report | null; onClose: () => void }) {
  return (
    <Sheet open={!!report} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="right"
        className="w-full gap-0 overflow-y-auto data-[side=right]:w-full data-[side=right]:sm:max-w-xl"
      >
        {report && <ReportDetail key={report.id} report={report} />}
      </SheetContent>
    </Sheet>
  )
}

function ReportDetail({ report }: { report: Report }) {
  const { updateStatus, sendMessage, staffName } = useSafeSpeak()
  const [reply, setReply] = useState('')

  function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return
    sendMessage(report.id, 'counselor', staffName ? `${staffName}: ${trimmed}` : trimmed)
    setReply('')
  }

  return (
    <>
      <SheetHeader className="border-b p-5">
        <div className="flex items-center gap-3 pr-8">
          <CategoryIcon category={report.category} className="size-11" />
          <div className="flex min-w-0 flex-col">
            <SheetTitle className="font-display text-xl">
              <span className="font-mono">{report.id}</span> · {getCategory(report.category).label}
            </SheetTitle>
            <SheetDescription>
              {'Received '}
              <FormattedTime value={report.createdAt} />
              {' · reply code '}
              <span className="font-mono font-semibold text-foreground">{report.code}</span>
            </SheetDescription>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <UrgencyBadge urgency={report.urgency} />
          <AssignedBadge teacher={report.assigned_teacher} isMine={report.assigned_teacher === staffName} />
          <StatusSelect
            value={report.status}
            onChange={(s) => updateStatus(report.id, s)}
            label="Report status"
          />
        </div>
      </SheetHeader>

      <div className="flex flex-col gap-6 p-5">
        <section
          aria-labelledby="triage-heading"
          className="flex flex-col gap-2 rounded-2xl border border-violet-200 bg-linear-to-br from-violet-50 to-sky-50 p-4"
        >
          <h3 id="triage-heading" className="flex items-center gap-1.5 text-sm font-semibold text-violet-800">
            <Sparkles className="size-4" aria-hidden />
            Gemini AI Triage Summary
          </h3>
          <p className="text-sm leading-relaxed text-foreground">{report.summary}</p>
        </section>

        <section aria-labelledby="student-msg-heading" className="flex flex-col gap-2">
          <h3 id="student-msg-heading" className="text-sm font-semibold text-muted-foreground">
            {"Student's message"}
          </h3>
          <p className="rounded-2xl bg-sunny p-4 text-sm leading-relaxed">{report.details}</p>
        </section>

        <section aria-labelledby="screenshot-heading" className="flex flex-col gap-2">
          <h3 id="screenshot-heading" className="text-sm font-semibold text-muted-foreground">
            Screenshot
          </h3>
          <AttachedScreenshot report={report} />
        </section>

        <section aria-labelledby="thread-heading" className="flex flex-col gap-3">
          <h3 id="thread-heading" className="text-sm font-semibold text-muted-foreground">
            Anonymous conversation
          </h3>
          <div aria-live="polite">
            <MessageThread
              messages={report.messages}
              viewer="counselor"
              emptyText="No messages yet. Send the first reply below."
            />
          </div>
        </section>

        <section aria-labelledby="reply-heading" className="flex flex-col gap-3 border-t pt-5">
          <h3 id="reply-heading" className="text-sm font-semibold">
            Reply to <span className="font-mono">{report.code}</span>
            {staffName && (
              <span className="ml-1 font-normal text-muted-foreground">{`· signed as ${staffName}`}</span>
            )}
          </h3>
          <div className="flex flex-wrap gap-2">
            {RESPONSE_TEMPLATES.map((t) => (
              <Button
                key={t}
                type="button"
                variant="outline"
                size="sm"
                className="h-auto max-w-full rounded-full py-1.5 text-left whitespace-normal"
                onClick={() => send(t)}
              >
                <Zap className="text-amber-500" aria-hidden />
                {t}
              </Button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(reply)
            }}
            className="flex flex-col gap-2"
          >
            <label htmlFor="counselor-reply" className="sr-only">
              Custom reply
            </label>
            <Textarea
              id="counselor-reply"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Write a kind, anonymous reply..."
              rows={3}
              maxLength={1000}
            />
            <Button type="submit" disabled={!reply.trim()} className="self-end">
              <SendHorizonal aria-hidden />
              Send Reply
            </Button>
          </form>
        </section>
      </div>
    </>
  )
}

function AttachedScreenshot({ report }: { report: Report }) {
  const shot = report.screenshot
  if (!shot) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed bg-muted/50 py-8 text-sm text-muted-foreground">
        <ImageOff className="size-6" aria-hidden />
        No screenshot attached
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-2 rounded-2xl border bg-muted/50 p-3">
      <a href={shot.url} target="_blank" rel="noopener noreferrer" className="flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element -- may be a local blob URL */}
        <img
          src={shot.url}
          alt={`Screenshot attached to report ${report.id}`}
          className="max-h-[28rem] w-auto rounded-xl object-contain"
        />
      </a>
      <a
        href={shot.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 self-end text-xs font-semibold text-primary underline-offset-4 hover:underline"
      >
        <Maximize2 className="size-3.5" aria-hidden />
        Open full size
      </a>
    </div>
  )
}
