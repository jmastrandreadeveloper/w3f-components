export const SELECT_DEFAULTS = {
    disabled: false,
    required: false,
    multiple: false,
    autoFocus: false,
    className: '',
    unstyled: false as const,
} as const;

export const SELECT_CLASSES = {
    container: 'w3f-select-container',
    wrapper: 'w3f-select-wrapper',
    select: 'w3f-select',
    label: 'w3f-select-label',
    labelFloating: 'w3f-select-label--floating',
    labelShifted: 'w3f-select-label--shifted',
    required: 'w3f-select-required',
    icon: 'w3f-select-icon',
    iconLeading: 'w3f-select-icon w3f-select-icon--leading',
    iconTrailing: 'w3f-select-icon w3f-select-icon--trailing',
    hasLeading: 'w3f-select--has-leading',
    hasTrailing: 'w3f-select--has-trailing',
    message: 'w3f-select-message',
    messageError: 'w3f-select-message--error',
    messageHelper: 'w3f-select-message--helper',
    paddingX: 'w3f-px-1',
} as const;

export const SELECT_VARIANT_CLASSES: Record<string, string> = {
    solid: 'w3f-select--solid',
    outlined: 'w3f-select--outlined',
    ghost: 'w3f-select--ghost',
    soft: 'w3f-select--soft',
};
