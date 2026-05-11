import React, { forwardRef, useMemo, useCallback } from 'react';
import { Check, X } from 'lucide-react';
import type {
    StepperProps,
    StepProps,
    StepLabelProps,
    StepContentProps,
    StepConnectorProps,
    StepIconProps,
} from './Stepper.types';
import {
    STEPPER_DEFAULTS,
    STEP_DEFAULTS,
    STEP_LABEL_DEFAULTS,
    STEP_CONTENT_DEFAULTS,
    STEP_CONNECTOR_DEFAULTS,
    STEPPER_CLASSES,
} from './Stepper.constants';
import {
    buildStepperClasses,
    buildStepClasses,
    buildConnectorClasses,
    buildLabelClasses,
    buildStepIconClasses,
    buildTitleClasses,
    buildContentClasses,
} from './Stepper.utils';
import { useStepContentAnimation } from './Stepper.hooks';

// ─────────────────────────────────────────────────────────────────────────────
// StepConnector
// ─────────────────────────────────────────────────────────────────────────────

const StepConnector: React.FC<StepConnectorProps> = ({
    className = STEP_CONNECTOR_DEFAULTS.className,
    _orientation = STEP_CONNECTOR_DEFAULTS._orientation,
    _active = STEP_CONNECTOR_DEFAULTS._active,
    _completed = STEP_CONNECTOR_DEFAULTS._completed,
    _alternativeLabel = STEP_CONNECTOR_DEFAULTS._alternativeLabel,
    ...rest
}) => {
    const cls = useMemo(
        () => buildConnectorClasses(_orientation, _active, _completed, _alternativeLabel, className),
        [_orientation, _active, _completed, _alternativeLabel, className],
    );

    return <span className={cls} {...rest} />;
};

StepConnector.displayName = 'StepConnector';

// ─────────────────────────────────────────────────────────────────────────────
// StepIcon (interno)
// ─────────────────────────────────────────────────────────────────────────────

const StepIcon: React.FC<StepIconProps> = ({ index, active, completed, error }) => {
    const cls = buildStepIconClasses(active, completed, error);

    let content: React.ReactNode;
    if (error) {
        content = <X size={18} />;
    } else if (completed) {
        content = <Check size={18} />;
    } else {
        content = index + 1;
    }

    return <span className={cls}>{content}</span>;
};

// ─────────────────────────────────────────────────────────────────────────────
// StepLabel
// ─────────────────────────────────────────────────────────────────────────────

const StepLabel: React.FC<StepLabelProps> = ({
    children,
    optional,
    icon,
    error = STEP_LABEL_DEFAULTS.error,
    StepIconComponent,
    onClick,
    className = STEP_LABEL_DEFAULTS.className,
    _active = STEP_LABEL_DEFAULTS._active,
    _completed = STEP_LABEL_DEFAULTS._completed,
    _disabled = STEP_LABEL_DEFAULTS._disabled,
    _index = STEP_LABEL_DEFAULTS._index,
    _alternativeLabel = STEP_LABEL_DEFAULTS._alternativeLabel,
    _nonLinear = STEP_LABEL_DEFAULTS._nonLinear,
    ...rest
}) => {
    const isClickable = !_disabled && (!!onClick || _nonLinear);

    const cls = useMemo(
        () => buildLabelClasses(isClickable, _alternativeLabel, className),
        [isClickable, _alternativeLabel, className],
    );

    const handleClick = useCallback(
        (e: React.SyntheticEvent) => {
            if (_disabled) return;
            if (onClick) onClick(e, _index);
        },
        [_disabled, onClick, _index],
    );

    const renderIcon = () => {
        if (StepIconComponent) {
            return (
                <StepIconComponent
                    active={_active}
                    completed={_completed}
                    error={error}
                    icon={_index + 1}
                />
            );
        }
        if (icon) {
            return (
                <span className={buildStepIconClasses(_active, _completed, error)}>
                    {icon}
                </span>
            );
        }
        return (
            <StepIcon
                index={_index}
                active={_active}
                completed={_completed}
                error={error}
            />
        );
    };

    const titleCls = buildTitleClasses(_active, error);
    const optionalCls = [
        STEPPER_CLASSES.labelOptional,
        error && STEPPER_CLASSES.labelOptionalError,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div
            className={cls}
            onClick={isClickable ? handleClick : undefined}
            role={isClickable ? 'button' : undefined}
            tabIndex={isClickable ? 0 : undefined}
            onKeyDown={
                isClickable
                    ? (e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleClick(e);
                          }
                      }
                    : undefined
            }
            {...rest}
        >
            <span className={STEPPER_CLASSES.labelIconContainer}>{renderIcon()}</span>
            <span className={STEPPER_CLASSES.labelText}>
                <span className={titleCls}>{children}</span>
                {optional && <span className={optionalCls}>{optional}</span>}
            </span>
        </div>
    );
};

StepLabel.displayName = 'StepLabel';

// ─────────────────────────────────────────────────────────────────────────────
// StepContent (solo vertical)
// ─────────────────────────────────────────────────────────────────────────────

const StepContent: React.FC<StepContentProps> = ({
    children,
    transitionDuration = STEP_CONTENT_DEFAULTS.transitionDuration,
    className = STEP_CONTENT_DEFAULTS.className,
    _active = STEP_CONTENT_DEFAULTS._active,
    _last = STEP_CONTENT_DEFAULTS._last,
    ...rest
}) => {
    const { contentRef, maxHeight } = useStepContentAnimation(_active);

    const cls = useMemo(
        () => buildContentClasses(_active, _last, className),
        [_active, _last, className],
    );

    return (
        <div
            ref={contentRef}
            className={cls}
            style={{
                maxHeight: _active ? maxHeight : '0',
                transitionDuration: `${transitionDuration}ms`,
            }}
            {...rest}
        >
            {children}
        </div>
    );
};

StepContent.displayName = 'StepContent';

// ─────────────────────────────────────────────────────────────────────────────
// Step
// ─────────────────────────────────────────────────────────────────────────────

const Step: React.FC<StepProps> = ({
    active = STEP_DEFAULTS.active,
    completed = STEP_DEFAULTS.completed,
    disabled = STEP_DEFAULTS.disabled,
    index = STEP_DEFAULTS.index,
    last = STEP_DEFAULTS.last,
    children,
    className = STEP_DEFAULTS.className,
    _orientation = STEP_DEFAULTS._orientation,
    _alternativeLabel = STEP_DEFAULTS._alternativeLabel,
    _color,
    _nonLinear = STEP_DEFAULTS._nonLinear,
    _connector,
    ...rest
}) => {
    const cls = useMemo(
        () => buildStepClasses(_orientation, active, completed, disabled),
        [_orientation, active, completed, disabled],
    );

    const enhancedChildren = React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        if (child.type === StepLabel) {
            return React.cloneElement(child as React.ReactElement<StepLabelProps>, {
                _active: active,
                _completed: completed,
                _disabled: disabled,
                _index: index,
                _alternativeLabel,
                _nonLinear,
            });
        }

        if (child.type === StepContent) {
            return React.cloneElement(child as React.ReactElement<StepContentProps>, {
                _active: active,
                _last: last,
            });
        }

        return child;
    });

    return (
        <div className={cls} {...rest}>
            {enhancedChildren}
        </div>
    );
};

Step.displayName = 'Step';

// ─────────────────────────────────────────────────────────────────────────────
// Stepper
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Stepper Component - W3F Framework
 *
 * Indicador de progreso de pasos. Soporta orientación horizontal/vertical,
 * labels alternativos, modo no-lineal y contenido anidado con Form/LiveForm.
 *
 * @example
 * // Horizontal básico
 * <Stepper activeStep={step}>
 *   <Step><StepLabel>Datos personales</StepLabel></Step>
 *   <Step><StepLabel>Dirección</StepLabel></Step>
 *   <Step><StepLabel>Confirmación</StepLabel></Step>
 * </Stepper>
 *
 * @example
 * // Vertical con contenido y formulario
 * <Stepper activeStep={step} orientation="vertical">
 *   <Step>
 *     <StepLabel>Información</StepLabel>
 *     <StepContent>
 *       <Form initialValues={{ name: '' }} onSubmit={handleSubmit}>
 *         <Input name="name" label="Nombre" />
 *         <Button type="submit">Siguiente</Button>
 *       </Form>
 *     </StepContent>
 *   </Step>
 * </Stepper>
 */
const Stepper = forwardRef<HTMLDivElement, StepperProps>(({
    activeStep = STEPPER_DEFAULTS.activeStep,
    children,
    orientation = STEPPER_DEFAULTS.orientation,
    alternativeLabel = STEPPER_DEFAULTS.alternativeLabel,
    nonLinear = STEPPER_DEFAULTS.nonLinear,
    connector,
    color = STEPPER_DEFAULTS.color,
    unstyled = STEPPER_DEFAULTS.unstyled,
    className = STEPPER_DEFAULTS.className,
    ...rest
}, ref) => {
    const cls = useMemo(
        () => buildStepperClasses(orientation, color, alternativeLabel, className, unstyled),
        [orientation, color, alternativeLabel, className, unstyled],
    );

    const connectorElement =
        connector !== undefined ? connector : <StepConnector />;

    const steps = React.Children.toArray(children).filter(Boolean);

    return (
        <div ref={ref} className={cls} {...rest}>
            {steps.map((child, index) => {
                if (!React.isValidElement(child)) return child;

                const childProps = child.props as StepProps;
                const isActive =
                    childProps.active !== undefined
                        ? childProps.active
                        : index === activeStep;
                const isCompleted =
                    childProps.completed !== undefined
                        ? childProps.completed
                        : index < activeStep;
                const isDisabled =
                    childProps.disabled !== undefined
                        ? childProps.disabled
                        : !nonLinear && index > activeStep;

                const connectorProps = {
                    _orientation: orientation,
                    _active: index === activeStep,
                    _completed: index <= activeStep,
                    _alternativeLabel: alternativeLabel,
                };

                return (
                    <React.Fragment key={child.key ?? index}>
                        {index > 0 &&
                            connectorElement &&
                            React.cloneElement(
                                connectorElement as React.ReactElement<StepConnectorProps>,
                                connectorProps,
                            )}
                        {React.cloneElement(child as React.ReactElement<StepProps>, {
                            active: isActive,
                            completed: isCompleted,
                            disabled: isDisabled,
                            index,
                            last: index === steps.length - 1,
                            _orientation: orientation,
                            _alternativeLabel: alternativeLabel,
                            _color: color,
                            _nonLinear: nonLinear,
                            _connector: connectorElement,
                        })}
                    </React.Fragment>
                );
            })}
        </div>
    );
});

Stepper.displayName = 'Stepper';

export { Stepper, Step, StepLabel, StepContent, StepConnector };
export default Stepper;
