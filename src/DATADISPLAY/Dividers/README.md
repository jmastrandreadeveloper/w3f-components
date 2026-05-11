# Dividers

Separador visual de contenido. Soporta orientacion horizontal y vertical, variantes de linea (solida, discontinua, punteada, gradiente), contenido de texto intercalado, grosor, espaciado, color y animacion.

## Importacion

```tsx
import Dividers from '@/components/DATADISPLAY/Dividers/Dividers';
```

## Uso basico

### Horizontal (default)

```tsx
<Dividers />
```

### Vertical

```tsx
<Dividers type="vertical" height="20px" />
```

## Variantes de linea

```tsx
<Dividers variant="solid" />
<Dividers variant="dashed" />
<Dividers variant="dotted" />
<Dividers variant="gradient" gradient={{ from: '#6366f1', to: '#ec4899' }} />
```

## Con contenido de texto

Solo disponible en orientacion horizontal. El texto divide la linea en dos segmentos:

```tsx
<Dividers contentPosition="center">OR</Dividers>
<Dividers contentPosition="left">Section Start</Dividers>
<Dividers contentPosition="right">End</Dividers>
<Dividers contentPosition="center">Chapter 3</Dividers>
```

El contenido puede ser texto o JSX:

```tsx
<Dividers contentPosition="center">
  <span className="w3f-text-primary w3f-font-semibold">Nuevo</span>
</Dividers>
```

## Grosor

```tsx
<Dividers thickness="1px" />   {/* default */}
<Dividers thickness="2px" />
<Dividers thickness="4px" />
<Dividers thickness="6px" color="#6366f1" />
```

## Espaciado vertical

```tsx
<Dividers spacing="8px" />    {/* margen arriba y abajo */}
<Dividers spacing="16px" />   {/* default */}
<Dividers spacing="32px" />
<Dividers spacing="48px" />
```

## Color

```tsx
<Dividers color="#6366f1" />
<Dividers color="#ef4444" thickness="2px" />
<Dividers color="var(--w3f-primary)" />
```

## Gradiente

```tsx
<Dividers variant="gradient" gradient={{ from: '#6366f1', to: '#ec4899' }} thickness="3px" />
<Dividers variant="gradient" gradient={{ from: '#22c55e', to: '#3b82f6', direction: 'to right' }} />
```

## Animacion

```tsx
<Dividers animated thickness="2px" color="#6366f1" />
<Dividers animated variant="gradient" gradient={{ from: '#ec4899', to: '#8b5cf6' }} thickness="2px" />
```

## CSS Custom Properties

```css
.mi-seccion {
  --w3f-divider-color: var(--w3f-primary);
  --w3f-divider-line-bg: var(--w3f-primary);
  --w3f-divider-content-color: var(--w3f-on-surface);
  --w3f-divider-content-gap: var(--w3f-space-3);
  --w3f-divider-content-font-size: var(--w3f-text-sm);
  --w3f-divider-content-font-weight: 500;
  --w3f-divider-line-height: 2px;
  --w3f-divider-pulse-duration: 1.8s;
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-divider-color` | `gray-300` | Color de la linea horizontal/vertical (via `border`) |
| `--w3f-divider-line-bg` | `gray-300` | Color de fondo de las lineas flanqueando el contenido |
| `--w3f-divider-content-color` | `gray-600` | Color del texto intercalado |
| `--w3f-divider-content-gap` | `space-3` | Separacion entre texto y lineas |
| `--w3f-divider-content-font-size` | `text-sm` | Tamano de fuente del contenido |
| `--w3f-divider-content-font-weight` | `500` | Peso de fuente del contenido |
| `--w3f-divider-line-height` | `2px` | Grosor de las lineas flanqueando el contenido |
| `--w3f-divider-pulse-duration` | `1.8s` | Duracion de la animacion en modo `animated` |

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `type` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientacion del separador |
| `variant` | `'solid' \| 'dashed' \| 'dotted' \| 'gradient'` | `'solid'` | Estilo de la linea |
| `thickness` | `string` | `'1px'` | Grosor de la linea (cualquier valor CSS) |
| `spacing` | `string` | `'16px'` | Margen vertical (horizontal) o horizontal (vertical) |
| `height` | `string` | `'50px'` | Alto del separador vertical |
| `color` | `string \| null` | `null` | Color custom de la linea (CSS color o var) |
| `gradient` | `DividerGradient \| null` | `null` | Objeto `{ from, to, direction? }` para gradiente |
| `animated` | `boolean` | `false` | Activa animacion de pulso en la linea |
| `children` | `ReactNode` | `null` | Texto o JSX intercalado (solo horizontal) |
| `contentPosition` | `'left' \| 'center' \| 'right'` | `'center'` | Posicion del contenido respecto a las lineas |
| `contentStyle` | `React.CSSProperties` | `{}` | Estilos inline adicionales para el contenedor del texto |
| `className` | `string` | `''` | Clases CSS adicionales |
| `style` | `React.CSSProperties` | `{}` | Estilos inline adicionales para el elemento raiz |
| `...props` | `HTMLAttributes` | — | Atributos HTML pasados al elemento raiz |

### Tipo DividerGradient

```ts
interface DividerGradient {
  from: string;        // Color inicial (hex, rgb, var)
  to: string;          // Color final
  direction?: string;  // Default: 'to right'
}
```

## API

### Entrada de datos

El componente Dividers es **display-only**. No gestiona estado ni acepta datos funcionales. Todas sus entradas son configuracion visual:

| Via | Prop | Descripcion |
|---|---|---|
| Tipo | `type` | Orientacion — determina el elemento HTML renderizado (`<hr>` o `<span>`) |
| Estilo linea | `variant` | Solida, discontinua, punteada o gradiente |
| Dimensiones | `thickness`, `spacing`, `height` | Valores CSS en string, max flexibilidad |
| Color | `color`, `gradient` | Color directo o gradiente definido via objeto |
| Contenido | `children`, `contentPosition` | Texto/JSX intercalado en la linea (solo horizontal) |

### Salida de datos

El componente Dividers **no emite eventos ni callbacks**. Es un separador visual puro. No existe ningun callback propio.

### Comunicacion con otros componentes

El componente Dividers es **completamente independiente**. No consume ni produce ningun Context.

Uso tipico como separador entre secciones de demo o entre grupos de controles:

```tsx
<Section title="Sombras">
  <Panel card round>
    <Text element="h6" customClasses="w3f-font-semibold w3f-mb-3">Shadow sm</Text>
    {/* contenido */}
    <Dividers />
    <Text element="h6" customClasses="w3f-font-semibold w3f-mb-3">Shadow md</Text>
    {/* contenido */}
  </Panel>
</Section>
```

### Elemento HTML renderizado

| Condicion | Elemento | Clase base |
|---|---|---|
| `type="horizontal"` sin children | `<hr>` | `w3f-dividers w3f-dividers-horizontal` |
| `type="vertical"` | `<span>` | `w3f-dividers w3f-dividers-vertical` |
| `type="horizontal"` con children | `<div>` | `w3f-dividers-with-content` |

### Accesibilidad

| Elemento | Atributo | Valor |
|---|---|---|
| `<hr>` (horizontal) | rol implicito | `separator` — anunciado por lectores de pantalla |
| `<span>` (vertical) | `role` | `"separator"` |
| `<span>` (vertical) | `aria-orientation` | `"vertical"` |
| `<div>` (con contenido) | — | El contenido de texto es leido naturalmente |

### Patron de uso recomendado

```tsx
// 1. Separador simple entre bloques
<Dividers />

// 2. Separador con label de seccion
<Dividers contentPosition="center">Configuracion avanzada</Dividers>

// 3. Separador en navbar inline
<nav className="w3f-flex w3f-items-center">
  <a>Inicio</a>
  <Dividers type="vertical" height="16px" />
  <a>Nosotros</a>
  <Dividers type="vertical" height="16px" />
  <a>Contacto</a>
</nav>

// 4. Separador decorativo con gradiente
<Dividers
  variant="gradient"
  gradient={{ from: '#6366f1', to: '#ec4899' }}
  thickness="3px"
  spacing="32px"
/>

// 5. Separador con CSS vars custom
<Dividers className="mi-divider-brand" thickness="2px" />
```

## Estructura de archivos

```
Dividers/
  Dividers.tsx            Componente principal
  Dividers.types.ts       Interfaces TypeScript
  Dividers.utils.ts       buildDynamicStyles(), buildLineBackgroundColor()
  README.md               Esta documentacion
```

CSS: `src/w3fussion/DATADISPLAY/_divider.css`
