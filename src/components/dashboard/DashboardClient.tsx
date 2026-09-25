"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ContactoMensaje,
  Oficina,
  Producto,
  SimulacionHistorial,
  Usuario,
} from "@/types";
import { formatCOP } from "@/lib/financial-math";
import {
  UserCheck,
  LogOut,
  Calculator,
  Coins,
  Inbox,
  Clock,
  Shield,
  FileSpreadsheet,
  Building,
  CheckCircle,
  ExternalLink,
  Search,
} from "lucide-react";

interface DashboardClientProps {
  simulaciones: SimulacionHistorial[];
  mensajes: ContactoMensaje[];
  productos: Producto[];
  oficinas: Oficina[];
}

export default function DashboardClient({
  simulaciones,
  mensajes,
  productos,
  oficinas,
}: DashboardClientProps) {
  const router = useRouter();
  const [user, setUser] = useState<Usuario | null>(null);
  const [tabActiva, setTabActiva] = useState<"simulaciones" | "mensajes" | "productos">("simulaciones");
  const [filtroTipoSim, setFiltroTipoSim] = useState<string>("todos");

  useEffect(() => {
    const raw = sessionStorage.getItem("bancentral_user");
    if (!raw) {
      router.push("/login");
    } else {
      setUser(JSON.parse(raw));
    }
  }, [router]);

  const handleCerrarSesion = () => {
    sessionStorage.removeItem("bancentral_user");
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-slate-500 text-sm">
        Verificando sesión...
      </div>
    );
  }

  const simulacionesFiltradas = simulaciones.filter((s) => {
    if (filtroTipoSim === "todos") return true;
    return s.tipo === filtroTipoSim;
  });

  return (
    <div className="space-y-8">
      {/* Tarjeta de bienvenida del usuario según perfil */}
      <div className="bg-gradient-to-r from-bank-950 via-bank-900 to-bank-800 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-bank-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-bank-700/80 border border-bank-500/40 flex items-center justify-center text-gold-400 font-bold text-2xl shadow-inner">
            {user.nombre.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold">{user.nombre}</span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                  user.rol === "admin"
                    ? "bg-purple-900 text-purple-200 border border-purple-500/40"
                    : "bg-emerald-900 text-emerald-200 border border-emerald-500/40"
                }`}
              >
                {user.rol === "admin" ? "Administrador" : "Asesor Financiero"}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              {user.cargo} • {user.sucursal}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link
            href="/simulador-credito"
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-bank-950 font-bold text-xs shadow-md transition-all"
          >
            <Calculator className="w-4 h-4" />
            <span>Nuevo Simulacro</span>
          </Link>
          <button
            onClick={handleCerrarSesion}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold border border-white/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>

      {/* Métricas rápidas del sistema */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-medium">Simulaciones en Historial</span>
          <div className="text-2xl font-bold text-bank-900">{simulaciones.length}</div>
          <span className="text-[11px] text-emerald-600 font-semibold">
            {simulaciones.filter((s) => s.tipo === "credito").length} Créditos /{" "}
            {simulaciones.filter((s) => s.tipo === "cdt").length} CDT
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-medium">Solicitudes de Contacto</span>
          <div className="text-2xl font-bold text-slate-900">{mensajes.length}</div>
          <span className="text-[11px] text-slate-500">Recibidas por portal web</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-medium">Productos Activos</span>
          <div className="text-2xl font-bold text-slate-900">{productos.length}</div>
          <span className="text-[11px] text-slate-500">Ahorro, CDT y Crédito</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-medium">Puntos de Atención</span>
          <div className="text-2xl font-bold text-slate-900">{oficinas.length}</div>
          <span className="text-[11px] text-slate-500">Sucursales y Cajeros</span>
        </div>
      </div>

      {/* Pestañas del Panel de Control */}
      <div className="space-y-4">
        <div className="flex border-b border-slate-200 gap-4 text-sm font-semibold">
          <button
            onClick={() => setTabActiva("simulaciones")}
            className={`pb-3 px-1 transition-all flex items-center gap-2 ${
              tabActiva === "simulaciones"
                ? "border-b-2 border-bank-700 text-bank-700"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Historial de Simulaciones ({simulaciones.length})</span>
          </button>

          <button
            onClick={() => setTabActiva("mensajes")}
            className={`pb-3 px-1 transition-all flex items-center gap-2 ${
              tabActiva === "mensajes"
                ? "border-b-2 border-bank-700 text-bank-700"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Bandeja de Contactos ({mensajes.length})</span>
          </button>

          <button
            onClick={() => setTabActiva("productos")}
            className={`pb-3 px-1 transition-all flex items-center gap-2 ${
              tabActiva === "productos"
                ? "border-b-2 border-bank-700 text-bank-700"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Directorio de Productos</span>
          </button>
        </div>

        {/* TAB 1: HISTORIAL DE SIMULACIONES */}
        {tabActiva === "simulaciones" && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-4 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Simulaciones Registradas en Base de Datos Local
                </h3>
                <p className="text-xs text-slate-500">
                  Herramienta para que los asesores consulten y retomen cotizaciones previas.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setFiltroTipoSim("todos")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    filtroTipoSim === "todos" ? "bg-bank-900 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  Todas
                </button>
                <button
                  onClick={() => setFiltroTipoSim("credito")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    filtroTipoSim === "credito"
                      ? "bg-purple-700 text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  Créditos
                </button>
                <button
                  onClick={() => setFiltroTipoSim("cdt")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    filtroTipoSim === "cdt"
                      ? "bg-emerald-700 text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  CDT
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-800 uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-4">Fecha</th>
                    <th className="py-3 px-4">Tipo</th>
                    <th className="py-3 px-4">Cliente / Titular</th>
                    <th className="py-3 px-4">Monto / Inversión</th>
                    <th className="py-3 px-4">Plazo</th>
                    <th className="py-3 px-4">Resultado Estimado</th>
                    <th className="py-3 px-4">Asesor / Canal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {simulacionesFiltradas.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-500">
                        No hay simulaciones registradas en esta categoría.
                      </td>
                    </tr>
                  ) : (
                    simulacionesFiltradas.map((sim) => (
                      <tr key={sim.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                          {new Date(sim.fecha).toLocaleDateString("es-CO", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-md font-bold uppercase text-[10px] ${
                              sim.tipo === "credito"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-emerald-100 text-emerald-800"
                            }`}
                          >
                            {sim.tipo}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-900">
                          {sim.clienteNombre || "Cliente Web"}
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-800">
                          {formatCOP(sim.valorSolicitado || sim.valorInversion || 0)}
                        </td>
                        <td className="py-3 px-4">
                          {sim.tipo === "credito"
                            ? `${sim.plazoMeses} meses`
                            : `${sim.tiempoDias} días`}
                        </td>
                        <td className="py-3 px-4 font-bold text-bank-800">
                          {sim.tipo === "credito"
                            ? `Cuota: ${formatCOP(sim.cuotaMensual || 0)}`
                            : `Neto: +${formatCOP(sim.rendimientoNeto || 0)}`}
                        </td>
                        <td className="py-3 px-4 text-slate-500">{sim.asesor || "Web"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: SOLICITUDES DE CONTACTO */}
        {tabActiva === "mensajes" && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-4 animate-in fade-in">
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Solicitudes Recibidas a través del Formulario Web
              </h3>
              <p className="text-xs text-slate-500">
                Peticiones de información, quejas, reclamos o solicitudes de crédito para gestión
                comercial.
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              {mensajes.length === 0 ? (
                <div className="py-8 text-center text-slate-500 text-xs">
                  No hay mensajes registrados.
                </div>
              ) : (
                mensajes.map((m) => (
                  <div key={m.id} className="py-4 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{m.nombre}</span>
                        <span className="text-xs text-slate-500">• {m.email}</span>
                        {m.telefono && (
                          <span className="text-xs text-slate-500">• Tel: {m.telefono}</span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400">
                        Radicado: {m.id} | {new Date(m.fecha).toLocaleDateString("es-CO")}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-bank-700 bg-bank-50 inline-block px-2.5 py-0.5 rounded">
                      Asunto: {m.asunto}
                    </div>
                    <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                      {m.mensaje}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 3: RESUMEN DE PRODUCTOS PARA ASESORES */}
        {tabActiva === "productos" && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-4 animate-in fade-in">
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Catálogo de Productos y Fichas para Asesoría
              </h3>
              <p className="text-xs text-slate-500">
                Tasas de referencia y requisitos oficiales para responder ágilmente al cliente.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {productos.map((p) => (
                <div key={p.id} className="p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase text-slate-500">{p.tipo}</span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {p.tasaReferencia}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">{p.nombre}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2">{p.descripcionCorta}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
