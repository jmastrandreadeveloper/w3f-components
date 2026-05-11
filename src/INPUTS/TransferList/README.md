# TransferList

Componente de seleccion dual con dos paneles: origen y destino. Permite mover elementos entre paneles usando botones de accion o arrastrandolos directamente. Soporta seleccion multiple, filtrado por texto y elementos deshabilitados.

## Importacion

```tsx
import TransferList from '@/components/INPUTS/TransferList/TransferList';
```

## Uso basico

```tsx
const [source, setSource] = useState([
  { id: 1, label: 'React' },
  { id: 2, label: 'Vue' },
  { id: 3, label: 'Angular' },
]);
const [target, setTarget] = useState([]);

<TransferList
  sourceItems={source}
  targetItems={target}
  onChange={(src, tgt) => { setSource(src); setTarget(tgt); }}
  sourceTitle="Available"
  targetTitle="Selected"
/>
```

## Con descripciones

Los items pueden incluir una descripcion secundaria:

```tsx
<TransferList
  sourceItems={[
    { id: 'ts', label: 'TypeScript', description: 'Typed JavaScript superset' },
    { id: 'py', label: 'Python', description: 'General-purpose language' },
    { id: 'rs', label: 'Rust', description: 'Systems programming language' },
  ]}
  targetItems={[]}
  onChange={handleChange}
  enableSearch
/>
```

## Busqueda

Habilita un campo de filtrado en cada panel. Busca tanto en `label` como en `description`:

```tsx
<TransferList
  sourceItems={items}
  targetItems={[]}
  onChange={handleChange}
  enableSearch
  height="300px"
/>
```

## Items deshabilitados

Los items con `disabled: true` no pueden transferirse ni arrastrarse:

```tsx
<TransferList
  sourceItems={[
    { id: 'admin', label: 'Admin' },
    { id: 'super', label: 'Super Admin', disabled: true },
    { id: 'guest', label: 'Guest', disabled: true },
  ]}
  targetItems={[]}
  onChange={handleChange}
/>
```

## Lista completa deshabilitada

El prop `disabled` bloquea todo el componente:

```tsx
<TransferList
  sourceItems={sourceItems}
  targetItems={targetItems}
  disabled
  sourceTitle="Source (Disabled)"
  targetTitle="Target (Disabled)"
/>
```

## Altura personalizada

```tsx
<TransferList
  sourceItems={items}
  targetItems={[]}
  onChange={handleChange}
  height="240px"
/>
```

## Seleccion multiple

- Click simple: selecciona/deselecciona un item (si habia otro seleccionado lo reemplaza)
- Ctrl+Click / Cmd+Click: seleccion multiple aditiva
- Checkbox: toggle individual de cada item
- Checkbox en cabecera: selecciona/deselecciona todos los visibles (indeterminate cuando hay mezcla)

## Drag and Drop

Los items se pueden arrastrar entre paneles o reordenar dentro del mismo panel:

- Arrastrar un item no seleccionado: mueve solo ese item
- Arrastrar un item seleccionado: mueve todos los items seleccionados
- Un indicador de linea azul muestra la posicion de insercion
- Un ghost flotante muestra el label del item (o `label (+N)` para multiples)
- Dead zone de 5px para evitar drags accidentales al hacer click

## Botones de accion

| Icono | Accion |
|---|---|
| `>>` | Mover todos los items no deshabilitados de origen a destino |
| `>` | Mover los items seleccionados en origen a destino |
| `<` | Mover los items seleccionados en destino a origen |
| `<<` | Mover todos los items no deshabilitados de destino a origen |

## CSS Custom Properties

Todos los aspectos visuales son configurables via CSS custom properties. Aplica overrides en una clase custom pasada via `className`:

```css
.mi-transfer-theme {
  --w3f-tl-gap: 1rem;
  --w3f-tl-panel-bg: #1e293b;
  --w3f-tl-panel-border-color: #334155;
  --w3f-tl-panel-radius: 12px;
  --w3f-tl-header-bg: #1e293b;
  --w3f-tl-header-border-color: #334155;
  --w3f-tl-title-color: #f1f5f9;
  --w3f-tl-item-hover-bg: #334155;
  --w3f-tl-item-selected-bg: rgba(99, 102, 241, 0.2);
  --w3f-tl-btn-bg: #334155;
  --w3f-tl-btn-color: #e2e8f0;
  --w3f-tl-btn-hover-border-color: #6366f1;
  --w3f-tl-btn-hover-color: #6366f1;
}
```

### Variables disponibles

#### Layout

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-tl-gap` | `space-3` | Espacio entre paneles y columna de botones |
| `--w3f-tl-disabled-opacity` | `0.55` | Opacidad del componente deshabilitado |

#### Panel

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-tl-panel-bg` | `surface` | Fondo del panel |
| `--w3f-tl-panel-border-color` | `gray-200` | Borde del panel |
| `--w3f-tl-panel-radius` | `radius-lg` | Radio del panel |
| `--w3f-tl-panel-transition` | `border-color, box-shadow 0.2s` | Transicion del panel |
| `--w3f-tl-panel-drop-border-color` | `primary` | Borde cuando es drop target |
| `--w3f-tl-panel-drop-shadow` | `0 0 0 3px primary/15%` | Sombra cuando es drop target |

#### Cabecera

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-tl-header-bg` | `gray-50` | Fondo de la cabecera |
| `--w3f-tl-header-border-color` | `gray-200` | Separador inferior de la cabecera |
| `--w3f-tl-title-font-size` | `text-sm` | Tamano del titulo |
| `--w3f-tl-title-color` | `on-surface` | Color del titulo |
| `--w3f-tl-count-color` | `gray-400` | Color del contador |

#### Checkboxes

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-tl-checkbox-border-color` | `outline` | Borde del checkbox |
| `--w3f-tl-checkbox-radius` | `radius-sm` | Radio del checkbox |
| `--w3f-tl-checkbox-bg` | `surface` | Fondo sin marcar |
| `--w3f-tl-checkbox-checked-bg` | `primary` | Fondo marcado |
| `--w3f-tl-checkbox-checked-border-color` | `primary` | Borde marcado |
| `--w3f-tl-checkbox-transition` | `background-color, border-color` | Transicion |

#### Busqueda

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-tl-search-border-color` | `gray-300` | Borde del input |
| `--w3f-tl-search-radius` | `radius-md` | Radio del input |
| `--w3f-tl-search-bg` | `surface` | Fondo del input |
| `--w3f-tl-search-color` | `on-surface` | Texto del input |
| `--w3f-tl-search-font-size` | `text-sm` | Tamano de texto |
| `--w3f-tl-search-icon-color` | `gray-400` | Color del icono lupa |
| `--w3f-tl-search-placeholder-color` | `gray-400` | Color del placeholder |
| `--w3f-tl-search-focus-border-color` | `primary` | Borde en foco |
| `--w3f-tl-search-focus-shadow` | `0 0 0 3px primary/10%` | Sombra en foco |

#### Items

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-tl-item-transition` | `background-color 0.12s` | Transicion |
| `--w3f-tl-item-hover-bg` | `gray-50` | Fondo en hover |
| `--w3f-tl-item-selected-bg` | `primary-50` | Fondo seleccionado |
| `--w3f-tl-item-selected-hover-bg` | `primary-100` | Fondo seleccionado en hover |
| `--w3f-tl-item-label-color` | `on-surface` | Color del label |
| `--w3f-tl-item-label-font-size` | `text-sm` | Tamano del label |
| `--w3f-tl-item-desc-color` | `gray-400` | Color de la descripcion |
| `--w3f-tl-item-disabled-opacity` | `0.45` | Opacidad de item deshabilitado |
| `--w3f-tl-item-dragging-opacity` | `0.35` | Opacidad del item durante drag |

#### Estado vacio

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-tl-empty-color` | `gray-400` | Color del mensaje vacio |
| `--w3f-tl-empty-font-size` | `text-sm` | Tamano del mensaje vacio |

#### Scrollbar

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-tl-scrollbar-color` | `gray-300` | Color del scrollbar |
| `--w3f-tl-scrollbar-hover-color` | `gray-400` | Color del scrollbar en hover |

#### Botones de accion

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-tl-btn-bg` | `surface` | Fondo del boton |
| `--w3f-tl-btn-border-color` | `gray-300` | Borde del boton |
| `--w3f-tl-btn-radius` | `radius-md` | Radio del boton |
| `--w3f-tl-btn-color` | `gray-500` | Color del icono |
| `--w3f-tl-btn-hover-bg` | `primary-50` | Fondo en hover |
| `--w3f-tl-btn-hover-border-color` | `primary` | Borde en hover |
| `--w3f-tl-btn-hover-color` | `primary` | Color en hover |
| `--w3f-tl-btn-active-bg` | `primary-100` | Fondo en active |
| `--w3f-tl-btn-disabled-opacity` | `0.35` | Opacidad deshabilitado |

#### Drag ghost

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-tl-ghost-bg` | `surface` | Fondo del ghost |
| `--w3f-tl-ghost-border-color` | `primary` | Borde del ghost |
| `--w3f-tl-ghost-radius` | `radius-md` | Radio del ghost |
| `--w3f-tl-ghost-shadow` | `0 8px 24px rgba(0,0,0,0.15)` | Sombra del ghost |
| `--w3f-tl-ghost-color` | `on-surface` | Texto del ghost |
| `--w3f-tl-ghost-font-size` | `text-sm` | Tamano del texto del ghost |

#### Drop indicator

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-tl-drop-color` | `primary` | Color de la linea indicadora |

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `sourceItems` | `TransferItem[]` | `[]` | Items en el panel de origen |
| `targetItems` | `TransferItem[]` | `[]` | Items en el panel de destino |
| `onChange` | `(source: TransferItem[], target: TransferItem[]) => void` | — | Callback al mover items |
| `sourceTitle` | `string` | `'Disponibles'` | Titulo del panel origen |
| `targetTitle` | `string` | `'Seleccionados'` | Titulo del panel destino |
| `enableSearch` | `boolean` | `true` | Activa el campo de busqueda en ambos paneles |
| `height` | `string \| number` | `'360px'` | Altura de la lista scrolleable |
| `disabled` | `boolean` | `false` | Deshabilita todo el componente |
| `className` | `string` | `''` | Clases CSS adicionales (para overrides de vars) |

## TransferItem

```ts
interface TransferItem {
  id: string | number;    // Identificador unico
  label: string;          // Texto principal
  description?: string;   // Texto secundario (opcional)
  disabled?: boolean;     // Bloquea la transferencia de este item
}
```

## Tema oscuro

El componente tiene soporte integrado para tema oscuro via `.w3f-theme-dark`:

```html
<div class="w3f-theme-dark">
  <TransferList ... />
</div>
```

Todos los colores se adaptan automaticamente: paneles oscuros, textos claros, bordes sutiles, botones con variante primaria azul-400.

## Responsive

En pantallas menores a 640px el componente cambia a layout vertical: los dos paneles se apilan y los botones de accion se ordenan en fila horizontal.

## Estructura de archivos

```
TransferList/
  TransferList.tsx            Componente principal con drag-and-drop
  TransferList.types.ts       TransferItem, TransferListProps, SelectAllState
  TransferList.constants.ts   TRANSFER_CLASSES, DRAG_DEAD_ZONE
  TransferList.hooks.ts       useTransferList (estado, seleccion, movimiento)
  TransferList.utils.ts       filterItems, getSelectAllState, buildItemClasses
  README.md                   Esta documentacion
```

CSS: `src/w3fussion/INPUTS/_transfer-list.css`
