import { getProductos } from "@/lib/db";
import ProductCatalog from "@/components/products/ProductCatalog";
import { CreditCard, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portafolio de Productos Financieros | BanCentral MC",
  description:
    "Consulta nuestros productos de ahorro, certificados de depósito a término CDT y diferentes líneas de crédito con tasas de referencia y beneficios.",
};

export default async function ProductosPage() {
  const productos = await getProductos();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-10">
      {/* Header de la sección */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bank-100 text-bank-800 text-xs font-semibold">
          <CreditCard className="w-3.5 h-3.5 text-bank-600" />
          <span>Portafolio Oficial de la Entidad</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Productos y Servicios Financieros
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Diseñados para brindarte seguridad, rentabilidad y financiamiento en cada etapa de tus
          proyectos. Selecciona una categoría para explorar beneficios, tasas y requisitos.
        </p>
      </div>

      {/* Catálogo con filtros interactivos */}
      <ProductCatalog initialProducts={productos} />

      {/* Banner de protección al consumidor financiero */}
      <div className="bg-slate-900 text-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-white text-base">Transparencia y Seguridad Garantizada</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Nuestros depósitos están respaldados por el seguro de depósitos FOGAFIN hasta por el
              monto legal vigente. Sin costos ocultos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
