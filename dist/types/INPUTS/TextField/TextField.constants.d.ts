import type { TextFieldSize } from './TextField.types';
export declare const TEXTFIELD_CLASSES: {
    readonly container: "w3f-input-container";
    readonly wrapper: "w3f-input-wrapper";
    readonly wrapperSizes: Record<TextFieldSize, string>;
    readonly input: "w3f-input";
    readonly hasLeading: "w3f-input--has-leading";
    readonly hasTrailing: "w3f-input--has-trailing";
    readonly label: "w3f-input-label";
    readonly labelFloating: "w3f-input-label--floating";
    readonly labelShifted: "w3f-input-label--shifted";
    readonly required: "w3f-input-required";
    readonly iconLeading: "w3f-input-icon w3f-input-icon--leading";
    readonly iconTrailing: "w3f-input-icon w3f-input-icon--trailing";
    readonly message: "w3f-input-message";
    readonly messageError: "w3f-input-message--error";
    readonly messageHelper: "w3f-input-message--helper";
    readonly count: "w3f-input-count";
    readonly paddingX: "w3f-px-1";
};
export declare const TEXTFIELD_DEFAULTS: {
    size: TextFieldSize;
    type: "text";
    disabled: boolean;
    required: boolean;
    autoFocus: boolean;
    clearable: boolean;
    showCount: boolean;
    unstyled: boolean;
};
//# sourceMappingURL=TextField.constants.d.ts.map