import { getFaqs } from "@/lib/db";
import FaqAccordion from "@/components/faq/FaqAccordion";
import { HelpCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes | BanCentral MC",
  description:
    "Respuestas a las dudas más comunes sobre productos financieros, créditos, CDT y el uso del sistema de información bancaria.",
};

export default async function PreguntasFrecuentesPage() {
  const faqs = await getFaqs();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-10">
      {/* Encabezado */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bank-100 text-bank-800 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5 text-bank-600" />
          <span>Centro de Ayuda y Orientación</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Preguntas Frecuentes
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Encuentra orientación inmediata sobre tasas, amortizaciones, requisitos para CDT y
          créditos, y el funcionamiento general del sistema.
        </p>
      </div>

      <FaqAccordion items={faqs} />
    </div>
  );
}
