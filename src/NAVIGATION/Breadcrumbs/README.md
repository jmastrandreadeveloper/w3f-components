# Breadcrumbs

Indicador de jerarquia de navegacion. Renderiza una ruta de migas de pan como lista `<ol>` semantica con separadores, soporte de iconos, collapso automatico de items y expansion con un clic.

## Importacion

```tsx
import Breadcrumbs, { BreadcrumbItem } from '@/components/NAVIGATION/Breadcrumbs/Breadcrumbs';
```

## Uso basico

```tsx
<Breadcrumbs>
  <BreadcrumbItem href="#">Home</BreadcrumbItem>
  <BreadcrumbItem href="#">Products</BreadcrumbItem>
  <BreadcrumbItem href="#">Electronics</BreadcrumbItem>
  <BreadcrumbItem active>Headphones</BreadcrumbItem>
</Breadcrumbs>
```

## Con iconos

```tsx
import { Home, Settings, Users, FileText } from 'lucide-react';

<Breadcrumbs>
  <BreadcrumbItem href="#" icon={<Home />}>Home</BreadcrumbItem>
  <BreadcrumbItem href="#" icon={<Settings />}>Settings</BreadcrumbItem>
  <BreadcrumbItem active icon={<FileText />}>Profile</BreadcrumbItem>
</Breadcrumbs>
```

## Separador personalizado

```tsx
import { Slash } from 'lucide-react';

<Breadcrumbs separator={<Slash size={14} />}>...</Breadcrumbs>

{/* Texto plano */}
<Breadcrumbs separator="/">...</Breadcrumbs>
```

## Tamanos

```tsx
<Breadcrumbs size="sm">...</Breadcrumbs>
<Breadcrumbs size="md">...</Breadcrumbs>  {/* default */}
<Breadcrumbs size="lg">...</Breadcrumbs>
```

## Colores

```tsx
<Breadcrumbs color="primary">...</Breadcrumbs>
<Breadcrumbs color="secondary">...</Breadcrumbs>
<Breadcrumbs color="success">...</Breadcrumbs>
<Breadcrumbs color="warning">...</Breadcrumbs>
<Breadcrumbs color="danger">...</Breadcrumbs>
<Breadcrumbs color="info">...</Breadcrumbs>
<Breadcrumbs color="default">...</Breadcrumbs>  {/* default */}
```

## Collapso automatico

Cuando hay mas items que `maxItems`, se muestra un elipsis en el medio. Clic en `...` expande todos los items:

```tsx
<Breadcrumbs maxItems={4} itemsBeforeCollapse={1} itemsAfterCollapse={2}>
  <BreadcrumbItem href="#" icon={<Home />}>Home</BreadcrumbItem>
  <BreadcrumbItem href="#">Products</BreadcrumbItem>
  <BreadcrumbItem href="#">Electronics</BreadcrumbItem>
  <BreadcrumbItem href="#">Audio</BreadcrumbItem>
  <BreadcrumbItem href="#">Headphones</BreadcrumbItem>
  <BreadcrumbItem active>Sony WH-1000XM5</BreadcrumbItem>
</Breadcrumbs>
{/* Muestra: Home > ... > Headphones > Sony WH-1000XM5 */}
```

## Navegacion por onClick

Los items pueden ser interactivos via `onClick` en lugar de `href`:

```tsx
<BreadcrumbItem onClick={() => navigate('/dashboard')}>Dashboard</BreadcrumbItem>
```

## CSS Custom Properties

```css
.mi-breadcrumb-custom {
  --w3f-bc-item-color: #64748b;
  --w3f-bc-active-color: #8b5cf6;
  --w3f-bc-item-hover-color: #7c3aed;
  --w3f-bc-separator-color: #cbd5e1;
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-bc-item-color` | `gray-500` | Color de los items no activos |
| `--w3f-bc-item-hover-color` | `on-surface` | Color en hover |
| `--w3f-bc-active-color` | `on-surface` | Color del item activo (ultimo) |
| `--w3f-bc-separator-color` | `gray-400` | Color del separador |
| `--w3f-bc-separator-margin` | `0 8px` | Espaciado del separador |
| `--w3f-bc-expand-bg` | `gray-100` | Fondo del boton de expansion |
| `--w3f-bc-expand-hover-bg` | `gray-200` | Fondo hover del boton de expansion |
| `--w3f-bc-expand-color` | `gray-500` | Color del icono de expansion |
| `--w3f-bc-expand-hover-color` | `on-surface` | Color hover del boton de expansion |
| `--w3f-bc-focus-color` | `primary` | Color del anillo de foco |
| `--w3f-bc-transition` | `150ms ease-out` | Transicion de hover |
| `--w3f-bc-disabled-opacity` | `0.45` | Opacidad del item deshabilitado |

## Props

### Breadcrumbs

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | — | `BreadcrumbItem` elements |
| `separator` | `ReactNode` | `<ChevronRight size={14} />` | Separador entre items |
| `maxItems` | `number` | `8` | Maximo de items antes de collapsarse |
| `itemsBeforeCollapse` | `number` | `1` | Items visibles antes del elipsis |
| `itemsAfterCollapse` | `number` | `1` | Items visibles despues del elipsis |
| `expandText` | `string` | `'Show path'` | Aria-label del boton de expansion |
| `color` | `BreadcrumbColor` | `'default'` | Esquema de color |
| `size` | `BreadcrumbSize` | `'md'` | Tamano del texto |
| `className` | `string` | `''` | Clases CSS adicionales |

### BreadcrumbItem

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `href` | `string` | — | URL de navegacion; renderiza `<a>` |
| `icon` | `ReactNode` | — | Icono antes del texto |
| `children` | `ReactNode` | — | Texto del item |
| `active` | `boolean` | `false` | Marca como item actual (no navegable); renderiza `<span>` con `aria-current="page"` |
| `disabled` | `boolean` | `false` | Deshabilita el click y la navegacion |
| `onClick` | `(e) => void` | — | Callback de navegacion por SPA |
| `className` | `string` | `''` | Clases CSS adicionales |

## API

#### Entrada de datos

El componente es de **solo presentacion**: todos los datos vienen de props. No conecta con Form/LiveForm ni con ningun contexto externo.

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Items | `children` | `ReactNode` | Lista de `BreadcrumbItem` elements |
| Separador | `separator` | `ReactNode` | Elemento entre items |
| Collapso | `maxItems` | `number` | Controla cuando se colapsa la ruta |

#### Salida de datos

| Evento | Origen | Firma | Descripcion |
|---|---|---|---|
| Click de item | `BreadcrumbItem` | `onClick(e: MouseEvent) => void` | Navegacion SPA o accion personalizada |

Los items con `href` generan un `<a>` estandar; los items con `onClick` pero sin `href` generan un `<a href="#">` con el handler. Los items `active` o sin ninguno de los dos renderizan un `<span>` no interactivo.

#### Comunicacion con otros componentes

`Breadcrumbs` no usa Context ni Provider. La comunicacion es exclusivamente via props del padre hacia el hijo. El collapso es estado local interno (`useBreadcrumbsExpand`).

```
Breadcrumbs
  ├── computeVisibleItems() → items visibles
  ├── si item === ELLIPSIS_KEY → renderiza boton de expansion
  └── BreadcrumbItem
        ├── active → <span aria-current="page">
        ├── href o onClick → <a>
        └── ninguno → <span>
```

#### Accesibilidad

| Atributo | Elemento | Valor | Descripcion |
|---|---|---|---|
| `aria-label` | `<nav>` | `"breadcrumb"` | Identifica la region de navegacion |
| `aria-current` | `<span>` activo | `"page"` | Indica la pagina actual |
| `aria-hidden` | separadores | `"true"` | Oculta los separadores a lectores de pantalla |
| `aria-label` | boton elipsis | `expandText` | Describe la accion de expansion |

#### Patron de uso recomendado

```tsx
// 1. Navegacion estatica con links reales
<Breadcrumbs>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
  <BreadcrumbItem active>Widget Pro</BreadcrumbItem>
</Breadcrumbs>

// 2. Navegacion SPA con router
<Breadcrumbs>
  <BreadcrumbItem onClick={() => router.push('/')}>Home</BreadcrumbItem>
  <BreadcrumbItem onClick={() => router.push('/docs')}>Docs</BreadcrumbItem>
  <BreadcrumbItem active>API</BreadcrumbItem>
</Breadcrumbs>

// 3. Ruta larga con collapso
<Breadcrumbs maxItems={4} itemsBeforeCollapse={1} itemsAfterCollapse={2}>
  {segments.map((seg, i) => (
    <BreadcrumbItem
      key={seg.path}
      href={seg.path}
      active={i === segments.length - 1}
    >
      {seg.label}
    </BreadcrumbItem>
  ))}
</Breadcrumbs>
```

## Estructura de archivos

```
Breadcrumbs/
  Breadcrumbs.tsx          Componente principal + BreadcrumbItem
  Breadcrumbs.types.ts     Interfaces TypeScript
  Breadcrumbs.constants.ts Clases CSS y defaults
  Breadcrumbs.utils.ts     buildBreadcrumbsClasses(), computeVisibleItems()
  Breadcrumbs.hooks.ts     useBreadcrumbsExpand
  README.md                Esta documentacion
```

CSS: `src/w3fussion/NAVIGATION/_breadcrumbs.css`
