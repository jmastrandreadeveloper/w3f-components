import type { PasswordFieldSize, PasswordStrength } from './PasswordField.types';
export declare const PASSWORDFIELD_CLASSES: {
    readonly container: "w3f-input-container";
    readonly wrapper: "w3f-input-wrapper";
    readonly wrapperSizes: Record<PasswordFieldSize, string>;
    readonly input: "w3f-input";
    readonly hasLeading: "w3f-input--has-leading";
    readonly hasTrailing: "w3f-input--has-trailing";
    readonly label: "w3f-input-label";
    readonly labelFloating: "w3f-input-label--floating";
    readonly labelShifted: "w3f-input-label--shifted";
    readonly required: "w3f-input-required";
    readonly iconLeading: "w3f-input-icon w3f-input-icon--leading";
    readonly iconTrailing: "w3f-input-icon w3f-input-icon--trailing w3f-input-icon--clickable";
    readonly message: "w3f-input-message";
    readonly messageError: "w3f-input-message--error";
    readonly messageHelper: "w3f-input-message--helper";
    readonly paddingX: "w3f-px-1";
    readonly strength: "w3f-password-strength";
    readonly strengthBar: "w3f-password-strength__bar";
    readonly strengthSegment: "w3f-password-strength__segment";
    readonly strengthSegmentActive: "w3f-password-strength__segment--active";
    readonly strengthLabel: "w3f-password-strength__label";
    readonly strengthModifiers: Record<PasswordStrength, string>;
};
export declare const PASSWORDFIELD_DEFAULTS: {
    size: PasswordFieldSize;
    disabled: boolean;
    required: boolean;
    showStrength: boolean;
    unstyled: boolean;
};
export declare const STRENGTH_LABELS: Record<PasswordStrength, string>;
export declare const STRENGTH_SEGMENTS: Record<PasswordStrength, number>;
//# sourceMappingURL=PasswordField.constants.d.ts.map