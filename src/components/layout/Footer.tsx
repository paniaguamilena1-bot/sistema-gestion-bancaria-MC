import Link from "next/link";
import { Landmark, Phone, Mail, MapPin, ShieldCheck, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto border-t border-slate-800">
      {/* Sección principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Columna 1: Identidad Institucional */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-bank-600 flex items-center justify-center text-white shadow-md">
                <Landmark className="w-5 h-5 text-gold-400" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                BanCentral <span className="text-bank-400">MC</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Sistema de Información para la Gestión Bancaria y Financiera. Comprometidos con la
              atención ágil, la transparencia y el desarrollo socioeconómico de nuestra comunidad.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Vigilado Superintendencia Financiera
              </span>
            </div>
          </div>

          {/* Columna 2: Simuladores y Productos */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Productos y Simuladores
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/productos" className="hover:text-white transition-colors">
                  Cuentas de Ahorro
                </Link>
              </li>
              <li>
                <Link href="/productos" className="hover:text-white transition-colors">
                  Líneas de Crédito
                </Link>
              </li>
              <li>
                <Link href="/productos" className="hover:text-white transition-colors">
                  Certificados de Depósito (CDT)
                </Link>
              </li>
              <li>
                <Link href="/simulador-credito" className="text-gold-400 hover:text-gold-300 font-medium transition-colors">
                  Simulador de Crédito
                </Link>
              </li>
              <li>
                <Link href="/simulador-cdt" className="text-gold-400 hover:text-gold-300 font-medium transition-colors">
                  Simulador de CDT
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Información y Canales */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Canales y Atención
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/oficinas" className="hover:text-white transition-colors">
                  Sucursales y Oficinas
                </Link>
              </li>
              <li>
                <Link href="/oficinas" className="hover:text-white transition-colors">
                  Red de Cajeros Automáticos
                </Link>
              </li>
              <li>
                <Link href="/preguntas-frecuentes" className="hover:text-white transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-white transition-colors">
                  Formulario de Contacto
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Portal Asesores y Administradores
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto Institucional */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Sede y Contacto
            </h3>
            <div className="flex items-start gap-3 text-sm text-slate-400">
              <MapPin className="w-5 h-5 text-bank-400 shrink-0 mt-0.5" />
              <span>Calle 14 # 3-45, Centro, La Dorada - Caldas, Colombia</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <Phone className="w-5 h-5 text-bank-400 shrink-0" />
              <span>(606) 857 2300 | 018000 912345</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <Mail className="w-5 h-5 text-bank-400 shrink-0" />
              <span>servicioalcliente@bancentralmc.com</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-slate-400 pt-1">
              <Clock className="w-5 h-5 text-bank-400 shrink-0 mt-0.5" />
              <span>Lun a Vie: 8:00 a.m. - 11:30 a.m. y 2:00 p.m. - 4:30 p.m.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-footer legal */}
      <div className="bg-slate-950 py-6 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} BanCentral MC. Proyecto EV9 – Planeación y Diseño de un Sistema de Información para una Entidad Financiera.
          </p>
          <div className="flex items-center gap-6">
            <span>SENA - Tecnólogo en Gestión Bancaria</span>
            <span>ID: 3230956</span>
            <span>La Dorada, Caldas</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
