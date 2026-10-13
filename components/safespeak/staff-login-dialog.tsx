'use client'

import { useState } from 'react'
import { KeyRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSafeSpeak } from './safespeak-provider'

export function StaffLoginDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { login, resetPassword } = useSafeSpeak()
  const [tab, setTab] = useState<'login' | 'reset'>('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [staffId, setStaffId] = useState('')
  const [nextPassword, setNextPassword] = useState('')
  const [message, setMessage] = useState('')
  const submit = (e: React.FormEvent) => { e.preventDefault(); const ok = tab === 'login' ? login(username, password) : resetPassword(staffId, nextPassword); setMessage(ok ? (tab === 'login' ? '' : 'Password updated. You can now sign in.') : tab === 'login' ? 'That username or password did not work.' : 'Check the staff ID and use at least 6 characters.'); if (ok && tab === 'login') onOpenChange(false) }
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="sm:max-w-sm"><DialogHeader><div className="mb-1 flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground"><KeyRound className="size-5" aria-hidden /></div><DialogTitle className="font-display text-xl">Staff Login</DialogTitle><DialogDescription>Counselors and staff only. Use your staff account to open the dashboard.</DialogDescription></DialogHeader><div className="grid grid-cols-2 rounded-lg bg-muted p-1 text-sm"><button type="button" className={tab === 'login' ? 'rounded-md bg-background py-2 font-semibold shadow-sm' : 'py-2 text-muted-foreground'} onClick={() => { setTab('login'); setMessage('') }}>Sign in</button><button type="button" className={tab === 'reset' ? 'rounded-md bg-background py-2 font-semibold shadow-sm' : 'py-2 text-muted-foreground'} onClick={() => { setTab('reset'); setMessage('') }}>Reset password</button></div><form onSubmit={submit} className="flex flex-col gap-3">{tab === 'login' ? <><div className="flex flex-col gap-1.5"><Label htmlFor="staff-username">Username</Label><Input id="staff-username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Mr. Alexis" autoFocus /></div><div className="flex flex-col gap-1.5"><Label htmlFor="staff-password">Password</Label><Input id="staff-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" /></div><Button type="submit" size="lg">Unlock Dashboard</Button><p className="text-xs text-muted-foreground">Demo accounts: Mr. Alexis / staff_124 and Mr. Botto / staff_123</p></> : <><div className="flex flex-col gap-1.5"><Label htmlFor="staff-id">Staff ID</Label><Input id="staff-id" value={staffId} onChange={(e) => setStaffId(e.target.value)} placeholder="STAFF-9901" autoFocus /></div><div className="flex flex-col gap-1.5"><Label htmlFor="new-password">New password</Label><Input id="new-password" type="password" value={nextPassword} onChange={(e) => setNextPassword(e.target.value)} /></div><Button type="submit" size="lg">Update password</Button></>}<p role="alert" className="min-h-4 text-xs font-medium text-destructive">{message}</p></form></DialogContent></Dialog>
}
