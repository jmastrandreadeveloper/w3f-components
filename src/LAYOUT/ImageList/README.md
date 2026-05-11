# ImageList

Galeria de imagenes basada en CSS Grid con dos variantes: `standard` (celdas uniformes) y `quilted` (celdas de distinto tamano mediante `cols`/`rows` por item). Internamente compone `Grid` y `GridAreaItem` con `ImageCard` como renderizador de cada imagen.

## Importacion

```tsx
import ImageList from '@/components/LAYOUT/ImageList/ImageList';
import type { ImageListItem } from '@/components/LAYOUT/ImageList/ImageList';
```

## Uso basico

```tsx
const items = [
  { id: 1, src: 'https://picsum.photos/seed/a/400/300', title: 'Foto 1' },
  { id: 2, src: 'https://picsum.photos/seed/b/400/300', title: 'Foto 2' },
  { id: 3, src: 'https://picsum.photos/seed/c/400/300', title: 'Foto 3' },
];

<ImageList items={items} cols={3} />
```

## Variante standard

Cuadricula uniforme con celdas de igual tamano:

```tsx
<ImageList
  items={items}
  variant="standard"
  cols={4}
  gap="8px"
/>
```

## Variante quilted

Mosaico con celdas de distinto tamano. Cada item puede definir `cols` y `rows`:

```tsx
const quiltedItems = [
  { id: 1, src: '...', title: 'Destacada', cols: 2, rows: 2 },  // 2x2
  { id: 2, src: '...', title: 'Normal' },                        // 1x1
  { id: 3, src: '...', title: 'Ancha', cols: 2 },               // 2x1
  { id: 4, src: '...', title: 'Alta', rows: 2 },                 // 1x2
  { id: 5, src: '...', title: 'Normal' },                        // 1x1
];

<ImageList
  items={quiltedItems}
  variant="quilted"
  cols={3}
  gap="8px"
  rowHeight={180}
/>
```

## Altura de fila personalizada

```tsx
{/* Fila compacta */}
<ImageList items={items} variant="standard" cols={4} gap="8px" rowHeight={120} />

{/* Fila alta */}
<ImageList items={items} variant="standard" cols={3} gap="12px" rowHeight={280} />

{/* Altura como string CSS */}
<ImageList items={items} variant="standard" cols={3} gap="8px" rowHeight="25vh" />
```

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `items` | `ImageListItem[]` | — | Array de imagenes a mostrar |
| `variant` | `ImageListVariant` | `'standard'` | Tipo de layout |
| `cols` | `number` | — | Numero de columnas del grid |
| `gap` | `string` | `'16px'` | Separacion entre celdas |
| `rowHeight` | `number \| string` | `'auto'` | Altura de cada fila (px o valor CSS) |
| `className` | `string` | — | Clases CSS adicionales |
| `style` | `CSSProperties` | — | Estilos inline adicionales |

## API

### ImageListItem

```ts
interface ImageListItem {
  id: string | number;   // Clave unica para React
  src: string;           // URL de la imagen
  title?: string;        // Texto alternativo y tooltip
  cols?: number;         // Solo para variant='quilted': columnas que abarca
  rows?: number;         // Solo para variant='quilted': filas que abarca
}
```

### ImageListVariant

```ts
type ImageListVariant = 'standard' | 'quilted';
```

### Logica interna

- **standard**: todas las celdas tienen el mismo tamano, `cols`/`rows` en los items son ignorados.
- **quilted**: activa `autoFlow="row dense"` en el Grid. Los items con `cols`/`rows` se envuelven en `GridAreaItem` con `gridColumn="span N"` / `gridRow="span N"`. Los items sin span van en celdas 1x1.
- `ImageCard` renderiza cada imagen con `object-fit: cover`, `border-radius: 8px` y titulo superpuesto en la parte inferior.

### Patron de uso recomendado

```tsx
// 1. Galeria de portfolio
<ImageList
  items={portfolioImages}
  variant="quilted"
  cols={4}
  gap="12px"
  rowHeight={200}
/>

// 2. Grid de productos uniforme
<ImageList
  items={products.map(p => ({ id: p.id, src: p.image, title: p.name }))}
  variant="standard"
  cols={3}
  gap="16px"
  rowHeight={240}
/>

// 3. Galeria responsiva (columnas auto)
<ImageList
  items={photos}
  variant="standard"
  gap="8px"
/>
```

## Estructura de archivos

```
ImageList/
  ImageList.tsx            Componente principal
  ImageCard.tsx            Renderizador individual de imagen
  ImageList.types.ts       Interfaces TypeScript
  ImageList.constants.ts   Defaults (variant, gap, rowHeight)
  ImageList.utils.ts       getTemplateColumns()
  README.md                Esta documentacion
```

Depende de: `Grid`, `GridAreaItem` de `LAYOUT/Grid/Grid`
