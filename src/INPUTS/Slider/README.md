# Slider

Componente de entrada de rango con barra de progreso visual, thumb interactivo y soporte para formularios controlados y no controlados.

## Importacion

```tsx
import Slider from '@/components/INPUTS/Slider/Slider';
```

## Uso basico

```tsx
<Slider label="Volumen" defaultValue={50} showValue />
```

## Uso controlado

Pasa `value` + `onChange` para controlar el estado desde el componente padre:

```tsx
const [value, setValue] = useState(50);

<Slider
  label="Brillo"
  value={value}
  onChange={setValue}
  showValue
/>
```

## Min, Max y Step

```tsx
{/* Pasos de 5 en rango 0-100 */}
<Slider label="Porcentaje" defaultValue={25} min={0} max={100} step={5} showValue />

{/* Pasos decimales */}
<Slider label="Temperatura" defaultValue={22} min={16} max={30} step={0.5} showValue />

{/* Rango amplio */}
<Slider label="Presupuesto" defaultValue={500} min={0} max={2000} step={50} showValue />
```

## Disabled

```tsx
<Slider label="Solo lectura" value={65} disabled showValue />
```

## Multiples sliders independientes

Cada instancia mantiene su propio estado interno cuando no se controla externamente:

```tsx
<Slider label="Bass"     defaultValue={70} showValue min={0} max={100} />
<Slider label="Mid"      defaultValue={50} showValue min={0} max={100} />
<Slider label="Treble"   defaultValue={60} showValue min={0} max={100} />
<Slider label="Presence" defaultValue={45} showValue min={0} max={100} />
```

## Integracion con Form / LiveForm

Cuando se proporciona `name`, el slider lee y escribe en `FormContext`. Fuera de un `<Form>` funciona de manera autonoma:

```tsx
<Form initialValues={{ volumen: 50 }} onSubmit={handleSubmit}>
  <Slider name="volumen" label="Volumen" showValue />
  <Button type="submit">Guardar</Button>
</Form>
```

## CSS Custom Properties

El slider es 100% configurable via CSS custom properties. Las variables se definen en `.w3f-slider-wrapper` y se aplican tanto al track como al thumb. Para sobrescribir, aplica overrides en una clase custom pasada via `className`:

```css
.mi-slider-custom {
  --w3f-slider-track-height: 12px;
  --w3f-slider-track-radius: 4px;
  --w3f-slider-thumb-size: 28px;
  --w3f-slider-thumb-bg: #6366f1;
  --w3f-slider-thumb-border: 3px solid white;
  --w3f-slider-thumb-shadow: 0 2px 8px rgba(99, 102, 241, 0.4);
  --w3f-slider-thumb-hover-bg: #4f46e5;
}
```

```tsx
<Slider className="mi-slider-custom" label="Custom" defaultValue={40} showValue />
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-slider-track-height` | `10px` | Alto de la pista |
| `--w3f-slider-track-radius` | `var(--w3f-radius-xl)` | Border radius de la pista |
| `--w3f-slider-transition` | `all var(--w3f-transition-fast)` | Transicion de thumb y track |
| `--w3f-slider-thumb-size` | `24px` | Ancho y alto del thumb |
| `--w3f-slider-thumb-bg` | `var(--w3f-primary)` | Color de fondo del thumb |
| `--w3f-slider-thumb-hover-bg` | `var(--w3f-primary-700)` | Color thumb en hover |
| `--w3f-slider-thumb-disabled-bg` | `var(--w3f-gray-400)` | Color thumb deshabilitado |
| `--w3f-slider-thumb-border` | `3px solid white` | Borde del thumb |
| `--w3f-slider-thumb-radius` | `50%` | Border radius del thumb |
| `--w3f-slider-thumb-shadow` | `0 2px 6px rgba(0,0,0,0.2)` | Sombra del thumb en reposo |
| `--w3f-slider-thumb-active-shadow` | `0 3px 8px rgba(0,0,0,0.3)` | Sombra del thumb al arrastrar |
| `--w3f-slider-thumb-focus-shadow` | `0 0 0 4px rgba(37,99,235,0.2)` | Anillo de foco (accesibilidad) |
| `--w3f-slider-disabled-opacity` | `0.5` | Opacidad cuando esta deshabilitado |

### Ejemplos de temas CSS

```css
/* Tema grueso con borde azul */
.slider-thick {
  --w3f-slider-track-height: 12px;
  --w3f-slider-thumb-size: 26px;
  --w3f-slider-thumb-bg: #ffffff;
  --w3f-slider-thumb-border: 3px solid #3b82f6;
  --w3f-slider-thumb-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
}

/* Tema plano sin sombra */
.slider-flat {
  --w3f-slider-track-height: 6px;
  --w3f-slider-thumb-size: 18px;
  --w3f-slider-thumb-bg: #6366f1;
  --w3f-slider-thumb-border: none;
  --w3f-slider-thumb-shadow: none;
}

/* Tema calido */
.slider-warm {
  --w3f-slider-track-height: 8px;
  --w3f-slider-thumb-size: 22px;
  --w3f-slider-thumb-bg: #fbbf24;
  --w3f-slider-thumb-border: 2px solid #d97706;
  --w3f-slider-thumb-shadow: 0 2px 6px rgba(245, 158, 11, 0.3);
}
```

## Progreso visual

El relleno de la pista se genera dinamicamente mediante un `linear-gradient` calculado en React a partir del valor actual, `min` y `max`. Usa los tokens del framework:

- Porcion activa: `var(--w3f-primary)`
- Porcion inactiva: `var(--w3f-gray-200)`

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `label` | `string` | `''` | Etiqueta visible encima del slider |
| `value` | `number` | — | Valor controlado |
| `defaultValue` | `number` | `50` | Valor inicial no controlado |
| `min` | `number` | `0` | Valor minimo |
| `max` | `number` | `100` | Valor maximo |
| `step` | `number` | `1` | Incremento de cada paso |
| `showValue` | `boolean` | `true` | Muestra el valor seleccionado debajo |
| `disabled` | `boolean` | `false` | Deshabilita la interaccion |
| `name` | `string` | — | Campo en Form/LiveForm |
| `onChange` | `(value: number) => void` | — | Callback al cambiar el valor |
| `onBlur` | `FocusEventHandler` | — | Callback al perder el foco |
| `className` | `string` | `''` | Clases CSS adicionales (para overrides de vars) |

## Accesibilidad

El componente aplica atributos ARIA al `<input type="range">`:

- `aria-label` — etiqueta del label prop
- `aria-valuemin` — valor del prop `min`
- `aria-valuemax` — valor del prop `max`
- `aria-valuenow` — valor actual
- Focus ring visible via `--w3f-slider-thumb-focus-shadow`

## API

### Entrada de datos

El Slider acepta datos por tres vias:

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Valor controlado | `value` | `number` | Valor impuesto desde el padre. Prioridad sobre estado interno |
| FormContext | `name` | `string` | Lee `FormContext.values[name]` cuando el slider esta dentro de un `<Form>` |
| Valor inicial | `defaultValue` | `number` | Valor inicial del estado interno cuando el slider no esta controlado |

**Prioridad de resolucion de valor:**
```
FormContext.values[name]  →  prop value  →  estado interno (defaultValue)
```

El progreso visual se genera dinamicamente via `buildSliderBackground(percentage)`, que calcula un `linear-gradient` CSS a partir del porcentaje actual usando `var(--w3f-primary)` para la zona activa y `var(--w3f-gray-200)` para la inactiva.

### Salida de datos

| Evento | Firma | Cuando se dispara |
|---|---|---|
| `onChange` | `(value: number) => void` | Cada vez que el usuario arrastra o hace clic en la pista. Emite el valor numerico actual |
| `onBlur` | `FocusEventHandler<HTMLInputElement>` | Al perder el foco en el `<input type="range">` subyacente |

Flujo completo en modo Form:
1. Usuario mueve el thumb → `handleChange` calcula el nuevo valor
2. Si es form-controlled: llama a `formContext.handleChange(e)` con el evento nativo
3. Siempre llama a `onChange(newValue)` si el callback esta definido
4. En submit, `Form.onSubmit` recibe `{ [name]: number }`

### Comunicacion con otros componentes

#### Con Form / LiveForm (bidireccional)

El Slider consume `FormContext` via `useSliderFormContext()`. La deteccion es automatica:

```
Form.initialValues.volumen = 50
        ↓ (lectura)
Slider lee FormContext.values["volumen"]
        ↓ (usuario mueve el thumb)
Slider escribe formContext.handleChange(e)
        ↓ (propagacion)
Form.onSubmit recibe { volumen: 75 }
```

**Patron de deteccion:** `isFormControlled = !!(formContext && name)` — si `formContext` es `null` (fuera de Form) o `name` no esta definido, el slider funciona de forma autonoma.

#### Independiente (sin contexto requerido)

El Slider no requiere ningun Provider para funcionar. Modo no controlado con `defaultValue`:

```tsx
// Funciona en cualquier parte del arbol React
<Slider defaultValue={50} onChange={(v) => console.log(v)} />
```

### Accesibilidad

El `<input type="range">` subyacente expone atributos ARIA completos:

| Atributo | Valor | Condicion |
|---|---|---|
| `aria-label` | valor del prop `label` | Cuando `label` esta definido |
| `aria-valuemin` | valor del prop `min` | Siempre |
| `aria-valuemax` | valor del prop `max` | Siempre |
| `aria-valuenow` | valor actual | Siempre |

El foco ring es visible via `--w3f-slider-thumb-focus-shadow`. Navegacion por teclado nativa del browser: `ArrowLeft`/`ArrowRight` mueven el valor en incrementos de `step`.

### Patron de uso recomendado

```tsx
// 1. No controlado — estado interno
<Slider label="Volumen" defaultValue={50} showValue />

// 2. Controlado — valor desde el padre
const [brillo, setBrillo] = useState(70);
<Slider label="Brillo" value={brillo} onChange={setBrillo} showValue />

// 3. Rango con pasos y decimales
<Slider label="Temperatura" min={16} max={30} step={0.5} defaultValue={22} showValue />

// 4. Integrado en Form
<Form initialValues={{ volumen: 50 }} onSubmit={save}>
  <Slider name="volumen" label="Volumen" showValue />
  <Button type="submit">Guardar</Button>
</Form>

// 5. Ecualizador — multiples sliders independientes
<Slider label="Bass"   defaultValue={70} min={0} max={100} />
<Slider label="Mid"    defaultValue={50} min={0} max={100} />
<Slider label="Treble" defaultValue={60} min={0} max={100} />
```

## Estructura de archivos

```
Slider/
  Slider.tsx            Componente principal
  Slider.types.ts       Interfaces TypeScript
  Slider.constants.ts   Clases CSS y defaults
  Slider.utils.ts       calcPercentage(), buildSliderBackground()
  Slider.hooks.ts       useSliderFormContext (integracion Form)
  README.md             Esta documentacion
```

CSS: `src/w3fussion/INPUTS/_slider.css`
