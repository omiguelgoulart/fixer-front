"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AvatarLogout } from "./Avatar";

export default function Header() {
  const pathname = usePathname();
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setHasToken(!!token);
  }, []);

  const hiddenRoutes = ["/login"];
  const isHiddenRoute = hiddenRoutes.includes(pathname);

  // Se estiver numa rota oculta E não tiver token → não renderiza header
  if (hasToken === false && isHiddenRoute) return null;

  // Espera carregar o token do localStorage (evita piscar)
  if (hasToken === null) return null;

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
        <ul className="flex items-center space-x-6">
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
          <li>
            <Link href="/tecnico" className="hover:underline">
              Tecnico
            </Link>
          </li>
          <li className="flex items-center">
            <AvatarLogout />
          </li>
        </ul>
      </nav>
    </header>
  );
}
