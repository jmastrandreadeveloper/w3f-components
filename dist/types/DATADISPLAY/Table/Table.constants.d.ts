import type { TableColor, TableSize, TableVariant } from './Table.types';
export declare const TABLE_DEFAULTS: {
    readonly enableSorting: true;
    readonly enableFiltering: true;
    readonly enablePagination: true;
    readonly enableColumnResize: false;
    readonly enableColumnReorder: false;
    readonly pageSize: 10;
    readonly variant: "default";
    readonly size: "md";
    readonly color: "default";
    readonly className: "";
    readonly unstyled: false;
    readonly manual: false;
};
/** Modo manual: espera (ms) después de la última tecla antes de avisar la búsqueda */
export declare const FILTER_DEBOUNCE_MS = 300;
/** Mapa de clases de color */
export declare const TABLE_COLORS: Record<TableColor, string>;
/** Mapa de clases de tamaño */
export declare const TABLE_SIZES: Record<TableSize, string>;
/** Mapa de clases de variante */
export declare const TABLE_VARIANTS: Record<TableVariant, string>;
/** Opciones de tamaño de página */
export declare const PAGE_SIZE_OPTIONS: number[];
/** Ancho mínimo de columna en px */
export declare const MIN_COLUMN_WIDTH = 50;
/** Zona muerta de drag en px */
export declare const DRAG_DEAD_ZONE = 5;
//# sourceMappingURL=Table.constants.d.ts.map