import type { NumberFieldSize } from './NumberField.types';
export declare const NUMBERFIELD_CLASSES: {
    readonly container: "w3f-input-container";
    readonly wrapper: "w3f-input-wrapper w3f-numberfield-wrapper";
    readonly wrapperSizes: Record<NumberFieldSize, string>;
    readonly input: "w3f-input w3f-input--has-trailing w3f-numberfield-input";
    readonly inputWithLeading: "w3f-input--has-leading";
    readonly spinButtons: "w3f-numberfield-spin-buttons";
    readonly spinButton: "w3f-numberfield-spin-button";
    readonly spinUp: "w3f-numberfield-spin-button--up";
    readonly spinDown: "w3f-numberfield-spin-button--down";
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
export declare const NUMBERFIELD_DEFAULTS: {
    min: number;
    max: number;
    step: number;
    size: NumberFieldSize;
    disabled: boolean;
    required: boolean;
    autoFocus: boolean;
    unstyled: false;
};
export declare const NUMBERFIELD_VARIANT_CLASSES: Record<string, string>;
//# sourceMappingURL=NumberField.constants.d.ts.map