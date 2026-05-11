# FloatingActionButton

Boton de accion flotante (FAB) posicionado de forma fija en pantalla. Soporta icono, texto (FAB extended), etiqueta de Speed Dial y agrupacion animada via `FloatingActionButtonGroup`. Integra con Form/LiveForm para trackear clicks o submit.

## Importacion

```tsx
import FloatingActionButton, { FloatingActionButtonGroup } from '@/components/INPUTS/FloatingActionButton/FloatingActionButton';
```

## Uso basico

### FAB con icono

```tsx
import { Plus } from 'lucide-react';

<FloatingActionButton position="bottom-right">
  <Plus size={24} />
</FloatingActionButton>
```

### FAB extended con texto

Cuando se proporciona `text`, el FAB se expande mostrando el texto junto al icono:

```tsx
import { Save } from 'lucide-react';

<FloatingActionButton text="Guardar" color="success" extended>
  <Save size={20} />
</FloatingActionButton>
```

### Con titulo y accesibilidad

```tsx
<FloatingActionButton title="Agregar elemento" position="bottom-right">
  <Plus size={24} />
</FloatingActionButton>
```

## Tamanos

Cuatro opciones de tamano controladas por la variable `--w3f-fab-size`:

```tsx
<FloatingActionButton size="mini">  <Plus size={16} /></FloatingActionButton>   {/* 32px */}
<FloatingActionButton size="sm">    <Plus size={18} /></FloatingActionButton>   {/* 40px */}
<FloatingActionButton size="default"><Plus size={24} /></FloatingActionButton>  {/* 56px */}
<FloatingActionButton size="lg">    <Plus size={28} /></FloatingActionButton>   {/* 72px */}
```

## Colores

Ocho variantes de color semantico:

```tsx
<FloatingActionButton color="primary">   <Plus size={24} /></FloatingActionButton>
<FloatingActionButton color="success">   <Heart size={24} /></FloatingActionButton>
<FloatingActionButton color="danger">    <Trash2 size={24} /></FloatingActionButton>
<FloatingActionButton color="warning">   <Star size={24} /></FloatingActionButton>
<FloatingActionButton color="info">      <MessageCircle size={24} /></FloatingActionButton>
<FloatingActionButton color="secondary"> <Settings size={24} /></FloatingActionButton>
<FloatingActionButton color="surface">   <Plus size={24} /></FloatingActionButton>
<FloatingActionButton color="surface-secondary"><Plus size={24} /></FloatingActionButton>
```

## Posiciones

Seis posiciones de anclaje en pantalla:

```tsx
<FloatingActionButton position="bottom-right">  <Plus size={24} /></FloatingActionButton>
<FloatingActionButton position="bottom-left">   <Plus size={24} /></FloatingActionButton>
<FloatingActionButton position="bottom-center"> <Plus size={24} /></FloatingActionButton>
<FloatingActionButton position="top-right">     <Plus size={24} /></FloatingActionButton>
<FloatingActionButton position="top-left">      <Plus size={24} /></FloatingActionButton>
<FloatingActionButton position="top-center">    <Plus size={24} /></FloatingActionButton>
```

El prop `offset` controla la distancia en px desde el borde de la pantalla (default: `24`):

```tsx
<FloatingActionButton position="bottom-right" offset={32}>
  <Plus size={24} />
</FloatingActionButton>
```

## FAB extended con mobileIconOnly

En pantallas moviles, se puede ocultar el texto manteniendo solo el icono:

```tsx
<FloatingActionButton text="Nuevo Post" extended mobileIconOnly color="primary">
  <Edit size={20} />
</FloatingActionButton>
```

## Con etiqueta (Speed Dial items)

El prop `label` muestra una etiqueta flotante al lado del FAB, util para items de Speed Dial:

```tsx
<FloatingActionButton label="Editar" size="sm" color="info">
  <Edit size={18} />
</FloatingActionButton>
```

## Speed Dial Group

`FloatingActionButtonGroup` agrupa FABs secundarios que se despliegan animadamente cuando `isOpen = true`:

```tsx
const [isOpen, setIsOpen] = useState(false);

<FloatingActionButtonGroup isOpen={isOpen} position="bottom-right">
  <FloatingActionButton label="Editar" size="sm" color="info" className="w3f-fab--secondary-action">
    <Edit size={18} />
  </FloatingActionButton>
  <FloatingActionButton label="Compartir" size="sm" color="success" className="w3f-fab--secondary-action">
    <Share2 size={18} />
  </FloatingActionButton>
  <FloatingActionButton label="Eliminar" size="sm" color="danger" className="w3f-fab--secondary-action">
    <Trash2 size={18} />
  </FloatingActionButton>
</FloatingActionButtonGroup>

<FloatingActionButton
  position="bottom-right"
  color="primary"
  onClick={() => setIsOpen(!isOpen)}
>
  <Plus size={24} style={{ transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }} />
</FloatingActionButton>
```

## Estado disabled

```tsx
<FloatingActionButton disabled>
  <Plus size={24} />
</FloatingActionButton>
```

## Integracion con Form / LiveForm

Cuando se proporciona `name`, el FAB lee y escribe en `FormContext`. Cada click incrementa un contador numerico en el formulario, o establece `true` si el valor no es numerico:

```tsx
<Form initialValues={{ clicks: 0 }} onSubmit={handleSubmit}>
  <FloatingActionButton name="clicks" position="bottom-right">
    <Plus size={24} />
  </FloatingActionButton>
</Form>
```

Como boton de submit:

```tsx
<Form onSubmit={handleSubmit}>
  <Input name="title" />
  <FloatingActionButton type="submit" text="Publicar" color="primary">
    <Send size={20} />
  </FloatingActionButton>
</Form>
```

## Mensajes de error y ayuda

```tsx
<FloatingActionButton error="Esta accion no esta disponible" position="bottom-right">
  <Plus size={24} />
</FloatingActionButton>

<FloatingActionButton helperText="Haz clic para agregar" position="bottom-right">
  <Plus size={24} />
</FloatingActionButton>
```

## CSS Custom Properties

El FAB es 100% configurable via CSS custom properties. Aplica overrides en una clase custom:

```css
/* FAB cuadrado */
.mi-fab-square {
  --w3f-fab-radius: 12px;
}

/* FAB glassmorphism */
.mi-fab-glass {
  --w3f-fab-bg: rgba(255, 255, 255, 0.2);
  --w3f-fab-color: #ffffff;
  --w3f-fab-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  --w3f-fab-hover-bg: rgba(255, 255, 255, 0.3);
  --w3f-fab-hover-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-fab-size` | `56px` | Ancho y alto del FAB |
| `--w3f-fab-radius` | `radius-full` | Border radius |
| `--w3f-fab-bg` | `primary` | Color de fondo |
| `--w3f-fab-color` | `on-primary` | Color del icono/texto |
| `--w3f-fab-hover-bg` | `primary-700` | Fondo en hover |
| `--w3f-fab-active-bg` | `primary-800` | Fondo en active |
| `--w3f-fab-shadow` | `shadow-md` | Box shadow |
| `--w3f-fab-hover-shadow` | `shadow-lg` | Sombra en hover |
| `--w3f-fab-active-shadow` | `shadow-sm` | Sombra en active |
| `--w3f-fab-focus-outline-color` | `primary-400` | Color del outline en focus |
| `--w3f-fab-font-family` | `font-family` | Familia tipografica |
| `--w3f-fab-font-weight` | `500` | Peso del texto |
| `--w3f-fab-icon-size` | `text-2xl` | Tamano del icono |
| `--w3f-fab-text-size` | `text-base` | Tamano del texto (extended) |
| `--w3f-fab-transition` | `all transition-fast` | Transicion |
| `--w3f-fab-disabled-opacity` | `0.5` | Opacidad en disabled |
| `--w3f-fab-disabled-shadow` | `shadow-sm` | Sombra en disabled |
| `--w3f-fab-label-bg` | `gray-800` | Fondo de la etiqueta |
| `--w3f-fab-label-color` | `white` | Color de la etiqueta |
| `--w3f-fab-label-radius` | `radius` | Border radius de la etiqueta |
| `--w3f-fab-label-font-size` | `text-sm` | Tamano de fuente de la etiqueta |
| `--w3f-fab-label-shadow` | `shadow-md` | Sombra de la etiqueta |
| `--w3f-fab-group-gap` | `space-3` | Separacion entre FABs del grupo |
| `--w3f-fab-position-right` | `space-6` | Offset lateral de posicionamiento |
| `--w3f-fab-z-index` | `1000` | Z-index del FAB |

## Props — FloatingActionButton

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | — | Icono del FAB |
| `text` | `string` | — | Texto visible (activa modo extended) |
| `label` | `string` | — | Etiqueta flotante para Speed Dial |
| `title` | `string` | `'Accion'` | Tooltip y aria-label |
| `color` | `FabColor` | `'primary'` | Color semantico (8 opciones) |
| `size` | `FabSize` | `'default'` | Tamano del FAB (4 opciones) |
| `position` | `FabPosition` | `'bottom-right'` | Posicion en pantalla (6 opciones) |
| `offset` | `number` | `24` | Distancia en px desde el borde |
| `extended` | `boolean` | `false` | Modo extended (icono + texto) |
| `mobileIconOnly` | `boolean` | `false` | En movil, oculta el texto del extended |
| `disabled` | `boolean` | `false` | Estado deshabilitado |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Tipo de boton HTML |
| `name` | `string` | — | Campo en Form/LiveForm |
| `error` | `string` | — | Mensaje de error externo |
| `helperText` | `string` | — | Texto de ayuda |
| `onClick` | `MouseEventHandler` | — | Handler de clic |
| `className` | `string` | `''` | Clases CSS adicionales |

## Props — FloatingActionButtonGroup

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | — | FABs secundarios del grupo |
| `isOpen` | `boolean` | `false` | Despliega el Speed Dial |
| `position` | `FabPosition` | `'bottom-right'` | Posicion del grupo |
| `offset` | `number` | `24` | Distancia en px desde el borde |
| `className` | `string` | `''` | Clases CSS adicionales |

## Colores disponibles

`primary` · `success` · `danger` · `warning` · `info` · `secondary` · `surface` · `surface-secondary`

## Tamanos disponibles

`mini` (32px) · `sm` (40px) · `default` (56px) · `lg` (72px)

## Posiciones disponibles

`bottom-right` · `bottom-left` · `bottom-center` · `top-right` · `top-left` · `top-center`

## API

### Entrada de datos

El FloatingActionButton no acepta valor de datos como tal. Sus entradas son configuraciones visuales y de comportamiento:

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| FormContext (contador) | `name` | `string` | Lee `FormContext.values[name]` como numero (contador de clicks) o boolean |
| Posicion fija | `position` | `FabPosition` | Determina donde se ancla el FAB en la pantalla |
| Offset | `offset` | `number` | Distancia en px desde el borde (default `24`) |

El posicionamiento usa `buildFabStyle(position, offset)` que genera `style` con `position: fixed` + `bottom`/`top`/`left`/`right` calculados a partir de `offset` y la posicion elegida.

### Salida de datos

| Evento | Firma | Cuando se dispara |
|---|---|---|
| `onClick` | `(e: MouseEvent<HTMLButtonElement>) => void` | Click sobre el FAB (no se dispara si `disabled`) |

**Integracion especial con Form (contador de clicks):**

Cuando `name` esta definido dentro de un Form, cada click actualiza `FormContext`:
- Si `formContext.values[name]` es `number`: incrementa en 1 (`currentValue + 1`)
- Si no es numerico: establece `true`

```
Form.initialValues.clicks = 0
        ↓ (usuario hace clic 3 veces)
FAB llama formContext.setFieldValue("clicks", 1)
         formContext.setFieldValue("clicks", 2)
         formContext.setFieldValue("clicks", 3)
        ↓
Form.onSubmit recibe { clicks: 3 }
```

### Comunicacion con otros componentes

#### Con FloatingActionButtonGroup (Speed Dial — padre coordina apertura)

`FloatingActionButtonGroup` es un contenedor posicionado. No inyecta props en los FAB hijos; solo controla visibilidad mediante la clase CSS `w3f-fab-group--open` controlada por `isOpen`:

```tsx
// El FAB principal controla el estado
const [isOpen, setIsOpen] = useState(false);

<FloatingActionButtonGroup isOpen={isOpen} position="bottom-right">
  {/* FABs secundarios — visibles solo cuando isOpen */}
  <FloatingActionButton label="Editar" size="sm" className="w3f-fab--secondary-action">
    <Edit size={18} />
  </FloatingActionButton>
</FloatingActionButtonGroup>

{/* FAB principal — siempre visible */}
<FloatingActionButton position="bottom-right" onClick={() => setIsOpen(!isOpen)}>
  <Plus size={24} />
</FloatingActionButton>
```

El grupo y el FAB principal son **hermanos en el DOM**, no padre-hijo.

#### Con Form / LiveForm

```
Form.initialValues.clicks = 0
        ↓ (lectura y escritura via setFieldValue)
FAB trackea clicks incrementales en FormContext
```

Como boton de submit:
```tsx
<FloatingActionButton type="submit" text="Publicar" color="primary">
  <Send size={20} />
</FloatingActionButton>
```

#### Independiente (sin contexto requerido)

```tsx
<FloatingActionButton position="bottom-right" onClick={handleAdd}>
  <Plus size={24} />
</FloatingActionButton>
```

### Accesibilidad

| Atributo | Valor | Condicion |
|---|---|---|
| `aria-label` | valor de `text` o `title` (default `'Accion'`) | Siempre |
| `title` | valor de `text` o `title` | Siempre (tooltip nativo) |
| `aria-invalid` | `true` / `false` | Cuando hay error |
| `aria-describedby` | id del mensaje de error o helper | Cuando hay `error` o `helperText` |
| `disabled` | atributo nativo | Cuando `disabled` es `true` |
| `type` | `"button"` / `"submit"` / `"reset"` | Segun prop `type` |

### Patron de uso recomendado

```tsx
// 1. FAB basico con icono
<FloatingActionButton position="bottom-right" onClick={handleAdd}>
  <Plus size={24} />
</FloatingActionButton>

// 2. FAB extended con texto (ocultando texto en movil)
<FloatingActionButton text="Nuevo post" extended mobileIconOnly color="primary">
  <Edit size={20} />
</FloatingActionButton>

// 3. Speed Dial — grupo expandible
const [open, setOpen] = useState(false);
<FloatingActionButtonGroup isOpen={open} position="bottom-right">
  <FloatingActionButton label="Compartir" size="sm" color="success" className="w3f-fab--secondary-action">
    <Share2 size={18} />
  </FloatingActionButton>
  <FloatingActionButton label="Eliminar" size="sm" color="danger" className="w3f-fab--secondary-action">
    <Trash2 size={18} />
  </FloatingActionButton>
</FloatingActionButtonGroup>
<FloatingActionButton position="bottom-right" onClick={() => setOpen(!open)}>
  <Plus size={24} />
</FloatingActionButton>

// 4. Como boton de submit en Form
<Form onSubmit={handleSubmit}>
  <Input name="titulo" label="Titulo" />
  <FloatingActionButton type="submit" text="Publicar" color="success">
    <Send size={20} />
  </FloatingActionButton>
</Form>

// 5. Contador de acciones en Form
<Form initialValues={{ saves: 0 }} onSubmit={(v) => console.log('Guardados:', v.saves)}>
  <FloatingActionButton name="saves" position="bottom-right" color="primary">
    <Bookmark size={24} />
  </FloatingActionButton>
</Form>
```

## Estructura de archivos

```
FloatingActionButton/
  FloatingActionButton.tsx            Componente principal + FloatingActionButtonGroup
  FloatingActionButton.types.ts       Interfaces TypeScript
  FloatingActionButton.constants.ts   Clases CSS y defaults
  FloatingActionButton.utils.ts       buildFabClasses(), buildFabStyle(), buildFabGroupClasses()
  FloatingActionButton.hooks.ts       useFabFormContext (integracion Form)
  README.md                           Esta documentacion
```

CSS: `src/w3fussion/INPUTS/_floating-action-button.css`
