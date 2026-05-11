import type { ButtonVariant, ButtonColor, ButtonSize } from './Button.types';
import { BUTTON_CLASSES } from './Button.constants';

/**
 * Construye las clases CSS del botón a partir de sus props de estilo.
 * When `unstyled` is true, only structural classes are emitted —
 * visual appearance must be composed via trait classes on `className`.
 */
export function buildButtonClasses(
    variant: ButtonVariant,
    color: ButtonColor,
    size: ButtonSize,
    fullWidth: boolean,
    className?: string,
    unstyled?: boolean,
): string {
    if (unstyled) {
        return [
            BUTTON_CLASSES.base,
            'w3f-button--unstyled',
            fullWidth && BUTTON_CLASSES.full,
            className,
        ]
            .filter(Boolean)
            .join(' ');
    }

    return [
        BUTTON_CLASSES.base,
        BUTTON_CLASSES.variants[variant],
        BUTTON_CLASSES.colors[color],
        BUTTON_CLASSES.sizes[size],
        fullWidth && BUTTON_CLASSES.full,
        className,
    ]
        .filter(Boolean)
        .join(' ');
}
