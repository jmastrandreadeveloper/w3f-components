import type { StepperColor, StepperOrientation } from './Stepper.types';
import { STEPPER_CLASSES } from './Stepper.constants';

/**
 * Construye las clases del contenedor Stepper.
 */
export function buildStepperClasses(
    orientation: StepperOrientation,
    color: StepperColor,
    alternativeLabel: boolean,
    className: string,
    unstyled?: boolean,
): string {
    if (unstyled) {
        return [STEPPER_CLASSES.stepper, 'w3f-stepper--unstyled', className]
            .filter(Boolean)
            .join(' ');
    }
    return [
        STEPPER_CLASSES.stepper,
        `w3f-stepper--${orientation}`,
        `w3f-stepper--${color}`,
        alternativeLabel && 'w3f-stepper--alternative-label',
        className,
    ]
        .filter(Boolean)
        .join(' ');
}

/**
 * Construye las clases de un Step.
 */
export function buildStepClasses(
    orientation: StepperOrientation,
    active: boolean,
    completed: boolean,
    disabled: boolean,
): string {
    return [
        STEPPER_CLASSES.step,
        `w3f-step--${orientation}`,
        active && 'w3f-step--active',
        completed && 'w3f-step--completed',
        disabled && 'w3f-step--disabled',
    ]
        .filter(Boolean)
        .join(' ');
}

/**
 * Construye las clases del StepConnector.
 */
export function buildConnectorClasses(
    orientation: StepperOrientation,
    active: boolean,
    completed: boolean,
    alternativeLabel: boolean,
    className: string,
): string {
    return [
        STEPPER_CLASSES.connector,
        `w3f-step-connector--${orientation}`,
        active && STEPPER_CLASSES.connectorActive,
        completed && STEPPER_CLASSES.connectorCompleted,
        alternativeLabel && STEPPER_CLASSES.connectorAlternative,
        className,
    ]
        .filter(Boolean)
        .join(' ');
}

/**
 * Construye las clases del StepLabel.
 */
export function buildLabelClasses(
    isClickable: boolean,
    alternativeLabel: boolean,
    className: string,
): string {
    return [
        STEPPER_CLASSES.label,
        isClickable && STEPPER_CLASSES.labelClickable,
        alternativeLabel && STEPPER_CLASSES.labelAlternative,
        className,
    ]
        .filter(Boolean)
        .join(' ');
}

/**
 * Construye las clases del icono del step.
 */
export function buildStepIconClasses(
    active: boolean,
    completed: boolean,
    error: boolean,
): string {
    return [
        STEPPER_CLASSES.icon,
        error
            ? STEPPER_CLASSES.iconError
            : completed
              ? STEPPER_CLASSES.iconCompleted
              : active
                ? STEPPER_CLASSES.iconActive
                : STEPPER_CLASSES.iconPending,
    ]
        .filter(Boolean)
        .join(' ');
}

/**
 * Construye las clases del título del step label.
 */
export function buildTitleClasses(active: boolean, error: boolean): string {
    return [
        STEPPER_CLASSES.labelTitle,
        active && STEPPER_CLASSES.labelTitleActive,
        error && STEPPER_CLASSES.labelTitleError,
    ]
        .filter(Boolean)
        .join(' ');
}

/**
 * Construye las clases del StepContent.
 */
export function buildContentClasses(
    active: boolean,
    isLast: boolean,
    className: string,
): string {
    return [
        STEPPER_CLASSES.content,
        active ? STEPPER_CLASSES.contentExpanded : STEPPER_CLASSES.contentCollapsed,
        isLast && STEPPER_CLASSES.contentLast,
        className,
    ]
        .filter(Boolean)
        .join(' ');
}
