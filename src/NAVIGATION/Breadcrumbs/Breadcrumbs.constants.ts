import type { BreadcrumbColor, BreadcrumbSize } from './Breadcrumbs.types';

// ─── Valores por defecto ────────────────────────────────────────────────────
export const BREADCRUMBS_DEFAULTS = {
    maxItems: 0,
    itemsBeforeCollapse: 1,
    itemsAfterCollapse: 1,
    expandText: 'Mostrar ruta',
    color: 'default' as BreadcrumbColor,
    size: 'md' as BreadcrumbSize,
    unstyled: false,
    className: '',
} as const;

export const BREADCRUMB_ITEM_DEFAULTS = {
    active: false,
    disabled: false,
    className: '',
} as const;

// ─── Tokens de clases CSS (BEM + W3Fussion) ────────────────────────────────
export const BREADCRUMBS_CLASSES = {
    nav: 'w3f-breadcrumbs',
    list: 'w3f-breadcrumbs__list',
    item: 'w3f-breadcrumbs__item',
    separator: 'w3f-breadcrumbs__separator',
    expandBtn: 'w3f-breadcrumb-expand',
    crumb: 'w3f-breadcrumb-item',
    crumbActive: 'w3f-breadcrumb-item--active',
    crumbDisabled: 'w3f-breadcrumb-item--disabled',
    crumbIcon: 'w3f-breadcrumb-item__icon',
    crumbText: 'w3f-breadcrumb-item__text',
} as const;

export const BREADCRUMBS_VARIANT_CLASSES: Record<string, string> = {
    solid: 'w3f-breadcrumbs--solid',
    outlined: 'w3f-breadcrumbs--outlined',
    ghost: 'w3f-breadcrumbs--ghost',
    soft: 'w3f-breadcrumbs--soft',
};

export const ELLIPSIS_KEY = '__ellipsis';
