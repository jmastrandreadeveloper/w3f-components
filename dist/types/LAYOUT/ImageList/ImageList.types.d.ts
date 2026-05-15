import type React from 'react';
export interface ImageListItem {
    id: string | number;
    src: string;
    title?: string;
    /** Solo para variant 'quilted' */
    cols?: number;
    /** Solo para variant 'quilted' */
    rows?: number;
}
export type ImageListVariant = 'standard' | 'quilted';
export interface ImageListProps {
    items: ImageListItem[];
    variant?: ImageListVariant;
    cols?: number;
    gap?: string;
    rowHeight?: number | string;
    className?: string;
    style?: React.CSSProperties;
}
export interface ImageCardProps {
    item: ImageListItem;
    height?: number | string;
}
//# sourceMappingURL=ImageList.types.d.ts.map