import type { ToggleButtonColor, ToggleButtonSize, ToggleButtonOrientation } from './ToggleButton.types';
export declare const TOGGLE_BUTTON_CLASSES: {
    readonly button: "w3f-toggle-button";
    readonly selected: "w3f-toggle-button--selected";
    readonly full: "w3f-toggle-button--full";
    readonly disabled: "w3f-toggle-button--disabled";
    readonly colorModifiers: Record<ToggleButtonColor, string>;
    readonly sizeModifiers: Record<ToggleButtonSize, string>;
};
export declare const TOGGLE_BUTTON_DEFAULTS: {
    readonly selected: false;
    readonly color: ToggleButtonColor;
    readonly size: ToggleButtonSize;
    readonly fullWidth: false;
    readonly disabled: false;
    readonly className: "";
    readonly unstyled: false;
};
export declare const TOGGLE_GROUP_DEFAULTS: {
    readonly exclusive: false;
    readonly color: ToggleButtonColor;
    readonly size: ToggleButtonSize;
    readonly fullWidth: false;
    readonly orientation: ToggleButtonOrientation;
    readonly required: false;
    readonly disabled: false;
    readonly className: "";
};
export declare const TOGGLE_GROUP_CLASSES: {
    readonly wrapper: "w3f-toggle-group-wrapper";
    readonly group: "w3f-toggle-group";
    readonly label: "w3f-toggle-group-label";
    readonly required: "w3f-input-required";
    readonly full: "w3f-toggle-group--full";
    readonly error: "w3f-toggle-group--error";
    readonly disabled: "w3f-toggle-group--disabled";
    readonly orientationModifiers: Record<ToggleButtonOrientation, string>;
    readonly paddingX: "w3f-px-1";
    readonly message: "w3f-input-message";
    readonly messageError: "w3f-input-message--error";
    readonly messageHelper: "w3f-input-message--helper";
};
//# sourceMappingURL=ToggleButton.constants.d.ts.map