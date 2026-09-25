"use client";

import { useState } from "react";
import { FaqItem } from "@/types";
import { ChevronDown, HelpCircle, Search, MessageSquare } from "lucide-react";
import Link from "next/link";

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [categoriaActiva, setCategoriaActiva] = useState<string>("todas");
  const [abiertoId, setAbiertoId] = useState<string | null>(items[0]?.id || null);
  const [filtroTexto, setFiltroTexto] = useState<string>("");

  const categorias = ["todas", "Créditos", "CDT", "Cuentas", "Plataforma"];

  const itemsFiltrados = items.filter((item) => {
    const matchCat =
      categoriaActiva === "todas" ||
      item.categoria.toLowerCase() === categoriaActiva.toLowerCase();
    const matchTexto =
      item.pregunta.toLowerCase().includes(filtroTexto.toLowerCase()) ||
      item.respuesta.toLowerCase().includes(filtroTexto.toLowerCase());
    return matchCat && matchTexto;
  });

  const toggleItem = (id: string) => {
    setAbiertoId(abiertoId === id ? null : id);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Buscador y Pestañas */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Buscar pregunta o tema clave..."
            value={filtroTexto}
            onChange={(e) => setFiltroTexto(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-bank-500 bg-white"
          />
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                categoriaActiva === cat
                  ? "bg-bank-900 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat === "todas" ? "Todas las Dudas" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Lista tipo acordeón */}
      <div className="space-y-3">
        {itemsFiltrados.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
            No encontramos respuestas para ese criterio. Puedes escribirnos directamente en la
            sección de contacto.
          </div>
        ) : (
          itemsFiltrados.map((item) => {
            const isOpen = abiertoId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-bank-50 text-bank-700 flex items-center justify-center shrink-0">
                      <HelpCircle className="w-4 h-4" />
                    </span>
                    <div>
                      <span className="text-[11px] font-bold text-bank-600 uppercase tracking-wider block">
                        {item.categoria}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base mt-0.5">
                        {item.pregunta}
                      </h3>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-bank-600" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-slate-600 border-t border-slate-100 pt-4 leading-relaxed bg-slate-50/30">
                    <p>{item.respuesta}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* CTA inferior */}
      <div className="bg-bank-50 border border-bank-100 rounded-2xl p-6 text-center space-y-3">
        <h4 className="font-bold text-bank-950 text-base">¿Tienes una inquietud diferente?</h4>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          Nuestros asesores comerciales están listos para resolver cualquier consulta sobre créditos,
          inversiones o cuentas.
        </p>
        <div>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 bg-bank-800 hover:bg-bank-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all"
          >
            <MessageSquare className="w-4 h-4 text-gold-400" />
            <span>Escribir al Formulario de Contacto</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
