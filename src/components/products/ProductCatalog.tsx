"use client";

import { useState } from "react";
import Link from "next/link";
import { Producto, CategoriaProducto } from "@/types";
import { formatCOP } from "@/lib/financial-math";
import {
  CreditCard,
  Coins,
  PiggyBank,
  CheckCircle2,
  FileText,
  Calculator,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface ProductCatalogProps {
  initialProducts: Producto[];
}

export default function ProductCatalog({ initialProducts }: ProductCatalogProps) {
  const [filtro, setFiltro] = useState<CategoriaProducto | "todos">("todos");
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);

  const productosFiltrados =
    filtro === "todos"
      ? initialProducts
      : initialProducts.filter((p) => p.categoria === filtro);

  return (
    <div className="space-y-8">
      {/* Pestañas de filtrado */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 pb-4">
        <button
          onClick={() => setFiltro("todos")}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            filtro === "todos"
              ? "bg-bank-900 text-white shadow-md shadow-bank-900/20"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          Todos los Productos ({initialProducts.length})
        </button>

        <button
          onClick={() => setFiltro("ahorro")}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            filtro === "ahorro"
              ? "bg-bank-700 text-white shadow-md"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <PiggyBank className="w-4 h-4" />
          <span>Cuentas de Ahorro</span>
        </button>

        <button
          onClick={() => setFiltro("cdt")}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            filtro === "cdt"
              ? "bg-emerald-700 text-white shadow-md"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Coins className="w-4 h-4" />
          <span>Certificados de Depósito (CDT)</span>
        </button>

        <button
          onClick={() => setFiltro("credito")}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            filtro === "credito"
              ? "bg-purple-700 text-white shadow-md"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Líneas de Crédito</span>
        </button>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productosFiltrados.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden"
          >
            {/* Header de la tarjeta */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                    prod.categoria === "ahorro"
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : prod.categoria === "cdt"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-purple-50 text-purple-700 border border-purple-200"
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  {prod.tipo}
                </span>

                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                  {prod.tasaReferencia}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  {prod.nombre}
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {prod.descripcionCorta}
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-3.5 space-y-2 text-xs text-slate-600 border border-slate-100">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Monto Mínimo:</span>
                  <span className="font-semibold text-slate-800">
                    {prod.montoMinimo === 0 ? "Apertura desde $0" : formatCOP(prod.montoMinimo)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Plazo sugerido:</span>
                  <span className="font-semibold text-slate-800">{prod.plazoMinimo}</span>
                </div>
              </div>

              {/* Lista breve de beneficios */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Beneficios principales:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {prod.beneficios.slice(0, 3).map((ben, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{ben}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer de la tarjeta con acciones */}
            <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => setProductoSeleccionado(prod)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-bank-800 py-2 px-3 rounded-lg hover:bg-white transition-all"
              >
                <FileText className="w-4 h-4 text-slate-400" />
                <span>Ver Requisitos</span>
              </button>

              {prod.categoria === "credito" && (
                <Link
                  href={`/simulador-credito?tipo=${encodeURIComponent(prod.nombre)}`}
                  className="inline-flex items-center gap-1.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold py-2 px-3.5 rounded-lg shadow-sm transition-all"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Simular</span>
                </Link>
              )}

              {prod.categoria === "cdt" && (
                <Link
                  href="/simulador-cdt"
                  className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold py-2 px-3.5 rounded-lg shadow-sm transition-all"
                >
                  <Coins className="w-3.5 h-3.5" />
                  <span>Simular</span>
                </Link>
              )}

              {prod.categoria === "ahorro" && (
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-1.5 bg-bank-700 hover:bg-bank-800 text-white text-xs font-bold py-2 px-3.5 rounded-lg shadow-sm transition-all"
                >
                  <span>Solicitar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal interactivo de requisitos y detalle completo */}
      {productoSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-semibold text-bank-600 uppercase tracking-wider">
                  Ficha Técnica Institucional
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">
                  {productoSeleccionado.nombre}
                </h3>
              </div>
              <button
                onClick={() => setProductoSeleccionado(null)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold p-1 rounded-lg hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-600">
              <p className="leading-relaxed">{productoSeleccionado.descripcion}</p>

              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div>
                  <span className="text-xs text-slate-500 block">Tasa de Referencia:</span>
                  <span className="font-bold text-slate-900 text-base">
                    {productoSeleccionado.tasaReferencia}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Monto mínimo:</span>
                  <span className="font-bold text-slate-900 text-base">
                    {productoSeleccionado.montoMinimo === 0
                      ? "Sin monto mínimo"
                      : formatCOP(productoSeleccionado.montoMinimo)}
                  </span>
                </div>
              </div>

              {/* Lista completa de Beneficios */}
              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-2">Beneficios del Producto:</h4>
                <ul className="space-y-2">
                  {productoSeleccionado.beneficios.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lista completa de Requisitos */}
              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-2">Requisitos de Vinculación:</h4>
                <ul className="space-y-2">
                  {productoSeleccionado.requisitos.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-bank-600 mt-2 shrink-0"></span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setProductoSeleccionado(null)}
                className="px-4 py-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 text-sm font-semibold"
              >
                Cerrar
              </button>
              {productoSeleccionado.categoria === "credito" && (
                <Link
                  href={`/simulador-credito?tipo=${encodeURIComponent(
                    productoSeleccionado.nombre
                  )}`}
                  className="px-5 py-2 rounded-xl bg-bank-700 hover:bg-bank-800 text-white text-sm font-bold shadow-md"
                >
                  Ir al Simulador de Crédito
                </Link>
              )}
              {productoSeleccionado.categoria === "cdt" && (
                <Link
                  href="/simulador-cdt"
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold shadow-md"
                >
                  Ir al Simulador de CDT
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
