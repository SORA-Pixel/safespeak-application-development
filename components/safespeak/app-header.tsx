'use client'

import Image from 'next/image'
import { useState } from 'react'
import { LogOut, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSafeSpeak } from './safespeak-provider'
import { StaffLoginDialog } from './staff-login-dialog'

export function AppHeader() {
  const { isStaff, logout } = useSafeSpeak()
  const [loginOpen, setLoginOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <Image
            src="/mascot.png"
            alt=""
            width={40}
            height={40}
            className="size-10 rounded-full bg-accent object-cover"
            priority
          />
          <span className="font-display text-xl font-semibold tracking-tight">SafeSpeak</span>
        </div>

        {isStaff ? (
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground sm:inline-flex">
              <ShieldCheck className="size-4" aria-hidden />
              Logged in as Staff
            </span>
            <Button variant="outline" onClick={logout}>
              <LogOut aria-hidden />
              Log Out
            </Button>
          </div>
        ) : (
          <Button variant="outline" className="rounded-full" onClick={() => setLoginOpen(true)}>
            {'Staff Login 🔒'}
          </Button>
        )}
      </div>
      <StaffLoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </header>
  )
}
