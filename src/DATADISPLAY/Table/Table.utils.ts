import type { TableVariant, TableSize, TableColor } from './Table.types';
import { TABLE_COLORS, TABLE_SIZES, TABLE_VARIANTS } from './Table.constants';

/**
 * Construye las clases CSS del contenedor de la tabla.
 */
export const buildContainerClasses = (className?: string, unstyled?: boolean): string => {
    return ['w3f-table-container', unstyled && 'w3f-table--unstyled', className].filter(Boolean).join(' ');
};

/**
 * Construye las clases CSS del elemento table.
 */
export const buildTableClasses = (
    size: TableSize,
    variant: TableVariant,
    color: TableColor,
    enableColumnResize: boolean,
    unstyled?: boolean
): string => {
    if (unstyled) {
        return 'w3f-table w3f-table--unstyled';
    }
    return [
        'w3f-table',
        TABLE_SIZES[size] || '',
        TABLE_VARIANTS[variant] || '',
        TABLE_COLORS[color] || '',
        enableColumnResize ? 'w3f-table-fixed' : '',
    ].filter(Boolean).join(' ');
};
