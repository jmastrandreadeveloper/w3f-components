import { CELL_CLASSES } from './Cell.constants';

/**
 * Construye la cadena de clases CSS para el componente Cell.
 */
export const buildCellClassNames = ({
    content,
    center,
    vCenter,
    className,
}: {
    content?: boolean;
    center?: boolean;
    vCenter?: boolean;
    className?: string;
}): string => {
    const classes: string[] = [CELL_CLASSES.base];

    if (content) classes.push(CELL_CLASSES.content);
    if (center) classes.push(CELL_CLASSES.center);
    if (vCenter && !center) classes.push(CELL_CLASSES.vCenter);
    if (className) classes.push(className);

    return classes.filter(Boolean).join(' ');
};

/**
 * Construye la cadena de clases CSS para el componente CellRow.
 */
export const buildCellRowClassNames = ({ className }: { className?: string }): string => {
    return className || '';
};
