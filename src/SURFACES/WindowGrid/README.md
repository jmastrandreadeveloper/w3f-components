# WindowGrid

Extiende Window con un grid CSS interno que se reorganiza automaticamente segun el ancho de la ventana. Combina todas las funcionalidades de Window (arrastre, redimensionamiento, minimize/maximize, OS styles) con un sistema de columnas responsivo basado en breakpoints de ancho de ventana.

## Importacion

```tsx
import WindowGrid from '@/components/SURFACES/WindowGrid/WindowGrid';
```

## Uso basico

```tsx
<WindowGrid
  title="Dashboard"
  osStyle="windows"
  draggable
  resizable
  gridTemplateColumns="1fr 1fr"
  gap="12px"
>
  <Panel card>Widget A</Panel>
  <Panel card>Widget B</Panel>
  <Panel card>Widget C</Panel>
  <Panel card>Widget D</Panel>
</WindowGrid>
```

## Grid estatico

Define la estructura del grid explicitamente con `gridTemplateColumns`:

```tsx
<WindowGrid
  title="Panel de estadisticas"
  osStyle="windows"
  draggable
  resizable
  closable
  initialSize={{ width: 600, height: 350 }}
  gridTemplateColumns="repeat(3, 1fr)"
  gap="12px"
>
  <StatCard title="Ventas" value="$24,500" />
  <StatCard title="Usuarios" value="1,234" />
  <StatCard title="Pedidos" value="856" />
</WindowGrid>
```

## Grid responsivo automatico

Con `autoResponsive={true}`, las columnas cambian automaticamente segun el ancho actual de la ventana usando `responsiveColumns`:

```tsx
<WindowGrid
  title="Responsive Dashboard"
  osStyle="windows"
  draggable
  resizable
  closable
  autoResponsive
  responsiveColumns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
  gap="10px"
>
  <MetricCard title="CPU" value="45%" />
  <MetricCard title="Memoria" value="8.2 GB" />
  <MetricCard title="Disco" value="120 MB/s" />
  <MetricCard title="Red" value="54 Mbps" />
  <MetricCard title="Procesos" value="312" />
  <MetricCard title="Uptime" value="14d 7h" />
</WindowGrid>
```

El indicador de breakpoint activo aparece en la barra de titulo cuando `autoResponsive` esta activo.

## Grid template areas

Layouts complejos con areas nombradas:

```tsx
<WindowGrid
  title="App Layout"
  osStyle="macos"
  draggable
  resizable
  gridTemplateColumns="200px 1fr"
  gridTemplateRows="auto 1fr auto"
  gridTemplateAreas="'sidebar header' 'sidebar content' 'sidebar footer'"
  gap="8px"
  initialSize={{ width: 600, height: 380 }}
>
  <Panel style={{ gridArea: 'header' }}>Header</Panel>
  <Panel style={{ gridArea: 'sidebar' }}>Sidebar</Panel>
  <Panel style={{ gridArea: 'content' }}>Content</Panel>
  <Panel style={{ gridArea: 'footer' }}>Footer</Panel>
</WindowGrid>
```

## Con footer

```tsx
<WindowGrid
  title="Configuracion"
  osStyle="windows"
  draggable
  gridTemplateColumns="1fr 1fr"
  gap="12px"
  buttons={[
    { text: 'Cancelar', variant: 'text', onClick: handleCancel },
    { text: 'Aplicar', variant: 'raised', color: 'primary', onClick: handleApply },
  ]}
  footerAlign="end"
>
  <SettingPanel />
  <PreviewPanel />
</WindowGrid>
```

## CSS Custom Properties

WindowGrid hereda todas las CSS custom properties de Window (`--w3f-win-*`). Ademas tiene sus propias variables para el grid:

```css
.mi-window-grid {
  --w3f-win-bg: #0f172a;
  --w3f-win-tb-bg: #1e293b;
  --w3f-win-body-bg: #0f172a;
  --w3f-win-body-pad: 0;
  --w3f-win-radius: 12px;
  --w3f-win-shadow: 0 24px 64px rgba(0,0,0,0.5);
  --w3f-win-border-color: rgba(255,255,255,0.1);
}
```

Para las variables del Window base, consulta la documentacion de Window. Las variables del grid se pasan directamente como props CSS (`gap`, `gridTemplateColumns`, etc.).

## Props

WindowGrid extiende todos los props de `Window` y agrega los siguientes:

### Props de CSS Grid

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `gridTemplateColumns` | `string` | — | CSS `grid-template-columns` (ej. `'1fr 1fr'`, `'repeat(3, 1fr)'`) |
| `gridTemplateRows` | `string` | — | CSS `grid-template-rows` |
| `gridTemplateAreas` | `string` | — | CSS `grid-template-areas` con areas nombradas |
| `gap` | `string` | `'8px'` | Separacion entre celdas (rows y columns) |
| `rowGap` | `string` | — | Separacion solo entre filas |
| `columnGap` | `string` | — | Separacion solo entre columnas |
| `autoColumns` | `string` | — | CSS `grid-auto-columns` |
| `autoRows` | `string` | — | CSS `grid-auto-rows` |
| `autoFlow` | `CSSProperties['gridAutoFlow']` | — | CSS `grid-auto-flow` (`'row'`, `'column'`, `'dense'`, etc.) |
| `justifyContent` | `CSSProperties['justifyContent']` | — | Alineacion horizontal del grid |
| `alignContent` | `CSSProperties['alignContent']` | — | Alineacion vertical del grid |
| `justifyItems` | `CSSProperties['justifyItems']` | — | Alineacion horizontal de items |
| `alignItems` | `CSSProperties['alignItems']` | — | Alineacion vertical de items |

### Props responsivos

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `autoResponsive` | `boolean` | `false` | Activa la recalculacion de columnas segun el ancho |
| `responsiveColumns` | `WindowGridColumns` | `{ xs:1, sm:2, md:3 }` | Columnas por breakpoint: xs/sm/md/lg/xl |
| `responsiveBreakpoints` | `WindowGridBreakpoints` | — | Puntos de corte en px para cada nivel: sm/md/lg/xl |
| `onResize` | `(dimensions, breakpoint) => void` | — | Callback al cambiar el tamano de la ventana |

### Props heredados de Window

Todos los props de `Window` se pasan directamente. Ver README de Window para la lista completa: `title`, `icon`, `osStyle`, `size`, `modal`, `draggable`, `resizable`, `minimizable`, `maximizable`, `closable`, `onClose`, `onMinimize`, `onMaximize`, `onFocus`, `initialPosition`, `initialSize`, `open`, `noPadding`, `footer`, `buttons`, `footerAlign`, `className`, `bodyClassName`, `footerClassName`, `style`.

## API

### Entrada de datos

WindowGrid es controlado externamente de la misma manera que Window:

| Via | Prop | Descripcion |
|---|---|---|
| Visibilidad | `open` | `false` → no renderiza nada |
| Posicion inicial | `initialPosition` | `{ x, y }` en px |
| Tamano inicial | `initialSize` | `{ width, height }` en px |
| Estructura del grid | `gridTemplateColumns` + `gridTemplateAreas` | Define las celdas y areas |
| Responsividad | `autoResponsive` + `responsiveColumns` | Columnas por breakpoint de ancho |
| Contenido | `children` | Elementos React que ocupan las celdas |

### Salida de datos

| Evento | Firma | Cuando se dispara |
|---|---|---|
| `onClose` | `() => void` | Boton cerrar de la ventana |
| `onMinimize` | `(minimized: boolean) => void` | Boton minimizar |
| `onMaximize` | `(maximized: boolean) => void` | Boton maximizar / restaurar |
| `onFocus` | `() => void` | Clic en la ventana |
| `onResize` | `(dimensions, breakpoint) => void` | Cambio de tamano de la ventana (solo con `autoResponsive`) |

### Logica responsiva (useResponsiveGrid)

El hook interno `useResponsiveGrid` observa el ancho del cuerpo de la ventana mediante `ResizeObserver`. Cuando `autoResponsive` es `true`, calcula el numero de columnas actual comparando el ancho con los `responsiveBreakpoints` y genera el string `gridTemplateColumns` correspondiente:

```
windowWidth < sm  → responsiveColumns.xs columnas
windowWidth >= sm → responsiveColumns.sm columnas
windowWidth >= md → responsiveColumns.md columnas
...
```

### Comunicacion con otros componentes

WindowGrid hereda el mismo patron de z-index y foco que Window. No requiere ningun Provider externo.

Para layouts con areas nombradas, los hijos deben asignar `style={{ gridArea: 'nombre' }}`:

```tsx
<WindowGrid gridTemplateAreas="'header header' 'sidebar content'">
  <div style={{ gridArea: 'header' }}>...</div>
  <div style={{ gridArea: 'sidebar' }}>...</div>
  <div style={{ gridArea: 'content' }}>...</div>
</WindowGrid>
```

### Patron de uso recomendado

```tsx
// 1. Dashboard con columnas fijas
<WindowGrid
  title="Metricas"
  osStyle="windows"
  draggable resizable closable
  initialSize={{ width: 700, height: 400 }}
  gridTemplateColumns="repeat(3, 1fr)"
  gap="12px"
>
  {metricas.map(m => <MetricCard key={m.id} {...m} />)}
</WindowGrid>

// 2. Dashboard responsivo (redimensionar para ver columnas cambiar)
<WindowGrid
  title="Monitor del sistema"
  osStyle="windows"
  draggable resizable closable
  initialSize={{ width: 600, height: 350 }}
  autoResponsive
  responsiveColumns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
  gap="10px"
>
  {widgets.map(w => <Widget key={w.id} {...w} />)}
</WindowGrid>

// 3. Layout de aplicacion con areas
<WindowGrid
  title="IDE"
  osStyle="windows"
  draggable resizable
  gridTemplateColumns="180px 1fr 220px"
  gap="2px"
>
  <FileExplorer style={{ gridArea: 'explorer' }} />
  <CodeEditor style={{ gridArea: 'editor' }} />
  <PropertiesPanel style={{ gridArea: 'props' }} />
</WindowGrid>
```

## Estructura de archivos

```
WindowGrid/
  WindowGrid.tsx            Componente principal
  WindowGrid.types.ts       Interfaces TypeScript (extiende WindowProps)
  WindowGrid.constants.ts   Clases CSS y defaults
  WindowGrid.utils.ts       buildGridStyle()
  WindowGrid.hooks.ts       useResponsiveGrid (ResizeObserver + breakpoints)
  README.md                 Esta documentacion
```

CSS: `src/w3fussion/SURFACES/_window-grid.css`, `src/w3fussion/SURFACES/_window.css`
