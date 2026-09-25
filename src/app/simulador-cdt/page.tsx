import CdtSimulator from "@/components/simulators/CdtSimulator";
import { Coins } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulador de CDT | BanCentral MC",
  description:
    "Calcula la rentabilidad estimada de tu inversión en un Certificado de Depósito a Término CDT según monto, plazo y tasa de rentabilidad.",
};

export default function SimuladorCdtPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-10">
      {/* Encabezado */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
          <Coins className="w-3.5 h-3.5 text-emerald-600" />
          <span>Calculadora de Inversión y Renta Fija</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Simulador de CDT
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Haz crecer tus ahorros con rentabilidad segura y fija garantizada. Simula el rendimiento
          bruto y neto a liquidar de acuerdo con el plazo y capital que decidas invertir.
        </p>
      </div>

      <CdtSimulator />
    </div>
  );
}
