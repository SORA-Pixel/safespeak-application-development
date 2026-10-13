'use client'

import { AppHeader } from './app-header'
import { CounselorDashboard } from './dashboard/counselor-dashboard'
import { SafeSpeakProvider, useSafeSpeak } from './safespeak-provider'
import { StudentPortal } from './student/student-portal'

function CurrentView() {
  const { isStaff } = useSafeSpeak()
  return (
    <main
      key={isStaff ? 'staff' : 'student'}
      className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 animate-in fade-in slide-in-from-bottom-2 duration-300 md:py-10"
    >
      {isStaff ? <CounselorDashboard /> : <StudentPortal />}
    </main>
  )
}

export function SafeSpeakApp() {
  return (
    <SafeSpeakProvider>
      <div className="flex min-h-dvh flex-col">
        <AppHeader />
        <CurrentView />
        <footer className="border-t px-4 py-6 text-center text-sm text-muted-foreground">
          {'In an emergency, tell a trusted adult right away or call 911.'}
        </footer>
      </div>
    </SafeSpeakProvider>
  )
}
