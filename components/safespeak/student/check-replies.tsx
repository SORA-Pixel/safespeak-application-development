'use client'

import { useState } from 'react'
import { LockKeyhole, Search, SendHorizonal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { getCategory } from '@/lib/safespeak/categories'
import { DEMO_CODE } from '@/lib/safespeak/mock-data'
import { useSafeSpeak } from '../safespeak-provider'
import { CategoryIcon, FormattedTime, MessageThread } from '../shared'

const STATUS_COPY = {
  Pending: { text: 'Waiting for a counselor', className: 'bg-amber-100 text-amber-800' },
  'In Progress': { text: 'A counselor is on it', className: 'bg-violet-100 text-violet-800' },
  Resolved: { text: 'Resolved', className: 'bg-emerald-100 text-emerald-800' },
} as const

export function CheckReplies({ initialCode }: { initialCode: string }) {
  const { findByCode, sendMessage } = useSafeSpeak()
  const [code, setCode] = useState(initialCode)
  const [activeCode, setActiveCode] = useState(initialCode)
  const [notFound, setNotFound] = useState(false)
  const [reply, setReply] = useState('')

  const report = activeCode ? findByCode(activeCode) : undefined

  function lookup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const found = findByCode(code)
    setNotFound(!found)
    setActiveCode(found ? found.code : '')
  }

  function sendReply(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!report || !reply.trim()) return
    sendMessage(report.id, 'student', reply.trim())
    setReply('')
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5">
      <form onSubmit={lookup} className="flex flex-col gap-3 rounded-3xl border bg-card p-5 shadow-xs md:p-6">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <LockKeyhole className="size-5" aria-hidden />
          </span>
          <div>
            <h2 className="text-xl font-semibold">Enter your secret code</h2>
            <p className="text-sm text-muted-foreground">{"It looks like SAFE-FRIEND-88."}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label htmlFor="secret-code" className="sr-only">
            Secret code
          </label>
          <Input
            id="secret-code"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase())
              setNotFound(false)
            }}
            placeholder="SAFE-XXXX-00"
            autoComplete="off"
            spellCheck={false}
            aria-invalid={notFound}
            className="h-12 flex-1 rounded-xl font-mono text-lg tracking-wider uppercase"
          />
          <Button type="submit" className="h-12 rounded-xl px-6 text-base">
            <Search aria-hidden />
            Open
          </Button>
        </div>
        <p role="alert" className="text-sm font-semibold text-destructive empty:hidden">
          {notFound ? "Hmm, we couldn't find that code. Double-check the spelling!" : ''}
        </p>
        <p className="text-xs text-muted-foreground">
          {'Just testing? Try '}
          <button
            type="button"
            className="font-mono font-semibold text-primary underline-offset-2 hover:underline"
            onClick={() => setCode(DEMO_CODE)}
          >
            {DEMO_CODE}
          </button>
        </p>
      </form>

      {report && (
        <section
          aria-label="Your conversation"
          className="flex flex-col gap-4 rounded-3xl border bg-card p-5 shadow-xs animate-in fade-in slide-in-from-bottom-2 md:p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
            <div className="flex items-center gap-3">
              <CategoryIcon category={report.category} className="size-10" />
              <div className="flex flex-col">
                <span className="font-display font-semibold">{getCategory(report.category).label}</span>
                <span className="text-xs text-muted-foreground">
                  {'Sent '}
                  <FormattedTime value={report.createdAt} />
                </span>
              </div>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${STATUS_COPY[report.status].className}`}>
              {STATUS_COPY[report.status].text}
            </span>
          </div>

          <div aria-live="polite">
            <MessageThread
              messages={report.messages}
              viewer="student"
              emptyText="No replies yet. A counselor will write back here soon — check again later!"
            />
          </div>

          <form onSubmit={sendReply} className="flex flex-col gap-2 border-t pt-4">
            <label htmlFor="student-reply" className="text-sm font-semibold">
              Write back (still anonymous)
            </label>
            <Textarea
              id="student-reply"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Type a message..."
              rows={3}
              maxLength={1000}
              className="rounded-xl border-sunny-border bg-sunny"
            />
            <Button type="submit" disabled={!reply.trim()} className="self-end rounded-xl">
              <SendHorizonal aria-hidden />
              Send
            </Button>
          </form>
        </section>
      )}
    </div>
  )
}
