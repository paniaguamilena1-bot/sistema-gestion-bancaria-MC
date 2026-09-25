"use client";

import { useState, useMemo } from "react";
import { Oficina } from "@/types";
import {
  MapPin,
  Clock,
  Phone,
  Search,
  Building2,
  CreditCard,
  CheckCircle2,
  Navigation,
} from "lucide-react";

interface OfficesDirectoryProps {
  initialOffices: Oficina[];
}

export default function OfficesDirectory({ initialOffices }: OfficesDirectoryProps) {
  const [busqueda, setBusqueda] = useState<string>("");
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState<string>("todas");
  const [tipoSeleccionado, setTipoSeleccionado] = useState<string>("todos");

  // Obtener ciudades únicas
  const ciudades = useMemo(() => {
    const list = Array.from(new Set(initialOffices.map((o) => o.ciudad)));
    return list.sort();
  }, [initialOffices]);

  // Filtrado
  const oficinasFiltradas = useMemo(() => {
    return initialOffices.filter((ofi) => {
      const matchBusqueda =
        ofi.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        ofi.direccion.toLowerCase().includes(busqueda.toLowerCase()) ||
        ofi.ciudad.toLowerCase().includes(busqueda.toLowerCase());

      const matchCiudad = ciudadSeleccionada === "todas" || ofi.ciudad === ciudadSeleccionada;
      const matchTipo = tipoSeleccionado === "todos" || ofi.tipo === tipoSeleccionado;

      return matchBusqueda && matchCiudad && matchTipo;
    });
  }, [initialOffices, busqueda, ciudadSeleccionada, tipoSeleccionado]);

  return (
    <div className="space-y-8">
      {/* Barra de filtros y búsqueda */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Búsqueda por texto */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Buscar por sede, dirección o sector..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-bank-500"
            />
          </div>

          {/* Filtro por ciudad */}
          <div className="md:col-span-3">
            <select
              value={ciudadSeleccionada}
              onChange={(e) => setCiudadSeleccionada(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white outline-none focus:ring-2 focus:ring-bank-500"
            >
              <option value="todas">Todas las ciudades ({ciudades.length})</option>
              {ciudades.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por tipo (Sucursal / Cajero) */}
          <div className="md:col-span-3">
            <select
              value={tipoSeleccionado}
              onChange={(e) => setTipoSeleccionado(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white outline-none focus:ring-2 focus:ring-bank-500"
            >
              <option value="todos">Todos los puntos</option>
              <option value="Sucursal">Sucursales Físicas</option>
              <option value="Cajero automático">Cajeros Automáticos</option>
            </select>
          </div>
        </div>

        {/* Resumen de resultados encontrados */}
        <div className="flex justify-between items-center text-xs text-slate-500 pt-1 border-t border-slate-100">
          <span>
            Mostrando <strong>{oficinasFiltradas.length}</strong> punto(s) de atención encontrados
          </span>
          {(busqueda || ciudadSeleccionada !== "todas" || tipoSeleccionado !== "todos") && (
            <button
              onClick={() => {
                setBusqueda("");
                setCiudadSeleccionada("todas");
                setTipoSeleccionado("todos");
              }}
              className="text-bank-700 hover:underline font-semibold"
            >
              Restablecer filtros
            </button>
          )}
        </div>
      </div>

      {/* Grid de puntos de atención */}
      {oficinasFiltradas.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <MapPin className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="font-bold text-slate-800">No encontramos oficinas con ese criterio</h3>
          <p className="text-xs text-slate-500">
            Intenta con otra ciudad o término de búsqueda.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {oficinasFiltradas.map((ofi) => {
            const esSucursal = ofi.tipo === "Sucursal";
            return (
              <div
                key={ofi.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        esSucursal
                          ? "bg-bank-50 text-bank-700 border border-bank-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {esSucursal ? (
                        <Building2 className="w-3.5 h-3.5" />
                      ) : (
                        <CreditCard className="w-3.5 h-3.5" />
                      )}
                      <span>{ofi.tipo}</span>
                    </span>

                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md">
                      {ofi.ciudad}, {ofi.departamento}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{ofi.nombre}</h3>
                    <div className="flex items-start gap-2 text-xs text-slate-600 mt-2">
                      <MapPin className="w-4 h-4 text-bank-600 shrink-0 mt-0.5" />
                      <span className="font-medium">{ofi.direccion}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{ofi.telefono}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span>{ofi.horario}</span>
                    </div>
                  </div>

                  {/* Servicios disponibles en el punto */}
                  <div className="pt-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Servicios en este punto:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {ofi.servicios.map((s, idx) => (
                        <span
                          key={idx}
                          className="inline-block text-[11px] bg-slate-50 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-md"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Acción de navegación rápida */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${ofi.nombre} ${ofi.direccion} ${ofi.ciudad}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-bank-700 hover:text-bank-900 font-semibold"
                  >
                    <Navigation className="w-3.5 h-3.5 text-bank-600" />
                    <span>Ver en Google Maps</span>
                  </a>
                  {ofi.tieneCajero && (
                    <span className="text-emerald-700 font-medium">✓ Cajero disponible</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
