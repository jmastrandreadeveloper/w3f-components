# GridWithDividers

Grid CSS con divisores arrastrables entre areas nombradas. Permite redimensionar paneles en tiempo real mediante interaccion de raton. Extiende `Grid` con un hook `useGridDivider` que gestiona el estado de cada divisor y ajusta dinamicamente `templateColumns` / `templateRows`.

## Importacion

```tsx
import GridWithDividers from '@/components/LAYOUT/GridWithDividers/GridWithDividers';
import { GridAreaItem } from '@/components/LAYOUT/Grid/Grid';
import type { DividerConfig } from '@/components/LAYOUT/GridWithDividers/GridWithDividers';
```

## Uso basico — dos columnas

```tsx
<GridWithDividers
  templateAreas={`"sidebar main"`}
  templateColumns="250px 1fr"
  templateRows="1fr"
  dividers={[
    {
      orientation: 'vertical',
      position: 'right',
      between: ['sidebar', 'main'],
      initialSize: 250,
      minSize: 150,
      maxSize: 500,
      columnIndex: 0,
    }
  ]}
>
  <GridAreaItem gridArea="sidebar">
    <div>Sidebar (arrastra el borde derecho)</div>
  </GridAreaItem>
  <GridAreaItem gridArea="main">
    <div>Contenido principal</div>
  </GridAreaItem>
</GridWithDividers>
```

## Tres columnas (IDE layout)

```tsx
<GridWithDividers
  templateAreas={`"explorer editor inspector"`}
  templateColumns="200px 1fr 250px"
  templateRows="1fr"
  dividers={[
    {
      orientation: 'vertical',
      position: 'right',
      between: ['explorer', 'editor'],
      initialSize: 200,
      minSize: 120,
      maxSize: 400,
      columnIndex: 0,
    },
    {
      orientation: 'vertical',
      position: 'left',
      between: ['editor', 'inspector'],
      initialSize: 250,
      minSize: 150,
      maxSize: 400,
      columnIndex: 2,
    }
  ]}
>
  <GridAreaItem gridArea="explorer"><div>Explorer</div></GridAreaItem>
  <GridAreaItem gridArea="editor"><div>Editor</div></GridAreaItem>
  <GridAreaItem gridArea="inspector"><div>Inspector</div></GridAreaItem>
</GridWithDividers>
```

## Divisor horizontal (filas)

```tsx
<GridWithDividers
  templateAreas={`"top" "bottom"`}
  templateColumns="1fr"
  templateRows="300px 1fr"
  dividers={[
    {
      orientation: 'horizontal',
      position: 'bottom',
      between: ['top', 'bottom'],
      initialSize: 300,
      minSize: 150,
      maxSize: 600,
      rowIndex: 0,
    }
  ]}
>
  <GridAreaItem gridArea="top"><div>Panel superior</div></GridAreaItem>
  <GridAreaItem gridArea="bottom"><div>Panel inferior</div></GridAreaItem>
</GridWithDividers>
```

## Props — GridWithDividers

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | — | Areas del grid (usar `GridAreaItem` con `gridArea`) |
| `templateColumns` | `string` | — | `grid-template-columns` inicial |
| `templateRows` | `string` | — | `grid-template-rows` inicial |
| `templateAreas` | `string` | — | `grid-template-areas` con nombres de area |
| `gap` | `string` | `'1px'` | Separacion entre areas |
| `dividers` | `DividerConfig[]` | `[]` | Configuracion de cada divisor |
| `style` | `CSSProperties` | `{}` | Estilos inline adicionales |

## API

### DividerConfig

| Campo | Tipo | Default | Descripcion |
|---|---|---|---|
| `initialSize` | `number` | `250` | Tamano inicial del panel en px |
| `minSize` | `number` | `100` | Tamano minimo en px |
| `maxSize` | `number` | `600` | Tamano maximo en px |
| `orientation` | `DividerOrientation` | `'vertical'` | Orientacion del divisor |
| `columnIndex` | `number` | — | Indice de columna en `templateColumns` a redimensionar |
| `rowIndex` | `number` | — | Indice de fila en `templateRows` a redimensionar |
| `between` | `[string, string]` | — | Nombres de las dos areas adyacentes (el divisor se renderiza en la primera) |
| `position` | `DividerPosition` | `'right'` | Lado del area `between[0]` donde se situa el divisor |

### DividerOrientation y DividerPosition

```ts
type DividerOrientation = 'vertical' | 'horizontal';
type DividerPosition    = 'left' | 'right' | 'top' | 'bottom';
```

### Mecanica interna

1. Cada `DividerConfig` crea un estado con `useGridDivider(initialSize, minSize, maxSize, orientation)`.
2. El hook retorna `{ size, isDragging, handleMouseDown, setSize, reset }`.
3. `size` reemplaza el valor correspondiente en `templateColumns` (si `columnIndex`) o `templateRows` (si `rowIndex`) mediante `gridDividerUtils.replaceTemplateSize()`.
4. El divisor se renderiza como un `<Divider>` posicionado absolutamente dentro del `GridAreaItem` de `between[0]`.
5. Al arrastrar, `mousemove` en `document` actualiza `size` con `Math.min(maxSize, Math.max(minSize, delta))`.

### Patron de uso recomendado

```tsx
// 1. Layout de aplicacion con sidebar redimensionable
<div style={{ height: '100vh' }}>
  <GridWithDividers
    templateAreas={`"sidebar content"`}
    templateColumns="240px 1fr"
    templateRows="1fr"
    dividers={[{
      orientation: 'vertical', position: 'right',
      between: ['sidebar', 'content'],
      initialSize: 240, minSize: 160, maxSize: 400, columnIndex: 0,
    }]}
    style={{ height: '100%' }}
  >
    <GridAreaItem gridArea="sidebar" style={{ overflow: 'auto' }}>
      <Sidenav />
    </GridAreaItem>
    <GridAreaItem gridArea="content" style={{ overflow: 'auto' }}>
      <main>...</main>
    </GridAreaItem>
  </GridWithDividers>
</div>

// 2. Editor de codigo con panel de consola
<GridWithDividers
  templateAreas={`"editor" "console"`}
  templateColumns="1fr"
  templateRows="1fr 200px"
  dividers={[{
    orientation: 'horizontal', position: 'bottom',
    between: ['editor', 'console'],
    initialSize: 200, minSize: 80, maxSize: 400, rowIndex: 1,
  }]}
  style={{ height: '600px' }}
>
  <GridAreaItem gridArea="editor"><CodeEditor /></GridAreaItem>
  <GridAreaItem gridArea="console" style={{ overflowY: 'auto' }}><Console /></GridAreaItem>
</GridWithDividers>
```

### Nota sobre GridWithDrawers

`GridWithDrawers` (en `GridWiithDrawers/`) extiende el patron de `GridWithDividers` agregando un boton de colapso para un panel designado como drawer. Se usa internamente en W3FStudio.

## Estructura de archivos

```
GridWithDividers/
  GridWithDividers.tsx            Componente principal
  Divider.tsx                     Elemento visual del divisor
  SliderControl.tsx               Control de configuracion de tamano
  GridWithDividers.types.ts       Interfaces TypeScript
  GridWithDividers.constants.ts   Defaults
  GridWithDividers.hooks.ts       useGridDivider (estado y drag)
  GridWithDividers.styles.ts      Estilos del divisor
  GridWithDividers.utils.ts       gridDividerUtils (replaceTemplateSize)
  README.md                       Esta documentacion
```

Depende de: `Grid`, `GridAreaItem` de `LAYOUT/Grid/Grid`
