import type { FormFieldLayout } from './FormField.types';

export const FORM_FIELD_DEFAULTS = {
    layout: 'stacked' as const,
    required: false as const,
    disabled: false as const,
    className: '' as const,
    unstyled: false as const,
} as const;

export const FORM_FIELD_CLASSES = {
    base: 'w3f-form-field',
    layouts: {
        stacked: 'w3f-form-field--stacked',
        inline: 'w3f-form-field--inline',
    } as Record<FormFieldLayout, string>,
    label: 'w3f-form-field__label',
    required: 'w3f-input-required',
    content: 'w3f-form-field__content',
    message: 'w3f-input-message',
    messageError: 'w3f-input-message--error',
    messageHelper: 'w3f-input-message--helper',
    hasError: 'has-error',
    isDisabled: 'is-disabled',
} as const;
