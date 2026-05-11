# RadioButton

Componente de seleccion unica basado en el patron Material Design. `RadioButton` debe usarse siempre dentro de un `RadioGroup`, el cual actua como contenedor controlado con integracion Form/LiveForm.

## Importacion

```tsx
import RadioGroup, { RadioButton } from '@/components/INPUTS/RadioButton/RadioButton';
```

## Uso basico

`RadioButton` obtiene el contexto de seleccion del `RadioGroup` padre via `RadioGroupContext`. El `name` del grupo es obligatorio cuando se integra con Form.

```tsx
const [color, setColor] = useState('blue');

<RadioGroup
  name="color"
  value={color}
  onChange={setColor}
  label="Select a color"
>
  <RadioButton label="Red" value="red" />
  <RadioButton label="Blue" value="blue" />
  <RadioButton label="Green" value="green" />
</RadioGroup>
```

## Uso sin control externo (defaultValue)

Cuando no se pasa `value` al grupo, el componente maneja su propio estado interno:

```tsx
<RadioGroup
  name="priority"
  defaultValue="medium"
  label="Task Priority"
>
  <RadioButton label="Low" value="low" />
  <RadioButton label="Medium" value="medium" />
  <RadioButton label="High" value="high" />
</RadioGroup>
```

## Direccion

El grupo puede orientarse vertical (default) u horizontal:

```tsx
<RadioGroup name="direction-v" value={val} onChange={setVal} direction="vertical">
  <RadioButton label="Option A" value="a" />
  <RadioButton label="Option B" value="b" />
</RadioGroup>

<RadioGroup name="direction-h" value={val} onChange={setVal} direction="horizontal">
  <RadioButton label="Option A" value="a" />
  <RadioButton label="Option B" value="b" />
</RadioGroup>
```

## Panel de seleccion

La prop `showSelection` muestra un panel debajo del grupo con la opcion actualmente seleccionada. Activo por defecto:

```tsx
<RadioGroup
  name="plan"
  value={plan}
  onChange={setPlan}
  label="Choose your plan"
  showSelection
>
  <RadioButton label="Free" value="free" />
  <RadioButton label="Pro" value="pro" />
  <RadioButton label="Enterprise" value="enterprise" />
</RadioGroup>
```

Para ocultarlo:

```tsx
<RadioGroup name="..." showSelection={false}>
  ...
</RadioGroup>
```

## Opciones deshabilitadas

Cada `RadioButton` acepta `disabled` de forma independiente:

```tsx
<RadioGroup name="shipping" value={shipping} onChange={setShipping} label="Shipping method">
  <RadioButton label="Standard (3-5 days)" value="standard" />
  <RadioButton label="Express (1-2 days)" value="express" />
  <RadioButton label="Same Day (unavailable)" value="same-day" disabled />
  <RadioButton label="Pickup (unavailable)" value="pickup" disabled />
</RadioGroup>
```

## Multiples grupos independientes

Varios `RadioGroup` en la misma pagina son independientes siempre que tengan `name` distintos:

```tsx
<RadioGroup name="language" value={language} onChange={setLanguage} label="Language" direction="vertical">
  <RadioButton label="English" value="en" />
  <RadioButton label="Spanish" value="es" />
  <RadioButton label="French" value="fr" />
</RadioGroup>

<RadioGroup name="plan" value={plan} onChange={setPlan} label="Subscription" direction="vertical" showSelection>
  <RadioButton label="Monthly - $9/mo" value="monthly" />
  <RadioButton label="Annual - $79/yr" value="annual" />
</RadioGroup>
```

## Validacion y error

La prop `error` del `RadioGroup` muestra un mensaje de error bajo el grupo. `required` marca el label con asterisco:

```tsx
<RadioGroup
  name="terms"
  value={terms}
  onChange={setTerms}
  label="Accept terms"
  required
  error={!terms ? 'You must select an option' : undefined}
>
  <RadioButton label="I accept" value="yes" />
  <RadioButton label="I decline" value="no" />
</RadioGroup>
```

## Integracion con Form / LiveForm

Cuando `RadioGroup` se usa dentro de un `<Form>` con el prop `name`, lee y escribe automaticamente en `FormContext`. No se requiere `value` ni `onChange` propios:

```tsx
<Form initialValues={{ plan: 'free' }} onSubmit={handleSubmit}>
  <RadioGroup name="plan" label="Select plan" required>
    <RadioButton label="Free" value="free" />
    <RadioButton label="Pro" value="pro" />
    <RadioButton label="Enterprise" value="enterprise" />
  </RadioGroup>
  <Button type="submit">Submit</Button>
</Form>
```

## CSS Custom Properties

El checkmark circular es 100% configurable via CSS custom properties. Aplica overrides en una clase custom al `RadioGroup`:

```css
.mi-radio-custom {
  --w3f-radio-size: 22px;
  --w3f-radio-bg: #f3e8ff;
  --w3f-radio-border-color: #c084fc;
  --w3f-radio-hover-bg: #e9d5ff;
  --w3f-radio-checked-bg: #9333ea;
  --w3f-radio-checked-border-color: #7e22ce;
  --w3f-radio-dot-color: #ffffff;
  --w3f-radio-disabled-opacity: 0.4;
}
```

```tsx
<RadioGroup className="mi-radio-custom" name="..." ...>
  <RadioButton label="Option A" value="a" />
</RadioGroup>
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-radio-size` | `var(--w3f-space-5)` | Tamano del circulo checkmark |
| `--w3f-radio-bg` | `var(--w3f-gray-200)` | Fondo del circulo sin marcar |
| `--w3f-radio-border-color` | `var(--w3f-gray-400)` | Borde del circulo sin marcar |
| `--w3f-radio-radius` | `var(--w3f-radius-full)` | Radio de borde del circulo |
| `--w3f-radio-transition` | `all var(--w3f-transition-fast)` | Transicion de estado |
| `--w3f-radio-hover-bg` | `var(--w3f-gray-300)` | Fondo en hover (no marcado) |
| `--w3f-radio-checked-bg` | `var(--w3f-primary-600)` | Fondo cuando esta marcado |
| `--w3f-radio-checked-border-color` | `var(--w3f-primary-600)` | Borde cuando esta marcado |
| `--w3f-radio-dot-color` | `var(--w3f-on-primary)` | Color del punto interior |
| `--w3f-radio-disabled-opacity` | `0.5` | Opacidad en estado disabled |

## Props — RadioGroup

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | — | `RadioButton` hijos (requerido) |
| `name` | `string` | auto-id | Nombre del campo (requerido para Form) |
| `value` | `string` | — | Valor controlado externamente |
| `defaultValue` | `string` | `''` | Valor inicial no controlado |
| `onChange` | `(value: string) => void` | — | Callback al cambiar seleccion |
| `direction` | `'horizontal' \| 'vertical'` | `'vertical'` | Orientacion del grupo |
| `label` | `string` | — | Etiqueta del fieldset |
| `showSelection` | `boolean` | `true` | Mostrar panel con valor seleccionado |
| `required` | `boolean` | `false` | Campo obligatorio (agrega asterisco) |
| `error` | `string` | — | Mensaje de error |
| `onBlur` | `() => void` | — | Callback al perder foco |
| `className` | `string` | `''` | Clases CSS adicionales (recibe CSS vars) |

## Props — RadioButton

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `label` | `string` | — | Texto visible de la opcion (requerido) |
| `value` | `string` | — | Valor de la opcion (requerido) |
| `disabled` | `boolean` | `false` | Deshabilita esta opcion |
| `className` | `string` | `''` | Clases CSS adicionales |

## API

### Entrada de datos

`RadioGroup` acepta datos por tres vias. `RadioButton` obtiene todos sus datos desde `RadioGroupContext` y no acepta valor directamente:

| Via | Prop (RadioGroup) | Tipo | Descripcion |
|---|---|---|---|
| Valor controlado | `value` | `string` | Valor impuesto desde el padre. Reactivo a cambios externos |
| FormContext | `name` | `string` | Lee `FormContext.values[name]` cuando el grupo esta dentro de un `<Form>` |
| Valor inicial | `defaultValue` | `string` | Valor inicial del estado interno cuando no hay control externo |

**Prioridad de resolucion de valor:**
```
FormContext.values[name]  →  prop value  →  estado interno (defaultValue)
```

### Salida de datos

| Evento | Firma | Componente | Cuando se dispara |
|---|---|---|---|
| `onChange` | `(value: string) => void` | `RadioGroup` | El usuario selecciona cualquier `RadioButton` del grupo. Emite el `value` de la opcion elegida |
| `onBlur` | `() => void` | `RadioGroup` | Al perder el foco del grupo completo |

Flujo de seleccion:
1. Usuario hace clic en un `RadioButton`
2. El hijo llama a `RadioGroupContext.onChange(value)` via `useRadioGroup()`
3. `RadioGroup.handleChange(newValue)` actualiza el estado interno o el FormContext
4. Se llama a `onChange(newValue)` si el callback esta definido
5. En mode Form, `Form.onSubmit` recibe `{ [name]: string }`

### Comunicacion con otros componentes

#### RadioGroup → RadioButton (Context Provider / Consumer)

`RadioGroup` es el **unico punto de estado**. Provee `RadioGroupContext` con:

```ts
{
  selectedValue: string,  // valor actualmente seleccionado
  onChange: (value: string) => void,  // funcion para cambiar seleccion
  name: string,           // nombre del radio group (para input[type=radio])
  direction: 'horizontal' | 'vertical'
}
```

`RadioButton` consume este contexto via `useRadioGroup()`. Si se usa fuera de un `RadioGroup`, `useRadioGroup()` lanzara un error. Los `RadioButton` no tienen props de valor — son completamente pasivos.

#### Con Form / LiveForm (bidireccional)

```
Form.initialValues.plan = "free"
        ↓ (lectura)
RadioGroup lee FormContext.values["plan"]
        ↓ (usuario selecciona opcion)
RadioGroup escribe formContext.handleChange({ target: { name, value, type: 'radio' } })
        ↓ (propagacion)
Form.onSubmit recibe { plan: "pro" }
```

Los errores de validacion del Form se leen con `formContext.errors[name]` y reemplazan al prop `error`.

### Accesibilidad

| Atributo | Valor | Elemento | Condicion |
|---|---|---|---|
| `role` | `"radiogroup"` | Contenedor de opciones | Siempre |
| `aria-label` | valor del prop `label` | Contenedor de opciones | Cuando `label` esta definido |
| `aria-required` | `true` / `false` | Contenedor de opciones | Segun prop `required` |
| `aria-invalid` | `true` / `false` | Contenedor de opciones | Cuando hay error |
| `role` | `"alert"` | Mensaje de error | Cuando hay error |
| `role` | `"status"` | Panel de seleccion | Cuando `showSelection` es `true` |
| `aria-live` | `"polite"` | Panel de seleccion | Cuando `showSelection` es `true` |

Los `<input type="radio">` nativos garantizan navegacion por teclado: `ArrowUp`/`ArrowDown` mueven la seleccion entre opciones.

### Patron de uso recomendado

```tsx
// 1. Controlado — con estado externo
const [plan, setPlan] = useState('free');
<RadioGroup name="plan" value={plan} onChange={setPlan} label="Plan">
  <RadioButton label="Free" value="free" />
  <RadioButton label="Pro" value="pro" />
</RadioGroup>

// 2. No controlado — estado interno
<RadioGroup name="size" defaultValue="medium" label="Tamano">
  <RadioButton label="Small" value="small" />
  <RadioButton label="Medium" value="medium" />
  <RadioButton label="Large" value="large" />
</RadioGroup>

// 3. Horizontal con opciones individuales deshabilitadas
<RadioGroup name="shipping" value={shipping} onChange={setShipping} direction="horizontal">
  <RadioButton label="Estandar" value="standard" />
  <RadioButton label="Express" value="express" />
  <RadioButton label="No disponible" value="same-day" disabled />
</RadioGroup>

// 4. Integrado en Form con validacion
<Form initialValues={{ plan: '' }} onSubmit={handleSubmit}>
  <RadioGroup name="plan" label="Selecciona tu plan" required>
    <RadioButton label="Free" value="free" />
    <RadioButton label="Pro" value="pro" />
  </RadioGroup>
  <Button type="submit">Continuar</Button>
</Form>

// 5. Con mensaje de error manual
<RadioGroup
  name="terms"
  value={terms}
  onChange={setTerms}
  label="Acepta los terminos"
  error={!terms ? 'Debes aceptar para continuar' : undefined}
>
  <RadioButton label="Acepto" value="yes" />
  <RadioButton label="No acepto" value="no" />
</RadioGroup>
```

## Estructura de archivos

```
RadioButton/
  RadioButton.tsx           RadioButton + RadioGroup components
  RadioButton.types.ts      Interfaces TypeScript
  RadioButton.constants.ts  Clases CSS y strings
  RadioButton.utils.ts      buildRadioButtonClasses(), buildRadioGroupContainerClasses()
  RadioButton.hooks.ts      RadioGroupContext, useRadioGroup, useRadioFormContext
  README.md                 Esta documentacion
```

CSS: `src/w3fussion/INPUTS/_radio-button.css`
