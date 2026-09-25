"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Landmark,
  Calculator,
  Coins,
  MapPin,
  HelpCircle,
  Mail,
  UserCheck,
  Menu,
  X,
  CreditCard,
  ChevronRight,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Inicio", icon: Landmark },
    { href: "/productos", label: "Productos", icon: CreditCard },
    { href: "/simulador-credito", label: "Simulador Crédito", icon: Calculator },
    { href: "/simulador-cdt", label: "Simulador CDT", icon: Coins },
    { href: "/oficinas", label: "Oficinas y Cajeros", icon: MapPin },
    { href: "/preguntas-frecuentes", label: "Preguntas Frecuentes", icon: HelpCircle },
    { href: "/contacto", label: "Contacto", icon: Mail },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 glass-nav border-b border-slate-200/80 shadow-sm transition-all">
      {/* Top Banner Institucional */}
      <div className="bg-bank-950 text-slate-300 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Línea de Atención Nacional: 018000 912345 | La Dorada, Caldas
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Vigilado Superintendencia Financiera</span>
            <span>•</span>
            <span className="text-gold-400 font-medium">Seguro FOGAFIN</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Entity Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-bank-900 to-bank-600 flex items-center justify-center text-white shadow-md shadow-bank-900/20 group-hover:scale-105 transition-transform">
              <Landmark className="w-6 h-6 text-gold-400" />
            </div>
            <div>
              <span className="text-xl font-bold text-bank-950 tracking-tight block leading-tight">
                BanCentral <span className="text-bank-600">MC</span>
              </span>
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
                Entidad Financiera Institucional
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    active
                      ? "text-bank-700 bg-bank-50 font-semibold"
                      : "text-slate-600 hover:text-bank-800 hover:bg-slate-100/70"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? "text-bank-600" : "text-slate-400"}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop User Access CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-bank-800 to-bank-700 hover:from-bank-900 hover:to-bank-800 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm hover:shadow transition-all"
            >
              <UserCheck className="w-4 h-4 text-gold-400" />
              <span>Acceso al Usuario</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-bank-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Abrir menú"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white shadow-xl px-4 pt-3 pb-6 space-y-1">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  active
                    ? "text-bank-700 bg-bank-50 font-semibold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${active ? "text-bank-600" : "text-slate-400"}`} />
                  <span>{link.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            );
          })}
          <div className="pt-4 border-t border-slate-100">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-bank-900 text-white py-3 rounded-lg font-semibold shadow-sm"
            >
              <UserCheck className="w-5 h-5 text-gold-400" />
              <span>Acceso al Usuario (Asesores / Admin)</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
