import type React from 'react';
/** Dirección de ordenamiento */
export type SortDirection = 'asc' | 'desc';
/** Estado de ordenamiento */
export interface SortState {
    key: string | null;
    direction: SortDirection | null;
}
/** Consulta de la tabla en modo manual (datos paginados/ordenados/filtrados en el servidor) */
export interface TableQuery {
    /** Página pedida (empieza en 1) */
    page: number;
    /** Filas por página */
    pageSize: number;
    /** Columna de orden (null = sin orden) */
    sortKey: string | null;
    /** Dirección de orden (null = sin orden) */
    sortDirection: SortDirection | null;
    /** Texto de búsqueda global (sin espacios al borde) */
    filter: string;
}
/** Variantes visuales de la tabla */
export type TableVariant = 'default' | 'striped' | 'bordered';
/** Tamaños de la tabla */
export type TableSize = 'sm' | 'md' | 'lg';
/** Colores disponibles para la tabla */
export type TableColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'gray';
/** Definición de columna */
export interface TableColumn<T> {
    /** Clave del campo en el objeto de datos */
    accessorKey: keyof T & string;
    /** Texto del encabezado de la columna */
    header: string;
    /** Si la columna es ordenable */
    sortable?: boolean;
    /** Función de renderizado personalizado para la celda */
    cell?: (row: T) => React.ReactNode;
}
/** Props del componente Table */
export interface TableProps<T extends Record<string, unknown>> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
    /** Array de datos a mostrar */
    data: T[];
    /** Definición de columnas */
    columns: TableColumn<T>[];
    /** Habilitar sorting al hacer click en headers */
    enableSorting?: boolean;
    /** Habilitar filtro global */
    enableFiltering?: boolean;
    /** Habilitar paginación */
    enablePagination?: boolean;
    /** Habilitar resize de columnas */
    enableColumnResize?: boolean;
    /** Habilitar reordenamiento de columnas */
    enableColumnReorder?: boolean;
    /** Altura máxima del área de scroll */
    maxHeight?: string | number;
    /** Tamaño de página inicial */
    pageSize?: number;
    /** Variante visual de la tabla */
    variant?: TableVariant;
    /** Tamaño de la tabla */
    size?: TableSize;
    /** Color de la tabla */
    color?: TableColor;
    /** Clases CSS adicionales */
    className?: string;
    /** Props adicionales para Pagination */
    paginationProps?: Record<string, unknown>;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
    /** Callback al hacer click en una fila. Recibe el row y su índice en el array paginado/filtrado. */
    onRowClick?: (row: T, index: number) => void;
    /** Clave del campo a usar como identificador de fila seleccionada (para resaltado visual). */
    selectedRowKey?: string;
    /** Valor del campo `selectedRowKey` que corresponde a la fila actualmente seleccionada. */
    selectedRowValue?: unknown;
    /**
     * Modo manual: `data` ya es la página visible (el servidor filtra, ordena y pagina).
     * La tabla no transforma `data`: muestra el total con `rowCount` y avisa cada cambio con `onQueryChange`.
     */
    manual?: boolean;
    /** Total de filas (modo manual). Por defecto, `data.length`. */
    rowCount?: number;
    /** Modo manual: se llama al cambiar página, filas por página, orden o búsqueda (la búsqueda, con retardo). */
    onQueryChange?: (query: TableQuery) => void;
}
/** Borde de drop para reordenamiento */
export interface DropEdge {
    x: number;
    top: number;
    height: number;
    beforeKey?: string;
    afterKey?: string;
}
/** Estado de drag para reordenamiento */
export interface DragState {
    columnKey: string;
    sourceEl: HTMLElement;
    dropEdge?: DropEdge | null;
}
//# sourceMappingURL=Table.types.d.ts.map