'use client'

import { useId, useState, useTransition } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { changeStaffPassword } from '@/app/actions/staff-auth'
import { StaffAccountPicker } from './staff-account-picker'

interface ChangePasswordFormProps {
  defaultUsername?: string
  lockUsername?: boolean
  onDone?: () => void
  doneLabel?: string
}

export function ChangePasswordForm({
  defaultUsername = '',
  lockUsername = false,
  onDone,
  doneLabel = 'Back to login',
}: ChangePasswordFormProps) {
  const ids = useId()
  const [username, setUsername] = useState(defaultUsername)
  const [staffId, setStaffId] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [pending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    if (!username) return setError('Please choose your staff account.')
    if (!staffId.trim()) return setError('Please enter your Staff ID Code.')
    if (password !== confirm) return setError("The new passwords don't match.")
    startTransition(async () => {
      const result = await changeStaffPassword(username, staffId, password)
      if (result.ok) {
        setSuccess(true)
        setStaffId('')
        setPassword('')
        setConfirm('')
      } else {
        setError(result.error)
      }
    })
  }

  if (success) {
    return (
      <div className="flex flex-col items-center gap-3 py-2 text-center" role="status">
        <CheckCircle2 className="size-10 text-go" aria-hidden />
        <p className="font-semibold">{`Password updated for ${username}.`}</p>
        <p className="text-sm text-muted-foreground">Use your new password the next time you log in.</p>
        {onDone && (
          <Button type="button" className="mt-1 w-full" onClick={onDone}>
            {doneLabel}
          </Button>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {lockUsername ? (
        <p className="rounded-xl bg-muted px-3 py-2 text-sm">
          {'Account: '}
          <span className="font-semibold">{username}</span>
        </p>
      ) : (
        <StaffAccountPicker name={`${ids}-user`} value={username} onChange={setUsername} />
      )}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`${ids}-staffid`}>Staff ID Code</Label>
        <Input
          id={`${ids}-staffid`}
          value={staffId}
          onChange={(e) => setStaffId(e.target.value)}
          placeholder="e.g. STAFF-0000"
          autoComplete="off"
          className="h-10 font-mono uppercase"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`${ids}-new`}>New password</Label>
        <Input
          id={`${ids}-new`}
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-10"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`${ids}-confirm`}>Confirm new password</Label>
        <Input
          id={`${ids}-confirm`}
          type="password"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="h-10"
        />
      </div>
      <p role="alert" className="min-h-4 text-xs font-medium text-destructive">
        {error}
      </p>
      <Button type="submit" size="lg" className="h-10" disabled={pending}>
        {pending && <Loader2 className="animate-spin" aria-hidden />}
        Update Password
      </Button>
    </form>
  )
}
