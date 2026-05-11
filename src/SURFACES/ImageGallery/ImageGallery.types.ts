export interface GalleryImage {
    id?: string | number;
    src: string;
    alt?: string;
    caption?: string;
    thumbnail?: string;
}

export type GalleryLayout = 'grid' | 'masonry' | 'carousel';

export interface ImageGalleryProps {
    images?: GalleryImage[];
    title?: string;
    layout?: GalleryLayout;
    columns?: number;
    gap?: number;
    showCaptions?: boolean;
    lightbox?: boolean;
    imageRounded?: string;
    imageShadow?: string;
    imageHoverEffect?: string;
    thumbnails?: boolean;
    emptyMessage?: string;
    /** If true, removes all visual/preset styles — only structural CSS remains. */
    unstyled?: boolean;
    className?: string;
}
