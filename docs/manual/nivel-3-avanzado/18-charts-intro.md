# Capítulo 18 — Charts: introducción y arquitectura visx

**Nivel:** 3 — Avanzado
**Capítulo:** 18 de 28

---

## ¿Qué vas a aprender?

1. Arquitectura del sistema de charts W3F — cómo están organizados los 43 componentes
2. Los 9 tipos de datos canónicos — qué forma tiene la data de cada familia de charts
3. `BaseChartProps` — las props comunes a todos los charts
4. Sistema de color schemes — 6 paletas predefinidas + paletas custom
5. Responsividad y dimensiones — cómo cada chart se adapta a su contenedor
6. Primers ejemplos funcionales con Bar, Line, Pie y Gauge

---

## Conceptos

### Qué es visx

Los charts de W3F están construidos sobre **@visx**, la biblioteca de primitivas SVG de Airbnb. visx provee los bloques de bajo nivel (escalas, ejes, shapes, interpolaciones) sin imponer una opinión sobre diseño ni estado. W3F envuelve esas primitivas en componentes con:

- Props tipadas y ergonómicas
- Responsividad automática via `ParentSize`
- Tooltips, grillas, leyendas y ejes listos para usar
- Sistema de color schemes y CSS tokens
- Integración con el Data Bridge de W3F

No necesitás saber de visx para usar los charts — los componentes W3F ocultan esa complejidad. Pero si en algún momento querés customizar más allá de las props disponibles, podés usar los exports `XxxInner` (el componente SVG de bajo nivel) y componer desde ahí.

### Organización de los 43 charts

```
packages/components/src/DATADISPLAY/Charts/
├── _base/
│   └── types.ts            ← Tipos canónicos (Datum1D, DatumTime, etc.) + BaseChartProps
├── _theme/
│   ├── colorSchemes.ts     ← 6 paletas de color predefinidas
│   └── chartTheme.css      ← CSS tokens de ejes, grillas y tooltips
├── primitives/
│   ├── ChartAxis/          ← Eje reutilizable
│   ├── ChartGrid/          ← Grilla reutilizable
│   ├── ChartTooltip/       ← Tooltip reutilizable
│   └── ChartLegend/        ← Leyenda reutilizable
├── Bar/                    ← Barra vertical
├── BarHorizontal/          ← Barra horizontal
├── BarGrouped/             ← Barras agrupadas
├── Line/                   ← Línea de tiempo
│   ... (43 directorios en total)
└── index.ts                ← Barrel con todos los exports
```

Cada chart tiene la misma estructura de 8 archivos:

```
Bar/
├── Bar.tsx          ← Wrapper responsivo (el que usás normalmente)
├── BarInner.tsx     ← Componente SVG de bajo nivel (requiere width y height fijos)
├── Bar.types.ts     ← Props e interfaces TypeScript
├── Bar.hooks.ts     ← Lógica (escalas, colores, tooltip state)
├── Bar.constants.ts ← Defaults (padding, margins, etc.)
├── Bar.utils.ts     ← Funciones puras (formateo, computación)
├── Bar.css          ← CSS co-ubicado
└── README.md        ← Documentación del componente
```

### Imports

Todos los charts se exportan desde un único barrel:

```tsx
import {
  Bar, Line, Pie, Gauge, Radar,
  // ... cualquiera de los 43
} from '@w3f/components/DATADISPLAY/Charts';

// Tipos también desde el mismo barrel
import type { ColorSchemeName, Datum1D, DatumTime } from '@w3f/components/DATADISPLAY/Charts';
```

---

## Los tipos de datos canónicos

Cada familia de charts tiene un tipo de dato esperado. Conocerlos es clave para conectar tus datos reales con el chart correcto.

### `Datum1D` — datos categóricos simples

Usado por: `Bar`, `BarHorizontal`, `Radar`, `Pie`, `Donut`, `Gauge`, `Sparkline`

```ts
type Datum1D = {
  label: string | number;  // categoría — aparece en el eje X (o en el tooltip)
  value: number;           // valor numérico
};

const ventas: Datum1D[] = [
  { label: 'Ene', value: 420 },
  { label: 'Feb', value: 530 },
  { label: 'Mar', value: 610 },
];
```

### `DatumTime` — series de tiempo

Usado por: `Line`, `Area`, `Threshold`, `Sparkline`

```ts
type DatumTime = {
  date: Date | number | string;  // fecha en cualquier formato
  value: number;
};

const temperatura: DatumTime[] = [
  { date: '2024-01-01', value: 18.5 },
  { date: '2024-01-02', value: 19.2 },
  { date: '2024-01-03', value: 17.8 },
];
```

### `MultiSeriesTime` — múltiples series de tiempo

Usado por: `LineMulti`, `AreaStacked`, `Streamgraph`

```ts
type MultiSeriesTime = {
  id: string;          // identificador único de la serie
  label?: string;      // nombre en la leyenda
  data: DatumTime[];   // puntos de tiempo de la serie
};

const series: MultiSeriesTime[] = [
  { id: 'ventas', label: 'Ventas',    data: [...] },
  { id: 'costos', label: 'Costos',    data: [...] },
  { id: 'margen', label: 'Margen',    data: [...] },
];
```

### `DatumGroup` — barras agrupadas / radar multi-eje

Usado por: `BarGrouped`, `BarGroupedHorizontal`, `BarStacked`, `BarStackedHorizontal`

```ts
type DatumGroup = {
  label: string | number;
  [serie: string]: string | number;  // campos dinámicos — uno por serie
};

// También necesitás pasar `keys: string[]` al chart
const datos: DatumGroup[] = [
  { label: 'Q1', ventas: 420, costos: 310 },
  { label: 'Q2', ventas: 530, costos: 390 },
  { label: 'Q3', ventas: 610, costos: 420 },
];
const keys = ['ventas', 'costos'];
```

### `DatumSlice` — partes de un todo

Usado por: `Pie`, `Donut`, `Funnel`, `Waffle`

```ts
type DatumSlice = {
  id: string;
  label: string;
  value: number;
  color?: string;  // color override opcional
};

const mercado: DatumSlice[] = [
  { id: 'a', label: 'Chrome',  value: 65 },
  { id: 'b', label: 'Safari',  value: 19 },
  { id: 'c', label: 'Firefox', value: 4  },
  { id: 'd', label: 'Otros',   value: 12 },
];
```

### `DatumXY` — datos bidimensionales

Usado por: `Scatter`, `Bubble`, `DotPlot`

```ts
type DatumXY = {
  x: number;
  y: number;
  r?: number;      // radio (para Bubble — codifica una 3ra dimensión)
  label?: string;  // texto en tooltip
};
```

### `DatumMatrix` — grilla de valores

Usado por: `Heatmap`, `CalendarHeatmap`

```ts
type DatumMatrix = {
  row: string | number;
  col: string | number;
  value: number;
};
```

### `DatumHierarchy` — árboles y jerarquías

Usado por: `Treemap`, `Pack`, `Sunburst`, `TreeDiagram`

```ts
interface DatumHierarchy {
  id: string;
  label?: string;
  value?: number;
  children?: DatumHierarchy[];  // anidamiento recursivo
}
```

### `DatumGraph` — grafos nodos-aristas

Usado por: `Network`, `Sankey`, `Chord`

```ts
type DatumGraph = {
  nodes: { id: string; label?: string; group?: string }[];
  links: { source: string; target: string; value?: number }[];
};
```

---

## BaseChartProps — props comunes a todos los charts

Todos los charts extienden `BaseChartProps`. Esto significa que estas props son válidas en **cualquier** chart:

```tsx
interface BaseChartProps {
  // Dimensiones
  width?: number;         // si se omite → 100% del contenedor padre
  height?: number;        // default: 300px
  margin?: ChartMargin;   // { top, right, bottom, left } en px

  // Visual
  colorScheme?: ColorSchemeName | string[];  // paleta de colores
  title?: string;         // título renderizado sobre el chart
  subtitle?: string;      // subtítulo bajo el título
  className?: string;     // clase extra en el wrapper

  // Accesibilidad
  ariaLabel?: string;     // aria-label del SVG
  description?: string;   // <desc> del SVG

  // Modo sin estilos
  unstyled?: boolean;     // strip visual styles

  // Data Bridge
  bindId?: string;        // para conectar con el sistema de binding
}
```

Ejemplo — aplicar props comunes a cualquier chart:

```tsx
<Bar
  data={data}
  height={400}
  title="Ventas mensuales"
  subtitle="Enero – Diciembre 2024"
  colorScheme="w3f-brand"
  ariaLabel="Gráfico de barras de ventas mensuales"
/>
```

---

## Sistema de color schemes

### 6 paletas predefinidas

| Nombre | Colores | Cuándo usar |
|---|---|---|
| `categorical-10` | 10 colores distintos (indigo, amber, emerald, red, violet...) | Multi-series — **default** |
| `sequential-blue` | 10 steps claro→oscuro en azul | Heatmaps, escalas de intensidad |
| `sequential-green` | 10 steps claro→oscuro en verde | Igual que blue pero verde |
| `diverging-rdbu` | 9 steps rojo→blanco→azul | Desviaciones respecto a un punto medio |
| `mono-primary` | 6 alphas del `--w3f-primary` (100%→25%) | Monocromático, branded |
| `w3f-brand` | 6 colores: indigo, emerald, amber, pink, cyan, violet | Marketing y demos |

```tsx
// Por nombre
<Bar data={data} colorScheme="categorical-10" />  {/* default */}
<Bar data={data} colorScheme="sequential-blue" />
<Bar data={data} colorScheme="w3f-brand" />

// Paleta custom — array de strings (hex, rgb, hsl, cualquier CSS color)
<Bar data={data} colorScheme={['#6366f1', '#f59e0b', '#10b981', '#ef4444']} />
```

---

## Responsividad y dimensiones

### Wrapper responsivo vs componente inner

Cada chart tiene **dos variantes**:

| Variante | `width`/`height` | Cuándo usar |
|---|---|---|
| `Bar` (wrapper) | opcionales — fill parent | **Usar siempre por defecto** |
| `BarInner` (inner) | requeridos — valores fijos | Solo si necesitás control total del SVG |

```tsx
// Responsivo — ancho = 100% del padre, alto = 300px por defecto
<Bar data={data} />

// Responsivo con alto fijo
<Bar data={data} height={450} />

// Responsivo con ancho fijo
<Bar data={data} width={600} height={300} />
```

El wrapper usa `ParentSize` de `@visx/responsive` internamente — escucha el ResizeObserver del contenedor y pasa `width` al `BarInner`.

### Controlar el tamaño del contenedor

Para charts fluidos dentro de un layout grid:

```tsx
{/* El chart llena cada celda del grid */}
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
  <div style={{ height: '300px' }}>
    <Bar data={ventas} />
  </div>
  <div style={{ height: '300px' }}>
    <Line data={tendencia} />
  </div>
</div>
```

### Márgenes internos

`margin` controla el espacio entre el borde del SVG y el área de trazado (donde van las barras/líneas). Ajustalo cuando los labels del eje se corten:

```tsx
<Bar
  data={data}
  margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
/>
```

---

## Primeros ejemplos

### Bar — barras verticales

```tsx
import { Bar } from '@w3f/components/DATADISPLAY/Charts';

const data = [
  { label: 'Ene', value: 420 },
  { label: 'Feb', value: 530 },
  { label: 'Mar', value: 610 },
  { label: 'Abr', value: 490 },
  { label: 'May', value: 720 },
];

<Bar
  data={data}
  height={300}
  title="Ventas mensuales"
  showGrid
  showTooltip
  barRadius={4}
  formatY={(n) => `$${n.toLocaleString()}`}
/>
```

Props frecuentes de `Bar`:

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `data` | `Datum1D[]` | — | **Requerido** |
| `showXAxis` | `boolean` | `true` | Muestra el eje X |
| `showYAxis` | `boolean` | `true` | Muestra el eje Y |
| `showGrid` | `boolean` | `true` | Grilla horizontal |
| `showTooltip` | `boolean` | `true` | Tooltip al hover |
| `showLegend` | `boolean` | `false` | Leyenda de colores |
| `padding` | `number` | `0.2` | Separación entre barras (0–1) |
| `barRadius` | `number` | `2` | Esquinas redondeadas en px |
| `formatY` | `(n: number) => string` | — | Formatter del eje Y |
| `yDomain` | `[number, number]` | auto | Dominio Y fijo |
| `highlightIndex` | `number \| null` | — | Índice de barra a resaltar |

### Line — serie de tiempo

```tsx
import { Line } from '@w3f/components/DATADISPLAY/Charts';

const data = [
  { date: '2024-01-01', value: 1200 },
  { date: '2024-02-01', value: 1450 },
  { date: '2024-03-01', value: 1320 },
  { date: '2024-04-01', value: 1680 },
  { date: '2024-05-01', value: 1900 },
];

<Line
  data={data}
  height={280}
  curved
  showDots
  strokeWidth={2}
  showTooltip
  formatY={(n) => `${n.toLocaleString()} usd`}
/>
```

Props frecuentes de `Line`:

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `data` | `DatumTime[]` | — | **Requerido** |
| `curved` | `boolean` | `true` | Interpolación suavizada |
| `showDots` | `boolean` | `false` | Puntos en cada dato |
| `strokeWidth` | `number` | `2` | Grosor de la línea |

### Pie / Donut

```tsx
import { Pie, Donut } from '@w3f/components/DATADISPLAY/Charts';
import type { DatumSlice } from '@w3f/components/DATADISPLAY/Charts';

const mercado: DatumSlice[] = [
  { id: 'chrome',  label: 'Chrome',  value: 65 },
  { id: 'safari',  label: 'Safari',  value: 19 },
  { id: 'firefox', label: 'Firefox', value: 4  },
  { id: 'otros',   label: 'Otros',   value: 12 },
];

{/* Pie estándar */}
<Pie data={mercado} height={280} showTooltip />

{/* Donut — wrapper thin de Pie con innerRadius=0.55 por defecto */}
<Donut data={mercado} height={280} showTooltip />
```

### Gauge — indicador de aguja

```tsx
import { Gauge } from '@w3f/components/DATADISPLAY/Charts';

<Gauge
  value={72}
  min={0}
  max={100}
  height={220}
  title="Rendimiento del servidor"
  thresholds={[
    { value: 40, color: '#ef4444' },  // rojo hasta 40
    { value: 70, color: '#f59e0b' },  // amarillo hasta 70
    { value: 100, color: '#10b981' }, // verde hasta 100
  ]}
  formatValue={(v) => `${v}%`}
/>
```

---

## Catálogo por familias

### Familias y los 43 charts

| Familia | Charts | Tipo de dato |
|---|---|---|
| **Barras** | `Bar`, `BarHorizontal`, `BarGrouped`, `BarGroupedHorizontal`, `BarStacked`, `BarStackedHorizontal` | `Datum1D`, `DatumGroup` |
| **Líneas y áreas** | `Line`, `LineMulti`, `Area`, `AreaStacked`, `Streamgraph`, `Threshold` | `DatumTime`, `MultiSeriesTime` |
| **XY / distribución** | `Scatter`, `Bubble`, `DotPlot`, `Heatmap`, `BoxPlot`, `Violin`, `Histogram` | `DatumXY`, `DatumMatrix`, arrays numéricos |
| **Parte del todo** | `Pie`, `Donut`, `Radar`, `PolarBar`, `Waffle`, `Funnel` | `DatumSlice`, `Datum1D` |
| **Medidores** | `Gauge`, `Bullet`, `Sparkline`, `Candlestick` | `Datum1D`, numérico, `DatumTime` |
| **Jerarquía** | `Treemap`, `Pack`, `Sunburst`, `TreeDiagram` | `DatumHierarchy` |
| **Grafos y flujo** | `Network`, `Sankey`, `Chord` | `DatumGraph`, `DatumMatrix` |
| **Temporal** | `CalendarHeatmap`, `Gantt` | `DatumMatrix`, `GanttTask[]` |
| **Especializado** | `Waterfall`, `WordCloud`, `Geo` | `Datum1D`, `WordCloudDatum[]`, GeoJSON |

> El catálogo completo con ejemplos de cada uno se cubre en el [Capítulo 19](./19-charts-catalogo.md).

---

## Primitivos reutilizables

Si necesitás componer un chart a medida, podés usar los primitivos directamente:

```tsx
import {
  ChartAxis,
  ChartGrid,
  ChartTooltip,
  ChartLegend,
} from '@w3f/components/DATADISPLAY/Charts';
```

Estos son los mismos bloques que usan los charts internamente — podés usarlos dentro de un SVG propio si algún día necesitás salir del catálogo.

---

## Ejercicio práctico

Construí un dashboard con 4 charts en un grid 2×2:

```tsx
import {
  Bar, Line, Pie, Gauge,
} from '@w3f/components/DATADISPLAY/Charts';
import type { DatumSlice } from '@w3f/components/DATADISPLAY/Charts';

const ventasBar = [
  { label: 'Ene', value: 420 }, { label: 'Feb', value: 530 },
  { label: 'Mar', value: 610 }, { label: 'Abr', value: 490 },
];

const traficLine = [
  { date: '2024-01-01', value: 1200 }, { date: '2024-02-01', value: 1450 },
  { date: '2024-03-01', value: 1320 }, { date: '2024-04-01', value: 1680 },
];

const mercadoPie: DatumSlice[] = [
  { id: 'a', label: 'Chrome',  value: 65 },
  { id: 'b', label: 'Safari',  value: 19 },
  { id: 'c', label: 'Firefox', value: 4  },
  { id: 'd', label: 'Otros',   value: 12 },
];

export function MiniDashboard() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1.5rem',
    }}>
      <div style={{ height: '300px' }}>
        <Bar
          data={ventasBar}
          title="Ventas mensuales"
          colorScheme="w3f-brand"
          formatY={(n) => `$${n}`}
        />
      </div>
      <div style={{ height: '300px' }}>
        <Line
          data={traficLine}
          title="Tráfico diario"
          curved
          showDots
        />
      </div>
      <div style={{ height: '300px' }}>
        <Pie
          data={mercadoPie}
          title="Cuota de mercado"
          showTooltip
        />
      </div>
      <div style={{ height: '300px' }}>
        <Gauge
          value={78}
          min={0}
          max={100}
          title="Uptime del servidor"
          thresholds={[
            { value: 50,  color: '#ef4444' },
            { value: 80,  color: '#f59e0b' },
            { value: 100, color: '#10b981' },
          ]}
          formatValue={(v) => `${v}%`}
        />
      </div>
    </div>
  );
}
```

---

## Referencia rápida — arquitectura

```
@w3f/components/DATADISPLAY/Charts  ← barrel (todos los imports van de aquí)

_base/types.ts                      ← tipos canónicos
_theme/colorSchemes.ts              ← 6 paletas + resolveColorScheme()
_theme/chartTheme.css               ← CSS tokens de ejes y tooltips
primitives/                         ← ChartAxis, ChartGrid, ChartTooltip, ChartLegend
Bar/, Line/, Pie/, ...              ← 43 componentes individuales
```

**Regla de oro:** si necesitás un chart que no existe en el catálogo, primero verificá si alguno de los 43 puede configurarse para ese caso. Si no, podés componer desde los primitivos o usar `BarInner`/`LineInner` directamente.

---

## En Next.js

Los charts usan hooks de visx internamente (tooltip state, responsive observer) — todos necesitan `'use client'`. El patrón habitual es cargar los datos en el Server Component y pasarlos al chart client-side:

```tsx
// app/dashboard/page.tsx — Server Component
import { VentasChart }   from './ventas-chart'
import { TendenciaChart } from './tendencia-chart'

export default async function DashboardPage() {
  // fetch server-side — acceso directo a DB, sin exponer credenciales al cliente
  const [ventas, tendencia] = await Promise.all([
    db.ventas.findMany({ ... }),
    db.metricas.findMany({ ... }),
  ])

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
      <VentasChart   data={ventas}    />
      <TendenciaChart data={tendencia} />
    </div>
  )
}
```

```tsx
// app/dashboard/ventas-chart.tsx — Client Component
'use client'

import { Bar } from '@w3f/components/DATADISPLAY/Charts'
import type { Datum1D } from '@w3f/components/DATADISPLAY/Charts'

export function VentasChart({ data }: { data: Datum1D[] }) {
  return (
    <div style={{ height: '300px' }}>
      <Bar
        data={data}
        title="Ventas mensuales"
        colorScheme="w3f-brand"
        formatY={(n) => `$${n.toLocaleString()}`}
      />
    </div>
  )
}
```

### SSR y hydration

Next.js pre-renderiza los Client Components en el servidor (SSR) y los hidrata en el cliente. Los charts **sí aparecen en el HTML inicial** — no hay flash de contenido vacío. Sin embargo, el responsive observer (`ParentSize`) solo se activa en el cliente, así que el ancho final puede ajustarse levemente después de la hidratación.

Si necesitás un ancho fijo para evitar cualquier ajuste post-hidratación, pasá `width` explícito:

```tsx
<Bar data={data} width={600} height={300} />
```

### Exportar charts como imagen

Para generar imágenes de charts en el servidor (ej: OG images, PDF reports), los charts W3F no funcionan en Node.js puro (dependen del DOM). Usá [`@vercel/og`](https://vercel.com/docs/functions/og-image-generation) con un canvas alternativo o renderizá en un browser headless (Playwright/Puppeteer).

---

## Siguiente paso

[Capítulo 19 — Charts: catálogo completo (43 charts)](./19-charts-catalogo.md)
