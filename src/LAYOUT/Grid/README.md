# Grid

Wrapper de CSS Grid totalmente configurable. Acepta todas las propiedades CSS Grid como props y las aplica como estilos inline. Incluye el componente compuesto `GridAreaItem` para posicionamiento y span de columnas.

## Importacion

```tsx
import { Grid, GridAreaItem } from '@/components/LAYOUT/Grid/Grid';
```

## Uso basico

```tsx
<Grid templateColumns="1fr 1fr 1fr" gap="1rem">
  <div>Columna 1</div>
  <div>Columna 2</div>
  <div>Columna 3</div>
</Grid>
```

## Template columns

```tsx
{/* 2 columnas iguales */}
<Grid templateColumns="1fr 1fr" gap="0.75rem">...</Grid>

{/* repeat */}
<Grid templateColumns="repeat(3, 1fr)" gap="0.75rem">...</Grid>

{/* mixto */}
<Grid templateColumns="200px 1fr 2fr" gap="0.75rem">...</Grid>

{/* auto-fill responsivo */}
<Grid templateColumns="repeat(auto-fill, minmax(150px, 1fr))" gap="0.75rem">...</Grid>
```

## GridAreaItem — Column spanning

```tsx
<Grid templateColumns="repeat(4, 1fr)" gap="0.75rem">
  <GridAreaItem colSpan={2}>
    <div>Ocupa 2 columnas</div>
  </GridAreaItem>
  <GridAreaItem colSpan={1}>
    <div>1 columna</div>
  </GridAreaItem>
  <GridAreaItem colSpan={1}>
    <div>1 columna</div>
  </GridAreaItem>
</Grid>
```

## Template Areas (Holy Grail Layout)

```tsx
<Grid
  templateAreas={`"header header" "sidebar main" "footer footer"`}
  templateColumns="250px 1fr"
  templateRows="auto 1fr auto"
  gap="0.75rem"
>
  <GridAreaItem gridArea="header">Header</GridAreaItem>
  <GridAreaItem gridArea="sidebar">Sidebar</GridAreaItem>
  <GridAreaItem gridArea="main">Main Content</GridAreaItem>
  <GridAreaItem gridArea="footer">Footer</GridAreaItem>
</Grid>
```

## Alineacion

```tsx
<Grid
  templateColumns="repeat(3, 1fr)"
  gap="0.75rem"
  alignItems="center"
  justifyItems="center"
>
  ...
</Grid>
```

## Auto flow y rows

```tsx
<Grid
  templateColumns="repeat(3, 1fr)"
  autoRows="200px"
  autoFlow="row dense"
  gap="0.5rem"
>
  ...
</Grid>
```

## Props — Grid

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | — | Contenido del grid |
| `templateColumns` | `string` | — | `grid-template-columns` |
| `templateRows` | `string` | — | `grid-template-rows` |
| `templateAreas` | `string` | — | `grid-template-areas` |
| `grid` | `string` | — | Shorthand `grid` |
| `gridTemplate` | `string` | — | Shorthand `grid-template` |
| `gap` | `string` | — | Gap entre celdas |
| `rowGap` | `string` | — | Gap entre filas |
| `columnGap` | `string` | — | Gap entre columnas |
| `autoColumns` | `string` | — | `grid-auto-columns` |
| `autoRows` | `string` | — | `grid-auto-rows` |
| `autoFlow` | `GridAutoFlow` | — | `grid-auto-flow` |
| `justifyContent` | `GridJustify` | — | Alineacion horizontal del grid |
| `alignContent` | `GridAlignContent` | — | Alineacion vertical del grid |
| `placeContent` | `string` | — | Shorthand place-content |
| `justifyItems` | `GridJustifyItems` | — | Alineacion por defecto de items (eje X) |
| `alignItems` | `GridAlignItems` | — | Alineacion por defecto de items (eje Y) |
| `placeItems` | `string` | — | Shorthand place-items |
| `width` | `string` | — | Anchura del contenedor |
| `height` | `string` | — | Altura del contenedor |
| `minWidth` | `string` | — | Min-width del contenedor |
| `minHeight` | `string` | — | Min-height del contenedor |
| `maxWidth` | `string` | — | Max-width del contenedor |
| `maxHeight` | `string` | — | Max-height del contenedor |
| `padding` | `string` | — | Padding del contenedor |
| `margin` | `string` | — | Margin del contenedor |
| `style` | `CSSProperties` | — | Estilos inline adicionales |
| `className` | `string` | — | Clases CSS adicionales |

## Props — GridAreaItem

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | — | Contenido del item |
| `colSpan` | `number \| string` | — | Columnas a abarcar → clase `w3f-col-span-N` |
| `gridArea` | `string` | — | Nombre del area (`grid-area`) |
| `gridRow` | `string` | — | Shorthand `grid-row` |
| `gridColumn` | `string` | — | Shorthand `grid-column` |
| `justifySelf` | `GridJustifySelf` | — | Alineacion horizontal de este item |
| `alignSelf` | `GridAlignSelf` | — | Alineacion vertical de este item |
| `placeSelf` | `string` | — | Shorthand place-self |
| `style` | `CSSProperties` | — | Estilos inline adicionales |
| `className` | `string` | — | Clases CSS adicionales |

## API

### Tipos de alineacion

| Tipo | Valores |
|---|---|
| `GridAutoFlow` | `'row'` \| `'column'` \| `'row dense'` \| `'column dense'` |
| `GridJustify` | `'start'` \| `'end'` \| `'center'` \| `'stretch'` \| `'space-around'` \| `'space-between'` \| `'space-evenly'` |
| `GridAlignItems` | `'start'` \| `'end'` \| `'center'` \| `'stretch'` \| `'baseline'` |
| `GridJustifyItems` | `'start'` \| `'end'` \| `'center'` \| `'stretch'` |

### Patron de uso recomendado

```tsx
// 1. Grid responsivo sin media queries
<Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap="1rem">
  {items.map(item => <Card key={item.id} {...item} />)}
</Grid>

// 2. Layout de pagina con areas nombradas
<Grid
  templateAreas={`"nav nav" "side content" "foot foot"`}
  templateColumns="240px 1fr"
  templateRows="auto 1fr auto"
  gap="0"
>
  <GridAreaItem gridArea="nav"><AppBar /></GridAreaItem>
  <GridAreaItem gridArea="side"><Sidebar /></GridAreaItem>
  <GridAreaItem gridArea="content"><main>...</main></GridAreaItem>
  <GridAreaItem gridArea="foot"><Footer /></GridAreaItem>
</Grid>

// 3. Dashboard con tarjetas de distintos tamaños
<Grid templateColumns="repeat(3, 1fr)" gap="1rem">
  <GridAreaItem colSpan={2}><BigChart /></GridAreaItem>
  <StatCard />
  <StatCard />
  <GridAreaItem colSpan={3}><DataTable /></GridAreaItem>
</Grid>
```

### Nota sobre clases w3f-col-span-N

Cuando `colSpan` es un entero entre 1 y 12, `GridAreaItem` aplica la clase CSS `w3f-col-span-{N}` definida en el sistema de grid de 12 columnas de W3Fussion. Para valores fuera de ese rango o con expresiones CSS, usa `gridColumn` directamente.

## Estructura de archivos

```
Grid/
  Grid.tsx            Componente principal + GridAreaItem
  Grid.types.ts       Interfaces TypeScript
  Grid.constants.ts   CSS class tokens
  Grid.utils.ts       buildGridInlineStyles(), buildGridItemClassNames(), buildGridItemInlineStyles()
  README.md           Esta documentacion
```

CSS: utilidades `w3f-col-span-*` en `src/w3fussion/_grid.css`
