import type { PasswordFieldSize, PasswordStrength } from './PasswordField.types';

export const PASSWORDFIELD_CLASSES = {
    container: 'w3f-input-container',
    wrapper: 'w3f-input-wrapper',
    wrapperSizes: {
        sm: 'w3f-input-wrapper--sm',
        md: '',
        lg: 'w3f-input-wrapper--lg',
    } as Record<PasswordFieldSize, string>,
    input: 'w3f-input',
    hasLeading: 'w3f-input--has-leading',
    hasTrailing: 'w3f-input--has-trailing',
    label: 'w3f-input-label',
    labelFloating: 'w3f-input-label--floating',
    labelShifted: 'w3f-input-label--shifted',
    required: 'w3f-input-required',
    iconLeading: 'w3f-input-icon w3f-input-icon--leading',
    iconTrailing: 'w3f-input-icon w3f-input-icon--trailing w3f-input-icon--clickable',
    message: 'w3f-input-message',
    messageError: 'w3f-input-message--error',
    messageHelper: 'w3f-input-message--helper',
    paddingX: 'w3f-px-1',
    strength: 'w3f-password-strength',
    strengthBar: 'w3f-password-strength__bar',
    strengthSegment: 'w3f-password-strength__segment',
    strengthSegmentActive: 'w3f-password-strength__segment--active',
    strengthLabel: 'w3f-password-strength__label',
    strengthModifiers: {
        weak: 'w3f-password-strength--weak',
        medium: 'w3f-password-strength--medium',
        strong: 'w3f-password-strength--strong',
    } as Record<PasswordStrength, string>,
} as const;

export const PASSWORDFIELD_DEFAULTS = {
    size: 'md' as PasswordFieldSize,
    disabled: false,
    required: false,
    showStrength: false,
    unstyled: false,
};

export const STRENGTH_LABELS: Record<PasswordStrength, string> = {
    weak: 'Débil',
    medium: 'Media',
    strong: 'Fuerte',
};

export const STRENGTH_SEGMENTS: Record<PasswordStrength, number> = {
    weak: 1,
    medium: 2,
    strong: 3,
};
