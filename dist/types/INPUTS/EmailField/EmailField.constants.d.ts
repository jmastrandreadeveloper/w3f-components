import type { EmailFieldSize } from './EmailField.types';
export declare const EMAILFIELD_CLASSES: {
    readonly container: "w3f-input-container";
    readonly wrapper: "w3f-input-wrapper";
    readonly wrapperSizes: Record<EmailFieldSize, string>;
    readonly input: "w3f-input";
    readonly hasLeading: "w3f-input--has-leading";
    readonly label: "w3f-input-label";
    readonly labelFloating: "w3f-input-label--floating";
    readonly labelShifted: "w3f-input-label--shifted";
    readonly required: "w3f-input-required";
    readonly iconLeading: "w3f-input-icon w3f-input-icon--leading";
    readonly message: "w3f-input-message";
    readonly messageError: "w3f-input-message--error";
    readonly messageHelper: "w3f-input-message--helper";
    readonly paddingX: "w3f-px-1";
};
export declare const EMAILFIELD_DEFAULTS: {
    size: EmailFieldSize;
    disabled: boolean;
    required: boolean;
    validateOnChange: boolean;
    unstyled: boolean;
};
//# sourceMappingURL=EmailField.constants.d.ts.map