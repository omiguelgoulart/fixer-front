'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const publicRoutes = ['/login', '/esqueci-senha', '/redefinir-senha']

    const token = localStorage.getItem('token')

    if (!publicRoutes.includes(pathname) && !token) {
      router.replace('/login')
    }
  }, [pathname, router])

  return <>{children}</>
}
