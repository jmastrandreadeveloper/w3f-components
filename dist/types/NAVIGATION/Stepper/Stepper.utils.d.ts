import type { StepperColor, StepperOrientation } from './Stepper.types';
/**
 * Construye las clases del contenedor Stepper.
 */
export declare function buildStepperClasses(orientation: StepperOrientation, color: StepperColor, alternativeLabel: boolean, className: string, unstyled?: boolean): string;
/**
 * Construye las clases de un Step.
 */
export declare function buildStepClasses(orientation: StepperOrientation, active: boolean, completed: boolean, disabled: boolean): string;
/**
 * Construye las clases del StepConnector.
 */
export declare function buildConnectorClasses(orientation: StepperOrientation, active: boolean, completed: boolean, alternativeLabel: boolean, className: string): string;
/**
 * Construye las clases del StepLabel.
 */
export declare function buildLabelClasses(isClickable: boolean, alternativeLabel: boolean, className: string): string;
/**
 * Construye las clases del icono del step.
 */
export declare function buildStepIconClasses(active: boolean, completed: boolean, error: boolean): string;
/**
 * Construye las clases del título del step label.
 */
export declare function buildTitleClasses(active: boolean, error: boolean): string;
/**
 * Construye las clases del StepContent.
 */
export declare function buildContentClasses(active: boolean, isLast: boolean, className: string): string;
//# sourceMappingURL=Stepper.utils.d.ts.map