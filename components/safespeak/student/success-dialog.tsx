'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { Report } from '@/lib/safespeak/types'

export function SuccessDialog({
  report,
  onClose,
  onCheckReplies,
}: {
  report: Report | null
  onClose: () => void
  onCheckReplies: (code: string) => void
}) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    if (!report) return
    try {
      await navigator.clipboard.writeText(report.code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <Dialog open={!!report} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="text-center sm:max-w-md">
        <DialogHeader className="items-center">
          <Image
            src="/mascot.png"
            alt=""
            width={96}
            height={96}
            className="size-20 rounded-full bg-accent object-cover animate-in zoom-in duration-500"
          />
          <DialogTitle className="font-display text-2xl">{'You did a brave thing!'}</DialogTitle>
          <DialogDescription className="text-base">
            {'Your report was sent anonymously. Save this secret code — it\u2019s the only way to read replies from a counselor.'}
          </DialogDescription>
        </DialogHeader>

        {report && (
          <div className="flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-sunny-border bg-sunny p-5">
            <span className="text-xs font-bold tracking-widest text-amber-800 uppercase">Your secret code</span>
            <span className="font-mono text-2xl font-bold tracking-wider text-foreground md:text-3xl">{report.code}</span>
            <Button type="button" variant="outline" size="sm" onClick={copy} className="bg-white">
              {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
              {copied ? 'Copied!' : 'Copy code'}
            </Button>
            <span className="sr-only" aria-live="polite">
              {copied ? 'Code copied to clipboard' : ''}
            </span>
          </div>
        )}

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button className="h-11 w-full text-base" onClick={() => report && onCheckReplies(report.code)}>
            Check Replies
          </Button>
          <Button variant="ghost" className="w-full" onClick={onClose}>
            {"I'm done for now"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
