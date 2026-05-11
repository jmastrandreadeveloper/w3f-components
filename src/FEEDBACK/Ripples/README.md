# Ripple

Efecto visual de onda Material Design. Crea un efecto de onda radial que se expande desde el punto de clic. Funciona como contenedor (`<div>`) con `overflow: hidden` que intercepta clicks y teclado. Expone una API imperativa via `ref` para disparar el efecto desde codigo.

El componente `Button` usa `useRipple` internamente para aplicar el efecto en todos sus variantes.

## Importacion

```tsx
import Ripple from '@/components/FEEDBACK/Ripples/Ripple';
import { useRipple } from '@/components/FEEDBACK/Ripples/Ripple';
```

## Uso basico

```tsx
<Ripple color="primary">
  <div className="mi-boton">Click me</div>
</Ripple>
```

## Colores

```tsx
<Ripple color="primary">Primary</Ripple>
<Ripple color="secondary">Secondary</Ripple>
<Ripple color="success">Success</Ripple>
<Ripple color="warning">Warning</Ripple>
<Ripple color="danger">Danger</Ripple>
<Ripple color="info">Info</Ripple>
<Ripple color="light">Light</Ripple>
<Ripple color="dark">Dark</Ripple>
```

## Centrado

El efecto siempre parte del centro independientemente del punto de clic:

```tsx
<Ripple color="primary" centered>
  <div className="mi-chip">Centered</div>
</Ripple>
```

## Flat (sin elevacion en hover)

Desactiva el `translateY` y sombra en hover mientras conserva el ripple:

```tsx
<Ripple color="primary" flat>
  <div className="mi-elemento">Sin elevacion</div>
</Ripple>
```

## Disabled

```tsx
<Ripple color="primary" disabled>
  <div>Sin efecto</div>
</Ripple>
```

## API imperativa via ref

```tsx
import { useRef } from 'react';
import type { RippleRef } from '@/components/FEEDBACK/Ripples/Ripple';

const ref = useRef<RippleRef>(null);

// Disparar desde coordenadas especificas
ref.current?.launch(100, 200);

// Disparar desde el centro del elemento
ref.current?.launch();

// Eliminar todos los ripples activos
ref.current?.fadeOutAll();

<Ripple ref={ref} color="primary">
  <div>Target</div>
</Ripple>
```

## Hook useRipple (standalone)

Para aplicar el efecto en cualquier elemento sin usar el componente Ripple:

```tsx
import { useRipple } from '@/components/FEEDBACK/Ripples/Ripple';

const MyButton = () => {
  const { containerRef, createRipple, clearRipples } = useRipple({
    disabled: false,
    centered: false,
    enterDuration: 450,
    exitDuration: 400,
  });

  return (
    <button
      ref={containerRef}
      onClick={createRipple}
      className="w3f-ripple-container"
    >
      Click me
    </button>
  );
};
```

## CSS Custom Properties

```css
.mi-elemento {
  --w3f-ripple-duration: 0.4s;
  --w3f-ripple-opacity: 0.3;
  --w3f-ripple-hover-y: -3px;
  --w3f-ripple-hover-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  --w3f-ripple-active-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-ripple-duration` | `0.6s` | Duracion total de la animacion del ripple |
| `--w3f-ripple-opacity` | `0.4` | Opacidad de la onda |
| `--w3f-ripple-color` | `rgba(255,255,255,opacity)` | Color de la onda (derivado del `color` prop) |
| `--w3f-ripple-hover-y` | `-2px` | Desplazamiento vertical en hover |
| `--w3f-ripple-hover-shadow` | `shadow-md` | Sombra en hover |
| `--w3f-ripple-active-shadow` | `shadow` | Sombra en estado activo |

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | — | Contenido dentro del contenedor ripple |
| `color` | `RippleColor` | — | Color de la onda. Sin valor usa blanco semi-transparente |
| `disabled` | `boolean` | `false` | Deshabilita el efecto y la interaccion |
| `centered` | `boolean` | `false` | Fuerza el origen del ripple al centro del elemento |
| `unbounded` | `boolean` | `false` | Permite que la onda desborde el contenedor |
| `radius` | `number` | — | Radio custom del ripple en px |
| `animation` | `RippleAnimation` | — | `{ enterDuration?, exitDuration? }` en ms |
| `flat` | `boolean` | `false` | Desactiva el efecto de elevacion en hover |
| `role` | `string` | `'button'` | ARIA role del contenedor |
| `tabIndex` | `number` | `0` | Tab index para navegacion por teclado |
| `onClick` | `(e: MouseEvent) => void` | — | Handler de clic adicional |
| `className` | `string` | `''` | Clases CSS adicionales |

`RippleColor`: `'light' | 'dark' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'`

## RippleRef (API imperativa)

| Metodo | Firma | Descripcion |
|---|---|---|
| `launch` | `(x?: number, y?: number) => void` | Dispara un ripple. Sin coordenadas usa el centro del elemento |
| `fadeOutAll` | `() => void` | Elimina todos los ripples activos inmediatamente |

## API

#### Entrada de datos

Ripple no lee datos de formulario ni usa FormContext. Acepta solo props de configuracion visual:

| Prop | Descripcion |
|---|---|
| `color` | Determina el tinte de la onda via `data-ripple-color` en el DOM |
| `disabled` | Deshabilita toda interaccion |
| `children` | Contenido arbitrario a envolver |

#### Salida de datos

| Evento | Firma | Descripcion |
|---|---|---|
| `onClick` | `(e: MouseEvent<HTMLDivElement>) => void` | Se dispara tras crear el ripple. Propagacion normal |

El componente no emite eventos propios mas alla del `onClick` pasado por props. El efecto visual es autocontenido.

#### Comunicacion con otros componentes

**Button (uso interno):**
El componente `Button` usa `useRipple` directamente en su implementacion. El efecto ripple es transparente para el consumidor del Button.

**API imperativa via ref:**
Permite a componentes padres disparar el ripple programaticamente, por ejemplo al recibir focus desde teclado o al activar un elemento sin click directo.

```
Padre                       Ripple
 ref.current.launch()  →   createRipple({ clientX, clientY })
                        →   DOM: <span class="w3f-ripple"> se agrega
                        →   CSS animation: escalar + fade out
                        →   setTimeout: span removido tras totalDuration
```

**Teclado:**
`Enter` y `Space` disparan el ripple desde el centro del elemento (equivalente a `centered=true` para teclado).

#### Accesibilidad

| Atributo | Valor | Condicion |
|---|---|---|
| `role` | `"button"` (default) | Configurable via prop `role` |
| `tabIndex` | `0` | `tabIndex={-1}` cuando `disabled` |
| `aria-disabled` | `true` | Cuando `disabled={true}` |

El componente responde a `Enter` y `Space` para generar el efecto, alineado con las expectativas de accesibilidad para elementos con `role="button"`.

#### Patron de uso recomendado

```tsx
// 1. Superficie clickable custom (tarjeta, chip, etc.)
<Ripple color="primary" onClick={() => navigate('/detalle')}>
  <div className="w3f-card-item">
    <h4>Titulo</h4>
    <p>Descripcion</p>
  </div>
</Ripple>

// 2. Item de lista interactivo con flat
<Ripple color="dark" flat role="listitem">
  <div className="w3f-list-item">Opcion de menu</div>
</Ripple>

// 3. Disparo programatico (ej. focus visible desde teclado)
const rippleRef = useRef<RippleRef>(null);

<Ripple ref={rippleRef} color="primary">
  <input onFocus={() => rippleRef.current?.launch()} />
</Ripple>
```

## Estructura de archivos

```
Ripples/
  Ripple.tsx            Componente principal con forwardRef + useImperativeHandle
  Ripple.types.ts       RippleProps, RippleRef, RippleColor, UseRippleOptions
  Ripple.constants.ts   RIPPLE_DEFAULTS (durations)
  Ripple.hooks.ts       useRipple() — logica de creacion DOM del efecto
  Ripple.utils.ts       calculateRippleDimensions(), buildRippleClasses()
  README.md             Esta documentacion
```

CSS: `src/w3fussion/FEEDBACK/_ripple-container.css`
