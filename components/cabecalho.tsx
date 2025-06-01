import Image from "next/image"
import Link from "next/link"

export default function Cabecalho() {
  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 relative">
            <Image src="/placeholder.svg?height=32&width=32" alt="EIXEQ Logo" fill className="object-contain" />
          </div>
          <span className="font-bold text-xl">EIXEQ</span>
        </Link>

        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/planejamento" className="hover:underline font-medium">
                Planejamento
              </Link>
            </li>
            <li>
              <Link href="/ativos" className="hover:underline">
                Ativos
              </Link>
            </li>
            <li>
              <Link href="/funcionarios" className="hover:underline">
                Funcionarios
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
