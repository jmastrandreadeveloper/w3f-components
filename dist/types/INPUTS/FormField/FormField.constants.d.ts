import type { FormFieldLayout } from './FormField.types';
export declare const FORM_FIELD_DEFAULTS: {
    readonly layout: "stacked";
    readonly required: false;
    readonly disabled: false;
    readonly className: "";
    readonly unstyled: false;
};
export declare const FORM_FIELD_CLASSES: {
    readonly base: "w3f-form-field";
    readonly layouts: Record<FormFieldLayout, string>;
    readonly label: "w3f-form-field__label";
    readonly required: "w3f-input-required";
    readonly content: "w3f-form-field__content";
    readonly message: "w3f-input-message";
    readonly messageError: "w3f-input-message--error";
    readonly messageHelper: "w3f-input-message--helper";
    readonly hasError: "has-error";
    readonly isDisabled: "is-disabled";
};
//# sourceMappingURL=FormField.constants.d.ts.map