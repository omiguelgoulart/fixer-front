"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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

  const router = useRouter();

  async function handleLogin(data: LoginItf) {
    // console.log(`${data.email} ${data.senha}`)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, senha: data.senha }),
      });

      if (response.status == 200) {
        const dados = await response.json();
        console.log(dados);
        localStorage.setItem("token", dados.token);
        toast.success("Login realizado!");
        router.push("/dashboard");
        return;
      } else if (response.status == 401) {
        const dados = await response.json();
        console.log(dados);
        toast.error("Email ou senha inválidos");
        return;
      } else if (response.status == 500) {
        const dados = await response.json();
        console.log(dados);
        toast.error("Erro interno do servidor");
        return;
      }
      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message);
        return;
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast.error("Erro ao fazer login");
    }
  }

  return (
    <div className="w-full md:w-1/2 bg-white flex justify-center items-center min-h-[50vh] md:min-h-screen p-8 sm:p-12">
      <div className="w-full max-w-md space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center">
          Login
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit(handleLogin)}>
          <div>
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 block mb-1.5"
            >
              Email
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="seu@email.com"
              {...register("email", { required: "Email é obrigatório" })}
              className="w-full"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <Label
                htmlFor="senha"
                className="text-sm font-medium text-gray-700"
              >
                Senha
              </Label>
              <Link
                href="/esqueci-senha"
                className="text-sm text-blue-500 hover:underline"
              >
                Esqueceu a Senha?
              </Link>
            </div>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="senha"
                placeholder="digite a sua senha"
                {...register("senha", { required: "Senha é obrigatória" })}
                className="w-full pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {errors.senha && (
              <p className="text-sm text-red-500 mt-1">
                {errors.senha.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2.5 text-base font-medium"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
