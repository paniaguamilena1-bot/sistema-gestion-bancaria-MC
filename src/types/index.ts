export type CategoriaProducto = "ahorro" | "cdt" | "credito";

export interface Producto {
  id: string;
  nombre: string;
  categoria: CategoriaProducto;
  tipo: string;
  descripcionCorta: string;
  descripcion: string;
  tasaReferencia: string;
  montoMinimo: number;
  plazoMinimo: string;
  beneficios: string[];
  requisitos: string[];
}

export interface Oficina {
  id: string;
  nombre: string;
  tipo: "Sucursal" | "Cajero automático";
  ciudad: string;
  departamento: string;
  direccion: string;
  telefono: string;
  horario: string;
  servicios: string[];
  tieneCajero: boolean;
  coordenadas: {
    lat: number;
    lng: number;
  };
}

export interface FaqItem {
  id: string;
  categoria: string;
  pregunta: string;
  respuesta: string;
}

export interface ContactoMensaje {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  ciudad: string;
  asunto: string;
  mensaje: string;
  fecha: string;
  leido: boolean;
}

export interface CuotaAmortizacion {
  mes: number;
  cuota: number;
  capital: number;
  interes: number;
  saldoRestante: number;
}

export interface SimulacionCreditoResultado {
  valorSolicitado: number;
  plazoMeses: number;
  tasaInteresMV: number;
  tasaInteresEA: number;
  tipoCredito: string;
  cuotaMensual: number;
  totalIntereses: number;
  totalPagar: number;
  tablaAmortizacion: CuotaAmortizacion[];
}

export interface SimulacionCDTResultado {
  valorInversion: number;
  tiempoDias: number;
  tasaRentabilidadEA: number;
  tasaPeriodicaNominal: number;
  rendimientoBruto: number;
  retencionFuente: number;
  rendimientoNeto: number;
  totalLiquidar: number;
}

export interface SimulacionHistorial {
  id: string;
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
  fecha: string;
  asesor?: string;
}

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  password?: string;
  rol: "asesor" | "admin";
  cargo: string;
  sucursal: string;
  activo: boolean;
}
