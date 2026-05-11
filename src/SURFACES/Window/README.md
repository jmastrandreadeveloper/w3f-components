# Window

Ventana estilo sistema operativo con arrastre, redimensionamiento en ocho direcciones, minimizar, maximizar, cerrar y soporte de estilos macOS / Windows / Linux. Soporta modo modal con overlay, footer con botones configurables y gestion de z-index mediante Desktop integration.

## Importacion

```tsx
import Window from '@/components/SURFACES/Window/Window';
```

## Uso basico

```tsx
<Window title="Mi ventana" draggable closable onClose={() => setOpen(false)}>
  <p>Contenido de la ventana.</p>
</Window>
```

## Estilos de OS

### macOS

Botones de control (semaforo) en la izquierda. Titulo centrado:

```tsx
<Window
  title="Finder"
  osStyle="macos"
  draggable
  closable
  minimizable
  maximizable
  onClose={handleClose}
>
  <p>Contenido estilo macOS.</p>
</Window>
```

### Windows

Botones en la derecha con iconos SVG:

```tsx
<Window
  title="Configuracion"
  osStyle="windows"
  draggable
  closable
  minimizable
  maximizable
  onClose={handleClose}
>
  <p>Contenido estilo Windows.</p>
</Window>
```

## Posicion y tamano inicial

```tsx
<Window
  title="Editor"
  osStyle="windows"
  draggable
  resizable
  initialPosition={{ x: 120, y: 200 }}
  initialSize={{ width: 500, height: 350 }}
>
  <p>Ventana posicionada y dimensionada desde el inicio.</p>
</Window>
```

## Redimensionable

Habilita handles en los ocho bordes y esquinas:

```tsx
<Window
  title="Ventana redimensionable"
  osStyle="windows"
  draggable
  resizable
  closable
  minimizable
  maximizable
>
  <p>Arrastra cualquier borde o esquina para cambiar el tamano.</p>
</Window>
```

## Footer con botones

### Via prop `buttons`

```tsx
<Window
  title="Guardar cambios"
  osStyle="windows"
  draggable
  closable
  onClose={handleClose}
  buttons={[
    { text: 'Cancelar', variant: 'text', color: 'gray', onClick: handleClose },
    { text: 'Guardar', variant: 'raised', color: 'primary', onClick: handleSave },
  ]}
  footerAlign="end"
>
  <p>Tienes cambios sin guardar.</p>
</Window>
```

### Via prop `footer` (ReactNode libre)

```tsx
<Window
  title="Dialogo"
  footer={
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button variant="text" onClick={handleClose}>Cerrar</Button>
      <Button variant="raised" color="primary" onClick={handleConfirm}>Confirmar</Button>
    </div>
  }
>
  <p>Contenido del dialogo.</p>
</Window>
```

## Modo modal

Envuelve la ventana en un overlay semitransparente:

```tsx
<Window title="Alerta" modal closable onClose={handleClose}>
  <p>Mensaje importante que requiere atencion.</p>
</Window>
```

## Icono en titulo

```tsx
import { Settings } from 'lucide-react';

<Window title="Preferencias" icon={<Settings size={16} />} osStyle="windows" draggable>
  <p>Configuracion del sistema.</p>
</Window>
```

## CSS Custom Properties

```css
.mi-ventana-custom {
  --w3f-win-bg: rgba(255, 255, 255, 0.85);
  --w3f-win-radius: 12px;
  --w3f-win-shadow: 0 20px 60px rgba(0,0,0,0.3);
  --w3f-win-tb-bg: rgba(240, 240, 240, 0.8);
  --w3f-win-title-color: #1d1d1f;
  --w3f-win-ctrl-hover-bg: rgba(0,0,0,0.08);
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-win-bg` | `surface` | Color de fondo de la ventana |
| `--w3f-win-color` | `on-surface` | Color del texto |
| `--w3f-win-shadow` | `shadow-xl` | Sombra de la ventana |
| `--w3f-win-radius` | `radius-lg` | Border radius |
| `--w3f-win-border-color` | `outline-variant` | Color del borde |
| `--w3f-win-transition` | `transition-normal` | Transicion general |
| `--w3f-win-min-w` | `300px` | Ancho minimo |
| `--w3f-win-min-h` | `200px` | Alto minimo |
| `--w3f-win-max-h` | `90vh` | Alto maximo |
| `--w3f-win-tb-bg` | `surface-variant` | Fondo de la barra de titulo |
| `--w3f-win-tb-border-color` | `outline-variant` | Borde de la barra de titulo |
| `--w3f-win-tb-pad` | `space-3 space-4` | Padding de la barra de titulo |
| `--w3f-win-tb-min-h` | `40px` | Alto minimo de la barra de titulo |
| `--w3f-win-title-font` | `text-base` | Tamano del titulo |
| `--w3f-win-title-weight` | `600` | Peso del titulo |
| `--w3f-win-title-color` | `on-surface` | Color del titulo |
| `--w3f-win-ctrl-size` | `32px` | Tamano de los botones de control |
| `--w3f-win-ctrl-color` | `on-surface` | Color de los iconos de control |
| `--w3f-win-ctrl-radius` | `radius` | Border radius de botones de control |
| `--w3f-win-ctrl-hover-bg` | `gray-200` | Fondo en hover de controles |
| `--w3f-win-ctrl-transition` | `transition-fast` | Transicion de controles |
| `--w3f-win-ctrl-focus-color` | `primary` | Color de foco de controles |
| `--w3f-win-ctrl-close-hover-bg` | `danger` | Fondo del boton cerrar en hover |
| `--w3f-win-ctrl-close-hover-color` | `white` | Color del icono cerrar en hover |
| `--w3f-win-body-bg` | `surface` | Fondo del area de contenido |
| `--w3f-win-body-pad` | `space-6` | Padding del area de contenido |
| `--w3f-win-footer-bg` | `surface-variant` | Fondo del footer |
| `--w3f-win-footer-border-color` | `outline-variant` | Borde del footer |
| `--w3f-win-footer-pad` | `space-4 space-6` | Padding del footer |
| `--w3f-win-footer-gap` | `space-3` | Gap entre botones del footer |
| `--w3f-win-focused-shadow` | sombra personalizada | Sombra cuando tiene foco |
| `--w3f-win-focused-tb-bg` | `primary-100` | Fondo de titulo cuando tiene foco |
| `--w3f-win-overlay-bg` | `rgba(0,0,0,0.5)` | Fondo del overlay modal |
| `--w3f-win-os-win-radius` | `radius-lg` | Border radius del estilo Windows |
| `--w3f-win-os-win-shadow` | sombra personalizada | Sombra del estilo Windows |
| `--w3f-win-os-mac-radius` | `radius-xl` | Border radius del estilo macOS |
| `--w3f-win-os-mac-shadow` | sombra personalizada | Sombra del estilo macOS |
| `--w3f-win-os-mac-tb-bg` | `gray-100` | Fondo de barra de titulo macOS |
| `--w3f-win-os-mac-tb-border` | `gray-200` | Borde de barra de titulo macOS |
| `--w3f-win-os-linux-radius` | `radius-md` | Border radius del estilo Linux |

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `title` | `string` | `'Window'` | Texto de la barra de titulo |
| `icon` | `ReactNode` | — | Icono junto al titulo |
| `children` | `ReactNode` | — | Contenido del area del cuerpo |
| `footer` | `ReactNode` | — | Footer libre (sustituye a `buttons` si se proporciona) |
| `buttons` | `WindowButtonConfig[]` | `[]` | Botones del footer generados automaticamente |
| `osStyle` | `'windows' \| 'macos' \| 'linux'` | `'windows'` | Estilo visual de la ventana |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Tamano predefinido |
| `modal` | `boolean` | `false` | Muestra la ventana sobre un overlay |
| `draggable` | `boolean` | `false` | Permite arrastrar por la barra de titulo |
| `resizable` | `boolean` | `false` | Activa handles de redimensionamiento |
| `minimizable` | `boolean` | `false` | Muestra boton de minimizar |
| `maximizable` | `boolean` | `false` | Muestra boton de maximizar/restaurar |
| `closable` | `boolean` | `false` | Muestra boton de cerrar |
| `onClose` | `() => void` | — | Callback al cerrar la ventana |
| `onMinimize` | `(minimized: boolean) => void` | — | Callback al minimizar/restaurar |
| `onMaximize` | `(maximized: boolean) => void` | — | Callback al maximizar/restaurar |
| `onFocus` | `() => void` | — | Callback al enfocar la ventana (clic) |
| `initialPosition` | `WindowPosition \| null` | `null` | Posicion inicial `{ x, y }` en px |
| `initialSize` | `WindowDimensions \| null` | `null` | Tamano inicial `{ width, height }` en px |
| `footerAlign` | `'start' \| 'center' \| 'end'` | `'end'` | Alineacion de los botones del footer |
| `open` | `boolean` | `true` | Controla la visibilidad de la ventana |
| `noPadding` | `boolean` | `false` | Elimina el padding del area de contenido |
| `className` | `string` | `''` | Clases CSS adicionales del contenedor |
| `bodyClassName` | `string` | `''` | Clases CSS del area de contenido |
| `footerClassName` | `string` | `''` | Clases CSS del footer |
| `style` | `CSSProperties` | — | Estilos inline del contenedor |

## API

### Entrada de datos

Window es un componente controlado externamente en cuanto a visibilidad:

| Via | Prop | Descripcion |
|---|---|---|
| Visibilidad | `open` | `false` → `return null` (no renderiza nada) |
| Posicion inicial | `initialPosition` | `{ x, y }` absolutos desde el origen del contenedor |
| Tamano inicial | `initialSize` | `{ width, height }` en pixeles |
| Contenido | `children` | Cualquier ReactNode |
| Footer | `footer` / `buttons` | ReactNode libre o array de configs de Button |

### Salida de datos

| Evento | Firma | Cuando se dispara |
|---|---|---|
| `onClose` | `() => void` | El usuario hace clic en el boton cerrar |
| `onMinimize` | `(minimized: boolean) => void` | El usuario hace clic en minimizar |
| `onMaximize` | `(maximized: boolean) => void` | El usuario hace clic en maximizar / restaurar |
| `onFocus` | `() => void` | El usuario hace clic en cualquier parte de la ventana |

### Comunicacion con Desktop / z-index

Window gestiona su propio `zIndex` internamente via `useWindowState`. Cuando el usuario hace clic en la ventana, esta pasa al frente incrementando su z-index. Para integracion con un Desktop que coordine multiples ventanas, implementa `onFocus` y gestiona el z-index desde el padre:

```tsx
const [zIndexMap, setZIndexMap] = useState({ editor: 10, terminal: 11 });

<Window
  title="Editor"
  onFocus={() => setZIndexMap(prev => ({ ...prev, editor: Math.max(...Object.values(prev)) + 1 }))}
  style={{ zIndex: zIndexMap.editor }}
>
  ...
</Window>
```

### Patron de uso recomendado

```tsx
// 1. Ventana simple con arrastre y cierre
const [open, setOpen] = useState(true);

{open && (
  <Window
    title="Notas"
    osStyle="macos"
    draggable
    closable
    onClose={() => setOpen(false)}
    initialPosition={{ x: 100, y: 150 }}
    initialSize={{ width: 400, height: 300 }}
  >
    <p>Contenido de la nota.</p>
  </Window>
)}

// 2. Dialogo modal
<Window
  title="Confirmar accion"
  modal
  closable
  onClose={handleCancel}
  buttons={[
    { text: 'Cancelar', variant: 'text', onClick: handleCancel },
    { text: 'Confirmar', variant: 'raised', color: 'primary', onClick: handleConfirm },
  ]}
>
  <p>Esta accion no se puede deshacer.</p>
</Window>

// 3. Ventana completa con redimensionamiento
<Window
  title="Terminal"
  osStyle="linux"
  draggable
  resizable
  closable
  minimizable
  maximizable
  noPadding
>
  <TerminalContent />
</Window>
```

## Estructura de archivos

```
Window/
  Window.tsx            Componente principal
  Window.types.ts       Interfaces TypeScript
  Window.constants.ts   Clases CSS, defaults, RESIZE_DIRECTIONS
  Window.utils.ts       buildWindowClasses(), buildWindowStyle(), etc.
  Window.hooks.ts       useWindowState (drag, resize, minimize, maximize)
  README.md             Esta documentacion
```

CSS: `src/w3fussion/SURFACES/_window.css`
