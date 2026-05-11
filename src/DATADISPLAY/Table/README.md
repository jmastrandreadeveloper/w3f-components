# Table

Tabla de datos avanzada y generica. Soporta sorting, filtrado global, paginacion, resize de columnas y reordenamiento por arrastre. Usa genericos TypeScript (`T extends Record<string, unknown>`) para tipado seguro en cualquier estructura de datos. El componente es un `forwardRef` que expone la referencia al `<div>` contenedor.

## Importacion

```tsx
import Table from '@/components/DATADISPLAY/Table/Table';
import type { TableColumn } from '@/components/DATADISPLAY/Table/Table.types';
```

## Uso basico

Define las columnas con `accessorKey` (clave del objeto) y `header` (texto del encabezado):

```tsx
interface UserRow {
  id: number;
  name: string;
  email: string;
  role: string;
  [key: string]: unknown;
}

const columns: TableColumn<UserRow>[] = [
  { accessorKey: 'name', header: 'Name', sortable: true },
  { accessorKey: 'email', header: 'Email', sortable: true },
  { accessorKey: 'role', header: 'Role', sortable: true },
];

const data: UserRow[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'Editor' },
];

<Table data={data} columns={columns} />
```

## Variantes visuales

Tres variantes visuales disponibles:

```tsx
<Table data={data} columns={columns} variant="default" />
<Table data={data} columns={columns} variant="striped" />
<Table data={data} columns={columns} variant="bordered" />
```

## Tamanos

```tsx
<Table data={data} columns={columns} size="sm" />
<Table data={data} columns={columns} size="md" />  {/* default */}
<Table data={data} columns={columns} size="lg" />
```

## Colores de encabezado

Aplica un color de acento al encabezado de la tabla:

```tsx
<Table data={data} columns={columns} color="primary" />
<Table data={data} columns={columns} color="success" />
<Table data={data} columns={columns} color="danger" />
```

Colores disponibles: `default` · `primary` · `secondary` · `success` · `warning` · `danger` · `info` · `gray`

## Celda con render personalizado

La prop `cell` de una columna acepta una funcion `(row: T) => ReactNode` para renderizar cualquier componente:

```tsx
import Badge from '@/components/DATADISPLAY/Badge/Badge';
import Button from '@/components/INPUTS/Button/Button';

const columns: TableColumn<UserRow>[] = [
  { accessorKey: 'name', header: 'Name', sortable: true },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (row) => (
      <Badge color={row.status === 'Active' ? 'success' : 'danger'} size="sm">
        {row.status}
      </Badge>
    ),
  },
  {
    accessorKey: 'id',
    header: 'Actions',
    cell: (row) => (
      <Button variant="outlined" size="sm" onClick={() => editRow(row)}>
        Edit
      </Button>
    ),
  },
];
```

Nota: las columnas con `cell` personalizado no son ordenables automaticamente (el sorting trabaja sobre valores primitivos).

## Paginacion

```tsx
<Table
  data={largeDataset}
  columns={columns}
  enablePagination
  pageSize={10}
/>
```

Las opciones de paginas por fila disponibles son: 5, 10, 20, 50.

## Scroll con altura maxima

Para tablas con muchas filas, define una altura maxima y el body se vuelve scrollable:

```tsx
<Table
  data={data}
  columns={columns}
  maxHeight="400px"
  enablePagination={false}
/>
```

## Resize de columnas

Activa controladores en el borde derecho de cada encabezado para cambiar el ancho arrastrando:

```tsx
<Table
  data={data}
  columns={columns}
  enableColumnResize
/>
```

## Reordenamiento de columnas

Permite arrastrar los encabezados para cambiar el orden de las columnas. Se muestra un indicador de posicion al soltar:

```tsx
<Table
  data={data}
  columns={columns}
  enableColumnReorder
/>
```

## Todas las funciones combinadas

```tsx
<Table
  data={data}
  columns={columns}
  variant="striped"
  size="md"
  enableSorting
  enableFiltering
  enablePagination
  pageSize={10}
  enableColumnResize
  enableColumnReorder
  maxHeight="500px"
/>
```

## CSS Custom Properties

El componente es 100% configurable via CSS custom properties. Aplica overrides en una clase wrapper:

```css
.mi-tabla-dark {
  --w3f-table-bg: #1e1e2e;
  --w3f-table-color: #cdd6f4;
  --w3f-table-header-bg: #11111b;
  --w3f-table-header-color: #bac2de;
  --w3f-table-border-color: #313244;
  --w3f-table-row-hover-bg: #313244;
  --w3f-table-row-stripe-bg: #181825;
  --w3f-table-radius: 8px;
  --w3f-table-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}
```

```tsx
<Table data={data} columns={columns} className="mi-tabla-dark" />
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-table-radius` | `radius-lg` | Border radius del contenedor |
| `--w3f-table-bg` | `surface` | Fondo de la tabla |
| `--w3f-table-border-color` | `gray-200` | Borde exterior |
| `--w3f-table-shadow` | — | Box shadow del contenedor |
| `--w3f-table-thead-bg` | `gray-50` | Fondo del encabezado |
| `--w3f-table-th-color` | `gray-600` | Color del texto del encabezado |
| `--w3f-table-th-border-color` | `gray-200` | Borde inferior del encabezado |
| `--w3f-table-th-font-size` | `text-xs` | Tamano de fuente del encabezado |
| `--w3f-table-th-padding-v` | `space-3` | Padding vertical de celdas `<th>` |
| `--w3f-table-th-padding-h` | `space-4` | Padding horizontal de celdas `<th>` |
| `--w3f-table-th-hover-bg` | `gray-100` | Fondo hover del encabezado |
| `--w3f-table-th-hover-color` | `gray-900` | Color hover del encabezado |
| `--w3f-table-sort-icon-color` | `gray-400` | Color del icono de sorting inactivo |
| `--w3f-table-sort-active-color` | `primary` | Color del icono de sorting activo |
| `--w3f-table-font-size` | `text-sm` | Tamano de fuente del cuerpo |
| `--w3f-table-color` | `on-surface` | Color del texto del cuerpo |
| `--w3f-table-td-padding-v` | `space-3` | Padding vertical de celdas `<td>` |
| `--w3f-table-td-padding-h` | `space-4` | Padding horizontal de celdas `<td>` |
| `--w3f-table-td-border-color` | `gray-100` | Borde inferior de filas |
| `--w3f-table-row-hover-bg` | `gray-50` | Fondo de fila en hover |
| `--w3f-table-striped-bg` | `gray-50` | Fondo de filas alternas (striped) |
| `--w3f-table-striped-hover-bg` | `gray-100` | Fondo hover en filas alternas |
| `--w3f-table-bordered-color` | `gray-200` | Borde de cada celda (bordered) |
| `--w3f-table-empty-color` | `gray-400` | Color del mensaje sin resultados |
| `--w3f-table-toolbar-border-color` | `gray-200` | Borde de la barra de herramientas |
| `--w3f-table-toolbar-padding-v` | `space-3` | Padding vertical de la toolbar |
| `--w3f-table-toolbar-padding-h` | `space-4` | Padding horizontal de la toolbar |
| `--w3f-table-filter-bg` | `surface` | Fondo del input de filtrado |
| `--w3f-table-filter-color` | `on-surface` | Color del texto del filtro |
| `--w3f-table-filter-border` | `gray-300` | Borde del input de filtro |
| `--w3f-table-filter-focus-border` | `primary` | Borde del input de filtro en foco |
| `--w3f-table-filter-focus-shadow` | ring primario | Sombra del input de filtro en foco |
| `--w3f-table-pgn-border-color` | `gray-200` | Borde de la zona de paginacion |
| `--w3f-table-pgn-color` | `gray-600` | Color de texto de paginacion |
| `--w3f-table-pgn-btn-bg` | `surface` | Fondo de botones de paginacion |
| `--w3f-table-pgn-btn-color` | `gray-700` | Color de botones de paginacion |
| `--w3f-table-pgn-btn-border` | `gray-300` | Borde de botones de paginacion |
| `--w3f-table-pgn-btn-hover-bg` | `gray-50` | Fondo hover de botones paginacion |
| `--w3f-table-pgn-select-bg` | `surface` | Fondo del selector de filas |
| `--w3f-table-pgn-select-color` | `on-surface` | Color del selector de filas |
| `--w3f-table-scroll-track` | `gray-100` | Track del scrollbar |
| `--w3f-table-scroll-thumb` | `gray-300` | Thumb del scrollbar |
| `--w3f-table-scroll-thumb-hover` | `gray-400` | Thumb hover del scrollbar |
| `--w3f-table-resize-color` | `primary` | Color del handle de resize |
| `--w3f-table-drag-ghost-bg` | `surface` | Fondo del ghost de drag |
| `--w3f-table-drag-ghost-border` | `primary` | Borde del ghost de drag |
| `--w3f-table-drop-indicator-color` | `primary` | Color del indicador de drop |

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `data` | `T[]` | `[]` | Array de datos a mostrar |
| `columns` | `TableColumn<T>[]` | `[]` | Definicion de columnas |
| `variant` | `'default' \| 'striped' \| 'bordered'` | `'default'` | Variante visual |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Densidad de la tabla |
| `color` | `TableColor` | `'default'` | Color del encabezado |
| `enableSorting` | `boolean` | `true` | Habilitar sorting por columna |
| `enableFiltering` | `boolean` | `true` | Habilitar filtro global de busqueda |
| `enablePagination` | `boolean` | `true` | Habilitar paginacion |
| `enableColumnResize` | `boolean` | `false` | Habilitar resize de columnas |
| `enableColumnReorder` | `boolean` | `false` | Habilitar drag & drop de columnas |
| `pageSize` | `number` | `10` | Filas por pagina inicial |
| `maxHeight` | `string \| number` | — | Altura maxima del area de scroll |
| `paginationProps` | `Record<string, unknown>` | `{}` | Props extras para el componente Pagination |
| `className` | `string` | `''` | Clases CSS adicionales |
| `ref` | `React.Ref<HTMLDivElement>` | — | Ref al contenedor externo |

### TableColumn

| Campo | Tipo | Descripcion |
|---|---|---|
| `accessorKey` | `keyof T & string` | Clave del campo en el objeto de datos |
| `header` | `string` | Texto del encabezado de la columna |
| `sortable` | `boolean` | Si la columna es ordenable. Default `true`. Las columnas con `cell` personalizado no aplican |
| `cell` | `(row: T) => ReactNode` | Funcion de render personalizado. Si se define, deshabilita el sorting automatico |

## API

### Entrada de datos

La tabla acepta datos por dos vias:

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Dataset | `data` | `T[]` | Array de objetos. Cada objeto debe extender `Record<string, unknown>`. La clave `id` se usa como `key` de React si existe |
| Columnas | `columns` | `TableColumn<T>[]` | Define que campos del objeto mostrar y como renderizarlos |

**Flujo interno de transformacion de datos:**
```
data[]  →  filteredData (useTableFilter)
        →  sortedData (useMemo sort)
        →  paginatedData (slice por pagina)
        →  render
```

El filtro global busca en todos los campos con `toString().toLowerCase().includes(query)`.

El sorting cicla en tres estados: inactivo → ascendente → descendente → inactivo.

### Salida de datos

La tabla es un componente de **display puro** — no emite callbacks de mutacion de datos. Las interacciones del usuario solo afectan el estado interno de presentacion:

| Estado | Descripcion |
|---|---|
| Sort | Cicla `asc` / `desc` / sin orden por columna |
| Filter | Actualiza el filtro global en tiempo real |
| Pagination | Cambia pagina activa y tamanio de pagina |
| Column resize | Actualiza anchos de columna localmente |
| Column reorder | Reordena las columnas localmente |

Para acceder a datos filtrados/ordenados desde el exterior, usa `ref` para acceder al contenedor DOM, o maneja el estado upstream pasando datos ya filtrados.

### Comunicacion con otros componentes

#### Con Pagination (interno)

La tabla integra el componente `Pagination` de forma interna en la zona inferior. Props adicionales para el paginador se pasan via `paginationProps`:

```tsx
<Table
  data={data}
  columns={columns}
  paginationProps={{ showFirstButton: true, showLastButton: true }}
/>
```

#### Independiente (sin contexto requerido)

La tabla no requiere ningun Provider. Funciona como componente autonomo en cualquier parte del arbol React.

### Accesibilidad

| Atributo | Valor | Condicion |
|---|---|---|
| `aria-sort` | `"ascending"` / `"descending"` | En `<th>` cuando la columna esta ordenada |
| `aria-label` | `"Filtrar tabla"` | En el input de filtrado |
| `aria-label` | `"Filas por pagina"` | En el select de tamano de pagina |
| `role` | Nativo `<table>` | Estructura semantica HTML nativa |

### Patron de uso recomendado

```tsx
// 1. Tabla basica con datos simples
<Table data={users} columns={userColumns} />

// 2. Tabla completa con todas las funciones
<Table
  data={users}
  columns={userColumns}
  variant="striped"
  enableSorting
  enableFiltering
  enablePagination
  pageSize={25}
/>

// 3. Tabla larga con scroll
<Table
  data={bigDataset}
  columns={columns}
  maxHeight="500px"
  enableColumnResize
  enablePagination={false}
  size="sm"
  variant="striped"
/>

// 4. Tabla con celdas personalizadas
const columns: TableColumn<Order>[] = [
  { accessorKey: 'id', header: '#', sortable: true },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: (row) => <StatusBadge status={row.status} />,
  },
  {
    accessorKey: 'id',
    header: 'Acciones',
    cell: (row) => <ActionMenu row={row} />,
  },
];
```

## Estructura de archivos

```
Table/
  Table.tsx            Componente principal (forwardRef)
  Table.types.ts       Interfaces TypeScript (TableProps, TableColumn, SortState, etc.)
  Table.constants.ts   Mapas de clases CSS, PAGE_SIZE_OPTIONS, MIN_COLUMN_WIDTH
  Table.hooks.ts       useTableSort, useTableFilter, useTablePagination, useColumnResize, useColumnReorder
  Table.utils.ts       buildContainerClasses(), buildTableClasses()
  README.md            Esta documentacion
```

CSS: `src/w3fussion/DATADISPLAY/_table.css`
