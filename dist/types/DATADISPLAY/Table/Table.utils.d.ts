import type { TableVariant, TableSize, TableColor, TableNumberFormat, TableHeaderGroupCell } from './Table.types';
/**
 * Construye las clases CSS del contenedor de la tabla.
 */
export declare const buildContainerClasses: (className?: string, unstyled?: boolean) => string;
/**
 * Construye las clases CSS del elemento table.
 */
export declare const buildTableClasses: (size: TableSize, variant: TableVariant, color: TableColor, enableColumnResize: boolean, unstyled?: boolean) => string;
/**
 * Texto de un número con el formato de la columna. Devuelve null si no corresponde (sin formato o
 * el valor no es un número finito): la celda muestra el valor tal cual.
 */
export declare const formatNumber: (value: unknown, format?: TableNumberFormat, decimals?: number, locale?: string) => string | null;
/**
 * 0026 X14: las filas de grupos de la cabecera (una por nivel), arriba de la de encabezados. En cada nivel se juntan
 * las columnas seguidas con el mismo camino hasta ese nivel; las que no tienen ese nivel van en celdas vacías
 * (también juntas). Sin grupos, ninguna fila.
 */
export declare const headerGroupRows: (columns: {
    accessorKey: string;
    groups?: string[];
}[]) => TableHeaderGroupCell[][];
/**
 * 0026 X14: para cada fila y cada columna combinada, cuántas filas abarca su celda: n ≥ 1 = la celda de arriba del
 * bloque (rowSpan n); 0 = tapada por la de arriba. Por jerarquía: la columna k combina solo si las anteriores también
 * son iguales. Los vacíos no se combinan.
 */
export declare const mergeSpans: (rows: Record<string, unknown>[], keys: string[]) => Record<string, number>[];
//# sourceMappingURL=Table.utils.d.ts.map