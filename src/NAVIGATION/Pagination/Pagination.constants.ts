import type { PaginationColor, PaginationShape, PaginationSize, PaginationVariant } from './Pagination.types';

// ─── Valores por defecto ────────────────────────────────────────────────────
export const PAGINATION_DEFAULTS = {
    count: 1,
    defaultPage: 1,
    variant: 'text' as PaginationVariant,
    shape: 'rounded' as PaginationShape,
    size: 'md' as PaginationSize,
    color: 'primary' as PaginationColor,
    disabled: false,
    siblingCount: 1,
    boundaryCount: 1,
    showFirstButton: false,
    showLastButton: false,
    hideNextButton: false,
    hidePrevButton: false,
    unstyled: false,
    className: '',
} as const;

// ─── Tokens de clases CSS (BEM + W3Fussion) ────────────────────────────────
export const PAGINATION_CLASSES = {
    nav: 'w3f-pagination',
    list: 'w3f-pagination__list',
    item: 'w3f-pagination__item',
    nav_btn: 'w3f-pagination__nav',
    page: 'w3f-pagination__page',
    pageActive: 'w3f-pagination__page--active',
    ellipsis: 'w3f-pagination__ellipsis',
} as const;

// ─── Tamaños de iconos por size ────────────────────────────────────────────
export const PAGINATION_ICON_SIZES: Record<PaginationSize, number> = {
    sm: 16,
    md: 18,
    lg: 22,
};
