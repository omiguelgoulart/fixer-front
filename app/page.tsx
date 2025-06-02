'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      router.push('/dashboard'); // Se estiver logado, vai para a dashboard
    } else {
      router.push('/login'); // Senão, vai para a tela de login
    }
  }, [router]);

  return null; // Não renderiza nada enquanto redireciona
}
