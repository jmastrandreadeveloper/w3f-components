import type { PageItem, PaginationColor, PaginationShape, PaginationSize, PaginationVariant } from './Pagination.types';
import { PAGINATION_CLASSES } from './Pagination.constants';

/**
 * Genera un rango numérico [start, end].
 */
export function range(start: number, end: number): number[] {
    const arr: number[] = [];
    for (let i = start; i <= end; i++) arr.push(i);
    return arr;
}

/**
 * Construye el array de items de paginación con ellipsis donde corresponde.
 */
export function buildPages(
    count: number,
    current: number,
    siblingCount: number,
    boundaryCount: number,
): PageItem[] {
    const totalSlots = boundaryCount * 2 + siblingCount * 2 + 3;

    if (count <= totalSlots) return range(1, count);

    const leftBound = Math.max(current - siblingCount, boundaryCount + 2);
    const rightBound = Math.min(current + siblingCount, count - boundaryCount - 1);

    const showLeftEllipsis = leftBound > boundaryCount + 2;
    const showRightEllipsis = rightBound < count - boundaryCount - 1;

    const items: PageItem[] = [];

    for (let i = 1; i <= Math.min(boundaryCount, count); i++) items.push(i);

    if (showLeftEllipsis) {
        items.push('ellipsis-left');
    } else {
        for (let i = boundaryCount + 1; i < leftBound; i++) items.push(i);
    }

    for (let i = leftBound; i <= rightBound; i++) items.push(i);

    if (showRightEllipsis) {
        items.push('ellipsis-right');
    } else {
        for (let i = rightBound + 1; i <= count - boundaryCount; i++) items.push(i);
    }

    for (
        let i = Math.max(count - boundaryCount + 1, rightBound + 1);
        i <= count;
        i++
    )
        items.push(i);

    return items;
}

/**
 * Construye las clases del nav de paginación.
 */
export function buildPaginationClasses(
    variant: PaginationVariant,
    shape: PaginationShape,
    size: PaginationSize,
    color: PaginationColor,
    disabled: boolean,
    className: string,
    unstyled?: boolean,
): string {
    if (unstyled) {
        return [PAGINATION_CLASSES.nav, 'w3f-pagination--unstyled', className]
            .filter(Boolean)
            .join(' ');
    }
    return [
        PAGINATION_CLASSES.nav,
        `w3f-pagination--${variant}`,
        `w3f-pagination--${shape}`,
        `w3f-pagination--${size}`,
        `w3f-pagination--${color}`,
        disabled && 'w3f-pagination--disabled',
        className,
    ]
        .filter(Boolean)
        .join(' ');
}

/**
 * Construye las clases de un item de página.
 */
export function buildPageItemClasses(isActive: boolean): string {
    return [
        PAGINATION_CLASSES.item,
        PAGINATION_CLASSES.page,
        isActive && PAGINATION_CLASSES.pageActive,
    ]
        .filter(Boolean)
        .join(' ');
}
