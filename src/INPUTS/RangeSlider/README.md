# RangeSlider

Componente de seleccion de rango dual. Dos thumbs arrastrables permiten definir un valor minimo y un valor maximo sobre una pista comun, con etiquetas flotantes, visualizacion de valores y soporte completo de accesibilidad por teclado.

## Importacion

```tsx
import RangeSlider from '@/components/INPUTS/RangeSlider/RangeSlider';
```

## Uso basico

```tsx
<RangeSlider
  min={0}
  max={100}
  defaultMinValue={25}
  defaultMaxValue={75}
  onChange={(val) => console.log('Range:', val)}
/>
```

## Modo controlado

Pasa `value` para controlar el componente desde el exterior. El callback `onChange` recibe un objeto `{ min, max }`:

```tsx
const [range, setRange] = useState({ min: 200, max: 800 });

<RangeSlider
  min={0}
  max={1000}
  step={10}
  value={range}
  onChange={setRange}
/>
```

## Etiquetas de formato personalizado

Usa `formatLabel` para dar formato a los valores mostrados en las etiquetas flotantes y en el panel inferior:

```tsx
<RangeSlider
  min={0}
  max={1000}
  step={10}
  value={priceRange}
  onChange={setPriceRange}
  formatLabel={(v) => `$${v}`}
  ariaLabel="Price range selector"
/>

<RangeSlider
  min={10}
  max={35}
  step={0.5}
  value={tempRange}
  onChange={setTempRange}
  formatLabel={(v) => `${v}°C`}
  ariaLabel="Temperature range"
/>
```

## Paso (step)

Controla los incrementos validos. El thumb se encaja automaticamente al paso mas cercano:

```tsx
<RangeSlider min={0} max={100} step={1}  defaultMinValue={20} defaultMaxValue={80} />
<RangeSlider min={0} max={100} step={5}  defaultMinValue={15} defaultMaxValue={85} />
<RangeSlider min={0} max={100} step={10} defaultMinValue={10} defaultMaxValue={90} />
<RangeSlider min={0} max={100} step={25} defaultMinValue={25} defaultMaxValue={75} />
```

## Estado deshabilitado

```tsx
<RangeSlider
  min={0}
  max={100}
  defaultMinValue={30}
  defaultMaxValue={70}
  disabled
  ariaLabel="Disabled range"
/>
```

## Integracion con Form / LiveForm

Cuando se proporciona `name`, el componente lee y escribe en `FormContext` automaticamente. Los campos se registran como `{name}_min` y `{name}_max` en el formulario:

```tsx
<Form initialValues={{ budget: { min: 200, max: 800 } }} onSubmit={handleSubmit}>
  <RangeSlider
    name="budget"
    min={0}
    max={2000}
    step={50}
    formatLabel={(v) => `$${v}`}
    ariaLabel="Budget range"
  />
  <Button type="submit">Guardar</Button>
</Form>
```

## Manejo de errores

```tsx
<RangeSlider
  min={0}
  max={100}
  defaultMinValue={10}
  defaultMaxValue={40}
  error="El rango seleccionado es demasiado amplio"
  ariaLabel="Range with error"
/>
```

## CSS Custom Properties

Aplica overrides en una clase custom pasada via `className`:

```css
.mi-range-custom {
  --w3f-rslider-track-bg: #e0f2fe;
  --w3f-rslider-active-bg: #0ea5e9;
  --w3f-rslider-thumb-bg: #ffffff;
  --w3f-rslider-thumb-border-color: #0ea5e9;
  --w3f-rslider-thumb-shadow: 0 2px 8px rgba(14, 165, 233, 0.35);
}
```

```tsx
<RangeSlider className="mi-range-custom" min={0} max={100} />
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-rslider-track-bg` | `gray-200` | Color de fondo de la pista |
| `--w3f-rslider-track-radius` | `radius` | Border radius de la pista |
| `--w3f-rslider-active-bg` | `primary-600` | Color de la zona activa entre thumbs |
| `--w3f-rslider-thumb-bg` | `primary` | Color de fondo del thumb |
| `--w3f-rslider-thumb-border-color` | `surface` | Color del borde del thumb |
| `--w3f-rslider-thumb-radius` | `radius-full` | Border radius del thumb |
| `--w3f-rslider-thumb-shadow` | `shadow-md` | Sombra del thumb en reposo |
| `--w3f-rslider-thumb-hover-shadow` | `shadow-lg` | Sombra del thumb en hover |
| `--w3f-rslider-thumb-drag-shadow` | `shadow-xl` | Sombra del thumb al arrastrar |
| `--w3f-rslider-label-bg` | `gray-800` | Fondo de la etiqueta flotante |
| `--w3f-rslider-label-color` | `on-primary` | Color de texto de la etiqueta flotante |
| `--w3f-rslider-label-radius` | `radius` | Border radius de la etiqueta flotante |
| `--w3f-rslider-label-font-size` | `text-xs` | Tamano de fuente de la etiqueta flotante |
| `--w3f-rslider-label-shadow` | `shadow-md` | Sombra de la etiqueta flotante |
| `--w3f-rslider-label-arrow-color` | `gray-800` | Color de la flecha de la etiqueta |
| `--w3f-rslider-value-text-color` | `gray-600` | Color del texto descriptivo inferior |
| `--w3f-rslider-value-bg` | `primary` | Fondo de la pastilla de valor inferior |
| `--w3f-rslider-value-color` | `on-primary` | Color del texto de la pastilla de valor |
| `--w3f-rslider-value-radius` | `radius-xl` | Border radius de la pastilla de valor |
| `--w3f-rslider-value-font-size` | `text-sm` | Tamano de fuente de la pastilla de valor |
| `--w3f-rslider-value-transition` | `background-color fast` | Transicion de la pastilla de valor |
| `--w3f-rslider-focus-color` | `primary` | Color del anillo de foco por teclado |
| `--w3f-rslider-disabled-opacity` | `0.5` | Opacidad en estado disabled |

### Variables de dimension globales (`:root`)

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-slider-thumb-size` | `20px` | Tamano del thumb (ancho y alto) |
| `--w3f-slider-track-height` | `8px` | Altura de la pista |
| `--w3f-slider-label-offset` | `48px` | Distancia vertical de la etiqueta flotante |
| `--w3f-slider-clickable-height` | `40px` | Altura del area clickeable |

## Accesibilidad

El componente utiliza dos `<input type="range">` ocultos como fuente de verdad para la interaccion por teclado. Las teclas Flecha izq/der incrementan o decrementan el thumb enfocado segun el `step`. Los roles ARIA estan declarados correctamente y un region `aria-live="polite"` anuncia los cambios de valor a lectores de pantalla.

- `role="group"` + `aria-label` en el contenedor
- `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext` en cada input
- `aria-invalid` cuando hay error
- `aria-hidden` en elementos visuales decorativos
- Compatible con RTL via `[dir="rtl"]`

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `min` | `number` | `0` | Valor minimo del rango |
| `max` | `number` | `100` | Valor maximo del rango |
| `step` | `number` | `1` | Incremento entre valores validos |
| `value` | `RangeValue` | — | Valor controlado `{ min, max }` |
| `defaultMinValue` | `number` | `min` | Valor inicial del thumb minimo (no controlado) |
| `defaultMaxValue` | `number` | `max` | Valor inicial del thumb maximo (no controlado) |
| `onChange` | `(value: RangeValue) => void` | — | Callback al cambiar el rango |
| `formatLabel` | `(value: number) => string \| number` | — | Formateador de valores en etiquetas |
| `disabled` | `boolean` | `false` | Desactiva el componente |
| `ariaLabel` | `string` | `'Selector de rango'` | Label accesible del grupo |
| `error` | `string` | — | Mensaje de error (muestra alerta roja) |
| `name` | `string` | — | Campo en Form/LiveForm |
| `className` | `string` | `''` | Clases CSS adicionales (para overrides de vars) |
| `onBlur` | `() => void` | — | Callback al perder el foco |

## RangeValue

```ts
interface RangeValue {
  min: number;
  max: number;
}
```

## API

### Entrada de datos

El RangeSlider acepta datos por tres vias:

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Valor controlado | `value` | `RangeValue` | Objeto `{ min, max }` impuesto desde el padre |
| FormContext | `name` | `string` | Lee `FormContext.values[name]` como `RangeValue` cuando esta dentro de un `<Form>` |
| Valores iniciales | `defaultMinValue` / `defaultMaxValue` | `number` | Valores iniciales del estado interno en modo no controlado |

**Tipo `RangeValue`:**
```ts
interface RangeValue {
  min: number;
  max: number;
}
```

**`snapToStep`:** todos los valores se normalizan al step mas cercano al ser establecidos. Los thumbs tienen invariante `minVal < maxVal`, separados por al menos `step`.

El formato de etiquetas flotantes y valores inferiores se controla con `formatLabel(value: number) => string | number`. Por defecto muestra el numero sin formato.

### Salida de datos

| Evento | Firma | Cuando se dispara |
|---|---|---|
| `onChange` | `(value: RangeValue) => void` | Cada cambio de cualquiera de los dos thumbs (arrastre, clic en pista, teclado). Emite `{ min: number, max: number }` |
| `onBlur` | `() => void` | Al perder el foco en cualquiera de los dos inputs range subyacentes |

Flujo de cambio:
1. Usuario arrastra thumb o usa teclado
2. `handleMinChange` / `handleMaxChange` calculan el nuevo valor con `snapToStep` y clamping
3. `notifyChange(newMin, newMax)` es llamado:
   - Si es form-controlled: `formContext.handleChange({ target: { name, value: { min, max } } })`
   - Siempre llama a `onChange({ min, max })` si el callback esta definido
4. Un region `aria-live="polite"` anuncia el cambio a lectores de pantalla

**Nombres de campo en Form:** cuando `name` es `"budget"`, los `<input type="range">` ocultos usan `name="budget_min"` y `name="budget_max"`.

### Comunicacion con otros componentes

#### Con Form / LiveForm (bidireccional)

El RangeSlider consume `FormContext` via `useRangeSliderFormContext()`:

```
Form.initialValues.budget = { min: 200, max: 800 }
        ↓ (lectura)
RangeSlider lee FormContext.values["budget"] → minVal=200, maxVal=800
        ↓ (usuario mueve el thumb max a 900)
RangeSlider llama formContext.handleChange({
  target: { name: "budget", value: { min: 200, max: 900 }, type: "range" }
})
        ↓ (propagacion)
Form.onSubmit recibe { budget: { min: 200, max: 900 } }
```

Los errores de Form (`formContext.errors[name]`) reemplazan al prop `error`.

#### Independiente (sin contexto requerido)

```tsx
<RangeSlider
  min={0}
  max={100}
  defaultMinValue={20}
  defaultMaxValue={80}
  onChange={(v) => console.log(`${v.min} - ${v.max}`)}
/>
```

### Accesibilidad

El componente implementa el patron `role="group"` con dos inputs range accesibles y una region de anuncio live:

| Atributo | Valor | Elemento | Condicion |
|---|---|---|---|
| `role` | `"group"` | Contenedor del slider | Siempre |
| `aria-label` | valor de `ariaLabel` | Contenedor del slider | Siempre |
| `aria-label` | `"Valor minimo del rango"` | Input range min | Siempre |
| `aria-label` | `"Valor maximo del rango"` | Input range max | Siempre |
| `aria-valuemin` | valor de `min` | Ambos inputs | Siempre |
| `aria-valuemax` | valor de `max` | Ambos inputs | Siempre |
| `aria-valuenow` | `minVal` / `maxVal` | Cada input | Siempre |
| `aria-valuetext` | `"Valor minimo: X"` / `"Valor maximo: X"` | Cada input | Siempre |
| `aria-invalid` | `true` / `false` | Ambos inputs | Cuando hay error |
| `role` | `"status"` | Region de anuncio | Siempre (oculta visualmente) |
| `aria-live` | `"polite"` | Region de anuncio | Siempre |
| `aria-hidden` | `"true"` | Thumbs visuales y etiquetas | Siempre (decorativos) |

Compatible con RTL via `[dir="rtl"]`. Los inputs range subyacentes son visualmente ocultos pero funcionales para navegacion por teclado.

### Patron de uso recomendado

```tsx
// 1. Rango de precio con formato
const [price, setPrice] = useState({ min: 100, max: 500 });
<RangeSlider
  min={0}
  max={1000}
  step={10}
  value={price}
  onChange={setPrice}
  formatLabel={(v) => `$${v}`}
  ariaLabel="Rango de precio"
/>

// 2. Rango de temperatura con decimales
<RangeSlider
  min={10}
  max={35}
  step={0.5}
  defaultMinValue={18}
  defaultMaxValue={26}
  formatLabel={(v) => `${v}°C`}
  ariaLabel="Rango de temperatura"
/>

// 3. No controlado — valores iniciales
<RangeSlider
  min={0}
  max={100}
  step={5}
  defaultMinValue={20}
  defaultMaxValue={80}
  onChange={(v) => console.log(v)}
/>

// 4. Integrado en Form
<Form initialValues={{ budget: { min: 200, max: 800 } }} onSubmit={handleSubmit}>
  <RangeSlider
    name="budget"
    min={0}
    max={2000}
    step={50}
    formatLabel={(v) => `$${v}`}
    ariaLabel="Presupuesto"
  />
  <Button type="submit">Buscar</Button>
</Form>

// 5. Con estado de error
<RangeSlider
  min={0}
  max={100}
  defaultMinValue={10}
  defaultMaxValue={40}
  error="El rango no puede ser menor de 30 unidades"
  ariaLabel="Rango con validacion"
/>
```

## Estructura de archivos

```
RangeSlider/
  RangeSlider.tsx            Componente principal
  RangeSlider.types.ts       Interfaces TypeScript (RangeValue, RangeSliderProps)
  RangeSlider.constants.ts   Clases CSS BEM
  RangeSlider.utils.ts       snapToStep(), getPercent(), defaultFormatLabel()
  RangeSlider.hooks.ts       useRangeSliderFormContext (integracion Form)
  README.md                  Esta documentacion
```

CSS: `src/w3fussion/INPUTS/_range-slider.css`
