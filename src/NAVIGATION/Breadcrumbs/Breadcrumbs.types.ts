import type React from 'react';

// ─── Tipos de tamaño y color ────────────────────────────────────────────────
export type BreadcrumbSize = 'sm' | 'md' | 'lg';
export type BreadcrumbVariant = 'solid' | 'outlined' | 'ghost' | 'soft';
export type BreadcrumbColor =
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info';

// ─── Props de BreadcrumbItem ────────────────────────────────────────────────
export interface BreadcrumbItemProps {
    href?: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    active?: boolean;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    className?: string;
}

// ─── Props de Breadcrumbs ───────────────────────────────────────────────────
export interface BreadcrumbsProps {
    children?: React.ReactNode;
    separator?: React.ReactNode;
    maxItems?: number;
    itemsBeforeCollapse?: number;
    itemsAfterCollapse?: number;
    expandText?: string;
    color?: BreadcrumbColor;
    size?: BreadcrumbSize;
    variant?: BreadcrumbVariant;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
    className?: string;
}
