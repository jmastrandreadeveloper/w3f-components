import React, { forwardRef, useId, useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import type { PasswordFieldProps } from './PasswordField.types';
import { PASSWORDFIELD_CLASSES, PASSWORDFIELD_DEFAULTS, STRENGTH_LABELS, STRENGTH_SEGMENTS } from './PasswordField.constants';
import {
    buildContainerClasses,
    buildWrapperClasses,
    buildInputClasses,
    buildLabelClasses,
    buildStrengthSegmentClasses,
    getPasswordStrength,
} from './PasswordField.utils';
import {
    usePasswordFieldFormContext,
    usePasswordFieldFocus,
    usePasswordVisibility,
} from './PasswordField.hooks';

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
    (
        {
            label,
            name,
            value: externalValue,
            onChange: externalOnChange,
            error: propError,
            helperText,
            disabled = PASSWORDFIELD_DEFAULTS.disabled,
            required = PASSWORDFIELD_DEFAULTS.required,
            size = PASSWORDFIELD_DEFAULTS.size,
            showStrength = PASSWORDFIELD_DEFAULTS.showStrength,
            unstyled = PASSWORDFIELD_DEFAULTS.unstyled,
            className = '',
            onBlur: onBlurProp,
            onFocus: onFocusProp,
            placeholder,
            autoFocus,
            ...props
        },
        ref,
    ) => {
        const formContext = usePasswordFieldFormContext();
        const isFormControlled = !!(formContext && name);
        const { isFocused, onFocus: onFocusHook, onBlur: onBlurHook } = usePasswordFieldFocus();
        const { showPassword, toggleVisibility } = usePasswordVisibility();
        const [internalValue, setInternalValue] = useState('');
        const inputId = useId();

        const currentValue = isFormControlled
            ? (formContext.values[name!] ?? '')
            : externalValue !== undefined
              ? externalValue   // controlado externamente
              : internalValue;  // standalone: estado interno

        const fieldError = isFormControlled ? formContext.errors[name!] : propError;
        const hasError = Boolean(fieldError);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = e.target.value;
            if (isFormControlled && formContext) {
                formContext.handleChange(e);
            } else if (externalOnChange) {
                externalOnChange(e);
            } else {
                setInternalValue(val);
            }
        };

        const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
            if (!disabled) onFocusHook();
            if (onFocusProp) onFocusProp(e);
        };

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            onBlurHook();
            if (isFormControlled && formContext) formContext.handleBlur(e);
            if (onBlurProp) onBlurProp(e);
        };

        const hasValue = String(currentValue ?? '').length > 0;
        const isFloating = isFocused || hasValue || Boolean(placeholder);

        const strength = showStrength ? getPasswordStrength(String(currentValue ?? '')) : null;
        const activeSegments = strength ? STRENGTH_SEGMENTS[strength] : 0;

        return (
            <div className={buildContainerClasses(className, unstyled)}>
                <div className={buildWrapperClasses(size)}>
                    <div className={PASSWORDFIELD_CLASSES.iconLeading}>
                        <Lock size={16} />
                    </div>

                    <input
                        ref={ref}
                        id={inputId}
                        type={showPassword ? 'text' : 'password'}
                        name={name}
                        value={currentValue}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        disabled={disabled}
                        required={required}
                        placeholder={placeholder}
                        autoFocus={autoFocus}
                        autoComplete={showPassword ? 'off' : 'current-password'}
                        aria-invalid={hasError}
                        aria-describedby={
                            fieldError
                                ? `${inputId}-error`
                                : helperText
                                  ? `${inputId}-helper`
                                  : undefined
                        }
                        className={buildInputClasses()}
                        {...props}
                    />

                    <button
                        type="button"
                        tabIndex={-1}
                        onClick={toggleVisibility}
                        disabled={disabled}
                        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        className={PASSWORDFIELD_CLASSES.iconTrailing}
                        style={{ background: 'none', border: 'none', padding: 0, cursor: disabled ? 'not-allowed' : 'pointer' }}
                    >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>

                    <label htmlFor={inputId} className={buildLabelClasses(isFloating)}>
                        {label ?? 'Contraseña'}
                        {required && <span className={PASSWORDFIELD_CLASSES.required}> *</span>}
                    </label>
                </div>

                {showStrength && hasValue && strength && (
                    <div className={`${PASSWORDFIELD_CLASSES.paddingX} ${PASSWORDFIELD_CLASSES.strength}`}>
                        <div className={PASSWORDFIELD_CLASSES.strengthBar}>
                            {[0, 1, 2].map((i) => (
                                <div
                                    key={i}
                                    className={buildStrengthSegmentClasses(i, activeSegments, strength)}
                                />
                            ))}
                        </div>
                        <span
                            className={`${PASSWORDFIELD_CLASSES.strengthLabel} ${PASSWORDFIELD_CLASSES.strengthModifiers[strength]}`}
                        >
                            {STRENGTH_LABELS[strength]}
                        </span>
                    </div>
                )}

                <div className={PASSWORDFIELD_CLASSES.paddingX}>
                    {fieldError ? (
                        <p
                            id={`${inputId}-error`}
                            className={`${PASSWORDFIELD_CLASSES.message} ${PASSWORDFIELD_CLASSES.messageError}`}
                            role="alert"
                        >
                            {fieldError}
                        </p>
                    ) : helperText ? (
                        <p
                            id={`${inputId}-helper`}
                            className={`${PASSWORDFIELD_CLASSES.message} ${PASSWORDFIELD_CLASSES.messageHelper}`}
                        >
                            {helperText}
                        </p>
                    ) : null}
                </div>
            </div>
        );
    },
);

PasswordField.displayName = 'PasswordField';
export { PasswordField };
export default PasswordField;
