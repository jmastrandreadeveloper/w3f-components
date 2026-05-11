import type { TableColor, TableSize, TableVariant } from './Table.types';

export const TABLE_DEFAULTS = {
  enableSorting: true as const,
  enableFiltering: true as const,
  enablePagination: true as const,
  enableColumnResize: false as const,
  enableColumnReorder: false as const,
  pageSize: 10 as const,
  variant: 'default' as const,
  size: 'md' as const,
  color: 'default' as const,
  className: '' as const,
  unstyled: false as const,
} as const;

/** Mapa de clases de color */
export const TABLE_COLORS: Record<TableColor, string> = {
    default: '',
    primary: 'w3f-table-color-primary',
    secondary: 'w3f-table-color-secondary',
    success: 'w3f-table-color-success',
    warning: 'w3f-table-color-warning',
    danger: 'w3f-table-color-danger',
    info: 'w3f-table-color-info',
    gray: 'w3f-table-color-gray',
};

/** Mapa de clases de tamaño */
export const TABLE_SIZES: Record<TableSize, string> = {
    sm: 'w3f-table-sm',
    md: '',
    lg: 'w3f-table-lg',
};

/** Mapa de clases de variante */
export const TABLE_VARIANTS: Record<TableVariant, string> = {
    default: '',
    striped: 'w3f-table-striped',
    bordered: 'w3f-table-bordered',
};

/** Opciones de tamaño de página */
export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

/** Ancho mínimo de columna en px */
export const MIN_COLUMN_WIDTH = 50;

/** Zona muerta de drag en px */
export const DRAG_DEAD_ZONE = 5;
