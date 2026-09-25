import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "BanCentral MC | Sistema de Gestión Bancaria y Financiera",
  description:
    "Sistema de información para consultar productos y servicios financieros, simulación de créditos y CDTs, ubicación de oficinas y canales de atención de la entidad financiera.",
  keywords: [
    "banco",
    "simulador de crédito",
    "simulador CDT",
    "entidad financiera",
    "productos bancarios",
    "La Dorada Caldas",
    "gestión bancaria",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="bg-slate-50 text-slate-800 antialiased flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
