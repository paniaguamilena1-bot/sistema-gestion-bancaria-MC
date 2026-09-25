"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/app/actions";
import { Lock, Mail, UserCheck, Shield, KeyRound, AlertCircle, Loader2 } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const res = await loginAction(formData);
    setLoading(false);

    if (res.success && res.user) {
      // Guardar en sessionStorage para sesión en el cliente
      sessionStorage.setItem("bancentral_user", JSON.stringify(res.user));
      router.push("/dashboard");
    } else {
      setError(res.error || "Error de inicio de sesión");
    }
  };

  const handlePreFill = (role: "asesor" | "admin") => {
    if (role === "asesor") {
      setEmail("asesor@banco.com");
      setPassword("asesor123");
    } else {
      setEmail("admin@banco.com");
      setPassword("admin123");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-8 sm:p-10 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-xl bg-bank-100 text-bank-700 flex items-center justify-center mx-auto shadow-inner">
          <Lock className="w-6 h-6 text-bank-700" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Portal de Acceso al Usuario</h2>
        <p className="text-xs text-slate-500">
          Módulo exclusivo para Asesores Financieros y Administradores del Sistema (EV9)
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Correo Electrónico Institucional
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="asesor@banco.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-bank-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Contraseña</label>
          <div className="relative">
            <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-bank-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-bank-800 to-bank-700 hover:from-bank-900 hover:to-bank-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all text-sm disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Verificando credenciales...</span>
            </>
          ) : (
            <>
              <UserCheck className="w-4 h-4 text-gold-400" />
              <span>Ingresar al Sistema</span>
            </>
          )}
        </button>
      </form>

      {/* Credenciales de demostración predefinidas en EV9 */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center">
          Credenciales de Demostración del Sistema:
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handlePreFill("asesor")}
            className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-bank-50 hover:border-bank-300 text-left transition-colors"
          >
            <div className="text-xs font-bold text-bank-800">Rol: Asesor Financiero</div>
            <div className="text-[11px] text-slate-500 font-mono">asesor@banco.com</div>
          </button>

          <button
            type="button"
            onClick={() => handlePreFill("admin")}
            className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-purple-50 hover:border-purple-300 text-left transition-colors"
          >
            <div className="text-xs font-bold text-purple-800">Rol: Administrador</div>
            <div className="text-[11px] text-slate-500 font-mono">admin@banco.com</div>
          </button>
        </div>
      </div>
    </div>
  );
}
