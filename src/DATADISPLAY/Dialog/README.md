# Modal (Dialog)

Dialogo modal superpuesto con backdrop, cabecera con variantes de color, cuerpo desplazable y footer opcional. Incluye tres variantes listas para usar: `Modal` (completo), `ModalSimple` (sin footer) y `ModalConfirm` (confirmacion con dos botones).

## Importacion

```tsx
import Modal from '@/components/DATADISPLAY/Dialog/Modal';
import ModalConfirm from '@/components/DATADISPLAY/Dialog/ModalConfirm';
import ModalSimple from '@/components/DATADISPLAY/Dialog/ModalSimple';
import ModalWithData from '@/components/DATADISPLAY/Dialog/ModalWithData';
```

## Uso basico

```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Abrir modal</Button>

<Modal show={open} onClose={() => setOpen(false)} title="Titulo del modal">
  <p>Contenido del modal</p>
</Modal>
```

## Con footer de acciones

```tsx
<Modal
  show={open}
  onClose={() => setOpen(false)}
  title="Guardar cambios"
  footer={
    <>
      <Button variant="outline" color="secondary" onClick={() => setOpen(false)}>Cancelar</Button>
      <Button variant="raised" color="primary" onClick={handleSave}>Guardar</Button>
    </>
  }
>
  <p>¿Deseas guardar los cambios antes de salir?</p>
</Modal>
```

## Tamanos

```tsx
<Modal show={open} onClose={close} title="Pequeno" size="sm">  {/* max-width: 400px */}
<Modal show={open} onClose={close} title="Mediano" size="md">  {/* max-width: 600px, default */}
<Modal show={open} onClose={close} title="Grande"  size="lg">  {/* max-width: 800px */}
```

## Variantes de header

El prop `headerVariant` colorea el encabezado del modal:

```tsx
<Modal show={open} onClose={close} title="Primary"   headerVariant="primary" />
<Modal show={open} onClose={close} title="Success"   headerVariant="success" />
<Modal show={open} onClose={close} title="Warning"   headerVariant="warning" />
<Modal show={open} onClose={close} title="Danger"    headerVariant="danger" />
<Modal show={open} onClose={close} title="Info"      headerVariant="info" />
<Modal show={open} onClose={close} title="Secondary" headerVariant="secondary" />
```

## ModalConfirm (preset de confirmacion)

Dialogo de confirmacion con boton de cancelar y confirmar preconfigurados:

```tsx
<ModalConfirm
  show={open}
  onClose={() => setOpen(false)}
  onConfirm={handleDelete}
  title="¿Eliminar elemento?"
  message="Esta accion no se puede deshacer."
  confirmText="Eliminar"
  cancelText="Cancelar"
  variant="danger"
/>
```

## ModalSimple (preset sin footer)

Wrapper simplificado para modales informativos sin acciones:

```tsx
<ModalSimple show={open} onClose={() => setOpen(false)} title="Informacion">
  <p>Texto informativo sin botones de accion.</p>
</ModalSimple>
```

## ModalWithData (preset de datos de usuario)

Modal especializado para mostrar datos estructurados de un usuario:

```tsx
const data = { name: 'Ana Garcia', email: 'ana@example.com', phone: '+34 600 000 000' };

<ModalWithData
  show={open}
  onClose={() => setOpen(false)}
  title="Detalles del usuario"
  data={data}
/>
```

## CSS Custom Properties

El Modal usa variables del sistema W3Fussion. No tiene variables `--w3f-modal-*` propias, pero respeta todas las variables globales del framework:

```css
/* El modal hereda estas variables del tema global */
--w3f-surface          /* fondo del card */
--w3f-on-surface       /* color de texto */
--w3f-radius-xl        /* border-radius del card */
--w3f-shadow-xl        /* sombra del card */
--w3f-primary          /* color del header (por defecto) */
--w3f-on-primary       /* color del texto del header */
--w3f-surface-variant  /* fondo del footer */
--w3f-outline-variant  /* borde del footer */
```

Para temas custom, sobreescribe las variables del framework en un selector padre:

```css
.mi-contexto {
  --w3f-primary: #6366f1;
  --w3f-on-primary: #ffffff;
  --w3f-radius-xl: 8px;
}
```

## Props — Modal

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `show` | `boolean` | — | **Requerido.** Controla visibilidad del modal |
| `onClose` | `() => void` | — | **Requerido.** Callback al cerrar |
| `title` | `ReactNode` | — | **Requerido.** Titulo en el encabezado |
| `children` | `ReactNode` | — | **Requerido.** Contenido del cuerpo |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamano del modal |
| `closeOnBackdrop` | `boolean` | `true` | Cerrar al hacer clic en el backdrop |
| `showCloseButton` | `boolean` | `true` | Mostrar boton × en el encabezado |
| `footer` | `ReactNode` | — | Contenido del footer (botones de accion) |
| `headerVariant` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'primary'` | Color del encabezado |

## Props — ModalConfirm

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `show` | `boolean` | — | **Requerido.** Controla visibilidad |
| `onClose` | `() => void` | — | **Requerido.** Callback al cancelar o cerrar |
| `onConfirm` | `() => void` | — | **Requerido.** Callback al confirmar |
| `title` | `string` | `'¿Estas seguro?'` | Titulo del dialogo |
| `message` | `ReactNode` | — | **Requerido.** Mensaje de confirmacion |
| `confirmText` | `string` | `'Confirmar'` | Texto del boton de confirmar |
| `cancelText` | `string` | `'Cancelar'` | Texto del boton de cancelar |
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'danger'` | Color del boton de confirmar |

## Props — ModalSimple

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `show` | `boolean` | — | **Requerido.** Controla visibilidad |
| `onClose` | `() => void` | — | **Requerido.** Callback al cerrar |
| `title` | `ReactNode` | — | **Requerido.** Titulo del modal |
| `children` | `ReactNode` | — | **Requerido.** Contenido del cuerpo |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamano del modal |

## Props — ModalWithData

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `show` | `boolean` | — | **Requerido.** Controla visibilidad |
| `onClose` | `() => void` | — | **Requerido.** Callback al cerrar |
| `title` | `ReactNode` | — | **Requerido.** Titulo del modal |
| `data` | `UserData \| null` | — | **Requerido.** Objeto `{ name, email, phone? }` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamano del modal |

## API

### Entrada de datos

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Contenido | `children` | `ReactNode` | Cuerpo del modal — formularios, texto, tablas, etc. |
| Titulo | `title` | `ReactNode` | Acepta texto plano o JSX |
| Footer | `footer` | `ReactNode` | Botones de accion renderizados fuera del scroll |
| Datos estructurados | `data` | `UserData \| null` | Solo en `ModalWithData`. Muestra name, email, phone |

### Salida de datos

| Evento | Firma | Componente | Cuando se dispara |
|---|---|---|---|
| `onClose` | `() => void` | Modal, todos | Clic en ×, clic en backdrop (si habilitado), tecla Escape |
| `onConfirm` | `() => void` | ModalConfirm | Clic en el boton de confirmar (ademas llama `onClose`) |

El Modal no produce datos propios. Los `children` son responsables de cualquier interaccion con datos (formularios, callbacks, etc.).

### Comunicacion con otros componentes

#### Usa Button internamente

`Modal` y `ModalConfirm` importan `Button` de `INPUTS/Button/Button` para el boton de cierre y los botones de accion de confirmacion.

#### Con Form / LiveForm

El Modal **no consume `FormContext`** directamente. Para usar formularios dentro del modal, coloca el `<Form>` dentro de `children`:

```tsx
<Modal show={open} onClose={close} title="Nuevo usuario"
  footer={<Button type="submit" form="modal-form">Guardar</Button>}
>
  <Form id="modal-form" initialValues={{ name: '' }} onSubmit={handleSubmit}>
    <Input name="name" label="Nombre" />
  </Form>
</Modal>
```

#### Independiente (sin contexto requerido)

El Modal no requiere ningun Provider ni Context para funcionar:

```tsx
<Modal show={open} onClose={() => setOpen(false)} title="Simple">
  <p>Funciona en cualquier parte del arbol React</p>
</Modal>
```

### Accesibilidad

| Atributo | Valor | Elemento |
|---|---|---|
| `role` | `"dialog"` | `.w3f-modal-card` |
| `aria-modal` | `"true"` | `.w3f-modal-card` |
| `aria-labelledby` | `"modal-title"` | `.w3f-modal-card` |
| `id` | `"modal-title"` | `<h2>` del titulo |
| `aria-label` | `"Cerrar modal"` | Boton × |

Cuando `show` cambia a `true`, el hook `useModal` agrega `w3f-modal-open` al `body` (bloquea scroll) y mueve el foco al primer elemento focusable dentro del modal. Al cerrar, remueve la clase.

La tecla Escape cierra el modal via `useEscapeKey` — el listener se registra en `document` y se limpia al desmontar.

### Patron de uso recomendado

```tsx
// 1. Modal informativo basico
<Modal show={open} onClose={close} title="Aviso">
  <p>Tu sesion expirara en 5 minutos.</p>
</Modal>

// 2. Modal de confirmacion de accion destructiva
<ModalConfirm
  show={open}
  onClose={close}
  onConfirm={handleDelete}
  title="¿Eliminar cuenta?"
  message="Todos tus datos seran eliminados permanentemente."
  variant="danger"
/>

// 3. Modal con formulario de edicion
<Modal
  show={open}
  onClose={close}
  title="Editar perfil"
  size="lg"
  footer={
    <>
      <Button variant="outline" onClick={close}>Cancelar</Button>
      <Button variant="raised" color="primary" onClick={handleSave}>Guardar</Button>
    </>
  }
>
  <Input label="Nombre" value={name} onChange={setName} />
  <Input label="Email" value={email} onChange={setEmail} />
</Modal>

// 4. Modal simple de ayuda
<ModalSimple show={open} onClose={close} title="Ayuda">
  <p>Aqui puedes encontrar informacion sobre como usar esta funcion.</p>
</ModalSimple>
```

## Estructura de archivos

```
Dialog/
  Modal.tsx            Componente principal con animacion y backdrop
  Modal.types.ts       Interfaces: ModalProps, ModalConfirmProps, ModalSimpleProps, ModalWithDataProps
  Modal.hooks.ts       useModal (scroll lock + foco), useEscapeKey
  ModalConfirm.tsx     Preset: dialogo de confirmacion
  ModalSimple.tsx      Preset: modal sin footer
  ModalWithData.tsx    Preset: visualizacion de datos de usuario
  README.md            Esta documentacion
```

CSS: `src/w3fussion/DATADISPLAY/_modal.css`
