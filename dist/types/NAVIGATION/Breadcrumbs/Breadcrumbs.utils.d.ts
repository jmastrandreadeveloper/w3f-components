import type React from 'react';
import type { BreadcrumbColor, BreadcrumbSize, BreadcrumbVariant } from './Breadcrumbs.types';
import { ELLIPSIS_KEY } from './Breadcrumbs.constants';
/**
 * Construye las clases del contenedor nav de Breadcrumbs.
 */
export declare function buildBreadcrumbsClasses(size: BreadcrumbSize, color: BreadcrumbColor, className: string, unstyled?: boolean, variant?: BreadcrumbVariant): string;
/**
 * Construye las clases del item de breadcrumb.
 */
export declare function buildBreadcrumbItemClasses(active: boolean, disabled: boolean, className: string): string;
/**
 * Calcula los items visibles según maxItems y estado expandido.
 */
export declare function computeVisibleItems(items: React.ReactNode[], expanded: boolean, maxItems: number, itemsBeforeCollapse: number, itemsAfterCollapse: number): (React.ReactNode | typeof ELLIPSIS_KEY)[];
//# sourceMappingURL=Breadcrumbs.utils.d.ts.map