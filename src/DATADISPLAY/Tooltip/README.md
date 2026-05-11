# Tooltip

Componente de hint contextual que se muestra al hacer hover sobre cualquier elemento hijo. Envuelve al trigger con un `div.w3f-tooltip-wrapper` y posiciona el tooltip mediante clases CSS absolutas. Soporta 8 posiciones, 7 variantes de color, flecha opcional y delays independientes de show/hide.

## Importacion

```tsx
import Tooltip from '@/components/DATADISPLAY/Tooltip/Tooltip';
```

## Uso basico

Envuelve cualquier elemento con `<Tooltip>`. La configuracion va en el prop `config`:

```tsx
<Tooltip config={{ message: 'Este es un tooltip' }}>
  <Button>Hover sobre mi</Button>
</Tooltip>
```

## Posiciones

Ocho posiciones disponibles:

```tsx
<Tooltip config={{ message: 'Arriba', position: 'top' }}>
  <Button>Top</Button>
</Tooltip>

<Tooltip config={{ message: 'Abajo', position: 'bottom' }}>
  <Button>Bottom</Button>
</Tooltip>

<Tooltip config={{ message: 'Izquierda', position: 'left' }}>
  <Button>Left</Button>
</Tooltip>

<Tooltip config={{ message: 'Derecha', position: 'right' }}>
  <Button>Right</Button>
</Tooltip>

{/* Posiciones extendidas */}
<Tooltip config={{ message: 'Inicio arriba', position: 'top-start' }}>
  <Button>Top Start</Button>
</Tooltip>

<Tooltip config={{ message: 'Fin arriba', position: 'top-end' }}>
  <Button>Top End</Button>
</Tooltip>

<Tooltip config={{ message: 'Inicio abajo', position: 'bottom-start' }}>
  <Button>Bottom Start</Button>
</Tooltip>

<Tooltip config={{ message: 'Fin abajo', position: 'bottom-end' }}>
  <Button>Bottom End</Button>
</Tooltip>
```

## Variantes de color

```tsx
<Tooltip config={{ message: 'Dark', variant: 'dark' }}>
  <span>Dark</span>
</Tooltip>

<Tooltip config={{ message: 'Light', variant: 'light' }}>
  <span>Light</span>
</Tooltip>

<Tooltip config={{ message: 'Primary', variant: 'primary' }}>
  <span>Primary</span>
</Tooltip>

<Tooltip config={{ message: 'Success', variant: 'success' }}>
  <span>Success</span>
</Tooltip>

<Tooltip config={{ message: 'Warning', variant: 'warning' }}>
  <span>Warning</span>
</Tooltip>

<Tooltip config={{ message: 'Danger', variant: 'danger' }}>
  <span>Danger</span>
</Tooltip>

<Tooltip config={{ message: 'Info', variant: 'info' }}>
  <span>Info</span>
</Tooltip>
```

## Flecha

La flecha apunta al trigger y se activa por defecto. Puede desactivarse:

```tsx
<Tooltip config={{ message: 'Con flecha', arrow: true }}>
  <Button>Con flecha</Button>
</Tooltip>

<Tooltip config={{ message: 'Sin flecha', arrow: false }}>
  <Button>Sin flecha</Button>
</Tooltip>
```

## Delays

`showDelay` y `hideDelay` controlan cuantos milisegundos esperar antes de mostrar u ocultar el tooltip:

```tsx
{/* Aparece inmediatamente, oculta inmediatamente */}
<Tooltip config={{ message: 'Instantaneo', showDelay: 0, hideDelay: 0 }}>
  <Button>Sin delay</Button>
</Tooltip>

{/* Aparece despues de 500ms */}
<Tooltip config={{ message: 'Lento', showDelay: 500 }}>
  <Button>500ms delay</Button>
</Tooltip>

{/* Se oculta lentamente (util para tooltips con enlaces) */}
<Tooltip config={{ message: 'Persistente', hideDelay: 300 }}>
  <Button>Hide delay</Button>
</Tooltip>
```

## Sobre cualquier elemento

El Tooltip funciona sobre cualquier elemento React que acepte `onMouseEnter`/`onMouseLeave`:

```tsx
import { Info, Star, Settings } from 'lucide-react';

<Tooltip config={{ message: 'Informacion', position: 'right' }}>
  <Info size={20} style={{ cursor: 'pointer' }} />
</Tooltip>

<Tooltip config={{ message: 'Favorito', variant: 'warning' }}>
  <Star size={20} style={{ cursor: 'pointer' }} />
</Tooltip>

<Tooltip config={{ message: 'Configuracion', variant: 'dark' }}>
  <Settings size={20} style={{ cursor: 'pointer' }} />
</Tooltip>

<Tooltip config={{ message: 'Texto con hint' }}>
  <span style={{ textDecoration: 'underline', cursor: 'help' }}>Hover aqui</span>
</Tooltip>
```

## CSS Custom Properties

Aplica overrides en el mismo elemento o en un ancestro:

```css
.mi-tooltip-light {
  --w3f-tooltip-bg: #ffffff;
  --w3f-tooltip-color: #374151;
  --w3f-tooltip-font-size: 0.8rem;
  --w3f-tooltip-radius: 8px;
  --w3f-tooltip-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.mi-tooltip-gradient {
  --w3f-tooltip-bg: linear-gradient(135deg, #6366f1, #8b5cf6);
  --w3f-tooltip-color: #ffffff;
  --w3f-tooltip-shadow: 0 4px 20px rgba(99, 102, 241, 0.35);
  --w3f-tooltip-radius: 10px;
}
```

```tsx
<div className="mi-tooltip-gradient">
  <Tooltip config={{ message: 'Gradient tooltip!', variant: 'primary' }}>
    <Button>Hover</Button>
  </Tooltip>
</div>
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-tooltip-padding-v` | `8px` | Padding vertical |
| `--w3f-tooltip-padding-h` | `12px` | Padding horizontal |
| `--w3f-tooltip-radius` | `radius-md` | Border radius |
| `--w3f-tooltip-font-size` | `text-sm` | Tamano de fuente |
| `--w3f-tooltip-line-height` | `1.4` | Altura de linea |
| `--w3f-tooltip-shadow` | `shadow-lg` | Box shadow |
| `--w3f-tooltip-z` | `1000` | Z-index |
| `--w3f-tooltip-transition-duration` | `0.2s` | Duracion de la transicion de opacidad |
| `--w3f-tooltip-bg` | `rgba(0,0,0,0.9)` | Fondo del tooltip (variant `dark`) |
| `--w3f-tooltip-color` | `white` | Color del texto (variant `dark`) |
| `--w3f-tooltip-light-bg` | `white` | Fondo del tooltip (variant `light`) |
| `--w3f-tooltip-light-color` | `gray-800` | Color del texto (variant `light`) |
| `--w3f-tooltip-light-border` | `gray-300` | Borde del tooltip (variant `light`) |
| `--w3f-tooltip-offset` | `8px` | Distancia entre tooltip y trigger |
| `--w3f-tooltip-arrow-size` | `6px` | Tamano de la flecha triangular |
| `--w3f-tooltip-arrow-start-offset` | `16px` | Offset de la flecha en posiciones `*-start` |

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | — | Elemento trigger. Recibe los eventos hover del wrapper |
| `config` | `TooltipConfig` | `{}` | Objeto de configuracion del tooltip |

### TooltipConfig

| Campo | Tipo | Default | Descripcion |
|---|---|---|---|
| `message` | `string` | `'Tooltip'` | Texto a mostrar en el tooltip |
| `position` | `TooltipPosition` | `'top'` | Posicion relativa al trigger |
| `variant` | `TooltipVariant` | `'dark'` | Variante de color |
| `arrow` | `boolean` | `true` | Mostrar flecha indicadora de direccion |
| `showDelay` | `number` | `0` | Milisegundos de espera antes de mostrarse |
| `hideDelay` | `number` | `0` | Milisegundos de espera antes de ocultarse |

### TooltipPosition

`'top'` · `'bottom'` · `'left'` · `'right'` · `'top-start'` · `'top-end'` · `'bottom-start'` · `'bottom-end'`

### TooltipVariant

`'dark'` · `'light'` · `'primary'` · `'success'` · `'warning'` · `'danger'` · `'info'`

## API

### Entrada de datos

El Tooltip acepta configuracion exclusivamente via props:

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Contenido | `config.message` | `string` | Texto del tooltip. Solo texto plano |
| Trigger | `children` | `ReactNode` | Cualquier elemento React. El Tooltip lo envuelve en un `div.w3f-tooltip-wrapper` |

### Salida de datos

El Tooltip es un componente **display puro** — no emite ningun callback. No modifica datos ni propaga eventos al componente padre:

| Interaccion | Comportamiento |
|---|---|
| `onMouseEnter` | Inicia el timer de `showDelay`. Al cumplirse, el tooltip se vuelve visible |
| `onMouseLeave` | Inicia el timer de `hideDelay`. Al cumplirse, el tooltip se oculta |

El estado `isVisible` es completamente interno (gestionado por `useTooltipVisibility`).

### Comunicacion con otros componentes

#### Independiente (sin contexto requerido)

El Tooltip no requiere ningun Provider ni contexto. Funciona de forma totalmente autonoma:

```tsx
// Funciona en cualquier lugar del arbol React sin configuracion adicional
<Tooltip config={{ message: 'Siempre funciona' }}>
  <cualquier-elemento />
</Tooltip>
```

El wrapper `div.w3f-tooltip-wrapper` tiene `position: relative` y `display: inline-flex`, por lo que el layout del trigger no se ve alterado.

### Accesibilidad

| Consideracion | Descripcion |
|---|---|
| Solo hover | El tooltip se activa unicamente por `mouseenter`/`mouseleave`. Para teclado, considera agregar `title` o `aria-describedby` adicional |
| `role` | El div del tooltip no tiene role especifico. Para hints formales usa `aria-describedby` en el trigger |
| `pointer-events: none` | El tooltip no interfiere con el cursor cuando esta visible |

### Patron de uso recomendado

```tsx
// 1. Hint informativo sobre un boton de accion
<Tooltip config={{ message: 'Guardar cambios (Ctrl+S)', position: 'bottom' }}>
  <Button icon={<Save size={16} />} variant="raised" color="primary">
    Guardar
  </Button>
</Tooltip>

// 2. Ayuda en campo de formulario
<Tooltip config={{ message: 'Formato: +34 600 000 000', position: 'right', variant: 'info' }}>
  <HelpCircle size={16} style={{ cursor: 'help', color: 'var(--w3f-info)' }} />
</Tooltip>

// 3. Icono con label accesible
<Tooltip config={{ message: 'Eliminar elemento', variant: 'danger', showDelay: 500 }}>
  <Button variant="icon" color="danger">
    <Trash2 size={16} />
  </Button>
</Tooltip>

// 4. Texto truncado con preview completo
<Tooltip config={{ message: textoCompleto, position: 'bottom-start' }}>
  <Text element="span" customClasses="w3f-truncate" style={{ maxWidth: '200px' }}>
    {textoCompleto}
  </Text>
</Tooltip>
```

## Estructura de archivos

```
Tooltip/
  Tooltip.tsx           Componente principal
  Tooltip.types.ts      Interfaces TypeScript (TooltipProps, TooltipConfig, etc.)
  Tooltip.constants.ts  Clases CSS base
  Tooltip.hooks.ts      useTooltipVisibility (maneja timers de show/hide)
  Tooltip.utils.ts      buildTooltipClasses(), buildArrowClasses()
  README.md             Esta documentacion
```

CSS: `src/w3fussion/DATADISPLAY/_tool-tip.css`
