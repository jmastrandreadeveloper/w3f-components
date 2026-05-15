import type { GalleryImage } from './ImageGallery.types';
/**
 * Gestiona el estado del lightbox de la galería de imágenes.
 */
export declare function useImageGallery(images: GalleryImage[], enabled: boolean): {
    selectedImage: GalleryImage | null;
    currentIndex: number;
    openLightbox: (image: GalleryImage, index: number) => void;
    closeLightbox: () => void;
    goToPrevious: (e: {
        stopPropagation: () => void;
    }) => void;
    goToNext: (e: {
        stopPropagation: () => void;
    }) => void;
};
//# sourceMappingURL=ImageGallery.hooks.d.ts.map