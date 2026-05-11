# Text

Componente de texto poliformico (polymorphic). Renderiza cualquier elemento HTML de texto (`p`, `h1`–`h6`, `span`, `div`, etc.) con soporte para alineacion, espaciado de linea, direccion RTL y modos de escritura vertical.

## Importacion

```tsx
import Text from '@/components/DATADISPLAY/Text/Text';
```

## Uso basico

### Parrafo simple

```tsx
<Text element="p">Contenido del parrafo</Text>
```

### Encabezados

```tsx
<Text element="h1">Heading 1</Text>
<Text element="h2">Heading 2</Text>
<Text element="h3">Heading 3</Text>
```

### Con clases de utilidad

```tsx
<Text element="p" customClasses="w3f-text-sm w3f-text-gray-500 w3f-mb-4">
  Texto secundario de apoyo
</Text>
```

## Alineacion

```tsx
<Text element="p" align="left">Left aligned</Text>
<Text element="p" align="center">Center aligned</Text>
<Text element="p" align="right">Right aligned</Text>
<Text element="p" align="justify">Justified text for long paragraphs</Text>
```

## Espaciado de linea (Leading)

```tsx
<Text element="p" leading="tight">Texto con leading ajustado</Text>
<Text element="p" leading="normal">Texto con leading normal</Text>
<Text element="p" leading="relaxed">Texto con leading relajado</Text>
<Text element="p" leading="loose">Texto con leading amplio</Text>
```

Valores disponibles: `none` | `tight` | `snug` | `normal` | `relaxed` | `loose`

## Direccion de texto (RTL / LTR)

```tsx
<Text element="p" direction="ltr">Left-to-right (default)</Text>
<Text element="p" direction="rtl">مرحبا بالعالم — Arabic RTL</Text>
<Text element="p" direction="rtl">שלום עולם — Hebrew RTL</Text>
```

## Modo de escritura vertical

```tsx
<Text element="p" writingMode="vertical-rl" style={{ height: '200px' }}>
  縦書きテキスト — Vertical Japanese
</Text>

<Text element="span" writingMode="vertical-lr" customClasses="w3f-font-semibold w3f-text-primary"
  style={{ letterSpacing: '0.2em', textTransform: 'uppercase', height: '180px' }}>
  Featured
</Text>
```

Valores disponibles: `horizontal-tb` | `vertical-rl` | `vertical-lr` | `sideways-rl` | `sideways-lr`

## Combinacion direction + writingMode

```tsx
<Text element="p" writingMode="vertical-rl" direction="rtl" style={{ height: '180px' }}>
  عمودي من اليمين — Vertical RTL combined
</Text>
```

## Prop content (array legacy)

El prop `content` acepta un nodo o array de nodos como alternativa a `children`:

```tsx
<Text element="p" content="Texto simple" />
<Text element="p" content={['Primer fragmento', ' — ', 'Segundo fragmento']} />
```

Cuando `content` esta definido, tiene prioridad sobre `children`.

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `element` | `React.ElementType` | `'p'` | Elemento HTML a renderizar (p, h1-h6, span, div, etc.) |
| `children` | `ReactNode` | — | Contenido React estandar |
| `content` | `ReactNode \| ReactNode[]` | — | Contenido alternativo via prop (legacy, prioridad sobre children) |
| `customClasses` | `string` | `''` | Clases CSS adicionales del framework o custom |
| `align` | `'left' \| 'center' \| 'right' \| 'justify'` | — | Alineacion del texto |
| `leading` | `'none' \| 'tight' \| 'snug' \| 'normal' \| 'relaxed' \| 'loose'` | — | Espaciado de linea |
| `direction` | `'ltr' \| 'rtl'` | — | Direccion del texto |
| `writingMode` | `'horizontal-tb' \| 'vertical-rl' \| 'vertical-lr' \| 'sideways-rl' \| 'sideways-lr'` | — | Modo de escritura CSS |
| `style` | `React.CSSProperties` | — | Estilos inline adicionales (se fusionan con direction/writingMode) |
| `...props` | `HTMLAttributes` | — | Cualquier atributo HTML del elemento destino |

## API

### Entrada de datos

El componente Text es **display-only** y no gestiona estado propio. Acepta datos por dos vias:

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Children | `children` | `ReactNode` | Contenido React estandar — texto, JSX, fragmentos |
| Array legacy | `content` | `ReactNode \| ReactNode[]` | Array de nodos renderizados con `React.Fragment` indexado. Util para contenido dinamico |

**Resolucion de contenido:**
```
content prop definido  →  se renderiza con React.Fragment por item
content no definido    →  se usa children directamente
```

### Salida de datos

El componente Text **no emite eventos ni callbacks**. Es un contenedor de presentacion puro. No existe `onChange`, `onClick` ni ningun callback propio; si se necesita interactividad, se pasan atributos HTML directamente via spread (`...props`):

```tsx
// Click handler via spread
<Text element="span" onClick={() => seleccionar(id)} customClasses="w3f-cursor-pointer">
  Texto clickeable
</Text>
```

### Comunicacion con otros componentes

El componente Text es **completamente independiente**. No consume ni produce ningun Context. No requiere Provider. Puede usarse en cualquier parte del arbol React sin dependencias externas.

Uso tipico como soporte visual en demos y layouts:

```tsx
// Como caption
<Text element="p" customClasses="w3f-text-xs w3f-text-gray-400 w3f-mt-2">
  Descripcion del elemento
</Text>

// Como label de seccion
<Text element="h6" customClasses="w3f-font-semibold w3f-mb-3">Titulo de bloque</Text>
```

### Accesibilidad

| Comportamiento | Detalle |
|---|---|
| Elemento semantico | El prop `element` permite usar el tag HTML correcto segun jerarquia de contenido (`h1`-`h6` para encabezados, `p` para parrafos, `span` para inline) |
| Direccion RTL | `direction="rtl"` aplica `dir="rtl"` via CSS property `direction`, compatible con lectores de pantalla |
| Spread de atributos | `aria-label`, `role`, `id` y cualquier atributo ARIA se puede pasar directamente |
| Sin elementos focusables | No agrega `tabIndex` ni interactividad por defecto |

### Patron de uso recomendado

```tsx
// 1. Texto de apoyo en secciones de demo
<Text element="p" customClasses="w3f-text-sm w3f-text-gray-500 w3f-mb-4">
  Descripcion de la seccion
</Text>

// 2. Encabezado de bloque con peso custom
<Text element="h6" customClasses="w3f-font-semibold w3f-mb-3">Sub-titulo</Text>

// 3. Label de etiqueta inline
<Text element="span" customClasses="w3f-text-xs w3f-text-gray-400 w3f-text-center">
  small
</Text>

// 4. Parrafo con alineacion y leading
<Text element="p" align="justify" leading="relaxed" customClasses="w3f-text-sm">
  Texto de cuerpo largo con justificacion y espaciado confortable.
</Text>

// 5. Texto RTL
<Text element="p" direction="rtl" customClasses="w3f-text-base">
  نص عربي من اليمين إلى اليسار
</Text>
```

## Clases CSS aplicadas

| Prop | Clase aplicada |
|---|---|
| `align="left"` | `w3f-text-left` |
| `align="center"` | `w3f-text-center` |
| `align="right"` | `w3f-text-right` |
| `align="justify"` | `w3f-text-justify` |
| `leading="none"` | `w3f-leading-none` |
| `leading="tight"` | `w3f-leading-tight` |
| `leading="snug"` | `w3f-leading-snug` |
| `leading="normal"` | `w3f-leading-normal` |
| `leading="relaxed"` | `w3f-leading-relaxed` |
| `leading="loose"` | `w3f-leading-loose` |

`direction` y `writingMode` se aplican como estilos inline fusionados con el prop `style`.

## Estructura de archivos

```
Text/
  Text.tsx            Componente principal (polymorphic)
  Text.types.ts       Interfaces TypeScript
  Text.utils.ts       buildTextClasses(), buildTextDirectionStyle()
  README.md           Esta documentacion
```

No tiene `.hooks.ts` ni `.constants.ts` propios — toda la logica vive en `Text.utils.ts`.
