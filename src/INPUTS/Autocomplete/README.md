# Autocomplete

Componente de campo de texto con sugerencias en dropdown. Filtra opciones en tiempo real mientras el usuario escribe, con soporte para arrays de strings y arrays de objetos. Compatible con Form y LiveForm.

## Importacion

```tsx
import Autocomplete from '@/components/INPUTS/Autocomplete/Autocomplete';
```

## Uso basico

### Con array de strings

```tsx
<Autocomplete
  data={['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']}
  placeholder="Search fruits..."
  onSelect={(item) => console.log('Selected:', item)}
/>
```

### Con boton de limpiar

```tsx
<Autocomplete
  data={['Apple', 'Banana', 'Cherry']}
  placeholder="Search with clear..."
  clearable
/>
```

## Con objetos y optionLabel

Cuando el array contiene objetos, usa `optionLabel` para indicar la propiedad que se muestra como texto:

```tsx
const countries = [
  { id: 1, name: 'Argentina', code: 'AR' },
  { id: 2, name: 'Brazil', code: 'BR' },
  { id: 3, name: 'Canada', code: 'CA' },
];

<Autocomplete
  data={countries}
  optionLabel="name"
  placeholder="Search country..."
  clearable
  searchIcon
  onSelect={(item) => console.log(item)}
/>
```

El callback `onSelect` recibe el objeto completo seleccionado, no solo el texto.

## Variantes

Tres estilos de borde controlados por el prop `variant`:

```tsx
<Autocomplete data={fruits} variant="outline" placeholder="Outline" label="Outline" />
<Autocomplete data={fruits} variant="filled"  placeholder="Filled"  label="Filled" />
<Autocomplete data={fruits} variant="flushed" placeholder="Flushed" label="Flushed" />
```

## Tamanos

```tsx
<Autocomplete data={fruits} size="sm" placeholder="Small" />
<Autocomplete data={fruits} size="md" placeholder="Medium (default)" />
<Autocomplete data={fruits} size="lg" placeholder="Large" />
```

## Input redondeado

```tsx
<Autocomplete data={fruits} round placeholder="Rounded input" searchIcon clearable />
```

## Icono de busqueda

Muestra un icono de lupa a la izquierda del input. Mientras filtra, el icono se reemplaza por un spinner animado:

```tsx
<Autocomplete data={countries} optionLabel="name" searchIcon placeholder="With search icon" />
```

## Limite de resultados

Limita cuantas sugerencias se muestran en el dropdown:

```tsx
<Autocomplete
  data={countries}
  optionLabel="name"
  maxResults={5}
  placeholder="Max 5 results"
  clearable
  searchIcon
/>
```

## Mensaje de vacio personalizado

Texto que se muestra cuando la busqueda no encuentra coincidencias:

```tsx
<Autocomplete
  data={fruits}
  emptyMessage="No hay frutas con ese nombre"
  placeholder="Buscar fruta..."
/>
```

## Filtro personalizado

Reemplaza la logica de filtrado por defecto con una funcion propia:

```tsx
<Autocomplete
  data={countries}
  optionLabel="name"
  filterFn={(item, query) =>
    item.name.toLowerCase().startsWith(query.toLowerCase()) ||
    item.code.toLowerCase() === query.toLowerCase()
  }
  placeholder="Filter by name or code..."
/>
```

## Estado de error

El error puede ser un booleano (solo borde rojo) o un string (borde rojo + mensaje):

```tsx
<Autocomplete data={fruits} error placeholder="Error state" />
<Autocomplete data={fruits} error="Este campo es requerido" name="fruit" placeholder="With error message" />
```

## Con etiqueta

```tsx
<Autocomplete
  data={countries}
  optionLabel="name"
  label="Pais de origen"
  placeholder="Seleccionar pais..."
  clearable
/>
```

## Integracion con Form / LiveForm

Cuando se proporciona `name`, el Autocomplete lee y escribe en `FormContext` automaticamente:

```tsx
<Form initialValues={{ country: '', framework: '' }} onSubmit={handleSubmit}>
  <Autocomplete
    name="country"
    data={countries}
    optionLabel="name"
    label="Pais"
    placeholder="Seleccionar pais..."
    clearable
    searchIcon
  />
  <Autocomplete
    name="framework"
    data={frameworks}
    optionLabel="name"
    label="Framework"
    placeholder="Seleccionar framework..."
    clearable
  />
  <Button type="submit">Guardar</Button>
</Form>
```

## Navegacion por teclado

El componente soporta navegacion completa con teclado:

| Tecla | Accion |
|---|---|
| `ArrowDown` | Mover seleccion hacia abajo |
| `ArrowUp` | Mover seleccion hacia arriba |
| `Enter` | Seleccionar la opcion activa |
| `Escape` | Cerrar el dropdown |

## CSS Custom Properties

El componente es 100% configurable via CSS custom properties. Aplica overrides en una clase custom:

```css
.mi-autocomplete-dark {
  --w3f-ac-input-bg: #1f2937;
  --w3f-ac-input-color: #f9fafb;
  --w3f-ac-input-border-color: #4b5563;
  --w3f-ac-list-bg: #111827;
  --w3f-ac-list-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  --w3f-ac-item-hover-bg: #374151;
  --w3f-ac-item-active-bg: #4b5563;
}
```

```tsx
<Autocomplete className="mi-autocomplete-dark" data={countries} optionLabel="name" />
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-ac-margin-bottom` | `space-6` | Margen inferior del contenedor |
| `--w3f-ac-font-family` | `font-family` | Fuente del componente |
| `--w3f-ac-input-padding-v` | `space-2` | Padding vertical del input |
| `--w3f-ac-input-padding-h` | `space-3` | Padding horizontal del input |
| `--w3f-ac-input-bg` | `surface` | Fondo del input |
| `--w3f-ac-input-color` | `on-surface` | Color del texto del input |
| `--w3f-ac-input-border-color` | `outline-variant` | Borde normal |
| `--w3f-ac-input-border-color-hover` | `outline` | Borde en hover |
| `--w3f-ac-input-border-color-focus` | `primary` | Borde en foco |
| `--w3f-ac-input-radius` | `radius-lg` | Border radius del input |
| `--w3f-ac-input-font-size` | `text-base` | Tamano de fuente del input |
| `--w3f-ac-input-transition` | `transition-fast` | Transicion del input |
| `--w3f-ac-clear-color` | `outline` | Color del boton limpiar |
| `--w3f-ac-clear-hover-color` | `danger` | Color del boton limpiar en hover |
| `--w3f-ac-clear-hover-bg` | `danger-50` | Fondo del boton limpiar en hover |
| `--w3f-ac-clear-radius` | `radius-sm` | Radius del boton limpiar |
| `--w3f-ac-list-bg` | `surface` | Fondo del dropdown |
| `--w3f-ac-list-border-color` | `outline-variant` | Borde del dropdown |
| `--w3f-ac-list-radius` | `radius-lg` | Radius del dropdown |
| `--w3f-ac-list-shadow` | `shadow-md` | Sombra del dropdown |
| `--w3f-ac-list-max-height` | `300px` | Altura maxima del dropdown |
| `--w3f-ac-list-scrollbar-color` | `outline-variant` | Color del scrollbar |
| `--w3f-ac-list-scrollbar-hover-color` | `outline` | Color del scrollbar en hover |
| `--w3f-ac-item-padding-v` | `space-2` | Padding vertical de cada opcion |
| `--w3f-ac-item-padding-h` | `space-3` | Padding horizontal de cada opcion |
| `--w3f-ac-item-color` | `on-surface` | Color del texto de cada opcion |
| `--w3f-ac-item-border-color` | `outline-variant` | Separador entre opciones |
| `--w3f-ac-item-font-size` | `text-base` | Tamano de fuente de opciones |
| `--w3f-ac-item-hover-bg` | `surface-variant` | Fondo de opcion en hover |
| `--w3f-ac-item-active-bg` | `primary` | Fondo de opcion activa |
| `--w3f-ac-item-active-color` | `on-primary` | Color de opcion activa |
| `--w3f-ac-item-active-border-color` | `primary` | Borde de opcion activa |
| `--w3f-ac-item-transition` | `transition-fast` | Transicion de opciones |
| `--w3f-ac-highlight-color` | `primary-800` | Color del texto resaltado |
| `--w3f-ac-match-highlight-color` | `primary-700` | Color del match resaltado |
| `--w3f-ac-empty-color` | `outline` | Color del mensaje de vacio |
| `--w3f-ac-empty-font-size` | `text-sm` | Tamano del mensaje de vacio |
| `--w3f-ac-icon-color` | `outline` | Color del icono de busqueda |
| `--w3f-ac-icon-error-color` | `danger` | Color del icono en error |
| `--w3f-ac-spinner-color` | `primary` | Color del spinner de carga |
| `--w3f-ac-focus-outline-color` | `primary` | Color del outline de foco |
| `--w3f-ac-error-border-color` | `danger` | Borde en estado error |
| `--w3f-ac-error-color` | `danger` | Color de texto en error |
| `--w3f-ac-filled-bg` | `surface-variant` | Fondo de variante filled |
| `--w3f-ac-filled-focus-bg` | `surface` | Fondo de filled en foco |
| `--w3f-ac-flushed-border-color` | `outline-variant` | Borde de variante flushed |
| `--w3f-ac-pill-radius` | `radius-full` | Radius en modo round |

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `data` | `AutocompleteOption[]` | — | Array de opciones (strings u objetos) |
| `optionLabel` | `string` | `'label'` | Propiedad del objeto a mostrar como texto |
| `onSelect` | `(item) => void` | — | Callback al seleccionar una opcion |
| `filterFn` | `(item, query) => boolean` | — | Funcion de filtrado personalizada |
| `maxResults` | `number` | `10` | Maximo de sugerencias visibles |
| `emptyMessage` | `string` | `'No se encontraron resultados'` | Mensaje cuando no hay coincidencias |
| `clearable` | `boolean` | `false` | Muestra boton para limpiar el input |
| `variant` | `'outline' \| 'filled' \| 'flushed'` | `'outline'` | Estilo del input |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamano del input |
| `round` | `boolean` | `false` | Input con bordes redondeados (pill) |
| `searchIcon` | `boolean` | `true` | Muestra icono de lupa / spinner de carga |
| `placeholder` | `string` | `'Escribe para buscar...'` | Texto placeholder del input |
| `label` | `string` | — | Etiqueta visible sobre el input |
| `error` | `boolean \| string` | `false` | Estado de error (booleano o mensaje) |
| `name` | `string` | — | Campo en Form/LiveForm |
| `value` | `string` | — | Valor controlado externamente |
| `onChange` | `(e) => void` | — | Handler de cambio controlado |
| `onBlur` | `(e) => void` | — | Handler de blur |
| `className` | `string` | `''` | Clases CSS adicionales |

## API

### Entrada de datos

El Autocomplete acepta datos por cuatro vias:

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Opciones | `data` | `AutocompleteOption[]` | Array de strings u objetos que se filtra al escribir. Requerido |
| Valor controlado | `value` | `string` | Texto del input controlado desde el padre |
| FormContext | `name` | `string` | Lee `FormContext.values[name]` como texto del input cuando esta dentro de `<Form>` |
| Filtro externo | `filterFn` | `(item, query) => boolean` | Sustituye la logica de filtrado por defecto |

**Formato de `data`:**
```ts
// Array de strings
data={['Apple', 'Banana', 'Cherry']}

// Array de objetos (requiere optionLabel)
data={[{ id: 1, name: 'Argentina' }, { id: 2, name: 'Brasil' }]}
optionLabel="name"
```

El filtro por defecto es `includes` case-insensitive sobre el texto de la opcion. El limite de resultados visibles se controla con `maxResults` (default: `10`).

### Salida de datos

| Evento | Firma | Cuando se dispara |
|---|---|---|
| `onSelect` | `(item: AutocompleteOption \| null) => void` | El usuario hace clic en una sugerencia del dropdown o presiona Enter. Emite el objeto o string completo de la opcion, o `null` al limpiar |
| `onChange` | `(e: ChangeEvent<HTMLInputElement> \| { target: { name?, value: string } }) => void` | Cada cambio de texto en el input (modo controlado externo). El evento puede ser nativo o sintetico |
| `onBlur` | `(e: FocusEvent<HTMLInputElement>) => void` | Al perder el foco en el input |

Flujo de seleccion:
1. Usuario escribe → el hook `useAutocomplete` filtra `data` y muestra el dropdown
2. Click o Enter → `handleItemClick(suggestion)`
3. Si es form-controlled: llama a `formContext.handleChange` con el texto de la opcion
4. Siempre llama a `onSelect(suggestion)` si el callback esta definido

### Comunicacion con otros componentes

#### Con Form / LiveForm (bidireccional)

El Autocomplete consume `FormContext` via `useAutocomplete({ name })`. El valor almacenado en el Form es el **texto** de la opcion seleccionada (string), no el objeto completo:

```
Form.initialValues.country = ""
        ↓ (lectura)
Autocomplete lee FormContext.values["country"] como texto del input
        ↓ (usuario selecciona "Argentina")
Autocomplete llama formContext.handleChange({ target: { name, value: "Argentina" } })
        ↓ (propagacion)
Form.onSubmit recibe { country: "Argentina" }
```

Los errores de Form (`formContext.errors[name]`) se muestran bajo el input.

#### Independiente (sin contexto requerido)

```tsx
<Autocomplete
  data={countries}
  optionLabel="name"
  onSelect={(item) => console.log('Seleccionado:', item)}
  clearable
/>
```

### Accesibilidad

El componente implementa el patron WAI-ARIA `combobox` completo:

| Atributo | Valor | Elemento | Condicion |
|---|---|---|---|
| `role` | `"combobox"` | Contenedor del input | Siempre |
| `aria-haspopup` | `"listbox"` | Contenedor del input | Siempre |
| `aria-expanded` | `true` / `false` | Contenedor del input | Segun visibilidad del dropdown |
| `aria-autocomplete` | `"list"` | `<input>` | Siempre |
| `aria-controls` | id del listbox | `<input>` | Siempre |
| `aria-activedescendant` | id de la opcion activa | `<input>` | Cuando hay opcion navegada con teclado |
| `aria-invalid` | `true` / `false` | `<input>` | Cuando hay error |
| `role` | `"listbox"` | Dropdown | Cuando esta visible |
| `role` | `"option"` | Cada sugerencia | Siempre |
| `aria-selected` | `true` / `false` | Cada sugerencia | Segun opcion activa |
| `aria-label` | `"Limpiar busqueda"` | Boton de limpiar | Cuando `clearable` y hay texto |
| `role` | `"alert"` | Mensaje de error | Cuando hay error |

Navegacion por teclado: `ArrowDown`/`ArrowUp` mueven la seleccion, `Enter` confirma, `Escape` cierra el dropdown.

### Patron de uso recomendado

```tsx
// 1. Array de strings con boton de limpiar
<Autocomplete
  data={['React', 'Vue', 'Angular', 'Svelte']}
  placeholder="Buscar framework..."
  clearable
  onSelect={(item) => console.log(item)}
/>

// 2. Array de objetos con filtro personalizado
<Autocomplete
  data={countries}
  optionLabel="name"
  filterFn={(item, q) => item.name.startsWith(q) || item.code === q.toUpperCase()}
  placeholder="Buscar por nombre o codigo..."
/>

// 3. Con limite de resultados e icono
<Autocomplete
  data={products}
  optionLabel="title"
  maxResults={5}
  searchIcon
  clearable
  label="Producto"
/>

// 4. Integrado en Form
<Form initialValues={{ pais: '' }} onSubmit={handleSubmit}>
  <Autocomplete
    name="pais"
    data={countries}
    optionLabel="name"
    label="Pais de origen"
    placeholder="Seleccionar..."
    clearable
    searchIcon
  />
  <Button type="submit">Continuar</Button>
</Form>

// 5. Con estado de error
<Autocomplete
  data={fruits}
  error="Selecciona una opcion valida"
  name="fruit"
  placeholder="Seleccionar fruta..."
/>
```

## Estructura de archivos

```
Autocomplete/
  Autocomplete.tsx            Componente principal
  Autocomplete.types.ts       Interfaces TypeScript
  Autocomplete.constants.ts   Clases CSS y defaults
  Autocomplete.utils.ts       buildAutocompleteInputClasses(), getOptionText(), defaultFilter()
  Autocomplete.hooks.ts       useAutocomplete (logica principal + integracion Form)
  README.md                   Esta documentacion
```

CSS: `src/w3fussion/INPUTS/_autocomplete.css`
