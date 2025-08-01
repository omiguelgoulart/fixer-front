import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { Toaster } from "@/components/ui/sonner";
import ClientLayout from "./components/ClientLayout";
import { UsuarioProvider } from "./contexts/UsuarioContex";
import { AuthProvider } from "./contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/logo_branco_2048.png",
    shortcut: "/logo_branco_2048.png",
    apple: "/logo_branco_2048.png",
    other: {
      rel: "apple-touch-icon",
      url: "/logo_branco_2048.png",
    },
  },
  title: "FIXER",
  description: "Sistema de PCM Web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-full overflow-hidden`}
        suppressHydrationWarning={true}
      >
        <UsuarioProvider>
          <ClientLayout>
            <Header />
            <main className="flex-1 overflow-y-auto">
              <AuthProvider>{children}</AuthProvider>
            </main>
            <Toaster />
          </ClientLayout>
        </UsuarioProvider>
      </body>
    </html>
  );
}
