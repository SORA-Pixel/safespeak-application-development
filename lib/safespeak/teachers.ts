export const TEACHER_NAMES = ['Mr. Alexis', 'Mr. Botto'] as const

export type TeacherName = (typeof TEACHER_NAMES)[number]

export function isTeacherName(value: string): value is TeacherName {
  return (TEACHER_NAMES as readonly string[]).includes(value)
}
