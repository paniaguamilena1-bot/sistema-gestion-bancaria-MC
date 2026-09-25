import { getOficinas } from "@/lib/db";
import OfficesDirectory from "@/components/offices/OfficesDirectory";
import { MapPin, Navigation } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ubicación de Oficinas y Cajeros Automáticos | BanCentral MC",
  description:
    "Consulta la ubicación, dirección, horarios de atención y servicios de nuestras sucursales bancarias y red de cajeros automáticos.",
};

export default async function OficinasPage() {
  const oficinas = await getOficinas();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-10">
      {/* Encabezado */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bank-100 text-bank-800 text-xs font-semibold">
          <MapPin className="w-3.5 h-3.5 text-bank-600" />
          <span>Red Nacional de Atención Presencial</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Oficinas y Cajeros Automáticos
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Estamos cerca de ti. Encuentra nuestra sede principal en La Dorada (Caldas) y puntos de
          atención en las principales ciudades del país.
        </p>
      </div>

      <OfficesDirectory initialOffices={oficinas} />
    </div>
  );
}
