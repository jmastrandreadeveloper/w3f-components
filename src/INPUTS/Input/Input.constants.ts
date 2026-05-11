export const INPUT_DEFAULTS = {
    type: 'text',
    disabled: false,
    required: false,
    autoFocus: false,
    className: '',
    unstyled: false,
    size: 'md' as const,
} as const;

export const INPUT_CLASSES = {
    container: 'w3f-input-container',
    wrapper: 'w3f-input-wrapper',
    base: 'w3f-input',
    label: 'w3f-input-label',
    labelFloating: 'w3f-input-label--floating',
    labelShifted: 'w3f-input-label--shifted',
    required: 'w3f-input-required',
    icon: 'w3f-input-icon',
    iconLeading: 'w3f-input-icon--leading',
    iconTrailing: 'w3f-input-icon--trailing',
    iconClickable: 'w3f-input-icon--clickable',
    hasLeading: 'w3f-input--has-leading',
    hasTrailing: 'w3f-input--has-trailing',
    message: 'w3f-input-message',
    messageError: 'w3f-input-message--error',
    messageHelper: 'w3f-input-message--helper',
    paddingX: 'w3f-px-1',
} as const;

export const INPUT_SIZE_CLASSES: Record<string, string> = {
    xxxs: 'w3f-input-wrapper--xxxs',
    xxs:  'w3f-input-wrapper--xxs',
    xs:   'w3f-input-wrapper--xs',
    sm:   'w3f-input-wrapper--sm',
    md:   '',
    lg:   'w3f-input-wrapper--lg',
    xl:   'w3f-input-wrapper--xl',
};

export const INPUT_VARIANT_CLASSES: Record<string, string> = {
    solid: 'w3f-input--solid',
    outlined: 'w3f-input--outlined',
    ghost: 'w3f-input--ghost',
    soft: 'w3f-input--soft',
};
