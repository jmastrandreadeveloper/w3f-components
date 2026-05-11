# Badge

Componente de etiqueta pequeña para mostrar contadores, estados o texto descriptivo sobre otros elementos UI. Puede usarse de forma independiente o anclado sobre cualquier elemento mediante `BadgeWrapper`.

## Importacion

```tsx
import Badge from '@/components/DATADISPLAY/Badge/Badge';
import BadgeWrapper from '@/components/DATADISPLAY/Badge/BadgeWrapper';
```

## Uso basico

### Badge independiente

```tsx
<Badge>4</Badge>
<Badge color="primary">12</Badge>
<Badge color="success">New</Badge>
<Badge color="danger">99+</Badge>
```

### Sobre un elemento con BadgeWrapper

```tsx
import { Bell } from 'lucide-react';

<BadgeWrapper badgeContent="3" badgeProps={{ color: 'danger' }}>
  <Bell size={24} />
</BadgeWrapper>
```

## Variantes

Cuatro variantes de estilo:

```tsx
<Badge variant="solid">Solid</Badge>    {/* fondo solido (default) */}
<Badge variant="outline">Outline</Badge> {/* borde sin fondo */}
<Badge variant="soft">Soft</Badge>       {/* fondo tenue */}
<Badge variant="dot" />                  {/* punto sin contenido */}
```

## Colores

```tsx
<Badge color="primary">primary</Badge>
<Badge color="secondary">secondary</Badge>
<Badge color="success">success</Badge>
<Badge color="warning">warning</Badge>
<Badge color="danger">danger</Badge>
<Badge color="info">info</Badge>
<Badge color="gray">gray</Badge>
```

## Tamanos

```tsx
<Badge size="sm">sm</Badge>   {/* pequeño */}
<Badge size="md">md</Badge>   {/* mediano (default) */}
<Badge size="lg">lg</Badge>   {/* grande */}
```

## Posicion en BadgeWrapper

La posicion del badge relativa al elemento contenedor:

```tsx
<BadgeWrapper badgeContent="3" badgeProps={{ color: 'danger', position: 'top-right' }}>
  <Avatar src="/foto.jpg" />
</BadgeWrapper>

<BadgeWrapper badgeContent="5" badgeProps={{ color: 'primary', position: 'top-left' }}>
  <Avatar src="/foto.jpg" />
</BadgeWrapper>

<BadgeWrapper badgeContent="7" badgeProps={{ color: 'success', position: 'bottom-right' }}>
  <Avatar src="/foto.jpg" />
</BadgeWrapper>
```

Posiciones disponibles: `top-right` | `top-left` | `top-center` | `bottom-right` | `bottom-left` | `bottom-center` | `middle-right` | `middle-left`

## Limite de conteo (max)

Cuando el contenido numerico supera `max`, se muestra `{max}+`:

```tsx
<BadgeWrapper badgeContent="150" badgeProps={{ color: 'danger', max: 99 }}>
  <Bell size={24} />
</BadgeWrapper>
{/* muestra "99+" */}
```

## Variante dot

Punto de estado sin contenido, util para notificaciones o indicadores de presencia:

```tsx
<BadgeWrapper badgeProps={{ variant: 'dot', color: 'success' }}>
  <Bell size={24} />
</BadgeWrapper>
```

## Visibilidad controlada

El prop `invisible` oculta el badge sin desmontar el componente:

```tsx
const [showBadge, setShowBadge] = useState(true);

<BadgeWrapper badgeContent="5" badgeProps={{ color: 'danger', invisible: !showBadge }}>
  <Avatar src="/foto.jpg" />
</BadgeWrapper>
```

## Animaciones

```tsx
{/* Pulso continuo */}
<Badge color="danger" pulse>3</Badge>

{/* Animacion de entrada bounce */}
<Badge color="primary" animate>New</Badge>
```

## Modo unstyled

Elimina todos los estilos visuales para componer apariencia via trait classes:

```tsx
<Badge unstyled className="mi-badge-custom">42</Badge>
```

## CSS Custom Properties

El badge es 100% configurable via CSS custom properties:

```css
.mi-badge-custom {
  --w3f-badge-bg: linear-gradient(135deg, #f472b6, #a78bfa);
  --w3f-badge-color: #fff;
  --w3f-badge-radius: var(--w3f-radius-full);
  --w3f-badge-font-weight: 700;
  --w3f-badge-shadow: 0 2px 8px rgba(244, 114, 182, 0.4);
  --w3f-badge-border-width: 0;
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-badge-bg` | per color class | Color o gradiente de fondo |
| `--w3f-badge-color` | `on-primary` | Color del texto |
| `--w3f-badge-radius` | `radius-full` | Border radius |
| `--w3f-badge-font-size` | per size class | Tamano del texto |
| `--w3f-badge-font-weight` | `600` | Peso del texto |
| `--w3f-badge-line-height` | `1` | Altura de linea |
| `--w3f-badge-px` | per size class | Padding horizontal |
| `--w3f-badge-py` | per size class | Padding vertical |
| `--w3f-badge-min-width` | per size class | Ancho minimo |
| `--w3f-badge-height` | per size class | Alto |
| `--w3f-badge-border-width` | `0` | Ancho del borde |
| `--w3f-badge-border-color` | `transparent` | Color del borde |
| `--w3f-badge-shadow` | `none` | Box shadow |
| `--w3f-badge-transition` | `all fast` | Transicion CSS |
| `--w3f-badge-offset` | `-space-1` | Offset de posicion relativa |
| `--w3f-badge-dot-size` | `0.625rem` | Tamano del punto (variant dot) |
| `--w3f-badge-dot-bg` | igual a badge-bg | Color del punto |
| `--w3f-badge-dot-border-width` | `2px` | Ancho del borde del punto |
| `--w3f-badge-dot-border-color` | `surface` | Color del borde del punto |
| `--w3f-badge-outline-bg` | `transparent` | Fondo en variant outline |
| `--w3f-badge-outline-border-width` | `2px` | Borde en variant outline |
| `--w3f-badge-outline-border-color` | `currentColor` | Color del borde outline |
| `--w3f-badge-outline-color` | per color | Color del texto outline |
| `--w3f-badge-soft-bg` | per color-100 | Fondo en variant soft |
| `--w3f-badge-soft-color` | per color-700 | Texto en variant soft |
| `--w3f-badge-pulse-duration` | `2s` | Duracion animacion pulse |
| `--w3f-badge-animate-duration` | `0.5s` | Duracion animacion bounce-in |

## Props

### Badge

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | — | Contenido del badge (texto, numero, etc.) |
| `color` | `BadgeColor` | `'primary'` | Color semantico |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamano |
| `variant` | `'solid' \| 'outline' \| 'soft' \| 'dot'` | `'solid'` | Estilo visual |
| `position` | `BadgePosition \| null` | `null` | Posicion absoluta sobre el elemento padre |
| `max` | `number` | `99` | Limite del conteo numerico |
| `invisible` | `boolean` | `false` | Oculta el badge (retorna null) |
| `pulse` | `boolean` | `false` | Animacion de pulso continuo |
| `animate` | `boolean` | `false` | Animacion bounce de entrada |
| `unstyled` | `boolean` | `false` | Elimina estilos visuales |
| `ariaLabel` | `string` | `''` | Etiqueta aria personalizada |
| `className` | `string` | `''` | Clases CSS adicionales |

### BadgeWrapper

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | — | Elemento sobre el que se superpone el badge |
| `badgeContent` | `ReactNode` | — | Contenido del badge (texto o numero) |
| `badgeProps` | `Omit<BadgeProps, 'children'> & { showZero?: boolean }` | `{}` | Props pasadas al Badge interno |
| `overlap` | `boolean` | `true` | Si true, el badge se posiciona en `top-right` por defecto |
| `className` | `string` | `''` | Clases CSS adicionales del wrapper |
| `style` | `CSSProperties` | `{}` | Estilos en linea del wrapper |

## API

### Entrada de datos

Badge es un componente de **display puro**. No tiene estado interno propio (excepto el procesamiento del conteo). Toda la informacion le llega exclusivamente por props:

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Contenido | `children` | `ReactNode` | Texto, numero o cualquier ReactNode a mostrar |
| Contenido externo | `badgeContent` (en BadgeWrapper) | `ReactNode` | El BadgeWrapper pasa este valor como `children` al Badge |
| Visibilidad | `invisible` | `boolean` | Determina si el badge se renderiza o retorna null |
| Limite | `max` | `number` | Si `children` es un numero mayor a `max`, muestra `{max}+` |

### Salida de datos

Badge **no emite ningun callback**. No tiene `onChange`, `onClick` ni ninguna funcion de salida. Es un componente de presentacion puro:

- No lee ni escribe en `FormContext`
- No dispara eventos de usuario por si mismo
- Acepta todos los atributos HTML nativos de `<span>` via `...rest`, por lo que el padre puede agregar `onClick` si necesita interactividad

### Comunicacion con otros componentes

#### Con BadgeWrapper (compound component)

`Badge` y `BadgeWrapper` forman un **compound component**. `BadgeWrapper` actua como contenedor relativo y renderiza a `Badge` como hijo posicionado absolutamente:

```
BadgeWrapper (position: relative, display: inline-block)
  └── children (el elemento destino — Avatar, Icon, Button, etc.)
  └── Badge (position: absolute, segun badgeProps.position)
```

El flujo de datos es unidireccional:
```
BadgeWrapper.badgeContent → Badge.children
BadgeWrapper.badgeProps   → Badge props (color, size, variant, position, etc.)
```

La logica de visibilidad esta en `BadgeWrapper.shouldShowBadge`:
- `badgeProps.invisible === true` → no renderiza Badge
- `badgeContent === undefined/null` → solo renderiza si `variant === 'dot'`
- `badgeContent === 0` → solo renderiza si `badgeProps.showZero === true`

#### Con Avatar (uso comun)

`BadgeWrapper` se usa frecuentemente envolviendo `Avatar`:

```tsx
<BadgeWrapper badgeContent="3" badgeProps={{ color: 'danger', position: 'top-right' }}>
  <Avatar src="/foto.jpg" />
</BadgeWrapper>
```

#### Independiente (sin contexto requerido)

Badge no requiere ningun Provider, Context ni componente padre especifico. Funciona en cualquier parte del arbol React.

### Accesibilidad

| Atributo | Valor | Condicion |
|---|---|---|
| `role` | `"status"` | Siempre — indica que es una region de estado |
| `aria-label` | `ariaLabel prop` o `"Badge: {contenido}"` | Generado automaticamente si `ariaLabel` no se especifica |

El contenido numerico mayor a `max` se trunca visualmente (muestra `99+`) pero `aria-label` recibe el valor real para lectores de pantalla.

### Patron de uso recomendado

```tsx
// 1. Contador de notificaciones sobre icono
<BadgeWrapper badgeContent={notifications} badgeProps={{ color: 'danger', max: 99 }}>
  <Bell size={24} />
</BadgeWrapper>

// 2. Indicador de estado dot sobre avatar
<BadgeWrapper badgeProps={{ variant: 'dot', color: 'success' }}>
  <Avatar src={user.avatar} />
</BadgeWrapper>

// 3. Badge standalone como etiqueta de estado
<Badge color="success" variant="soft">Activo</Badge>
<Badge color="warning" variant="soft">Pendiente</Badge>
<Badge color="danger" variant="soft">Expirado</Badge>

// 4. Visibilidad controlada
<BadgeWrapper
  badgeContent={unreadCount}
  badgeProps={{ color: 'danger', invisible: unreadCount === 0 }}
>
  <Mail size={24} />
</BadgeWrapper>
```

## Estructura de archivos

```
Badge/
  Badge.tsx             Componente principal (forwardRef)
  BadgeWrapper.tsx      Compound component para posicionamiento
  Badge.types.ts        Interfaces TypeScript (BadgeProps, BadgeWrapperProps)
  Badge.constants.ts    Clases CSS, BADGE_DEFAULTS
  Badge.utils.ts        buildBadgeClasses()
  Badge.hooks.ts        useBadgeContent (procesamiento de max/contenido)
  README.md             Esta documentacion
```

CSS: `src/w3fussion/DATADISPLAY/_badge.css` + `src/w3fussion/PRESETS/_badge.preset.css`
