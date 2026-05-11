# Tree

Componente de arbol jerarquico para explorar estructuras de archivos y carpetas. Implementa el patron Provider/Consumer: `TreeProvider` gestiona el estado del arbol (nodos expandidos, seleccion) y `Tree` renderiza la vista. Soporta anidamiento recursivo ilimitado, iconos personalizados por nodo, toolbar de expandir/colapsar todo y callback de seleccion.

## Importacion

```tsx
import { TreeProvider } from '@/components/DATADISPLAY/TreeRefactorized/TreeContext';
import { Tree } from '@/components/DATADISPLAY/TreeRefactorized/Tree';
import type { TreeNodeData } from '@/components/DATADISPLAY/TreeRefactorized/Tree.types';
```

## Uso basico

`TreeProvider` recibe los datos; `Tree` renderiza la UI. Siempre deben usarse juntos:

```tsx
const data: TreeNodeData[] = [
  {
    id: 'src',
    name: 'src',
    type: 'folder',
    children: [
      { id: 'app', name: 'App.tsx', type: 'file', iconId: 'fileCode' },
      { id: 'main', name: 'main.tsx', type: 'file', iconId: 'fileCode' },
    ],
  },
  { id: 'pkg', name: 'package.json', type: 'file' },
];

<TreeProvider data={data}>
  <Tree />
</TreeProvider>
```

## Estructura de datos

Cada nodo acepta los siguientes campos:

```tsx
interface TreeNodeData {
  id: string | number;     // identificador unico (requerido)
  name: string;            // texto mostrado (requerido)
  type?: 'folder' | 'file'; // determina icono y comportamiento de expansion
  iconId?: string;         // icono SVG personalizado (ej: 'fileCode')
  children?: TreeNodeData[]; // nodos hijos (hace al nodo expandible)
}
```

Un nodo con `children` se trata como carpeta y puede expandirse. Un nodo sin `children` es una hoja (archivo).

## Con seleccion de nodo

El callback `onNodeSelect` recibe el `TreeNodeData` del nodo clickeado:

```tsx
const [selected, setSelected] = useState<TreeNodeData | null>(null);

<TreeProvider data={data} onNodeSelect={setSelected}>
  <Tree />
</TreeProvider>

{selected && <p>Seleccionado: {selected.name}</p>}
```

## Multiples arboles independientes

Cada `TreeProvider` tiene su propio estado. Se pueden montar varios en la misma pagina sin conflictos:

```tsx
<div style={{ display: 'flex', gap: '1rem' }}>
  <TreeProvider data={frontendTree}>
    <Tree />
  </TreeProvider>

  <TreeProvider data={backendTree}>
    <Tree />
  </TreeProvider>
</div>
```

## CSS Custom Properties

Aplica overrides en un contenedor wrapping para crear temas personalizados:

```css
/* VS Code Explorer Theme */
.mi-tree-vscode {
  --w3f-tree-node-hover-bg: rgba(255, 255, 255, 0.06);
  --w3f-tree-node-radius: 4px;
  --w3f-tree-icon-color: #cccccc;
  --w3f-tree-folder-color: #e8e8e8;
  --w3f-tree-folder-weight: 500;
  --w3f-tree-file-color: #cccccc;
  --w3f-tree-selected-bg: rgba(4, 57, 94, 0.6);
  --w3f-tree-selected-color: #ffffff;
  --w3f-tree-btn-bg: #2d2d2d;
  --w3f-tree-btn-border: #444;
  --w3f-tree-btn-color: #569cd6;
}
```

```tsx
<div className="mi-tree-vscode">
  <TreeProvider data={data}>
    <Tree />
  </TreeProvider>
</div>
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-tree-node-gap` | `space-2` | Espacio entre icono y texto del nodo |
| `--w3f-tree-node-padding-v` | `space-2` | Padding vertical del nodo |
| `--w3f-tree-node-padding-h` | `space-3` | Padding horizontal del nodo |
| `--w3f-tree-node-radius` | `radius-lg` | Border radius del nodo |
| `--w3f-tree-node-hover-bg` | `gray-100` | Fondo del nodo en hover |
| `--w3f-tree-node-hover-shift` | `2px` | Desplazamiento horizontal en hover |
| `--w3f-tree-node-transition` | `bg 200ms, transform 150ms` | Transicion del nodo |
| `--w3f-tree-icon-color` | `gray-500` | Color de los iconos SVG |
| `--w3f-tree-toggle-size` | `space-4` | Tamano del icono toggle (chevron) |
| `--w3f-tree-toggle-color` | `gray-400` | Color del icono toggle |
| `--w3f-tree-toggle-hover-color` | `gray-600` | Color del toggle en hover |
| `--w3f-tree-submenu-line-color` | `gray-200` | Color de la linea vertical de anidamiento |
| `--w3f-tree-submenu-line-width` | `2px` | Ancho de la linea vertical |
| `--w3f-tree-submenu-indent` | `space-4 + space-1` | Indentacion de subnodos |
| `--w3f-tree-submenu-padding` | `space-2` | Padding izquierdo de subnodos |
| `--w3f-tree-btn-size` | `36px` | Tamano de los botones de la toolbar |
| `--w3f-tree-btn-border` | `gray-300` | Borde de los botones de la toolbar |
| `--w3f-tree-btn-bg` | `surface` | Fondo de los botones de la toolbar |
| `--w3f-tree-btn-color` | `primary` | Color de los botones de la toolbar |
| `--w3f-tree-btn-hover-bg` | `primary-100` | Fondo hover de los botones |
| `--w3f-tree-btn-icon-size` | `20px` | Tamano de los iconos en los botones |
| `--w3f-tree-folder-color` | `gray-800` | Color del texto de carpetas |
| `--w3f-tree-folder-weight` | `600` | Peso de fuente de carpetas |
| `--w3f-tree-file-color` | `gray-700` | Color del texto de archivos |
| `--w3f-tree-file-weight` | `400` | Peso de fuente de archivos |
| `--w3f-tree-selected-bg` | `primary-100` | Fondo del nodo seleccionado |
| `--w3f-tree-selected-color` | `primary-700` | Color de texto del nodo seleccionado |
| `--w3f-tree-disabled-opacity` | `0.5` | Opacidad de nodos deshabilitados |

## Props

### TreeProvider

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `data` | `TreeNodeData[]` | — | Array de nodos raiz (requerido) |
| `onNodeSelect` | `(node: TreeNodeData) => void` | — | Callback al hacer click en un nodo |
| `children` | `ReactNode` | — | Debe incluir `<Tree />` |

### Tree

El componente `Tree` no acepta props. Toda la configuracion se pasa a `TreeProvider`.

### TreeNodeData

| Campo | Tipo | Requerido | Descripcion |
|---|---|---|---|
| `id` | `string \| number` | Si | Identificador unico del nodo |
| `name` | `string` | Si | Texto a mostrar |
| `type` | `'folder' \| 'file'` | No | Determina el icono y si es expandible |
| `iconId` | `string` | No | Icono SVG del mapa de iconos (`'fileCode'`, etc.) |
| `children` | `TreeNodeData[]` | No | Nodos hijos. Su presencia hace al nodo expandible |

## API

### Entrada de datos

El arbol acepta datos exclusivamente via `TreeProvider`:

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Datos del arbol | `data` | `TreeNodeData[]` | Estructura jerarquica recursiva. Profundidad ilimitada |
| Callback de seleccion | `onNodeSelect` | `(node: TreeNodeData) => void` | Permite al padre reaccionar a clicks en nodos |

**Resolucion del icono de un nodo:**
```
iconId map  →  type='folder' (icono carpeta)  →  type='file' (icono archivo)  →  icono generico
```

### Salida de datos

El Tree emite un unico evento hacia el exterior:

| Evento | Firma | Cuando se dispara |
|---|---|---|
| `onNodeSelect` | `(node: TreeNodeData) => void` | Click en cualquier nodo (archivo o carpeta) |

La expansion/colapso es estado **interno** del Provider y no se propaga al exterior.

### Comunicacion con otros componentes

#### TreeContext (interno)

`TreeProvider` expone un contexto interno (`TreeContextValue`) consumido por `Tree`, `TreeNode` y `TreeControls`:

```tsx
interface TreeContextValue {
  data: TreeNodeData[];
  expandedNodes: Set<string | number>;
  toggleNode: (nodeId: string | number) => void;
  handleToggleAll: () => void;     // expande o colapsa todo
  handleNodeClick: (node: TreeNodeData) => void;
  isExpanded: boolean;             // true si todos los nodos estan expandidos
  totalNodes: number;
  isValid: boolean;
}
```

`useTreeContext()` lanza un error si se usa fuera de un `TreeProvider`.

#### Independiente (sin Form ni contexto externo)

El arbol no requiere ningun contexto externo. `TreeProvider` es su propio Provider.

### Accesibilidad

| Elemento | Comportamiento |
|---|---|
| Nodos carpeta | Click alterna expansion. Icono chevron indica estado |
| Toolbar | Botones "expandir todo" / "colapsar todo" con iconos SVG |
| Estado invalido | Si `data` es vacio o invalido, muestra un aviso de advertencia accesible |

### Patron de uso recomendado

```tsx
// 1. Explorador de archivos basico
<TreeProvider data={fileSystem}>
  <Tree />
</TreeProvider>

// 2. Con seleccion y reaccion a nodos
const [activeFile, setActiveFile] = useState<TreeNodeData | null>(null);

<TreeProvider data={projectFiles} onNodeSelect={setActiveFile}>
  <Tree />
</TreeProvider>
{activeFile && <FileViewer path={activeFile.id} />}

// 3. Estructura de datos plana anidada dinamicamente
function buildTree(items: Item[]): TreeNodeData[] {
  return items.map(item => ({
    id: item.id,
    name: item.label,
    type: item.hasChildren ? 'folder' : 'file',
    children: item.hasChildren ? buildTree(item.children) : undefined,
  }));
}

<TreeProvider data={buildTree(apiData)}>
  <Tree />
</TreeProvider>
```

## Estructura de archivos

```
TreeRefactorized/
  Tree.tsx             Componente raiz — renderiza TreeControls + lista de TreeNode
  TreeNode.tsx         Nodo individual recursivo con toggle de expansion
  TreeControls.tsx     Toolbar con botones expandir/colapsar todo
  TreeContext.tsx      TreeProvider + useTreeContext hook
  Tree.types.ts        Interfaces TypeScript (TreeNodeData, TreeProviderProps, etc.)
  Tree.constants.tsx   Mapa de iconos SVG por iconId
  Tree.hooks.ts        Hooks internos del arbol
  Tree.utils.ts        countNodes(), collectAllExpandableNodeIds()
  README.md            Esta documentacion
```

CSS: `src/w3fussion/DATADISPLAY/_tree.css`
