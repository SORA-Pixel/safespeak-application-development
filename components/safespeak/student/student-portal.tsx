'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Inbox, PencilLine } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CheckReplies } from './check-replies'
import { ReportForm } from './report-form'

export function StudentPortal() {
  const [tab, setTab] = useState<string>('report')
  const [prefillCode, setPrefillCode] = useState('')

  function openReplies(code: string) {
    setPrefillCode(code)
    setTab('replies')
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="relative overflow-hidden rounded-3xl border bg-linear-to-br from-violet-100 via-pink-50 to-teal-50 p-6 md:p-10">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
          <Image
            src="/mascot.png"
            alt="Ollie the owl, the SafeSpeak mascot, holding a heart"
            width={160}
            height={160}
            className="size-28 shrink-0 rounded-full border-4 border-white bg-white object-cover shadow-sm md:size-36"
            priority
          />
          <div className="flex flex-col gap-2">
            <h1 className="text-balance text-3xl font-semibold leading-tight md:text-5xl">
              {'Hey Friend! Need to talk?'}
              <span className="block text-primary">{"We're listening."}</span>
            </h1>
            <p className="max-w-xl text-pretty text-base text-muted-foreground md:text-lg">
              {"Tell us what's going on — no name, no login, no trouble. A real school counselor will read it and can write back to you secretly."}
            </p>
          </div>
        </div>
      </section>

      <Tabs value={tab} onValueChange={(v) => setTab(String(v))} className="gap-6">
        <TabsList className="mx-auto h-12 rounded-full p-1">
          <TabsTrigger value="report" className="h-10 rounded-full px-5 text-base">
            <PencilLine aria-hidden />
            Share Something
          </TabsTrigger>
          <TabsTrigger value="replies" className="h-10 rounded-full px-5 text-base">
            <Inbox aria-hidden />
            Check Replies
          </TabsTrigger>
        </TabsList>
        <TabsContent value="report" className="animate-in fade-in duration-300">
          <ReportForm onCheckReplies={openReplies} />
        </TabsContent>
        <TabsContent value="replies" className="animate-in fade-in duration-300">
          <CheckReplies key={prefillCode} initialCode={prefillCode} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
