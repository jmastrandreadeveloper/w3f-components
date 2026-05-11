import type { FormFieldLayout } from './FormField.types';
import { FORM_FIELD_CLASSES } from './FormField.constants';

export function buildFormFieldClasses(
    layout: FormFieldLayout,
    hasError: boolean,
    disabled: boolean,
    className?: string,
    unstyled?: boolean,
): string {
    if (unstyled) {
        return [FORM_FIELD_CLASSES.base, 'w3f-form-field--unstyled', className]
            .filter(Boolean)
            .join(' ');
    }
    return [
        FORM_FIELD_CLASSES.base,
        FORM_FIELD_CLASSES.layouts[layout],
        hasError && FORM_FIELD_CLASSES.hasError,
        disabled && FORM_FIELD_CLASSES.isDisabled,
        className,
    ]
        .filter(Boolean)
        .join(' ');
}
