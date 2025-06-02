"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      // Usuário não autenticado, redireciona para login
      router.replace("/login")
    } else {
      // Usuário autenticado, redireciona para dashboard
      router.replace("/dashboard")
    }
  }, [router])

  return (
    <div className="flex items-center justify-center h-screen text-gray-500 text-sm">
      Redirecionando...
    </div>
  )
}
