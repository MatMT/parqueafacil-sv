# Reglas de Desarrollo y Arquitectura - ParqueaFácilSV (Next.js)

Este documento rige la arquitectura, separación de responsabilidades y estándares visuales para el prototipo interactivo de ParqueaFácilSV.

---

### 1. Separación Estricta de Lógica y Presentación
- Las vistas (`src/app/**`, `src/components/screens/**`) solo leen estado y renderizan JSX.
- Toda la lógica de avance de pasos (1-5), cálculo de comisión colaborativa (15%), filtros de zonas y selección de parqueo reside en el custom hook `useBookingFlow.ts`.
- Cero funciones de cálculo de precios o bifurcaciones de flujo complejas dentro de componentes visuales.

### 2. Tokens de Diseño Únicos (Prioridad Absoluta sobre Skills Externas)
- **Prioridad de Marca**: Aun cuando se apliquen recomendaciones de skills externas como `ui-ux-pro-max` o `apple-design`, los colores institucionales y tokens de diseño definidos en `src/constants/theme.ts` tienen **prioridad absoluta**. Queda estrictamente prohibido reemplazarlos o alterarlos por paletas genéricas o estilos externos.
- Ningún color hexadecimal suelto en el JSX.
- Todos los colores oficiales provienen de `src/constants/theme.ts` o clases semánticas de Tailwind:
  - `primary`: `#001F5D` (Navy Blue)
  - `secondary`: `#7C9FE7` (Light Blue)
  - `accent`: `#ECD700` (Amarillo Intenso)
  - `textPrimary`: `#000000`
  - `textSecondary`: `#59667B` (Slate Gray)
  - `background`: `#F8FAFC`
  - `surface`: `#FFFFFF`

### 3. Componentes Primitivos Reutilizables (DRY)
- Todo elemento repetido se extrae en `src/components/ui/`:
  - `Badge`
  - `Button`
  - `RatingStars`
  - `ChipFilter`
  - `AmenityPill`

### 4. Convención de Idioma Estricta
- Nombres de variables, interfaces, hooks y archivos en **inglés** (`use-booking-flow.ts`, `parking-card.tsx`, `BookingState`, `ParkingSpace`).
- Todos los textos visibles para el usuario final en **español salvadoreño / neutral** ("Santa Tecla", "Chivo Wallet / Lightning", "Transfer365", etc.).

### 5. Cero Datos Falsos Dispersos (Mock Data Centralizada)
- Todos los parqueos y reseñas viven exclusivamente en `src/data/mock-parkings.ts`.

### 6. Pitch Mode / Demostración en Vivo
- Barra superior externa `PitchControls` para saltar a cualquiera de las 5 pantallas sin recargar y reiniciar el flujo ante preguntas del jurado.
- Marco de smartphone en escritorio con adaptación 100% fluida en móviles reales.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
