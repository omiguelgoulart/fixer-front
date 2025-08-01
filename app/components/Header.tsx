"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AvatarLogout } from "./Avatar";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, UserCircle, LogOut } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/planejamento", label: "Planejamento" },
  { href: "/ativos", label: "Ativos" },
  { href: "/funcionarios", label: "Funcionários" },
];

export default function Header() {
  const pathname = usePathname();
  const [hasToken, setHasToken] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setHasToken(!!token);
  }, []);

  const hiddenRoutes = ["/login", "/", "/login/esqueci-senha", "/login/redefinir-senha"];
  const isHiddenRoute = hiddenRoutes.includes(pathname);
  const isTecnicoRoute = pathname.startsWith("/tecnico");

  // Se for uma rota oculta ou não tiver token, não renderiza nada
  if (!hasToken || isHiddenRoute) return null;

  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-2">
        <div className="relative w-8 h-8">
          <Image src="/logo_branco.png" alt="FIXER Logo" fill className="object-contain" />
        </div>
        {!isTecnicoRoute && (
          <span className="font-bold text-xl hidden sm:inline">FIXER</span>
        )}
      </div>

      {isTecnicoRoute ? (
        <AvatarLogout />
      ) : (
        <>
          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center space-x-6 text-base font-medium">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-gray-200">
                {item.label}
              </Link>
            ))}
            <AvatarLogout />
          </nav>

          {/* Menu Mobile */}
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-blue-500/50 text-white">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[280px] bg-blue-600 text-white border-r-blue-500 p-0">
                <SheetHeader className="p-4 border-b border-blue-500">
                  <SheetTitle className="text-xl font-bold text-white text-left">Menu</SheetTitle>
                </SheetHeader>
                <div className="p-4 flex h-full flex-col">
                  <nav className="flex flex-col gap-2 text-base">
                    {navItems.map((item) => (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={item.href}
                          className="p-3 rounded-md transition-colors hover:bg-blue-500"
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="mt-auto border-t border-blue-500 pt-4">
                    <div className="font-semibold mb-2 px-3">Minha Conta</div>
                    <SheetClose asChild>
                      <Link href="/perfil" className="flex items-center gap-3 p-3 rounded-md transition-colors hover:bg-blue-500">
                        <UserCircle className="h-5 w-5" />
                        <span>Meu Perfil</span>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <button
                        className="w-full flex items-center gap-3 p-3 rounded-md transition-colors hover:bg-blue-500 text-left"
                        onClick={() => {
                          console.log("Logout clicado");
                        }}
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Sair</span>
                      </button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </>
      )}
    </header>
  );
}
