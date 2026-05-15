import type { PageItem, PaginationColor, PaginationShape, PaginationSize, PaginationVariant } from './Pagination.types';
/**
 * Genera un rango numérico [start, end].
 */
export declare function range(start: number, end: number): number[];
/**
 * Construye el array de items de paginación con ellipsis donde corresponde.
 */
export declare function buildPages(count: number, current: number, siblingCount: number, boundaryCount: number): PageItem[];
/**
 * Construye las clases del nav de paginación.
 */
export declare function buildPaginationClasses(variant: PaginationVariant, shape: PaginationShape, size: PaginationSize, color: PaginationColor, disabled: boolean, className: string, unstyled?: boolean): string;
/**
 * Construye las clases de un item de página.
 */
export declare function buildPageItemClasses(isActive: boolean): string;
//# sourceMappingURL=Pagination.utils.d.ts.map