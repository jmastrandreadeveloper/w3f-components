import type { StepperColor, StepperOrientation } from './Stepper.types';

// ─── Valores por defecto ────────────────────────────────────────────────────
export const STEPPER_DEFAULTS = {
    activeStep: 0,
    orientation: 'horizontal' as StepperOrientation,
    alternativeLabel: false,
    nonLinear: false,
    color: 'primary' as StepperColor,
    unstyled: false,
    className: '',
} as const;

export const STEP_DEFAULTS = {
    active: false,
    completed: false,
    disabled: false,
    index: 0,
    last: false,
    className: '',
    _orientation: 'horizontal' as StepperOrientation,
    _alternativeLabel: false,
    _nonLinear: false,
} as const;

export const STEP_LABEL_DEFAULTS = {
    error: false,
    className: '',
    _active: false,
    _completed: false,
    _disabled: false,
    _index: 0,
    _alternativeLabel: false,
    _nonLinear: false,
} as const;

export const STEP_CONTENT_DEFAULTS = {
    transitionDuration: 300,
    className: '',
    _active: false,
    _last: false,
} as const;

export const STEP_CONNECTOR_DEFAULTS = {
    className: '',
    _orientation: 'horizontal' as StepperOrientation,
    _active: false,
    _completed: false,
    _alternativeLabel: false,
} as const;

// ─── Tokens de clases CSS (BEM + W3Fussion) ────────────────────────────────
export const STEPPER_CLASSES = {
    stepper: 'w3f-stepper',
    step: 'w3f-step',
    connector: 'w3f-step-connector',
    connectorActive: 'w3f-step-connector--active',
    connectorCompleted: 'w3f-step-connector--completed',
    connectorAlternative: 'w3f-step-connector--alternative',
    label: 'w3f-step-label',
    labelClickable: 'w3f-step-label--clickable',
    labelAlternative: 'w3f-step-label--alternative',
    labelIconContainer: 'w3f-step-label__icon-container',
    labelText: 'w3f-step-label__text',
    labelTitle: 'w3f-step-label__title',
    labelTitleActive: 'w3f-step-label__title--active',
    labelTitleError: 'w3f-step-label__title--error',
    labelOptional: 'w3f-step-label__optional',
    labelOptionalError: 'w3f-step-label__optional--error',
    icon: 'w3f-step-label__icon',
    iconActive: 'w3f-step-label__icon--active',
    iconCompleted: 'w3f-step-label__icon--completed',
    iconPending: 'w3f-step-label__icon--pending',
    iconError: 'w3f-step-label__icon--error',
    content: 'w3f-step-content',
    contentExpanded: 'w3f-step-content--expanded',
    contentCollapsed: 'w3f-step-content--collapsed',
    contentLast: 'w3f-step-content--last',
} as const;
