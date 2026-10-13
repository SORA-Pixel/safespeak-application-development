'use client'

import { useState, useTransition } from 'react'
import { KeyRound, Loader2 } from 'lucide-react'
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
import { verifyStaffLogin } from '@/app/actions/staff-auth'
import { ChangePasswordForm } from './change-password-form'
import { useSafeSpeak } from './safespeak-provider'
import { StaffAccountPicker } from './staff-account-picker'

interface StaffLoginDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function StaffLoginDialog({ open, onOpenChange }: StaffLoginDialogProps) {
  const { login } = useSafeSpeak()
  const [mode, setMode] = useState<'login' | 'change'>('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [pending, startTransition] = useTransition()

  function handleOpenChange(next: boolean) {
    if (!next) {
      setMode('login')
      setPassword('')
      setError('')
    }
    onOpenChange(next)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!username) return setError('Please choose your staff account.')
    startTransition(async () => {
      const result = await verifyStaffLogin(username, password)
      if (result.ok) {
        login(username)
        handleOpenChange(false)
      } else {
        setError(result.error)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <div className="mb-1 flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <KeyRound className="size-5" aria-hidden />
          </div>
          <DialogTitle className="font-display text-xl">
            {mode === 'login' ? 'Staff Login' : 'Reset / Change Password'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'login'
              ? 'Counselors and staff only. Choose your account and enter your password.'
              : 'Enter your Staff ID Code to set a new password.'}
          </DialogDescription>
        </DialogHeader>

        {mode === 'login' ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <StaffAccountPicker
              name="login-user"
              value={username}
              onChange={(v) => {
                setUsername(v)
                setError('')
              }}
            />
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="staff-password">Password</Label>
              <Input
                id="staff-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                aria-invalid={!!error}
                aria-describedby="password-error"
                className="h-10"
              />
              <p id="password-error" role="alert" className="min-h-4 text-xs font-medium text-destructive">
                {error}
              </p>
            </div>
            <Button type="submit" size="lg" className="h-10" disabled={pending}>
              {pending && <Loader2 className="animate-spin" aria-hidden />}
              Unlock Dashboard
            </Button>
            <Button type="button" variant="link" size="sm" onClick={() => setMode('change')}>
              Reset / Change Password
            </Button>
          </form>
        ) : (
          <div className="flex flex-col gap-2">
            <ChangePasswordForm defaultUsername={username} onDone={() => setMode('login')} />
            <Button type="button" variant="link" size="sm" onClick={() => setMode('login')}>
              Back to login
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
