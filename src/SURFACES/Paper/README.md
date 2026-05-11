# Paper

Componente de hoja cuadriculada estilo libreta de escuela. Simula papel con cuadricula de 5 mm (18.9 px) mediante CSS background patterns. Util como contenedor visual para formularios, notas, bocetos o cualquier contenido que requiera alineacion a una cuadricula de referencia.

## Importacion

```tsx
import Paper from '@/components/SURFACES/Paper/Paper';
```

## Uso basico

```tsx
<Paper>
  <p>Contenido sobre papel cuadriculado.</p>
</Paper>
```

## Variantes

Siete variantes que controlan la intensidad y apariencia del papel:

```tsx
<Paper variant="default">Standard grid with normal line weight.</Paper>
<Paper variant="plain">No visible grid lines.</Paper>
<Paper variant="subtle">Barely visible grid pattern.</Paper>
<Paper variant="bold">Prominent, high-contrast grid lines.</Paper>
<Paper variant="elevated">Enhanced drop shadow depth.</Paper>
<Paper variant="flat">Border instead of shadow.</Paper>
<Paper variant="rounded">Extra rounded corners.</Paper>
```

## Colores de cuadricula

Siete paletas para las lineas del grid:

```tsx
<Paper gridColor="default" />
<Paper gridColor="primary" />
<Paper gridColor="secondary" />
<Paper gridColor="success" />
<Paper gridColor="warning" />
<Paper gridColor="danger" />
<Paper gridColor="info" />
```

## Tamanos

Cuatro tamanos predefinidos que controlan el padding interno:

```tsx
<Paper size="sm">Compact padding.</Paper>
<Paper size="md">Default size.</Paper>
<Paper size="lg">Generous spacing.</Paper>
<Paper size="xl">Extra large content area.</Paper>
```

## Ancho completo

Extiende el paper al 100% del contenedor padre:

```tsx
<Paper fullWidth variant="bold" gridColor="primary">
  Full width content aligned to the grid.
</Paper>
```

## Dimensionado en unidades de cuadricula

Fija el ancho y alto en multiplos exactos del grid (18.9 px cada uno), garantizando alineacion perfecta al patron:

```tsx
<Paper widthUnits={20} heightUnits={10}>
  20 x 10 grid units
</Paper>

<Paper widthUnits={15} heightUnits={15} gridColor="primary">
  15 x 15 units square
</Paper>
```

## Modo debug

Resalta el borde del paper en rojo para facilitar la verificacion de alineacion:

```tsx
<Paper debug size="md">
  Debug mode highlights the container boundaries.
</Paper>
```

## CSS Custom Properties

El Paper es 100% configurable via CSS custom properties:

```css
.mi-paper-custom {
  --w3f-paper-bg: #faf3e0;
  --w3f-paper-grid-color: #c8a96e;
  --w3f-paper-grid-color-secondary: #dcc8a0;
  --w3f-paper-grid-opacity: 0.4;
  --w3f-paper-grid-size: 20px;
  --w3f-paper-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  --w3f-paper-radius: 4px;
  --w3f-paper-padding: 2rem;
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-paper-grid-size` | `18.9px` | Tamano de celda del grid (5 mm) |
| `--w3f-paper-grid-color` | `gray-300` | Color de las lineas mayores |
| `--w3f-paper-grid-color-secondary` | `gray-200` | Color de las lineas menores |
| `--w3f-paper-grid-opacity` | `0.6` | Opacidad global del patron de grid |
| `--w3f-paper-grid-thickness` | `1px` | Grosor de lineas menores |
| `--w3f-paper-grid-major-thickness` | `1.5px` | Grosor de lineas mayores |
| `--w3f-paper-grid-major-interval` | `4` | Cada cuantas celdas aparece una linea mayor |
| `--w3f-paper-bg` | `#ffffff` | Color de fondo del papel |
| `--w3f-paper-shadow` | `shadow-lg` | Box shadow del papel |
| `--w3f-paper-radius` | `radius-md` | Border radius |
| `--w3f-paper-padding` | `space-6` | Padding interno |
| `--w3f-paper-margin` | `space-4` | Margen exterior |
| `--w3f-paper-flat-border-color` | `outline-variant` | Borde de la variante `flat` |
| `--w3f-paper-radius-rounded` | `radius-xl` | Border radius de la variante `rounded` |
| `--w3f-paper-shadow-elevated` | `shadow-xl` | Sombra de la variante `elevated` |
| `--w3f-paper-debug-color` | `danger` | Color del borde en modo debug |

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | — | Contenido del papel |
| `variant` | `'default' \| 'plain' \| 'subtle' \| 'bold' \| 'elevated' \| 'flat' \| 'rounded'` | `'default'` | Estilo visual del papel |
| `gridColor` | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` | Color de las lineas del grid |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Tamano (controla padding) |
| `fullWidth` | `boolean` | `false` | Extiende al 100% del contenedor |
| `debug` | `boolean` | `false` | Resalta el borde del papel en rojo |
| `widthUnits` | `number` | — | Ancho en unidades de cuadricula |
| `heightUnits` | `number` | — | Alto en unidades de cuadricula |
| `className` | `string` | `''` | Clases CSS adicionales |
| `style` | `CSSProperties` | `{}` | Estilos inline adicionales |

## API

### Entrada de datos

Paper es un componente de contenedor puramente visual. No acepta ni gestiona datos de formulario. Recibe su contenido exclusivamente via `children`.

### Salida de datos

Paper no emite eventos ni callbacks. Es un componente de presentacion sin efectos secundarios.

### Comunicacion con otros componentes

#### Independiente (sin contexto requerido)

Paper funciona de forma autonoma. No requiere ningun Provider ni Context. Puede colocarse en cualquier parte del arbol React:

```tsx
<Paper variant="bold" gridColor="primary" size="lg">
  <Input name="notes" />
  <Button type="submit">Guardar</Button>
</Paper>
```

#### Como contenedor de formularios

Paper actua como envoltorio visual neutrual para cualquier conjunto de componentes, incluyendo formularios:

```tsx
<Form initialValues={{ sketch: '' }} onSubmit={handleSubmit}>
  <Paper variant="subtle" size="lg">
    <Input name="sketch" label="Boceto" />
    <Button type="submit">Guardar</Button>
  </Paper>
</Form>
```

### Patron de dimensionado con unidades

La constante interna `--w3f-paper-grid-size` vale `18.9px` (= 5 mm a 96 dpi). Los props `widthUnits` y `heightUnits` calculan dimensiones en multiplos exactos de esta medida:

```
width  = widthUnits  * 18.9px
height = heightUnits * 18.9px
```

Esto garantiza que los elementos internos queden perfectamente alineados a la cuadricula si se les asigna tambien dimensiones multiplo del grid.

### Accesibilidad

Paper renderiza un `<div>` semanticamente neutro. No agrega atributos ARIA propios. El contenido accesible queda a cargo de los elementos hijos.

### Patron de uso recomendado

```tsx
// 1. Nota simple
<Paper variant="subtle" size="md">
  <p>Texto sobre papel cuadriculado.</p>
</Paper>

// 2. Boceto tecnico con dimensiones exactas
<Paper widthUnits={30} heightUnits={20} variant="bold" gridColor="primary">
  <svg>...</svg>
</Paper>

// 3. Contenedor de formulario
<Paper variant="default" size="lg" fullWidth>
  <Form initialValues={defaults} onSubmit={save}>
    <Input name="title" />
    <Button type="submit">Guardar</Button>
  </Form>
</Paper>

// 4. Tema personalizado via CSS
<Paper className="papel-vintage" size="lg">
  <p>Contenido sobre papel envejecido.</p>
</Paper>
```

## Estructura de archivos

```
Paper/
  Paper.tsx            Componente principal
  Paper.types.ts       Interfaces TypeScript
  Paper.constants.ts   Clases CSS y defaults
  Paper.utils.ts       buildPaperClasses(), buildPaperStyle()
  README.md            Esta documentacion
```

CSS: `src/w3fussion/SURFACES/_paper.css`
