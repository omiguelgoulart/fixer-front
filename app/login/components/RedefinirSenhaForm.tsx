"use client";

import React, { useState, useEffect, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";
import { validaSenha } from "@/app/utils/types/validaSenha";
import { useLogin } from "../stores/useLogin";

const resetPasswordClientSchema = z
  .object({
    email: z.string().email({ message: "Formato de e-mail inválido." }),
    codigoRecuperacao: z
      .string()
      .length(6, { message: "O código de recuperação deve ter 6 dígitos." }),
    novaSenha: z
      .string()
      .min(1, { message: "Nova senha é obrigatória." }),
    confirmarNovaSenha: z
      .string()
      .min(1, { message: "Confirmação de senha é obrigatória." }),
  })
  .refine((data) => data.novaSenha === data.confirmarNovaSenha, {
    message: "As senhas não coincidem.",
    path: ["confirmarNovaSenha"],
  });

export default function RedefinirSenhaForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { redefinirSenha } = useLogin();

  const [formData, setFormData] = useState({
    email: "",
    codigoRecuperacao: "",
    novaSenha: "",
    confirmarNovaSenha: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string[] | undefined>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const emailFromUrl = searchParams.get("email");
    if (emailFromUrl) {
      setFormData((prev) => ({ ...prev, email: emailFromUrl }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const displayFieldErrors = (fieldName: keyof typeof formData) => {
    return formErrors[fieldName]?.map((error, index) => (
      <p key={`${fieldName}-error-${index}`} className="text-xs text-red-500 mt-1">
        {error}
      </p>
    ));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors({});
    setSuccessMessage(null);

    const policyErrors = validaSenha(formData.novaSenha);
    if (policyErrors.length > 0) {
      setFormErrors((prev) => ({ ...prev, novaSenha: policyErrors }));
      toast.error("A nova senha não atende aos critérios de segurança.");
      return;
    }

    const validation = resetPasswordClientSchema.safeParse(formData);
    if (!validation.success) {
      setFormErrors(validation.error.flatten().fieldErrors);
      toast.error("Por favor, corrija os erros no formulário.");
      return;
    }

    setIsLoading(true);

    const ok = await redefinirSenha({
      email: validation.data.email,
      codigoRecuperacao: validation.data.codigoRecuperacao,
      novaSenha: validation.data.novaSenha,
      confirmacaoNovaSenha: validation.data.confirmarNovaSenha,
    });

    if (ok) {
      setSuccessMessage("Senha redefinida com sucesso! Você será redirecionado...");
      setFormData((prev) => ({
        ...prev,
        codigoRecuperacao: "",
        novaSenha: "",
        confirmarNovaSenha: "",
      }));

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }

    setIsLoading(false);
  };

  if (successMessage) {
    return (
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-green-600">Sucesso!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-700 dark:text-gray-300">{successMessage}</p>
        </CardContent>
        <CardFooter>
          <Link href="/login" className="w-full">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Ir para o Login
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-blue-500">Redefinir Senha</CardTitle>
        <CardDescription>
          Informe seu e-mail, o código de 6 dígitos recebido e sua nova senha.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="email" className="text-blue-500 font-bold">E-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading || !!searchParams.get("email")}
              required
              placeholder="seu@email.com"
            />
            {displayFieldErrors("email")}
          </div>

          <div className="space-y-1">
            <Label htmlFor="codigoRecuperacao" className="text-blue-500 font-bold">
              Código de Recuperação
            </Label>
            <Input
              id="codigoRecuperacao"
              name="codigoRecuperacao"
              type="text"
              maxLength={6}
              autoComplete="one-time-code"
              value={formData.codigoRecuperacao}
              onChange={handleChange}
              disabled={isLoading}
              required
              placeholder="Código de 6 dígitos"
            />
            {displayFieldErrors("codigoRecuperacao")}
          </div>

          <div className="space-y-1">
            <Label htmlFor="novaSenha" className="text-blue-500 font-bold">Nova Senha</Label>
            <Input
              id="novaSenha"
              name="novaSenha"
              type="password"
              value={formData.novaSenha}
              onChange={handleChange}
              disabled={isLoading}
              required
              placeholder="Digite sua nova senha"
            />
            {displayFieldErrors("novaSenha")}
          </div>

          <div className="space-y-1">
            <Label htmlFor="confirmarNovaSenha" className="text-blue-500 font-bold">
              Confirmar Nova Senha
            </Label>
            <Input
              id="confirmarNovaSenha"
              name="confirmarNovaSenha"
              type="password"
              value={formData.confirmarNovaSenha}
              onChange={handleChange}
              disabled={isLoading}
              required
              placeholder="Confirme sua nova senha"
            />
            {displayFieldErrors("confirmarNovaSenha")}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 pt-4">
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Redefinindo..." : "Redefinir Senha"}
          </Button>
          <Link
            href="/login"
            className="text-sm text-center text-blue-500 hover:text-blue-700"
          >
            Lembrou a senha? Voltar para o Login
          </Link>
        </CardFooter>
      </form>
    </Card>
  );
}
