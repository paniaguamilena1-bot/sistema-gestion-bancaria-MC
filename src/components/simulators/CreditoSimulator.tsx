"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { calcularSimulacionCredito, formatCOP } from "@/lib/financial-math";
import { guardarSimulacionAction } from "@/app/actions";
import {
  Calculator,
  Save,
  Printer,
  Table as TableIcon,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Calendar,
} from "lucide-react";

interface TipoCreditoConfig {
  nombre: string;
  tasaDefectoMV: number;
  plazoMin: number;
  plazoMax: number;
  montoMin: number;
  montoMax: number;
}

const TIPOS_CREDITO: TipoCreditoConfig[] = [
  {
    nombre: "Crédito de Libre Inversión",
    tasaDefectoMV: 1.35,
    plazoMin: 12,
    plazoMax: 60,
    montoMin: 1000000,
    montoMax: 50000000,
  },
  {
    nombre: "Crédito Hipotecario de Vivienda",
    tasaDefectoMV: 0.95,
    plazoMin: 60,
    plazoMax: 240,
    montoMin: 20000000,
    montoMax: 500000000,
  },
  {
    nombre: "Crédito para Vehículo",
    tasaDefectoMV: 1.15,
    plazoMin: 12,
    plazoMax: 72,
    montoMin: 8000000,
    montoMax: 120000000,
  },
  {
    nombre: "Microcrédito Productivo",
    tasaDefectoMV: 2.1,
    plazoMin: 6,
    plazoMax: 36,
    montoMin: 1000000,
    montoMax: 25000000,
  },
];

export default function CreditoSimulator() {
  const searchParams = useSearchParams();
  const tipoParam = searchParams.get("tipo");

  const [tipoCredito, setTipoCredito] = useState<string>(
    tipoParam || TIPOS_CREDITO[0].nombre
  );
  const [valorSolicitado, setValorSolicitado] = useState<number>(10000000);
  const [plazoMeses, setPlazoMeses] = useState<number>(36);
  const [tasaInteresMV, setTasaInteresMV] = useState<number>(1.35);
  const [clienteNombre, setClienteNombre] = useState<string>("");

  const [guardadoExitoso, setGuardadoExitoso] = useState<boolean>(false);
  const [guardando, setGuardando] = useState<boolean>(false);
  const [mostrarTabla, setMostrarTabla] = useState<boolean>(false);

  // Sincronizar tasa por defecto al cambiar el tipo de crédito
  const handleTipoChange = (nuevoTipo: string) => {
    setTipoCredito(nuevoTipo);
    const encontrado = TIPOS_CREDITO.find((t) => t.nombre === nuevoTipo);
    if (encontrado) {
      setTasaInteresMV(encontrado.tasaDefectoMV);
      if (valorSolicitado < encontrado.montoMin) {
        setValorSolicitado(encontrado.montoMin);
      }
    }
  };

  // Cálculo en tiempo real con la función de matemáticas financieras
  const resultado = useMemo(() => {
    return calcularSimulacionCredito(
      valorSolicitado,
      plazoMeses,
      tasaInteresMV,
      tipoCredito
    );
  }, [valorSolicitado, plazoMeses, tasaInteresMV, tipoCredito]);

  // Guardar simulación en el archivo JSON
  const handleGuardar = async () => {
    setGuardando(true);
    setGuardadoExitoso(false);
    try {
      const res = await guardarSimulacionAction({
        tipo: "credito",
        tipoCredito,
        clienteNombre: clienteNombre.trim() || "Cliente Web",
        valorSolicitado,
        plazoMeses,
        tasaInteresMV,
        cuotaMensual: resultado.cuotaMensual,
        totalIntereses: resultado.totalIntereses,
        totalPagar: resultado.totalPagar,
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
    <div className="space-y-8">
      {/* Contenedor principal de la calculadora */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Formulario de entradas */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-bank-600" />
              <span>Parámetros del Crédito</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Ingresa los datos solicitados según las especificaciones del documento EV9.
            </p>
          </div>

          <div className="space-y-5">
            {/* 1. Tipo de Crédito */}
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Tipo de Crédito
              </label>
              <select
                value={tipoCredito}
                onChange={(e) => handleTipoChange(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-sm focus:ring-2 focus:ring-bank-500 focus:border-bank-500 outline-none"
              >
                {TIPOS_CREDITO.map((t) => (
                  <option key={t.nombre} value={t.nombre}>
                    {t.nombre} (Tasa sugerida: {t.tasaDefectoMV}% M.V.)
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Valor Solicitado */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-semibold text-slate-800">
                  Valor Solicitado ($ COP)
                </label>
                <span className="text-sm font-bold text-bank-700 bg-bank-50 px-2.5 py-0.5 rounded-md">
                  {formatCOP(valorSolicitado)}
                </span>
              </div>
              <input
                type="range"
                min="1000000"
                max="100000000"
                step="500000"
                value={valorSolicitado}
                onChange={(e) => setValorSolicitado(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-bank-600 mb-2"
              />
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-400 font-medium">$</span>
                <input
                  type="number"
                  min="500000"
                  step="100000"
                  value={valorSolicitado}
                  onChange={(e) => setValorSolicitado(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-8 pr-4 py-2 rounded-xl border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-bank-500 outline-none"
                  placeholder="Ej: 10000000"
                />
              </div>
            </div>

            {/* 3. Plazo en Meses */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-semibold text-slate-800">Plazo (Meses)</label>
                <span className="text-sm font-bold text-bank-700 bg-bank-50 px-2.5 py-0.5 rounded-md">
                  {plazoMeses} meses ({(plazoMeses / 12).toFixed(1)} años)
                </span>
              </div>
              <input
                type="range"
                min="6"
                max="120"
                step="6"
                value={plazoMeses}
                onChange={(e) => setPlazoMeses(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-bank-600 mb-2"
              />
              <div className="flex gap-2">
                {[12, 24, 36, 48, 60, 72].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPlazoMeses(p)}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                      plazoMeses === p
                        ? "bg-bank-700 text-white border-bank-700"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {p}m
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Tasa de Interés */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-semibold text-slate-800">
                  Tasa de Interés Periódica Mensual Vencida (% M.V.)
                </label>
                <span className="text-xs text-slate-500">
                  ≈ {resultado.tasaInteresEA}% E.A.
                </span>
              </div>
              <input
                type="number"
                step="0.01"
                min="0.1"
                max="5"
                value={tasaInteresMV}
                onChange={(e) => setTasaInteresMV(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-xl border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-bank-500 outline-none"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Puedes ajustar la tasa según las políticas crediticias o acuerdos con el asesor.
              </p>
            </div>

            {/* 5. Nombre del Cliente (Opcional) */}
            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Nombre del Solicitante / Titular (Opcional para comprobante)
              </label>
              <input
                type="text"
                value={clienteNombre}
                onChange={(e) => setClienteNombre(e.target.value)}
                placeholder="Ej: Carlos Gómez"
                className="w-full px-4 py-2 rounded-xl border border-slate-200 text-slate-800 text-sm outline-none focus:border-bank-500"
              />
            </div>
          </div>
        </div>

        {/* Tarjeta de resultados de la simulación */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-bank-950 via-bank-900 to-bank-800 text-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6 border border-bank-700/50 relative overflow-hidden">
            {/* Adorno visual */}
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-gold-500/10 rounded-full blur-2xl"></div>

            <div className="flex justify-between items-center border-b border-bank-700/60 pb-4">
              <div>
                <span className="text-xs text-bank-300 font-semibold uppercase tracking-wider block">
                  Resultado de Simulación
                </span>
                <span className="text-sm text-slate-300">{tipoCredito}</span>
              </div>
              <span className="text-xs bg-bank-800/80 text-gold-400 font-bold px-3 py-1 rounded-full border border-gold-500/20">
                Sistema Francés
              </span>
            </div>

            {/* Cuota mensual destacada */}
            <div className="space-y-1">
              <span className="text-xs text-slate-300 font-medium">Cuota Mensual Estimada:</span>
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {formatCOP(resultado.cuotaMensual)}
                <span className="text-sm font-normal text-slate-300"> /mes</span>
              </div>
              <p className="text-[11px] text-slate-400">
                *Cuota fija mensual aproximada (capital + intereses corrientes).
              </p>
            </div>

            {/* Desglose de totales */}
            <div className="bg-bank-950/60 rounded-xl p-4 space-y-3 text-sm border border-bank-800">
              <div className="flex justify-between text-slate-300 text-xs">
                <span>Monto solicitado (Capital):</span>
                <span className="font-semibold text-white">{formatCOP(valorSolicitado)}</span>
              </div>
              <div className="flex justify-between text-slate-300 text-xs">
                <span>Plazo total:</span>
                <span className="font-semibold text-white">{plazoMeses} meses</span>
              </div>
              <div className="flex justify-between text-slate-300 text-xs">
                <span>Tasa aplicada:</span>
                <span className="font-semibold text-gold-400">
                  {tasaInteresMV}% M.V. ({resultado.tasaInteresEA}% E.A.)
                </span>
              </div>
              <div className="flex justify-between text-slate-300 text-xs pt-2 border-t border-bank-800">
                <span>Total intereses estimados:</span>
                <span className="font-semibold text-amber-300">
                  {formatCOP(resultado.totalIntereses)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-bank-700">
                <span>Total a Pagar:</span>
                <span className="text-emerald-400">{formatCOP(resultado.totalPagar)}</span>
              </div>
            </div>

            {/* Botones de acción del resultado */}
            <div className="space-y-2.5 pt-2 no-print">
              <button
                type="button"
                onClick={() => setMostrarTabla(!mostrarTabla)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold transition-all border border-white/10"
              >
                <TableIcon className="w-4 h-4 text-bank-300" />
                <span>{mostrarTabla ? "Ocultar Amortización" : "Ver Tabla de Amortización"}</span>
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleGuardar}
                  disabled={guardando}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gold-500 hover:bg-gold-600 text-bank-950 text-sm font-bold shadow-md transition-all disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{guardando ? "Guardando..." : "Guardar Simulación"}</span>
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
                  <span>¡Simulación registrada con éxito en el historial del sistema!</span>
                </div>
              )}
            </div>
          </div>

          {/* Banner de nota aclaratoria según requerimientos de claridad del EV9 */}
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>
              <strong>Información importante:</strong> Este simulacro es de carácter informativo y
              no constituye oferta contractual vinculante. No incluye cargos por seguros de vida
              deudores ni otros costos de ley que puedan aplicar en el desembolso final.
            </p>
          </div>
        </div>
      </div>

      {/* Tabla de amortización detallada mes a mes */}
      {mostrarTabla && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <TableIcon className="w-5 h-5 text-bank-600" />
                <span>Tabla de Amortización Mensual (Cuotas 1 a {plazoMeses})</span>
              </h3>
              <p className="text-xs text-slate-500">
                Desglose proyectado de capital, intereses y saldo para cada periodo.
              </p>
            </div>
            <div className="text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
              Sistema Francés (Cuota Fija)
            </div>
          </div>

          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-slate-800 uppercase font-semibold sticky top-0">
                <tr>
                  <th className="py-2.5 px-3">Mes</th>
                  <th className="py-2.5 px-3">Valor Cuota</th>
                  <th className="py-2.5 px-3">Abono Capital</th>
                  <th className="py-2.5 px-3">Intereses</th>
                  <th className="py-2.5 px-3 text-right">Saldo Restante</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {resultado.tablaAmortizacion.map((item) => (
                  <tr key={item.mes} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2 px-3 font-semibold text-slate-900">Mes {item.mes}</td>
                    <td className="py-2 px-3 font-medium text-slate-800">
                      {formatCOP(item.cuota)}
                    </td>
                    <td className="py-2 px-3 text-emerald-700">{formatCOP(item.capital)}</td>
                    <td className="py-2 px-3 text-amber-700">{formatCOP(item.interes)}</td>
                    <td className="py-2 px-3 text-right font-semibold text-slate-900">
                      {formatCOP(item.saldoRestante)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
