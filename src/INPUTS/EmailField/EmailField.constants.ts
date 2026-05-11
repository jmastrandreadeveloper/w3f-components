import type { EmailFieldSize } from './EmailField.types';

export const EMAILFIELD_CLASSES = {
    container: 'w3f-input-container',
    wrapper: 'w3f-input-wrapper',
    wrapperSizes: {
        sm: 'w3f-input-wrapper--sm',
        md: '',
        lg: 'w3f-input-wrapper--lg',
    } as Record<EmailFieldSize, string>,
    input: 'w3f-input',
    hasLeading: 'w3f-input--has-leading',
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

export const EMAILFIELD_DEFAULTS = {
    size: 'md' as EmailFieldSize,
    disabled: false,
    required: false,
    validateOnChange: false,
    unstyled: false,
};
