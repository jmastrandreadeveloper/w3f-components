# Sidenav

Navegacion lateral con Tree integrado. Renderiza una estructura de nodos jerarquica con soporte de iconos, grupos colapsables, estados de carga/error y cuatro variantes visuales.

## Importacion

```tsx
import Sidenav from '@/components/SURFACES/Sidenav/Sidenav';
import type { TreeNodeData } from '@/components/SURFACES/Sidenav/Sidenav.types';
```

## Uso basico

```tsx
const navData: TreeNodeData[] = [
  { id: 'home', name: 'Home', icon: 'home' },
  { id: 'users', name: 'Users', icon: 'users' },
  { id: 'settings', name: 'Settings', icon: 'settings' },
];

<Sidenav
  treeData={navData}
  onNodeSelect={(node) => console.log('Selected:', node.id)}
/>
```

## Items anidados (grupos colapsables)

Los nodos con `children` se renderizan como grupos expandibles:

```tsx
const navData: TreeNodeData[] = [
  { id: 'dashboard', name: 'Dashboard', icon: 'home' },
  {
    id: 'management',
    name: 'Management',
    icon: 'users',
    children: [
      { id: 'team', name: 'Team Members' },
      { id: 'roles', name: 'Roles & Permissions' },
    ],
  },
  { id: 'settings', name: 'Settings', icon: 'settings' },
];

<Sidenav
  treeData={navData}
  onNodeSelect={(node) => navigate(`/${node.id}`)}
/>
```

## Variantes

Cuatro variantes visuales predefinidas:

```tsx
<Sidenav treeData={navData} variant="default" />   {/* Dark (default) */}
<Sidenav treeData={navData} variant="compact" />   {/* Slate azul-grisaceo */}
<Sidenav treeData={navData} variant="expanded" />  {/* Indigo */}
<Sidenav treeData={navData} variant="light" />     {/* Claro */}
```

## Estados de carga y error

Muestra estados visuales integrados mientras los datos estan disponibles:

```tsx
{/* Cargando desde API */}
<Sidenav treeData={[]} loading />

{/* Error al cargar */}
<Sidenav treeData={[]} error="Failed to load navigation" />

{/* Sin datos */}
<Sidenav treeData={[]} />
```

## CSS Custom Properties

Aplica overrides en el elemento `.w3f-sidenav-container` o mediante una clase custom pasada por `className`:

```css
.mi-sidenav {
  --w3f-sidenav-bg: #0f172a;
  --w3f-sidenav-tree-bg: #1e293b;
  --w3f-sidenav-node-color: #cbd5e1;
  --w3f-sidenav-node-hover-bg: #334155;
  --w3f-sidenav-icon-color: #38bdf8;
  --w3f-sidenav-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}
```

```tsx
<Sidenav treeData={navData} className="mi-sidenav" />
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-sidenav-max-w` | `320px` | Ancho maximo del contenedor |
| `--w3f-sidenav-bg` | `#11121a` | Color de fondo principal |
| `--w3f-sidenav-radius` | `var(--w3f-radius-xl)` | Border radius del contenedor |
| `--w3f-sidenav-shadow` | `var(--w3f-shadow-lg)` | Sombra del contenedor |
| `--w3f-sidenav-font` | System font stack | Fuente tipografica |
| `--w3f-sidenav-tree-bg` | `#1a1b26` | Fondo del area del arbol |
| `--w3f-sidenav-tree-pad` | `0.5rem` | Padding del area del arbol |
| `--w3f-sidenav-node-color` | `#e6e6ef` | Color del texto de nodos |
| `--w3f-sidenav-node-font` | `0.9rem` | Tamano de fuente de nodos |
| `--w3f-sidenav-node-pad` | `0.5rem 0.75rem` | Padding de cada nodo |
| `--w3f-sidenav-node-radius` | `var(--w3f-radius-lg)` | Border radius de nodos |
| `--w3f-sidenav-node-hover-bg` | `#222533` | Fondo de nodo en hover |
| `--w3f-sidenav-icon-color` | `#5e63ff` | Color de los iconos |
| `--w3f-sidenav-folder-color` | `#5e63ff` | Color de iconos de carpeta |
| `--w3f-sidenav-file-color` | `#e6e6ef` | Color de iconos de archivo |
| `--w3f-sidenav-toggle-color` | `#b0b3c1` | Color del toggle de expansion |
| `--w3f-sidenav-sub-border` | `#42434a` | Borde del grupo anidado |
| `--w3f-sidenav-counter-color` | `#b0b3c1` | Color del contador de hijos |
| `--w3f-sidenav-ctrl-bg` | `#11121a` | Fondo del panel de controles |
| `--w3f-sidenav-ctrl-border` | `#42434a` | Borde del panel de controles |
| `--w3f-sidenav-ctrl-pad` | `1rem` | Padding del panel de controles |
| `--w3f-sidenav-btn-size` | `36px` | Tamano de botones de control |
| `--w3f-sidenav-btn-bg` | `#222533` | Fondo de botones de control |
| `--w3f-sidenav-btn-color` | `#e6e6ef` | Color de botones de control |
| `--w3f-sidenav-btn-border` | `#42434a` | Borde de botones de control |
| `--w3f-sidenav-btn-hover-bg` | `#42434a` | Fondo de botones en hover |
| `--w3f-sidenav-btn-icon-size` | `20px` | Tamano de icono en botones |
| `--w3f-sidenav-scroll-max-h` | `calc(100vh - 200px)` | Altura maxima con scroll |
| `--w3f-sidenav-scroll-thumb` | `#42434a` | Color del thumb del scrollbar |
| `--w3f-sidenav-scroll-track` | `#1a1b26` | Color del track del scrollbar |
| `--w3f-sidenav-scroll-thumb-hover` | `#5e63ff` | Color del thumb en hover |
| `--w3f-sidenav-alert-gap` | `0.75rem` | Gap del estado de alerta |
| `--w3f-sidenav-alert-pad` | `1rem` | Padding del estado de alerta |
| `--w3f-sidenav-alert-loading-bg` | `rgba(6,182,212,0.1)` | Fondo del estado loading |
| `--w3f-sidenav-alert-loading-color` | `var(--w3f-info)` | Color del texto loading |
| `--w3f-sidenav-alert-error-bg` | `rgba(239,68,68,0.1)` | Fondo del estado error |
| `--w3f-sidenav-alert-error-color` | `var(--w3f-danger)` | Color del texto error |

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `treeData` | `TreeNodeData[]` | — | Array de nodos del arbol de navegacion |
| `onNodeSelect` | `(node: TreeNodeData) => void` | — | Callback al seleccionar un nodo |
| `loading` | `boolean` | `false` | Muestra estado de carga |
| `error` | `string \| null` | `null` | Muestra mensaje de error |
| `variant` | `'default' \| 'compact' \| 'expanded' \| 'light'` | `'default'` | Variante visual predefinida |
| `className` | `string` | `''` | Clases CSS adicionales para theming |

### TreeNodeData

| Campo | Tipo | Descripcion |
|---|---|---|
| `id` | `string \| number` | Identificador unico del nodo |
| `name` | `string` | Texto visible del nodo |
| `icon` | `string` | Nombre del icono (ej. `'home'`, `'settings'`) |
| `iconId` | `string` | ID alternativo de icono |
| `type` | `'folder' \| 'file'` | Tipo visual del nodo |
| `children` | `TreeNodeData[]` | Sub-nodos (genera grupo colapsable) |
| `[key]` | `unknown` | Campos adicionales accesibles en `onNodeSelect` |

## API

### Entrada de datos

| Canal | Prop | Descripcion |
|---|---|---|
| Datos | `treeData` | Array de nodos. La jerarquia se define via `children`. Profundidad ilimitada |
| Estado | `loading` / `error` | Reemplaza el arbol por un estado visual informativo |
| Apariencia | `variant` / `className` | Variante predefinida o clase custom para CSS vars |

### Salida de datos

| Evento | Firma | Cuando se dispara |
|---|---|---|
| `onNodeSelect` | `(node: TreeNodeData) => void` | Al hacer clic en un nodo del arbol. Recibe el objeto completo del nodo incluyendo campos custom |

### Arquitectura interna

El Sidenav es un wrapper sobre los componentes `Tree` y `TreeProvider`:

```
Sidenav
  └── TreeProvider (context: data + onNodeSelect)
        └── Tree (renderiza el arbol de nodos)
```

El componente maneja los estados de guard (loading, error, sin datos) antes de renderizar el arbol. La logica de expansion/colapso de nodos esta en `TreeProvider`.

### Patron de uso recomendado

```tsx
// 1. Navegacion de aplicacion con router
<Sidenav
  treeData={navItems}
  onNodeSelect={(node) => navigate(`/${node.id}`)}
  variant="default"
/>

// 2. Carga asincrona desde API
const { data, isLoading, error } = useNavigation();

<Sidenav
  treeData={data ?? []}
  loading={isLoading}
  error={error?.message ?? null}
  onNodeSelect={handleNodeSelect}
/>

// 3. Con tema custom
<Sidenav
  treeData={navData}
  className="sidebar-brand"
  onNodeSelect={handleSelect}
/>
```

## Estructura de archivos

```
Sidenav/
  Sidenav.tsx          Componente principal con guard states (loading/error)
  Sidenav.types.ts     SidenavProps, SidenavVariant, TreeNodeData
  Sidenav.constants.ts SIDENAV_DEFAULTS, SIDENAV_CLASSES
  Sidenav.utils.ts     buildSidenavContainerClasses
  README.md            Esta documentacion
```

CSS: `src/w3fussion/SURFACES/_sidenav.css`
