import type React from 'react';
import type { BreadcrumbColor, BreadcrumbSize, BreadcrumbVariant } from './Breadcrumbs.types';
import { BREADCRUMBS_CLASSES, BREADCRUMBS_VARIANT_CLASSES, ELLIPSIS_KEY } from './Breadcrumbs.constants';

/**
 * Construye las clases del contenedor nav de Breadcrumbs.
 */
export function buildBreadcrumbsClasses(
    size: BreadcrumbSize,
    color: BreadcrumbColor,
    className: string,
    unstyled?: boolean,
    variant?: BreadcrumbVariant,
): string {
    if (unstyled) {
        return [BREADCRUMBS_CLASSES.nav, 'w3f-breadcrumbs--unstyled', className]
            .filter(Boolean)
            .join(' ');
    }
    return [
        BREADCRUMBS_CLASSES.nav,
        `w3f-breadcrumbs--${size}`,
        color !== 'default' && `w3f-breadcrumbs--${color}`,
        variant && BREADCRUMBS_VARIANT_CLASSES[variant],
        className,
    ]
        .filter(Boolean)
        .join(' ');
}

/**
 * Construye las clases del item de breadcrumb.
 */
export function buildBreadcrumbItemClasses(
    active: boolean,
    disabled: boolean,
    className: string,
): string {
    return [
        BREADCRUMBS_CLASSES.crumb,
        active && BREADCRUMBS_CLASSES.crumbActive,
        disabled && BREADCRUMBS_CLASSES.crumbDisabled,
        className,
    ]
        .filter(Boolean)
        .join(' ');
}

/**
 * Calcula los items visibles según maxItems y estado expandido.
 */
export function computeVisibleItems(
    items: React.ReactNode[],
    expanded: boolean,
    maxItems: number,
    itemsBeforeCollapse: number,
    itemsAfterCollapse: number,
): (React.ReactNode | typeof ELLIPSIS_KEY)[] {
    const shouldCollapse = maxItems > 0 && items.length > maxItems && !expanded;
    if (!shouldCollapse) return items;
    const before = items.slice(0, itemsBeforeCollapse);
    const after = items.slice(items.length - itemsAfterCollapse);
    return [...before, ELLIPSIS_KEY, ...after];
}
