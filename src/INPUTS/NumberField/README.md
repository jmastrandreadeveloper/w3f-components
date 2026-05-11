# NumberField

Campo de entrada numerica con botones de incremento/decremento integrados (spin buttons), soporte de rango, precision decimal, tamanios y estados completos.

## Importacion

```tsx
import NumberField from '@/components/INPUTS/NumberField/NumberField';
```

## Uso basico

```tsx
<NumberField label="Quantity" />
<NumberField label="Age" placeholder="Enter your age" />
<NumberField label="Score" helperText="Enter a score value" />
```

## Valor controlado

El componente acepta `value` como `number | string`. El callback `onChange` devuelve el valor numerico clampado o una cadena vacia (`''`):

```tsx
const [qty, setQty] = useState('1');

<NumberField
  label="Quantity"
  value={qty}
  onChange={(val) => setQty(String(val))}
/>
```

## Min, Max y Step

Restringe el rango permitido y define el incremento de los spin buttons. Al perder el foco el valor se clampea automaticamente:

```tsx
<NumberField
  label="Quantity (1-10)"
  min={1}
  max={10}
  step={1}
  helperText="Min: 1, Max: 10"
/>

<NumberField
  label="Price"
  min={0}
  max={9999}
  step={0.01}
  precision={2}
  helperText="Step: 0.01"
/>

<NumberField
  label="Temperature"
  min={-40}
  max={50}
  step={0.5}
  precision={1}
  helperText="Step: 0.5, Range: -40 to 50"
/>
```

## Precision decimal

El prop `precision` controla el numero de decimales al formatear el valor tras perder el foco o usar los spin buttons:

```tsx
<NumberField label="PI" value="3.14159" precision={2} step={0.01} />
{/* On blur: "3.14" */}
```

## Tamanios

Tres variantes de tamano controladas por CSS custom properties:

```tsx
<NumberField label="Small"            size="sm" />
<NumberField label="Medium (default)" size="md" />
<NumberField label="Large"            size="lg" />
```

## Estados

### Deshabilitado

```tsx
<NumberField label="Disabled" disabled value="42" />
```

### Requerido

```tsx
<NumberField label="Required Field" required helperText="This field is required" />
```

### Error

```tsx
<NumberField label="With Error" error="Value must be greater than 0" value="-5" />
```

## Icono leading

Inserta cualquier nodo React a la izquierda del input:

```tsx
import { DollarSign } from 'lucide-react';

<NumberField
  label="Price"
  leadingIcon={<DollarSign size={16} />}
  min={0}
  step={0.01}
  precision={2}
/>
```

## Teclado

| Tecla | Accion |
|---|---|
| `ArrowUp` | Incrementa por `step` |
| `ArrowDown` | Decrementa por `step` |

## Integracion con Form / LiveForm

Cuando se proporciona `name`, el campo lee y escribe en `FormContext` automaticamente:

```tsx
<Form initialValues={{ price: 0 }} onSubmit={handleSubmit}>
  <NumberField name="price" label="Price" min={0} step={0.01} precision={2} />
  <Button type="submit">Submit</Button>
</Form>
```

## CSS Custom Properties

Aplica overrides en una clase custom sobre `.w3f-numberfield-wrapper`:

```css
.my-numberfield-theme {
  --w3f-nf-spin-width: 36px;
  --w3f-nf-spin-border-color: #f59e0b;
  --w3f-nf-spin-color: #92400e;
  --w3f-nf-spin-hover-bg: #fef3c7;
  --w3f-nf-spin-hover-color: #d97706;
  --w3f-nf-spin-active-bg: #fde68a;
  --w3f-nf-spin-active-color: #92400e;
  --w3f-nf-focus-color: #f59e0b;
  --w3f-nf-focus-border-color: #f59e0b;
  --w3f-nf-radius: 12px;
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-nf-spin-width` | `32px` | Ancho del panel de spin buttons |
| `--w3f-nf-spin-border-color` | `outline-variant` | Borde separador entre input y spin buttons |
| `--w3f-nf-spin-color` | `gray-500` | Color del texto/icono de los botones |
| `--w3f-nf-spin-font-size` | `0.625rem` | Tamano de los triangulos de incremento/decremento |
| `--w3f-nf-spin-transition` | `bg, color fast` | Transicion de los botones |
| `--w3f-nf-spin-hover-bg` | `primary-50` | Fondo del boton en hover |
| `--w3f-nf-spin-hover-color` | `primary` | Color del boton en hover |
| `--w3f-nf-spin-active-bg` | `primary-100` | Fondo del boton en click |
| `--w3f-nf-spin-active-color` | `primary-700` | Color del boton en click |
| `--w3f-nf-focus-color` | `primary` | Color del outline de foco |
| `--w3f-nf-focus-border-color` | `primary` | Color del borde separador al enfocar |
| `--w3f-nf-disabled-color` | `gray-300` | Color de botones deshabilitados |
| `--w3f-nf-disabled-opacity` | `0.5` | Opacidad en estado disabled |
| `--w3f-nf-error-color` | `danger` | Color del separador y botones en estado error |
| `--w3f-nf-radius` | `radius` | Border radius de las esquinas de los spin buttons |

Variables de tamano (sobreescritas por `--sm` / `--lg`):

| Variable | sm | md (default) | lg | touch |
|---|---|---|---|---|
| `--w3f-nf-spin-width` | `28px` | `32px` | `36px` | `40px` |
| `--w3f-nf-spin-font-size` | `0.5rem` | `0.625rem` | `0.75rem` | `0.75rem` |

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `label` | `string` | — | Etiqueta flotante del campo |
| `name` | `string` | — | Nombre del campo (activa integracion Form) |
| `value` | `number \| string` | `''` | Valor controlado |
| `onChange` | `(value: number \| '') => void` | — | Callback al cambiar el valor |
| `min` | `number` | `-Infinity` | Valor minimo permitido |
| `max` | `number` | `Infinity` | Valor maximo permitido |
| `step` | `number` | `1` | Incremento de los spin buttons |
| `precision` | `number` | — | Decimales al formatear (ej. `2` → `"3.14"`) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamano del campo |
| `disabled` | `boolean` | `false` | Deshabilita el campo y los spin buttons |
| `required` | `boolean` | `false` | Marca el campo como requerido |
| `error` | `string` | — | Mensaje de error (estado error visual) |
| `helperText` | `string` | — | Texto de ayuda bajo el campo |
| `leadingIcon` | `ReactNode` | — | Icono a la izquierda del input |
| `placeholder` | `string` | — | Placeholder del input |
| `autoComplete` | `string` | — | Atributo autocomplete del input |
| `autoFocus` | `boolean` | `false` | Enfoca el campo al montar |
| `className` | `string` | `''` | Clases CSS adicionales |
| `onBlur` | `FocusEventHandler` | — | Handler de blur del input |
| `onFocus` | `FocusEventHandler` | — | Handler de focus del input |

## API

### Entrada de datos

El NumberField acepta datos por dos vias:

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Valor controlado | `value` | `number \| string` | Valor impuesto desde el padre. Puede ser numero o string numerico |
| FormContext | `name` | `string` | Lee `FormContext.values[name]` cuando esta dentro de un `<Form>` |

**Clamping automatico:** al perder el foco (`onBlur`) el valor se valida y clampea dentro de `[min, max]`. Si `precision` esta definido, el valor se formatea con ese numero de decimales. Las teclas `ArrowUp`/`ArrowDown` incrementan o decrementan en `step` inmediatamente, con clamping aplicado.

**Limites de los spin buttons:** el boton de incremento se deshabilita cuando `value >= max`, el de decremento cuando `value <= min`.

### Salida de datos

| Evento | Firma | Cuando se dispara |
|---|---|---|
| `onChange` | `(value: number \| '') => void` | Cada cambio de texto en el input, o al usar los spin buttons. Emite el numero parseado o `''` si el campo esta vacio |
| `onBlur` | `FocusEventHandler<HTMLInputElement>` | Al perder el foco. En este punto el valor ya fue clampado y formateado |
| `onFocus` | `FocusEventHandler<HTMLInputElement>` | Al recibir el foco |

Flujo de cambio via spin buttons:
1. Click en `▲` o `▼` → `handleSpin('increment' | 'decrement')`
2. Calcula el nuevo valor: `clamp(current ± step, min, max)`
3. Si es form-controlled: llama a `formContext.handleChange`
4. Siempre llama a `onChange(newValue)` si el callback esta definido

### Comunicacion con otros componentes

#### Con Form / LiveForm (bidireccional)

El NumberField consume `FormContext` via `useNumberField({ name })`. Es `forwardRef`, por lo que tambien expone el `<input>` subyacente a refs del padre:

```
Form.initialValues.price = 0
        ↓ (lectura)
NumberField lee FormContext.values["price"]
        ↓ (usuario escribe o usa spin buttons)
NumberField llama formContext.handleChange(e)
        ↓ (blur clampea a [min, max] con precision)
Form.onSubmit recibe { price: 9.99 }
```

Los errores de Form (`formContext.errors[name]`) reemplazan al prop `error`.

#### Independiente (sin contexto requerido)

```tsx
// forwardRef — el padre puede acceder al input nativo
const inputRef = useRef<HTMLInputElement>(null);
<NumberField ref={inputRef} label="Cantidad" min={1} max={10} />
```

### Accesibilidad

| Atributo | Valor | Elemento | Condicion |
|---|---|---|---|
| `aria-invalid` | `true` / `false` | `<input>` | Cuando hay error |
| `aria-describedby` | id del error o helper | `<input>` | Cuando hay error o helperText |
| `aria-valuemin` | valor de `min` | `<input>` | Siempre |
| `aria-valuemax` | valor de `max` | `<input>` | Siempre |
| `aria-valuenow` | valor actual | `<input>` | Cuando el valor es numerico valido |
| `aria-label` | `"Incrementar valor"` | Boton `▲` | Siempre |
| `aria-label` | `"Decrementar valor"` | Boton `▼` | Siempre |
| `role` | `"alert"` | Mensaje de error | Cuando hay error |
| `inputMode` | `"decimal"` | `<input>` | Siempre (abre teclado numerico en movil) |

El label usa patron floating label: flota sobre el input cuando hay valor, placeholder o foco.

### Patron de uso recomendado

```tsx
// 1. Campo de cantidad con rango
<NumberField label="Cantidad" min={1} max={10} step={1} />

// 2. Precio con decimales
<NumberField
  label="Precio"
  min={0}
  max={9999}
  step={0.01}
  precision={2}
  leadingIcon={<DollarSign size={16} />}
/>

// 3. Temperatura con pasos fraccionarios
<NumberField
  label="Temperatura"
  min={-40}
  max={50}
  step={0.5}
  precision={1}
  helperText="Rango: -40°C a 50°C"
/>

// 4. Integrado en Form
<Form initialValues={{ stock: 1 }} onSubmit={handleSubmit}>
  <NumberField name="stock" label="Stock" min={0} max={999} required />
  <Button type="submit">Guardar</Button>
</Form>

// 5. Controlado desde el padre
const [qty, setQty] = useState(1);
<NumberField
  label="Unidades"
  value={qty}
  onChange={(v) => v !== '' && setQty(v)}
  min={1}
  max={100}
/>
```

## Estructura de archivos

```
NumberField/
  NumberField.tsx            Componente principal (forwardRef)
  NumberField.types.ts       Interfaces TypeScript
  NumberField.constants.ts   Clases CSS y defaults
  NumberField.utils.ts       clampValue, formatValue, buildClasses
  NumberField.hooks.ts       useNumberField (Form integration, spin logic)
  README.md                  Esta documentacion
```

CSS: `src/w3fussion/INPUTS/_number-field.css`
