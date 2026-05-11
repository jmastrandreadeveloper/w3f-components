import { INPUT_CLASSES, INPUT_SIZE_CLASSES, INPUT_VARIANT_CLASSES } from './Input.constants';

export function buildInputClasses(
    hasLeading: boolean,
    hasTrailing: boolean,
    className?: string,
    unstyled?: boolean,
    variant?: string,
): string {
    if (unstyled) {
        return [
            INPUT_CLASSES.base,
            'w3f-input--unstyled',
            className,
        ].filter(Boolean).join(' ');
    }

    return [
        INPUT_CLASSES.base,
        hasLeading && INPUT_CLASSES.hasLeading,
        hasTrailing && INPUT_CLASSES.hasTrailing,
        variant && INPUT_VARIANT_CLASSES[variant],
        className,
    ]
        .filter(Boolean)
        .join(' ');
}

export function buildLabelClasses(
    isFloating: boolean,
    showShifted: boolean,
): string {
    return [
        INPUT_CLASSES.label,
        isFloating && INPUT_CLASSES.labelFloating,
        showShifted && INPUT_CLASSES.labelShifted,
    ]
        .filter(Boolean)
        .join(' ');
}

export function buildIconClasses(
    position: 'leading' | 'trailing',
    isClickable?: boolean,
): string {
    return [
        INPUT_CLASSES.icon,
        position === 'leading' ? INPUT_CLASSES.iconLeading : INPUT_CLASSES.iconTrailing,
        isClickable && INPUT_CLASSES.iconClickable,
    ]
        .filter(Boolean)
        .join(' ');
}

export function buildWrapperClasses(size?: string): string {
    return [
        INPUT_CLASSES.wrapper,
        size && INPUT_SIZE_CLASSES[size],
    ].filter(Boolean).join(' ');
}

export function buildContainerClasses(className?: string, unstyled?: boolean): string {
    return [
        INPUT_CLASSES.container,
        unstyled && 'w3f-input-container--unstyled',
        className,
    ].filter(Boolean).join(' ');
}
