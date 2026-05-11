# Display

Sistema de posicionamiento absoluto para overlays, badges y elementos flotantes dentro de un contenedor relativo. Compuesto por `DisplayContainer` (posicionamiento relativo) y `DisplayItem` (posicionamiento absoluto en 9 posiciones predefinidas).

## Importacion

```tsx
import {
  DisplayContainer,
  DisplayItem,
  TOPLEFT, TOPRIGHT, BOTTOMLEFT, BOTTOMRIGHT,
  MIDDLE, TOP, BOTTOM, LEFT, RIGHT,
} from '@/components/LAYOUT/Display/Display';
```

## Uso basico

```tsx
<DisplayContainer>
  <img src="/foto.jpg" />
  <DisplayItem position={TOPRIGHT}>
    <span className="badge">NEW</span>
  </DisplayItem>
</DisplayContainer>
```

## Las 9 posiciones

```tsx
<DisplayContainer className="demo-box" style={{ width: 200, height: 200 }}>
  <DisplayItem position={TOPLEFT}>TL</DisplayItem>
  <DisplayItem position={TOP}>T</DisplayItem>
  <DisplayItem position={TOPRIGHT}>TR</DisplayItem>
  <DisplayItem position={LEFT}>L</DisplayItem>
  <DisplayItem position={MIDDLE}>M</DisplayItem>
  <DisplayItem position={RIGHT}>R</DisplayItem>
  <DisplayItem position={BOTTOMLEFT}>BL</DisplayItem>
  <DisplayItem position={BOTTOM}>B</DisplayItem>
  <DisplayItem position={BOTTOMRIGHT}>BR</DisplayItem>
</DisplayContainer>
```

## Multiples overlays

```tsx
<DisplayContainer style={{ width: 300, height: 200, background: 'var(--w3f-gray-100)' }}>
  <DisplayItem position={TOPLEFT}>
    <Badge color="primary">1</Badge>
  </DisplayItem>
  <DisplayItem position={TOPRIGHT}>
    <Badge color="danger">NEW</Badge>
  </DisplayItem>
  <DisplayItem position={BOTTOM}>
    <div style={{ background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '8px 16px', width: '100%', textAlign: 'center' }}>
      Caption de imagen
    </div>
  </DisplayItem>
</DisplayContainer>
```

## Tarjeta con imagen y overlay

```tsx
<DisplayContainer style={{ borderRadius: '12px', overflow: 'hidden' }}>
  <img src="/producto.jpg" style={{ display: 'block', width: '100%' }} />
  <DisplayItem position={TOPRIGHT}>
    <span style={{ background: 'var(--w3f-danger)', color: '#fff', padding: '2px 8px', borderRadius: 'var(--w3f-radius)', fontSize: '0.7rem', fontWeight: 700 }}>
      -30%
    </span>
  </DisplayItem>
  <DisplayItem position={BOTTOM}>
    <div style={{ background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '0.75rem 1rem' }}>
      Nombre del Producto
    </div>
  </DisplayItem>
</DisplayContainer>
```

## Constantes de posicion exportadas

```tsx
// Importacion directa de constantes
import { TOPLEFT, TOPRIGHT, BOTTOMLEFT, BOTTOMRIGHT, MIDDLE, TOP, BOTTOM, LEFT, RIGHT } from '...';

// O como objeto
import { DisplayPositions } from '...';
const { TOPLEFT, TOPRIGHT } = DisplayPositions;
```

## Props — DisplayContainer

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | — | Contenido del contenedor |
| `className` | `string` | `''` | Clases CSS adicionales |
| `style` | `CSSProperties` | — | Estilos inline (width, height, etc.) |

## Props — DisplayItem

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | — | Contenido a posicionar |
| `position` | `DisplayPosition` | — | Clase de posicion `w3f-position-*` |
| `className` | `string` | `''` | Clases CSS adicionales |
| `style` | `CSSProperties` | — | Estilos inline adicionales |

## API

### Tipo DisplayPosition

```ts
type DisplayPosition =
  | 'w3f-position-topleft'
  | 'w3f-position-topright'
  | 'w3f-position-bottomleft'
  | 'w3f-position-bottomright'
  | 'w3f-position-middle'
  | 'w3f-position-top'
  | 'w3f-position-bottom'
  | 'w3f-position-left'
  | 'w3f-position-right';
```

### Clases CSS de posicion

| Constante | Clase CSS | Posicion |
|---|---|---|
| `TOPLEFT` | `w3f-position-topleft` | Esquina superior izquierda |
| `TOP` | `w3f-position-top` | Centro superior |
| `TOPRIGHT` | `w3f-position-topright` | Esquina superior derecha |
| `LEFT` | `w3f-position-left` | Centro izquierdo |
| `MIDDLE` | `w3f-position-middle` | Centro absoluto |
| `RIGHT` | `w3f-position-right` | Centro derecho |
| `BOTTOMLEFT` | `w3f-position-bottomleft` | Esquina inferior izquierda |
| `BOTTOM` | `w3f-position-bottom` | Centro inferior |
| `BOTTOMRIGHT` | `w3f-position-bottomright` | Esquina inferior derecha |

### Patron de uso recomendado

```tsx
// 1. Notificacion sobre avatar
<DisplayContainer style={{ display: 'inline-block' }}>
  <Avatar src="/foto.jpg" size="large" />
  <DisplayItem position={TOPRIGHT}>
    <Badge count={5} />
  </DisplayItem>
</DisplayContainer>

// 2. Imagen de portada con caption
<DisplayContainer style={{ borderRadius: '12px', overflow: 'hidden', aspectRatio: '16/9' }}>
  <img src="/cover.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  <DisplayItem position={BOTTOM}>
    <div style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', padding: '2rem 1rem 1rem', color: '#fff' }}>
      Titulo del articulo
    </div>
  </DisplayItem>
</DisplayContainer>

// 3. Producto con descuento
<DisplayContainer>
  <ProductCard />
  <DisplayItem position={TOPLEFT}>
    <Chip color="danger" size="sm">-20%</Chip>
  </DisplayItem>
</DisplayContainer>
```

## Estructura de archivos

```
Display/
  Display.tsx            DisplayContainer + DisplayItem + exportacion de constantes
  Display.types.ts       Interfaces TypeScript y tipo DisplayPosition
  Display.constants.ts   W3F_POSITION_CLASSES con los 9 valores
  Display.hooks.ts       useDisplayStyles()
  Display.utils.ts       Funciones puras de clase
  README.md              Esta documentacion
```

CSS: clases `w3f-position-*` en `src/w3fussion/LAYOUT/_display.css`
