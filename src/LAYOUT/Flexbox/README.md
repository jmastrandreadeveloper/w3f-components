# Flexbox

Conjunto de componentes para layouts flex: `FlexContainer` configura el contenedor flex y `FlexItem` controla el comportamiento de cada hijo. Incluye `FlexBoxItem` como variante visual con fondo de color.

## Importacion

```tsx
import { FlexContainer, FlexItem, FlexBoxItem } from '@/components/LAYOUT/Flexbox/Flexbox';
```

## Uso basico

```tsx
<FlexContainer gap="1rem">
  <FlexItem>Elemento 1</FlexItem>
  <FlexItem>Elemento 2</FlexItem>
  <FlexItem>Elemento 3</FlexItem>
</FlexContainer>
```

## Direccion

```tsx
<FlexContainer direction="row" gap="0.5rem">...</FlexContainer>
<FlexContainer direction="row-reverse" gap="0.5rem">...</FlexContainer>
<FlexContainer direction="column" gap="0.5rem">...</FlexContainer>
<FlexContainer direction="column-reverse" gap="0.5rem">...</FlexContainer>
```

## Justify Content

```tsx
<FlexContainer justifyContent="start" gap="0.5rem">...</FlexContainer>
<FlexContainer justifyContent="center" gap="0.5rem">...</FlexContainer>
<FlexContainer justifyContent="end" gap="0.5rem">...</FlexContainer>
<FlexContainer justifyContent="between" gap="0.5rem">...</FlexContainer>
<FlexContainer justifyContent="around" gap="0.5rem">...</FlexContainer>
<FlexContainer justifyContent="evenly" gap="0.5rem">...</FlexContainer>
```

## Align Items

```tsx
<FlexContainer alignItems="start" style={{ minHeight: '120px' }}>...</FlexContainer>
<FlexContainer alignItems="center" style={{ minHeight: '120px' }}>...</FlexContainer>
<FlexContainer alignItems="end" style={{ minHeight: '120px' }}>...</FlexContainer>
<FlexContainer alignItems="stretch" style={{ minHeight: '120px' }}>...</FlexContainer>
<FlexContainer alignItems="baseline" style={{ minHeight: '120px' }}>...</FlexContainer>
```

## Flex Wrap

```tsx
<FlexContainer wrap="wrap" gap="0.5rem">
  {items.map((item, i) => <div key={i}>{item}</div>)}
</FlexContainer>

<FlexContainer wrap="nowrap" gap="0.5rem">...</FlexContainer>
<FlexContainer wrap="wrap-reverse" gap="0.5rem">...</FlexContainer>
```

## FlexItem — grow, shrink, order

```tsx
{/* grow — el item del medio ocupa el espacio disponible */}
<FlexContainer gap="0.5rem">
  <FlexItem><div>Fijo</div></FlexItem>
  <FlexItem grow><div>Crece</div></FlexItem>
  <FlexItem><div>Fijo</div></FlexItem>
</FlexContainer>

{/* order — reordenamiento visual */}
<FlexContainer gap="0.5rem">
  <FlexItem order="last"><div>1 en DOM (va al final)</div></FlexItem>
  <FlexItem><div>2 en DOM</div></FlexItem>
  <FlexItem order="first"><div>3 en DOM (va al inicio)</div></FlexItem>
</FlexContainer>

{/* mlAuto — empuja el item hacia la derecha */}
<FlexContainer gap="0.5rem">
  <FlexItem><div>Izquierda</div></FlexItem>
  <FlexItem mlAuto><div>Derecha (auto margin)</div></FlexItem>
</FlexContainer>
```

## Flex Inline

```tsx
<FlexContainer inline gap="0.5rem">
  <span>A</span>
  <span>B</span>
</FlexContainer>
```

## FlexBoxItem (visual)

Variante visual de FlexItem con fondo de color, padding predefinido y shadow:

```tsx
<FlexContainer gap="1rem">
  <FlexBoxItem bgColor="#3b82f6">Azul</FlexBoxItem>
  <FlexBoxItem bgColor="#22c55e">Verde</FlexBoxItem>
  <FlexBoxItem bgColor="#f59e0b">Ambar</FlexBoxItem>
</FlexContainer>
```

## Props — FlexContainer

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | — | Contenido del contenedor |
| `direction` | `FlexDirection` | `'row'` | Direccion del eje principal |
| `wrap` | `FlexWrap` | `false` | Comportamiento de wrap |
| `justifyContent` | `FlexJustify` | `'start'` | Alineacion en eje principal |
| `alignItems` | `FlexAlign` | `'stretch'` | Alineacion en eje transversal |
| `alignContent` | `FlexAlignContent` | `'stretch'` | Alineacion de multiples lineas |
| `gap` | `string \| number` | — | Separacion entre items |
| `rowGap` | `string \| number` | — | Separacion entre filas |
| `columnGap` | `string \| number` | — | Separacion entre columnas |
| `width` | `string` | — | Anchura del contenedor |
| `height` | `string` | — | Altura del contenedor |
| `padding` | `string` | — | Padding del contenedor |
| `margin` | `string` | — | Margin del contenedor |
| `inline` | `boolean` | `false` | `display: inline-flex` |
| `className` | `string` | `''` | Clases CSS adicionales |
| `style` | `CSSProperties` | `{}` | Estilos inline adicionales |

## Props — FlexItem

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | — | Contenido del item |
| `grow` | `number \| boolean` | — | `flex-grow`: `true`/`1` usa clase, numero usa style |
| `shrink` | `number \| boolean` | — | `flex-shrink`: `true`/`1` usa clase, numero usa style |
| `order` | `number \| string` | — | Orden visual: `'first'`, `'last'`, 0–3 (clase) o numero (style) |
| `mlAuto` | `boolean` | `false` | `margin-left: auto` |
| `mrAuto` | `boolean` | `false` | `margin-right: auto` |
| `basis` | `string` | — | `flex-basis` (ej. `'200px'`, `'30%'`) |
| `alignSelf` | `FlexAlignSelf` | — | Alineacion individual en eje transversal |
| `className` | `string` | `''` | Clases CSS adicionales |
| `style` | `CSSProperties` | `{}` | Estilos inline adicionales |

## Props — FlexBoxItem

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| Todas de `FlexItem` | — | — | Hereda FlexItem excepto `style` |
| `bgColor` | `string` | `'#6366f1'` | Color de fondo de la caja |
| `style` | `CSSProperties` | — | Estilos inline adicionales |

## API

### Tipos disponibles

| Tipo | Valores |
|---|---|
| `FlexDirection` | `'row'` \| `'row-reverse'` \| `'column'` \| `'column-reverse'` |
| `FlexWrap` | `boolean` \| `'wrap'` \| `'nowrap'` \| `'wrap-reverse'` |
| `FlexJustify` | `'start'` \| `'end'` \| `'center'` \| `'between'` \| `'around'` \| `'evenly'` \| `string` |
| `FlexAlign` | `'start'` \| `'end'` \| `'center'` \| `'baseline'` \| `'stretch'` \| `string` |
| `FlexAlignSelf` | `'auto'` \| `'flex-start'` \| `'flex-end'` \| `'center'` \| `'baseline'` \| `'stretch'` |

### Patron de uso recomendado

```tsx
// 1. Barra de navegacion
<FlexContainer justifyContent="between" alignItems="center" padding="0 1rem">
  <Logo />
  <FlexContainer gap="1rem">
    <NavLink>Inicio</NavLink>
    <NavLink>Sobre nosotros</NavLink>
  </FlexContainer>
  <FlexItem mlAuto>
    <Button>Login</Button>
  </FlexItem>
</FlexContainer>

// 2. Tarjeta con acciones alineadas al fondo
<FlexContainer direction="column" style={{ height: '100%' }}>
  <FlexItem grow><p>Contenido de la tarjeta</p></FlexItem>
  <FlexContainer justifyContent="end" gap="0.5rem">
    <Button variant="text">Cancelar</Button>
    <Button variant="filled">Confirmar</Button>
  </FlexContainer>
</FlexContainer>

// 3. Lista de chips con wrap
<FlexContainer wrap="wrap" gap="0.5rem">
  {tags.map(tag => <Chip key={tag}>{tag}</Chip>)}
</FlexContainer>
```

## Estructura de archivos

```
Flexbox/
  Flexbox.tsx            FlexContainer + FlexItem + FlexBoxItem
  Flexbox.types.ts       Interfaces TypeScript
  Flexbox.constants.ts   CSS class tokens y defaults
  Flexbox.utils.ts       buildFlexContainerClassNames(), buildFlexItemClassNames(), etc.
  README.md              Esta documentacion
```

CSS: clases `w3f-flex-*` en `src/w3fussion/LAYOUT/_flexbox.css`
