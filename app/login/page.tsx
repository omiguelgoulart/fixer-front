"use client"; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image'; 

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    router.push('/ativos'); 
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
     
           <div className="w-full md:w-1/2 bg-blue-500 flex flex-col justify-between items-center p-8 sm:p-12 text-white min-h-[50vh] md:min-h-screen">
     
        <div className="w-full flex justify-center pt-8 md:pt-16">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56">
           
            <Image
              src="/logo_branco.png" 
              alt="Fixer Logo - Engrenagem Branca" 
              fill 
              style={{ objectFit: "contain" }} 
              priority 
            />
          </div>
        </div>

        <div className="text-center pb-8 md:pb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6">Bem vindo</h1>
          <p className="text-xl sm:text-2xl max-w-md">
            Acesse o Fixer e mantenha tudo em ordem.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-8 sm:p-12">
        <div className="w-full max-w-sm sm:max-w-md">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 sm:mb-8 text-center">Login</h2>
          <form className="space-y-5 sm:space-y-6"onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-1.5">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="seu@email.com"
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label htmlFor="password"className="text-sm font-medium text-gray-700">Senha</Label>
                <Link href="/esqueci-senha" 
                      className="text-sm text-blue-500 hover:underline">
                   Esqueceu a Senha?
                </Link>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="digite a sua senha"
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
            </div>

            <div>
              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2.5 text-base font-medium">
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}