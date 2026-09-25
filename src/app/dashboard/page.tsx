import {
  getContactoMensajes,
  getOficinas,
  getProductos,
  getSimulaciones,
} from "@/lib/db";
import DashboardClient from "@/components/dashboard/DashboardClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel Privado de Asesores y Administradores | BanCentral MC",
  description:
    "Módulo de gestión y seguimiento para asesores financieros y administradores del sistema bancario.",
};

// Desactivar caché estática para que siempre lea la persistencia de los archivos JSON en tiempo real
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [simulaciones, mensajes, productos, oficinas] = await Promise.all([
    getSimulaciones(),
    getContactoMensajes(),
    getProductos(),
    getOficinas(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <DashboardClient
        simulaciones={simulaciones}
        mensajes={mensajes}
        productos={productos}
        oficinas={oficinas}
      />
    </div>
  );
}
