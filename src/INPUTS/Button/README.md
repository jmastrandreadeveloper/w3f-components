# Button

Boton versatil con tres variantes visuales, seis colores semanticos, tres tamanos y soporte para iconos. Compatible con Form y LiveForm mediante Context API.

## Importacion

```tsx
import Button from '@/components/INPUTS/Button/Button';
```

## Uso basico

```tsx
<Button>Default</Button>
<Button variant="raised" color="primary">Primary</Button>
<Button variant="flat" color="secondary">Flat</Button>
<Button variant="outline" color="success">Outline</Button>
```

## Variantes

Tres variantes visuales controladas por el prop `variant`:

```tsx
{/* Raised — fondo solido con sombra (default) */}
<Button variant="raised" color="primary">Raised</Button>

{/* Flat — fondo transparente, solo color de texto */}
<Button variant="flat" color="primary">Flat</Button>

{/* Outline — borde visible, fondo transparente */}
<Button variant="outline" color="primary">Outline</Button>
```

## Colores

Seis colores semanticos disponibles para cada variante:

```tsx
<Button variant="raised" color="primary">Primary</Button>
<Button variant="raised" color="secondary">Secondary</Button>
<Button variant="raised" color="success">Success</Button>
<Button variant="raised" color="warning">Warning</Button>
<Button variant="raised" color="danger">Danger</Button>
<Button variant="raised" color="info">Info</Button>
```

## Tamanos

Tres tamanos predefinidos:

```tsx
<Button variant="raised" color="primary" size="sm">Small</Button>
<Button variant="raised" color="primary" size="md">Medium</Button>  {/* default */}
<Button variant="raised" color="primary" size="lg">Large</Button>
```

## Con iconos

Soporta iconos de Lucide en posicion izquierda (default) o derecha:

```tsx
import { Plus, ChevronRight, Download } from 'lucide-react';

{/* Icono a la izquierda (default) */}
<Button variant="raised" color="primary" icon={<Plus size={16} />}>
  Add Item
</Button>

{/* Icono a la derecha */}
<Button variant="raised" color="primary" icon={<ChevronRight size={16} />} iconPosition="right">
  Continue
</Button>
```

## Ancho completo

```tsx
<Button variant="raised" color="primary" fullWidth>
  Full Width Button
</Button>
```

## Estado deshabilitado

```tsx
<Button variant="raised" color="primary" disabled>Disabled</Button>
<Button variant="flat" color="secondary" disabled>Disabled</Button>
<Button variant="outline" color="danger" disabled>Disabled</Button>
```

## Modo unstyled

Cuando `unstyled` es `true`, se eliminan todos los estilos visuales. Solo permanece el CSS estructural. Ideal para componer apariencia via trait classes:

```tsx
<Button unstyled className="w3f-btn-theme-corporate">
  Custom Theme
</Button>
```

## Integracion con Form / LiveForm

Cuando esta dentro de un `Form`, el boton de tipo `submit` dispara el `onSubmit` del formulario. Los demas tipos se mantienen como `button`:

```tsx
<Form onSubmit={handleSubmit}>
  <Input name="email" />
  <Input name="password" type="password" />
  <Button type="submit" color="success">Iniciar sesion</Button>
</Form>
```

## CSS Custom Properties

El boton es 100% configurable via CSS custom properties. Aplica overrides en una clase custom:

```css
.mi-boton-custom {
  --w3f-btn-bg: #1e3a5f;
  --w3f-btn-color: #ffffff;
  --w3f-btn-radius: 4px;
  --w3f-btn-shadow: 0 2px 4px rgba(30, 58, 95, 0.3);
  --w3f-btn-hover-bg: #152c4a;
  --w3f-btn-font-weight: 600;
  --w3f-btn-py: 10px;
  --w3f-btn-px: 28px;
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-btn-bg` | per color class | Color de fondo (raised) |
| `--w3f-btn-color` | per color class | Color del texto |
| `--w3f-btn-radius` | `var(--w3f-radius)` | Border radius |
| `--w3f-btn-shadow` | `var(--w3f-shadow-md)` | Box shadow (raised) |
| `--w3f-btn-border-width` | `1px` | Ancho del borde |
| `--w3f-btn-border-color` | `transparent` | Color del borde |
| `--w3f-btn-font-family` | `var(--w3f-font-family)` | Familia tipografica |
| `--w3f-btn-font-size` | `var(--w3f-text-sm)` | Tamano de fuente (md) |
| `--w3f-btn-font-weight` | `600` | Peso de fuente |
| `--w3f-btn-text-transform` | `uppercase` | Transformacion de texto |
| `--w3f-btn-letter-spacing` | `0.05em` | Espaciado entre letras |
| `--w3f-btn-line-height` | `1.5` | Altura de linea |
| `--w3f-btn-py` | `var(--w3f-space-2)` | Padding vertical (md) |
| `--w3f-btn-px` | `var(--w3f-space-6)` | Padding horizontal (md) |
| `--w3f-btn-min-height` | `auto` | Altura minima |
| `--w3f-btn-transition` | transitions multiples | Transicion CSS |
| `--w3f-btn-gap` | `0` | Gap del elemento raiz |
| `--w3f-btn-cursor` | `pointer` | Cursor |
| `--w3f-btn-hover-bg` | per color class | Fondo en hover |
| `--w3f-btn-hover-color` | inherit | Color en hover |
| `--w3f-btn-hover-shadow` | `var(--w3f-shadow)` | Sombra en hover |
| `--w3f-btn-hover-scale` | `1` | Escala en hover |
| `--w3f-btn-active-scale` | `0.98` | Escala al hacer clic |
| `--w3f-btn-active-shadow` | per variant | Sombra al hacer clic |
| `--w3f-btn-focus-outline` | `2px solid primary-400` | Outline en focus |
| `--w3f-btn-focus-outline-offset` | `2px` | Offset del focus outline |
| `--w3f-btn-focus-shadow` | `none` | Box shadow en focus |
| `--w3f-btn-disabled-opacity` | `0.5` | Opacidad deshabilitado |
| `--w3f-btn-disabled-cursor` | `not-allowed` | Cursor deshabilitado |
| `--w3f-btn-sm-py` | `var(--w3f-space-1)` | Padding vertical sm |
| `--w3f-btn-sm-px` | `var(--w3f-space-4)` | Padding horizontal sm |
| `--w3f-btn-sm-font-size` | `var(--w3f-text-xs)` | Fuente sm |
| `--w3f-btn-sm-letter-spacing` | `0.04em` | Espaciado sm |
| `--w3f-btn-lg-py` | `var(--w3f-space-3)` | Padding vertical lg |
| `--w3f-btn-lg-px` | `var(--w3f-space-8)` | Padding horizontal lg |
| `--w3f-btn-lg-font-size` | `var(--w3f-text-base)` | Fuente lg |
| `--w3f-btn-lg-letter-spacing` | `0.06em` | Espaciado lg |
| `--w3f-btn-flat-bg` | `transparent` | Fondo flat |
| `--w3f-btn-flat-color` | per color class | Color texto flat |
| `--w3f-btn-flat-hover-bg` | per color class | Hover fondo flat |
| `--w3f-btn-flat-hover-color` | per color class | Hover color flat |
| `--w3f-btn-outline-bg` | `transparent` | Fondo outline |
| `--w3f-btn-outline-border-color` | per color class | Borde outline |
| `--w3f-btn-outline-color` | per color class | Color texto outline |
| `--w3f-btn-outline-hover-bg` | per color class | Hover fondo outline |
| `--w3f-btn-outline-hover-border-color` | per color class | Hover borde outline |
| `--w3f-btn-outline-hover-color` | per color class | Hover color outline |
| `--w3f-btn-content-gap` | `var(--w3f-space-2)` | Gap icono+texto |
| `--w3f-btn-content-direction` | `row` | Direccion icono+texto |
| `--w3f-btn-icon-size` | `1em` | Tamano del icono |
| `--w3f-btn-icon-color` | `inherit` | Color del icono |
| `--w3f-btn-text-color` | `inherit` | Color del span de texto |

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | — | Contenido del boton |
| `text` | `string` | — | Texto alternativo a children |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Tipo HTML del boton |
| `variant` | `'raised' \| 'flat' \| 'outline'` | `'raised'` | Variante visual |
| `color` | `'primary' \| 'success' \| 'danger' \| 'warning' \| 'info' \| 'secondary'` | `'primary'` | Color semantico |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamano |
| `fullWidth` | `boolean` | `false` | Ocupa el ancho del contenedor |
| `icon` | `ReactNode` | `null` | Icono del boton |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Posicion del icono |
| `disabled` | `boolean` | `false` | Estado deshabilitado |
| `unstyled` | `boolean` | `false` | Elimina estilos visuales (solo estructura) |
| `onClick` | `MouseEventHandler` | — | Handler de clic |
| `className` | `string` | `''` | Clases CSS adicionales |

Ademas acepta todos los atributos nativos de `<button>` via `React.ButtonHTMLAttributes`.

## API

### Entrada de datos

El Button acepta datos por tres vias:

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Contenido | `children` | `ReactNode` | Texto, iconos o cualquier nodo React como etiqueta del boton. Prioridad maxima |
| Texto alternativo | `text` | `string` | Alias de `children`. Se usa cuando el contenido se genera dinamicamente sin JSX |
| Props inyectados | `variant`, `color`, `size`, `disabled` | varios | Cuando el boton esta dentro de un `ButtonGroup`, estos props son inyectados via `React.cloneElement` si no estan definidos explicitamente en el boton |

**Prioridad de resolucion del contenido:**
```
children  →  text  →  (vacio)
```

### Salida de datos

| Evento | Firma | Cuando se dispara |
|---|---|---|
| `onClick` | `(e: React.MouseEvent<HTMLButtonElement>) => void` | Click del usuario sobre el boton cuando no esta `disabled` |

El handler de clic es siempre envuelto internamente:

```tsx
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
};
```

Esto permite que el boton extienda el comportamiento sin reemplazar la propagacion del evento nativo del `<button>`.

### Comunicacion con otros componentes

#### Con Form / LiveForm (submit unidireccional)

El Button detecta `FormContext` via `useButtonFormContext()`. La comunicacion es **unidireccional** — el boton no lee ni escribe valores del formulario, solo participa en el ciclo de envio:

```
<Form onSubmit={handleSubmit}>
        ↓ (provee FormContext)
Button detecta isFormControlled = true
        ↓ (usuario hace clic en type="submit")
Evento submit nativo del <button> se propaga al <form>
        ↓ (Form intercepta)
Form.onSubmit recibe { ...values }
```

**Regla de tipo efectivo:** cuando el boton esta dentro de un Form, solo `type="submit"` dispara el submit. Cualquier boton con `type="button"` (default) permanece neutro aunque este anidado en el formulario.

**Patron de deteccion:** `isFormControlled = !!formContext` — si `formContext` es `null` (fuera de Form), el boton funciona de forma independiente sin errores.

#### Con ButtonGroup (padre inyecta props via cloneElement)

`ButtonGroup` es un **compound component** que inyecta props a sus hijos Button via `React.cloneElement`. Los props del boton hijo tienen **prioridad** sobre los del grupo:

```
ButtonGroup props: variant="outline" color="primary" size="md" disabled={false}
        ↓ (React.cloneElement con merge)
Button recibe:
  variant = child.props.variant ?? "outline"   // hijo puede sobreescribir
  color   = child.props.color   ?? "primary"
  size    = child.props.size    ?? "md"
  disabled = groupDisabled || child.props.disabled
  data-button-position: "first" | "middle" | "last" | "only"
```

Ademas se inyectan `data-button-group-child` y `data-button-position` para que el CSS aplique los border-radius correctos en los extremos del grupo.

#### Con Ripple (ref imperativa)

El componente `Ripple` puede envolver a un Button para agregar el efecto de onda. Expone una ref imperativa con dos metodos:

```tsx
import Ripple, { type RippleRef } from '@/components/FEEDBACK/Ripples/Ripple';

const rippleRef = useRef<RippleRef>(null);

// Disparar onda manualmente desde cualquier coordenada
rippleRef.current?.launch(x, y);

// Desaparecer todas las ondas activas
rippleRef.current?.fadeOutAll();

// Uso tipico
<Ripple ref={rippleRef} color="primary">
  <Button variant="raised" color="primary">Con Ripple</Button>
</Ripple>
```

El `Ripple` actua como contenedor externo; el `Button` no necesita ninguna prop especial para funcionar dentro de el.

#### Independiente (sin contexto requerido)

El Button no requiere ningun Provider ni Context para funcionar. Todas sus variantes, colores, tamanos e iconos operan de forma autonoma:

```tsx
// Funciona en cualquier parte del arbol React
<Button variant="outline" color="danger" icon={<Trash size={16} />}>
  Eliminar
</Button>
```

### Accesibilidad

| Atributo / Comportamiento | Valor | Condicion |
|---|---|---|
| `type` | `"button"` (default) | Evita envios accidentales de formulario cuando no es submit |
| `type` | `"submit"` | Solo cuando se declara explicitamente; dispara Form.onSubmit |
| `disabled` | atributo HTML nativo | Cuando `disabled={true}`: bloquea eventos de puntero y teclado, aplica `cursor: not-allowed` y `opacity: 0.5` via CSS vars |
| Foco teclado | `outline` visible | El preset CSS define `--w3f-btn-focus-outline: 2px solid` con offset de 2px |
| `Enter` / `Space` | dispara click | Comportamiento nativo del elemento `<button>` HTML |
| `role` | `"button"` (implicito) | El elemento raiz es un `<button>` semantico — no se necesita `role` explicito |
| `aria-label` | libre | Acepta cualquier atributo ARIA nativo via `...props` (`React.ButtonHTMLAttributes`) |

### Patron de uso recomendado

```tsx
// 1. Accion primaria — boton de llamada a la accion
<Button variant="raised" color="primary" onClick={handleSave}>
  Guardar cambios
</Button>

// 2. Accion secundaria con icono
import { ChevronRight } from 'lucide-react';

<Button variant="outline" color="secondary" icon={<ChevronRight size={16} />} iconPosition="right">
  Continuar
</Button>

// 3. Submit en formulario controlado
<Form onSubmit={handleSubmit}>
  <Input name="email" />
  <Input name="password" type="password" />
  <Button type="submit" color="success" fullWidth>
    Iniciar sesion
  </Button>
</Form>

// 4. Grupo de acciones relacionadas
<ButtonGroup variant="outline" color="primary" size="sm">
  <Button icon={<Bold size={14} />} />
  <Button icon={<Italic size={14} />} />
  <Button icon={<Underline size={14} />} />
</ButtonGroup>

// 5. Boton con tema custom via unstyled + trait classes
<Button unstyled className="w3f-btn-theme-corporate">
  Accion corporativa
</Button>
```

## Estructura de archivos

```
Button/
  Button.tsx            Componente principal
  Button.types.ts       Interfaces TypeScript
  Button.constants.ts   Clases CSS (BEM) y valores por defecto
  Button.utils.ts       buildButtonClasses()
  Button.hooks.ts       useButtonFormContext (integracion Form)
  README.md             Esta documentacion
```

CSS:
- `src/w3fussion/INPUTS/_button.css` — CSS estructural (layout)
- `src/w3fussion/PRESETS/_button.preset.css` — Estilos visuales via CSS vars
