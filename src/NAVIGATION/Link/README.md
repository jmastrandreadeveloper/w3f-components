# Link

Enlace semantico que renderiza como `<a>` o `<button>` segun el contexto. Soporta 11 variantes tipograficas, 7 colores, tres modos de subrayado, iconos posicionables y estado deshabilitado. No se integra con FormContext.

## Importacion

```tsx
import Link from '@/components/NAVIGATION/Link/Link';
```

## Uso basico

```tsx
<Link href="/inicio">Ir al inicio</Link>
```

## Modos de subrayado

```tsx
<Link href="#" underline="always">Siempre subrayado</Link>
<Link href="#" underline="hover">Subrayado en hover</Link>   {/* default */}
<Link href="#" underline="none">Sin subrayado</Link>
```

## Variantes tipograficas

```tsx
<Link href="#" variant="h1">Heading 1</Link>
<Link href="#" variant="h2">Heading 2</Link>
<Link href="#" variant="h3">Heading 3</Link>
<Link href="#" variant="h4">Heading 4</Link>
<Link href="#" variant="h5">Heading 5</Link>
<Link href="#" variant="h6">Heading 6</Link>
<Link href="#" variant="subtitle1">Subtitle 1</Link>
<Link href="#" variant="subtitle2">Subtitle 2</Link>
<Link href="#" variant="body1">Body 1</Link>
<Link href="#" variant="body2">Body 2</Link>
<Link href="#" variant="caption">Caption</Link>
```

## Colores

```tsx
<Link href="#" color="primary">Primary</Link>    {/* default */}
<Link href="#" color="secondary">Secondary</Link>
<Link href="#" color="success">Success</Link>
<Link href="#" color="warning">Warning</Link>
<Link href="#" color="danger">Danger</Link>
<Link href="#" color="info">Info</Link>
<Link href="#" color="inherit">Inherit</Link>    {/* hereda el color del padre */}
```

## Con iconos

```tsx
import { Globe, ExternalLink, ArrowRight } from 'lucide-react';

<Link href="#" icon={<Globe />} iconPosition="left">Visit Website</Link>
<Link href="#" icon={<ExternalLink />} iconPosition="right" external>External Link</Link>
<Link href="#" icon={<ArrowRight />} iconPosition="right" underline="none" variant="h5">Learn More</Link>
```

## Link externo

`external` agrega `target="_blank" rel="noopener noreferrer"` al elemento `<a>`:

```tsx
<Link href="https://example.com" external>Sitio externo</Link>
```

## Como boton

Cuando no se provee `href` o se especifica `component="button"`, renderiza como `<button>`:

```tsx
<Link onClick={() => doSomething()}>Accion de boton</Link>
<Link component="button" onClick={() => delete()} color="danger">Eliminar</Link>
```

## Estado deshabilitado

```tsx
<Link href="#" disabled>Enlace deshabilitado</Link>
```

## Componente personalizado

Permite usar con routers de terceros (React Router, Next.js):

```tsx
import { Link as RouterLink } from 'react-router-dom';

<Link component={RouterLink} href="/about">About</Link>
```

## CSS Custom Properties

```css
.mi-link-custom {
  --w3f-link-color: #8b5cf6;
  --w3f-link-hover-color: #7c3aed;
  --w3f-link-decoration-color: rgba(139, 92, 246, 0.4);
  --w3f-link-hover-decoration-color: #7c3aed;
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-link-color` | `primary` | Color del enlace |
| `--w3f-link-hover-color` | `primary-700` | Color en hover |
| `--w3f-link-decoration-color` | `rgba(59,130,246,0.4)` | Color del subrayado |
| `--w3f-link-hover-decoration-color` | `primary-700` | Color del subrayado en hover |
| `--w3f-link-gap` | `4px` | Espacio entre icono y texto |
| `--w3f-link-transition` | `150ms ease-out` | Transicion de color |
| `--w3f-link-focus-color` | `primary` | Color del anillo de foco |
| `--w3f-link-disabled-opacity` | `0.45` | Opacidad del estado deshabilitado |

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `href` | `string` | — | URL de destino; determina si renderiza `<a>` |
| `children` | `ReactNode` | — | Contenido del enlace |
| `color` | `LinkColor` | `'primary'` | Esquema de color |
| `underline` | `LinkUnderline` | `'hover'` | Modo de subrayado |
| `variant` | `LinkVariant` | — | Variante tipografica |
| `component` | `ElementType` | — | Reemplaza el elemento raiz (`'a'`, `'button'`, router link) |
| `disabled` | `boolean` | `false` | Deshabilita el enlace |
| `external` | `boolean` | `false` | Agrega `target="_blank" rel="noopener noreferrer"` |
| `icon` | `ReactNode` | — | Icono Lucide u otro |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Posicion del icono |
| `className` | `string` | `''` | Clases CSS adicionales |
| `onClick` | `(e) => void` | — | Handler de clic |

## API

#### Entrada de datos

El componente es puramente presentacional. No consume ningun contexto externo (sin FormContext, sin RouterContext).

| Via | Prop | Descripcion |
|---|---|---|
| URL | `href` | Destino de la navegacion |
| Apariencia | `color`, `variant`, `underline` | Control visual completo via props |
| Comportamiento | `disabled`, `external`, `component` | Modifica el elemento generado |

#### Salida de datos

| Evento | Firma | Descripcion |
|---|---|---|
| `onClick` | `(e: MouseEvent) => void` | Se dispara en clic cuando no esta deshabilitado |

Cuando `disabled` es `true`, `onClick` no se invoca y el atributo `href` se elimina del DOM.

#### Comunicacion con otros componentes

El Link no usa ni expone ningun Context. Puede usarse libremente en cualquier parte del arbol React.

**Seleccion del elemento raiz:**
```
href presente  →  <a href="...">
href ausente   →  <button type="button">
component prop →  <component> (prioridad maxima sobre href)
```

#### Accesibilidad

| Atributo | Elemento | Condicion | Descripcion |
|---|---|---|---|
| `aria-disabled` | `<a>` | `disabled=true` | Informa estado deshabilitado a lectores |
| `target="_blank"` | `<a>` | `external=true` | Abre en nueva pestana |
| `rel="noopener noreferrer"` | `<a>` | `external=true` | Seguridad en links externos |
| `type="button"` | `<button>` | cuando renderiza como boton | Evita submit de formulario |
| `disabled` | `<button>` | `disabled=true` | Atributo HTML nativo |

#### Patron de uso recomendado

```tsx
// 1. Navegacion interna
<Link href="/products">Ver productos</Link>

// 2. Link externo con icono
<Link href="https://docs.example.com" external icon={<ExternalLink size={14} />} iconPosition="right">
  Ver documentacion
</Link>

// 3. Accion destructiva como boton
<Link component="button" onClick={handleDelete} color="danger" underline="hover">
  Eliminar cuenta
</Link>

// 4. Call-to-action prominente
<Link href="/signup" variant="h4" color="primary" underline="none" icon={<ArrowRight />} iconPosition="right">
  Empezar gratis
</Link>

// 5. Dentro de texto de parrafo
<p>
  Lee los <Link href="/terms" variant="body1" underline="always">terminos y condiciones</Link> antes de continuar.
</p>
```

## Estructura de archivos

```
Link/
  Link.tsx          Componente principal
  Link.types.ts     Interfaces TypeScript
  Link.constants.ts Clases CSS y defaults
  Link.utils.ts     buildLinkClasses(), buildExternalProps()
  Link.hooks.ts     useLinkClick
  README.md         Esta documentacion
```

CSS: `src/w3fussion/NAVIGATION/_link.css`
