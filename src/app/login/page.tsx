import LoginForm from "@/components/auth/LoginForm";
import { ShieldCheck, UserCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acceso al Usuario | BanCentral MC",
  description:
    "Portal de autenticación institucional para asesores financieros y administradores del sistema bancario.",
};

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full space-y-6">
        <LoginForm />

        <div className="text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Acceso seguro protegido con registro de actividades de usuario</span>
        </div>
      </div>
    </div>
  );
}
