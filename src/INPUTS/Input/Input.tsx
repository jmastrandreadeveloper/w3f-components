import React, { forwardRef, useId } from 'react';
import Icon from '../../DATADISPLAY/Icon/Icon';
import type { InputProps } from './Input.types';
import { INPUT_CLASSES, INPUT_DEFAULTS } from './Input.constants';
import {
    buildInputClasses,
    buildLabelClasses,
    buildIconClasses,
    buildContainerClasses,
    buildWrapperClasses,
} from './Input.utils';
import { useInputFormContext, useInputFocus, useInputMask, usePatternValidation } from './Input.hooks';
import { useBridgeBind } from '@w3f/bridge';

const renderIconContent = (iconProp: React.ReactNode | string): React.ReactNode => {
    if (!iconProp) return null;
    if (typeof iconProp === 'string') {
        return <Icon name={iconProp} size="sm" className="w3f-text-gray" />;
    }
    return iconProp;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            type = INPUT_DEFAULTS.type,
            name,
            value,
            onChange,
            error,
            helperText,
            disabled = INPUT_DEFAULTS.disabled,
            required = INPUT_DEFAULTS.required,
            autoComplete,
            autoFocus = INPUT_DEFAULTS.autoFocus,
            leadingIcon,
            trailingIcon,
            onIconClick,
            className = INPUT_DEFAULTS.className,
            unstyled = INPUT_DEFAULTS.unstyled,
            size = INPUT_DEFAULTS.size,
            onBlur,
            bindId,
            mask,
            pattern,
            variant,
            ...props
        },
        ref,
    ) => {
        const formContext = useInputFormContext();
        const inputId = useId();
        const { dispatch } = useBridgeBind({ bindId });

        const isFormControlled = !!(formContext && name);
        const isControlled = isFormControlled || value !== undefined;
        const rawInputValue = isFormControlled ? (formContext.values[name] ?? '') : value;
        const inputError = isFormControlled ? formContext.errors[name] : error;

        // ── Mask ──────────────────────────────────────────────
        const { maskDef, displayValue, cleanValue, formatAndUpdate, placeholder: maskPlaceholder, maxLength: maskMaxLength } = useInputMask(mask, rawInputValue);
        const inputValue = maskDef ? displayValue : rawInputValue;

        // ── Pattern validation ────────────────────────────────
        const { patternError, validateOnBlur } = usePatternValidation(pattern);
        const resolvedError = inputError || patternError;

        const { isFocused, handleFocus, handleBlurFocus } = useInputFocus(disabled);

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            handleBlurFocus(e.target.value !== '');
            if (pattern) validateOnBlur(maskDef ? (cleanValue ?? e.target.value) : e.target.value);
            if (isFormControlled) formContext.handleBlur(e);
            dispatch('blur', { value: e.target.value });
            if (onBlur) onBlur(e);
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (maskDef) {
                const formatted = formatAndUpdate(e.target.value);
                // Create a synthetic-like update for FormContext with clean value
                if (isFormControlled && name) {
                    const clean = maskDef.cleanValue(formatted);
                    const syntheticEvent = { ...e, target: { ...e.target, name, value: clean } } as React.ChangeEvent<HTMLInputElement>;
                    formContext.handleChange(syntheticEvent);
                }
                dispatch('change', { value: maskDef.cleanValue(formatted) });
                if (onChange) onChange(e);
                return;
            }
            if (isFormControlled) formContext.handleChange(e);
            dispatch('change', { value: e.target.value });
            if (onChange) onChange(e);
        };

        const alwaysFloatTypes = ['date', 'time', 'datetime-local', 'month', 'week', 'color'];
        const hasValue = isControlled
            ? (inputValue !== '' && inputValue !== undefined && inputValue !== null)
            : false;
        const isFloating = isFocused || hasValue || alwaysFloatTypes.includes(type);
        const hasError = Boolean(resolvedError);

        return (
            <div className={buildContainerClasses(className, unstyled)}>
                <div className={buildWrapperClasses(size)}>
                    {leadingIcon && (
                        <div className={buildIconClasses('leading')}>
                            {renderIconContent(leadingIcon)}
                        </div>
                    )}

                    <input
                        ref={ref}
                        id={inputId}
                        type={type}
                        name={name}
                        {...(isControlled || maskDef ? { value: inputValue ?? '' } : { defaultValue: '' })}
                        onChange={handleChange}
                        onFocus={(e) => { handleFocus(); dispatch('focus', { value: e.target.value }); }}
                        onBlur={handleBlur}
                        disabled={disabled}
                        required={required}
                        autoComplete={autoComplete}
                        autoFocus={autoFocus}
                        aria-invalid={hasError}
                        aria-describedby={
                            resolvedError
                                ? `${inputId}-error`
                                : helperText
                                  ? `${inputId}-helper`
                                  : undefined
                        }
                        placeholder={maskPlaceholder || props.placeholder}
                        maxLength={maskMaxLength || props.maxLength}
                        className={buildInputClasses(
                            Boolean(leadingIcon),
                            Boolean(trailingIcon),
                            undefined,
                            unstyled,
                            variant,
                        )}
                        {...props}
                    />

                    {trailingIcon && (
                        <div
                            className={buildIconClasses('trailing', Boolean(onIconClick))}
                            onClick={onIconClick}
                            role={onIconClick ? 'button' : undefined}
                        >
                            {renderIconContent(trailingIcon)}
                        </div>
                    )}

                    <label htmlFor={inputId} className={buildLabelClasses(isFloating, !isFloating && Boolean(leadingIcon))}>
                        {label}
                        {required && <span className={INPUT_CLASSES.required}> *</span>}
                    </label>
                </div>

                <div className={INPUT_CLASSES.paddingX}>
                    {resolvedError ? (
                        <p
                            id={`${inputId}-error`}
                            className={`${INPUT_CLASSES.message} ${INPUT_CLASSES.messageError}`}
                            role="alert"
                        >
                            {resolvedError}
                        </p>
                    ) : helperText ? (
                        <p
                            id={`${inputId}-helper`}
                            className={`${INPUT_CLASSES.message} ${INPUT_CLASSES.messageHelper}`}
                        >
                            {helperText}
                        </p>
                    ) : null}
                </div>
            </div>
        );
    },
);

Input.displayName = 'Input';
export { Input };
export default Input;
