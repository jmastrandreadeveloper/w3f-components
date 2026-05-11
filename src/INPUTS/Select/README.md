# Select

Componente de seleccion nativa con label flotante, grupos de opciones, seleccion multiple, iconos y soporte para Form/LiveForm.

## Importacion

```tsx
import Select from '@/components/INPUTS/Select/Select';
```

## Uso basico

### Select simple con placeholder

```tsx
const [value, setValue] = useState('');

<Select
  label="Country"
  options={[
    { value: '', label: 'Select a country...' },
    { value: 'ar', label: 'Argentina' },
    { value: 'br', label: 'Brazil' },
    { value: 'us', label: 'United States' },
  ]}
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

## Con iconos

Muestra un icono a la izquierda del campo. El trailing chevron aparece automaticamente en selects simples:

```tsx
import { Globe } from 'lucide-react';

<Select
  label="Country"
  options={COUNTRIES}
  leadingIcon={<Globe size={18} />}
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

Para reemplazar el chevron por defecto, usa `trailingIcon`:

```tsx
<Select
  label="Role"
  options={ROLE_OPTIONS}
  trailingIcon={<ChevronDown size={18} />}
/>
```

## Grupos de opciones

Organiza las opciones en categorias usando `optgroup`:

```tsx
const GROUPED_OPTIONS = [
  {
    label: 'Frontend',
    options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue.js' },
    ],
  },
  {
    label: 'Backend',
    options: [
      { value: 'node', label: 'Node.js' },
      { value: 'python', label: 'Python' },
    ],
  },
];

<Select
  label="Technology Stack"
  options={GROUPED_OPTIONS}
  value={framework}
  onChange={(e) => setFramework(e.target.value)}
/>
```

## Seleccion multiple

Permite seleccionar varios valores a la vez (Ctrl/Cmd + click). El trailing chevron no aparece en modo multiple:

```tsx
const [selected, setSelected] = useState<string[]>([]);

<Select
  label="Languages"
  options={LANGUAGES}
  multiple
  value={selected}
  onChange={(e) => {
    const vals = Array.from(e.target.selectedOptions, opt => opt.value);
    setSelected(vals);
  }}
/>
```

## Estados

### Required

```tsx
<Select
  label="Priority"
  options={PRIORITY_OPTIONS}
  required
  helperText="This field is required"
/>
```

### Disabled

```tsx
<Select
  label="Country"
  options={COUNTRIES}
  disabled
  value="us"
/>
```

### Con error

```tsx
<Select
  label="Priority"
  options={PRIORITY_OPTIONS}
  error="Please select a priority level"
/>
```

### Con helper text

```tsx
<Select
  label="Role"
  options={ROLE_OPTIONS}
  helperText="Choose the appropriate role for this user"
/>
```

## Integracion con Form / LiveForm

Cuando se proporciona `name`, el select lee y escribe en `FormContext` automaticamente:

```tsx
<Form
  initialValues={{ priority: '', role: '' }}
  onSubmit={(values) => console.log(values)}
>
  <Select name="priority" label="Priority" options={PRIORITY_OPTIONS} />
  <Select name="role" label="Role" options={ROLE_OPTIONS} />
  <Button type="submit">Guardar</Button>
</Form>
```

La validacion del Form se refleja automaticamente en `error` cuando el campo tiene errores.

## CSS Custom Properties

El select es 100% configurable via CSS custom properties. Aplica overrides en una clase custom:

```css
.mi-select-dark {
  --w3f-sel-bg: #1f2937;
  --w3f-sel-color: #f9fafb;
  --w3f-sel-border-color: #4b5563;
  --w3f-sel-radius: 8px;
  --w3f-sel-font-size: 0.95rem;
}

.mi-select-rounded {
  --w3f-sel-border-color: #c084fc;
  --w3f-sel-radius: 50px;
  --w3f-sel-focus-border-color: #9333ea;
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-sel-margin-bottom` | `space-6` | Margen inferior del contenedor |
| `--w3f-sel-padding` | `12px` | Padding interno del select |
| `--w3f-sel-font-size` | `1rem` | Tamano de fuente |
| `--w3f-sel-border-color` | `gray-300` | Color del borde |
| `--w3f-sel-radius` | `8px` | Border radius |
| `--w3f-sel-transition` | `border-color, box-shadow 0.2s` | Transicion de propiedades |
| `--w3f-sel-focus-border-color` | `primary` | Color del borde al hacer focus |
| `--w3f-sel-disabled-bg` | `#f3f4f6` | Fondo en estado disabled |
| `--w3f-sel-disabled-color` | `#9ca3af` | Texto en estado disabled |
| `--w3f-sel-error-color` | `danger` | Color para estado de error |
| `--w3f-sel-multiple-checked-bg` | `primary-light` | Fondo de opcion seleccionada (multiple) |
| `--w3f-sel-multiple-checked-color` | `primary` | Texto de opcion seleccionada (multiple) |
| `--w3f-sel-icon-color` | `gray-400` | Color de los iconos |
| `--w3f-sel-icon-transition` | `transform, color 0.2s` | Transicion del icono trailing |
| `--w3f-sel-label-color` | `gray-400` | Color del label |
| `--w3f-sel-label-floating-bg` | `white` | Fondo del label flotante |
| `--w3f-sel-label-transition` | `all 0.2s ease-out` | Transicion del label flotante |
| `--w3f-sel-message-font-size` | `0.75rem` | Tamano de fuente de mensajes |
| `--w3f-sel-helper-color` | `gray-400` | Color del helper text |

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `label` | `string` | — | Texto del label flotante |
| `name` | `string` | — | Campo en Form/LiveForm |
| `options` | `SelectOptionOrGroup[]` | `[]` | Opciones del select |
| `value` | `string \| string[]` | — | Valor controlado |
| `onChange` | `(e: ChangeEvent) => void` | — | Callback al cambiar valor |
| `error` | `string` | — | Mensaje de error |
| `helperText` | `string` | — | Texto de ayuda |
| `disabled` | `boolean` | `false` | Estado deshabilitado |
| `required` | `boolean` | `false` | Campo obligatorio |
| `multiple` | `boolean` | `false` | Seleccion multiple |
| `autoFocus` | `boolean` | `false` | Foco automatico al montar |
| `leadingIcon` | `ReactNode` | — | Icono a la izquierda |
| `trailingIcon` | `ReactNode` | — | Reemplaza el chevron por defecto |
| `className` | `string` | `''` | Clases CSS adicionales |
| `onBlur` | `FocusEventHandler` | — | Handler de blur |

## Tipos de opciones

```ts
interface SelectOption {
  value: string | number | null;
  label: string;
  disabled?: boolean;
}

interface SelectOptionGroup {
  label: string;
  options: SelectOption[];
  disabled?: boolean;
}

type SelectOptionOrGroup = SelectOption | SelectOptionGroup;
```

## API

### Entrada de datos

El Select acepta datos por tres vias:

| Via | Prop / Fuente | Tipo | Descripcion |
|---|---|---|---|
| Valor controlado | `value` | `string \| string[]` | Valor externo gestionado por el padre. `string[]` cuando `multiple={true}` |
| FormContext | `name` | `string` | Lee `FormContext.values[name]` como valor del select. Activo cuando `name` esta definido y hay un `<Form>` en el arbol |
| Valor no controlado | — | — | Si ni `value` ni FormContext estan activos, el Select usa `useState` interno inicializado en `''` (simple) o `[]` (multiple) |
| Opciones planas | `options` | `SelectOption[]` | Array de `{ value, label, disabled? }`. Se renderizan como `<option>` directos |
| Opciones agrupadas | `options` | `SelectOptionGroup[]` | Array de `{ label, options, disabled? }`. Se renderizan como `<optgroup>` con sus `<option>` hijos |

**Formato de datos para `options`:**
```ts
// Opciones planas
{ value: string | number | null, label: string, disabled?: boolean }

// Grupos
{ label: string, options: SelectOption[], disabled?: boolean }

// Ambos pueden mezclarse en el mismo array (SelectOptionOrGroup[])
```

**Prioridad de resolucion del valor:**
```
FormContext.values[name]  →  prop value  →  useState interno
```

**Prioridad de resolucion del error:**
```
FormContext.errors[name]  →  prop error
```

### Salida de datos

| Evento | Firma | Cuando se dispara |
|---|---|---|
| `onChange` | `(e: React.ChangeEvent<HTMLSelectElement>) => void` | Cada vez que el usuario selecciona una opcion. El evento nativo del `<select>` es pasado sin modificar. En modo `multiple`, `e.target.selectedOptions` contiene todas las opciones marcadas |
| `onBlur` | `(e: React.FocusEvent<HTMLSelectElement>) => void` | Cuando el select pierde el foco. Si hay FormContext activo, primero notifica a `formContext.handleBlur(e)` |

El flujo completo de `onChange` es:
1. El usuario selecciona una opcion → evento nativo del `<select>`
2. Si `isFormControlled`: se llama `formContext.handleChange(e)` → Form actualiza `values[name]`
3. Si no hay FormContext pero `onChange` existe: se llama el callback externo
4. Si no hay FormContext ni `onChange`: el Select actualiza su `useState` interno

**Lectura de seleccion multiple sin FormContext:**
```tsx
<Select
  multiple
  options={LANGUAGES}
  onChange={(e) => {
    const vals = Array.from(e.target.selectedOptions, opt => opt.value);
    setSelected(vals);
  }}
/>
```

### Comunicacion con otros componentes

#### Con Form / LiveForm (bidireccional)

El Select consume `FormContext` via `useSelectFormContext()`. La comunicacion es **bidireccional**:

```
Form.initialValues.priority = ""
        ↓ (lectura)
Select lee FormContext.values["priority"] como value
        ↓ (usuario selecciona)
Select llama formContext.handleChange(e)
        ↓ (propagacion)
Form actualiza values["priority"] en su estado
        ↓ (submit)
Form.onSubmit recibe { priority: "high" }
```

**Patron de deteccion:** `isFormControlled = !!(formContext && name)` — si `formContext` es `null` (fuera de Form) o `name` no esta definido, el Select opera de forma independiente sin errores.

**Errores de validacion:** cuando el Form setea `errors[name]`, el Select renderiza automaticamente el mensaje de error y activa `aria-invalid="true"` en el `<select>`.

#### Independiente (sin contexto requerido)

El Select puede usarse sin ningun Form o Provider. Tres modos de operacion:

```tsx
// 1. No controlado — estado interno del Select
<Select label="Pais" options={COUNTRIES} />

// 2. Controlado — el padre gestiona el estado
const [val, setVal] = useState('');
<Select
  label="Pais"
  options={COUNTRIES}
  value={val}
  onChange={(e) => setVal(e.target.value)}
/>

// 3. Multiple no controlado — estado interno como string[]
<Select label="Idiomas" options={LANGUAGES} multiple />
```

### Accesibilidad

| Atributo | Valor | Condicion |
|---|---|---|
| `aria-invalid` | `"true"` | Cuando hay un mensaje de error (de FormContext o del prop `error`) |
| `aria-describedby` | `"{id}-error"` | Cuando hay error activo; apunta al `<p>` con el mensaje |
| `aria-describedby` | `"{id}-helper"` | Cuando hay `helperText` y no hay error; apunta al `<p>` de ayuda |
| `role` | `"alert"` | En el `<p>` del mensaje de error |
| `id` / `htmlFor` | par unico via `useId()` | El `<select>` y su `<label>` siempre estan vinculados con un ID generado automaticamente |
| `aria-hidden` | `"true"` | En el SVG del chevron por defecto (`DefaultChevron`) |
| `disabled` | nativo | Propagado directamente al `<select>` HTML |
| `required` | nativo | Propagado directamente al `<select>` HTML |
| `multiple` | nativo | Propagado directamente al `<select>` HTML |

### Patron de uso recomendado

```tsx
// 1. Select simple con opciones planas
const [pais, setPais] = useState('');

<Select
  label="Pais"
  options={[
    { value: 'ar', label: 'Argentina' },
    { value: 'br', label: 'Brasil' },
    { value: 'mx', label: 'Mexico' },
  ]}
  value={pais}
  onChange={(e) => setPais(e.target.value)}
/>

// 2. Select agrupado con icono leading
<Select
  label="Tecnologia"
  options={[
    { label: 'Frontend', options: [{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }] },
    { label: 'Backend',  options: [{ value: 'node', label: 'Node.js' }, { value: 'py', label: 'Python' }] },
  ]}
  leadingIcon={<Code size={18} />}
  value={tech}
  onChange={(e) => setTech(e.target.value)}
/>

// 3. Seleccion multiple
const [langs, setLangs] = useState<string[]>([]);

<Select
  label="Idiomas"
  options={LANGUAGES}
  multiple
  value={langs}
  onChange={(e) => {
    const vals = Array.from(e.target.selectedOptions, o => o.value);
    setLangs(vals);
  }}
/>

// 4. Integrado en Form — estado y errores gestionados automaticamente
<Form
  initialValues={{ prioridad: '', rol: '' }}
  onSubmit={(values) => guardar(values)}
>
  <Select name="prioridad" label="Prioridad" options={PRIORITY_OPTIONS} required />
  <Select name="rol"       label="Rol"       options={ROLE_OPTIONS} />
  <Button type="submit">Guardar</Button>
</Form>

// 5. Ref forwarding — acceso directo al elemento DOM
const selectRef = useRef<HTMLSelectElement>(null);

<Select
  ref={selectRef}
  label="Categoria"
  options={CATEGORIES}
  onFocus={() => console.log('Select size:', selectRef.current?.size)}
/>
```

## Estructura de archivos

```
Select/
  Select.tsx            Componente principal (forwardRef)
  Select.types.ts       Interfaces TypeScript
  Select.constants.ts   Clases CSS BEM
  Select.utils.ts       isOptionGroup(), buildSelectClasses(), buildLabelClasses(), hasSelectValue()
  Select.hooks.ts       useSelectFormContext(), useSelectFocus()
  README.md             Esta documentacion
```

CSS: `src/w3fussion/INPUTS/_select.css`
