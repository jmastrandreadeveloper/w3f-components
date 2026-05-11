import type { TextFieldSize } from './TextField.types';

export const TEXTFIELD_CLASSES = {
    container: 'w3f-input-container',
    wrapper: 'w3f-input-wrapper',
    wrapperSizes: {
        sm: 'w3f-input-wrapper--sm',
        md: '',
        lg: 'w3f-input-wrapper--lg',
    } as Record<TextFieldSize, string>,
    input: 'w3f-input',
    hasLeading: 'w3f-input--has-leading',
    hasTrailing: 'w3f-input--has-trailing',
    label: 'w3f-input-label',
    labelFloating: 'w3f-input-label--floating',
    labelShifted: 'w3f-input-label--shifted',
    required: 'w3f-input-required',
    iconLeading: 'w3f-input-icon w3f-input-icon--leading',
    iconTrailing: 'w3f-input-icon w3f-input-icon--trailing',
    message: 'w3f-input-message',
    messageError: 'w3f-input-message--error',
    messageHelper: 'w3f-input-message--helper',
    count: 'w3f-input-count',
    paddingX: 'w3f-px-1',
} as const;

export const TEXTFIELD_DEFAULTS = {
    size: 'md' as TextFieldSize,
    type: 'text' as const,
    disabled: false,
    required: false,
    autoFocus: false,
    clearable: false,
    showCount: false,
    unstyled: false,
};
