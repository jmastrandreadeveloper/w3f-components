# Capítulo 16 — Surfaces: Accordion, PopUp, Menu, Window

**Nivel:** 3 — Avanzado
**Capítulo:** 16 de 28

---

## ¿Qué vas a aprender?

1. `Accordion` — paneles colapsables con variantes, colores, íconos y acciones
2. `PopUp` — diálogos modales con confirmación, tamaños y footer personalizable
3. `Menu` / `MenuBarCategory` — menú desplegable tipo barra de aplicación con sub-ítems
4. `Window` — ventana OS-style arrastrable, redimensionable y con estilos macOS/Windows

---

## Conceptos

Los **surfaces** son componentes de "contenedor elevado": no son layout en el sentido estructural, sino capas que aparecen por encima del contenido normal — paneles, diálogos, ventanas. Son los responsables de organizar interacciones complejas en un espacio delimitado.

---

## Accordion

Paneles colapsables. Cada panel tiene un summary (encabezado clicable), un detalle (contenido) y opcionalmente acciones (botones de pie).

```
packages/components/src/SURFACES/Acordion/Accordion.tsx
```

> Nota: la carpeta se llama `Acordion/` (un solo `c`), es el nombre legacy del directorio. El import usa ese path.

### Uso básico

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
} from '@w3f/components/SURFACES/Acordion/Accordion';

function FAQ() {
  return (
    <Accordion>
      <AccordionItem id="q1">
        <AccordionSummary>¿Qué es W3F?</AccordionSummary>
        <AccordionDetails>
          W3Fussion es un framework CSS + React con sistema de diseño completo.
        </AccordionDetails>
      </AccordionItem>

      <AccordionItem id="q2">
        <AccordionSummary>¿Cómo instalo?</AccordionSummary>
        <AccordionDetails>
          Cloná el repo y ejecutá pnpm install.
        </AccordionDetails>
      </AccordionItem>
    </Accordion>
  );
}
```

**Regla clave:** cada `AccordionItem` requiere un `id` único (string). El `Accordion` padre lo usa internamente para rastrear cuál panel está abierto.

### prop `multiple` — varios paneles abiertos a la vez

Por defecto solo un panel puede estar expandido. Con `multiple`, varios pueden estar abiertos simultáneamente:

```tsx
<Accordion multiple>
  <AccordionItem id="a">
    <AccordionSummary>Panel A</AccordionSummary>
    <AccordionDetails>Permanece abierto cuando B se expande.</AccordionDetails>
  </AccordionItem>
  <AccordionItem id="b">
    <AccordionSummary>Panel B</AccordionSummary>
    <AccordionDetails>Ambos pueden estar abiertos juntos.</AccordionDetails>
  </AccordionItem>
</Accordion>
```

### Íconos y colores

`AccordionSummary` acepta la prop `icon` (cualquier `ReactNode`). `AccordionItem` acepta `color` para resaltar el ítem:

```tsx
import { Settings, Users, Shield } from 'lucide-react';

<Accordion>
  <AccordionItem id="cfg" color="primary">
    <AccordionSummary icon={<Settings size={18} />}>Configuración</AccordionSummary>
    <AccordionDetails>Preferencias de la aplicación.</AccordionDetails>
  </AccordionItem>

  <AccordionItem id="usr" color="success">
    <AccordionSummary icon={<Users size={18} />}>Usuarios</AccordionSummary>
    <AccordionDetails>Gestión de cuentas y roles.</AccordionDetails>
  </AccordionItem>

  <AccordionItem id="sec" color="danger">
    <AccordionSummary icon={<Shield size={18} />}>Seguridad</AccordionSummary>
    <AccordionDetails>Autenticación y claves API.</AccordionDetails>
  </AccordionItem>
</Accordion>
```

Colores disponibles para `AccordionItem`: `primary` | `success` | `warning` | `danger` | `info`

### AccordionActions — botones de pie

`AccordionActions` va dentro de `AccordionItem`, después de `AccordionDetails`. El botón "Cerrar" conectado dentro de `AccordionActions` colapsa el panel automáticamente (el `closePanel` se inyecta internamente):

```tsx
<Accordion variant="elevated">
  <AccordionItem id="new-user" color="primary">
    <AccordionSummary>Agregar usuario</AccordionSummary>
    <AccordionDetails>
      Completá el formulario para crear un nuevo usuario.
    </AccordionDetails>
    <AccordionActions>
      <Button variant="outlined" size="sm">Cancelar</Button>
      <Button variant="raised" size="sm" color="primary">Guardar</Button>
    </AccordionActions>
  </AccordionItem>
</Accordion>
```

### Contenido complejo en AccordionDetails

`AccordionDetails` acepta cualquier `ReactNode`. Usá `Stack` para estructurar formularios o listas sin CSS extra:

```tsx
import Stack from '@w3f/components/LAYOUT/Stack/Stack';
import { Input } from '@w3f/components/INPUTS/Input/Input';

<AccordionItem id="settings" color="primary">
  <AccordionSummary icon={<Settings size={18} />}>Ajustes generales</AccordionSummary>
  <AccordionDetails>
    <Stack gap="0.75rem">
      <Input name="username" label="Usuario" />
      <Input name="email"    label="Email" />
      <Stack horizontal gap="0.75rem" justify="end">
        <Button variant="text" size="sm">Resetear</Button>
        <Button variant="raised" size="sm" color="primary">Guardar</Button>
      </Stack>
    </Stack>
  </AccordionDetails>
</AccordionItem>
```

### Item deshabilitado

```tsx
<AccordionItem id="locked" disabled>
  <AccordionSummary disabled>Panel bloqueado</AccordionSummary>
  <AccordionDetails>Este contenido no es accesible.</AccordionDetails>
</AccordionItem>
```

### Variantes y tamaños

```tsx
<Accordion variant="default"    size="sm">...</Accordion>  {/* default */}
<Accordion variant="outlined"   size="md">...</Accordion>
<Accordion variant="elevated"   size="lg">...</Accordion>
<Accordion variant="borderless" size="md">...</Accordion>
```

### Referencia rápida — Accordion

| Componente | Prop principal | Tipo | Descripción |
|---|---|---|---|
| `Accordion` | `multiple` | `boolean` | Varios paneles abiertos a la vez |
| `Accordion` | `variant` | `'default' \| 'outlined' \| 'borderless' \| 'elevated'` | Estilo visual |
| `Accordion` | `size` | `'sm' \| 'md' \| 'lg'` | Tamaño |
| `AccordionItem` | `id` | `string` | **Requerido.** Identificador único |
| `AccordionItem` | `color` | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | Color del ítem |
| `AccordionItem` | `disabled` | `boolean` | Deshabilita el panel |
| `AccordionSummary` | `icon` | `ReactNode` | Ícono a la izquierda del texto |

---

## PopUp

Diálogo modal con overlay. Ideal para confirmaciones, alertas, formularios cortos.

```
packages/components/src/SURFACES/PopUp/PopUp.tsx
```

### Uso básico

```tsx
import { PopUp } from '@w3f/components/SURFACES/PopUp/PopUp';
import { useState } from 'react';

function EjemploBasico() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir diálogo</Button>

      <PopUp
        isOpen={open}
        onClose={() => setOpen(false)}
        closeOnOverlayClick
      >
        Contenido del diálogo. Click en el overlay para cerrar.
      </PopUp>
    </>
  );
}
```

`isOpen` y `onClose` son las dos props mínimas obligatorias.

### Diálogo de confirmación

```tsx
<PopUp
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Confirmar eliminación"
  confirmText="Eliminar"
  cancelText="Cancelar"
  showCancel
  onConfirm={handleDelete}
  closeOnOverlayClick
>
  Esta acción no se puede deshacer.
</PopUp>
```

El botón de confirmación llama `onConfirm` y luego cierra el diálogo. El de cancelar llama `onClose`.

### Tamaños

```tsx
<PopUp isOpen={open} onClose={close} title="Compacto"  size="sm" showCancel />
<PopUp isOpen={open} onClose={close} title="Normal"    size="md" showCancel />  {/* default */}
<PopUp isOpen={open} onClose={close} title="Amplio"    size="lg" showCancel />
```

### Footer personalizado — prop `footerActions`

Cuando los botones por defecto (Confirmar/Cancelar) no alcanzan, usá `footerActions` para reemplazarlos por completo:

```tsx
<PopUp
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Configuración de usuario"
  footerActions={
    <>
      <Button variant="text"     onClick={handleReset}>Resetear</Button>
      <Button variant="outlined" onClick={() => setOpen(false)}>Cancelar</Button>
      <Button variant="raised"   color="primary" onClick={handleSave}>Guardar</Button>
    </>
  }
>
  <ContenidoFormulario />
</PopUp>
```

### Variantes

```tsx
<PopUp variant="default"  .../>  {/* default */}
<PopUp variant="elevated" .../>
<PopUp variant="outlined" .../>
<PopUp variant="filled"   .../>
```

### Referencia rápida — PopUp

| Prop | Tipo | Descripción |
|---|---|---|
| `isOpen` | `boolean` | **Requerido.** Controla visibilidad |
| `onClose` | `() => void` | **Requerido.** Callback de cierre |
| `title` | `string` | Título del header |
| `subtitle` | `string` | Subtítulo debajo del título |
| `children` | `ReactNode` | Cuerpo del diálogo |
| `content` | `ReactNode` | Alternativa a `children` |
| `onConfirm` | `() => void` | Acción del botón primario |
| `confirmText` | `string` | Texto del botón confirmar (default: "Confirm") |
| `cancelText` | `string` | Texto del botón cancelar (default: "Cancel") |
| `showCancel` | `boolean` | Muestra el botón de cancelar |
| `closeOnOverlayClick` | `boolean` | Cerrar al clickear el overlay |
| `footerActions` | `ReactNode` | Reemplaza los botones default |
| `size` | `'sm' \| 'md' \| 'lg'` | Tamaño del diálogo |
| `variant` | `'default' \| 'elevated' \| 'outlined' \| 'filled'` | Estilo visual |

---

## Menu / MenuBarCategory

Menú desplegable tipo barra de aplicación. Puede usarse standalone o encadenado para armar una barra de menú completa (estilo File/Edit/View).

```
packages/components/src/SURFACES/Menu/Menu.tsx
```

### Uso básico

```tsx
import { MenuBarCategory } from '@w3f/components/SURFACES/Menu/Menu';
import type { MenuItemData } from '@w3f/components/SURFACES/Menu/Menu.types';

const items: MenuItemData[] = [
  { label: 'Nuevo archivo', id: 'new' },
  { label: 'Abrir',         id: 'open' },
  { label: 'Guardar',       id: 'save' },
];

<MenuBarCategory
  label="Archivo"
  items={items}
  onSelect={(label) => console.log('Seleccionado:', label)}
/>
```

Click en "Archivo" abre el dropdown. Click en un ítem llama `onSelect` con el `label` del ítem y cierra el dropdown.

### Sub-ítems — menú anidado

`MenuItemData` tiene un campo `subItems?: MenuItemData[]` para crear sub-menús:

```tsx
const editItems: MenuItemData[] = [
  { label: 'Deshacer',    id: 'undo' },
  { label: 'Rehacer',     id: 'redo' },
  {
    label: 'Insertar',
    id: 'insert',
    subItems: [
      { label: 'Tabla',   id: 'table' },
      { label: 'Imagen',  id: 'image' },
      { label: 'Link',    id: 'link' },
    ],
  },
];

<MenuBarCategory label="Editar" items={editItems} onSelect={handleSelect} />
```

### Barra de menú completa

Combiná varios `MenuBarCategory` en un `Stack` horizontal para armar una barra de aplicación:

```tsx
import Stack from '@w3f/components/LAYOUT/Stack/Stack';

const fileItems: MenuItemData[] = [
  { label: 'Nuevo',   id: 'new' },
  { label: 'Abrir',   id: 'open' },
  { label: 'Guardar', id: 'save' },
  { label: 'Cerrar',  id: 'close' },
];

const viewItems: MenuItemData[] = [
  { label: 'Zoom +', id: 'zoomIn'  },
  { label: 'Zoom -', id: 'zoomOut' },
  { label: 'Pantalla completa', id: 'fullscreen' },
];

function MenuBar() {
  const handleSelect = (label: string) => console.log('Acción:', label);

  return (
    <Stack
      as="nav"
      horizontal
      gap="0"
      style={{ background: '#1f2937', padding: '0 8px', borderRadius: '8px' }}
    >
      <MenuBarCategory label="Archivo" items={fileItems} onSelect={handleSelect} />
      <MenuBarCategory label="Editar"  items={editItems} onSelect={handleSelect} />
      <MenuBarCategory label="Vista"   items={viewItems} onSelect={handleSelect} />
    </Stack>
  );
}
```

### Posición del dropdown

Control de hacia dónde se abre el menú:

```tsx
<MenuBarCategory label="Izquierda" items={items} position="left" />    {/* default */}
<MenuBarCategory label="Centro"    items={items} position="center" />
<MenuBarCategory label="Derecha"   items={items} position="right" />
<MenuBarCategory label="Arriba"    items={items} position="top" />
```

### Referencia rápida — MenuBarCategory

| Prop | Tipo | Descripción |
|---|---|---|
| `label` | `string` | **Requerido.** Texto del botón disparador |
| `items` | `MenuItemData[]` | **Requerido.** Lista de ítems del menú |
| `onSelect` | `(label: string) => void` | Callback al seleccionar un ítem |
| `position` | `'left' \| 'right' \| 'center' \| 'top'` | Dirección del dropdown |

**`MenuItemData`:**

| Campo | Tipo | Descripción |
|---|---|---|
| `label` | `string` | **Requerido.** Texto visible |
| `id` | `string \| number` | Identificador (opcional pero recomendado) |
| `subItems` | `MenuItemData[]` | Sub-menú anidado |
| `onClick` | `(label: string) => void` | Callback propio del ítem (alternativa a `onSelect` global) |

---

## Window

Ventana OS-style con barra de título, drag, resize, minimize, maximize y close. Tres estilos de OS: `windows`, `macos`, `linux`.

```
packages/components/src/SURFACES/Window/Window.tsx
```

### Uso básico

```tsx
import { useState } from 'react';
import Window from '@w3f/components/SURFACES/Window/Window';

function EjemploVentana() {
  const [open, setOpen] = useState(true);

  return (
    <>
      {!open && (
        <Button onClick={() => setOpen(true)}>Reabrir ventana</Button>
      )}

      {open && (
        <Window
          title="Mi ventana"
          draggable
          closable
          onClose={() => setOpen(false)}
          initialPosition={{ x: 40, y: 100 }}
          initialSize={{ width: 400, height: 250 }}
        >
          <p>Arrastrá la barra de título para mover la ventana.</p>
        </Window>
      )}
    </>
  );
}
```

`Window` se renderiza en `position: fixed` (o absolute según contexto). `initialPosition` y `initialSize` son puntos de partida; el usuario puede mover y redimensionar desde ahí.

### Estilos de OS

```tsx
{/* macOS — botones de tráfico (close/min/max) a la izquierda */}
<Window
  title="Finder"
  osStyle="macos"
  draggable closable minimizable maximizable
  onClose={handleClose}
  initialPosition={{ x: 40, y: 150 }}
  initialSize={{ width: 400, height: 250 }}
>
  <p>Ventana estilo macOS.</p>
</Window>

{/* Windows — íconos a la derecha */}
<Window
  title="Explorador"
  osStyle="windows"
  draggable closable minimizable maximizable
  onClose={handleClose}
  initialPosition={{ x: 480, y: 150 }}
  initialSize={{ width: 400, height: 250 }}
>
  <p>Ventana estilo Windows.</p>
</Window>
```

### Redimensionable

Agregá `resizable` para habilitar los handles de resize en los 8 bordes/esquinas:

```tsx
<Window
  title="Editor"
  osStyle="windows"
  draggable
  resizable
  closable minimizable maximizable
  onClose={handleClose}
  initialSize={{ width: 500, height: 350 }}
>
  <p>Arrastrá cualquier borde o esquina para redimensionar.</p>
</Window>
```

### Footer con botones de acción

La prop `buttons` agrega botones en el footer de la ventana:

```tsx
<Window
  title="Guardar cambios"
  osStyle="windows"
  draggable
  closable
  onClose={() => setOpen(false)}
  buttons={[
    { text: 'Cancelar', variant: 'text',   color: 'gray',    onClick: () => setOpen(false) },
    { text: 'Guardar',  variant: 'raised', color: 'primary', onClick: handleSave },
  ]}
  footerAlign="end"
>
  <p>Tenés cambios sin guardar.</p>
</Window>
```

`footerAlign`: `'start'` | `'center'` | `'end'`

### Callbacks de ciclo de vida

```tsx
<Window
  title="Dashboard"
  osStyle="macos"
  draggable closable minimizable maximizable
  onClose={() => setOpen(false)}
  onMinimize={(minimized) => console.log('minimized:', minimized)}
  onMaximize={(maximized) => console.log('maximized:', maximized)}
  onFocus={() => console.log('ventana enfocada')}
>
  ...
</Window>
```

### Footer como ReactNode — prop `footer`

Alternativa a `buttons` para contenido de footer completamente libre:

```tsx
<Window
  title="Detalles"
  draggable closable
  onClose={handleClose}
  footer={
    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
      <Badge color="success">Guardado</Badge>
      <Button variant="raised" color="primary" onClick={handleSave}>Actualizar</Button>
    </div>
  }
>
  <ContenidoDetalle />
</Window>
```

### Referencia rápida — Window

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `title` | `string` | — | Texto de la barra de título |
| `osStyle` | `'windows' \| 'macos' \| 'linux'` | `'windows'` | Estilo de controles de la ventana |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | — | Tamaño predefinido (alternativa a `initialSize`) |
| `draggable` | `boolean` | `false` | Permite arrastrar por la barra de título |
| `resizable` | `boolean` | `false` | Handles de resize en bordes/esquinas |
| `minimizable` | `boolean` | `false` | Muestra botón de minimizar |
| `maximizable` | `boolean` | `false` | Muestra botón de maximizar |
| `closable` | `boolean` | `false` | Muestra botón de cerrar |
| `modal` | `boolean` | `false` | Agrega overlay de fondo |
| `onClose` | `() => void` | — | Callback al cerrar |
| `onMinimize` | `(minimized: boolean) => void` | — | Callback al minimizar/restaurar |
| `onMaximize` | `(maximized: boolean) => void` | — | Callback al maximizar/restaurar |
| `onFocus` | `() => void` | — | Callback al enfocar la ventana |
| `initialPosition` | `{ x: number, y: number }` | — | Posición inicial en pixels |
| `initialSize` | `{ width: number, height: number }` | — | Tamaño inicial en pixels |
| `buttons` | `WindowButtonConfig[]` | — | Botones en el footer |
| `footer` | `ReactNode` | — | Footer libre (alternativa a `buttons`) |
| `footerAlign` | `'start' \| 'center' \| 'end'` | `'end'` | Alineación de los botones del footer |
| `noPadding` | `boolean` | `false` | Elimina el padding del body de la ventana |
| `icon` | `ReactNode` | — | Ícono en la barra de título |

---

## Ejercicio práctico

Construí un panel de administración con:

1. Un `MenuBarCategory` "Acciones" con ítems: Nuevo usuario, Exportar CSV, Configuración
2. Al seleccionar "Configuración", abrí un `PopUp` con título "Configuración del sistema" y botones "Cancelar" + "Guardar"
3. Al seleccionar "Nuevo usuario", abrí una `Window` estilo `windows` con un formulario básico (nombre, email)
4. Un `Accordion` con `multiple` que liste 3 secciones de FAQ

**Solución:**

```tsx
import { useState } from 'react';
import { MenuBarCategory } from '@w3f/components/SURFACES/Menu/Menu';
import { PopUp }           from '@w3f/components/SURFACES/PopUp/PopUp';
import Window              from '@w3f/components/SURFACES/Window/Window';
import {
  Accordion, AccordionItem, AccordionSummary, AccordionDetails,
} from '@w3f/components/SURFACES/Acordion/Accordion';
import Stack  from '@w3f/components/LAYOUT/Stack/Stack';
import Button from '@w3f/components/INPUTS/Button/Button';
import { Input } from '@w3f/components/INPUTS/Input/Input';

const menuItems = [
  { label: 'Nuevo usuario',  id: 'new-user' },
  { label: 'Exportar CSV',   id: 'export' },
  { label: 'Configuración',  id: 'settings' },
];

export function AdminPanel() {
  const [configOpen, setConfigOpen] = useState(false);
  const [userWinOpen, setUserWinOpen] = useState(false);

  function handleSelect(label: string) {
    if (label === 'Configuración') setConfigOpen(true);
    if (label === 'Nuevo usuario')  setUserWinOpen(true);
  }

  return (
    <Stack gap="1.5rem">
      {/* Barra de menú */}
      <Stack as="nav" horizontal gap="0"
        style={{ background: '#1f2937', padding: '0 8px', borderRadius: '8px', width: 'fit-content' }}
      >
        <MenuBarCategory label="Acciones" items={menuItems} onSelect={handleSelect} />
      </Stack>

      {/* FAQ Accordion */}
      <Accordion multiple variant="outlined">
        <AccordionItem id="faq-1">
          <AccordionSummary>¿Cómo agrego un usuario?</AccordionSummary>
          <AccordionDetails>
            Usá el menú Acciones → Nuevo usuario para abrir el formulario.
          </AccordionDetails>
        </AccordionItem>
        <AccordionItem id="faq-2">
          <AccordionSummary>¿Cómo exporto datos?</AccordionSummary>
          <AccordionDetails>
            Acciones → Exportar CSV descarga un archivo con todos los registros.
          </AccordionDetails>
        </AccordionItem>
        <AccordionItem id="faq-3">
          <AccordionSummary>¿Puedo personalizar el sistema?</AccordionSummary>
          <AccordionDetails>
            Sí, desde Acciones → Configuración podés ajustar todas las opciones.
          </AccordionDetails>
        </AccordionItem>
      </Accordion>

      {/* PopUp de configuración */}
      <PopUp
        isOpen={configOpen}
        onClose={() => setConfigOpen(false)}
        title="Configuración del sistema"
        confirmText="Guardar"
        cancelText="Cancelar"
        showCancel
        onConfirm={() => { console.log('guardado'); setConfigOpen(false); }}
        closeOnOverlayClick
      >
        Ajustá los parámetros del sistema desde aquí.
      </PopUp>

      {/* Window de nuevo usuario */}
      {userWinOpen && (
        <Window
          title="Nuevo usuario"
          osStyle="windows"
          draggable
          closable
          onClose={() => setUserWinOpen(false)}
          initialPosition={{ x: 100, y: 200 }}
          initialSize={{ width: 420, height: 300 }}
          buttons={[
            { text: 'Cancelar', variant: 'text',   onClick: () => setUserWinOpen(false) },
            { text: 'Crear',    variant: 'raised', color: 'primary', onClick: () => setUserWinOpen(false) },
          ]}
          footerAlign="end"
        >
          <Stack gap="0.75rem">
            <Input name="nombre" label="Nombre completo" />
            <Input name="email"  label="Email" />
          </Stack>
        </Window>
      )}
    </Stack>
  );
}
```

---

## Referencia rápida — imports

```tsx
// Accordion
import {
  Accordion, AccordionItem, AccordionSummary, AccordionDetails, AccordionActions,
} from '@w3f/components/SURFACES/Acordion/Accordion';

// PopUp
import { PopUp } from '@w3f/components/SURFACES/PopUp/PopUp';

// Menu
import { MenuBarCategory } from '@w3f/components/SURFACES/Menu/Menu';
import type { MenuItemData } from '@w3f/components/SURFACES/Menu/Menu.types';

// Window
import Window from '@w3f/components/SURFACES/Window/Window';
```

---

## En Next.js

`Accordion`, `PopUp`, `MenuBarCategory` y `Window` gestionan estado de apertura/cierre — todos necesitan `'use client'`.

Un caso frecuente en Next.js es abrir un `PopUp` de confirmación desde una acción que involucra el servidor. El patrón recomendado:

```tsx
'use client'

import { useState }    from 'react'
import { PopUp }       from '@w3f/components/SURFACES/PopUp/PopUp'
import Button          from '@w3f/components/INPUTS/Button/Button'
import { dispatchAlert } from '@w3f/components/FEEDBACK/Alert/Alert.hooks'
import { eliminarItem }  from '@/app/actions/items'   // Server Action

export function BotonEliminar({ itemId }: { itemId: string }) {
  const [confirmar, setConfirmar] = useState(false)

  async function handleConfirm() {
    await eliminarItem(itemId)   // Server Action — corre en el servidor
    setConfirmar(false)
    dispatchAlert({ message: 'Elemento eliminado', type: 'success' })
  }

  return (
    <>
      <Button color="danger" onClick={() => setConfirmar(true)}>Eliminar</Button>

      <PopUp
        isOpen={confirmar}
        onClose={() => setConfirmar(false)}
        title="¿Eliminar elemento?"
        confirmText="Eliminar"
        cancelText="Cancelar"
        showCancel
        onConfirm={handleConfirm}
        closeOnOverlayClick
      >
        Esta acción no se puede deshacer.
      </PopUp>
    </>
  )
}
```

`Window` con `position: fixed` funciona correctamente en Next.js — el componente se monta en el cliente después de la hidratación. Si necesitás SSR sin ventanas flotantes, usá `open={false}` en el render inicial o montalo con `dynamic(() => import('./MiWindow'), { ssr: false })` de Next.js.

---

## Siguiente paso

[Capítulo 17 — Navegación avanzada: Stepper, SpeedDial, Sidenav](./17-navegacion-avanzada.md)
