"use server";

import { revalidatePath } from "next/cache";
import { guardarContactoMensaje, guardarSimulacion, validarCredenciales } from "@/lib/db";
import { SimulacionHistorial } from "@/types";

export async function guardarSimulacionAction(data: {
  tipo: "credito" | "cdt";
  tipoCredito?: string;
  tipoCDT?: string;
  clienteNombre?: string;
  valorSolicitado?: number;
  valorInversion?: number;
  plazoMeses?: number;
  tiempoDias?: number;
  tasaInteresMV?: number;
  tasaRentabilidadEA?: number;
  cuotaMensual?: number;
  totalIntereses?: number;
  totalPagar?: number;
  rendimientoBruto?: number;
  retencionFuente?: number;
  rendimientoNeto?: number;
  totalLiquidar?: number;
  asesor?: string;
}) {
  try {
    const registro = await guardarSimulacion({
      ...data,
      clienteNombre: data.clienteNombre?.trim() || "Cliente Web",
      asesor: data.asesor?.trim() || "Simulador Portal Web",
    });
    revalidatePath("/dashboard");
    return { success: true, id: registro.id };
  } catch (error) {
    console.error("Error al registrar simulación:", error);
    return { success: false, error: "No se pudo guardar la simulación" };
  }
}

export async function enviarContactoAction(formData: FormData) {
  try {
    const nombre = formData.get("nombre") as string;
    const email = formData.get("email") as string;
    const telefono = (formData.get("telefono") as string) || "";
    const ciudad = (formData.get("ciudad") as string) || "La Dorada";
    const asunto = formData.get("asunto") as string;
    const mensaje = formData.get("mensaje") as string;

    if (!nombre || !email || !asunto || !mensaje) {
      return { success: false, error: "Por favor diligencia todos los campos requeridos." };
    }

    const nuevoMensaje = await guardarContactoMensaje({
      nombre,
      email,
      telefono,
      ciudad,
      asunto,
      mensaje,
    });

    revalidatePath("/dashboard");
    return { success: true, id: nuevoMensaje.id };
  } catch (error) {
    console.error("Error al enviar mensaje de contacto:", error);
    return { success: false, error: "Ocurrió un error al procesar tu solicitud." };
  }
}

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Ingresa tu correo y contraseña." };
  }

  const usuario = await validarCredenciales(email, password);
  if (!usuario) {
    return { success: false, error: "Credenciales inválidas o usuario inactivo." };
  }

  return { success: true, user: usuario };
}
