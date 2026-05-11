import { IMAGE_GALLERY_CLASSES } from './ImageGallery.constants';
import type { GalleryLayout } from './ImageGallery.types';

export function buildGalleryClasses(
    layout: GalleryLayout,
    className?: string,
    unstyled?: boolean,
): string {
    const base = IMAGE_GALLERY_CLASSES.gallery;
    if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(' ');
    const layoutClass = IMAGE_GALLERY_CLASSES[layout] || '';
    return [base, layoutClass, className].filter(Boolean).join(' ');
}

export function buildGridStyle(
    layout: GalleryLayout,
    columns: number,
    gap: number,
): React.CSSProperties {
    if (layout !== 'grid') return {};
    return {
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `var(--w3f-space-${gap})`,
    };
}

import type React from 'react';
