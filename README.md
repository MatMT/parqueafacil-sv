# ParqueaFácilSV 🚗🇸🇻
### *Plataforma Colaborativa de Alquiler de Cocheras Residenciales y Parqueo Seguro*

> **Proyecto de Emprendimiento e Innovación Tecnológica (Pitch & Prototipo Académico de Alta Fidelidad)**  
> Desarrollado con **Next.js 16, TypeScript, TailwindCSS y OpenStreetMap**.

---

## 📌 Contexto Académico del Proyecto

En el Área Metropolitana de San Salvador (AMSS) y municipios clave como Santa Tecla y Antiguo Cuscatlán, el parqueo en la vía pública enfrenta tres problemas estructurales críticos:
1. **Déficit crítico de espacios seguros:** Colapso de centros comerciales y zonas corporativas en horas pico y fines de semana.
2. **Inseguridad y tarifas arbitrarias:** Cuidadores informales en la calle que cobran entre $3.00 y $7.00 sin brindar garantías de seguridad contra rayones o robos.
3. **Cocheras privadas subutilizadas:** Miles de familias y profesionales cuentan con portones y espacios libres en zonas de alta plusvalía que permanecen vacíos durante el día.

**ParqueaFácilSV** nace como una solución de economía colaborativa *(el "Airbnb de estacionamientos en El Salvador")* que conecta a conductores que buscan estacionarse rápido y seguro con anfitriones residenciales que monetizan sus garajes desocupados.

---

## 🚀 Flujo Interactivo de Pitch (5 Pasos)

La plataforma incluye una barra superior de **Pitch Controls** para saltar instantáneamente entre los 5 pasos del modelo de negocio durante la presentación ante el jurado:

```
[ Paso 1: Explorador ] ──> [ Paso 2: Ficha & Reseñas ] ──> [ Paso 3: Tarifa & Horas ] ──> [ Paso 4: Pago Seguro ] ──> [ Paso 5: Ticket QR ]
```

### 1. Explorador Geográfico en Vivo
* **Mapa interactivo:** Integración de Leaflet con teselas de alta velocidad **Esri World Gray Canvas** (estética minimalista, sin marcas comerciales y 100% libre de API keys).
* **Filtro por Zonas:** *Cerca de mí*, *Zona Rosa / San Benito*, *Colonia Escalón*, *Antiguo Cuscatlán*, *Santa Tecla* y *Centro Histórico*.
* **Panel Deslizable (Bottom Sheet):** Alterna entre carrusel horizontal con *scroll-snap* geométrico y vista de lista vertical compacta.
* **Control de Vista:** Capacidad de colapsar el panel inferior para explorar el mapa a pantalla completa sin perder la selección activa.

### 2. Ficha de Cochera y Confianza Comunitaria
* Fotografía hero de alta calidad del garaje privado residencial con badge verificador.
* Perfil del anfitrión verificado con indicador de tiempo de respuesta (`< 5 min`) y calificación con estrellas.
* Píldoras de amenidades: *Portón privado*, *Cámaras de seguridad*, *Techado y fresco*, *Vigilancia 24/7* y *Carga para EV*.
* Reseñas reales de conductores locales de la comunidad salvadoreña.

### 3. Tarifa y Modelo de Negocio (15% Take Rate)
* Selector de horas interactivo (+ / -) con cálculo instantáneo de subtotal, tolerancia de cortesía de 15 minutos y desglose transparente:
  $$\text{Tarifa Total} = \text{Subtotal Cochera} + 15\%\text{ Tarifa de Servicio Colaborativo}$$
* Banner comparativo de ahorro: *Ahorras más de $4.00 frente a parqueos tradicionales o cuidadores de calle*.

### 4. Pasarela de Pagos Multicanal Salvadoreña
* **Chivo Wallet / Bitcoin:** Soporte de pagos en satoshis vía Red Lightning con cálculo aproximado en tiempo real y 0% comisión bancaria.
* **Tarjetas Locales:** Débito y Crédito (Visa / Mastercard) con protocolo 3D Secure.
* **Transferencia Bancaria Local (Transfer365):** Soporte para bancos del sistema financiero (Banco Agrícola, BAC, Cuscatlán, Davivienda).

### 5. Ticket Digital Oficial con Código QR
* Pase de entrada digital tipo *Boarding Pass* con código de reserva único (`#PFSV-XXXX`).
* **Código QR Optimizado:** Sintetizado para lectura instantánea desde la cámara de iOS y Android sin disparar llamadas ni cortar texto.
* **Modal Ampliado a Pantalla Completa:** Al tocar el QR, se expande a alta resolución con fondo oscuro (`bg-black/90 backdrop-blur-md`) para ser escaneado a distancia por el jurado.
* **Acciones Rápidas:** Botón para navegar con Google Maps/Waze, chat directo de WhatsApp con el anfitrión con mensaje prellenado, y descarga de comprobante en PDF.

---

## 🛠️ Arquitectura y Stack Tecnológico

| Capa | Tecnología | Justificación Técnica |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (Turbopack, App Router) | Renderizado ultra-rápido, optimización de bundles e hidratación fluida. |
| **Lenguaje** | TypeScript 5 (Strict Mode) | Tipado estricto para entidades de reserva, cocheras, coordenadas y pagos. |
| **Estilos** | TailwindCSS (`darkMode: 'class'`) | Desacoplamiento total del sistema operativo para blindar el contraste visual. |
| **Mapas** | Leaflet + Esri World Gray Canvas | Cero costo de API key, alto rendimiento en móviles y pines SVG de la marca. |
| **Iconografía** | Lucide React | Iconografía vectorial consistente y liviana. |
| **Validación QR**| QRCodeSVG (`qrcode.react`) | Generación vectorial de código QR sin dependencias de red externas. |

---

## 🎨 Paleta de Colores Institucional

El prototipo sigue estrictamente los tokens de identidad salvadoreña definidos en `src/constants/theme.ts`:

* **Azul Marino Principal:** `#001F5D`
* **Azul Claro Secundario:** `#7C9FE7`
* **Amarillo Intenso (Acento / CTA):** `#ECD700`
* **Fondos y Superficies:** `#F8FAFC` (Claro) / `#0B0F19` (Escritorio) / `#0F172A` (Modo Oscuro)
* **Textos:** `#000000` (Primario) / `#59667B` (Secundario)

---

## 💻 Ejecución Local

### Prerrequisitos
* Node.js 18.18+ o Node.js 20+
* Administrador de paquetes: `npm`, `pnpm` o `yarn`

### Instalación y Puesta en Marcha

```bash
# 1. Clonar el repositorio (con autorización previa)
git clone https://github.com/MatMT/parqueafacil-sv.git
cd parqueafacil-sv

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

Abre en tu navegador: [http://localhost:3000](http://localhost:3000).

### Compilación para Producción
```bash
npm run build
npm run start
```

---

## 📄 Licencia y Derechos de Autor (All Rights Reserved)

```
PROPRIETARY AND CONFIDENTIAL (TODOS LOS DERECHOS RESERVADOS)
Copyright (c) 2026 Mateo Elías.
```

Este proyecto y todo su código fuente, activos de diseño, estructura de componentes y documentación fueron desarrollados bajo **encargo y contratación profesional** para fines de defensa académica y demostración de emprendimiento.

* **No es software de código abierto (Open Source).**
* Queda **estrictamente prohibida** la copia, clonación, distribución pública, sublicenciamiento, modificación no autorizada o explotación comercial total o parcial de este software sin el consentimiento expreso y por escrito del autor.
* Para más detalles legales, consulta el archivo [LICENSE](file:///Users/elias/Code/GitHub/2026/parqueafacil-sv/LICENSE).

**Contacto / Autor:**  
Mateo Elías — [oscarmateoelias@gmail.com](mailto:oscarmateoelias@gmail.com)  
San Salvador, El Salvador.
