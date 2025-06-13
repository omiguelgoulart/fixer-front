'use client'

import AuthGuard from "./AuthGuard"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      {children}
    </AuthGuard>
  )
}
