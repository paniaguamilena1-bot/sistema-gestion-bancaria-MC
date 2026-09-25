"use client";

import { useState } from "react";
import { enviarContactoAction } from "@/app/actions";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [enviando, setEnviando] = useState(false);
  const [enviadoRadicado, setEnviadoRadicado] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnviando(true);
    setErrorMsg(null);
    setEnviadoRadicado(null);

    const formData = new FormData(e.currentTarget);
    const res = await enviarContactoAction(formData);

    setEnviando(false);
    if (res.success && res.id) {
      setEnviadoRadicado(res.id);
      (e.target as HTMLFormElement).reset();
    } else {
      setErrorMsg(res.error || "Ocurrió un error al enviar el mensaje.");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Envíanos tu Solicitud o Mensaje</h2>
        <p className="text-xs text-slate-500 mt-1">
          Diligencia el formulario oficial. Uno de nuestros asesores responderá a la brevedad.
        </p>
      </div>

      {enviadoRadicado && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2 animate-in fade-in">
          <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>¡Mensaje radicado exitosamente!</span>
          </div>
          <p className="text-xs text-emerald-700 leading-relaxed">
            Hemos recibido tu solicitud bajo el número de radicado{" "}
            <strong className="underline">{enviadoRadicado}</strong>. Se ha guardado en el sistema y
            será atendida por el equipo de asesores financieros.
          </p>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nombre Completo *
            </label>
            <input
              type="text"
              name="nombre"
              required
              placeholder="Ej: Michell Castaño"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-bank-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Correo Electrónico *
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="ejemplo@correo.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-bank-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Teléfono / Celular de Contacto
            </label>
            <input
              type="tel"
              name="telefono"
              placeholder="Ej: 310 123 4567"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-bank-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Ciudad / Municipio
            </label>
            <input
              type="text"
              name="ciudad"
              defaultValue="La Dorada"
              placeholder="Ej: La Dorada, Caldas"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-bank-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Asunto o Motivo de Consulta *
          </label>
          <select
            name="asunto"
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white outline-none focus:ring-2 focus:ring-bank-500"
          >
            <option value="Información sobre Crédito de Libre Inversión">
              Información sobre Crédito de Libre Inversión
            </option>
            <option value="Cotización de Crédito Hipotecario / Vivienda">
              Cotización de Crédito Hipotecario / Vivienda
            </option>
            <option value="Apertura y Tasas de CDT">Apertura y Tasas de CDT</option>
            <option value="Apertura de Cuenta de Ahorro">Apertura de Cuenta de Ahorro</option>
            <option value="Atención de Asesor Financiero">
              Solicitud de atención con un asesor financiero
            </option>
            <option value="Otra consulta o sugerencia">Otra consulta o sugerencia</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Mensaje o Detalle de tu Solicitud *
          </label>
          <textarea
            name="mensaje"
            rows={4}
            required
            placeholder="Describe brevemente tus dudas, montos de interés o requerimientos específicos..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-bank-500"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={enviando}
          className="w-full inline-flex items-center justify-center gap-2 bg-bank-800 hover:bg-bank-900 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all disabled:opacity-50 text-sm"
        >
          {enviando ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Enviando solicitud...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 text-gold-400" />
              <span>Radicar Solicitud de Contacto</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
