# ToggleButton

Botones de alternancia para seleccion exclusiva (radio) o multiple (checkbox). Admite uso como boton individual o agrupado via `ToggleButtonGroup`, con integracion completa en `Form` / `LiveForm`.

## Importacion

```tsx
import { ToggleButton, ToggleButtonGroup } from '@/components/INPUTS/ToggleButton/ToggleButton';
```

## Uso basico

### Boton individual

El estado `selected` se controla externamente:

```tsx
const [active, setActive] = useState(false);

<ToggleButton value="bold" selected={active} onChange={() => setActive(prev => !prev)}>
  <Bold size={18} />
</ToggleButton>
```

### Grupo exclusivo (single-select)

Solo una opcion puede estar activa a la vez — comportamiento de radio button:

```tsx
const [alignment, setAlignment] = useState<string | number | null>('left');

<ToggleButtonGroup
  exclusive
  value={alignment}
  onChange={(_e, val) => setAlignment(val)}
  label="Text Alignment"
>
  <ToggleButton value="left" aria-label="Left align"><AlignLeft size={18} /></ToggleButton>
  <ToggleButton value="center" aria-label="Center align"><AlignCenter size={18} /></ToggleButton>
  <ToggleButton value="right" aria-label="Right align"><AlignRight size={18} /></ToggleButton>
</ToggleButtonGroup>
```

### Grupo multiple (multi-select)

Varias opciones pueden estar activas simultaneamente — comportamiento de checkbox:

```tsx
const [formats, setFormats] = useState<(string | number)[]>(['bold']);

<ToggleButtonGroup
  value={formats}
  onChange={(_e, val) => {
    const v = val as string;
    setFormats(prev => prev.includes(v) ? prev.filter(f => f !== v) : [...prev, v]);
  }}
  label="Text Formatting"
>
  <ToggleButton value="bold"><Bold size={18} /></ToggleButton>
  <ToggleButton value="italic"><Italic size={18} /></ToggleButton>
  <ToggleButton value="underline"><Underline size={18} /></ToggleButton>
</ToggleButtonGroup>
```

## Tamanos

Tres tamanos predefinidos controlados por CSS custom properties:

```tsx
<ToggleButtonGroup exclusive value="grid" size="sm" label="Small">...</ToggleButtonGroup>
<ToggleButtonGroup exclusive value="grid" size="md" label="Medium (default)">...</ToggleButtonGroup>
<ToggleButtonGroup exclusive value="grid" size="lg" label="Large">...</ToggleButtonGroup>
```

| Tamano | Min-height | Font size | Padding (v / h) |
|---|---|---|---|
| `sm` | 2rem | `text-xs` | `space-1` / `space-3` |
| `md` | 2.5rem | `text-sm` | `space-2` / `space-4` |
| `lg` | 3rem | `text-base` | `space-3` / `space-6` |

## Colores

El color afecta el estado seleccionado. Seis opciones semanticas:

```tsx
<ToggleButtonGroup exclusive value="a" color="primary">...</ToggleButtonGroup>
<ToggleButtonGroup exclusive value="a" color="secondary">...</ToggleButtonGroup>
<ToggleButtonGroup exclusive value="a" color="success">...</ToggleButtonGroup>
<ToggleButtonGroup exclusive value="a" color="danger">...</ToggleButtonGroup>
<ToggleButtonGroup exclusive value="a" color="warning">...</ToggleButtonGroup>
<ToggleButtonGroup exclusive value="a" color="info">...</ToggleButtonGroup>
```

## Iconos con texto

Combinar iconos y etiquetas de texto en el mismo boton:

```tsx
<ToggleButtonGroup exclusive value={viewMode} onChange={(_e, val) => setViewMode(val)} color="primary">
  <ToggleButton value="list"><Rows3 size={16} /> List</ToggleButton>
  <ToggleButton value="grid"><Grid3x3 size={16} /> Grid</ToggleButton>
  <ToggleButton value="columns"><Columns3 size={16} /> Columns</ToggleButton>
</ToggleButtonGroup>
```

## Orientacion y ancho completo

```tsx
{/* Vertical */}
<ToggleButtonGroup exclusive value="a" orientation="vertical">
  <ToggleButton value="a">First</ToggleButton>
  <ToggleButton value="b">Second</ToggleButton>
</ToggleButtonGroup>

{/* Full width */}
<ToggleButtonGroup exclusive value="b" fullWidth>
  <ToggleButton value="a">Left</ToggleButton>
  <ToggleButton value="b">Center</ToggleButton>
  <ToggleButton value="c">Right</ToggleButton>
</ToggleButtonGroup>
```

En pantallas moviles (`max-width: 640px`), un grupo `fullWidth` en orientacion horizontal se convierte automaticamente en vertical.

## Estado disabled

```tsx
{/* Boton individual deshabilitado */}
<ToggleButton value="x" disabled>Disabled</ToggleButton>

{/* Grupo completo deshabilitado */}
<ToggleButtonGroup exclusive value="a" disabled>
  <ToggleButton value="a">One</ToggleButton>
  <ToggleButton value="b">Two</ToggleButton>
</ToggleButtonGroup>
```

## Integracion con Form / LiveForm

Cuando se pasa `name`, el grupo lee y escribe en `FormContext` automaticamente:

```tsx
<Form initialValues={{ alignment: 'left', formats: ['bold'] }} onSubmit={handleSubmit}>
  <ToggleButtonGroup exclusive name="alignment" label="Alineacion">
    <ToggleButton value="left"><AlignLeft size={18} /></ToggleButton>
    <ToggleButton value="center"><AlignCenter size={18} /></ToggleButton>
    <ToggleButton value="right"><AlignRight size={18} /></ToggleButton>
  </ToggleButtonGroup>

  <ToggleButtonGroup name="formats" label="Formato">
    <ToggleButton value="bold"><Bold size={18} /></ToggleButton>
    <ToggleButton value="italic"><Italic size={18} /></ToggleButton>
  </ToggleButtonGroup>

  <Button type="submit">Guardar</Button>
</Form>
```

El hook `useToggleGroup` detecta la presencia de `FormContext` via `useContext(FormContext)`. Si no hay contexto de formulario, opera en modo no controlado/controlado externo normalmente.

## Validacion

El `ToggleButtonGroup` soporta mensajes de error y ayuda:

```tsx
<ToggleButtonGroup
  name="plan"
  exclusive
  label="Plan"
  error="Debes seleccionar un plan"
  helperText="Elige el plan que mejor se adapte a ti"
>
  <ToggleButton value="free">Free</ToggleButton>
  <ToggleButton value="pro">Pro</ToggleButton>
  <ToggleButton value="enterprise">Enterprise</ToggleButton>
</ToggleButtonGroup>
```

Cuando hay error, el grupo emite `aria-invalid="true"` y el mensaje tiene `role="alert"`.

## CSS Custom Properties

El componente es 100% configurable via CSS custom properties. Aplica overrides en una clase custom:

```css
/* iOS Segment Style */
.mi-segment .w3f-toggle-group {
  --w3f-tbtn-radius: 10px;
  background: #e5e7eb;
  padding: 3px;
  gap: 2px;
  border: none;
}

.mi-segment .w3f-toggle-button {
  --w3f-tbtn-color: #6b7280;
  --w3f-tbtn-border-color: transparent;
  border: none;
  border-radius: 8px;
}

.mi-segment .w3f-toggle-button--selected {
  --w3f-tbtn-selected-bg: #ffffff;
  --w3f-tbtn-selected-color: #111827;
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-tbtn-radius` | `var(--w3f-radius)` | Border radius del grupo |
| `--w3f-tbtn-shadow` | `var(--w3f-shadow-sm)` | Sombra del grupo |
| `--w3f-tbtn-bg` | `var(--w3f-surface)` | Fondo del boton |
| `--w3f-tbtn-color` | `var(--w3f-on-surface)` | Color del texto |
| `--w3f-tbtn-border-color` | `var(--w3f-outline-variant)` | Color del borde |
| `--w3f-tbtn-font-family` | `var(--w3f-font-family)` | Familia tipografica |
| `--w3f-tbtn-font-size` | `var(--w3f-text-sm)` | Tamano de fuente |
| `--w3f-tbtn-font-weight` | `500` | Peso de fuente |
| `--w3f-tbtn-padding-v` | `var(--w3f-space-2)` | Padding vertical |
| `--w3f-tbtn-padding-h` | `var(--w3f-space-4)` | Padding horizontal |
| `--w3f-tbtn-transition` | multi-property | Transicion de estados |
| `--w3f-tbtn-hover-bg` | `var(--w3f-gray-50)` | Fondo en hover |
| `--w3f-tbtn-hover-border-color` | `var(--w3f-gray-300)` | Borde en hover |
| `--w3f-tbtn-focus-outline-color` | `var(--w3f-primary-400)` | Color del outline focus |
| `--w3f-tbtn-selected-bg` | `var(--w3f-primary-50)` | Fondo seleccionado |
| `--w3f-tbtn-selected-color` | `var(--w3f-primary-700)` | Texto seleccionado |
| `--w3f-tbtn-selected-border-color` | `var(--w3f-primary-300)` | Borde seleccionado |
| `--w3f-tbtn-selected-font-weight` | `600` | Peso seleccionado |
| `--w3f-tbtn-selected-hover-bg` | `var(--w3f-primary-100)` | Fondo seleccionado hover |
| `--w3f-tbtn-selected-hover-border-color` | `var(--w3f-primary-400)` | Borde seleccionado hover |
| `--w3f-tbtn-disabled-opacity` | `0.5` | Opacidad deshabilitado |
| `--w3f-tbtn-disabled-bg` | `var(--w3f-gray-100)` | Fondo deshabilitado |
| `--w3f-tbtn-disabled-color` | `var(--w3f-gray-400)` | Texto deshabilitado |
| `--w3f-tbtn-solid-bg` | `var(--w3f-primary)` | Fondo variante solid |
| `--w3f-tbtn-solid-color` | `var(--w3f-on-primary)` | Texto variante solid |
| `--w3f-tbtn-solid-hover-bg` | `var(--w3f-primary-700)` | Fondo solid hover |

## Accesibilidad

- Grupo exclusivo: `role="radiogroup"` + hijos `role="radio"` + `aria-checked`
- Grupo multiple: `role="group"` + hijos `role="checkbox"` + `aria-checked`
- Boton individual: `role="button"` + `aria-pressed`
- Soporte de teclado: `Space` y `Enter` activan el boton
- `aria-required`, `aria-invalid`, `aria-describedby` en el grupo
- `aria-disabled` en botones deshabilitados, `tabIndex={-1}` para excluir del tab flow
- Alto contraste: `border-width` reforzado via `@media (prefers-contrast: high)`
- Movimiento reducido: transicion eliminada via `@media (prefers-reduced-motion: reduce)`

## Props — ToggleButton

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `value` | `string \| number` | — | Valor del boton (requerido) |
| `children` | `ReactNode` | — | Contenido (icono, texto, o ambos) |
| `selected` | `boolean` | `false` | Estado activo |
| `onChange` | `(event, value) => void` | — | Callback al hacer click |
| `color` | `ToggleButtonColor` | `'primary'` | Color del estado seleccionado |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamano |
| `fullWidth` | `boolean` | `false` | Ocupa el ancho completo |
| `disabled` | `boolean` | `false` | Estado deshabilitado |
| `className` | `string` | `''` | Clases CSS adicionales |
| `aria-label` | `string` | — | Label de accesibilidad |

## Props — ToggleButtonGroup

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | — | `ToggleButton` hijos (requerido) |
| `value` | `string \| number \| (string \| number)[] \| null` | — | Valor(es) seleccionados |
| `onChange` | `(event, newValue) => void` | — | Callback al cambiar seleccion |
| `exclusive` | `boolean` | `false` | Modo single-select (radio) |
| `color` | `ToggleButtonColor` | `'primary'` | Color aplicado a hijos |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamano aplicado a hijos |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Direccion del grupo |
| `fullWidth` | `boolean` | `false` | Grupo ocupa ancho completo |
| `label` | `string` | — | Etiqueta visible encima del grupo |
| `name` | `string` | — | Campo en Form/LiveForm |
| `error` | `string` | — | Mensaje de error |
| `helperText` | `string` | — | Texto de ayuda |
| `required` | `boolean` | `false` | Campo requerido |
| `disabled` | `boolean` | `false` | Deshabilita todo el grupo |
| `className` | `string` | `''` | Clases CSS adicionales |
| `aria-label` | `string` | — | Label de accesibilidad del grupo |

## Colores disponibles

`primary` · `secondary` · `success` · `danger` · `warning` · `info`

## Estructura de archivos

```
ToggleButton/
  ToggleButton.tsx          Componente principal + ToggleButtonGroup
  ToggleButton.types.ts     Interfaces TypeScript
  ToggleButton.constants.ts Clases CSS y defaults
  ToggleButton.utils.ts     buildToggleButtonClasses(), isSelected(), computeNewValue()
  ToggleButton.hooks.ts     useToggleGroup (integracion Form)
  README.md                 Esta documentacion
```

CSS: `src/w3fussion/INPUTS/_toggle-button.css`
