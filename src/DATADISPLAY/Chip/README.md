# Chip

Componente compacto para representar etiquetas de entrada, filtros activos o tokens de seleccion. Soporta eliminacion via boton de cierre, estados de foco y deshabilitado, e interaccion por teclado.

## Importacion

```tsx
import Chip from '@/components/DATADISPLAY/Chip/Chip';
import InputChipContainer from '@/components/DATADISPLAY/Chip/InputChipContainer';
```

## Uso basico

```tsx
<Chip label="React" />
<Chip label="TypeScript" />
<Chip label="CSS" />
```

## Chip con cierre

El prop `onClose` habilita el boton `x` para eliminar el chip. Cuando el chip tiene foco, presionar `Enter`, `Delete` o `Backspace` tambien dispara `onClose`:

```tsx
const [chips, setChips] = useState(['React', 'TypeScript', 'Vite']);

const remove = (label: string) =>
  setChips(prev => prev.filter(c => c !== label));

{chips.map(label => (
  <Chip key={label} label={label} onClose={() => remove(label)} />
))}
```

## Estado deshabilitado

Cuando `disabled` es `true`, el chip no es interactivo y el boton de cierre no se renderiza aunque `onClose` este definido:

```tsx
<Chip label="Disabled" disabled />
<Chip label="Disabled with close prop" disabled onClose={() => {}} />
```

## Chip clickable

```tsx
<Chip label="Filter" onClick={() => toggleFilter('filter')} />
```

## Estado foco controlado

`isFocused` permite controlar visualmente el estado de foco desde fuera (util en listas de chips seleccionados):

```tsx
<Chip label="Focused" isFocused />
<Chip label="Active Token" isFocused onClose={() => handleClose()} />
```

## InputChipContainer

Componente de campo de entrada que permite agregar chips escribiendo texto y presionando Enter:

```tsx
<InputChipContainer />
```

## Modo unstyled

Elimina todos los estilos visuales para componer apariencia via trait classes o CSS propio:

```tsx
<Chip label="Custom" unstyled className="mi-chip-custom" />
```

## CSS Custom Properties

```css
.mi-chip-custom {
  --w3f-chip-bg: linear-gradient(135deg, #6366f1, #8b5cf6);
  --w3f-chip-color: #ffffff;
  --w3f-chip-radius: 50px;
  --w3f-chip-font-weight: 600;
  --w3f-chip-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
}

.mi-chip-custom .w3f-chip-close {
  --w3f-chip-close-color: rgba(255, 255, 255, 0.8);
  --w3f-chip-close-hover-color: #ffffff;
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-chip-bg` | `primary` | Color o gradiente de fondo |
| `--w3f-chip-color` | `on-primary` | Color del texto |
| `--w3f-chip-px` | `space-3` | Padding horizontal |
| `--w3f-chip-py` | `space-1` | Padding vertical |
| `--w3f-chip-radius` | `radius-full` | Border radius |
| `--w3f-chip-font-size` | `text-sm` | Tamano del texto |
| `--w3f-chip-font-weight` | `500` | Peso del texto |
| `--w3f-chip-cursor` | `default` | Cursor del puntero |
| `--w3f-chip-transition` | `all fast` | Transicion CSS |
| `--w3f-chip-border-width` | `2px` | Ancho del borde |
| `--w3f-chip-border-color` | `transparent` | Color del borde |
| `--w3f-chip-shadow` | `none` | Box shadow |
| `--w3f-chip-hover-bg` | igual a chip-bg | Fondo en hover |
| `--w3f-chip-hover-color` | igual a chip-color | Texto en hover |
| `--w3f-chip-hover-shadow` | igual a chip-shadow | Sombra en hover |
| `--w3f-chip-hover-border-color` | igual a chip-border-color | Borde en hover |
| `--w3f-chip-hover-scale` | `1` | Escala en hover |
| `--w3f-chip-focus-bg` | `primary-700` | Fondo en estado focused |
| `--w3f-chip-focus-color` | igual a chip-color | Texto en estado focused |
| `--w3f-chip-focus-border-color` | `primary-200` | Borde en estado focused |
| `--w3f-chip-focus-shadow` | `shadow` | Sombra en estado focused |
| `--w3f-chip-focus-scale` | `1.05` | Escala en estado focused |
| `--w3f-chip-focus-outline` | `none` | Outline en estado focused |
| `--w3f-chip-disabled-bg` | `gray-200` | Fondo en deshabilitado |
| `--w3f-chip-disabled-color` | `gray-500` | Texto en deshabilitado |
| `--w3f-chip-disabled-cursor` | `not-allowed` | Cursor en deshabilitado |
| `--w3f-chip-disabled-opacity` | `0.6` | Opacidad en deshabilitado |
| `--w3f-chip-close-margin` | `space-2` | Margen izquierdo del boton cierre |
| `--w3f-chip-close-radius` | `radius-full` | Radio del boton cierre |
| `--w3f-chip-close-size` | `18px` | Tamano del boton cierre |
| `--w3f-chip-close-bg` | `rgba(255,255,255,0.2)` | Fondo del boton cierre |
| `--w3f-chip-close-color` | `inherit` | Color del boton cierre |
| `--w3f-chip-close-font-size` | `1.2rem` | Tamano del icono × |
| `--w3f-chip-close-transition` | `background-color fast` | Transicion del boton cierre |
| `--w3f-chip-close-hover-bg` | `danger` | Fondo del cierre en hover |
| `--w3f-chip-close-hover-color` | `white` | Color del cierre en hover |
| `--w3f-chip-close-hover-scale` | `1` | Escala del cierre en hover |
| `--w3f-chip-label-color` | `inherit` | Color especifico del label |
| `--w3f-chip-label-font-size` | `inherit` | Tamano del label |
| `--w3f-chip-label-font-weight` | `inherit` | Peso del label |
| `--w3f-chip-label-max-width` | `none` | Ancho maximo del label |
| `--w3f-chip-label-overflow` | `visible` | Overflow del label |

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `label` | `string` | — | **Requerido.** Texto del chip |
| `onClose` | `() => void` | — | Callback al presionar el boton × o teclas de cierre |
| `disabled` | `boolean` | `false` | Deshabilita interaccion y oculta el boton de cierre |
| `isFocused` | `boolean` | `false` | Aplica el estado visual focused |
| `onClick` | `MouseEventHandler<HTMLDivElement>` | — | Handler de clic sobre el chip |
| `onKeyDown` | `KeyboardEventHandler<HTMLDivElement>` | — | Handler de teclado adicional |
| `onFocus` | `FocusEventHandler<HTMLDivElement>` | — | Handler de foco |
| `onBlur` | `FocusEventHandler<HTMLDivElement>` | — | Handler de perdida de foco |
| `className` | `string` | — | Clases CSS adicionales |
| `style` | `CSSProperties` | — | Estilos en linea |
| `unstyled` | `boolean` | `false` | Elimina estilos visuales |

## API

### Entrada de datos

Chip es un componente de **display con interaccion**. No tiene estado interno (excepto el manejo de teclado). Toda la informacion le llega por props:

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Texto | `label` | `string` | Contenido textual del chip. Requerido |
| Estado | `disabled` | `boolean` | Controla si el chip acepta interaccion |
| Estado | `isFocused` | `boolean` | Estado de foco controlado externamente |
| Estilo | `className` / `style` | `string / CSSProperties` | Personalizacion visual |

### Salida de datos

Chip emite callbacks hacia el padre. No tiene estado persistente propio:

| Evento | Firma | Cuando se dispara |
|---|---|---|
| `onClose` | `() => void` | Click en boton ×, o tecla `Enter` / `Delete` / `Backspace` cuando el chip tiene foco |
| `onClick` | `MouseEventHandler<HTMLDivElement>` | Click en cualquier parte del chip |
| `onKeyDown` | `KeyboardEventHandler<HTMLDivElement>` | Cualquier tecla (se llama ademas del handler interno de cierre) |
| `onFocus` | `FocusEventHandler<HTMLDivElement>` | El chip recibe el foco del navegador |
| `onBlur` | `FocusEventHandler<HTMLDivElement>` | El chip pierde el foco del navegador |

Flujo tipico de eliminacion:
```
Usuario presiona Enter o Delete
        ↓
Chip llama onClose() [solo si !disabled]
        ↓
Padre actualiza su estado (filtra el chip del array)
        ↓
React re-renderiza sin ese chip
```

### Comunicacion con otros componentes

#### Independiente (patron recomendado)

Chip **no requiere ningun Context ni Provider**. El patron tipico es que el padre controle el array de chips:

```tsx
const [chips, setChips] = useState([
  { id: 1, label: 'React' },
  { id: 2, label: 'TypeScript' },
]);

<div>
  {chips.map(chip => (
    <Chip
      key={chip.id}
      label={chip.label}
      onClose={() => setChips(prev => prev.filter(c => c.id !== chip.id))}
    />
  ))}
</div>
```

#### Con InputChipContainer

`InputChipContainer` gestiona su propio estado interno de chips (array `ChipData[]`) y usa `Chip` internamente. Es un componente autonomo sin props externas actualmente.

#### Sin FormContext

Chip **no consume FormContext** y no se integra con `Form` / `LiveForm`. Para usar chips como valor de un campo de formulario, el padre debe manejar la sincronizacion manualmente:

```tsx
<Form initialValues={{ tags: [] }} onSubmit={handleSubmit}>
  {/* Chip no se conecta automaticamente — controlar manualmente */}
  {chips.map(chip => (
    <Chip key={chip.id} label={chip.label} onClose={() => removeChip(chip.id)} />
  ))}
</Form>
```

### Accesibilidad

| Atributo | Valor | Condicion |
|---|---|---|
| `role` | `"button"` | Siempre — el chip es interactivo |
| `tabIndex` | `0` / `-1` | `0` si activo, `-1` si `disabled` |
| `aria-label` | `"{label}, presione Enter o Suprimir para eliminar"` | Solo cuando `onClose` esta definido |
| `aria-disabled` | `true/false` | Refleja el prop `disabled` |

El boton de cierre interno tiene `role="button"` y `aria-label="Eliminar chip"`.

Las teclas `Enter`, `Delete` y `Backspace` activan `onClose` desde el chip raiz, permitiendo eliminacion sin necesidad del raton.

### Patron de uso recomendado

```tsx
// 1. Lista de tags/filtros activos con eliminacion
const [filters, setFilters] = useState(['React', 'TypeScript']);

<div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
  {filters.map(f => (
    <Chip
      key={f}
      label={f}
      onClose={() => setFilters(prev => prev.filter(x => x !== f))}
    />
  ))}
</div>

// 2. Chip de seleccion con estado foco
<Chip
  label={item.label}
  isFocused={selectedId === item.id}
  onClick={() => setSelectedId(item.id)}
/>

// 3. Chip de solo lectura (sin cierre)
<Chip label="React" />

// 4. Chips como tokens de input — usar InputChipContainer
<InputChipContainer />
```

## Estructura de archivos

```
Chip/
  Chip.tsx                 Componente principal (forwardRef)
  InputChipContainer.tsx   Campo de entrada de chips
  Chip.types.ts            Interfaces TypeScript
  README.md                Esta documentacion
```

CSS: `src/w3fussion/DATADISPLAY/_input-chip.css` + `src/w3fussion/PRESETS/_chip.preset.css`
