import EsqueciSenhaForm from "@/components/ui/auth/EsqueciSenhaForm"; 

export default function EsqueciSenhaPageContainer() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100 dark:bg-slate-900 p-4">
      <EsqueciSenhaForm />
    </div>
  );
}