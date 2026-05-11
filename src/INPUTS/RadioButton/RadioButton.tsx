import React, { forwardRef, useState, useEffect, useId } from 'react';
import type { RadioButtonProps, RadioGroupProps } from './RadioButton.types';
import { RADIO_CLASSES, RADIO_GROUP_DEFAULTS } from './RadioButton.constants';
import { buildRadioButtonClasses, buildRadioGroupContainerClasses } from './RadioButton.utils';
import { RadioGroupContext, useRadioGroup, useRadioFormContext } from './RadioButton.hooks';
import { useBridgeBind } from '@w3f/bridge';

/**
 * RadioButton - debe usarse dentro de un RadioGroup
 */
export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(({
    label,
    value,
    disabled = false,
    className = '',
    unstyled = RADIO_GROUP_DEFAULTS.unstyled,
}, ref) => {
    const { selectedValue, onChange, name, direction } = useRadioGroup();
    const radioId = useId();
    const isChecked = selectedValue === value;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!disabled) onChange(e.target.value);
    };

    return (
        <label
            className={buildRadioButtonClasses(direction, disabled, className, unstyled)}
            htmlFor={radioId}
        >
            <input
                ref={ref}
                id={radioId}
                type="radio"
                name={name}
                value={value}
                checked={isChecked}
                onChange={handleChange}
                disabled={disabled}
            />
            <span className={RADIO_CLASSES.checkmark} />
            <span className={disabled ? 'w3f-text-gray-400' : ''}>{label}</span>
        </label>
    );
});

RadioButton.displayName = 'RadioButton';

/**
 * RadioGroup - contenedor para RadioButtons con integración Form/LiveForm
 */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(({
    children,
    name,
    value: controlledValue,
    defaultValue = RADIO_GROUP_DEFAULTS.defaultValue,
    onChange,
    direction = RADIO_GROUP_DEFAULTS.direction,
    label,
    showSelection = RADIO_GROUP_DEFAULTS.showSelection,
    className = RADIO_GROUP_DEFAULTS.className,
    error,
    required = RADIO_GROUP_DEFAULTS.required,
    onBlur,
    unstyled = RADIO_GROUP_DEFAULTS.unstyled,
    bindId,
    ...props
}, ref) => {
    const groupId = useId();
    const [internalValue, setInternalValue] = useState(defaultValue);
    const formContext = useRadioFormContext();
    const { dispatch } = useBridgeBind({ bindId });

    const isFormControlled = !!(formContext && name);

    const selectedValue = isFormControlled
        ? (formContext.values[name!] ?? defaultValue)
        : (controlledValue !== undefined ? controlledValue : internalValue);

    const fieldError = isFormControlled ? formContext.errors[name!] : error;

    useEffect(() => {
        if (!isFormControlled && controlledValue !== undefined) {
            setInternalValue(controlledValue);
        }
    }, [controlledValue, isFormControlled]);

    const handleChange = (newValue: string) => {
        if (isFormControlled && formContext && name) {
            const syntheticEvent = {
                target: { name, value: newValue, type: 'radio' },
            };
            formContext.handleChange(syntheticEvent as any);
        } else if (controlledValue === undefined) {
            setInternalValue(newValue);
        }
        dispatch('change', { value: newValue });
        if (onChange) onChange(newValue);
    };

    const handleBlur = () => {
        if (isFormControlled && formContext && name) {
            const syntheticEvent = { target: { name } };
            formContext.handleBlur(syntheticEvent as any);
        }
        if (onBlur) onBlur();
    };

    const contextValue = {
        selectedValue: selectedValue as string,
        onChange: handleChange,
        name: name || groupId,
        direction,
    };

    const hasError = Boolean(fieldError);

    return (
        <div ref={ref} className={className}>
            <fieldset className={RADIO_CLASSES.fieldset}>
                {label && (
                    <legend className={RADIO_CLASSES.legend}>
                        {label}
                        {required && (
                            <span className={RADIO_CLASSES.legendRequired}>*</span>
                        )}
                    </legend>
                )}

                <div
                    className={buildRadioGroupContainerClasses(direction, unstyled)}
                    role="radiogroup"
                    aria-label={label}
                    aria-required={required}
                    aria-invalid={hasError}
                    onBlur={handleBlur}
                >
                    <RadioGroupContext.Provider value={contextValue}>
                        {children}
                    </RadioGroupContext.Provider>
                </div>
            </fieldset>

            {fieldError && (
                <div className={RADIO_CLASSES.error} role="alert">
                    {fieldError}
                </div>
            )}

            {showSelection && selectedValue && !fieldError && (
                <div
                    className={RADIO_CLASSES.selectionPanel}
                    role="status"
                    aria-live="polite"
                    style={{ backgroundColor: 'var(--w3f-primary-600)' }}
                >
                    <p className={RADIO_CLASSES.selectionText}>
                        Opción seleccionada: <strong>{selectedValue}</strong>
                    </p>
                </div>
            )}
        </div>
    );
});

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
