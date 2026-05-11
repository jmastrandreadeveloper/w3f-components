import type React from 'react';

// ─── ImageList item ───────────────────────────────────────────────
export interface ImageListItem {
    id: string | number;
    src: string;
    title?: string;
    /** Solo para variant 'quilted' */
    cols?: number;
    /** Solo para variant 'quilted' */
    rows?: number;
}

// ─── ImageList variant ────────────────────────────────────────────
export type ImageListVariant = 'standard' | 'quilted';

// ─── Props del componente ImageList ───────────────────────────────
export interface ImageListProps {
    items: ImageListItem[];
    variant?: ImageListVariant;
    cols?: number;
    gap?: string;
    rowHeight?: number | string;
    className?: string;
    style?: React.CSSProperties;
}

// ─── Props del componente ImageCard ───────────────────────────────
export interface ImageCardProps {
    item: ImageListItem;
    height?: number | string;
}
