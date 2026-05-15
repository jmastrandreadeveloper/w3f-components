import React from 'react';
import type { ImageGalleryProps } from './ImageGallery.types';
/**
 * ImageGallery Component - W3F Framework
 *
 * Galería de imágenes con soporte para lightbox, layouts y navegación por teclado.
 *
 * @example
 * <ImageGallery
 *   images={[{ id: 1, src: '/img1.jpg', alt: 'Foto 1', caption: 'Mi foto' }]}
 *   layout="grid"
 *   columns={3}
 *   lightbox
 * />
 */
declare const ImageGallery: React.ForwardRefExoticComponent<ImageGalleryProps & React.RefAttributes<HTMLDivElement>>;
export { ImageGallery };
export default ImageGallery;
//# sourceMappingURL=ImageGallery.d.ts.map