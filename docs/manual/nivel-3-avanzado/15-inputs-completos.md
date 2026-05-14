# Capítulo 15 — Inputs completos

**Nivel:** 3 — Avanzado
**Capítulo:** 15 de 28

---

## ¿Qué vas a aprender?

1. Cómo usar `Autocomplete` con datos estáticos, dinámicos y carga asíncrona
2. `RangeSlider` y `Rating` — inputs de valor compuesto y estrellitas
3. `ButtonToggle` y `ToggleButton/ToggleButtonGroup` — selección por botones
4. `NumberField` — input numérico con precisión y límites
5. `DatePicker` y `TimePicker` — pickers de fecha y hora con Form integration

---

## Conceptos

Los inputs cubiertos en el Cap 09 (Input, Select, Checkbox, RadioButton, SlideToggle) son los más frecuentes. Este capítulo cubre el resto del catálogo: inputs más especializados que resuelven casos concretos donde un input de texto no alcanza.

Todos siguen el mismo contrato con `Form`/`LiveForm`: si tienen prop `name` dentro de un `<Form>`, se conectan automáticamente al contexto.

---

## Autocomplete

Autocompletado con búsqueda client-side, debounce incorporado y navegación por teclado.

```
packages/components/src/INPUTS/Autocomplete/
```

### Datos estáticos

```tsx
import { Autocomplete } from '@w3f/components/INPUTS/Autocomplete/Autocomplete';

const PAISES = ['Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 'Ecuador',
                'Paraguay', 'Perú', 'Uruguay', 'Venezuela'];

function EjemploSimple() {
  return (
    <Autocomplete
      data={PAISES}
      placeholder="Buscá un país..."
      clearable
      searchIcon
      maxResults={5}
      onSelect={(item) => console.log('seleccionado:', item)}
    />
  );
}
```

### Datos como objetos — prop `optionLabel`

```tsx
const USUARIOS = [
  { id: 1, nombre: 'Ana García',  email: 'ana@ejemplo.com' },
  { id: 2, nombre: 'Luis Pérez',  email: 'luis@ejemplo.com' },
  { id: 3, nombre: 'María López', email: 'maria@ejemplo.com' },
];

<Autocomplete
  data={USUARIOS}
  optionLabel="nombre"        // qué propiedad mostrar como texto
  placeholder="Buscá un usuario..."
  clearable
  onSelect={(item) => {
    // item es el objeto completo { id, nombre, email }
    if (item) console.log('email:', (item as typeof USUARIOS[0]).email);
  }}
/>
```

### Filtro personalizado

```tsx
<Autocomplete
  data={USUARIOS}
  optionLabel="nombre"
  filterFn={(item, query) => {
    // Buscar en nombre Y en email
    const u = item as typeof USUARIOS[0];
    const q = query.toLowerCase();
    return u.nombre.toLowerCase().includes(q) ||
           u.email.toLowerCase().includes(q);
  }}
  placeholder="Buscá por nombre o email..."
/>
```

### Carga asíncrona (datos externos)

El Autocomplete filtra sobre el array `data` que le pasás. Para datos remotos, manejás la carga en el padre y actualizás `data` según el query:

```tsx
import { useState, useEffect } from 'react';
import { Autocomplete } from '@w3f/components/INPUTS/Autocomplete/Autocomplete';

interface Producto { id: number; nombre: string; sku: string; }

function BuscadorProductos() {
  const [query, setQuery]      = useState('');
  const [datos, setDatos]      = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (query.length < 2) { setDatos([]); return; }

    setCargando(true);
    const controller = new AbortController();

    fetch(`/api/productos?q=${encodeURIComponent(query)}`, {
      signal: controller.signal,
    })
      .then(r => r.json())
      .then(setDatos)
      .catch(() => {})
      .finally(() => setCargando(false));

    return () => controller.abort();
  }, [query]);

  return (
    <Autocomplete
      data={datos}
      optionLabel="nombre"
      placeholder="Buscá un producto..."
      clearable
      searchIcon
      // Filtro pass-through: la API ya filtra, nosotros mostramos todo
      filterFn={() => true}
      onChange={(e) => setQuery(e.target.value)}
      onSelect={(item) => {
        if (item) console.log('SKU:', (item as Producto).sku);
      }}
    />
  );
}
```

### Integración con Form

```tsx
<Form
  initialValues={{ ciudad: '' }}
  onSubmit={(values) => console.log(values)}
>
  <Autocomplete
    name="ciudad"
    data={CIUDADES}
    placeholder="Ciudad de nacimiento"
    clearable
  />
  <Button type="submit" variant="filled" color="primary">Enviar</Button>
</Form>
```

### Props de Autocomplete

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `data` | `AutocompleteOption[]` | — | Array de opciones (strings u objetos) |
| `optionLabel` | `string` | `'label'` | Propiedad a mostrar si los ítems son objetos |
| `filterFn` | `(item, query) => boolean` | filtro por `optionLabel` | Función de filtrado personalizada |
| `maxResults` | `number` | `10` | Máximo de sugerencias visibles |
| `onSelect` | `(item \| null) => void` | — | Callback al seleccionar una opción |
| `clearable` | `boolean` | `false` | Muestra botón × para limpiar |
| `searchIcon` | `boolean` | `false` | Ícono de lupa en el campo |
| `emptyMessage` | `string` | `'Sin resultados'` | Texto cuando no hay coincidencias |
| `variant` | `'outline' \| 'filled' \| 'flushed'` | `'outline'` | Variante visual |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño |
| `error` | `boolean \| string` | — | Estado de error |
| `round` | `boolean` | `false` | Bordes completamente redondeados |
| `name` | `string` | — | Conecta al Form/LiveForm |
| `label` | `string` | — | Label flotante |

---

## RangeSlider

Slider de dos manejadores para seleccionar un rango de valores.

```
packages/components/src/INPUTS/RangeSlider/
```

```tsx
import { RangeSlider } from '@w3f/components/INPUTS/RangeSlider/RangeSlider';

// Controlado
const [rango, setRango] = useState({ min: 20, max: 80 });

<RangeSlider
  min={0}
  max={100}
  step={5}
  value={rango}
  onChange={(v) => setRango(v)}
  formatLabel={(v) => `$${v}`}  // muestra "$20" y "$80" sobre los thumbs
/>
```

### Con Form — valor es `{ min, max }`

```tsx
<Form
  initialValues={{ precio: { min: 100, max: 500 } }}
  onSubmit={(values) => console.log(values.precio)} // { min, max }
>
  <RangeSlider
    name="precio"
    min={0}
    max={1000}
    step={10}
    formatLabel={(v) => `$${v.toLocaleString()}`}
  />
</Form>
```

### Props de RangeSlider

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `min` | `number` | `0` | Valor mínimo posible |
| `max` | `number` | `100` | Valor máximo posible |
| `step` | `number` | `1` | Incremento de cada paso |
| `value` | `RangeValue` | — | `{ min, max }` (controlado) |
| `defaultMinValue` | `number` | — | Valor inicial del thumb izquierdo |
| `defaultMaxValue` | `number` | — | Valor inicial del thumb derecho |
| `onChange` | `(value: RangeValue) => void` | — | Callback con `{ min, max }` |
| `formatLabel` | `(value: number) => string \| number` | — | Formatea el tooltip de los thumbs |
| `disabled` | `boolean` | `false` | Deshabilita el slider |
| `error` | `string` | — | Mensaje de error |
| `name` | `string` | — | Conecta al Form/LiveForm |

---

## Rating

Input de valoración con estrellas, corazones o emojis.

```
packages/components/src/INPUTS/Rating/
```

```tsx
import { Rating } from '@w3f/components/INPUTS/Rating/Rating';

// Básico
<Rating defaultValue={3} max={5} onChange={(v) => console.log(v)} />

// Con labels y media estrella
<Rating
  defaultValue={3.5}
  max={5}
  precision={0.5}
  labels={['Muy malo', 'Malo', 'Regular', 'Bueno', 'Excelente']}
  showValue
/>

// Corazones
<Rating iconType="heart" defaultValue={4} size="large" />

// Solo lectura (para mostrar puntuación)
<Rating value={4.5} readOnly precision={0.5} size="small" />
```

### Variantes visuales

```tsx
<Rating variant="solid"    defaultValue={3} />   // fondo sólido
<Rating variant="outlined" defaultValue={3} />   // solo borde
<Rating variant="ghost"    defaultValue={3} />   // solo relleno sin borde
<Rating variant="soft"     defaultValue={3} />   // fondo suave/pastel
```

### Con Form

```tsx
<Form
  initialValues={{ puntuacion: 0 }}
  validationRules={{ puntuacion: { required: true } }}
  onSubmit={(values) => console.log(values)}
>
  <Rating
    name="puntuacion"
    label="¿Cómo calificarías el servicio?"
    max={5}
    allowClear
    helperText="Clic para seleccionar"
  />
</Form>
```

### Props de Rating

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `max` | `number` | `5` | Cantidad máxima de íconos |
| `defaultValue` | `number` | — | Valor inicial (no controlado) |
| `value` | `number` | — | Valor controlado |
| `precision` | `1 \| 0.5` | `1` | Permite medias valoraciones |
| `iconType` | `'star' \| 'heart' \| 'smiley'` | `'star'` | Tipo de ícono |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Tamaño |
| `variant` | `'solid' \| 'outlined' \| 'ghost' \| 'soft'` | `'solid'` | Variante visual |
| `readOnly` | `boolean` | `false` | Solo lectura, sin interacción |
| `disabled` | `boolean` | `false` | Deshabilitado |
| `showValue` | `boolean` | `false` | Muestra el número junto a los íconos |
| `allowClear` | `boolean` | `false` | Click en valor activo lo limpia a 0 |
| `labels` | `string[]` | — | Tooltip por posición |
| `onHoverChange` | `(value: number) => void` | — | Callback al hacer hover |
| `label` | `string` | — | Label sobre el rating |
| `helperText` | `string` | — | Texto de ayuda |
| `error` | `string` | — | Mensaje de error |
| `name` | `string` | — | Conecta al Form/LiveForm |

---

## ButtonToggle

Grupo de botones donde el usuario selecciona uno o varios valores. Similar a un `RadioGroup` pero visual como botones.

```
packages/components/src/INPUTS/ButtonToggle/
```

```tsx
import { ButtonToggle } from '@w3f/components/INPUTS/ButtonToggle/ButtonToggle';

// Selección simple
const [vista, setVista] = useState<string | number | null>('lista');

<ButtonToggle
  options={[
    { value: 'lista',   label: 'Lista' },
    { value: 'grilla',  label: 'Grilla' },
    { value: 'mapa',    label: 'Mapa' },
  ]}
  value={vista}
  onSelect={(v) => setVista(v as string)}
  color="primary"
  size="md"
/>
```

### Selección múltiple

```tsx
const [filtros, setFiltros] = useState<(string | number)[]>([]);

<ButtonToggle
  multiple
  options={[
    { value: 'nuevo',       label: 'Nuevo' },
    { value: 'oferta',      label: 'En oferta' },
    { value: 'disponible',  label: 'Disponible' },
    { value: 'envio_gratis', label: 'Envío gratis' },
  ]}
  value={filtros}
  onSelect={(v) => setFiltros(v as (string | number)[])}
  color="secondary"
/>
```

### Con íconos en las opciones

```tsx
import { LayoutList, LayoutGrid, Map } from 'lucide-react';

<ButtonToggle
  options={[
    { value: 'lista',  label: <LayoutList size={16} /> },
    { value: 'grilla', label: <LayoutGrid size={16} /> },
    { value: 'mapa',   label: <Map size={16} /> },
  ]}
  value={vista}
  onSelect={setVista}
  ariaLabel="Modo de visualización"
/>
```

### Con Form

```tsx
<Form
  initialValues={{ nivel: null }}
  onSubmit={(values) => console.log(values)}
>
  <ButtonToggle
    name="nivel"
    options={[
      { value: 'junior',  label: 'Junior'  },
      { value: 'semi',    label: 'Semi-Senior' },
      { value: 'senior',  label: 'Senior'  },
    ]}
    color="primary"
    allowDeselect
  />
</Form>
```

### Props de ButtonToggle

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `options` | `ButtonToggleOption[]` | `[]` | Array `{ value, label, disabled? }` |
| `value` | `ButtonToggleValue` | — | Valor controlado (string, number o array) |
| `defaultValue` | `ButtonToggleValue` | — | Valor inicial no controlado |
| `multiple` | `boolean` | `false` | Permite selección múltiple |
| `allowDeselect` | `boolean` | `false` | Clic en seleccionado lo deselecciona |
| `onSelect` | `(value) => void` | — | Callback con el valor seleccionado |
| `color` | `ButtonColor` | `'primary'` | Color del botón activo |
| `size` | `ButtonSize` | `'md'` | Tamaño de los botones |
| `disabled` | `boolean` | `false` | Deshabilita todos los botones |
| `name` | `string` | — | Conecta al Form/LiveForm |

---

## ToggleButton y ToggleButtonGroup

Alternativa más flexible al `ButtonToggle`: cada `ToggleButton` es un botón individual, y `ToggleButtonGroup` los agrupa con manejo de estado unificado.

```
packages/components/src/INPUTS/ToggleButton/
```

```tsx
import { ToggleButton, ToggleButtonGroup } from '@w3f/components/INPUTS/ToggleButton/ToggleButton';

// Exclusive (como radio — solo uno activo)
const [alineacion, setAlineacion] = useState<string | number | null>('left');

<ToggleButtonGroup
  exclusive
  value={alineacion}
  onChange={(_, newVal) => setAlineacion(newVal)}
  color="primary"
  size="md"
  aria-label="Alineación de texto"
>
  <ToggleButton value="left">   Izquierda </ToggleButton>
  <ToggleButton value="center"> Centro     </ToggleButton>
  <ToggleButton value="right">  Derecha    </ToggleButton>
</ToggleButtonGroup>
```

### Selección múltiple (no exclusive)

```tsx
const [formatos, setFormatos] = useState<(string | number)[]>([]);

<ToggleButtonGroup
  value={formatos}
  onChange={(_, newVal) => setFormatos(newVal as (string | number)[])}
  color="primary"
  aria-label="Formato de texto"
>
  <ToggleButton value="bold">      <strong>N</strong>       </ToggleButton>
  <ToggleButton value="italic">    <em>K</em>               </ToggleButton>
  <ToggleButton value="underline"> <u>S</u>                 </ToggleButton>
</ToggleButtonGroup>
```

### Vertical

```tsx
<ToggleButtonGroup
  exclusive
  orientation="vertical"
  value={prioridad}
  onChange={(_, v) => setPrioridad(v)}
  color="danger"
  label="Prioridad"
>
  <ToggleButton value="alta">   Alta   </ToggleButton>
  <ToggleButton value="media">  Media  </ToggleButton>
  <ToggleButton value="baja">   Baja   </ToggleButton>
</ToggleButtonGroup>
```

### Con Form

```tsx
<Form initialValues={{ rol: null }} onSubmit={handleSubmit}>
  <ToggleButtonGroup
    name="rol"
    exclusive
    color="primary"
    label="Rol en el proyecto"
    helperText="Seleccioná un rol"
  >
    <ToggleButton value="dev">     Desarrollador  </ToggleButton>
    <ToggleButton value="design">  Diseñador      </ToggleButton>
    <ToggleButton value="pm">      PM             </ToggleButton>
  </ToggleButtonGroup>
</Form>
```

### Props de ToggleButtonGroup

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `exclusive` | `boolean` | `false` | Solo uno activo a la vez (como radio) |
| `value` | `string \| number \| array \| null` | — | Valor controlado |
| `onChange` | `(event, newValue) => void` | — | Callback al cambiar |
| `color` | `ToggleButtonColor` | `'primary'` | Color de los botones activos |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Dirección |
| `fullWidth` | `boolean` | `false` | Ocupa todo el ancho |
| `disabled` | `boolean` | `false` | Deshabilita el grupo |
| `label` | `string` | — | Label sobre el grupo |
| `error` | `string` | — | Mensaje de error |
| `helperText` | `string` | — | Texto de ayuda |
| `name` | `string` | — | Conecta al Form/LiveForm |

### Props de ToggleButton

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `value` | `string \| number` | — | Valor del botón (obligatorio) |
| `selected` | `boolean` | — | Forzar estado seleccionado (controlado manual) |
| `onChange` | `(event, value) => void` | — | Handler propio (override del grupo) |
| `color` | `ToggleButtonColor` | heredado | Color individual |
| `size` | `'sm' \| 'md' \| 'lg'` | heredado | Tamaño individual |
| `fullWidth` | `boolean` | `false` | Ocupa todo el ancho |
| `disabled` | `boolean` | `false` | Deshabilita este botón |

---

## NumberField

Input numérico con validación de rango, precisión decimal y botones +/−.

```
packages/components/src/INPUTS/NumberField/
```

```tsx
import { NumberField } from '@w3f/components/INPUTS/NumberField/NumberField';

// Básico
<NumberField
  label="Cantidad"
  min={1}
  max={99}
  step={1}
  defaultValue={1}
  onChange={(v) => console.log(v)} // number o ''
/>

// Con decimales
<NumberField
  label="Precio (USD)"
  min={0}
  step={0.01}
  precision={2}           // máximo 2 decimales
  placeholder="0.00"
  leadingIcon={<span>$</span>}
/>

// Con límites y variante
<NumberField
  label="Descuento (%)"
  min={0}
  max={100}
  step={5}
  variant="outlined"
  size="lg"
  helperText="Entre 0 y 100"
/>
```

### Con Form

```tsx
<Form
  initialValues={{ cantidad: 1, descuento: 0 }}
  validationRules={{
    cantidad:  { required: true, custom: (v) => v < 1 ? 'Mínimo 1 unidad' : null },
    descuento: { custom: (v) => v > 100 ? 'Máximo 100%' : null },
  }}
  onSubmit={(values) => console.log(values)}
>
  <NumberField name="cantidad"  label="Cantidad"      min={1}  max={999} />
  <NumberField name="descuento" label="Descuento (%)" min={0}  max={100} step={5} />
</Form>
```

### Props de NumberField

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `label` | `string` | — | Label del campo |
| `min` | `number` | — | Valor mínimo |
| `max` | `number` | — | Valor máximo |
| `step` | `number` | `1` | Incremento de los botones +/− |
| `precision` | `number` | — | Máximo de decimales permitidos |
| `value` | `number \| string` | — | Valor controlado |
| `onChange` | `(value: number \| '') => void` | — | Callback (vacío cuando el campo está en blanco) |
| `variant` | `'solid' \| 'outlined' \| 'ghost' \| 'soft'` | `'solid'` | Variante visual |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño |
| `leadingIcon` | `ReactNode` | — | Ícono o símbolo al inicio |
| `error` | `string` | — | Mensaje de error |
| `helperText` | `string` | — | Texto de ayuda |
| `disabled` | `boolean` | `false` | Deshabilita el campo |
| `required` | `boolean` | `false` | Campo obligatorio |
| `name` | `string` | — | Conecta al Form/LiveForm |

---

## DatePicker

Calendario para seleccionar una fecha, un rango o múltiples fechas.

```
packages/components/src/UTILS/DatePicker/
```

### Modo simple (single)

```tsx
import { DatePicker } from '@w3f/components/UTILS/DatePicker/DatePicker';

const [fecha, setFecha] = useState<Date | null>(null);

<DatePicker
  value={fecha}
  onChange={(dv) => setFecha(dv ? dv.date : null)}
  placeholder="Seleccioná una fecha"
  clearable
/>
```

El callback recibe un `DateValue` con múltiples formatos listos para usar:

```ts
interface DateValue {
  date:      Date;        // objeto Date
  formatted: string;     // "2024-01-15" (ISO)
  display:   string;     // "15 Jan 2024" (legible)
  day:       number;     // 15
  month:     number;     // 1 (1-based)
  year:      number;     // 2024
  weekday:   string;     // "Monday"
  timestamp: number;     // Unix ms
}
```

### Inline (siempre visible)

```tsx
<DatePicker
  inline
  defaultValue={new Date()}
  onChange={(dv) => setFecha(dv?.date ?? null)}
/>
```

### Con límites de fecha

```tsx
<DatePicker
  minDate={new Date()}                      // no permite fechas pasadas
  maxDate={new Date(Date.now() + 90 * 86400_000)}  // máximo 90 días a futuro
  disabledDates={[new Date('2024-12-25'), new Date('2024-01-01')]}
  placeholder="Fecha de entrega"
/>
```

### Modo rango

```tsx
import { DateRangePicker } from '@w3f/components/UTILS/DatePicker/DatePicker';

const [rango, setRango] = useState(null);

<DateRangePicker
  value={rango}
  onChange={(rv) => setRango(rv)}
  dual           // dos calendarios lado a lado
  placeholder="Desde — Hasta"
/>

// rv.formattedRange = "2024-01-10 → 2024-01-20"
// rv.days = 10
// rv.startDate.display = "10 Jan 2024"
```

### Modo múltiple (varios días independientes)

```tsx
import { MultipleDatePicker } from '@w3f/components/UTILS/DatePicker/DatePicker';

<MultipleDatePicker
  maxPickers={5}
  onChange={(values) => console.log(values.map(v => v.formatted))}
  acceptLabel="Confirmar fechas"
  onAccept={(values) => console.log('confirmado', values)}
/>
```

### Con Form

```tsx
<Form
  initialValues={{ nacimiento: null }}
  validationRules={{ nacimiento: { required: true } }}
  onSubmit={(values) => console.log(values)}
>
  <DatePicker
    name="nacimiento"
    placeholder="Fecha de nacimiento"
    maxDate={new Date()}
    locale="es-AR"
    showWeekNumbers
  />
</Form>
```

### Props de DatePicker (modo single)

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `value` | `Date \| null` | — | Fecha seleccionada (controlado) |
| `defaultValue` | `Date \| null` | — | Fecha inicial (no controlado) |
| `onChange` | `(value: DateValue \| null) => void` | — | Callback al seleccionar |
| `inline` | `boolean` | `false` | Muestra el calendario siempre visible |
| `clearable` | `boolean` | `false` | Botón para limpiar la selección |
| `minDate` | `Date` | — | Fecha mínima seleccionable |
| `maxDate` | `Date` | — | Fecha máxima seleccionable |
| `disabledDates` | `Date[]` | — | Fechas específicas deshabilitadas |
| `initialMonth` | `Date \| string` | — | Mes inicial a mostrar |
| `showWeekNumbers` | `boolean` | `false` | Muestra número de semana |
| `locale` | `string` | `'en-US'` | Locale para nombres de días/meses |
| `placeholder` | `string` | — | Texto del input cuando está vacío |
| `name` | `string` | — | Conecta al Form/LiveForm |

---

## TimePicker

Picker de hora con ruedas de scroll para horas, minutos y segundos.

```
packages/components/src/UTILS/TimePicker/
```

```tsx
import { TimePicker } from '@w3f/components/UTILS/TimePicker/TimePicker';

const [hora, setHora] = useState(null);

<TimePicker
  format={24}
  value={hora}
  onChange={(tv) => setHora(tv)}
  placeholder="Seleccioná una hora"
  clearable
  showNow       // botón "Ahora"
/>
```

El callback recibe un `TimeValue`:

```ts
interface TimeValue {
  hours:      number;  // 0-23 (siempre 24h internamente)
  minutes:    number;
  seconds:    number;
  ampm:       'AM' | 'PM';
  formatted24: string;  // "14:30:00"
  formatted12: string;  // "02:30:00 PM"
  display:    string;   // según prop format
  timestamp:  number;   // segundos desde medianoche
}
```

### Con formato 12h y pasos de minutos

```tsx
<TimePicker
  format={12}
  minuteStep={15}       // 0, 15, 30, 45
  showSeconds={false}
  placeholder="Hora de reunión"
  onChange={(tv) => console.log(tv.formatted12)}  // "02:30 PM"
/>
```

### Inline

```tsx
<TimePicker
  inline
  format={24}
  showSeconds
  secondStep={10}
  onChange={(tv) => console.log(tv.formatted24)}
/>
```

### Con Form

```tsx
<Form
  initialValues={{ inicio: null, fin: null }}
  onSubmit={(values) => console.log(values)}
>
  <TimePicker
    name="inicio"
    format={24}
    minuteStep={30}
    placeholder="Hora de inicio"
  />
  <TimePicker
    name="fin"
    format={24}
    minuteStep={30}
    placeholder="Hora de fin"
  />
</Form>
```

### Props de TimePicker

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `value` | `Partial<TimeValue> \| null` | — | Tiempo seleccionado (controlado) |
| `defaultValue` | `Partial<TimeValue> \| null` | — | Valor inicial (no controlado) |
| `format` | `12 \| 24` | `24` | Formato de 12 o 24 horas |
| `showSeconds` | `boolean` | `false` | Muestra la rueda de segundos |
| `minuteStep` | `1 \| 5 \| 10 \| 15 \| 30` | `1` | Paso de los minutos |
| `secondStep` | `1 \| 5 \| 10 \| 15 \| 30` | `1` | Paso de los segundos |
| `onChange` | `(value: TimeValue) => void` | — | Callback al cambiar |
| `onAccept` | `(value: TimeValue) => void` | — | Callback al confirmar (botón Aceptar) |
| `inline` | `boolean` | `false` | Siempre visible (sin dropdown) |
| `clearable` | `boolean` | `false` | Botón para limpiar |
| `showNow` | `boolean` | `false` | Botón atajo "Ahora" |
| `placeholder` | `string` | — | Texto del input cuando está vacío |
| `name` | `string` | — | Conecta al Form/LiveForm |

---

## TransferList

Dos paneles con ítems. El usuario mueve ítems de la fuente al destino (o viceversa) con botones de transferencia.

```
packages/components/src/INPUTS/TransferList/
```

```tsx
import { TransferList } from '@w3f/components/INPUTS/TransferList/TransferList';
import type { TransferItem } from '@w3f/components/INPUTS/TransferList/TransferList';

const PERMISOS: TransferItem[] = [
  { id: 'read',   label: 'Leer registros',    description: 'Ver todos los datos' },
  { id: 'write',  label: 'Crear registros',   description: 'Agregar nuevos ítems' },
  { id: 'edit',   label: 'Editar registros',  description: 'Modificar datos existentes' },
  { id: 'delete', label: 'Eliminar registros', description: 'Borrar ítems', disabled: true },
  { id: 'export', label: 'Exportar datos',    description: 'Descargar en CSV/Excel' },
  { id: 'admin',  label: 'Administración',    description: 'Acceso total al panel' },
];

const [source, setSource] = useState(PERMISOS);
const [target, setTarget] = useState<TransferItem[]>([]);

<TransferList
  sourceItems={source}
  targetItems={target}
  sourceTitle="Disponibles"
  targetTitle="Asignados"
  enableSearch
  height={300}
  onChange={(src, tgt) => {
    setSource(src);
    setTarget(tgt);
  }}
/>
```

### Props de TransferList

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `sourceItems` | `TransferItem[]` | `[]` | Ítems del panel izquierdo (disponibles) |
| `targetItems` | `TransferItem[]` | `[]` | Ítems del panel derecho (seleccionados) |
| `onChange` | `(source, target) => void` | — | Callback al mover ítems |
| `sourceTitle` | `string` | `'Available'` | Título del panel izquierdo |
| `targetTitle` | `string` | `'Selected'` | Título del panel derecho |
| `enableSearch` | `boolean` | `false` | Campo de búsqueda en cada panel |
| `height` | `string \| number` | `250` | Alto de los paneles |
| `disabled` | `boolean` | `false` | Deshabilita todas las acciones |

### Estructura de `TransferItem`

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | `string \| number` | Identificador único |
| `label` | `string` | Texto principal |
| `description` | `string` | Texto secundario (opcional) |
| `disabled` | `boolean` | Ítem no transferible |

---

## Ejercicio práctico

**Objetivo:** formulario de creación de evento con todos los inputs del capítulo.

```tsx
import { Form }           from '@w3f/components/INPUTS/Form/Form';
import { Input }          from '@w3f/components/INPUTS/Input/Input';
import { NumberField }    from '@w3f/components/INPUTS/NumberField/NumberField';
import { DatePicker }     from '@w3f/components/UTILS/DatePicker/DatePicker';
import { TimePicker }     from '@w3f/components/UTILS/TimePicker/TimePicker';
import { RangeSlider }    from '@w3f/components/INPUTS/RangeSlider/RangeSlider';
import { Rating }         from '@w3f/components/INPUTS/Rating/Rating';
import { ButtonToggle }   from '@w3f/components/INPUTS/ButtonToggle/ButtonToggle';
import { Autocomplete }   from '@w3f/components/INPUTS/Autocomplete/Autocomplete';
import { Button }         from '@w3f/components/INPUTS/Button/Button';
import { Stack }          from '@w3f/components/LAYOUT/Stack/Stack';
import { Text }           from '@w3f/components/DATADISPLAY/Text/Text';

const CATEGORIAS = ['Conferencia', 'Workshop', 'Meetup', 'Hackathon', 'Seminario'];

export default function FormularioEvento() {
  const handleSubmit = (values: Record<string, any>) => {
    console.log('Evento creado:', values);
    // values.tipo, values.nombre, values.capacidad,
    // values.fecha, values.inicio, values.fin
    // values.rango_precio, values.dificultad, values.categoria
  };

  return (
    <Form
      initialValues={{
        tipo:          'presencial',
        nombre:        '',
        capacidad:     50,
        fecha:         null,
        inicio:        null,
        fin:           null,
        rango_precio:  { min: 0, max: 100 },
        dificultad:    0,
        categoria:     '',
      }}
      validationRules={{
        nombre:     { required: true, minLength: 3 },
        fecha:      { required: true },
        inicio:     { required: true },
        dificultad: { custom: (v) => v === 0 ? 'Seleccioná una dificultad' : null },
      }}
      onSubmit={handleSubmit}
    >
      <Stack spacing={5}>
        <Text element="h2">Crear evento</Text>

        {/* Tipo de evento */}
        <ButtonToggle
          name="tipo"
          options={[
            { value: 'presencial', label: 'Presencial' },
            { value: 'virtual',    label: 'Virtual'    },
            { value: 'hibrido',    label: 'Híbrido'    },
          ]}
          color="primary"
        />

        {/* Nombre */}
        <Input name="nombre" label="Nombre del evento" placeholder="ej. React Summit 2025" />

        {/* Categoría con autocomplete */}
        <Autocomplete
          name="categoria"
          data={CATEGORIAS}
          label="Categoría"
          placeholder="Buscá o escribí una categoría"
          clearable
        />

        {/* Capacidad */}
        <NumberField
          name="capacidad"
          label="Capacidad máxima"
          min={1}
          max={5000}
          step={10}
          helperText="Número máximo de asistentes"
        />

        {/* Fecha */}
        <DatePicker
          name="fecha"
          placeholder="Fecha del evento"
          minDate={new Date()}
          locale="es-AR"
        />

        {/* Horario */}
        <Stack horizontal spacing={3}>
          <TimePicker name="inicio" format={24} minuteStep={15} placeholder="Inicio" />
          <TimePicker name="fin"    format={24} minuteStep={15} placeholder="Fin"    />
        </Stack>

        {/* Rango de precio */}
        <RangeSlider
          name="rango_precio"
          min={0}
          max={500}
          step={10}
          formatLabel={(v) => `$${v}`}
        />

        {/* Dificultad */}
        <Rating
          name="dificultad"
          label="Nivel de dificultad"
          max={5}
          iconType="star"
          size="large"
          allowClear
          labels={['Muy fácil', 'Fácil', 'Intermedio', 'Difícil', 'Experto']}
          showValue
        />

        <Button type="submit" variant="filled" color="primary" fullWidth>
          Crear evento
        </Button>
      </Stack>
    </Form>
  );
}
```

---

## Referencia rápida

### Comparación de inputs de selección

| Componente | Casos de uso | Multiple | Form |
|---|---|---|---|
| `Select` | Lista cerrada larga | Sí | Sí |
| `Autocomplete` | Lista con búsqueda o datos externos | No | Sí |
| `RadioGroup` | Opciones cortas (≤5) | No | Sí |
| `ButtonToggle` | Opciones muy cortas con visual de botones | Sí | Sí |
| `ToggleButtonGroup` | Opciones cortas con íconos o formato | Sí | Sí |
| `TransferList` | Asignar permisos, mover ítems entre listas | Sí | No directo |

### Comparación de inputs numéricos y de rango

| Componente | Tipo de valor | Con `name`/Form |
|---|---|---|
| `NumberField` | `number \| ''` | Sí |
| `Slider` | `number` | Sí |
| `RangeSlider` | `{ min, max }` | Sí |
| `Rating` | `number` | Sí |

### Imports de DatePicker

```tsx
// Modo simple
import { DatePicker }          from '@w3f/components/UTILS/DatePicker/DatePicker';

// Modo rango
import { DateRangePicker }     from '@w3f/components/UTILS/DatePicker/DatePicker';

// Modo múltiple
import { MultipleDatePicker }  from '@w3f/components/UTILS/DatePicker/DatePicker';

// TimePicker
import { TimePicker }          from '@w3f/components/UTILS/TimePicker/TimePicker';
```

---

## En Next.js

Todos los inputs avanzados de este capítulo (`Autocomplete`, `RangeSlider`, `Rating`, `ButtonToggle`, `NumberField`, `DatePicker`, `TimePicker`, `TransferList`) usan hooks y eventos del DOM — todos requieren `'use client'`.

El único detalle adicional: `DatePicker` y `TimePicker` viven en `UTILS/` en lugar de `INPUTS/`, pero el comportamiento en Next.js es idéntico:

```tsx
'use client'

import { useState }          from 'react'
import { DatePicker }        from '@w3f/components/UTILS/DatePicker/DatePicker'
import { TimePicker }        from '@w3f/components/UTILS/TimePicker/TimePicker'
import type { DateValue }    from '@w3f/components/UTILS/DatePicker/DatePicker'
import type { TimeValue }    from '@w3f/components/UTILS/TimePicker/TimePicker'

export default function ReservaForm() {
  const [fecha, setFecha] = useState<DateValue | null>(null)
  const [hora,  setHora]  = useState<TimeValue | null>(null)

  async function confirmar() {
    if (!fecha || !hora) return
    await fetch('/api/reservas', {
      method: 'POST',
      body: JSON.stringify({ fecha: fecha.formatted, hora: hora.formatted24 }),
    })
  }

  return (
    <div>
      <DatePicker onSelect={setFecha} />
      <TimePicker onSelect={setHora}  />
      <button onClick={confirmar}>Confirmar reserva</button>
    </div>
  )
}
```

Para `Autocomplete` con datos del servidor, cargá los datos en el Server Component padre y pasalos como props al componente cliente:

```tsx
// app/busqueda/page.tsx — Server Component
import { BuscadorProductos } from './buscador-productos'

export default async function Page() {
  const productos = await db.productos.findMany()  // fetch server-side
  return <BuscadorProductos productos={productos} />
}

// app/busqueda/buscador-productos.tsx — Client Component
'use client'

import { Autocomplete } from '@w3f/components/INPUTS/Autocomplete/Autocomplete'

export function BuscadorProductos({ productos }) {
  return (
    <Autocomplete
      data={productos}
      optionLabel="nombre"
      placeholder="Buscá un producto..."
    />
  )
}
```

---

## Siguiente paso

[Capítulo 16 — Surfaces: Accordion, PopUp, Menu, Window](16-surfaces.md)

En el siguiente capítulo exploramos los componentes de superficie: paneles colapsables, menús contextuales, ventanas flotantes y popups — todos con gestión de estado abierto/cerrado.
