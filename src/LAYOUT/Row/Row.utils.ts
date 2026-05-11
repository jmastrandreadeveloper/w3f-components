import { ROW_CLASSES, COL_CLASSES } from './Row.constants';

/**
 * Construye las clases CSS del Row.
 */
export function buildRowClasses(className?: string): string {
    return [ROW_CLASSES.base, className].filter(Boolean).join(' ');
}

/**
 * Construye las clases CSS del Col.
 */
export function buildColClasses({
    col,
    sm,
    md,
    lg,
    className,
}: {
    col?: number;
    sm?: number;
    md?: number;
    lg?: number;
    className?: string;
}): string {
    const classes: string[] = [COL_CLASSES.base];

    if (col) classes.push(`w3f-col-${col}`);
    if (sm) classes.push(`w3f-sm:col-${sm}`);
    if (md) classes.push(`w3f-md:col-${md}`);
    if (lg) classes.push(`w3f-lg:col-${lg}`);
    if (className) classes.push(className);

    return classes.join(' ');
}
