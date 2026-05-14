# Capítulo 19 — Charts: catálogo completo (43 charts)

**Nivel:** 3 — Avanzado
**Capítulo:** 19 de 28

---

## ¿Qué vas a aprender?

1. Los 43 charts organizados por familia con su tipo de dato y ejemplo canónico
2. Cuándo elegir cada variante dentro de una familia
3. Props clave de cada chart que van más allá de `BaseChartProps`
4. Guía de selección rápida: qué chart usar para cada tipo de pregunta de datos

---

## Import único para todos

```tsx
import {
  Bar, BarHorizontal, BarGrouped, BarGroupedHorizontal, BarStacked, BarStackedHorizontal,
  Line, LineMulti, Area, AreaStacked, Streamgraph, Threshold,
  Scatter, Bubble, DotPlot, Heatmap, BoxPlot, Violin, Histogram,
  Pie, Donut, Radar, PolarBar, Waffle, Funnel,
  Gauge, Bullet, Sparkline, Candlestick,
  Treemap, Pack, Sunburst, TreeDiagram,
  Network, Sankey, Chord,
  CalendarHeatmap, Gantt,
  Waterfall, WordCloud, Geo,
} from '@w3f/components/DATADISPLAY/Charts';
```

Todos los tipos de datos también desde el mismo barrel:

```tsx
import type {
  Datum1D, DatumTime, MultiSeriesTime, DatumGroup,
  DatumSlice, DatumXY, DatumMatrix, DatumHierarchy, DatumGraph,
  ColorSchemeName,
} from '@w3f/components/DATADISPLAY/Charts';
```

---

## Familia 1 — Barras (6 charts)

**Tipo de dato base:** `Datum1D` (simples) · `DatumGroup` (agrupadas/apiladas)

### Bar — barras verticales

```tsx
const data: Datum1D[] = [
  { label: 'Ene', value: 420 },
  { label: 'Feb', value: 530 },
  { label: 'Mar', value: 610 },
];

<Bar
  data={data}
  height={300}
  showGrid
  showTooltip
  barRadius={4}
  padding={0.2}
  formatY={(n) => `$${n.toLocaleString()}`}
  colorScheme="categorical-10"
/>
```

### BarHorizontal — barras horizontales

Misma data que `Bar`, mismo API. Útil cuando los labels son textos largos:

```tsx
<BarHorizontal
  data={data}
  height={300}
  showGrid
  showTooltip
  formatY={(n) => `${n}k`}
/>
```

### BarGrouped — agrupadas por categoría

```tsx
const data: DatumGroup[] = [
  { label: 'Q1', ventas: 420, costos: 310, margen: 110 },
  { label: 'Q2', ventas: 530, costos: 390, margen: 140 },
  { label: 'Q3', ventas: 610, costos: 420, margen: 190 },
];

<BarGrouped
  data={data}
  keys={['ventas', 'costos', 'margen']}
  height={320}
  showLegend
  showTooltip
  showGrid
/>
```

`keys` define qué campos de `DatumGroup` se plotean y en qué orden.

### BarGroupedHorizontal — agrupadas horizontales

Igual que `BarGrouped` pero horizontal. Útil con muchos grupos o labels largos.

### BarStacked — apiladas verticales

```tsx
<BarStacked
  data={data}
  keys={['ventas', 'costos', 'margen']}
  height={320}
  showLegend
  showTooltip
/>
```

### BarStackedHorizontal — apiladas horizontales

```tsx
<BarStackedHorizontal
  data={data}
  keys={['ventas', 'costos', 'margen']}
  height={320}
  showLegend
/>
```

### Cuándo usar cada variante

| Chart | Cuándo |
|---|---|
| `Bar` | Una métrica por categoría, orientación vertical |
| `BarHorizontal` | Labels de categoría son textos largos |
| `BarGrouped` | Comparar múltiples series por categoría (ej: real vs presupuesto) |
| `BarGroupedHorizontal` | Igual pero con muchos grupos o labels largos |
| `BarStacked` | Ver contribución de cada parte al total vertical |
| `BarStackedHorizontal` | Igual pero la comparación se lee mejor horizontal |

---

## Familia 2 — Líneas y áreas (6 charts)

**Tipo de dato base:** `DatumTime` (una serie) · `MultiSeriesTime` (varias series)

### Line — línea de tiempo simple

```tsx
const data: DatumTime[] = [
  { date: '2024-01-01', value: 1200 },
  { date: '2024-02-01', value: 1450 },
  { date: '2024-03-01', value: 1320 },
  { date: '2024-04-01', value: 1680 },
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

### LineMulti — múltiples líneas

```tsx
const data: MultiSeriesTime[] = [
  {
    id: 'ventas',
    label: 'Ventas',
    data: [
      { date: '2024-01', value: 1200 },
      { date: '2024-02', value: 1450 },
      { date: '2024-03', value: 1320 },
    ],
  },
  {
    id: 'costos',
    label: 'Costos',
    data: [
      { date: '2024-01', value: 800 },
      { date: '2024-02', value: 920 },
      { date: '2024-03', value: 870 },
    ],
  },
];

<LineMulti
  data={data}
  height={300}
  curved
  showDots
  showLegend
  showTooltip
  highlightSeriesId="ventas"   // resalta una serie externamente
/>
```

### Area — área bajo la línea

Misma data que `Line`. Agrega relleno bajo la curva — útil para mostrar volumen:

```tsx
<Area
  data={data}
  height={280}
  curved
  showTooltip
  fillOpacity={0.3}
/>
```

### AreaStacked — áreas apiladas

Usa `MultiSeriesTime`. Cada serie se apila sobre la anterior — muestra composición + total:

```tsx
<AreaStacked
  data={multiData}
  height={320}
  showLegend
  showTooltip
  curved
/>
```

### Streamgraph — flujo de corrientes

Usa `MultiSeriesTime`. Variante de área apilada centrada en el eje — enfatiza flujo y cambio de composición:

```tsx
<Streamgraph
  data={multiData}
  height={300}
  showTooltip
  showLegend
  curved
/>
```

### Threshold — área de umbral

Usa `DatumTime`. Colorea el área de forma diferente según si el valor está sobre o bajo un umbral:

```tsx
import { Threshold } from '@w3f/components/DATADISPLAY/Charts';

<Threshold
  data={data}
  height={280}
  threshold={1400}
  aboveColor="#10b981"   // color cuando value > threshold
  belowColor="#ef4444"   // color cuando value < threshold
  showTooltip
/>
```

### Cuándo usar cada variante

| Chart | Cuándo |
|---|---|
| `Line` | Una sola métrica en el tiempo |
| `LineMulti` | Comparar varias métricas en el tiempo |
| `Area` | Una métrica + énfasis en el volumen acumulado |
| `AreaStacked` | Composición + total de varias series |
| `Streamgraph` | Flujo orgánico de categorías, sin base fija |
| `Threshold` | Una métrica comparada contra un objetivo o límite |

---

## Familia 3 — XY / Distribución (7 charts)

**Tipo de dato:** `DatumXY` · `DatumMatrix` · arrays numéricos

### Scatter — dispersión

```tsx
const data: DatumXY[] = [
  { x: 10, y: 420, label: 'Prod A' },
  { x: 25, y: 680, label: 'Prod B' },
  { x: 40, y: 310, label: 'Prod C' },
];

<Scatter
  data={data}
  height={320}
  showTooltip
  pointRadius={5}
  formatX={(n) => `${n}%`}
  formatY={(n) => `$${n}`}
/>
```

### Bubble — burbujas (3 dimensiones)

Igual que `Scatter` pero `r` en cada datum codifica una tercera dimensión:

```tsx
const data: DatumXY[] = [
  { x: 10, y: 420, r: 30, label: 'Prod A' },  // r = tamaño de la burbuja
  { x: 25, y: 680, r: 60, label: 'Prod B' },
  { x: 40, y: 310, r: 20, label: 'Prod C' },
];

<Bubble
  data={data}
  height={320}
  showTooltip
  showLabels
/>
```

### Heatmap — grilla de intensidad

```tsx
const data: DatumMatrix[] = [
  { row: 'Lun', col: 'Mañana',  value: 45 },
  { row: 'Lun', col: 'Tarde',   value: 80 },
  { row: 'Lun', col: 'Noche',   value: 30 },
  { row: 'Mar', col: 'Mañana',  value: 62 },
  // ... una entrada por celda
];

<Heatmap
  data={data}
  height={280}
  showTooltip
  colorScheme="sequential-blue"
  showLabels
/>
```

### Histogram — distribución de frecuencias

Recibe un array de números planos — el chart calcula los bins automáticamente:

```tsx
const valores = [12, 18, 24, 31, 28, 19, 22, 35, 40, 15, 28, 33, 26, 20, 17];

<Histogram
  data={valores}
  height={280}
  binCount={8}       // número de intervalos
  showTooltip
  showGrid
  barRadius={2}
/>
```

### BoxPlot — caja y bigotes

Recibe grupos de valores — el chart calcula Q1, mediana, Q3 y outliers:

```tsx
import type { BoxPlotGroup } from '@w3f/components/DATADISPLAY/Charts';

const data: BoxPlotGroup[] = [
  { group: 'Equipo A', values: [45, 52, 61, 48, 70, 55, 63, 42] },
  { group: 'Equipo B', values: [38, 44, 50, 60, 35, 48, 55, 62] },
  { group: 'Equipo C', values: [55, 65, 72, 80, 58, 68, 74, 60] },
];

<BoxPlot
  data={data}
  height={320}
  showTooltip
  showOutliers
/>
```

### Violin — distribución por densidad

Mismo formato que `BoxPlot` (`ViolinGroup[]`). Muestra la forma de la distribución:

```tsx
import type { ViolinGroup } from '@w3f/components/DATADISPLAY/Charts';

const data: ViolinGroup[] = [
  { group: 'Grupo A', values: [45, 52, 61, 48, 70, 55, 63, 42, 58, 66] },
  { group: 'Grupo B', values: [38, 44, 50, 60, 35, 48, 55, 62, 40, 47] },
];

<Violin
  data={data}
  height={320}
  showTooltip
  showMedian
/>
```

### DotPlot — puntos por categoría

Usa `DatumXY` con `label` como categoría en el eje Y:

```tsx
const data: DatumXY[] = [
  { x: 72, y: 0, label: 'Producto A' },
  { x: 85, y: 1, label: 'Producto B' },
  { x: 61, y: 2, label: 'Producto C' },
];

<DotPlot
  data={data}
  height={280}
  showTooltip
  pointRadius={6}
/>
```

### Cuándo usar cada variante

| Chart | Cuándo |
|---|---|
| `Scatter` | Correlación entre dos variables numéricas |
| `Bubble` | Correlación + codificar una tercera dimensión en tamaño |
| `Heatmap` | Intensidad en una grilla 2D (hora×día, producto×región) |
| `Histogram` | Distribución de frecuencias de una variable continua |
| `BoxPlot` | Comparar distribuciones entre grupos (mediana, IQR, outliers) |
| `Violin` | Como BoxPlot pero mostrando la forma completa de la distribución |
| `DotPlot` | Valores puntuales de múltiples categorías en una escala común |

---

## Familia 4 — Parte del todo (6 charts)

**Tipo de dato:** `DatumSlice` · `Datum1D`

### Pie — torta

```tsx
const data: DatumSlice[] = [
  { id: 'a', label: 'Chrome',  value: 65 },
  { id: 'b', label: 'Safari',  value: 19 },
  { id: 'c', label: 'Firefox', value: 4  },
  { id: 'd', label: 'Otros',   value: 12 },
];

<Pie
  data={data}
  height={280}
  showTooltip
  showLegend
  padAngle={0.02}
  cornerRadius={3}
/>
```

### Donut — rosquilla

Wrapper de `Pie` con hueco central. Misma data, mismo API — solo agrega `innerRadius`:

```tsx
<Donut
  data={data}
  height={280}
  showTooltip
  showLegend
  innerRadius={0.55}   // default — ajustable
/>
```

### Radar — araña / spider

Usa `Datum1D`. Cada dato es un eje del radar:

```tsx
const data: Datum1D[] = [
  { label: 'Velocidad',    value: 85 },
  { label: 'Resistencia',  value: 70 },
  { label: 'Fuerza',       value: 60 },
  { label: 'Agilidad',     value: 90 },
  { label: 'Técnica',      value: 75 },
];

<Radar
  data={data}
  height={320}
  showTooltip
  showLegend
  fillOpacity={0.25}
  strokeWidth={2}
/>
```

### Funnel — embudo

Usa `Datum1D`. Las etapas se ordenan de mayor a menor automáticamente:

```tsx
const data: Datum1D[] = [
  { label: 'Visitas',        value: 10000 },
  { label: 'Registros',      value: 4500  },
  { label: 'Demos pedidas',  value: 1200  },
  { label: 'Propuestas',     value: 400   },
  { label: 'Cierres',        value: 120   },
];

<Funnel
  data={data}
  height={360}
  showLabels
  showPercentage
  showTooltip
  formatValue={(n) => n.toLocaleString()}
/>
```

### Waffle — cuadrícula proporcional

Usa `DatumSlice`. Muestra proporciones como celdas en una grilla:

```tsx
<Waffle
  data={data}
  height={280}
  rows={10}
  cols={10}
  showTooltip
  showLegend
  cellGap={2}
  cellRadius={2}
/>
```

### PolarBar — barras radiales

Usa `Datum1D`. Como un gráfico de barras pero en coordenadas polares:

```tsx
<PolarBar
  data={data}
  height={320}
  showTooltip
  showLabels
  showGrid
  innerRadius={0.2}
/>
```

### Cuándo usar cada variante

| Chart | Cuándo |
|---|---|
| `Pie` | 4–6 categorías, foco en proporciones |
| `Donut` | Igual que Pie + espacio central para un KPI |
| `Radar` | Comparar un perfil multidimensional |
| `Funnel` | Proceso de conversión secuencial |
| `Waffle` | Proporciones con énfasis visual contable |
| `PolarBar` | Valores cíclicos o comparativos en forma radial |

---

## Familia 5 — Medidores (4 charts)

### Gauge — aguja semicircular

```tsx
<Gauge
  value={72}
  min={0}
  max={100}
  height={220}
  title="Rendimiento del servidor"
  thresholds={[
    { value: 40,  color: '#ef4444', label: 'Crítico' },
    { value: 70,  color: '#f59e0b', label: 'Normal'  },
    { value: 100, color: '#10b981', label: 'Óptimo'  },
  ]}
  formatValue={(v) => `${v}%`}
  showValue
  showMinMax
/>
```

### Bullet — métrica con rangos cualitativos

El chart de Stephen Few: barra real + marcador de objetivo + rangos de fondo (poor/fair/good):

```tsx
import type { BulletDatum } from '@w3f/components/DATADISPLAY/Charts';

const data: BulletDatum[] = [
  { label: 'Ventas',        value: 75, target: 80, ranges: [50, 70, 100] },
  { label: 'Satisfacción',  value: 82, target: 90, ranges: [60, 80, 100] },
  { label: 'Retención',     value: 91, target: 85, ranges: [70, 85, 100] },
];

<Bullet
  data={data}
  height={200}
  showLabels
  showValues
  showTooltip
  barHeight={20}
  rangeColors={['#e5e7eb', '#d1d5db', '#9ca3af']}
/>
```

### Sparkline — mini línea inline

Recibe un array de números planos. Diseñado para usarse dentro de tablas o cards:

```tsx
const valores = [12, 18, 14, 22, 19, 25, 30, 27, 33];

<div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
  <span>Métrica XYZ</span>
  <Sparkline
    data={valores}
    width={120}
    height={40}
    color="#6366f1"
    showArea
    showEndDot
    showMinMax
    strokeWidth={1.5}
  />
  <span>33</span>
</div>
```

### Candlestick — velas financieras

```tsx
import type { CandlestickDatum } from '@w3f/components/DATADISPLAY/Charts';

const data: CandlestickDatum[] = [
  { date: '2024-01-02', open: 150, high: 158, low: 148, close: 155 },
  { date: '2024-01-03', open: 155, high: 162, low: 152, close: 148 },
  { date: '2024-01-04', open: 148, high: 155, low: 145, close: 153 },
];

<Candlestick
  data={data}
  height={320}
  showTooltip
  showGrid
  upColor="#10b981"
  downColor="#ef4444"
  formatY={(n) => `$${n}`}
/>
```

---

## Familia 6 — Jerarquía (4 charts)

**Tipo de dato:** `DatumHierarchy` (árbol recursivo)

```tsx
const jerarquia: DatumHierarchy = {
  id: 'raiz',
  label: 'Empresa',
  children: [
    {
      id: 'tech',
      label: 'Tecnología',
      value: 45,
      children: [
        { id: 'frontend', label: 'Frontend', value: 20 },
        { id: 'backend',  label: 'Backend',  value: 25 },
      ],
    },
    {
      id: 'ops',
      label: 'Operaciones',
      value: 30,
      children: [
        { id: 'infra', label: 'Infraestructura', value: 15 },
        { id: 'soporte', label: 'Soporte',        value: 15 },
      ],
    },
  ],
};
```

### Treemap — rectángulos proporcionales

```tsx
<Treemap
  data={jerarquia}
  height={350}
  showLabels
  showTooltip
  tilePadding={3}
  tileRadius={4}
  colorScheme="categorical-10"
/>
```

### Pack — círculos empaquetados

```tsx
<Pack
  data={jerarquia}
  height={350}
  showLabels
  showTooltip
  colorScheme="w3f-brand"
/>
```

### Sunburst — sol jerárquico

```tsx
<Sunburst
  data={jerarquia}
  height={380}
  showTooltip
  showLabels
  colorScheme="categorical-10"
/>
```

### TreeDiagram — árbol conectado

```tsx
import type { TreeDiagramLayout } from '@w3f/components/DATADISPLAY/Charts';

<TreeDiagram
  data={jerarquia}
  height={400}
  layout="vertical"       // 'vertical' | 'horizontal' | 'radial'
  showLabels
  showTooltip
  nodeRadius={6}
  linkWidth={1.5}
/>
```

### Cuándo usar cada variante

| Chart | Cuándo |
|---|---|
| `Treemap` | Tamaño relativo de categorías anidadas, fácil comparación de áreas |
| `Pack` | Similar pero con círculos — más estético, menos preciso |
| `Sunburst` | Explorar jerarquías profundas navegando desde el centro |
| `TreeDiagram` | Relaciones padre-hijo explícitas, organigramas, árboles de decisión |

---

## Familia 7 — Grafos y flujo (3 charts)

**Tipo de dato:** `DatumGraph` (`nodes[]` + `links[]`)

```tsx
const grafo: DatumGraph = {
  nodes: [
    { id: 'a', label: 'Frontend', group: 'web' },
    { id: 'b', label: 'API',      group: 'backend' },
    { id: 'c', label: 'DB',       group: 'backend' },
    { id: 'd', label: 'Cache',    group: 'infra' },
  ],
  links: [
    { source: 'a', target: 'b', value: 100 },
    { source: 'b', target: 'c', value: 80  },
    { source: 'b', target: 'd', value: 60  },
  ],
};
```

### Network — grafo de nodos

```tsx
<Network
  data={grafo}
  height={400}
  showLabels
  showTooltip
  nodeRadius={8}
  linkWidth={1.5}
  iterations={300}
  colorScheme="categorical-10"
/>
```

`iterations` controla la simulación de fuerzas D3 — más iteraciones = layout más estable, render inicial más lento.

### Sankey — flujo entre nodos

`Sankey` también usa `DatumGraph` pero los links deben tener `value` obligatorio (define el ancho del flujo):

```tsx
<Sankey
  data={grafo}
  height={400}
  showLabels
  showTooltip
  nodeWidth={20}
  nodePadding={15}
  colorScheme="categorical-10"
/>
```

### Chord — relaciones entre grupos

Usa `DatumMatrix` — una matriz cuadrada de flujos entre N grupos:

```tsx
import type { ChordDatum } from '@w3f/components/DATADISPLAY/Charts';

// Grupos: A, B, C — valores = flujo de A→B, A→C, B→A, etc.
const data: ChordDatum = {
  names: ['América', 'Europa', 'Asia'],
  matrix: [
    [0,   100, 80 ],   // desde América hacia Europa (100) y Asia (80)
    [90,  0,   120],   // desde Europa hacia América (90) y Asia (120)
    [70,  110, 0  ],   // desde Asia hacia América (70) y Europa (110)
  ],
};

<Chord
  data={data}
  height={400}
  showTooltip
  showLabels
  colorScheme="categorical-10"
/>
```

---

## Familia 8 — Temporal (2 charts)

### CalendarHeatmap — actividad por día

```tsx
import type { CalendarDatum } from '@w3f/components/DATADISPLAY/Charts';

// Una entrada por día — el chart ubica cada día en su semana/mes correspondiente
const data: CalendarDatum[] = [
  { date: '2024-01-15', value: 12 },
  { date: '2024-01-16', value: 5  },
  { date: '2024-01-22', value: 28 },
  // ... una entrada por día con actividad
];

<CalendarHeatmap
  data={data}
  height={180}
  showMonthLabels
  showDayLabels
  showTooltip
  colorRamp={['#f0fdf4', '#16a34a']}
  formatValue={(v) => `${v} commits`}
  cellGap={3}
  cellRadius={2}
/>
```

### Gantt — diagrama de tareas

```tsx
import type { GanttTask } from '@w3f/components/DATADISPLAY/Charts';

const tareas: GanttTask[] = [
  { id: 't1', label: 'Diseño UX',      start: '2024-01-01', end: '2024-01-15', group: 'Diseño',   progress: 1    },
  { id: 't2', label: 'Componentes',    start: '2024-01-10', end: '2024-02-05', group: 'Frontend',  progress: 0.7  },
  { id: 't3', label: 'API endpoints',  start: '2024-01-15', end: '2024-02-10', group: 'Backend',   progress: 0.5  },
  { id: 't4', label: 'Testing',        start: '2024-02-01', end: '2024-02-20', group: 'QA',        progress: 0.1  },
  { id: 't5', label: 'Deploy',         start: '2024-02-18', end: '2024-02-28', group: 'DevOps',    progress: 0    },
];

<Gantt
  data={tareas}
  height={320}
  showLabels
  showTooltip
  showXAxis
  showGrid
  barHeight={24}
  barGap={8}
  barRadius={4}
/>
```

---

## Familia 9 — Especializado (3 charts)

### Waterfall — cascada de incrementos

```tsx
import type { WaterfallDatum } from '@w3f/components/DATADISPLAY/Charts';

const data: WaterfallDatum[] = [
  { label: 'Inicio',         value: 500,   isTotal: true },
  { label: 'Ventas nuevas',  value: 350  },
  { label: 'Expansión',      value: 120  },
  { label: 'Churn',          value: -80  },
  { label: 'Descuentos',     value: -45  },
  { label: 'Total',          value: 845,  isTotal: true },
];

<Waterfall
  data={data}
  height={320}
  showTooltip
  showGrid
  showLabels
  showConnectors
  positiveColor="#10b981"
  negativeColor="#ef4444"
  totalColor="#6366f1"
  formatY={(n) => `$${n}`}
/>
```

`isTotal: true` dibuja la barra desde cero (barra de total/subtotal). Los demás se apilan sobre el acumulado.

### WordCloud — nube de palabras

```tsx
import type { WordCloudDatum } from '@w3f/components/DATADISPLAY/Charts';

const data: WordCloudDatum[] = [
  { text: 'React',       value: 90 },
  { text: 'TypeScript',  value: 75 },
  { text: 'CSS',         value: 60 },
  { text: 'Vite',        value: 50 },
  { text: 'Next.js',     value: 45 },
  { text: 'Node.js',     value: 40 },
  { text: 'GraphQL',     value: 35 },
];

<WordCloud
  data={data}
  height={350}
  showTooltip
  fontMinSize={14}
  fontMaxSize={60}
  spiral="archimedean"
  padding={4}
  colorScheme="categorical-10"
/>
```

### Geo — mapa coroplético

```tsx
import type { GeoFeatureDatum } from '@w3f/components/DATADISPLAY/Charts';

// data: array de features GeoJSON enriquecidas con value
const data: GeoFeatureDatum[] = [
  { id: 'AR', properties: { name: 'Argentina' }, geometry: { ... }, value: 720 },
  { id: 'BR', properties: { name: 'Brasil'    }, geometry: { ... }, value: 1450 },
  // ...
];

<Geo
  data={data}
  height={400}
  showTooltip
  colorScheme="sequential-blue"
  formatValue={(v) => `${v.toLocaleString()} usuarios`}
/>
```

---

## Guía de selección rápida

| Pregunta de datos | Chart recomendado |
|---|---|
| ¿Cuánto tiene cada categoría? | `Bar` / `BarHorizontal` |
| ¿Cómo comparo varias métricas por categoría? | `BarGrouped` |
| ¿Cómo se compone el total? | `BarStacked` / `Pie` / `Donut` |
| ¿Cómo evolucionó una métrica en el tiempo? | `Line` / `Area` |
| ¿Cómo evolucionaron varias métricas? | `LineMulti` / `AreaStacked` |
| ¿Hay correlación entre dos variables? | `Scatter` |
| ¿Y si quiero una tercera dimensión? | `Bubble` |
| ¿Cómo se distribuyen los valores? | `Histogram` / `BoxPlot` / `Violin` |
| ¿Qué tan intenso es X en una grilla? | `Heatmap` / `CalendarHeatmap` |
| ¿Cuánto progreso llevo vs mi objetivo? | `Gauge` / `Bullet` |
| ¿Cuál es la proporción de cada parte? | `Pie` / `Donut` / `Waffle` |
| ¿Qué tan grande es cada subcategoría? | `Treemap` / `Pack` / `Sunburst` |
| ¿Cómo se relacionan los nodos? | `Network` |
| ¿Cómo fluye la data entre grupos? | `Sankey` / `Chord` |
| ¿Cuándo sucede cada tarea? | `Gantt` |
| ¿Qué incrementos componen el resultado final? | `Waterfall` |
| ¿Cuál es el perfil multidimensional? | `Radar` |
| ¿Dónde está concentrada la actividad en el mapa? | `Geo` |

---

## En Next.js

Todos los charts usan `'use client'`. El patrón de composición más limpio es separar datos (Server Component) de visualización (Client Component):

```tsx
// page.tsx — Server Component
import { VentasChart } from './ventas-chart'
import { FunnelConversion } from './funnel-conversion'

export default async function Page() {
  const [ventas, conversion] = await Promise.all([
    db.ventas.groupByMonth(),
    db.leads.conversionFunnel(),
  ])

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
      <VentasChart   data={ventas}     />
      <FunnelConversion data={conversion} />
    </div>
  )
}
```

```tsx
// ventas-chart.tsx — Client Component
'use client'

import { Bar } from '@w3f/components/DATADISPLAY/Charts'
import type { Datum1D } from '@w3f/components/DATADISPLAY/Charts'

export function VentasChart({ data }: { data: Datum1D[] }) {
  return (
    <div style={{ height: '300px' }}>
      <Bar data={data} title="Ventas" colorScheme="w3f-brand" showTooltip />
    </div>
  )
}
```

---

## Siguiente paso

[Capítulo 20 — Sistema de temas](./20-sistema-temas.md)
