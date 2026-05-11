import React, { forwardRef, useState, useEffect, useId } from 'react';
import type { SliderProps } from './Slider.types';
import { SLIDER_CLASSES, SLIDER_DEFAULTS } from './Slider.constants';
import { calcPercentage, buildSliderBackground, buildSliderClasses } from './Slider.utils';
import { useSliderFormContext } from './Slider.hooks';
import { useBridgeBind } from '@w3f/bridge';

const Slider = forwardRef<HTMLInputElement, SliderProps>(({
    name,
    min = SLIDER_DEFAULTS.min,
    max = SLIDER_DEFAULTS.max,
    step = SLIDER_DEFAULTS.step,
    value,
    defaultValue = SLIDER_DEFAULTS.defaultValue,
    label = '',
    showValue = SLIDER_DEFAULTS.showValue,
    onChange,
    onBlur,
    disabled = SLIDER_DEFAULTS.disabled,
    className = '',
    variant,
    unstyled = SLIDER_DEFAULTS.unstyled,
    bindId,
    ...props
}, ref) => {
    const [internalValue, setInternalValue] = useState(value ?? defaultValue);
    const formContext = useSliderFormContext();
    const sliderId = useId();
    const { dispatch } = useBridgeBind({ bindId });

    const isFormControlled = !!(formContext && name);

    const sliderValue = isFormControlled
        ? (formContext.values[name!] ?? defaultValue)
        : (value ?? internalValue);

    useEffect(() => {
        if (!isFormControlled && value !== undefined) {
            setInternalValue(value);
        }
    }, [value, isFormControlled]);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        if (isFormControlled) {
            formContext.handleChange(e);
        } else {
            setInternalValue(newValue);
        }
        dispatch('change', { value: newValue });
        if (onChange) onChange(newValue);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (isFormControlled) formContext.handleBlur(e);
        if (onBlur) onBlur(e);
    };

    const percentage = calcPercentage(sliderValue as number, min, max);

    return (
        <div className={buildSliderClasses(className, unstyled, variant)}>
            {label && (
                <label htmlFor={sliderId} className={SLIDER_CLASSES.label}>
                    {label}
                </label>
            )}

            <div className={`${SLIDER_CLASSES.wrapper}${className ? ` ${className}` : ''}`}>
                <div
                    className={SLIDER_CLASSES.container}
                    style={{ background: buildSliderBackground(percentage) }}
                >
                    <input
                        ref={ref}
                        id={sliderId}
                        className={SLIDER_CLASSES.input}
                        type="range"
                        name={name}
                        min={min}
                        max={max}
                        step={step}
                        value={sliderValue as number}
                        onChange={handleSliderChange}
                        onBlur={handleBlur}
                        disabled={disabled}
                        aria-label={label}
                        aria-valuemin={min}
                        aria-valuemax={max}
                        aria-valuenow={sliderValue as number}
                    />
                </div>
            </div>

            {showValue && (
                <p className={SLIDER_CLASSES.valueWrapper}>
                    Valor seleccionado:
                    <span className={SLIDER_CLASSES.valueBadge}>{sliderValue}</span>
                </p>
            )}
        </div>
    );
});

Slider.displayName = 'Slider';
export { Slider };
export default Slider;
