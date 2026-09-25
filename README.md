# Sistema de Gestión Bancaria y Financiera (BanCentral MC)

> **Proyecto Académico / Institucional:** EV9 – Planeación y Diseño de un Sistema de Información para una Entidad Financiera  
> **Centro:** Centro Pecuario y Agroempresarial – SENA (La Dorada, Caldas)  
> **Programa:** Tecnólogo en Gestión Bancaria y de Entidades Financieras  
> **Autor(a):** Michell Mariana Castaño Paniagua  
> **ID Ficha:** 3230956  
> **Instructor:** Junior Celis  

---

## 🏛️ Descripción General del Sistema
Este sistema de información fue concebido para que clientes y usuarios consulten el portafolio de productos y servicios ofrecidos por la entidad, realicen simulaciones financieras en tiempo real (créditos y depósitos a término CDT), ubiquen oficinas/cajeros y cuenten con canales de contacto directo.

Asimismo, provee a los **asesores financieros** y **administradores** una herramienta de cotización ágil que reduce tiempos de espera y optimiza la atención al usuario.

---

## 🛠️ Stack Tecnológico
* **Framework:** [Next.js](https://nextjs.org/) (App Router, React Server Components y Server Actions)
* **Lenguaje:** TypeScript con tipado estricto
* **Estilos:** Tailwind CSS con paleta corporativa bancaria (azul financiero, dorado y esmeralda)
* **Iconografía:** Lucide React
* **Persistencia de Datos:** Almacenamiento local en archivos planos `.json` mediante el sistema de archivos nativo de Node.js (`fs/promises`) en `src/data/` (sin requerir motores externos de base de datos)

---

## 🧭 Estructura y Módulos del Sistema
1. **Inicio (`/`):** Presentación institucional, misión, accesos rápidos a simuladores y catálogo destacado.
2. **Productos Financieros (`/productos`):** Catálogo de cuentas de ahorro, CDT y líneas de crédito con fichas técnicas de beneficios y requisitos.
3. **Simulador de Crédito (`/simulador-credito`):** Cotizador con sistema de amortización francés (cuota fija mensual, intereses, tabla de amortización detallada, opción de guardado e impresión de comprobante).
4. **Simulador de CDT (`/simulador-cdt`):** Calculadora de rendimientos para inversiones a término fijo con deducción de retención en la fuente (4%) y liquidación neta al vencimiento.
5. **Ubicación de Oficinas y Cajeros (`/oficinas`):** Directorio de sucursales físicas y cajeros automáticos con filtros por ciudad y tipo.
6. **Preguntas Frecuentes (`/preguntas-frecuentes`):** Acordeón temático organizado por créditos, CDT, cuentas y plataforma.
7. **Contacto y Canales (`/contacto`):** Datos institucionales y formulario interactivo con generación automática de número de radicado.
8. **Acceso al Usuario (`/login`):** Portal de autenticación para Asesores Financieros y Administradores.
9. **Panel Privado (`/dashboard`):** Área de gestión con historial de cotizaciones guardadas, bandeja de solicitudes web y fichas de productos.

---

## 🔐 Credenciales de Acceso para Demostración

| Rol | Correo Electrónico | Contraseña | Cargo / Sucursal |
| :--- | :--- | :--- | :--- |
| **Asesor Financiero** | `asesor@banco.com` | `asesor123` | Asesora Senior • Sucursal Principal La Dorada |
| **Administrador** | `admin@banco.com` | `admin123` | Administrador General • Dirección General |

---

## 🚀 Instrucciones para Ejecución Local

1. **Instalar dependencias (si no se ha ejecutado):**
   ```bash
   npm install
   ```

2. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador:**
   Visita [http://localhost:3000](http://localhost:3000)
