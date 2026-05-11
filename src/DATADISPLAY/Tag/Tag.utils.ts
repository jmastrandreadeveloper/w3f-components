import type { TagColor, TagVariant } from './Tag.types';
import { TAG_VARIANT_CLASSES } from './Tag.constants';

/**
 * Construye las clases CSS para el componente Tag.
 */
export const buildTagClasses = (
    color: TagColor,
    light: boolean,
    className?: string,
    unstyled?: boolean,
    variant?: TagVariant,
): string => {
    if (unstyled) {
        return ['w3f-tag-base', 'w3f-tag--unstyled', className].filter(Boolean).join(' ');
    }

    const classes: string[] = ['w3f-tag-base', `w3f-tag--${color}`];

    if (light) classes.push('w3f-tag--light');
    if (variant) classes.push(TAG_VARIANT_CLASSES[variant]);

    if (className) classes.push(className);

    return classes.filter(Boolean).join(' ');
};
