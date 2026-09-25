"use client";

import { useState, useMemo } from "react";
import { calcularSimulacionCDT, formatCOP } from "@/lib/financial-math";
import { guardarSimulacionAction } from "@/app/actions";
import {
  Coins,
  Save,
  Printer,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  ShieldCheck,
  Calendar,
  Sparkles,
} from "lucide-react";

export default function CdtSimulator() {
  const [valorInversion, setValorInversion] = useState<number>(5000000);
  const [tiempoDias, setTiempoDias] = useState<number>(180);
  const [tasaRentabilidadEA, setTasaRentabilidadEA] = useState<number>(10.8);
  const [clienteNombre, setClienteNombre] = useState<string>("");

  const [guardadoExitoso, setGuardadoExitoso] = useState<boolean>(false);
  const [guardando, setGuardando] = useState<boolean>(false);

  // Opciones predefinidas de plazos comunes
  const plazosSugeridos = [
    { dias: 30, etiqueta: "30 días (1 mes)", tasaSugerida: 9.5 },
    { dias: 60, etiqueta: "60 días (2 meses)", tasaSugerida: 10.0 },
    { dias: 90, etiqueta: "90 días (3 meses)", tasaSugerida: 10.5 },
    { dias: 180, etiqueta: "180 días (6 meses)", tasaSugerida: 10.8 },
    { dias: 360, etiqueta: "360 días (1 año)", tasaSugerida: 11.2 },
    { dias: 540, etiqueta: "540 días (18 meses)", tasaSugerida: 11.5 },
  ];

  const handleSeleccionarPlazo = (dias: number, tasa: number) => {
    setTiempoDias(dias);
    setTasaRentabilidadEA(tasa);
  };

  // Cálculo en tiempo real
  const resultado = useMemo(() => {
    return calcularSimulacionCDT(valorInversion, tiempoDias, tasaRentabilidadEA);
  }, [valorInversion, tiempoDias, tasaRentabilidadEA]);

  const handleGuardar = async () => {
    setGuardando(true);
    setGuardadoExitoso(false);
    try {
      const res = await guardarSimulacionAction({
        tipo: "cdt",
        tipoCDT: "Certificado de Depósito a Término",
        clienteNombre: clienteNombre.trim() || "Inversionista Web",
        valorInversion,
        tiempoDias,
        tasaRentabilidadEA,
        rendimientoBruto: resultado.rendimientoBruto,
        retencionFuente: resultado.retencionFuente,
        rendimientoNeto: resultado.rendimientoNeto,
        totalLiquidar: resultado.totalLiquidar,
      });
      if (res.success) {
        setGuardadoExitoso(true);
        setTimeout(() => setGuardadoExitoso(false), 5000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGuardando(false);
    }
  };

  const handleImprimir = () => {
    window.print();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Formulario de entradas */}
      <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Coins className="w-5 h-5 text-emerald-600" />
            <span>Datos de la Inversión en CDT</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Calcula la rentabilidad fija garantizada para tu capital a término definido.
          </p>
        </div>

        <div className="space-y-6">
          {/* 1. Valor de la Inversión */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-sm font-semibold text-slate-800">
                Monto a Invertir ($ COP)
              </label>
              <span className="text-sm font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                {formatCOP(valorInversion)}
              </span>
            </div>
            <input
              type="range"
              min="200000"
              max="50000000"
              step="100000"
              value={valorInversion}
              onChange={(e) => setValorInversion(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 mb-2"
            />
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-400 font-medium">$</span>
              <input
                type="number"
                min="100000"
                step="50000"
                value={valorInversion}
                onChange={(e) => setValorInversion(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-4 py-2 rounded-xl border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="Ej: 5000000"
              />
            </div>
          </div>

          {/* 2. Plazos rápidos */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Plazos Habituales Sugeridos:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {plazosSugeridos.map((p) => (
                <button
                  key={p.dias}
                  type="button"
                  onClick={() => handleSeleccionarPlazo(p.dias, p.tasaSugerida)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    tiempoDias === p.dias
                      ? "bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="text-xs font-bold">{p.dias} días</div>
                  <div className="text-[11px] text-slate-500">{p.tasaSugerida}% E.A.</div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Tiempo de Inversión personalizado en días */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-sm font-semibold text-slate-800">
                Tiempo de Inversión (Días)
              </label>
              <span className="text-sm font-bold text-slate-700">{tiempoDias} días</span>
            </div>
            <input
              type="number"
              min="30"
              max="720"
              value={tiempoDias}
              onChange={(e) => setTiempoDias(Math.max(1, Number(e.target.value)))}
              className="w-full px-4 py-2 rounded-xl border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            />
            <p className="text-[11px] text-slate-500 mt-1">Plazo mínimo reglamentario: 30 días.</p>
          </div>

          {/* 4. Tasa de Rentabilidad */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-sm font-semibold text-slate-800">
                Tasa de Rentabilidad (% Efectiva Anual - E.A.)
              </label>
            </div>
            <input
              type="number"
              step="0.05"
              min="1"
              max="25"
              value={tasaRentabilidadEA}
              onChange={(e) => setTasaRentabilidadEA(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-xl border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          {/* 5. Titular (Opcional) */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Nombre del Inversionista (Opcional)
            </label>
            <input
              type="text"
              value={clienteNombre}
              onChange={(e) => setClienteNombre(e.target.value)}
              placeholder="Ej: Michell Castaño"
              className="w-full px-4 py-2 rounded-xl border border-slate-200 text-slate-800 text-sm outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Resultados de la Simulación de CDT */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-bank-950 text-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6 border border-emerald-800/40 relative overflow-hidden">
          <div className="flex justify-between items-center border-b border-emerald-800/60 pb-4">
            <div>
              <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider block">
                Liquidación Estimada de CDT
              </span>
              <span className="text-sm text-slate-300">Renta Fija Institucional</span>
            </div>
            <span className="text-xs bg-emerald-900/80 text-emerald-300 font-bold px-3 py-1 rounded-full border border-emerald-500/20">
              FOGAFIN Garantizado
            </span>
          </div>

          {/* Ganancia neta destacada */}
          <div className="space-y-1">
            <span className="text-xs text-slate-300 font-medium">Rendimiento Neto a Recibir:</span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">
              +{formatCOP(resultado.rendimientoNeto)}
            </div>
            <p className="text-[11px] text-slate-400">
              *Ganancia limpia después de retención en la fuente del 4%.
            </p>
          </div>

          {/* Desglose de totales */}
          <div className="bg-slate-950/70 rounded-xl p-4 space-y-3 text-sm border border-emerald-900/50">
            <div className="flex justify-between text-slate-300 text-xs">
              <span>Capital Invertido:</span>
              <span className="font-semibold text-white">{formatCOP(valorInversion)}</span>
            </div>
            <div className="flex justify-between text-slate-300 text-xs">
              <span>Plazo de permanencia:</span>
              <span className="font-semibold text-white">{tiempoDias} días</span>
            </div>
            <div className="flex justify-between text-slate-300 text-xs">
              <span>Tasa pactada:</span>
              <span className="font-semibold text-emerald-300">{tasaRentabilidadEA}% E.A.</span>
            </div>
            <div className="flex justify-between text-slate-300 text-xs pt-2 border-t border-emerald-900/50">
              <span>Rendimiento Bruto:</span>
              <span className="font-semibold text-white">
                +{formatCOP(resultado.rendimientoBruto)}
              </span>
            </div>
            <div className="flex justify-between text-slate-300 text-xs">
              <span>Retención en la fuente (4%):</span>
              <span className="font-semibold text-rose-400">
                -{formatCOP(resultado.retencionFuente)}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold text-white pt-2.5 border-t border-emerald-700/60">
              <span>Total Neto al Vencimiento:</span>
              <span className="text-emerald-300 text-base">
                {formatCOP(resultado.totalLiquidar)}
              </span>
            </div>
          </div>

          {/* Acciones */}
          <div className="space-y-2.5 pt-2 no-print">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleGuardar}
                disabled={guardando}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md transition-all disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{guardando ? "Guardando..." : "Guardar Cotización"}</span>
              </button>

              <button
                type="button"
                onClick={handleImprimir}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition-all"
                title="Imprimir comprobante"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>

            {guardadoExitoso && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-200 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>¡Simulación de CDT guardada con éxito en el sistema!</span>
              </div>
            )}
          </div>
        </div>

        {/* Garantías y notas normativas */}
        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 text-xs text-emerald-950 space-y-2">
          <div className="flex items-center gap-2 font-bold text-emerald-900">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Seguridad y Respaldo Financiero</span>
          </div>
          <p className="leading-relaxed">
            Tu inversión está asegurada por el Seguro de Depósitos del Fondo de Garantías de
            Instituciones Financieras (FOGAFIN). Las tasas de interés de captación están sujetas a
            las condiciones de mercado vigentes al momento de la expedición formal del título.
          </p>
        </div>
      </div>
    </div>
  );
}
