import Link from "next/link"
import Image from "next/image"

// Server Component para o cabeçalho
export default function Header() {
  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <div className="relative w-8 h-8 mr-2">
            <Image
              src="/logo_branco.png"
              alt="FIXER Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <span className="font-bold text-xl">FIXER</span>
        </Link>
      </div>
      <nav>
        <ul className="flex space-x-6">
          <li>
            <Link href="/dashboard" className="hover:underline">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/planejamento" className="hover:underline">
              Planejamento
            </Link>
          </li>
          <li>
            <Link href="/ativos" className="hover:underline">
              Ativos
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
