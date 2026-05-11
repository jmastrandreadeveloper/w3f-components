# SlideToggle

Interruptor deslizante para estados booleanos activado/desactivado. Soporta arrastre por mouse y touch, etiqueta configurable, cinco variantes de color, tres tamaños y mensajes de ayuda o error. Se integra nativamente con Form/LiveForm.

## Importacion

```tsx
import SlideToggle from '@/components/INPUTS/SlideToggle/SlideToggle';
```

## Uso basico

```tsx
const [enabled, setEnabled] = useState(false);

<SlideToggle
  label="Notificaciones"
  checked={enabled}
  onChange={setEnabled}
/>
```

## Sin etiqueta

Cuando no se proporciona `label`, el componente renderiza solo el interruptor:

```tsx
<SlideToggle checked={enabled} onChange={setEnabled} />
```

## Variantes de color

Cinco variantes controladas por `variant`:

```tsx
<SlideToggle label="Primary"   variant="primary"   checked onChange={() => {}} />
<SlideToggle label="Secondary" variant="secondary" checked onChange={() => {}} />
<SlideToggle label="Success"   variant="success"   checked onChange={() => {}} />
<SlideToggle label="Warning"   variant="warning"   checked onChange={() => {}} />
<SlideToggle label="Danger"    variant="danger"    checked onChange={() => {}} />
```

## Tamaños

Tres tamaños predefinidos con dimensiones controladas por CSS custom properties:

```tsx
<SlideToggle label="Small"          size="sm" checked onChange={() => {}} />
<SlideToggle label="Medium (default)" size="md" checked onChange={() => {}} />
<SlideToggle label="Large"          size="lg" checked onChange={() => {}} />
```

| Tamaño | Ancho | Alto | Handle |
|--------|-------|------|--------|
| `sm`   | 36px  | 18px | 14px   |
| `md`   | 44px  | 22px | 18px   |
| `lg`   | 52px  | 26px | 22px   |

## Posicion de etiqueta

La etiqueta puede aparecer a la derecha (default) o a la izquierda del toggle:

```tsx
<SlideToggle label="Label derecha" labelPosition="right" checked onChange={() => {}} />
<SlideToggle label="Label izquierda" labelPosition="left" checked onChange={() => {}} />
```

## Icono de confirmacion

Por defecto, cuando el toggle esta activado y tiene label, muestra un `✓` junto al texto. Se puede desactivar con `showIcon={false}`:

```tsx
<SlideToggle label="Con icono"    showIcon={true}  checked onChange={() => {}} />
<SlideToggle label="Sin icono"    showIcon={false} checked onChange={() => {}} />
```

## Estado deshabilitado

```tsx
<SlideToggle label="Deshabilitado off" disabled />
<SlideToggle label="Deshabilitado on"  disabled checked onChange={() => {}} />
```

## Estado loading

Bloquea la interaccion y aplica animacion de carga:

```tsx
<SlideToggle label="Cargando..." loading checked onChange={() => {}} />
```

## Mensajes de ayuda y error

```tsx
<SlideToggle
  label="Auto-save"
  helperText="Guarda cambios automaticamente cada 30 segundos"
  checked={autoSave}
  onChange={setAutoSave}
/>

<SlideToggle
  label="Sincronizar"
  error="La sincronizacion fallo. Verifica tu conexion."
  checked={sync}
  onChange={setSync}
/>
```

## Arrastre (drag)

El handle soporta arrastre por mouse y touch. Al soltar el handle, el toggle se posiciona en el estado correspondiente segun si la posicion supera el punto medio del track.

## Integracion con Form / LiveForm

Cuando se proporciona `name`, el toggle lee y escribe en `FormContext` automaticamente:

```tsx
import { Form } from '@/components/INPUTS/Form/Form';
import Button from '@/components/INPUTS/Button/Button';

<Form
  initialValues={{ darkMode: false, notifications: true }}
  onSubmit={(values) => console.log(values)}
>
  <SlideToggle name="darkMode"      label="Modo oscuro" />
  <SlideToggle name="notifications" label="Notificaciones" />
  <Button type="submit">Guardar</Button>
</Form>
```

El valor en el contexto es `boolean`. Fuera de un `Form`, el toggle funciona como componente controlado con `checked` + `onChange`.

## CSS Custom Properties

El toggle es 100% configurable via CSS custom properties. Aplica overrides en una clase custom:

```css
.mi-toggle-custom {
  --w3f-toggle-width: 52px;
  --w3f-toggle-height: 28px;
  --w3f-toggle-track-bg: #e5e5ea;
  --w3f-toggle-track-checked-bg: #34c759;
  --w3f-toggle-handle-size: 24px;
  --w3f-toggle-handle-bg: #ffffff;
  --w3f-toggle-handle-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
}
```

```tsx
<SlideToggle className="mi-toggle-custom" label="Custom" checked onChange={() => {}} />
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-toggle-width` | `44px` | Ancho del track |
| `--w3f-toggle-height` | `22px` | Alto del track |
| `--w3f-toggle-track-bg` | `gray-300` | Color de fondo (unchecked) |
| `--w3f-toggle-track-checked-bg` | `primary` | Color de fondo (checked) |
| `--w3f-toggle-track-hover-bg` | `gray-400` | Color hover (unchecked) |
| `--w3f-toggle-track-checked-hover-bg` | `primary-700` | Color hover (checked) |
| `--w3f-toggle-track-radius` | `radius-full` | Border radius del track |
| `--w3f-toggle-track-transition` | `transition-normal` | Transicion del track |
| `--w3f-toggle-handle-size` | `18px` | Tamaño del handle |
| `--w3f-toggle-handle-bg` | `surface` | Color de fondo del handle |
| `--w3f-toggle-handle-radius` | `radius-full` | Border radius del handle |
| `--w3f-toggle-handle-shadow` | `shadow` | Sombra del handle en reposo |
| `--w3f-toggle-handle-drag-shadow` | `shadow-md` | Sombra del handle al arrastrar |
| `--w3f-toggle-handle-offset` | `space-1` | Margen interno del handle |
| `--w3f-toggle-handle-transition` | `transition-normal` | Transicion del handle |
| `--w3f-toggle-disabled-track-bg` | `gray-200` | Track fondo (disabled unchecked) |
| `--w3f-toggle-disabled-track-checked-bg` | `primary-300` | Track fondo (disabled checked) |
| `--w3f-toggle-disabled-handle-bg` | `gray-100` | Handle fondo (disabled) |
| `--w3f-toggle-disabled-handle-shadow` | `shadow-sm` | Handle sombra (disabled) |
| `--w3f-toggle-disabled-opacity` | `0.6` | Opacidad en estado disabled |
| `--w3f-toggle-focus-outline-color` | `primary` | Color del outline al hacer focus |
| `--w3f-toggle-focus-disabled-outline-color` | `gray-400` | Outline en disabled |
| `--w3f-toggle-secondary-bg` | `secondary` | Color checked variante secondary |
| `--w3f-toggle-secondary-hover-bg` | `secondary-600` | Hover checked variante secondary |
| `--w3f-toggle-success-bg` | `success` | Color checked variante success |
| `--w3f-toggle-success-hover-bg` | `success-600` | Hover checked variante success |
| `--w3f-toggle-warning-bg` | `warning` | Color checked variante warning |
| `--w3f-toggle-warning-hover-bg` | `warning-600` | Hover checked variante warning |
| `--w3f-toggle-danger-bg` | `danger` | Color checked variante danger |
| `--w3f-toggle-danger-hover-bg` | `danger-600` | Hover checked variante danger |

### Ejemplos de temas

```css
/* iOS style */
.toggle-ios {
  --w3f-toggle-width: 51px;
  --w3f-toggle-height: 31px;
  --w3f-toggle-track-bg: #e5e5ea;
  --w3f-toggle-track-checked-bg: #34c759;
  --w3f-toggle-handle-size: 27px;
  --w3f-toggle-handle-bg: #ffffff;
  --w3f-toggle-handle-shadow: 0 3px 8px rgba(0,0,0,0.15), 0 1px 1px rgba(0,0,0,0.16);
}

/* Android Material style */
.toggle-android {
  --w3f-toggle-width: 36px;
  --w3f-toggle-height: 14px;
  --w3f-toggle-track-bg: #bdbdbd;
  --w3f-toggle-track-checked-bg: rgba(33, 150, 243, 0.5);
  --w3f-toggle-handle-size: 20px;
  --w3f-toggle-handle-bg: #fafafa;
  --w3f-toggle-handle-shadow: 0 1px 3px rgba(0,0,0,0.3);
}

/* Neon style */
.toggle-neon {
  --w3f-toggle-width: 56px;
  --w3f-toggle-height: 28px;
  --w3f-toggle-track-bg: #1f2937;
  --w3f-toggle-track-checked-bg: #0f172a;
  --w3f-toggle-handle-size: 22px;
  --w3f-toggle-handle-bg: #22d3ee;
  --w3f-toggle-handle-shadow: 0 0 12px rgba(34,211,238,0.6), 0 0 4px rgba(34,211,238,0.3);
}
```

## Accesibilidad

El toggle implementa el patron `role="switch"` de ARIA:

- `role="switch"` en el elemento raiz
- `aria-checked` refleja el estado actual
- `aria-disabled` cuando esta deshabilitado o en loading
- `aria-label` usa la prop `label` o `'Toggle switch'` como fallback
- `aria-invalid` cuando hay error
- `tabIndex={0}` para navegacion por teclado (se omite cuando disabled/loading)
- Teclas `Enter` y `Espacio` activan el toggle

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `name` | `string` | — | Campo en Form/LiveForm |
| `checked` | `boolean` | `false` | Estado controlado |
| `onChange` | `(checked: boolean) => void` | — | Callback al cambiar estado |
| `disabled` | `boolean` | `false` | Deshabilita interaccion |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño del toggle |
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Variante de color |
| `loading` | `boolean` | `false` | Estado de carga |
| `label` | `string` | — | Texto descriptivo |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Posicion de la etiqueta |
| `showIcon` | `boolean` | `true` | Muestra icono ✓ al activar |
| `error` | `string` | — | Mensaje de error |
| `helperText` | `string` | — | Texto de ayuda |
| `className` | `string` | `''` | Clases CSS adicionales |

## API

### Entrada de datos

El SlideToggle acepta datos por dos vias:

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Valor controlado | `checked` | `boolean` | Estado boolean impuesto desde el padre. Default `false` |
| FormContext | `name` | `string` | Lee `FormContext.values[name]` como boolean cuando esta dentro de un `<Form>` |

**Prioridad de resolucion:**
```
FormContext.values[name]  →  prop checked
```

El mecanismo de arrastre (drag) calcula la posicion del handle en tiempo real durante el gesto mouse/touch. Al soltar, compara `handlePosition > maxPosition / 2` para determinar el nuevo estado boolean.

### Salida de datos

| Evento | Firma | Cuando se dispara |
|---|---|---|
| `onChange` | `(checked: boolean) => void` | Al completar un click, presionar Enter/Espacio, o soltar el handle tras arrastrar. Emite el nuevo estado boolean |

Flujo de cambio:
1. Click o fin de arrastre → `handleToggleChange(newState: boolean)`
2. Si es form-controlled: llama a `formContext.setFieldValue(name, newState)`
3. Siempre llama a `onChange(newState)` si el callback esta definido
4. En submit, `Form.onSubmit` recibe `{ [name]: boolean }`

El estado `loading` bloquea todo cambio: no responde a click, arrastre ni teclado.

### Comunicacion con otros componentes

#### Con Form / LiveForm (bidireccional)

El SlideToggle consume `FormContext` via `useSlideToggleFormContext()`. Usa `setFieldValue` (no `handleChange`) porque el valor es boolean:

```
Form.initialValues.darkMode = false
        ↓ (lectura)
SlideToggle lee Boolean(FormContext.values["darkMode"])
        ↓ (usuario activa el toggle)
SlideToggle llama formContext.setFieldValue("darkMode", true)
        ↓ (propagacion)
Form.onSubmit recibe { darkMode: true }
```

Los errores de Form (`formContext.errors[name]`) reemplazan al prop `error`.

#### Independiente (sin contexto requerido)

```tsx
// Funciona en cualquier parte del arbol React
<SlideToggle checked={enabled} onChange={setEnabled} label="Notificaciones" />
```

### Accesibilidad

El componente implementa el patron `role="switch"` de ARIA:

| Atributo | Valor | Condicion |
|---|---|---|
| `role` | `"switch"` | Siempre (en el elemento interactivo) |
| `aria-checked` | `true` / `false` | Refleja el estado actual |
| `aria-disabled` | `true` / `false` | Cuando `disabled` o `loading` son `true` |
| `aria-label` | valor de `label` o `'Toggle switch'` | Siempre |
| `aria-invalid` | `true` / `false` | Cuando hay error |
| `tabIndex` | `0` | Solo cuando no esta deshabilitado ni en loading |

Teclado: `Enter` y `Espacio` activan el toggle. Cuando `disabled` o `loading` son `true`, `tabIndex={-1}` elimina el componente del flujo de teclado.

### Patron de uso recomendado

```tsx
// 1. Controlado basico
const [enabled, setEnabled] = useState(false);
<SlideToggle label="Notificaciones" checked={enabled} onChange={setEnabled} />

// 2. Con variante de color y tamaño
<SlideToggle label="Modo exito" variant="success" size="lg" checked onChange={() => {}} />

// 3. Estado loading — bloquea interaccion
<SlideToggle label="Guardando..." loading checked onChange={() => {}} />

// 4. Con mensaje de error
<SlideToggle
  label="Sincronizar datos"
  error="La conexion fallo. Intenta de nuevo."
  checked={sync}
  onChange={setSync}
/>

// 5. Multiples toggles en Form
<Form initialValues={{ darkMode: false, notifications: true }} onSubmit={save}>
  <SlideToggle name="darkMode"      label="Modo oscuro" />
  <SlideToggle name="notifications" label="Notificaciones" variant="success" />
  <Button type="submit">Guardar preferencias</Button>
</Form>
```

## Estructura de archivos

```
SlideToggle/
  SlideToggle.tsx          Componente principal con logica de drag
  SlideToggle.types.ts     Interfaces TypeScript
  SlideToggle.constants.ts Clases CSS y configuracion de tamaños
  SlideToggle.utils.ts     buildToggleClasses, buildTrackClasses, buildHandleClasses
  SlideToggle.hooks.ts     useSlideToggleFormContext (integracion Form)
  README.md                Esta documentacion
```

CSS: `src/w3fussion/INPUTS/_slider-toggle.css`
