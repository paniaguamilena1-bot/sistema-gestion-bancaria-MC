import Link from "next/link";
import {
  Landmark,
  Calculator,
  Coins,
  ShieldCheck,
  CreditCard,
  MapPin,
  HelpCircle,
  Mail,
  ArrowRight,
  TrendingUp,
  Clock,
  Award,
  Users,
} from "lucide-react";
import { getProductos } from "@/lib/db";
import { formatCOP } from "@/lib/financial-math";

export default async function HomePage() {
  const productos = await getProductos();
  const productosDestacados = productos.slice(0, 3);

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* HERO SECTION INSTITUCIONAL */}
      <section className="relative gradient-bank-hero text-white overflow-hidden py-16 lg:py-24 px-4 sm:px-6 lg:px-8 shadow-inner">
        {/* Glow decorative effects */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-bank-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Texto principal */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bank-800/80 border border-bank-700/60 text-xs font-semibold text-bank-200">
                <Landmark className="w-4 h-4 text-gold-400" />
                <span>Sistema de Gestión Bancaria Institucional</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Soluciones financieras inteligentes para alcanzar tus metas
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Bienvenido al portal oficial de BanCentral MC. Consulta nuestros productos, simula tu
                crédito o inversión en CDT con tasas actualizadas y encuentra la oficina o cajero más
                cercano a ti en pocos clics.
              </p>

              {/* Botones de acción rápida */}
              <div className="pt-2 flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link
                  href="/simulador-credito"
                  className="inline-flex items-center gap-2.5 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-bank-950 font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-gold-500/20 hover:shadow-gold-500/30 transition-all text-sm group"
                >
                  <Calculator className="w-5 h-5 text-bank-950" />
                  <span>Simular Crédito</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/simulador-cdt"
                  className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all text-sm backdrop-blur-sm group"
                >
                  <Coins className="w-5 h-5 text-gold-400" />
                  <span>Simular CDT</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/productos"
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-white px-4 py-3.5 text-sm font-medium transition-colors"
                >
                  <span>Ver Catálogo</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Badges de confianza */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap gap-6 justify-center lg:justify-start text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Seguro de Depósitos FOGAFIN</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-bank-300" />
                  <span>Tasas competitivas vigentes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold-400" />
                  <span>Simulaciones en tiempo real</span>
                </div>
              </div>
            </div>

            {/* Tarjeta interactiva rápida */}
            <div className="lg:col-span-5">
              <div className="bg-white/95 text-slate-900 rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/20 backdrop-blur-md space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold text-bank-600 uppercase tracking-wider block">
                      Accesos Rápidos
                    </span>
                    <h2 className="text-xl font-bold text-slate-900">¿Qué deseas realizar hoy?</h2>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-bank-50 flex items-center justify-center text-bank-600">
                    <Landmark className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/simulador-credito"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-bank-500 hover:bg-bank-50/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-bank-100 text-bank-700 flex items-center justify-center">
                        <Calculator className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 text-sm group-hover:text-bank-700">
                          Cotizar Crédito de Libre Inversión
                        </div>
                        <div className="text-xs text-slate-500">Calcula tu cuota mensual estimada</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-bank-600 group-hover:translate-x-1 transition-all" />
                  </Link>

                  <Link
                    href="/simulador-cdt"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <Coins className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 text-sm group-hover:text-emerald-700">
                          Calcular Rendimiento de CDT
                        </div>
                        <div className="text-xs text-slate-500">Conoce tus ganancias según el plazo</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                  </Link>

                  <Link
                    href="/oficinas"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-bank-500 hover:bg-bank-50/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 text-sm group-hover:text-amber-700">
                          Sucursales y Cajeros
                        </div>
                        <div className="text-xs text-slate-500">Encuentra tu punto de atención</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>

                <div className="pt-2 text-center">
                  <Link
                    href="/login"
                    className="text-xs text-bank-700 hover:text-bank-900 font-semibold underline underline-offset-4"
                  >
                    ¿Eres asesor o administrador? Inicia sesión aquí →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INFORMACIÓN INSTITUCIONAL Y MISIÓN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-8 sm:p-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs font-bold text-bank-600 uppercase tracking-widest">
              Identidad Institucional
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Nuestra Misión y Compromiso
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              Proveer soluciones financieras integrales y accesibles con altos estándares de
              eficiencia, transparencia e innovación tecnológica, facilitando a nuestros clientes
              tomar decisiones informadas y respaldando el desarrollo de familias y empresas de la
              región.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-slate-100">
            <div className="flex flex-col items-center text-center space-y-3 p-4 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-bank-50 text-bank-700 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900">Solidez y Transparencia</h3>
              <p className="text-sm text-slate-500">
                Información clara y sin letra menuda. Todas nuestras tasas y condiciones se calculan con total exactitud.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3 p-4 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-gold-50 text-gold-700 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900">Agilidad en el Servicio</h3>
              <p className="text-sm text-slate-500">
                Herramientas diseñadas para que clientes y asesores obtengan respuestas y cotizaciones en segundos.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3 p-4 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900">Atención Cercana</h3>
              <p className="text-sm text-slate-500">
                Canales de atención presencial y digital dispuestos para orientarte en cada etapa de tu vida financiera.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-bank-600 uppercase tracking-widest block">
              Portafolio Financiero
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Productos Destacados
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Conoce algunas de nuestras soluciones de ahorro, inversión y crédito.
            </p>
          </div>
          <Link
            href="/productos"
            className="inline-flex items-center gap-2 text-sm font-semibold text-bank-700 hover:text-bank-900 group"
          >
            <span>Ver todo el portafolio</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {productosDestacados.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                      prod.categoria === "ahorro"
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : prod.categoria === "cdt"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-purple-50 text-purple-700 border border-purple-200"
                    }`}
                  >
                    {prod.tipo}
                  </span>
                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                    Tasa: {prod.tasaReferencia}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-bank-700 transition-colors">
                  {prod.nombre}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {prod.descripcionCorta}
                </p>

                <div className="pt-2 text-xs text-slate-500 space-y-1 border-t border-slate-100">
                  <div>
                    <span className="font-semibold text-slate-700">Monto mínimo:</span>{" "}
                    {prod.montoMinimo === 0 ? "Sin monto mínimo" : formatCOP(prod.montoMinimo)}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Plazo sugerido:</span>{" "}
                    {prod.plazoMinimo}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={
                    prod.categoria === "credito"
                      ? "/simulador-credito"
                      : prod.categoria === "cdt"
                      ? "/simulador-cdt"
                      : "/productos"
                  }
                  className="text-xs font-semibold text-bank-600 hover:text-bank-800 flex items-center gap-1"
                >
                  <span>{prod.categoria === "ahorro" ? "Ver detalles" : "Simular ahora"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/productos"
                  className="text-xs text-slate-400 hover:text-slate-600"
                >
                  Ficha técnica
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN ACCESO DIRECTO A CANALES Y PREGUNTAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tarjeta Oficinas */}
          <div className="bg-gradient-to-br from-slate-900 to-bank-950 text-white rounded-2xl p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-gold-400">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold">Oficinas y Cajeros Automáticos</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Encuentra nuestra sucursal principal en La Dorada (Caldas) o localiza puntos de
                atención y cajeros en las principales ciudades del país.
              </p>
            </div>
            <div>
              <Link
                href="/oficinas"
                className="inline-flex items-center gap-2 bg-bank-600 hover:bg-bank-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              >
                <span>Consultar Directorio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Tarjeta Contacto y Preguntas */}
          <div className="bg-gradient-to-br from-bank-900 to-slate-900 text-white rounded-2xl p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold">Canales de Atención y Soporte</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                ¿Tienes dudas sobre tasas, requisitos o el funcionamiento de los simuladores?
                Consulta nuestras preguntas frecuentes o escríbenos directamente.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/preguntas-frecuentes"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
              >
                <HelpCircle className="w-4 h-4 text-bank-300" />
                <span>Preguntas Frecuentes</span>
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-bank-950 px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
              >
                <span>Formulario de Contacto</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
