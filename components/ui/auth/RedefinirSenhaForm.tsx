"use client";

import React, { useState, useEffect, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
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

const resetPasswordClientSchema = z.object({
  email: z.string().email({ message: "Formato de e-mail inválido." }),
  codigoRecuperacao: z.string().length(6, { message: "O código de recuperação deve ter 6 dígitos." }),
  novaSenha: z.string().min(1, { message: "Nova senha é obrigatória." }), 
  confirmarNovaSenha: z.string().min(1, { message: "Confirmação de senha é obrigatória." }),
}).refine(data => data.novaSenha === data.confirmarNovaSenha, {
  message: "As senhas não coincidem.",
  path: ["confirmarNovaSenha"],
});

export default function RedefinirSenhaForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    email: '',
    codigoRecuperacao: '',
    novaSenha: '',
    confirmarNovaSenha: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string[] | undefined>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);


  useEffect(() => {
    const emailFromUrl = searchParams.get('email');
    if (emailFromUrl) {
      setFormData(prev => ({ ...prev, email: emailFromUrl }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors({});
    setSuccessMessage(null);

    const passwordPolicyErrors = validaSenha(formData.novaSenha);
    if (passwordPolicyErrors.length > 0) {
        setFormErrors(prev => ({ ...prev, novaSenha: passwordPolicyErrors }));
        toast.error("A nova senha não atende aos critérios de segurança. Verifique os erros abaixo do campo.");
        return;
    }

    const validationResult = resetPasswordClientSchema.safeParse(formData);
    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      setFormErrors(prev => ({ ...prev, ...errors }));
      toast.error("Por favor, corrija os erros no formulário.");
      return;
    }

    setIsLoading(true);
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    const endpoint = `${apiBaseUrl}/auth/recuperar-senha`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: validationResult.data.email,
          codigoRecuperacao: validationResult.data.codigoRecuperacao,
          novaSenha: validationResult.data.novaSenha,
          confirmacaoNovaSenha: validationResult.data.confirmarNovaSenha,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        toast.success(data.message || "Senha redefinida com sucesso!");
        setSuccessMessage(data.message || "Sua senha foi redefinida com sucesso! Você será redirecionado para o login em instantes.");
        setFormData(prev => ({ ...prev, codigoRecuperacao: '', novaSenha: '', confirmarNovaSenha: '' }));
        setTimeout(() => {
          router.push('/login');
        }, 3000); 
      } else {
        const errorMessage = data.erro || (data.detalhes ? Object.values(data.detalhes).flat().join(' ') : `Erro ${response.status}: Não foi possível redefinir a senha.`);
        toast.error(errorMessage);
        if (data.detalhes) {
            setFormErrors(data.detalhes);
        }
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao conectar com o servidor.";
      toast.error(errorMessage);
      console.error("Erro na solicitação de redefinir senha:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const displayFieldErrors = (fieldName: keyof typeof formData) => {
    return formErrors[fieldName]?.map((error, index) => (
        <p key={`${fieldName}-error-${index}`} className="text-xs text-red-500 mt-1">{error}</p>
    ));
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
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Ir para Login</Button>
                </Link>
            </CardFooter>
        </Card>
    )
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-blue-500">Redefinir Senha</CardTitle>
        <CardDescription>
          Informe seu e-mail, o código de 6 dígitos recebido por e-mail e sua nova senha.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-3"> 
          <div className="space-y-1 ">
            <Label htmlFor="email" className="text-blue-500 font-bold">E-mail</Label>
            <Input
              id="email" name="email" type="email" autoComplete="email" required
              value={formData.email} onChange={handleChange} disabled={isLoading || !!searchParams.get('email')} 
              placeholder="seu@email.com"
            />
            {displayFieldErrors("email")}
          </div>
          <div className="space-y-1">
            <Label htmlFor="codigoRecuperacao" className="text-blue-500 font-bold">Código de Recuperação</Label>
            <Input
              id="codigoRecuperacao" name="codigoRecuperacao" type="text" autoComplete="one-time-code" required
              value={formData.codigoRecuperacao} onChange={handleChange} disabled={isLoading}
              maxLength={6} placeholder="Código de 6 dígitos"
            />
            {displayFieldErrors("codigoRecuperacao")}
          </div>
          <div className="space-y-1">
            <Label htmlFor="novaSenha" className="text-blue-500 font-bold">Nova Senha</Label>
            <Input
              id="novaSenha" name="novaSenha" type="password" required
              value={formData.novaSenha} onChange={handleChange} disabled={isLoading}
              placeholder="Digite sua nova senha"
            />
            {displayFieldErrors("novaSenha")}
          </div>
          <div className="space-y-1">
            <Label htmlFor="confirmarNovaSenha" className="text-blue-500 font-bold">Confirmar Nova Senha</Label>
            <Input
              id="confirmarNovaSenha" name="confirmarNovaSenha" type="password" required
              value={formData.confirmarNovaSenha} onChange={handleChange} disabled={isLoading}
              placeholder="Confirme sua nova senha"
            />
            {displayFieldErrors("confirmarNovaSenha")}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 pt-4">
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Redefinindo...
              </>
            ) : (
              "Redefinir Senha"
            )}
          </Button>
          <Link href="/login" className="text-sm text-center text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
            Lembrou a senha? Voltar para o Login
          </Link>
        </CardFooter>
      </form>
    </Card>
  );
}