import { useState, useEffect, useCallback } from 'react';
import type { GalleryImage } from './ImageGallery.types';

/**
 * Gestiona el estado del lightbox de la galería de imágenes.
 */
export function useImageGallery(images: GalleryImage[], enabled: boolean) {
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Bloquear scroll del body cuando el lightbox está abierto
    useEffect(() => {
        document.body.style.overflow = selectedImage ? 'hidden' : 'unset';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedImage]);

    const openLightbox = useCallback(
        (image: GalleryImage, index: number) => {
            if (!enabled) return;
            setSelectedImage(image);
            setCurrentIndex(index);
        },
        [enabled],
    );

    const closeLightbox = useCallback(() => {
        setSelectedImage(null);
    }, []);

    const goToPrevious = useCallback(
        (e: { stopPropagation: () => void }) => {
            e.stopPropagation();
            const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
            setCurrentIndex(newIndex);
            setSelectedImage(images[newIndex]);
        },
        [currentIndex, images],
    );

    const goToNext = useCallback(
        (e: { stopPropagation: () => void }) => {
            e.stopPropagation();
            const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
            setCurrentIndex(newIndex);
            setSelectedImage(images[newIndex]);
        },
        [currentIndex, images],
    );

    // Teclado: Escape, ArrowLeft, ArrowRight
    useEffect(() => {
        if (!selectedImage) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLightbox();
            else if (e.key === 'ArrowLeft') goToPrevious(e as unknown as { stopPropagation: () => void });
            else if (e.key === 'ArrowRight') goToNext(e as unknown as { stopPropagation: () => void });
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage, goToPrevious, goToNext, closeLightbox]);

    return { selectedImage, currentIndex, openLightbox, closeLightbox, goToPrevious, goToNext };
}
