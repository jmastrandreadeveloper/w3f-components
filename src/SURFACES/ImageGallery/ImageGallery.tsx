import React, { forwardRef } from 'react';
import { Image } from '../../DATADISPLAY/Image/Image';
import Button from '../../INPUTS/Button/Button';
import Container from '../../LAYOUT/Container/Container';
import { Panel } from '../../LAYOUT/Panels/Panel';
import type { ImageGalleryProps } from './ImageGallery.types';
import { IMAGE_GALLERY_DEFAULTS, IMAGE_GALLERY_CLASSES } from './ImageGallery.constants';
import { buildGalleryClasses, buildGridStyle } from './ImageGallery.utils';
import { useImageGallery } from './ImageGallery.hooks';
import { sanitizeUrl } from '../../utils/sanitizeUrl';

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
const ImageGallery = forwardRef<HTMLDivElement, ImageGalleryProps>(({
    images = IMAGE_GALLERY_DEFAULTS.images as [],
    title,
    layout = IMAGE_GALLERY_DEFAULTS.layout,
    columns = IMAGE_GALLERY_DEFAULTS.columns,
    gap = IMAGE_GALLERY_DEFAULTS.gap,
    showCaptions = IMAGE_GALLERY_DEFAULTS.showCaptions,
    lightbox = IMAGE_GALLERY_DEFAULTS.lightbox,
    imageRounded = IMAGE_GALLERY_DEFAULTS.imageRounded,
    imageShadow = IMAGE_GALLERY_DEFAULTS.imageShadow,
    imageHoverEffect = IMAGE_GALLERY_DEFAULTS.imageHoverEffect,
    thumbnails = IMAGE_GALLERY_DEFAULTS.thumbnails,
    emptyMessage = IMAGE_GALLERY_DEFAULTS.emptyMessage,
    unstyled = IMAGE_GALLERY_DEFAULTS.unstyled,
    className = IMAGE_GALLERY_DEFAULTS.className,
}, ref) => {
    const { selectedImage, currentIndex, openLightbox, closeLightbox, goToPrevious, goToNext } =
        useImageGallery(images, lightbox);

    if (images.length === 0) {
        return (
            <Container ref={ref} className={IMAGE_GALLERY_CLASSES.container}>
                {title && <h3 className={IMAGE_GALLERY_CLASSES.title}>{title}</h3>}
                <Panel className={IMAGE_GALLERY_CLASSES.empty}>
                    <svg
                        className={IMAGE_GALLERY_CLASSES.emptyIcon}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    <p className={IMAGE_GALLERY_CLASSES.emptyText}>{emptyMessage}</p>
                </Panel>
            </Container>
        );
    }

    const galleryCls = buildGalleryClasses(layout, className, unstyled);
    const gridStyle = buildGridStyle(layout, columns, gap);

    return (
        <Container ref={ref} className={IMAGE_GALLERY_CLASSES.container}>
            {title && <h3 className={IMAGE_GALLERY_CLASSES.title}>{title}</h3>}

            <div className={galleryCls} style={gridStyle}>
                {images.map((image, index) => (
                    <Panel
                        key={image.id ?? index}
                        className={IMAGE_GALLERY_CLASSES.item}
                        padding={false}
                        card
                    >
                        <Image
                            src={thumbnails && image.thumbnail ? image.thumbnail : image.src}
                            alt={image.alt ?? `Imagen ${index + 1}`}
                            rounded={imageRounded}
                            shadow={imageShadow}
                            hoverEffect={lightbox ? imageHoverEffect : undefined}
                            className={IMAGE_GALLERY_CLASSES.image}
                            onClick={() => openLightbox(image, index)}
                            loading="lazy"
                        />
                        {showCaptions && image.caption && (
                            <p className={IMAGE_GALLERY_CLASSES.caption}>{image.caption}</p>
                        )}
                    </Panel>
                ))}
            </div>

            {/* Lightbox */}
            {lightbox && selectedImage && (
                <div
                    className={IMAGE_GALLERY_CLASSES.lightboxOverlay}
                    onClick={closeLightbox}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Vista ampliada de imagen"
                >
                    <Button
                        className={IMAGE_GALLERY_CLASSES.lightboxClose}
                        onClick={closeLightbox}
                        aria-label="Cerrar lightbox"
                        variant="text"
                    >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </Button>

                    {images.length > 1 && (
                        <>
                            <Button
                                className={`${IMAGE_GALLERY_CLASSES.lightboxNav} ${IMAGE_GALLERY_CLASSES.lightboxPrev}`}
                                onClick={goToPrevious}
                                aria-label="Imagen anterior"
                                variant="text"
                            >
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </Button>

                            <Button
                                className={`${IMAGE_GALLERY_CLASSES.lightboxNav} ${IMAGE_GALLERY_CLASSES.lightboxNext}`}
                                onClick={goToNext}
                                aria-label="Siguiente imagen"
                                variant="text"
                            >
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </Button>
                        </>
                    )}

                    <Panel
                        className={IMAGE_GALLERY_CLASSES.lightboxContent}
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        padding={false}
                    >
                        <img
                            src={sanitizeUrl(selectedImage.src)}
                            alt={selectedImage.alt ?? 'Imagen ampliada'}
                            className={IMAGE_GALLERY_CLASSES.lightboxImage}
                        />
                        {selectedImage.caption && (
                            <div className={IMAGE_GALLERY_CLASSES.lightboxCaption}>
                                <p>{selectedImage.caption}</p>
                                {images.length > 1 && (
                                    <span className={IMAGE_GALLERY_CLASSES.lightboxCounter}>
                                        {currentIndex + 1} / {images.length}
                                    </span>
                                )}
                            </div>
                        )}
                    </Panel>
                </div>
            )}
        </Container>
    );
});

ImageGallery.displayName = 'ImageGallery';

export { ImageGallery };
export default ImageGallery;
