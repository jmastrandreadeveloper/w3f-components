# ContextMenu

Menu contextual que se activa con clic derecho sobre el area contenida. Soporta submenus multinivel con auto-posicionamiento y cierre por teclado (Escape).

## Importacion

```tsx
import { ContextMenu } from '@/components/SURFACES/ContextMenu/ContextMenu';
import type { ContextMenuItemData } from '@/components/SURFACES/ContextMenu/ContextMenu.types';
```

## Uso basico

```tsx
const items: ContextMenuItemData[] = [
  { id: 'cut', label: 'Cut' },
  { id: 'copy', label: 'Copy' },
  { id: 'paste', label: 'Paste' },
];

<ContextMenu items={items} onMenuAction={(data) => console.log(data.selectedItem.label)}>
  <div style={{ minHeight: 120, border: '2px dashed #d1d5db' }}>
    Right-click here
  </div>
</ContextMenu>
```

## Submenus multinivel

Los items pueden tener `subItems` con profundidad arbitraria. Los submenus se abren al hacer hover y se posicionan automaticamente:

```tsx
const items: ContextMenuItemData[] = [
  {
    id: 'new',
    label: 'New',
    subItems: [
      { id: 'file', label: 'File' },
      { id: 'folder', label: 'Folder' },
      {
        id: 'project',
        label: 'Project',
        subItems: [
          { id: 'react', label: 'React App' },
          { id: 'vue', label: 'Vue App' },
        ],
      },
    ],
  },
  { id: 'save', label: 'Save' },
];

<ContextMenu items={items} onMenuAction={(data) => console.log(data)}>
  <div>Right-click for nested menu</div>
</ContextMenu>
```

## CSS Custom Properties

Aplica overrides en una clase que envuelva el area de activacion:

```css
.mi-zona {
  --w3f-menu-dropdown-bg: #1e293b;
  --w3f-menu-dropdown-border: #334155;
  --w3f-menu-dropdown-radius: 8px;
  --w3f-menu-dropdown-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  --w3f-menu-btn-color: #cbd5e1;
  --w3f-menu-btn-hover-bg: #334155;
  --w3f-menu-btn-hover-color: #38bdf8;
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-menu-dropdown-bg` | `var(--w3f-surface)` | Fondo del panel desplegable |
| `--w3f-menu-dropdown-border` | `var(--w3f-outline-variant)` | Color del borde del panel |
| `--w3f-menu-dropdown-radius` | `var(--w3f-radius-md)` | Border radius del panel |
| `--w3f-menu-dropdown-shadow` | `var(--w3f-shadow-lg)` | Sombra del panel |
| `--w3f-menu-dropdown-min-width` | `200px` | Ancho minimo del panel |
| `--w3f-menu-dropdown-pad` | `var(--w3f-space-1)` | Padding interno del panel |
| `--w3f-menu-btn-color` | `var(--w3f-on-surface)` | Color del texto de items |
| `--w3f-menu-btn-font-size` | `var(--w3f-text-sm)` | Tamano de fuente de items |
| `--w3f-menu-btn-pad-v` | `var(--w3f-space-2)` | Padding vertical de items |
| `--w3f-menu-btn-pad-h` | `var(--w3f-space-4)` | Padding horizontal de items |
| `--w3f-menu-btn-hover-bg` | `var(--w3f-gray-100)` | Fondo de item en hover |
| `--w3f-menu-btn-hover-color` | `var(--w3f-primary)` | Color de item en hover |
| `--w3f-menu-btn-active-bg` | `var(--w3f-gray-200)` | Fondo de item en click |
| `--w3f-menu-btn-focus-bg` | `var(--w3f-primary-100)` | Fondo de item en focus |
| `--w3f-menu-btn-focus-shadow` | `inset 0 0 0 2px var(--w3f-primary-300)` | Sombra de focus |
| `--w3f-menu-arrow-color` | `var(--w3f-gray-400)` | Color del indicador de submenu |
| `--w3f-menu-arrow-font-size` | `var(--w3f-text-xs)` | Tamano del indicador |
| `--w3f-menu-arrow-hover-color` | `var(--w3f-primary)` | Color del indicador en hover |
| `--w3f-menu-transition` | `var(--w3f-transition-fast)` | Velocidad de transiciones |

## Props

### ContextMenu

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | — | Elemento trigger (area de clic derecho) |
| `items` | `ContextMenuItemData[]` | — | Array de items del menu |
| `onMenuAction` | `(data: ContextMenuNavigationData) => void` | — | Callback global al seleccionar cualquier item |

### ContextMenuItemData

| Campo | Tipo | Default | Descripcion |
|---|---|---|---|
| `id` | `string \| number` | — | Identificador unico (opcional) |
| `label` | `string` | — | Texto visible del item |
| `link` | `string` | — | URL opcional asociada al item |
| `onClick` | `(data: ContextMenuNavigationData) => void` | — | Callback especifico de este item |
| `subItems` | `ContextMenuItemData[]` | — | Items hijos para submenu |
| `disabled` | `boolean` | `false` | Deshabilita el item |

## API

### Entrada de datos

El ContextMenu recibe dos canales de configuracion:

| Canal | Prop | Descripcion |
|---|---|---|
| Items | `items` | Array plano o anidado de `ContextMenuItemData`. La recursion es ilimitada via `subItems` |
| Trigger | `children` | Cualquier elemento React. El wrapper captura `onContextMenu` sobre toda el area del hijo |

### Salida de datos

| Evento | Firma | Cuando se dispara |
|---|---|---|
| `onMenuAction` | `(data: ContextMenuNavigationData) => void` | Al hacer clic en cualquier item hoja (sin subItems). Recibe el item seleccionado, la ruta de navegacion y el nivel |
| `item.onClick` | `(data: ContextMenuNavigationData) => void` | Callback por item individual. Se dispara ademas de `onMenuAction` |

### ContextMenuNavigationData

```ts
interface ContextMenuNavigationData {
  timestamp: string;          // ISO 8601 del momento de seleccion
  selectedItem: {
    label: string;            // Texto del item seleccionado
    link: string | null;      // Link del item o null
    hasSubItems: boolean;     // Siempre false (solo items hoja emiten eventos)
  };
  navigationPath: number[];  // Indices de navegacion [0, 2, 1] = padre[0] > hijo[2] > nieto[1]
  level: number;             // Profundidad del item (0 = raiz)
}
```

### Comportamiento de posicionamiento

- El menu se abre en las coordenadas del clic derecho relativas al wrapper
- `calculateMenuPosition` ajusta la posicion si el menu sale de la ventana
- Los submenus se abren a la derecha del item padre; si no hay espacio, cambian a izquierda
- El menu se cierra al: seleccionar un item hoja, presionar Escape, hacer clic fuera del area

### Comunicacion entre componentes

El ContextMenu no requiere ningun Provider. Funciona de forma autonoma en cualquier parte del arbol React.

Para un caso con multiples zonas de clic derecho independientes:

```tsx
<ContextMenu items={editorItems} onMenuAction={handleEditorAction}>
  <Editor />
</ContextMenu>

<ContextMenu items={fileItems} onMenuAction={handleFileAction}>
  <FileList />
</ContextMenu>
```

### Accesibilidad

| Atributo | Valor | Condicion |
|---|---|---|
| `onContextMenu` | Capturado y cancelado (`preventDefault`) | Siempre en el wrapper |
| Escape | Cierra el menu | Cuando el menu esta abierto (via `useContextMenu`) |

### Patron de uso recomendado

```tsx
// 1. Menu simple de edicion
<ContextMenu
  items={[
    { id: 'cut', label: 'Cortar', onClick: handleCut },
    { id: 'copy', label: 'Copiar', onClick: handleCopy },
    { id: 'paste', label: 'Pegar', onClick: handlePaste },
  ]}
>
  <TextArea value={content} />
</ContextMenu>

// 2. Menu de archivo con submenus
<ContextMenu items={fileContextItems} onMenuAction={handleFileAction}>
  <FileCard file={file} />
</ContextMenu>

// 3. Con callback por item individual
const items: ContextMenuItemData[] = [
  {
    id: 'delete',
    label: 'Eliminar',
    onClick: (data) => confirmDelete(data.selectedItem.label),
  },
];
```

## Estructura de archivos

```
ContextMenu/
  ContextMenu.tsx          Componente principal + ContextMenuItem
  ContextMenu.types.ts     Interfaces TypeScript
  ContextMenu.constants.ts Clases CSS, SUBMENU_CLOSE_DELAY, MENU_WIDTH
  ContextMenu.utils.ts     calculateMenuPosition, calculateSubmenuPosition
  ContextMenu.hooks.ts     useContextMenu (visibility, keyboard Escape)
  README.md                Esta documentacion
```

CSS: `src/w3fussion/SURFACES/_nested-menu.css`
