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
/** Celda sobre la que se hizo doble clic */
export interface TableCellEvent<T> {
    /** La fila completa */
    row: T;
    /** Clave de la columna (`accessorKey`) */
    column: string;
    /** Valor de la celda (`row[column]`) */
    value: unknown;
    /** Índice de la fila en la página visible */
    rowIndex: number;
}
/** Variantes visuales de la tabla */
/** 'ruled' (0022 B50): las líneas como en Word, cada grupo por su variable (--w3f-table-line-top / -bottom / -left /
 *  -right = el borde exterior, -row = entre filas, -col = entre columnas, -head = bajo el encabezado): un borde CSS
 *  completo («1px dashed #94a3b8») o none; con filas pares de otro color (--w3f-table-striped-bg). */
export type TableVariant = 'default' | 'striped' | 'bordered' | 'ruled';
/** Tamaños de la tabla */
export type TableSize = 'sm' | 'md' | 'lg';
/** Colores disponibles para la tabla */
export type TableColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'gray';
/** Formato numérico de una columna (solo cambia lo que se ve: el orden sigue siendo por el número) */
export type TableNumberFormat = 'number' | 'percent';
/**
 * Claves reservadas de una fila (0022 B1, formato condicional). Viajan con la fila, así siguen bien
 * con orden, búsqueda y paginación:
 * - `__style`: `{ columna: { cssProp: valor } }` → estilo de esa celda (p. ej. escala de color, barra).
 * - `__prefix`: `{ columna: texto }` → texto antes del valor (p. ej. el ícono del semáforo).
 */
export declare const ROW_STYLE_KEY = "__style";
export declare const ROW_PREFIX_KEY = "__prefix";
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
    /** Formato de los números de la columna: 'number' (separador de miles) o 'percent' (0.25 → 25 %) */
    format?: TableNumberFormat;
    /** Decimales del formato (por defecto 2 para 'number' y 1 para 'percent') */
    decimals?: number;
    /** Idioma del formato (por defecto 'es-AR') */
    locale?: string;
    /** Alineación horizontal de los datos de la columna (sin esto: --w3f-table-td-text-align; con `format`,
     *  --w3f-table-num-text-align, derecha por defecto) */
    align?: TableAlign;
    /** Alineación horizontal del encabezado de la columna (sin esto: --w3f-table-th-text-align) */
    headerAlign?: TableAlign;
    /** Alineación vertical de los datos de la columna (sin esto: --w3f-table-td-vertical-align) */
    verticalAlign?: TableVerticalAlign;
    /** Alineación vertical del encabezado de la columna (sin esto: --w3f-table-th-vertical-align) */
    headerVerticalAlign?: TableVerticalAlign;
    /** Línea a la izquierda / derecha de la columna (encabezado y datos): un borde CSS («1px solid #ccc») o 'hidden'
     *  para ocultarla (en tablas con bordes colapsados, 'hidden' gana a la de la columna vecina). 0022 B50 */
    lineLeft?: string;
    lineRight?: string;
    /** 0026 X14: los niveles de cabecera arriba del encabezado, del de más afuera al de más adentro (p. ej.
     *  ['ventas', '2024'] con header 'Norte'). Las columnas vecinas con el mismo nivel (y los mismos de arriba)
     *  comparten una celda con colSpan; una columna sin ese nivel deja la celda vacía. */
    groups?: string[];
    /** 0026 X14: combinar los valores repetidos de esta columna en filas seguidas (como las filas de una Tabla
     *  Dinámica con varios índices). Va por jerarquía: una columna combina solo dentro del bloque de la columna
     *  combinada anterior. Los valores vacíos no se combinan. */
    merge?: boolean;
}
/** 0026 X14: cómo se combinan los valores repetidos (columnas con `merge`): 'span' = una celda con rowSpan;
 *  'blank' = la celda queda pero vacía (con enableRowReorder, 'span' pasa a 'blank': la primera celda de cada fila es
 *  la manija para arrastrarla); 'none' = se repiten (como si ninguna columna tuviera `merge`). */
export type TableMergeMode = 'span' | 'blank' | 'none';
/** 0026 X14: una celda de una fila de grupos de la cabecera. */
export interface TableHeaderGroupCell {
    key: string;
    label: string | null;
    span: number;
}
/** Alineación horizontal de una celda */
export type TableAlign = 'left' | 'center' | 'right';
/** Alineación vertical de una celda */
export type TableVerticalAlign = 'top' | 'middle' | 'bottom';
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
    /** 0026 X17 (w3f-data-analysis): anchos iniciales por accessorKey (px); los que falten se miden. Con
     *  enableColumnResize. Cambiar el objeto vuelve a aplicarlos. */
    columnWidths?: Record<string, number>;
    /** 0026 X17: al soltar el borde de una columna, todos los anchos vigentes ({accessorKey: px}). */
    onColumnWidthsChange?: (widths: Record<string, number>) => void;
    /** 0026 X17: sin cabecera visible (una tabla de totales debajo de otra): la fila de encabezados colapsa, pero
     *  sigue fijando los anchos de las columnas. */
    hideHeader?: boolean;
    /** Habilitar reordenamiento de columnas */
    enableColumnReorder?: boolean;
    /** Altura máxima del área de scroll */
    maxHeight?: string | number;
    /** 0026 X12 (w3f-data-analysis, tablas para papel): muestra solo las filas que entran en el alto del contenedor
     *  (sin barras de scroll): mide la cabecera y la primera fila y recorta; vuelve a medir si cambia el tamaño.
     *  Sin un alto definido (el contenedor crece con el contenido) no recorta nada. */
    fitRows?: boolean;
    /** FL16: con fitRows, el aviso debajo de la tabla cuando hay filas que no entran («{n}» = cuántas). Vacío = sin
     *  aviso. Por defecto «… y {n} filas más (no entran en la tarjeta)». */
    fitMoreLabel?: string;
    /** 0022 B44: los anchos de columna (columnWidths / resize) como proporciones; la tabla ocupa el 100 % de su caja
     *  y nunca se sale de ella (tarjetas del tablero, PDF). */
    fitWidth?: boolean;
    /** 0026 X14: cómo se combinan los valores repetidos de las columnas con `merge` (por defecto 'span'). */
    mergeMode?: TableMergeMode;
    /** 0026 X14: false = sin las filas de grupos (`groups` de las columnas) arriba de los encabezados. */
    groupHeaders?: boolean;
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
    /** Nombre de la tabla para lectores de pantalla; el paginador se llama «Paginación: <nombre>» (dos tablas en
     *  la misma página no repiten nombre). */
    ariaLabel?: string;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
    /** Callback al hacer click en una fila. Recibe el row y su índice en el array paginado/filtrado. */
    onRowClick?: (row: T, index: number) => void;
    /** Callback al hacer doble clic en una celda. Recibe un solo objeto (fila, columna, valor, índice). */
    onCellDoubleClick?: (cell: TableCellEvent<T>) => void;
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
    /** Al soltar una columna arrastrada (enableColumnReorder): el orden nuevo de las accessorKey. 0022 C-M. */
    onColumnOrderChange?: (order: string[]) => void;
    /** Arrastrar una fila por su primera celda para reordenarla (0022 C-M, w3f-data-analysis: orden manual de la
     *  Tabla Dinámica). La tabla no mueve la fila sola: avisa con `onRowReorder` y la app manda los datos en el
     *  orden nuevo (en modo manual, el servidor). */
    enableRowReorder?: boolean;
    /** Al soltar una fila sobre el borde de otra. */
    onRowReorder?: (event: TableRowReorderEvent<T>) => void;
}
/** 0022 C-M: una fila soltada antes o después de otra (índices en la página visible). */
export interface TableRowReorderEvent<T> {
    fromIndex: number;
    toIndex: number;
    position: 'before' | 'after';
    row: T;
    targetRow: T;
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
/** 0022 C-M: borde de una fila donde se soltaría la arrastrada */
export interface RowDropEdge {
    y: number;
    left: number;
    width: number;
    index: number;
    position: 'before' | 'after';
}
//# sourceMappingURL=Table.types.d.ts.map