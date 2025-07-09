"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUsuario } from "@/app/contexts/UsuarioContex";
import { useLogin } from "../stores/useLogin";

type LoginItf = {
  email: string;
  senha: string;
};

export function FormLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginItf>();
  const { login } = useLogin();
  const { logarUsuario } = useUsuario();
  const router = useRouter();

  async function handleLogin(data: LoginItf) {
    const usuario = await login(data.email, data.senha, logarUsuario);

    if (usuario) {
      // Garantir atualização do contexto antes de redirecionar
      setTimeout(() => {
        router.push(usuario.tipo === "TECNICO" ? "/tecnico" : "/dashboard");
      }, 0);
    }
  }

  return (
    <div className="w-full md:w-1/2 bg-white flex justify-center items-center min-h-[50vh] md:min-h-screen p-8 sm:p-12">
      <div className="w-full max-w-md space-y-6">
        <h2 className="text-3xl font-semibold text-center text-primary">Login</h2>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register("email", { required: "Email é obrigatório" })}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <Label htmlFor="senha">Senha</Label>
              <Link
                href="/login/esqueci-senha"
                className="text-sm text-muted-foreground hover:underline"
              >
                Esqueceu a senha?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="senha"
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                className="pr-10"
                {...register("senha", { required: "Senha é obrigatória" })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2.5 text-muted-foreground hover:text-primary"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            {errors.senha && (
              <p className="text-sm text-destructive">{errors.senha.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
