import { Suspense } from "react";
import CreditoSimulator from "@/components/simulators/CreditoSimulator";
import { Calculator, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulador de Crédito | BanCentral MC",
  description:
    "Calcula el valor aproximado de las cuotas de tu crédito según el monto solicitado, plazo, tasa de interés y tipo de crédito con tabla de amortización.",
};

export default function SimuladorCreditoPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-10">
      {/* Encabezado */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bank-100 text-bank-800 text-xs font-semibold">
          <Calculator className="w-3.5 h-3.5 text-bank-600" />
          <span>Herramienta Oficial de Cotización</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Simulador de Crédito
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Proyecta tus cuotas mensuales, intereses y costo total para créditos de libre inversión,
          vivienda, vehículo o microcrédito. Ajusta los parámetros en tiempo real.
        </p>
      </div>

      {/* Simulador con Suspense */}
      <Suspense
        fallback={
          <div className="p-12 text-center text-slate-500">Cargando simulador de crédito...</div>
        }
      >
        <CreditoSimulator />
      </Suspense>
    </div>
  );
}
