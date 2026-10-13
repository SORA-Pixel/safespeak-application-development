'use client'

import { useState } from 'react'
import { KeyRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { STAFF_PASSCODE, useSafeSpeak } from './safespeak-provider'

interface StaffLoginDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function StaffLoginDialog({ open, onOpenChange }: StaffLoginDialogProps) {
  const { login } = useSafeSpeak()
  const [passcode, setPasscode] = useState('')
  const [error, setError] = useState('')

  function handleOpenChange(next: boolean) {
    if (!next) {
      setPasscode('')
      setError('')
    }
    onOpenChange(next)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (login(passcode)) {
      handleOpenChange(false)
    } else {
      setError("That passcode didn't work. Please try again.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <div className="mb-1 flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <KeyRound className="size-5" aria-hidden />
          </div>
          <DialogTitle className="font-display text-xl">Staff Login</DialogTitle>
          <DialogDescription>Counselors and staff only. Enter your passcode to open the dashboard.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="staff-passcode">Passcode</Label>
            <Input
              id="staff-passcode"
              type="password"
              autoComplete="current-password"
              autoFocus
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value)
                setError('')
              }}
              aria-invalid={!!error}
              aria-describedby="passcode-hint passcode-error"
              className="h-10"
            />
            <p id="passcode-error" role="alert" className="min-h-4 text-xs font-medium text-destructive">
              {error}
            </p>
          </div>
          <Button type="submit" size="lg" className="h-10">
            Unlock Dashboard
          </Button>
          <p id="passcode-hint" className="text-center text-xs text-muted-foreground">
            Default Passcode: <span className="font-mono font-semibold">{STAFF_PASSCODE}</span>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
