"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUsuario } from "../contexts/UsuarioContex";

export function AvatarLogout() {
  const router = useRouter();
  const { usuario, deslogarUsuario } = useUsuario();

  const getIniciais = (nome: string) => {
    const palavras = nome.trim().split(" ");
    if (palavras.length === 1) return palavras[0][0].toUpperCase();
    return (palavras[0][0] + palavras[1][0]).toUpperCase();
  };

  const handleLogout = () => {
    deslogarUsuario();
    toast.success("Logout realizado com sucesso.");
    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer bg-blue-100 text-blue-800">
          <AvatarFallback>
            {usuario?.nome ? getIniciais(usuario.nome) : "US"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-500 focus:text-red-500"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
