import type { NumberFieldSize } from './NumberField.types';

export const NUMBERFIELD_CLASSES = {
    container: 'w3f-input-container',
    wrapper: 'w3f-input-wrapper w3f-numberfield-wrapper',
    wrapperSizes: {
        sm: 'w3f-numberfield-wrapper--sm',
        md: '',
        lg: 'w3f-numberfield-wrapper--lg',
    } as Record<NumberFieldSize, string>,
    input: 'w3f-input w3f-input--has-trailing w3f-numberfield-input',
    inputWithLeading: 'w3f-input--has-leading',
    spinButtons: 'w3f-numberfield-spin-buttons',
    spinButton: 'w3f-numberfield-spin-button',
    spinUp: 'w3f-numberfield-spin-button--up',
    spinDown: 'w3f-numberfield-spin-button--down',
    label: 'w3f-input-label',
    labelFloating: 'w3f-input-label--floating',
    labelShifted: 'w3f-input-label--shifted',
    required: 'w3f-input-required',
    iconLeading: 'w3f-input-icon w3f-input-icon--leading',
    message: 'w3f-input-message',
    messageError: 'w3f-input-message--error',
    messageHelper: 'w3f-input-message--helper',
    paddingX: 'w3f-px-1',
} as const;

export const NUMBERFIELD_DEFAULTS = {
    min: -Infinity,
    max: Infinity,
    step: 1,
    size: 'md' as NumberFieldSize,
    disabled: false,
    required: false,
    autoFocus: false,
    unstyled: false as const,
};

export const NUMBERFIELD_VARIANT_CLASSES: Record<string, string> = {
    solid: 'w3f-number-field--solid',
    outlined: 'w3f-number-field--outlined',
    ghost: 'w3f-number-field--ghost',
    soft: 'w3f-number-field--soft',
};
