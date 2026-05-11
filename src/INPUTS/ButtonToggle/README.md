# ButtonToggle

Grupo de botones de seleccion exclusiva o multiple. Cada opcion se renderiza como un `Button` del framework que alterna entre variante `raised` (activo) y `outline` (inactivo). Compatible con Form y LiveForm mediante Context API.

## Importacion

```tsx
import { ButtonToggle } from '@/components/INPUTS/ButtonToggle/ButtonToggle';
```

## Uso basico

### Seleccion simple

Solo un valor activo a la vez. El usuario no puede deseleccionar si `allowDeselect` es `false` (default):

```tsx
const [view, setView] = useState('day');

<ButtonToggle
  options={[
    { value: 'day',   label: 'Day' },
    { value: 'week',  label: 'Week' },
    { value: 'month', label: 'Month' },
  ]}
  value={view}
  onSelect={(val) => setView(val as string)}
/>
```

### Seleccion multiple

Varios valores activos simultaneamente. El valor es siempre un array:

```tsx
const [tags, setTags] = useState<string[]>(['react']);

<ButtonToggle
  options={[
    { value: 'react',   label: 'React' },
    { value: 'vue',     label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte',  label: 'Svelte' },
  ]}
  value={tags}
  multiple
  onSelect={(val) => setTags(val as string[])}
/>
```

## Tamanos

Cuatro tamanos heredados del componente `Button`:

```tsx
<ButtonToggle options={opts} size="sm" value="day" />
<ButtonToggle options={opts} size="md" value="day" />   {/* default */}
<ButtonToggle options={opts} size="lg" value="day" />
<ButtonToggle options={opts} size="xl" value="day" />
```

## Colores

Acepta todos los colores semanticos del sistema:

```tsx
<ButtonToggle options={opts} color="primary"   value="a" />
<ButtonToggle options={opts} color="secondary" value="a" />
<ButtonToggle options={opts} color="success"   value="a" />
<ButtonToggle options={opts} color="danger"    value="a" />
<ButtonToggle options={opts} color="warning"   value="a" />
<ButtonToggle options={opts} color="info"      value="a" />
```

## Allow Deselect

Permite que el usuario deseleccione la opcion activa en modo simple (el valor queda `null`):

```tsx
<ButtonToggle
  options={opts}
  allowDeselect
  value={selected}
  onSelect={(val) => setSelected(val as string | null)}
/>
```

## Opciones deshabilitadas

Cada opcion puede deshabilitarse individualmente con `option.disabled`:

```tsx
<ButtonToggle
  options={[
    { value: 'draft',     label: 'Draft' },
    { value: 'review',    label: 'In Review' },
    { value: 'published', label: 'Published', disabled: true },
  ]}
  value="draft"
/>
```

## Componente completamente deshabilitado

```tsx
<ButtonToggle options={opts} disabled value="day" />
```

## Integracion con Form / LiveForm

Cuando se proporciona `name`, el componente lee y escribe en `FormContext` automaticamente:

```tsx
<Form initialValues={{ view: 'week', tags: [] }} onSubmit={handleSubmit}>
  {/* Seleccion simple */}
  <ButtonToggle
    name="view"
    options={[
      { value: 'day',   label: 'Day' },
      { value: 'week',  label: 'Week' },
      { value: 'month', label: 'Month' },
    ]}
  />

  {/* Seleccion multiple */}
  <ButtonToggle
    name="tags"
    multiple
    options={[
      { value: 'react',  label: 'React' },
      { value: 'vue',    label: 'Vue' },
      { value: 'svelte', label: 'Svelte' },
    ]}
  />

  <Button type="submit">Guardar</Button>
</Form>
```

## Modo no controlado

Sin `value` ni `name`, el componente gestiona su propio estado interno. Usa `defaultValue` para el valor inicial:

```tsx
<ButtonToggle
  options={opts}
  defaultValue="day"
  onSelect={(val) => console.log('Selected:', val)}
/>
```

## CSS Custom Properties

El componente expone una variable CSS para personalizar el radio de los extremos del grupo:

```css
.mi-toggle-custom {
  --w3f-btgl-radius: 999px;   /* Radio de los bordes extremos */
}
```

El contenedor `w3f-button-toggle` es un `inline-flex` que se apoya en las variables CSS del componente `Button` para color, tamano y variante. Para temas avanzados se puede sobreescribir directamente en el contenedor o en los botones hijos:

```css
/* Pill Toggle */
.demo-btgl-pill {
  --w3f-btgl-radius: 999px;
  background: #f1f5f9;
  border-radius: 999px;
  padding: 4px;
  gap: 6px;
}

.demo-btgl-pill .w3f-btn {
  border-radius: 999px !important;
  border: none;
  min-width: 80px;
}

/* Segment Control */
.demo-btgl-segment {
  --w3f-btgl-radius: 10px;
  background: #e5e7eb;
  border-radius: 10px;
  padding: 3px;
  gap: 2px;
}

.demo-btgl-segment .w3f-btn {
  border-radius: 8px !important;
  border: none;
  font-weight: 600;
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-btgl-radius` | `var(--w3f-radius)` | Radio de los bordes izquierdo y derecho del grupo |

> El radio se aplica automaticamente al primer y ultimo hijo (`first-child` / `last-child`). Los botones intermedios tienen `border-radius: 0` para el efecto de grupo unificado.

### Comportamiento responsive

En pantallas menores a `640px` el grupo cambia automaticamente a orientacion vertical (`flex-direction: column`), con `width: 100%` para cada boton y radio aplicado en las esquinas superior e inferior.

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `options` | `ButtonToggleOption[]` | `[]` | Lista de opciones del grupo |
| `value` | `ButtonToggleValue` | — | Valor controlado externamente |
| `defaultValue` | `ButtonToggleValue` | — | Valor inicial en modo no controlado |
| `multiple` | `boolean` | `false` | Permite seleccion multiple |
| `allowDeselect` | `boolean` | `false` | Permite deseleccionar en modo simple |
| `color` | `ButtonColor` | `'primary'` | Color semantico de los botones |
| `size` | `ButtonSize` | `'md'` | Tamano de los botones |
| `disabled` | `boolean` | `false` | Deshabilita todo el grupo |
| `ariaLabel` | `string` | auto | Etiqueta ARIA del contenedor `role="group"` |
| `name` | `string` | — | Campo en Form/LiveForm |
| `onSelect` | `(value: ButtonToggleValue) => void` | — | Callback al cambiar seleccion |
| `onChange` | `(e: ButtonToggleChangeEvent) => void` | — | Callback alternativo estilo input |
| `className` | `string` | `''` | Clases CSS adicionales al contenedor |

### ButtonToggleOption

| Campo | Tipo | Descripcion |
|---|---|---|
| `value` | `string \| number` | Identificador de la opcion |
| `label` | `ReactNode` | Contenido visible del boton |
| `disabled` | `boolean` | Deshabilita solo esta opcion |

### ButtonToggleValue

```ts
type ButtonToggleValue = string | number | Array<string | number> | null;
```

En modo `multiple` siempre es un array. En modo simple puede ser `string | number | null`.

## Prioridad de valor

1. `FormContext` (cuando `name` esta definido y hay Form padre)
2. Prop `value` (modo controlado externo)
3. Estado interno (modo no controlado, inicializado con `defaultValue`)

## API

### Entrada de datos

El ButtonToggle acepta datos por tres vias:

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Opciones | `options` | `ButtonToggleOption[]` | Lista de opciones. Cada opcion tiene `value`, `label` y `disabled` opcional |
| Valor controlado | `value` | `ButtonToggleValue` | Valor o array de valores impuesto desde el padre |
| FormContext | `name` | `string` | Lee `FormContext.values[name]` cuando esta dentro de un `<Form>` |
| Valor inicial | `defaultValue` | `ButtonToggleValue` | Valor inicial del estado interno en modo no controlado |

**Tipo `ButtonToggleValue`:**
```ts
type ButtonToggleValue = string | number | Array<string | number> | null;
// En modo multiple: siempre un array
// En modo simple: string | number | null (null cuando allowDeselect y se deselecciona)
```

**Logica `computeNewSelection`:**
- Modo simple: si el valor ya esta seleccionado y `allowDeselect` es `true`, retorna `null`. Si `allowDeselect` es `false`, el click no cambia el valor.
- Modo multiple: alterna la presencia del valor en el array.

### Salida de datos

| Evento | Firma | Cuando se dispara |
|---|---|---|
| `onSelect` | `(value: ButtonToggleValue) => void` | Cada vez que el usuario hace clic en una opcion. Emite el nuevo valor (simple o array) |
| `onChange` | `(e: ButtonToggleChangeEvent) => void` | Alternativo estilo input. Emite `{ target: { name?, value: ButtonToggleValue } }` |

`onSelect` y `onChange` pueden coexistir. `onSelect` es el callback principal; `onChange` es para integraciones que esperan la firma de un input nativo.

**`ButtonToggleChangeEvent`:**
```ts
interface ButtonToggleChangeEvent {
  target: {
    name?: string;
    value: ButtonToggleValue;
  };
}
```

### Comunicacion con otros componentes

#### Con Form / LiveForm (bidireccional)

ButtonToggle consume `FormContext` via `useButtonToggle({ name })`. Llama a `formContext.handleChange` con un evento sintetico:

```
Form.initialValues.view = "week"
        ↓ (lectura)
ButtonToggle lee FormContext.values["view"]
        ↓ (usuario hace clic en "month")
ButtonToggle llama formContext.handleChange({
  target: { name: "view", value: "month", type: "select" }
})
        ↓ (propagacion)
Form.onSubmit recibe { view: "month" }
```

En modo multiple, el tipo sintetico es `"select-multiple"` y el valor es un array.

**Prioridad de valor:**
```
FormContext.values[name]  →  prop value  →  estado interno (defaultValue)
```

#### Con Button (renderizado de opciones)

Cada opcion se renderiza como un `<Button>` del framework. El ButtonToggle no usa `cloneElement`; en su lugar, pasa las props directamente al renderizar:

```tsx
<Button
  variant={active ? 'raised' : 'outline'}
  color={color}
  size={size}
  disabled={disabled || option.disabled}
  aria-pressed={active}
  onClick={() => handleSelect(option.value)}
>
  {option.label}
</Button>
```

#### Independiente (sin contexto requerido)

```tsx
<ButtonToggle
  options={[{ value: 'day', label: 'Dia' }, { value: 'week', label: 'Semana' }]}
  defaultValue="day"
  onSelect={(v) => console.log(v)}
/>
```

### Accesibilidad

| Atributo | Valor | Elemento | Condicion |
|---|---|---|---|
| `role` | `"group"` | Contenedor | Siempre |
| `aria-label` | `ariaLabel` o auto-generado | Contenedor | Siempre |
| `aria-pressed` | `true` / `false` | Cada `<Button>` | Refleja si la opcion esta activa |
| `type` | `"button"` | Cada `<Button>` | Siempre (evita submits accidentales en Forms) |

Los botones son navegables por teclado con `Tab`. El estado activo se anuncia via `aria-pressed`.

### Patron de uso recomendado

```tsx
// 1. Selector de vista — seleccion simple
const [view, setView] = useState('day');
<ButtonToggle
  options={[
    { value: 'day',   label: 'Dia' },
    { value: 'week',  label: 'Semana' },
    { value: 'month', label: 'Mes' },
  ]}
  value={view}
  onSelect={(v) => setView(v as string)}
/>

// 2. Filtro de etiquetas — seleccion multiple
const [tags, setTags] = useState<string[]>(['react']);
<ButtonToggle
  options={frameworks}
  value={tags}
  multiple
  onSelect={(v) => setTags(v as string[])}
/>

// 3. Con deseleccion permitida
<ButtonToggle
  options={opts}
  allowDeselect
  value={selected}
  onSelect={(v) => setSelected(v as string | null)}
/>

// 4. Integrado en Form (simple y multiple)
<Form initialValues={{ view: 'week', tags: [] }} onSubmit={save}>
  <ButtonToggle name="view" options={viewOpts} />
  <ButtonToggle name="tags" options={tagOpts} multiple />
  <Button type="submit">Guardar</Button>
</Form>

// 5. No controlado con valor inicial
<ButtonToggle
  options={sizeOpts}
  defaultValue="md"
  color="secondary"
  size="sm"
  onSelect={(v) => console.log('Tamano:', v)}
/>
```

## Estructura de archivos

```
ButtonToggle/
  ButtonToggle.tsx            Componente principal
  ButtonToggle.types.ts       Interfaces TypeScript
  ButtonToggle.constants.ts   Clases CSS y defaults
  ButtonToggle.utils.ts       buildButtonToggleClasses, isOptionActive, computeNewSelection
  ButtonToggle.hooks.ts       useButtonToggle (integracion Form)
  README.md                   Esta documentacion
```

CSS: `src/w3fussion/INPUTS/_button-toggle.css`
