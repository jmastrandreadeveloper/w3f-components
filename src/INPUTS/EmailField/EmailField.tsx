import React, { forwardRef, useId, useState } from 'react';
import { Mail } from 'lucide-react';
import type { EmailFieldProps } from './EmailField.types';
import { EMAILFIELD_CLASSES, EMAILFIELD_DEFAULTS } from './EmailField.constants';
import { buildContainerClasses, buildWrapperClasses, buildInputClasses, buildLabelClasses, isValidEmail } from './EmailField.utils';
import { useEmailFieldFormContext, useEmailFieldFocus } from './EmailField.hooks';

const EmailField = forwardRef<HTMLInputElement, EmailFieldProps>(
    (
        {
            label,
            name,
            value: externalValue,
            onChange: externalOnChange,
            error: propError,
            helperText,
            disabled = EMAILFIELD_DEFAULTS.disabled,
            required = EMAILFIELD_DEFAULTS.required,
            size = EMAILFIELD_DEFAULTS.size,
            unstyled = EMAILFIELD_DEFAULTS.unstyled,
            className = '',
            onBlur: onBlurProp,
            onFocus: onFocusProp,
            validateOnChange = EMAILFIELD_DEFAULTS.validateOnChange,
            placeholder,
            autoFocus,
            ...props
        },
        ref,
    ) => {
        const formContext = useEmailFieldFormContext();
        const isFormControlled = !!(formContext && name);
        const { isFocused, onFocus: onFocusHook, onBlur: onBlurHook } = useEmailFieldFocus();
        const [internalError, setInternalError] = useState<string | undefined>(undefined);
        const [internalValue, setInternalValue] = useState('');
        const inputId = useId();

        const currentValue = isFormControlled
            ? (formContext.values[name!] ?? '')
            : externalValue !== undefined
              ? externalValue   // controlado externamente
              : internalValue;  // standalone: estado interno

        const contextError = isFormControlled ? formContext.errors[name!] : propError;
        // La validación interna de formato solo actúa si no hay error externo
        const fieldError = contextError || internalError;
        const hasError = Boolean(fieldError);

        const validateFormat = (value: string) => {
            if (value && !isValidEmail(value)) {
                setInternalError('Formato de email inválido');
            } else {
                setInternalError(undefined);
            }
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = e.target.value;
            if (validateOnChange) validateFormat(val);
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
            validateFormat(e.target.value);
            if (isFormControlled && formContext) formContext.handleBlur(e);
            if (onBlurProp) onBlurProp(e);
        };

        const hasValue = String(currentValue ?? '').length > 0;
        const isFloating = isFocused || hasValue || Boolean(placeholder);

        return (
            <div className={buildContainerClasses(className, unstyled)}>
                <div className={buildWrapperClasses(size)}>
                    <div className={EMAILFIELD_CLASSES.iconLeading}>
                        <Mail size={16} />
                    </div>

                    <input
                        ref={ref}
                        id={inputId}
                        type="text"
                        inputMode="email"
                        name={name}
                        value={currentValue}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        disabled={disabled}
                        required={required}
                        placeholder={placeholder}
                        autoFocus={autoFocus}
                        autoComplete="email"
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

                    <label htmlFor={inputId} className={buildLabelClasses(isFloating)}>
                        {label ?? 'Email'}
                        {required && <span className={EMAILFIELD_CLASSES.required}> *</span>}
                    </label>
                </div>

                <div className={EMAILFIELD_CLASSES.paddingX}>
                    {fieldError ? (
                        <p
                            id={`${inputId}-error`}
                            className={`${EMAILFIELD_CLASSES.message} ${EMAILFIELD_CLASSES.messageError}`}
                            role="alert"
                        >
                            {fieldError}
                        </p>
                    ) : helperText ? (
                        <p
                            id={`${inputId}-helper`}
                            className={`${EMAILFIELD_CLASSES.message} ${EMAILFIELD_CLASSES.messageHelper}`}
                        >
                            {helperText}
                        </p>
                    ) : null}
                </div>
            </div>
        );
    },
);

EmailField.displayName = 'EmailField';
export { EmailField };
export default EmailField;
