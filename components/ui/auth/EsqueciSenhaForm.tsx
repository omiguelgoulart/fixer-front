"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
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

export default function EsqueciSenhaForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    const endpoint = `${apiBaseUrl}/auth/esqueci-senha`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json().catch(() => ({})); 

      if (response.ok) {
        toast.success(data.message || "Solicitação enviada com sucesso! Verifique seu e-mail para o código de recuperação.");
        setEmail(''); 
      } else {
        
        const errorMessage = data.detalhes?.email?.[0] || data.erro || `Erro ${response.status}: Não foi possível processar sua solicitação.`;
        toast.error(errorMessage);
      }
    } catch (error: unknown) {
  
      const errorMessage = error instanceof Error ? error.message : "Erro ao conectar com o servidor. Verifique sua conexão.";
      toast.error(errorMessage);
      console.error("Erro na solicitação de 'esqueci a senha':", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg"> 
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-blue-500">Esqueceu sua Senha?</CardTitle>
        <CardDescription>
          Digite seu e-mail e enviaremos um código e um link para você criar uma nova senha.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-blue-500 font-bold">Endereço de E-mail</Label>
            <Input
              id="email"
              name="email" 
              type="email"
              placeholder="seu@email.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 pt-4">
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
            {isLoading ? (
              <>
                
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </>
            ) : (
              "Enviar Código de Recuperação"
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