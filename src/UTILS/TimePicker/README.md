# TimePicker

Selector de hora con ruedas de scroll. Soporta formato 12h/24h, pasos configurables para minutos y segundos, modo dropdown e inline.

## Importación

```tsx
import {
  TimePicker,
  StaticTimePicker,
} from './components/UTILS/TimePicker/TimePicker';
```

## Variantes

### TimePicker (dropdown)
```tsx
<TimePicker
  format={24}
  placeholder="Seleccionar hora…"
  onChange={(val) => console.log(val.formatted24)}
/>
```

### StaticTimePicker (siempre visible)
```tsx
<StaticTimePicker
  format={12}
  showSeconds
  showNow
  onChange={(val) => console.log(val)}
/>
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `value` | `Partial<TimeValue> \| null` | — | Hora seleccionada (controlado) |
| `defaultValue` | `Partial<TimeValue> \| null` | — | Hora inicial (no controlado) |
| `format` | `12 \| 24` | `24` | Formato de hora |
| `showSeconds` | `boolean` | `false` | Mostrar rueda de segundos |
| `name` | `string` | — | Nombre del campo para integración con Form |
| `placeholder` | `string` | `'Seleccionar hora…'` | Texto placeholder |
| `minuteStep` | `number` | `1` | Paso de minutos (1, 5, 10, 15, 30) |
| `secondStep` | `number` | `1` | Paso de segundos (1, 5, 10, 15, 30) |
| `onChange` | `(value: TimeValue) => void` | — | Callback al cambiar hora |
| `onAccept` | `(value: TimeValue) => void` | — | Callback al aceptar |
| `inline` | `boolean` | `false` | Modo siempre visible |
| `clearable` | `boolean` | `true` | Mostrar botón Limpiar |
| `showNow` | `boolean` | `true` | Mostrar botón "Ahora" |
| `children` | `ReactNode` | — | Contenido adicional |
| `className` | `string` | — | Clase CSS adicional |

## Tipos de datos

### TimeValue
```typescript
interface TimeValue {
  hours: number;       // 0-23 (siempre 24h internamente)
  minutes: number;     // 0-59
  seconds: number;     // 0-59
  ampm: 'AM' | 'PM';
  formatted24: string; // "14:30:00"
  formatted12: string; // "02:30:00 PM"
  display: string;     // depende del prop format
  timestamp: number;   // segundos desde medianoche
}
```

## CSS Custom Properties

El componente usa tokens del framework W3Fussion. Las clases principales son:

| Clase | Descripción |
|-------|-------------|
| `.w3f-timepicker` | Contenedor raíz (dropdown mode) |
| `.w3f-timepicker-inline` | Contenedor raíz (inline mode) |
| `.w3f-timepicker-input` | Input trigger |
| `.w3f-timepicker-dropdown` | Panel dropdown |
| `.w3f-timepicker-display` | Display digital de la hora |
| `.w3f-timepicker-wheels` | Contenedor de ruedas |
| `.w3f-timepicker-scroll` | Rueda de scroll individual |
| `.w3f-timepicker-item` | Item de la rueda |
| `.w3f-timepicker-item--selected` | Item seleccionado |
| `.w3f-timepicker-ampm` | Toggle AM/PM |
| `.w3f-timepicker-ampm-btn--active` | Botón AM/PM activo |
| `.w3f-timepicker-step-btn` | Botones arriba/abajo |
| `.w3f-timepicker-actions` | Barra de acciones |

## API

### Entrada de datos
- **Controlado**: `value` + `onChange` para estado externo
- **No controlado**: `defaultValue` para estado interno
- **Configuración**: `format` (12/24), `minuteStep`, `secondStep` controlan las opciones disponibles
- **Form**: prop `name` genera `<input type="hidden">` con el valor en formato 24h (`"14:30:00"`)

### Salida de datos
- **onChange**: `(TimeValue) => void` — se dispara cada vez que cambia hora, minuto o segundo
- **onAccept**: `(TimeValue) => void` — se dispara solo al presionar "Aceptar" (cierra el dropdown)
- **TimeValue**: objeto rico con ambos formatos (12h/24h), timestamp en segundos desde medianoche

### Comunicación con otros componentes
- **Form/LiveForm**: via prop `name` — genera hidden input, valor disponible en `FormContext.values[name]`
- **DatePicker**: combinación natural — DatePicker para fecha + TimePicker para hora
- **Independiente**: callbacks `onChange`/`onAccept` para integración directa
- **Composición**: acepta `children` para contenido adicional debajo del panel

### Accesibilidad
- Ruedas de scroll con `scroll-snap` para selección precisa
- Botones step (arriba/abajo) como alternativa al scroll
- Items con `tabIndex={0}` para navegación por teclado
- Display digital muestra el valor actual en tiempo real

### Patrón de uso recomendado
```tsx
// Formulario con hora de cita
<Form onSubmit={handleSubmit}>
  <TimePicker
    name="appointmentTime"
    format={12}
    minuteStep={15}
    placeholder="Hora de la cita"
  />
</Form>

// Combinado con DatePicker
<Stack horizontal spacing="4">
  <DatePicker name="date" placeholder="Fecha" />
  <TimePicker name="time" format={24} showSeconds />
</Stack>
```

## Estructura de archivos

```
TimePicker/
├── TimePicker.tsx           # TimePicker + StaticTimePicker
├── TimePicker.types.ts      # Interfaces y tipos
├── TimePicker.constants.ts  # CSS tokens + generadores de rangos
├── TimePicker.hooks.ts      # useTimePicker, useTPDropdown, useScrollWheel
├── TimePicker.utils.ts      # formatTimeDisplay, buildTimeValue
└── index.ts                 # Re-exports públicos
```
