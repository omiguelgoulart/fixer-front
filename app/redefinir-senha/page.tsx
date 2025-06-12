import { Suspense } from 'react';
import RedefinirSenhaForm from "@/components/ui/auth/RedefinirSenhaForm"; 

function RedefinirSenhaPageContentWrapper() {
  return <RedefinirSenhaForm />;
}

export default function RedefinirSenhaPageContainer() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100 dark:bg-slate-800 p-4"> 
      <Suspense fallback={<div className="text-center text-lg font-semibold">Carregando formulário...</div>}>
        <RedefinirSenhaPageContentWrapper />
      </Suspense>
    </div>
  );
}