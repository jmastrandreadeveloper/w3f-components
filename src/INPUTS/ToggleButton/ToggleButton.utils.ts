import type { ToggleButtonColor, ToggleButtonSize, ToggleButtonOrientation } from './ToggleButton.types';
import { TOGGLE_BUTTON_CLASSES, TOGGLE_GROUP_CLASSES } from './ToggleButton.constants';

export function buildToggleButtonClasses(
    selected: boolean,
    color: ToggleButtonColor,
    size: ToggleButtonSize,
    fullWidth: boolean,
    disabled: boolean,
    className: string,
    unstyled?: boolean,
): string {
    if (unstyled) {
        return [TOGGLE_BUTTON_CLASSES.button, 'w3f-toggle-button--unstyled', className]
            .filter(Boolean)
            .join(' ');
    }
    return [
        TOGGLE_BUTTON_CLASSES.button,
        selected && TOGGLE_BUTTON_CLASSES.selected,
        selected && color !== 'primary' && TOGGLE_BUTTON_CLASSES.colorModifiers[color],
        TOGGLE_BUTTON_CLASSES.sizeModifiers[size],
        fullWidth && TOGGLE_BUTTON_CLASSES.full,
        disabled && TOGGLE_BUTTON_CLASSES.disabled,
        className,
    ]
        .filter(Boolean)
        .join(' ');
}

export function buildToggleGroupClasses(
    orientation: ToggleButtonOrientation,
    fullWidth: boolean,
    hasError: boolean,
    disabled: boolean,
    className: string,
): string {
    return [
        TOGGLE_GROUP_CLASSES.group,
        TOGGLE_GROUP_CLASSES.orientationModifiers[orientation],
        fullWidth && TOGGLE_GROUP_CLASSES.full,
        hasError && TOGGLE_GROUP_CLASSES.error,
        disabled && TOGGLE_GROUP_CLASSES.disabled,
        className,
    ]
        .filter(Boolean)
        .join(' ');
}

export function isSelected(
    buttonValue: string | number,
    currentValue: string | number | (string | number)[] | null | undefined,
    exclusive: boolean,
): boolean {
    if (exclusive) {
        return buttonValue === currentValue;
    }
    if (Array.isArray(currentValue)) {
        return currentValue.includes(buttonValue);
    }
    return false;
}

export function computeNewValue(
    buttonValue: string | number,
    currentValue: string | number | (string | number)[] | null | undefined,
    exclusive: boolean,
): string | number | (string | number)[] | null {
    if (exclusive) {
        return currentValue === buttonValue ? null : buttonValue;
    }
    const arr = Array.isArray(currentValue) ? currentValue : [];
    const idx = arr.indexOf(buttonValue);
    if (idx === -1) return [...arr, buttonValue];
    return arr.filter((v) => v !== buttonValue);
}
