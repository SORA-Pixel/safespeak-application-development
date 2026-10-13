'use server'

import { createHash, timingSafeEqual } from 'node:crypto'
import { isTeacherName, type TeacherName } from '@/lib/safespeak/teachers'

const STAFF_IDS: Record<TeacherName, string> = {
  'Mr. Alexis': 'STAFF-9901',
  'Mr. Botto': 'STAFF-9902',
}

// Changed passwords live in server memory only (resets when the server restarts).
const passwordOverrides = new Map<TeacherName, string>()

const MIN_PASSWORD_LENGTH = 6

type Result = { ok: true } | { ok: false; error: string }

function safeEqual(a: string, b: string) {
  const ha = createHash('sha256').update(a).digest()
  const hb = createHash('sha256').update(b).digest()
  return timingSafeEqual(ha, hb)
}

function currentPassword(name: TeacherName) {
  return passwordOverrides.get(name) ?? process.env.Staff_9901 ?? ''
}

function normalizeStaffId(id: string) {
  return id.trim().toUpperCase().replace(/[_\s]/g, '-')
}

export async function verifyStaffLogin(username: string, password: string): Promise<Result> {
  if (!isTeacherName(username)) return { ok: false, error: 'Please choose your staff account.' }
  const expected = currentPassword(username)
  if (!expected) return { ok: false, error: 'Staff passwords are not configured on the server.' }
  if (!safeEqual(password, expected)) {
    return { ok: false, error: "That password didn't work. Please try again." }
  }
  return { ok: true }
}

export async function changeStaffPassword(
  username: string,
  staffId: string,
  newPassword: string,
): Promise<Result> {
  if (!isTeacherName(username)) return { ok: false, error: 'Please choose your staff account.' }
  if (!safeEqual(normalizeStaffId(staffId), STAFF_IDS[username])) {
    return { ok: false, error: "That Staff ID Code doesn't match this account." }
  }
  if (newPassword.length < MIN_PASSWORD_LENGTH) {
    return { ok: false, error: `New password must be at least ${MIN_PASSWORD_LENGTH} characters.` }
  }
  passwordOverrides.set(username, newPassword)
  return { ok: true }
}
