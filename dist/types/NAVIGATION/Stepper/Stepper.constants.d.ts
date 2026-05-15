import type { StepperColor, StepperOrientation } from './Stepper.types';
export declare const STEPPER_DEFAULTS: {
    readonly activeStep: 0;
    readonly orientation: StepperOrientation;
    readonly alternativeLabel: false;
    readonly nonLinear: false;
    readonly color: StepperColor;
    readonly unstyled: false;
    readonly className: "";
};
export declare const STEP_DEFAULTS: {
    readonly active: false;
    readonly completed: false;
    readonly disabled: false;
    readonly index: 0;
    readonly last: false;
    readonly className: "";
    readonly _orientation: StepperOrientation;
    readonly _alternativeLabel: false;
    readonly _nonLinear: false;
};
export declare const STEP_LABEL_DEFAULTS: {
    readonly error: false;
    readonly className: "";
    readonly _active: false;
    readonly _completed: false;
    readonly _disabled: false;
    readonly _index: 0;
    readonly _alternativeLabel: false;
    readonly _nonLinear: false;
};
export declare const STEP_CONTENT_DEFAULTS: {
    readonly transitionDuration: 300;
    readonly className: "";
    readonly _active: false;
    readonly _last: false;
};
export declare const STEP_CONNECTOR_DEFAULTS: {
    readonly className: "";
    readonly _orientation: StepperOrientation;
    readonly _active: false;
    readonly _completed: false;
    readonly _alternativeLabel: false;
};
export declare const STEPPER_CLASSES: {
    readonly stepper: "w3f-stepper";
    readonly step: "w3f-step";
    readonly connector: "w3f-step-connector";
    readonly connectorActive: "w3f-step-connector--active";
    readonly connectorCompleted: "w3f-step-connector--completed";
    readonly connectorAlternative: "w3f-step-connector--alternative";
    readonly label: "w3f-step-label";
    readonly labelClickable: "w3f-step-label--clickable";
    readonly labelAlternative: "w3f-step-label--alternative";
    readonly labelIconContainer: "w3f-step-label__icon-container";
    readonly labelText: "w3f-step-label__text";
    readonly labelTitle: "w3f-step-label__title";
    readonly labelTitleActive: "w3f-step-label__title--active";
    readonly labelTitleError: "w3f-step-label__title--error";
    readonly labelOptional: "w3f-step-label__optional";
    readonly labelOptionalError: "w3f-step-label__optional--error";
    readonly icon: "w3f-step-label__icon";
    readonly iconActive: "w3f-step-label__icon--active";
    readonly iconCompleted: "w3f-step-label__icon--completed";
    readonly iconPending: "w3f-step-label__icon--pending";
    readonly iconError: "w3f-step-label__icon--error";
    readonly content: "w3f-step-content";
    readonly contentExpanded: "w3f-step-content--expanded";
    readonly contentCollapsed: "w3f-step-content--collapsed";
    readonly contentLast: "w3f-step-content--last";
};
//# sourceMappingURL=Stepper.constants.d.ts.map