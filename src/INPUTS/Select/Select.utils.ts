import type { SelectOptionOrGroup } from './Select.types';
import { SELECT_CLASSES, SELECT_VARIANT_CLASSES } from './Select.constants';

export function isOptionGroup(
    item: SelectOptionOrGroup,
): item is Extract<SelectOptionOrGroup, { options: unknown[] }> {
    return 'options' in item && Array.isArray((item as any).options);
}

export function buildSelectClasses(hasLeading: boolean, hasTrailing: boolean, unstyled?: boolean, variant?: string): string {
    if (unstyled) {
        return [SELECT_CLASSES.select, 'w3f-select--unstyled'].join(' ');
    }
    return [
        SELECT_CLASSES.select,
        hasLeading && SELECT_CLASSES.hasLeading,
        hasTrailing && SELECT_CLASSES.hasTrailing,
        variant && SELECT_VARIANT_CLASSES[variant],
    ]
        .filter(Boolean)
        .join(' ');
}

export function buildLabelClasses(isFloating: boolean, showShifted: boolean): string {
    return [
        SELECT_CLASSES.label,
        isFloating && SELECT_CLASSES.labelFloating,
        showShifted && SELECT_CLASSES.labelShifted,
    ]
        .filter(Boolean)
        .join(' ');
}

export function hasSelectValue(value: string | string[] | undefined): boolean {
    if (Array.isArray(value)) return value.length > 0;
    return value !== '' && value !== null && value !== undefined;
}
