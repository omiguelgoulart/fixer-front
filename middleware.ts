import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Lê o cookie com os dados do usuário
  const cookie = request.cookies.get("usuario");

  // Se não houver cookie e for uma rota protegida → redireciona para login
  const isPrivateRoute = ["/dashboard", "/funcionarios", "/planejamento", "/tecnico"].some((prefix) =>
    path.startsWith(prefix)
  );

  if (!cookie && isPrivateRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Se o cookie existir, valida o tipo do usuário
  if (cookie) {
    try {
      const usuario = JSON.parse(cookie.value);

      // Se for técnico, permite apenas a rota /tecnico
      if (
        usuario.tipo === "TECNICO" &&
        !path.startsWith("/tecnico")
      ) {
        return NextResponse.redirect(new URL("/tecnico", request.url));
      }

      // Se for outro tipo de usuário e tentar acessar /tecnico, redireciona
      if (
        usuario.tipo !== "TECNICO" &&
        path.startsWith("/tecnico")
      ) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

    } catch {
      // Se falhar ao ler o cookie, remove e força login novamente
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// Middleware será aplicado nessas rotas
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/funcionarios/:path*",
    "/planejamento/:path*",
    "/tecnico/:path*",
  ],
};
