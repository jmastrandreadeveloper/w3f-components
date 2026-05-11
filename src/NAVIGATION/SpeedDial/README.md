# SpeedDial

Boton de accion flotante (FAB) que al abrirse despliega un grupo de acciones relacionadas. Implementa el patron compound component: `SpeedDial` como padre y `SpeedDialAction` como hijo. Soporta cuatro direcciones de expansion, modo controlado/no controlado y apertura por hover o clic.

## Importacion

```tsx
import SpeedDial, { SpeedDialAction } from '@/components/NAVIGATION/SpeedDial/SpeedDial';
```

## Uso basico

```tsx
<SpeedDial ariaLabel="Opciones de documento" icon={<Plus />} direction="up">
  <SpeedDialAction icon={<Copy />} tooltipTitle="Copiar" />
  <SpeedDialAction icon={<Save />} tooltipTitle="Guardar" />
  <SpeedDialAction icon={<Printer />} tooltipTitle="Imprimir" />
  <SpeedDialAction icon={<Share2 />} tooltipTitle="Compartir" />
</SpeedDial>
```

## Direcciones de expansion

```tsx
<SpeedDial direction="up">...</SpeedDial>     {/* default */}
<SpeedDial direction="down">...</SpeedDial>
<SpeedDial direction="left">...</SpeedDial>
<SpeedDial direction="right">...</SpeedDial>
```

## Posicion en pantalla

```tsx
<SpeedDial position="bottom-right">...</SpeedDial>  {/* default */}
<SpeedDial position="bottom-left">...</SpeedDial>
<SpeedDial position="top-right">...</SpeedDial>
<SpeedDial position="top-left">...</SpeedDial>

{/* Con offset personalizado desde los bordes */}
<SpeedDial position="bottom-right" offset={32}>...</SpeedDial>
```

## Icono de apertura diferente

Cuando se provee `openIcon`, el FAB muestra `icon` cerrado y `openIcon` abierto (sin rotar):

```tsx
import { Plus, X } from 'lucide-react';

<SpeedDial icon={<Plus />} openIcon={<X />} ariaLabel="Acciones">
  ...
</SpeedDial>
```

Sin `openIcon`, el icono por defecto rota 45deg al abrirse.

## Colores

```tsx
<SpeedDial color="primary" ariaLabel="...">...</SpeedDial>    {/* default */}
<SpeedDial color="secondary" ariaLabel="...">...</SpeedDial>
<SpeedDial color="success" ariaLabel="...">...</SpeedDial>
<SpeedDial color="warning" ariaLabel="...">...</SpeedDial>
<SpeedDial color="danger" ariaLabel="...">...</SpeedDial>
```

## Tamanos

```tsx
<SpeedDial size="sm" ariaLabel="...">...</SpeedDial>
<SpeedDial size="default" ariaLabel="...">...</SpeedDial>  {/* default */}
<SpeedDial size="lg" ariaLabel="...">...</SpeedDial>
```

## Tooltips siempre visibles

```tsx
<SpeedDial ariaLabel="..." icon={<Plus />} openIcon={<X />}>
  <SpeedDialAction icon={<Copy />} tooltipTitle="Copiar" tooltipOpen />
  <SpeedDialAction icon={<Save />} tooltipTitle="Guardar" tooltipOpen />
</SpeedDial>
```

## Apertura por hover

```tsx
<SpeedDial ariaLabel="..." openOnHover>
  <SpeedDialAction icon={<Edit />} tooltipTitle="Editar" />
</SpeedDial>
```

## Modo controlado

```tsx
const [open, setOpen] = useState(false);

<SpeedDial
  ariaLabel="..."
  open={open}
  onOpen={(_e, reason) => setOpen(true)}
  onClose={(_e, reason) => setOpen(false)}
>
  ...
</SpeedDial>
```

## Backdrop

Muestra un overlay semitransparente cuando el dial esta abierto:

```tsx
<SpeedDial ariaLabel="..." backdrop>...</SpeedDial>
```

## CSS Custom Properties

```css
.mi-sdial-custom {
  --w3f-sdial-fab-bg: linear-gradient(135deg, #f43f5e, #ec4899);
  --w3f-sdial-fab-color: #ffffff;
  --w3f-sdial-fab-hover-bg: #e11d48;
  --w3f-sdial-tooltip-bg: #1e293b;
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-sdial-fab-bg` | `primary` | Fondo del FAB principal |
| `--w3f-sdial-fab-color` | `on-primary` | Color del icono del FAB |
| `--w3f-sdial-fab-shadow` | `shadow-md` | Sombra del FAB |
| `--w3f-sdial-fab-hover-shadow` | `shadow-lg` | Sombra hover del FAB |
| `--w3f-sdial-fab-active-shadow` | `shadow-sm` | Sombra activo del FAB |
| `--w3f-sdial-fab-hover-bg` | `primary-700` | Fondo hover del FAB |
| `--w3f-sdial-fab-active-bg` | `primary-800` | Fondo activo del FAB |
| `--w3f-sdial-fab-radius` | `radius-full` | Radio del FAB |
| `--w3f-sdial-focus-color` | `primary-400` | Color del anillo de foco |
| `--w3f-sdial-action-bg` | `surface` | Fondo de las acciones secundarias |
| `--w3f-sdial-action-color` | `on-surface` | Color de iconos de acciones |
| `--w3f-sdial-action-shadow` | `shadow-md` | Sombra de las acciones |
| `--w3f-sdial-action-hover-shadow` | `shadow-lg` | Sombra hover de las acciones |
| `--w3f-sdial-tooltip-bg` | `gray-800` | Fondo del tooltip |
| `--w3f-sdial-tooltip-color` | `white` | Color del texto del tooltip |
| `--w3f-sdial-tooltip-shadow` | `shadow-md` | Sombra del tooltip |
| `--w3f-sdial-backdrop-bg` | `rgba(0,0,0,0.3)` | Fondo del backdrop |
| `--w3f-sdial-transition` | `transition-fast` | Duracion de animaciones |
| `--w3f-sdial-gap` | `space-3` | Espacio entre acciones |
| `--w3f-sdial-disabled-opacity` | `0.5` | Opacidad del estado deshabilitado |

## Props

### SpeedDial

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `ariaLabel` | `string` | **requerido** | Accesibilidad del FAB principal |
| `children` | `ReactNode` | — | `SpeedDialAction` elements |
| `icon` | `ReactNode` | `<Plus size={24} />` | Icono del FAB en estado cerrado |
| `openIcon` | `ReactNode` | — | Icono del FAB en estado abierto |
| `direction` | `SpeedDialDirection` | `'up'` | Direccion de expansion de acciones |
| `open` | `boolean` | — | Estado abierto (modo controlado) |
| `defaultOpen` | `boolean` | `false` | Estado inicial (modo no controlado) |
| `onOpen` | `(e, reason) => void` | — | Callback al abrir |
| `onClose` | `(e, reason) => void` | — | Callback al cerrar |
| `hidden` | `boolean` | `false` | Oculta el SpeedDial completamente |
| `color` | `SpeedDialColor` | `'primary'` | Color del FAB principal |
| `size` | `SpeedDialSize` | `'default'` | Tamano del FAB |
| `position` | `SpeedDialPosition` | `'bottom-right'` | Posicion fija en pantalla |
| `offset` | `number` | — | Separacion del borde en px |
| `openOnHover` | `boolean` | `false` | Abre al pasar el cursor |
| `backdrop` | `boolean` | `false` | Muestra overlay al abrir |
| `className` | `string` | `''` | Clases CSS adicionales |

### SpeedDialAction

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `icon` | `ReactNode` | — | Icono de la accion |
| `tooltipTitle` | `string` | — | Texto del tooltip y aria-label |
| `tooltipOpen` | `boolean` | `false` | Fuerza visibilidad permanente del tooltip |
| `tooltipPlacement` | `SpeedDialTooltipPlacement` | auto segun direccion | Posicion del tooltip |
| `onClick` | `(e) => void` | — | Handler de clic |
| `color` | `SpeedDialColor` | — | Color especifico de la accion |
| `disabled` | `boolean` | `false` | Deshabilita la accion |
| `className` | `string` | `''` | Clases CSS adicionales |

## API

#### Entrada de datos

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Controlado | `open` | `boolean` | El padre controla el estado abierto/cerrado |
| No controlado | `defaultOpen` | `boolean` | Estado inicial sin control externo |
| Comportamiento | `openOnHover`, `backdrop` | `boolean` | Modifican la interaccion |

#### Salida de datos

| Evento | Firma | Razones | Descripcion |
|---|---|---|---|
| `onOpen` | `(e, reason: SpeedDialOpenReason) => void` | `'toggle'`, `'hover'`, `'focus'` | SpeedDial se abre |
| `onClose` | `(e, reason: SpeedDialCloseReason) => void` | `'toggle'`, `'hover'`, `'blur'`, `'escapeKeyDown'`, `'backdropClick'` | SpeedDial se cierra |

Cuando el usuario hace clic en una `SpeedDialAction`, el SpeedDial se cierra automaticamente (via `_onActionClick` inyectado por `cloneElement`).

#### Comunicacion con otros componentes

`SpeedDial` usa `React.cloneElement` para inyectar props internas en cada `SpeedDialAction`:

```
SpeedDial
  ├── useSpeedDialOpen → isOpen, handleOpen, handleClose, handleActionClick
  ├── useSpeedDialHover → eventos mouse/focus (si openOnHover)
  ├── useSpeedDialEscKey → cierre con Escape
  └── Children.map → cloneElement(action, { _direction, _onActionClick })
                          ↓
                    SpeedDialAction
                      ├── _direction → calcula tooltipPlacement auto
                      └── _onActionClick → cierra el SpeedDial tras el clic
```

Las props con prefijo `_` son de uso interno y no deben pasarse manualmente.

#### Accesibilidad

| Atributo | Elemento | Valor | Descripcion |
|---|---|---|---|
| `aria-label` | FAB `<button>` | `ariaLabel` | Describe el proposito del dial |
| `aria-expanded` | FAB `<button>` | `true/false` | Estado del menu |
| `aria-haspopup` | FAB `<button>` | `"menu"` | Indica que tiene menu |
| `role` | contenedor de acciones | `"menu"` | Semantica del grupo de acciones |
| `aria-label` | cada `<button>` accion | `tooltipTitle` | Identifica cada accion |

#### Patron de uso recomendado

```tsx
// 1. FAB flotante con acciones comunes (posicion fija)
<SpeedDial ariaLabel="Crear" icon={<Plus />} openIcon={<X />} direction="up" position="bottom-right">
  <SpeedDialAction icon={<Edit />} tooltipTitle="Nuevo post" onClick={() => createPost()} />
  <SpeedDialAction icon={<Upload />} tooltipTitle="Subir archivo" onClick={() => upload()} />
  <SpeedDialAction icon={<Folder />} tooltipTitle="Nueva carpeta" onClick={() => mkdir()} />
</SpeedDial>

// 2. Controlado con callbacks de razon
const [open, setOpen] = useState(false);
<SpeedDial
  ariaLabel="Acciones"
  open={open}
  onOpen={() => setOpen(true)}
  onClose={(_e, reason) => {
    if (reason !== 'backdropClick') setOpen(false);
  }}
  backdrop
>
  ...
</SpeedDial>
```

## Estructura de archivos

```
SpeedDial/
  SpeedDial.tsx          Componente principal + SpeedDialAction
  SpeedDial.types.ts     Interfaces TypeScript
  SpeedDial.constants.ts Clases CSS y defaults
  SpeedDial.utils.ts     buildSpeedDialClasses(), buildFabClasses(), defaultTooltipPlacement()
  SpeedDial.hooks.ts     useSpeedDialOpen, useSpeedDialHover, useSpeedDialEscKey
  README.md              Esta documentacion
```

CSS: `src/w3fussion/NAVIGATION/_speed-dial.css`
