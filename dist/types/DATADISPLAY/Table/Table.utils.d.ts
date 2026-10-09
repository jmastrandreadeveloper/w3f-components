import type { TableVariant, TableSize, TableColor, TableNumberFormat } from './Table.types';
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
//# sourceMappingURL=Table.utils.d.ts.map