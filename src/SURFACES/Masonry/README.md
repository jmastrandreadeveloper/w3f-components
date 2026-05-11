# Masonry

Contenedor de layout escalonado con tres algoritmos: `column` (CSS column-count, estilo Pinterest), `flex` (flexbox wrap con anchos por tamano), y `grid` (CSS Grid auto-fit con spans). Incluye `MasonryItem` para contenido libre y `MasonryCard` para tarjetas con encabezado degradado opcional.

## Importacion

```tsx
import { Masonry, MasonryCard, MasonryItem } from '@/components/SURFACES/Masonry/Masonry';
```

## Uso basico

### Variante column (default)

Layout tipo Pinterest con CSS column-count. Columnas responsivas por breakpoint:

```tsx
<Masonry variant="column" columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} gap="16px">
  <MasonryCard title="Card 1" gradient="linear-gradient(135deg, #667eea, #764ba2)" hover>
    <p>Contenido de longitud variable.</p>
  </MasonryCard>
  <MasonryCard title="Card 2" gradient="linear-gradient(135deg, #f093fb, #f5576c)" hover>
    <p>Otro contenido.</p>
  </MasonryCard>
</Masonry>
```

### Variante flex

Flexbox wrap con anchos basados en `size`. Usa `baseColumnWidth` como ancho base:

```tsx
<Masonry variant="flex" baseColumnWidth="280px" gap="12px">
  <MasonryCard title="Small" size="small" hover>...</MasonryCard>
  <MasonryCard title="Medium" size="medium" hover>...</MasonryCard>
  <MasonryCard title="Large" size="large" hover>...</MasonryCard>
  <MasonryCard title="Full" size="full" hover>...</MasonryCard>
</Masonry>
```

### Variante grid

CSS Grid auto-fit. `minCardWidth` controla el minimo para auto-fit; `gridColumns` fija columnas explicitas:

```tsx
<Masonry variant="grid" minCardWidth="200px" gap="12px">
  <MasonryCard title="Span 1" size="small" hover>...</MasonryCard>
  <MasonryCard title="Span 2" size="medium" hover>...</MasonryCard>
  <MasonryCard title="Span 3" size="large" hover>...</MasonryCard>
</Masonry>
```

## MasonryItem

Wrapper de contenido libre con break-inside: avoid (column) o ancho por size (flex/grid):

```tsx
<Masonry variant="column" columns={{ xs: 1, sm: 2, md: 3 }} gap="16px">
  <MasonryItem>
    <div style={{ background: '#fef3c7', padding: '16px' }}>
      <strong>Nota personalizada</strong>
      <p>Cualquier JSX como contenido.</p>
    </div>
  </MasonryItem>
</Masonry>
```

## MasonryCard con encabezado degradado

```tsx
<MasonryCard
  title="Mi Card"
  gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  headerHeight="80px"
  hover
  onClick={(e) => console.log('clicked', e)}
>
  <p>Cuerpo de la tarjeta.</p>
</MasonryCard>
```

## Integracion con formularios

`MasonryCard` acepta `name` y `value` que renderizan un `<input type="hidden">` para envio con formularios HTML nativos:

```tsx
<form onSubmit={handleSubmit}>
  <Masonry variant="grid" minCardWidth="180px">
    <MasonryCard title="Opcion A" name="selection" value="a" hover onClick={...}>
      <p>Descripcion de la opcion A.</p>
    </MasonryCard>
    <MasonryCard title="Opcion B" name="selection" value="b" hover onClick={...}>
      <p>Descripcion de la opcion B.</p>
    </MasonryCard>
  </Masonry>
</form>
```

## CSS Custom Properties

```css
.mi-masonry-custom {
  --w3f-msn-gap: 1.5rem;
  --w3f-msn-base: 300px;
  --w3f-msn-card-bg: #f8fafc;
  --w3f-msn-card-radius: 12px;
  --w3f-msn-card-shadow-hover: 0 8px 24px rgba(0,0,0,0.15);
  --w3f-msn-card-title-font-size: 1.125rem;
  --w3f-msn-card-title-color: #1e293b;
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-msn-gap` | `1rem` | Separacion entre items |
| `--w3f-msn-base` | `280px` | Ancho base de columna (flex/grid) |
| `--w3f-msn-cols-xs` | `1` | Columnas en breakpoint xs |
| `--w3f-msn-cols-sm` | `2` | Columnas en breakpoint sm (>=640px) |
| `--w3f-msn-cols-md` | `3` | Columnas en breakpoint md (>=768px) |
| `--w3f-msn-cols-lg` | `4` | Columnas en breakpoint lg (>=1024px) |
| `--w3f-msn-cols-xl` | igual que lg | Columnas en breakpoint xl (>=1280px) |
| `--w3f-msn-card-bg` | `surface` | Fondo de las tarjetas |
| `--w3f-msn-card-border` | `outline-variant` | Borde de las tarjetas |
| `--w3f-msn-card-radius` | `radius-lg` | Border radius de tarjetas |
| `--w3f-msn-card-shadow-hover` | `shadow-lg` | Sombra en hover |
| `--w3f-msn-card-transition` | `transition-normal` | Duracion de transicion |
| `--w3f-msn-card-body-pad` | `space-4` | Padding del cuerpo de tarjeta |
| `--w3f-msn-card-body-gap` | `space-3` | Gap interno del cuerpo |
| `--w3f-msn-card-title-font-size` | `text-lg` | Tamano del titulo |
| `--w3f-msn-card-title-font-weight` | `700` | Peso del titulo |
| `--w3f-msn-card-title-color` | `on-surface` | Color del titulo |
| `--w3f-msn-focus-color` | `primary` | Color de outline en foco |

## Props

### Masonry

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `variant` | `'column' \| 'flex' \| 'grid'` | `'column'` | Algoritmo de layout |
| `columns` | `MasonryBreakpoints` | — | Numero de columnas por breakpoint (solo `column`) |
| `baseColumnWidth` | `string` | — | Ancho base de item (solo `flex`, ej. `'280px'`) |
| `minCardWidth` | `string` | — | Ancho minimo para auto-fit (solo `grid`, ej. `'280px'`) |
| `gridColumns` | `number` | — | Columnas explicitas (solo `grid`, sobreescribe auto-fit) |
| `gap` | `string` | — | Separacion entre items |
| `padding` | `string` | — | Padding del contenedor |
| `children` | `ReactNode` | — | Items del masonry |
| `className` | `string` | — | Clases CSS adicionales |
| `style` | `CSSProperties` | — | Estilos inline adicionales |

### MasonryItem

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `size` | `'small' \| 'medium' \| 'large' \| 'full'` | `'medium'` | Hint de ancho (flex/grid) |
| `children` | `ReactNode` | — | Contenido libre |
| `className` | `string` | — | Clases CSS adicionales |
| `style` | `CSSProperties` | — | Estilos inline adicionales |

### MasonryCard

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `title` | `string` | — | Encabezado de la tarjeta |
| `gradient` | `string` | — | CSS gradient string para la franja visual superior |
| `headerHeight` | `string` | — | Alto de la franja de encabezado |
| `hover` | `boolean` | `false` | Efecto lift + sombra al pasar el cursor |
| `size` | `'small' \| 'medium' \| 'large' \| 'full'` | `'medium'` | Hint de ancho (flex/grid) |
| `name` | `string` | — | Nombre para `<input type="hidden">` (integracion form) |
| `value` | `string \| number` | — | Valor para `<input type="hidden">` |
| `onClick` | `(e: MouseEvent<HTMLDivElement>) => void` | — | Handler de clic |
| `children` | `ReactNode` | — | Cuerpo de la tarjeta |
| `className` | `string` | — | Clases CSS adicionales |
| `style` | `CSSProperties` | — | Estilos inline del wrapper de item |

## API

### Contexto interno (MasonryCtx)

`Masonry` provee un contexto interno `MasonryCtx` que comunica la `variant` activa a sus hijos `MasonryItem` y `MasonryCard`. Este contexto es privado (no exportado) y se gestiona automaticamente.

```
Masonry (provider: MasonryCtx = { variant })
  └── MasonryItem / MasonryCard
        └── useContext(MasonryCtx) → aplica clases correctas segun variant
```

### Accesibilidad

| Atributo | Valor | Condicion |
|---|---|---|
| `role` | `"button"` | Cuando `onClick` esta definido en `MasonryCard` |
| `tabIndex` | `0` | Cuando `role="button"` |
| `onKeyDown` | Enter / Space disparan onClick | Cuando `role="button"` |

### Patron de uso recomendado

```tsx
// 1. Feed de blog (column)
<Masonry variant="column" columns={{ xs: 1, sm: 2, md: 3 }}>
  {posts.map(p => (
    <MasonryCard key={p.id} title={p.title} gradient={p.gradient} hover>
      <p>{p.excerpt}</p>
    </MasonryCard>
  ))}
</Masonry>

// 2. Galeria de tarjetas con anchos variables (flex)
<Masonry variant="flex" baseColumnWidth="240px" gap="12px">
  <MasonryCard size="full" title="Destacado" gradient={featured.gradient} hover>
    {featured.content}
  </MasonryCard>
  {rest.map(item => (
    <MasonryCard key={item.id} size="medium" title={item.title} hover>
      {item.content}
    </MasonryCard>
  ))}
</Masonry>

// 3. Dashboard grid (grid)
<Masonry variant="grid" gridColumns={3} gap="16px">
  <MasonryItem size="large">
    <ChartWidget />
  </MasonryItem>
  <MasonryItem size="small">
    <StatCard value="42%" />
  </MasonryItem>
</Masonry>
```

## Estructura de archivos

```
Masonry/
  Masonry.tsx            Masonry + MasonryItem + MasonryCard
  Masonry.types.ts       Interfaces TypeScript
  Masonry.constants.ts   Clases CSS y defaults
  Masonry.utils.ts       buildMasonryRootClasses(), buildMasonryRootStyle(), etc.
  Masonry.hooks.ts       (no usado actualmente)
  README.md              Esta documentacion
```

CSS: `src/w3fussion/SURFACES/_masonry.css`
