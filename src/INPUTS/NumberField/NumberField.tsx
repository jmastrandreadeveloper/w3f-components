import React, { forwardRef, useId, useState } from 'react';
import type { NumberFieldProps } from './NumberField.types';
import { NUMBERFIELD_CLASSES, NUMBERFIELD_DEFAULTS } from './NumberField.constants';
import {
    buildWrapperClasses,
    buildInputClasses,
    buildLabelClasses,
} from './NumberField.utils';
import { useNumberField } from './NumberField.hooks';
import { useBridgeBind } from '@w3f/bridge';

const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(
    (
        {
            label,
            name,
            value = '',
            onChange,
            min = NUMBERFIELD_DEFAULTS.min,
            max = NUMBERFIELD_DEFAULTS.max,
            step = NUMBERFIELD_DEFAULTS.step,
            precision,
            error,
            helperText,
            disabled = NUMBERFIELD_DEFAULTS.disabled,
            required = NUMBERFIELD_DEFAULTS.required,
            autoComplete,
            autoFocus = NUMBERFIELD_DEFAULTS.autoFocus,
            size = NUMBERFIELD_DEFAULTS.size,
            leadingIcon,
            placeholder,
            className = '',
            unstyled = NUMBERFIELD_DEFAULTS.unstyled,
            bindId,
            variant,
            onBlur: onBlurProp,
            onFocus: onFocusProp,
            ...props
        },
        ref,
    ) => {
        const [isFocused, setIsFocused] = useState(false);
        const inputId = useId();
        const { dispatch } = useBridgeBind({ bindId });

        const bridgeOnChange = (v: number | '') => {
            if (v !== '') dispatch('change', { value: v });
            if (onChange) onChange(v);
        };

        const {
            formContext,
            isFormControlled,
            fieldError: contextError,
            internalValue,
            handleInputChange,
            handleSpin,
            handleBlur: handleBlurHook,
            isAtMax,
            isAtMin,
        } = useNumberField({
            name,
            value,
            min,
            max,
            step,
            precision,
            disabled,
            onChange: bridgeOnChange,
        });

        const fieldError = isFormControlled ? contextError : error;

        const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
            if (!disabled) setIsFocused(true);
            if (onFocusProp) onFocusProp(e);
        };

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            setIsFocused(false);
            handleBlurHook(e, onBlurProp);
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (disabled) return;
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                handleSpin('increment');
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                handleSpin('decrement');
            }
            if (props.onKeyDown) props.onKeyDown(e);
        };

        const hasValue = String(internalValue) !== '';
        const isFloating = isFocused || hasValue || Boolean(placeholder);
        const hasError = Boolean(fieldError);

        return (
            <div className={`${NUMBERFIELD_CLASSES.container} ${className}`}>
                <div className={buildWrapperClasses(size, unstyled, variant)}>
                    {leadingIcon && (
                        <div className={NUMBERFIELD_CLASSES.iconLeading}>{leadingIcon}</div>
                    )}

                    <input
                        ref={ref}
                        id={inputId}
                        type="text"
                        inputMode="decimal"
                        name={name}
                        value={internalValue}
                        onChange={handleInputChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        disabled={disabled}
                        required={required}
                        autoComplete={autoComplete}
                        autoFocus={autoFocus}
                        placeholder={placeholder}
                        aria-invalid={hasError}
                        aria-describedby={
                            fieldError
                                ? `${inputId}-error`
                                : helperText
                                  ? `${inputId}-helper`
                                  : undefined
                        }
                        aria-valuemin={min}
                        aria-valuemax={max}
                        aria-valuenow={
                            !isNaN(Number(internalValue)) ? Number(internalValue) : undefined
                        }
                        className={buildInputClasses(Boolean(leadingIcon), className)}
                        {...props}
                    />

                    <div className={NUMBERFIELD_CLASSES.spinButtons}>
                        <button
                            type="button"
                            tabIndex={-1}
                            aria-label="Incrementar valor"
                            className={`${NUMBERFIELD_CLASSES.spinButton} ${NUMBERFIELD_CLASSES.spinUp}`}
                            onClick={() => handleSpin('increment')}
                            disabled={disabled || isAtMax}
                        >
                            ▲
                        </button>
                        <button
                            type="button"
                            tabIndex={-1}
                            aria-label="Decrementar valor"
                            className={`${NUMBERFIELD_CLASSES.spinButton} ${NUMBERFIELD_CLASSES.spinDown}`}
                            onClick={() => handleSpin('decrement')}
                            disabled={disabled || isAtMin}
                        >
                            ▼
                        </button>
                    </div>

                    <label
                        htmlFor={inputId}
                        className={buildLabelClasses(
                            isFloating,
                            !isFloating && Boolean(leadingIcon),
                        )}
                    >
                        {label}
                        {required && (
                            <span className={NUMBERFIELD_CLASSES.required}> *</span>
                        )}
                    </label>
                </div>

                {(fieldError || helperText) && (
                    <div className={NUMBERFIELD_CLASSES.paddingX}>
                        {fieldError ? (
                            <p
                                id={`${inputId}-error`}
                                className={`${NUMBERFIELD_CLASSES.message} ${NUMBERFIELD_CLASSES.messageError}`}
                                role="alert"
                            >
                                {fieldError}
                            </p>
                        ) : (
                            <p
                                id={`${inputId}-helper`}
                                className={`${NUMBERFIELD_CLASSES.message} ${NUMBERFIELD_CLASSES.messageHelper}`}
                            >
                                {helperText}
                            </p>
                        )}
                    </div>
                )}
            </div>
        );
    },
);

NumberField.displayName = 'NumberField';
export { NumberField };
export default NumberField;
