import { CuotaAmortizacion, SimulacionCDTResultado, SimulacionCreditoResultado } from "@/types";

/**
 * Calcula la cuota mensual fija y la tabla de amortización para un crédito (Sistema Francés)
 * @param valorSolicitado Monto principal del préstamo en COP
 * @param plazoMeses Plazo en meses
 * @param tasaInteresMV Tasa de interés periódico mensual vencido (% mensual, ej: 1.35)
 * @param tipoCredito Nombre de la línea de crédito
 */
export function calcularSimulacionCredito(
  valorSolicitado: number,
  plazoMeses: number,
  tasaInteresMV: number,
  tipoCredito: string
): SimulacionCreditoResultado {
  const i = tasaInteresMV / 100;
  // Conversión referencial a Efectiva Anual: EA = (1 + i)^12 - 1
  const tasaInteresEA = Number(((Math.pow(1 + i, 12) - 1) * 100).toFixed(2));

  let cuotaMensual = 0;
  if (i === 0) {
    cuotaMensual = valorSolicitado / plazoMeses;
  } else {
    cuotaMensual = (valorSolicitado * i) / (1 - Math.pow(1 + i, -plazoMeses));
  }

  let saldo = valorSolicitado;
  const tablaAmortizacion: CuotaAmortizacion[] = [];
  let acumuladoIntereses = 0;

  for (let mes = 1; mes <= plazoMeses; mes++) {
    const interes = saldo * i;
    const capital = cuotaMensual - interes;
    saldo = Math.max(0, saldo - capital);
    acumuladoIntereses += interes;

    tablaAmortizacion.push({
      mes,
      cuota: Math.round(cuotaMensual),
      capital: Math.round(capital),
      interes: Math.round(interes),
      saldoRestante: Math.round(saldo),
    });
  }

  const totalPagar = valorSolicitado + acumuladoIntereses;

  return {
    valorSolicitado,
    plazoMeses,
    tasaInteresMV,
    tasaInteresEA,
    tipoCredito,
    cuotaMensual: Math.round(cuotaMensual),
    totalIntereses: Math.round(acumuladoIntereses),
    totalPagar: Math.round(totalPagar),
    tablaAmortizacion,
  };
}

/**
 * Calcula el rendimiento y valor final de un Certificado de Depósito a Término (CDT)
 * @param valorInversion Monto a invertir en COP
 * @param tiempoDias Plazo de la inversión en días (mínimo 30)
 * @param tasaRentabilidadEA Tasa Efectiva Anual (% E.A., ej: 10.8)
 */
export function calcularSimulacionCDT(
  valorInversion: number,
  tiempoDias: number,
  tasaRentabilidadEA: number
): SimulacionCDTResultado {
  const eaDecimal = tasaRentabilidadEA / 100;
  // Tasa periódica efectiva para el periodo de días exacto: (1 + EA)^(dias/360) - 1
  const tasaPeriodica = Math.pow(1 + eaDecimal, tiempoDias / 360) - 1;
  const rendimientoBruto = valorInversion * tasaPeriodica;

  // Retención en la fuente del 4% sobre intereses según normativa bancaria colombiana
  const retencionFuente = rendimientoBruto * 0.04;
  const rendimientoNeto = rendimientoBruto - retencionFuente;
  const totalLiquidar = valorInversion + rendimientoNeto;

  return {
    valorInversion,
    tiempoDias,
    tasaRentabilidadEA,
    tasaPeriodicaNominal: Number((tasaPeriodica * 100).toFixed(4)),
    rendimientoBruto: Math.round(rendimientoBruto),
    retencionFuente: Math.round(retencionFuente),
    rendimientoNeto: Math.round(rendimientoNeto),
    totalLiquidar: Math.round(totalLiquidar),
  };
}

/**
 * Formateador de moneda en pesos colombianos ($ COP)
 */
export function formatCOP(valor: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(valor);
}
