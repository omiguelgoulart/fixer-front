import Image from "next/image";

export default function AuthAside() {
  return (
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
        <p className="text-xl sm:text-2xl max-w-md">Acesse o Fixer e mantenha tudo em ordem.</p>
      </div>
    </div>
  );
}
