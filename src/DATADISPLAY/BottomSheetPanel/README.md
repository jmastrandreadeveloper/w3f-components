# BottomSheetPanel

Panel deslizable desde la parte inferior de la pantalla. Muestra contenido superpuesto con animacion de entrada/salida, backdrop semitransparente, area de contenido desplazable y un footer fijo opcional.

## Importacion

```tsx
import BottomSheetPanel from '@/components/DATADISPLAY/BottomSheetPanel/BottomSheetPanel';
```

## Uso basico

```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Abrir panel</Button>

<BottomSheetPanel isOpen={open} onClose={() => setOpen(false)}>
  <p>Contenido del panel</p>
</BottomSheetPanel>
```

## Con titulo y boton de cierre

```tsx
<BottomSheetPanel
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Configuracion"
  showCloseButton
>
  <p>Contenido con encabezado</p>
</BottomSheetPanel>
```

## Con footer de acciones

El footer se mantiene fijo fuera del area desplazable:

```tsx
<BottomSheetPanel
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Confirmar accion"
  showCloseButton
  footer={
    <>
      <Button variant="outline" color="secondary" onClick={() => setOpen(false)}>Cancelar</Button>
      <Button variant="raised" color="primary" onClick={handleConfirm}>Confirmar</Button>
    </>
  }
>
  <p>¿Estas seguro de que quieres continuar?</p>
</BottomSheetPanel>
```

## Tamanos predefinidos

```tsx
<BottomSheetPanel isOpen={open} onClose={close} size="small">   {/* 35vh */}
<BottomSheetPanel isOpen={open} onClose={close} size="medium">  {/* 60vh */}
<BottomSheetPanel isOpen={open} onClose={close} size="large">   {/* 85vh */}
<BottomSheetPanel isOpen={open} onClose={close} size="full">    {/* 95vh */}
<BottomSheetPanel isOpen={open} onClose={close} size="auto">    {/* calc(100vh - 64px), default */}
```

## Altura personalizada

```tsx
<BottomSheetPanel isOpen={open} onClose={close} maxHeight="70vh">
  <p>Panel con altura exacta</p>
</BottomSheetPanel>
```

## Integracion con Form / LiveForm

Cuando el footer contiene un boton de submit, el `<Form>` debe ser padre del panel para que el boton acceda al `FormContext`:

```tsx
<Form initialValues={{ name: '' }} onSubmit={handleSubmit}>
  <BottomSheetPanel
    isOpen={open}
    onClose={() => setOpen(false)}
    title="Nuevo contacto"
    footer={<Button type="submit" variant="raised" color="primary">Guardar</Button>}
  >
    <Input name="name" label="Nombre" />
  </BottomSheetPanel>
</Form>
```

## CSS Custom Properties

Aplica overrides en una clase custom o directamente en el elemento contenedor:

```css
.mi-panel-ios {
  --w3f-bsp-radius: 20px;
  --w3f-bsp-bg: #f2f2f7;
  --w3f-bsp-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  --w3f-bsp-header-border-color: rgba(0, 0, 0, 0.08);
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-bsp-backdrop-bg` | `rgba(0,0,0,0)` | Fondo del backdrop (estado cerrado) |
| `--w3f-bsp-backdrop-bg-open` | `rgba(0,0,0,0.5)` | Fondo del backdrop (estado abierto) |
| `--w3f-bsp-backdrop-z` | `1000` | z-index del backdrop |
| `--w3f-bsp-backdrop-transition` | `background-color 300ms` | Transicion del backdrop |
| `--w3f-bsp-max-width` | `640px` | Ancho maximo del panel |
| `--w3f-bsp-bg` | `var(--w3f-surface)` | Color de fondo del panel |
| `--w3f-bsp-radius` | `var(--w3f-radius-2xl)` | Radio de las esquinas superiores |
| `--w3f-bsp-shadow` | `0 -4px 20px rgba(0,0,0,0.15)` | Sombra del panel |
| `--w3f-bsp-transition` | `transform 300ms cubic-bezier(...)` | Transicion de entrada/salida |
| `--w3f-bsp-min-height` | `200px` | Altura minima del panel |
| `--w3f-bsp-header-padding` | `var(--w3f-space-6)` | Padding del encabezado |
| `--w3f-bsp-header-border-color` | `var(--w3f-outline-variant)` | Borde inferior del header |
| `--w3f-bsp-title-font-size` | `var(--w3f-text-xl)` | Tamano del titulo |
| `--w3f-bsp-title-font-weight` | `600` | Peso del titulo |
| `--w3f-bsp-title-color` | `var(--w3f-on-surface)` | Color del titulo |
| `--w3f-bsp-close-size` | `40px` | Tamano del boton de cierre |
| `--w3f-bsp-close-radius` | `var(--w3f-radius-full)` | Radio del boton de cierre |
| `--w3f-bsp-close-color` | `var(--w3f-on-surface)` | Color del icono de cierre |
| `--w3f-bsp-close-hover-bg` | `var(--w3f-gray-100)` | Fondo hover del boton de cierre |
| `--w3f-bsp-close-active-bg` | `var(--w3f-gray-200)` | Fondo active del boton de cierre |
| `--w3f-bsp-content-padding` | `var(--w3f-space-6)` | Padding del area de contenido |
| `--w3f-bsp-scrollbar-width` | `8px` | Ancho de la barra de desplazamiento |
| `--w3f-bsp-scrollbar-track-bg` | `var(--w3f-gray-100)` | Fondo del track del scrollbar |
| `--w3f-bsp-scrollbar-thumb-bg` | `var(--w3f-gray-400)` | Color del thumb del scrollbar |
| `--w3f-bsp-scrollbar-thumb-hover-bg` | `var(--w3f-gray-500)` | Color hover del thumb |
| `--w3f-bsp-footer-padding-v` | `var(--w3f-space-4)` | Padding vertical del footer |
| `--w3f-bsp-footer-padding-h` | `var(--w3f-space-6)` | Padding horizontal del footer |
| `--w3f-bsp-footer-border-color` | `var(--w3f-outline-variant)` | Borde superior del footer |
| `--w3f-bsp-footer-gap` | `var(--w3f-space-3)` | Espacio entre elementos del footer |

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `isOpen` | `boolean` | — | **Requerido.** Controla si el panel esta visible |
| `onClose` | `() => void` | — | **Requerido.** Callback al cerrar el panel |
| `children` | `ReactNode` | — | **Requerido.** Contenido desplazable dentro del panel |
| `title` | `string` | — | Titulo en el encabezado |
| `showCloseButton` | `boolean` | `true` | Mostrar boton × en el encabezado |
| `closeOnBackdropClick` | `boolean` | `true` | Cerrar al hacer clic en el backdrop |
| `closeOnEscape` | `boolean` | `true` | Cerrar al presionar Escape |
| `size` | `'auto' \| 'small' \| 'medium' \| 'large' \| 'full'` | `'auto'` | Preset de altura maxima |
| `maxHeight` | `string` | — | Altura maxima custom (tiene prioridad sobre `size`) |
| `footer` | `ReactNode` | — | Contenido fijo en la parte inferior del panel |
| `className` | `string` | `''` | Clases CSS adicionales |

## API

### Entrada de datos

El BottomSheetPanel no consume datos del usuario directamente. Es un contenedor de presentacion. Los datos fluyen hacia adentro mediante `children` y `footer`:

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Contenido desplazable | `children` | `ReactNode` | Cualquier contenido React; el area hace scroll automaticamente |
| Contenido fijo inferior | `footer` | `ReactNode` | Botones de accion, siempre visibles independientemente del scroll |
| Titulo | `title` | `string` | Texto en el encabezado del panel |

### Salida de datos

| Evento | Firma | Cuando se dispara |
|---|---|---|
| `onClose` | `() => void` | Clic en × (si `showCloseButton`), clic en backdrop (si `closeOnBackdropClick`), o tecla Escape (si `closeOnEscape`) |

El componente no emite datos propios. Los `children` o el `footer` que coloca el consumidor son responsables de cualquier salida de datos (formularios, callbacks, etc.).

### Comunicacion con otros componentes

#### Con Form / LiveForm

El BottomSheetPanel **no importa ni consume `FormContext`** directamente. Sin embargo, al colocar un `<Form>` como padre del panel, los hijos dentro del panel y los elementos del footer acceden al mismo `FormContext`:

```
Form (provee FormContext)
  └─ BottomSheetPanel
       ├─ children: Input, Select, etc. (leen FormContext)
       └─ footer: Button type="submit" (accede a FormContext.handleSubmit)
```

Si el `<Form>` es hijo del panel (en lugar de padre), el footer quedaria fuera del contexto.

#### Independiente (sin contexto requerido)

El panel funciona completamente autonomo. No requiere ningun Provider:

```tsx
<BottomSheetPanel isOpen={open} onClose={() => setOpen(false)}>
  <p>Contenido independiente</p>
</BottomSheetPanel>
```

### Accesibilidad

| Atributo | Valor | Elemento |
|---|---|---|
| `role` | `"dialog"` | Panel (.bottom-sheet-panel) |
| `aria-modal` | `"true"` | Panel |
| `aria-labelledby` | `"bottom-sheet-title"` | Panel (solo cuando `title` esta definido) |
| `id` | `"bottom-sheet-title"` | `<h3>` del titulo |
| `aria-label` | `"Cerrar panel"` | Boton × |
| `tabIndex` | `-1` | Panel (para recibir foco programatico al abrir) |
| `role` | `"presentation"` | Backdrop |

El foco se mueve al panel al abrirse y regresa al elemento que lo tenia antes al cerrarse (`previousFocusRef`).

Cuando `isOpen` cambia a `true` y `closeOnEscape` esta activo, un listener global en `document` intercepta `keydown` para cerrar con Escape. El scroll del `document.body` se bloquea mientras el panel esta abierto.

### Patron de uso recomendado

```tsx
// 1. Sheet simple de informacion
<BottomSheetPanel isOpen={open} onClose={close} title="Detalles" showCloseButton>
  <DetallesProducto producto={producto} />
</BottomSheetPanel>

// 2. Sheet de confirmacion con footer de acciones
<BottomSheetPanel
  isOpen={open}
  onClose={close}
  title="Eliminar elemento"
  size="small"
  footer={
    <>
      <Button variant="outline" color="secondary" onClick={close}>Cancelar</Button>
      <Button variant="raised" color="danger" onClick={handleDelete}>Eliminar</Button>
    </>
  }
>
  <p>Esta accion no se puede deshacer.</p>
</BottomSheetPanel>

// 3. Sheet con formulario
<Form initialValues={initialValues} onSubmit={onSubmit}>
  <BottomSheetPanel
    isOpen={open}
    onClose={close}
    title="Nuevo elemento"
    size="large"
    footer={
      <>
        <Button variant="outline" onClick={close}>Cancelar</Button>
        <Button type="submit" variant="raised" color="primary">Guardar</Button>
      </>
    }
  >
    <Input name="nombre" label="Nombre" />
    <Input name="descripcion" label="Descripcion" />
  </BottomSheetPanel>
</Form>

// 4. Sheet con contenido largo (scroll automatico)
<BottomSheetPanel isOpen={open} onClose={close} title="Terminos" size="medium"
  footer={<Button variant="raised" color="success" onClick={close}>Aceptar</Button>}
>
  {Array.from({ length: 20 }, (_, i) => <p key={i}>Parrafo {i + 1}...</p>)}
</BottomSheetPanel>
```

## Estructura de archivos

```
BottomSheetPanel/
  BottomSheetPanel.tsx          Componente principal
  BottomSheetPanel.types.ts     Interfaces TypeScript (BottomSheetPanelProps, BottomSheetSize)
  BottomSheetPanel.constants.ts SIZE_MAX_HEIGHTS, BSP_DEFAULTS
  BottomSheetPanel.utils.ts     getMaxHeight()
  BottomSheetPanel.hooks.ts     useBottomSheetAnimation, useScrollLock, useEscapeKey
  README.md                     Esta documentacion
```

CSS: `src/w3fussion/DATADISPLAY/_bottom-sheet-panel.css`
