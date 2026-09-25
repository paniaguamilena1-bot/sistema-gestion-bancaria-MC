import fs from "fs/promises";
import path from "path";
import {
  ContactoMensaje,
  FaqItem,
  Oficina,
  Producto,
  SimulacionHistorial,
  Usuario,
} from "@/types";

const DATA_DIR = path.join(process.cwd(), "src", "data");

// Helper genérico para leer archivos JSON
async function readJsonFile<T>(filename: string, defaultValue: T): Promise<T> {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`Error leyendo archivo JSON ${filename}:`, error);
    return defaultValue;
  }
}

// Helper genérico para escribir archivos JSON
async function writeJsonFile<T>(filename: string, data: T): Promise<boolean> {
  try {
    const filePath = path.join(DATA_DIR, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error(`Error guardando archivo JSON ${filename}:`, error);
    return false;
  }
}

// 1. Productos
export async function getProductos(): Promise<Producto[]> {
  return await readJsonFile<Producto[]>("productos.json", []);
}

export async function getProductoById(id: string): Promise<Producto | null> {
  const productos = await getProductos();
  return productos.find((p) => p.id === id) || null;
}

// 2. Oficinas y Cajeros
export async function getOficinas(): Promise<Oficina[]> {
  return await readJsonFile<Oficina[]>("oficinas.json", []);
}

// 3. Preguntas Frecuentes
export async function getFaqs(): Promise<FaqItem[]> {
  return await readJsonFile<FaqItem[]>("faq.json", []);
}

// 4. Contacto (Mensajes)
export async function getContactoMensajes(): Promise<ContactoMensaje[]> {
  return await readJsonFile<ContactoMensaje[]>("contacto-mensajes.json", []);
}

export async function guardarContactoMensaje(
  datos: Omit<ContactoMensaje, "id" | "fecha" | "leido">
): Promise<ContactoMensaje> {
  const mensajes = await getContactoMensajes();
  const nuevoMensaje: ContactoMensaje = {
    id: `msg-${Date.now()}`,
    ...datos,
    fecha: new Date().toISOString(),
    leido: false,
  };
  mensajes.unshift(nuevoMensaje);
  await writeJsonFile("contacto-mensajes.json", mensajes);
  return nuevoMensaje;
}

// 5. Historial de Simulaciones
export async function getSimulaciones(): Promise<SimulacionHistorial[]> {
  return await readJsonFile<SimulacionHistorial[]>("simulaciones-historial.json", []);
}

export async function guardarSimulacion(
  simulacion: Omit<SimulacionHistorial, "id" | "fecha">
): Promise<SimulacionHistorial> {
  const lista = await getSimulaciones();
  const nueva: SimulacionHistorial = {
    id: `sim-${Date.now()}`,
    ...simulacion,
    fecha: new Date().toISOString(),
  };
  lista.unshift(nueva);
  await writeJsonFile("simulaciones-historial.json", lista);
  return nueva;
}

// 6. Usuarios y Autenticación
export async function getUsuarios(): Promise<Usuario[]> {
  return await readJsonFile<Usuario[]>("usuarios.json", []);
}

export async function validarCredenciales(
  email: string,
  pass: string
): Promise<Usuario | null> {
  const usuarios = await getUsuarios();
  const user = usuarios.find(
    (u) => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === pass && u.activo
  );
  if (!user) return null;
  // Retornar sin password
  const { password, ...usuarioSeguro } = user;
  return usuarioSeguro as Usuario;
}
