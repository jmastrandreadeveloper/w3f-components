import type React from 'react';
export type PaginationVariant = 'text' | 'outlined' | 'contained';
export type PaginationShape = 'rounded' | 'circular';
export type PaginationSize = 'sm' | 'md' | 'lg';
export type PaginationColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
export type PageItem = number | 'ellipsis-left' | 'ellipsis-right';
export interface PaginationProps {
    count?: number;
    page?: number;
    defaultPage?: number;
    onChange?: (e: React.MouseEvent<HTMLButtonElement>, page: number) => void;
    variant?: PaginationVariant;
    shape?: PaginationShape;
    size?: PaginationSize;
    color?: PaginationColor;
    disabled?: boolean;
    siblingCount?: number;
    boundaryCount?: number;
    showFirstButton?: boolean;
    showLastButton?: boolean;
    hideNextButton?: boolean;
    hidePrevButton?: boolean;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
    className?: string;
}
//# sourceMappingURL=Pagination.types.d.ts.map