import ContactForm from "@/components/contact/ContactForm";
import { Mail, Phone, MapPin, Clock, ShieldCheck, Headphones } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Canales de Atención y Contacto | BanCentral MC",
  description:
    "Canales oficiales de atención de la entidad financiera: teléfonos, correo electrónico, horarios de oficina y formulario de contacto.",
};

export default function ContactoPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      {/* Encabezado */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bank-100 text-bank-800 text-xs font-semibold">
          <Mail className="w-3.5 h-3.5 text-bank-600" />
          <span>Canales de Atención al Usuario</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Contacto y Servicio al Cliente
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Estamos a tu disposición a través de nuestros canales presenciales, telefónicos y digitales
          para responder tus solicitudes con agilidad y calidez.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Canales oficiales de atención */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-bank-950 to-bank-900 text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl border border-bank-800">
            <div>
              <span className="text-xs font-bold text-gold-400 uppercase tracking-wider block">
                Canales Oficiales
              </span>
              <h2 className="text-xl font-bold mt-1">Información de la Entidad</h2>
            </div>

            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-gold-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase">
                    Sede Administrativa Principal
                  </div>
                  <div className="font-medium text-slate-100 mt-0.5">
                    Calle 14 # 3-45, Sector Centro
                  </div>
                  <div className="text-xs text-slate-400">La Dorada, Caldas – Colombia</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-bank-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase">
                    Líneas Telefónicas
                  </div>
                  <div className="font-medium text-slate-100 mt-0.5">
                    PBX: (+57) 606 857 2300
                  </div>
                  <div className="text-xs text-slate-400">Línea Nacional Gratuita: 018000 912345</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase">
                    Correo Electrónico
                  </div>
                  <div className="font-medium text-slate-100 mt-0.5">
                    servicioalcliente@bancentralmc.com
                  </div>
                  <div className="text-xs text-slate-400">atencioncomercial@banco.com</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-amber-300">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase">
                    Horario de Atención
                  </div>
                  <div className="font-medium text-slate-100 mt-0.5">
                    Lunes a Viernes:
                  </div>
                  <div className="text-xs text-slate-300">
                    8:00 a.m. - 11:30 a.m. y 2:00 p.m. - 4:30 p.m.
                  </div>
                  <div className="font-medium text-slate-100 mt-1">Sábados:</div>
                  <div className="text-xs text-slate-300">9:00 a.m. - 12:00 m.</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-bank-800 text-xs text-slate-400 flex items-center gap-2">
              <Headphones className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Atención telefónica disponible en jornada laboral habitual.</span>
            </div>
          </div>
        </div>

        {/* Formulario interactivo */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
