# PopUp

Dialogo modal que reutiliza la estetica de Card. Se renderiza en el root del DOM mediante `createPortal` para evitar problemas de z-index y overflow. Incluye overlay con blur, animacion de entrada, boton de cierre y acciones de pie de dialogo configurables.

## Importacion

```tsx
import { PopUp } from '@/components/SURFACES/PopUp/PopUp';
```

## Uso basico

```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Abrir</Button>

<PopUp
  isOpen={open}
  onClose={() => setOpen(false)}
  closeOnOverlayClick
>
  Contenido del dialogo
</PopUp>
```

## Con titulo y botones de confirmacion

```tsx
<PopUp
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Confirmar eliminacion"
  subtitle="Esta accion no se puede deshacer"
  confirmText="Eliminar"
  cancelText="Cancelar"
  showCancel
  onConfirm={handleDelete}
  closeOnOverlayClick
>
  <Text element="p">¿Estas seguro de que deseas eliminar este elemento?</Text>
</PopUp>
```

## Tamanos

Tres tamanos que controlan el ancho maximo del dialogo:

```tsx
<PopUp isOpen={open} onClose={onClose} title="Small"  size="sm" />  {/* ~400px */}
<PopUp isOpen={open} onClose={onClose} title="Medium" size="md" />  {/* ~560px (default) */}
<PopUp isOpen={open} onClose={onClose} title="Large"  size="lg" />  {/* ~720px */}
```

## Acciones personalizadas en el footer

Reemplaza los botones por defecto con cualquier conjunto de acciones:

```tsx
<PopUp
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Configuracion"
  footerActions={
    <>
      <Button variant="text" onClick={handleReset}>Restaurar</Button>
      <Button variant="outlined" onClick={() => setOpen(false)}>Cancelar</Button>
      <Button variant="raised" color="primary" onClick={handleSave}>Guardar</Button>
    </>
  }
>
  <FormContent />
</PopUp>
```

## Contenido via prop `content`

Alternativa a `children` para contenido generado programaticamente:

```tsx
<PopUp
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Detalles"
  content={<DetailView item={selectedItem} />}
/>
```

## CSS Custom Properties

Aplica overrides pasando `className` al PopUp:

```css
.mi-popup-dark {
  --w3f-popup-overlay-bg: rgba(0, 0, 0, 0.7);
  --w3f-popup-overlay-blur: 6px;
  --w3f-popup-card-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
  --w3f-popup-close-color: #9ca3af;
  --w3f-popup-close-hover-color: #ef4444;
}
```

```tsx
<PopUp isOpen={open} onClose={onClose} className="mi-popup-dark">
  ...
</PopUp>
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-popup-overlay-bg` | `rgba(0,0,0,0.5)` | Color de fondo del overlay |
| `--w3f-popup-overlay-z` | `1000` | z-index del overlay |
| `--w3f-popup-overlay-blur` | `4px` | Blur del backdrop del overlay |
| `--w3f-popup-overlay-anim-duration` | `0.2s` | Duracion de la animacion del overlay |
| `--w3f-popup-container-width` | `90%` | Ancho del contenedor (ajustado por `size`) |
| `--w3f-popup-container-bg` | `var(--w3f-surface)` | Fondo del contenedor del card |
| `--w3f-popup-container-border` | `1px solid var(--w3f-outline-variant)` | Borde del contenedor |
| `--w3f-popup-container-radius` | `var(--w3f-radius-lg)` | Border radius del contenedor |
| `--w3f-popup-container-padding` | `var(--w3f-space-6)` | Padding del contenedor |
| `--w3f-popup-container-anim-duration` | `0.3s` | Duracion de la animacion de entrada |
| `--w3f-popup-close-top` | `var(--w3f-space-2)` | Posicion vertical del boton X |
| `--w3f-popup-close-right` | `var(--w3f-space-4)` | Posicion horizontal del boton X |
| `--w3f-popup-close-size` | `1.5rem` | Tamano del boton X |
| `--w3f-popup-close-color` | `var(--w3f-gray-500)` | Color del boton X |
| `--w3f-popup-close-hover-color` | `var(--w3f-danger)` | Color del boton X en hover |
| `--w3f-popup-close-transition` | `0.2s` | Duracion de la transicion del boton X |
| `--w3f-popup-card-shadow` | `var(--w3f-shadow-xl)` | Sombra del card del dialogo |

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `isOpen` | `boolean` | — | Controla la visibilidad del dialogo |
| `onClose` | `() => void` | — | Callback al cerrar (boton X, overlay, Escape) |
| `title` | `string` | — | Titulo del header del card |
| `subtitle` | `string` | — | Subtitulo del header |
| `content` | `ReactNode` | — | Contenido del cuerpo (alternativa a `children`) |
| `children` | `ReactNode` | — | Contenido del cuerpo |
| `onConfirm` | `() => void` | — | Callback del boton de confirmacion |
| `confirmText` | `string` | `'Aceptar'` | Texto del boton de confirmacion |
| `cancelText` | `string` | `'Cancelar'` | Texto del boton de cancelacion |
| `showCancel` | `boolean` | `true` | Muestra el boton de cancelacion |
| `variant` | `'default' \| 'elevated' \| 'outlined' \| 'filled'` | `'elevated'` | Variante visual del Card interno |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamano del dialogo |
| `closeOnOverlayClick` | `boolean` | `true` | Cierra al hacer clic en el overlay |
| `className` | `string` | `''` | Clases CSS para theming del wrapper |
| `footerActions` | `ReactNode` | — | Reemplaza los botones de accion por defecto |

## API

### Entrada de datos

| Canal | Prop | Descripcion |
|---|---|---|
| Visibilidad | `isOpen` | El PopUp es un componente controlado. Siempre requiere estado externo |
| Contenido | `children` / `content` | `children` tiene prioridad. `content` es alternativa para contenido dinamico |
| Acciones | `footerActions` | Si se provee, reemplaza completamente los botones `onConfirm` / `cancelText` |

### Salida de datos

| Evento | Firma | Cuando se dispara |
|---|---|---|
| `onClose` | `() => void` | Clic en boton X, clic en overlay (si `closeOnOverlayClick`), tecla Escape |
| `onConfirm` | `() => void` | Clic en el boton de confirmacion. Si no se provee, el boton llama a `onClose` |

### Renderizado con Portal

El PopUp usa `createPortal(content, document.body)` para renderizar fuera del arbol del componente padre. Esto garantiza:

- z-index correcto sin conflictos con `overflow: hidden` de ancestros
- Overlay que cubre toda la pantalla independientemente del layout
- Animaciones CSS sin interferencia del contexto de apilamiento del padre

Cuando `isOpen` es `false`, el componente retorna `null` (no se renderiza nada en el DOM).

### Prioridad de contenido

```
footerActions  →  onConfirm + showCancel   (acciones del footer)
content        →  children                  (cuerpo del dialogo, children tiene prioridad si ambos existen)
```

### Comunicacion con otros componentes

El PopUp no requiere ningun Provider. Se integra con cualquier estado externo:

```tsx
// Con useReducer
const [state, dispatch] = useReducer(reducer, initialState);

<PopUp
  isOpen={state.confirmOpen}
  onClose={() => dispatch({ type: 'CLOSE_CONFIRM' })}
  onConfirm={() => dispatch({ type: 'CONFIRM_ACTION', payload: state.pendingId })}
  title="¿Confirmar?"
  showCancel
/>
```

### Accesibilidad

| Atributo | Valor | Condicion |
|---|---|---|
| Escape | Llama a `onClose` | Cuando `isOpen` es `true` (via `usePopUpKeyboard`) |
| `aria-label` | `"Close"` | En el boton X siempre |
| `stopPropagation` | En el contenedor del card | Evita que el clic dentro cierre el modal |

### Patron de uso recomendado

```tsx
// 1. Confirmacion destructiva
<PopUp
  isOpen={deleteOpen}
  onClose={() => setDeleteOpen(false)}
  onConfirm={handleDelete}
  title="Eliminar cuenta"
  confirmText="Eliminar"
  cancelText="Cancelar"
  showCancel
  size="sm"
>
  Esta accion es permanente.
</PopUp>

// 2. Formulario en dialogo
<PopUp
  isOpen={formOpen}
  onClose={() => setFormOpen(false)}
  title="Nuevo usuario"
  size="lg"
  footerActions={
    <>
      <Button variant="text" onClick={() => setFormOpen(false)}>Cancelar</Button>
      <Button variant="raised" color="primary" type="submit" form="user-form">Crear</Button>
    </>
  }
>
  <Form id="user-form" onSubmit={handleSubmit}>
    <Input name="name" label="Nombre" />
    <Input name="email" label="Email" />
  </Form>
</PopUp>

// 3. Informacion pura
<PopUp
  isOpen={infoOpen}
  onClose={() => setInfoOpen(false)}
  title="Detalles del pedido"
  showCancel={false}
  confirmText="Cerrar"
  size="md"
>
  <OrderDetail order={selectedOrder} />
</PopUp>
```

## Estructura de archivos

```
PopUp/
  PopUp.tsx          Componente principal con createPortal
  PopUp.types.ts     PopUpProps, PopUpVariant, PopUpSize
  PopUp.constants.ts POPUP_DEFAULTS, POPUP_CLASSES
  PopUp.utils.ts     buildPopUpOverlayClasses, buildPopUpContainerClasses
  PopUp.hooks.ts     usePopUpKeyboard (Escape listener)
  README.md          Esta documentacion
```

CSS: `src/w3fussion/SURFACES/_popup.css`
