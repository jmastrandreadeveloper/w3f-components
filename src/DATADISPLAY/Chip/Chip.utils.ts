import type { ChipVariant } from './Chip.types';
import { CHIP_VARIANT_CLASSES } from './Chip.constants';

/**
 * Construye las clases CSS para el componente Chip.
 */
export const buildChipClasses = (
    disabled: boolean,
    isFocused: boolean,
    className?: string,
    unstyled?: boolean,
    variant?: ChipVariant,
): string => {
    if (unstyled) {
        return ['w3f-chip', 'w3f-chip--unstyled', className].filter(Boolean).join(' ');
    }

    const classes: string[] = ['w3f-chip'];

    if (disabled) classes.push('w3f-chip--disabled');
    if (isFocused) classes.push('w3f-chip--focused');
    if (variant) classes.push(CHIP_VARIANT_CLASSES[variant]);

    if (className) classes.push(className);

    return classes.join(' ');
};
