# DatePicker

Selector de fechas con calendario visual. Soporta selección única, rango de fechas, modo dual (dos calendarios) y múltiples fechas independientes.

## Importación

```tsx
import {
  DatePicker,
  StaticDatePicker,
  DateRangePicker,
  DateRangePickerDual,
  MultipleDatePicker,
} from './components/UTILS/DatePicker/DatePicker';
```

## Variantes

### DatePicker (dropdown)
```tsx
<DatePicker
  placeholder="Seleccionar fecha…"
  onChange={(val) => console.log(val)}
  clearable
/>
```

### StaticDatePicker (siempre visible)
```tsx
<StaticDatePicker
  defaultValue={new Date()}
  onChange={(val) => console.log(val)}
/>
```

### DateRangePicker (rango)
```tsx
<DateRangePicker
  placeholder="Seleccionar rango…"
  onChange={(range) => console.log(range.formattedRange)}
/>
```

### DateRangePickerDual (dos calendarios)
```tsx
<DateRangePickerDual
  onChange={(range) => console.log(range.days, 'días')}
/>
```

### MultipleDatePicker (múltiples fechas)
```tsx
<MultipleDatePicker
  maxPickers={5}
  onAccept={(values) => console.log(values)}
/>
```

## Props

### BaseDatePickerProps (compartidas)

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `initialMonth` | `Date \| string` | — | Mes inicial a mostrar |
| `name` | `string` | — | Nombre del campo para integración con Form |
| `placeholder` | `string` | `'Seleccionar fecha…'` | Texto placeholder |
| `disabledDates` | `Date[]` | — | Fechas deshabilitadas |
| `minDate` | `Date` | — | Fecha mínima seleccionable |
| `maxDate` | `Date` | — | Fecha máxima seleccionable |
| `showWeekNumbers` | `boolean` | `false` | Mostrar números de semana |
| `locale` | `string` | — | Locale para formato de display |

### DatePickerProps

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `value` | `Date \| null` | — | Fecha seleccionada (controlado) |
| `defaultValue` | `Date \| null` | — | Fecha inicial (no controlado) |
| `onChange` | `(value: DateValue \| null) => void` | — | Callback al cambiar fecha |
| `inline` | `boolean` | `false` | Modo siempre visible |
| `clearable` | `boolean` | `true` | Mostrar botón Limpiar |

### DateRangePickerProps

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `value` | `DateRangeValue \| null` | — | Rango seleccionado (controlado) |
| `defaultValue` | `DateRangeValue \| null` | — | Rango inicial |
| `onChange` | `(value: DateRangeValue) => void` | — | Callback al cambiar rango |
| `dual` | `boolean` | `false` | Mostrar dos calendarios lado a lado |
| `discontinuous` | `boolean` | `false` | Meses independientes en modo dual |

### MultipleDatePickerProps

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `value` | `DateValue[]` | — | Fechas seleccionadas (controlado) |
| `defaultValue` | `DateValue[]` | — | Fechas iniciales |
| `onChange` | `(values: DateValue[]) => void` | — | Callback al cambiar |
| `maxPickers` | `number` | `10` | Máximo de pickers permitidos |
| `acceptLabel` | `string` | `'Aceptar'` | Texto del botón Aceptar |
| `onAccept` | `(values: DateValue[]) => void` | — | Callback al aceptar |

## Tipos de datos

### DateValue
```typescript
interface DateValue {
  date: Date;
  formatted: string;   // "2024-01-15" (ISO)
  display: string;      // "15 Ene 2024"
  day: number;
  month: number;        // 1-based
  year: number;
  weekday: string;      // "Lunes"
  timestamp: number;
}
```

### DateRangeValue
```typescript
interface DateRangeValue {
  startDate: DateValue | null;
  endDate: DateValue | null;
  formattedRange: string;  // "2024-01-10 → 2024-01-20"
  days: number;            // cantidad de días en el rango
}
```

## CSS Custom Properties

El componente usa tokens del framework W3Fussion. Las clases principales son:

| Clase | Descripción |
|-------|-------------|
| `.w3f-datepicker` | Contenedor raíz |
| `.w3f-datepicker-input` | Input trigger |
| `.w3f-datepicker-dropdown` | Panel dropdown del calendario |
| `.w3f-datepicker-calendar` | Grid del calendario |
| `.w3f-datepicker-day` | Celda de día individual |
| `.w3f-datepicker-day--today` | Día actual |
| `.w3f-datepicker-day--selected` | Día seleccionado |
| `.w3f-datepicker-day--in-range` | Día dentro del rango |
| `.w3f-datepicker-day--range-start` | Inicio del rango |
| `.w3f-datepicker-day--range-end` | Fin del rango |
| `.w3f-datepicker-dual` | Contenedor modo dual |
| `.w3f-datepicker-multiple` | Contenedor múltiples pickers |
| `.w3f-datepicker-actions` | Barra de acciones |

## API

### Entrada de datos
- **Controlado**: `value` + `onChange` para estado externo
- **No controlado**: `defaultValue` para estado interno
- **Restricciones**: `minDate`, `maxDate`, `disabledDates` limitan la selección
- **Form**: prop `name` genera `<input type="hidden">` con el valor formateado (ISO para single, JSON para multiple)

### Salida de datos
- **DatePicker**: `onChange(DateValue | null)` — objeto rico con fecha, formato ISO, display, día de semana, timestamp
- **DateRangePicker**: `onChange(DateRangeValue)` — start/end con `formattedRange` y cantidad de `days`
- **MultipleDatePicker**: `onChange(DateValue[])` array de valores + `onAccept(DateValue[])` al confirmar

### Comunicación con otros componentes
- **Form/LiveForm**: via prop `name` — genera hidden input, valor disponible en `FormContext.values[name]`
- **Independiente**: callbacks `onChange`/`onAccept` para integración directa
- **Composición**: `MultipleDatePicker` acepta `children` para contenido adicional entre los pickers y las acciones

### Accesibilidad
- Cada día tiene `aria-label` con la fecha completa (`date.toDateString()`)
- `aria-selected` en días seleccionados y extremos de rango
- `tabIndex={0}` solo en días del mes actual, `-1` en días de otros meses
- Botones de navegación con `disabled` cuando no hay mes anterior/siguiente
- Input es `readOnly` — selección solo vía calendario

### Patrón de uso recomendado
```tsx
// Formulario con fecha de nacimiento
<Form onSubmit={handleSubmit}>
  <DatePicker
    name="birthdate"
    maxDate={new Date()}
    placeholder="Fecha de nacimiento"
  />
</Form>

// Reserva de hotel con rango
<DateRangePickerDual
  minDate={new Date()}
  onChange={(range) => {
    setCheckIn(range.startDate);
    setCheckOut(range.endDate);
    setNights(range.days);
  }}
/>
```

## Estructura de archivos

```
DatePicker/
├── DatePicker.tsx           # 5 componentes exportados
├── DatePicker.types.ts      # Interfaces y tipos
├── DatePicker.constants.ts  # Labels calendario + CSS tokens
├── DatePicker.hooks.ts      # useMonthNavigation, useDropdown, useSingleDate, useDateRange, useMultipleDatePicker
├── DatePicker.utils.ts      # formatMonthTitle, toDateValue, isSameDay, isDateDisabled, buildRangeValue
└── index.ts                 # Re-exports públicos
```
