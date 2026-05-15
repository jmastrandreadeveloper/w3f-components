import type { SlideToggleSize, SlideToggleSizeConfig } from './SlideToggle.types';
export declare const SLIDE_TOGGLE_SIZE_CONFIGS: Record<SlideToggleSize, SlideToggleSizeConfig>;
export declare const SLIDE_TOGGLE_DEFAULTS: {
    readonly checked: false;
    readonly disabled: false;
    readonly size: "md";
    readonly variant: "primary";
    readonly loading: false;
    readonly labelPosition: "right";
    readonly showIcon: true;
    readonly className: "";
    readonly unstyled: false;
};
export declare const SLIDE_TOGGLE_CLASSES: {
    readonly base: "w3f-slide-toggle";
    readonly track: "w3f-slide-toggle__track";
    readonly handle: "w3f-slide-toggle__handle";
    readonly trackChecked: "is-checked";
    readonly handleDragging: "is-dragging";
    readonly isDisabled: "is-disabled";
    readonly isLoading: "is-loading";
    readonly hasError: "has-error";
    readonly container: "w3f-slide-toggle-container";
    readonly containerLabelLeft: "w3f-slide-toggle-container--label-left";
    readonly label: "w3f-slide-toggle__label";
    readonly labelRight: "w3f-slide-toggle__label--right";
    readonly labelLeft: "w3f-slide-toggle__label--left";
    readonly labelDisabled: "w3f-slide-toggle__label--disabled";
    readonly checkIcon: "w3f-slide-toggle__check-icon";
    readonly messages: "w3f-slide-toggle__messages";
    readonly message: "w3f-input-message";
    readonly messageError: "w3f-input-message--error";
    readonly messageHelper: "w3f-input-message--helper";
};
//# sourceMappingURL=SlideToggle.constants.d.ts.map