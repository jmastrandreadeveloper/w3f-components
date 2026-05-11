# Menu / MenuBarCategory

Barra de menu horizontal con categorias desplegables y submenus multinivel. Cada `MenuBarCategory` es un trigger independiente con su dropdown. Multiples categorias se combinan en una barra de menu estilo aplicacion de escritorio.

## Importacion

```tsx
import { MenuBarCategory } from '@/components/SURFACES/Menu/Menu';
import type { MenuItemData } from '@/components/SURFACES/Menu/Menu.types';
```

## Uso basico

```tsx
const items: MenuItemData[] = [
  { id: 'new', label: 'New File' },
  { id: 'open', label: 'Open' },
  { id: 'save', label: 'Save' },
];

<MenuBarCategory
  label="File"
  items={items}
  onSelect={(label) => console.log('Selected:', label)}
/>
```

## Barra de menu completa

Varias categorias juntas forman una barra de menu horizontal:

```tsx
<div style={{ display: 'flex', background: '#1f2937' }}>
  <MenuBarCategory label="File" items={fileItems} onSelect={handleSelect} />
  <MenuBarCategory label="Edit" items={editItems} onSelect={handleSelect} />
  <MenuBarCategory label="View" items={viewItems} onSelect={handleSelect} />
  <MenuBarCategory label="Help" items={helpItems} onSelect={handleSelect} />
</div>
```

## Submenus multinivel

Items con `subItems` generan submenus que se abren al hacer hover:

```tsx
const items: MenuItemData[] = [
  {
    label: 'Export',
    id: 'export',
    subItems: [
      { label: 'PDF', id: 'pdf' },
      { label: 'PNG', id: 'png' },
      {
        label: 'Web',
        id: 'web',
        subItems: [
          { label: 'HTML', id: 'html' },
          { label: 'React Component', id: 'react' },
        ],
      },
    ],
  },
];

<MenuBarCategory label="File" items={items} onSelect={console.log} />
```

## Posicion del dropdown

El dropdown puede alinearse a la izquierda (default), derecha, centro o abrirse hacia arriba:

```tsx
<MenuBarCategory label="Left"   items={items} position="left" />
<MenuBarCategory label="Center" items={items} position="center" />
<MenuBarCategory label="Right"  items={items} position="right" />
<MenuBarCategory label="Top"    items={items} position="top" />
```

## CSS Custom Properties

Aplica overrides en el contenedor padre de las categorias:

```css
.mi-menubar {
  --w3f-menu-trigger-color: #e2e8f0;
  --w3f-menu-trigger-hover-bg: rgba(255, 255, 255, 0.08);
  --w3f-menu-trigger-active-bg: #334155;
  --w3f-menu-dropdown-bg: #1e293b;
  --w3f-menu-dropdown-border: #334155;
  --w3f-menu-btn-color: #cbd5e1;
  --w3f-menu-btn-hover-bg: #334155;
  --w3f-menu-btn-hover-color: #38bdf8;
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-menu-trigger-bg` | `transparent` | Fondo del boton trigger |
| `--w3f-menu-trigger-color` | `var(--w3f-white)` | Color del texto del trigger |
| `--w3f-menu-trigger-border-color` | `transparent` | Borde del trigger |
| `--w3f-menu-trigger-radius` | `var(--w3f-radius)` | Border radius del trigger |
| `--w3f-menu-trigger-font-size` | `var(--w3f-text-base)` | Tamano de fuente del trigger |
| `--w3f-menu-trigger-font-weight` | `500` | Peso de fuente del trigger |
| `--w3f-menu-trigger-shadow` | `var(--w3f-shadow-sm)` | Sombra del trigger |
| `--w3f-menu-trigger-hover-bg` | `rgba(255,255,255,0.1)` | Fondo en hover |
| `--w3f-menu-trigger-active-bg` | `var(--w3f-gray-600)` | Fondo cuando el dropdown esta abierto |
| `--w3f-menu-trigger-active-border` | `var(--w3f-primary)` | Borde cuando esta abierto |
| `--w3f-menu-trigger-focus-shadow` | `0 0 0 2px var(--w3f-primary-300)` | Sombra de focus |
| `--w3f-menu-dropdown-bg` | `var(--w3f-surface)` | Fondo del panel dropdown |
| `--w3f-menu-dropdown-border` | `var(--w3f-outline-variant)` | Borde del panel |
| `--w3f-menu-dropdown-radius` | `var(--w3f-radius-md)` | Border radius del panel |
| `--w3f-menu-dropdown-shadow` | `var(--w3f-shadow-lg)` | Sombra del panel |
| `--w3f-menu-dropdown-min-width` | `200px` | Ancho minimo del panel |
| `--w3f-menu-dropdown-pad` | `var(--w3f-space-1)` | Padding del panel |
| `--w3f-menu-btn-color` | `var(--w3f-on-surface)` | Color de texto de items |
| `--w3f-menu-btn-font-size` | `var(--w3f-text-sm)` | Tamano de fuente de items |
| `--w3f-menu-btn-pad-v` | `var(--w3f-space-2)` | Padding vertical de items |
| `--w3f-menu-btn-pad-h` | `var(--w3f-space-4)` | Padding horizontal de items |
| `--w3f-menu-btn-hover-bg` | `var(--w3f-gray-100)` | Fondo de item en hover |
| `--w3f-menu-btn-hover-color` | `var(--w3f-primary)` | Color de item en hover |
| `--w3f-menu-btn-active-bg` | `var(--w3f-gray-200)` | Fondo de item en click |
| `--w3f-menu-btn-is-active-bg` | `var(--w3f-gray-100)` | Fondo del item del submenu activo |
| `--w3f-menu-btn-is-active-color` | `var(--w3f-primary)` | Color del item del submenu activo |
| `--w3f-menu-arrow-color` | `var(--w3f-gray-400)` | Color del indicador de submenu |
| `--w3f-menu-arrow-font-size` | `var(--w3f-text-xs)` | Tamano del indicador |
| `--w3f-menu-arrow-hover-color` | `var(--w3f-primary)` | Color del indicador en hover |
| `--w3f-menu-transition` | `var(--w3f-transition-fast)` | Velocidad de transiciones |

## Props

### MenuBarCategory

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `label` | `string` | — | Texto del boton trigger |
| `items` | `MenuItemData[]` | — | Items del dropdown |
| `onSelect` | `(label: string) => void` | — | Callback al seleccionar un item hoja |
| `position` | `'left' \| 'right' \| 'center' \| 'top'` | `'left'` | Alineacion del dropdown respecto al trigger |

### MenuItemData

| Campo | Tipo | Default | Descripcion |
|---|---|---|---|
| `id` | `string \| number` | — | Identificador unico (opcional) |
| `label` | `string` | — | Texto visible del item |
| `subItems` | `MenuItemData[]` | — | Items hijos para submenu |
| `onClick` | `(label: string) => void` | — | Callback especifico de este item |

## API

### Entrada de datos

| Canal | Prop | Descripcion |
|---|---|---|
| Label del trigger | `label` | Texto del boton que abre el dropdown |
| Items | `items` | Array plano o anidado. La recursion es ilimitada via `subItems` |
| Posicion | `position` | Controla el lado del dropdown. Util cuando el trigger esta cerca del borde de la pantalla |

### Salida de datos

| Evento | Firma | Cuando se dispara |
|---|---|---|
| `onSelect` | `(label: string) => void` | Al hacer clic en un item hoja (sin subItems). Recibe el `label` del item |
| `item.onClick` | `(label: string) => void` | Callback por item individual. Se dispara ademas de `onSelect` |

**Nota:** el evento emite el `label` (string), no el objeto completo. Para identificacion robusta usa `item.onClick` con logica propia.

### Comportamiento del dropdown

- Se abre al hacer clic en el trigger
- Se cierra al: seleccionar un item hoja, hacer clic fuera del contenedor
- Los submenus se abren al hacer hover sobre items con `subItems`
- `useMenuOpen` usa `useRef` + listener de `mousedown` en `document` para detectar click fuera
- Solo un dropdown puede estar abierto a la vez (cada `MenuBarCategory` gestiona su propio estado)

### Comunicacion entre componentes

`MenuBarCategory` es independiente. Para una barra de menu coordinada (donde abrir uno cierra los demas), es necesario gestionar el estado externamente o usar multiples instancias independientes.

```tsx
// Patron recomendado: onSelect global en todas las categorias
const handleSelect = (label: string) => dispatch({ type: 'MENU_ACTION', label });

<div className="app-menubar">
  <MenuBarCategory label="File"  items={fileItems}  onSelect={handleSelect} />
  <MenuBarCategory label="Edit"  items={editItems}  onSelect={handleSelect} />
  <MenuBarCategory label="View"  items={viewItems}  onSelect={handleSelect} />
</div>
```

### Accesibilidad

| Atributo | Valor | Condicion |
|---|---|---|
| Click fuera | Cierra el dropdown | Via `mousedown` en `document` |
| Submenus | Se abren/cierran en hover | Via `onMouseEnter` / `onMouseLeave` con delay de 200ms |

## Estructura de archivos

```
Menu/
  Menu.tsx          MenuBarCategory + MenuItem (compound)
  Menu.types.ts     MenuItemData, MenuBarCategoryProps, MenuPosition
  Menu.constants.ts MENU_CLASSES, MENU_BAR_CATEGORY_DEFAULTS
  Menu.utils.ts     buildDropdownClasses (posicion)
  Menu.hooks.ts     useMenuOpen, useMenuItemSubmenu
  README.md         Esta documentacion
```

CSS: `src/w3fussion/SURFACES/_nested-menu.css`
