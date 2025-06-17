"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AvatarLogout } from "./Avatar";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, UserCircle, LogOut } from "lucide-react";

// Itens de navegação para reutilização no menu desktop e mobile
const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/planejamento", label: "Planejamento" },
  { href: "/ativos", label: "Ativos" },
  { href: "/funcionarios", label: "Funcionários" },
];

export default function Header() {
  const pathname = usePathname();
  const [hasToken, setHasToken] = useState<boolean | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false); // Estado para controlar o menu mobile

  useEffect(() => {
    const token = localStorage.getItem("token");
    setHasToken(!!token);
  }, []);

  const hiddenRoutes = ["/login", "/", "/esqueci-senha", "/redefinir-senha"]; // Adicione outras rotas se necessário
  const isHiddenRoute = hiddenRoutes.includes(pathname);

  if (isHiddenRoute || hasToken === null) {
    return null;
  }

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <Image
              src="/logo_branco.png" // Certifique-se que este caminho em /public está correto
              alt="FIXER Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-bold text-2xl hidden sm:inline">FIXER</span>
        </Link>
      </div>

      {/* NAVEGAÇÃO DESKTOP (visível em telas médias e maiores) */}
      <nav className="hidden md:flex items-center space-x-6 text-base font-medium">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="transition-colors hover:text-gray-200">
            {item.label}
          </Link>
        ))}
        {/* O AvatarLogout é seu componente existente para o menu de usuário desktop */}
        <AvatarLogout />
      </nav>

      {/* MENU HAMBÚRGUER (visível apenas em telas pequenas) */}
      <div className="md:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-blue-500/50 text-white">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] bg-blue-600 text-white border-r-blue-500 p-0">
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
              
              {/* Seção "Minha Conta" no final do menu */}
              <div className="mt-auto border-t border-blue-500 pt-4">
                <div className="font-semibold mb-2 px-3">Minha Conta</div>
                {/* Aqui você pode adicionar as informações do seu componente AvatarLogout */}
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
                      // Adicione sua lógica de logout aqui
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
    </header>
  );
}