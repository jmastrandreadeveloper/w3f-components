import type { ImageRounded, ImageShadow, ImageFilter, ImageHoverEffect } from './Image.types';

/**
 * Construye las clases CSS para el componente Image.
 */
export const buildImageClasses = (
    circle: boolean,
    rounded: ImageRounded | undefined,
    border: boolean,
    shadow: ImageShadow | undefined,
    filter: ImageFilter | undefined,
    hoverEffect: ImageHoverEffect | undefined,
    unstyled?: boolean,
    className?: string,
): string => {
    const base = 'w3f-image-base';
    if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(' ');

    const classes: string[] = [base];

    // Shape
    if (circle) {
        classes.push('w3f-rounded-full');
    } else if (rounded) {
        classes.push(`w3f-rounded-${rounded}`);
    }

    // Border
    if (border) {
        classes.push('w3f-image-border');
    }

    // Shadow
    if (shadow) {
        classes.push(`w3f-shadow-${shadow}`);
    }

    // Filter
    if (filter) {
        classes.push(`w3f-image-filter-${filter}`);
    }

    // Hover effect
    if (hoverEffect) {
        classes.push(`w3f-image-hover-${hoverEffect}`);
    }

    // Additional classes
    if (className) {
        classes.push(className);
    }

    return classes.filter(Boolean).join(' ');
};
