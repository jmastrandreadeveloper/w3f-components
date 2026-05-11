import React, { forwardRef, useId, useRef } from 'react';
import { X } from 'lucide-react';
import type { TextFieldProps } from './TextField.types';
import { TEXTFIELD_CLASSES, TEXTFIELD_DEFAULTS } from './TextField.constants';
import { buildContainerClasses, buildWrapperClasses, buildInputClasses, buildLabelClasses, stripDigits, isDigitKey } from './TextField.utils';
import { useTextFieldFormContext, useTextFieldFocus } from './TextField.hooks';

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
    (
        {
            label,
            name,
            value: externalValue,
            onChange: externalOnChange,
            type = TEXTFIELD_DEFAULTS.type,
            error: propError,
            helperText,
            disabled = TEXTFIELD_DEFAULTS.disabled,
            required = TEXTFIELD_DEFAULTS.required,
            size = TEXTFIELD_DEFAULTS.size,
            leadingIcon,
            trailingIcon,
            onIconClick,
            placeholder,
            unstyled = TEXTFIELD_DEFAULTS.unstyled,
            className = '',
            onBlur: onBlurProp,
            onFocus: onFocusProp,
            maxLength,
            showCount = TEXTFIELD_DEFAULTS.showCount,
            clearable = TEXTFIELD_DEFAULTS.clearable,
            onClear,
            autoFocus = TEXTFIELD_DEFAULTS.autoFocus,
            onKeyDown: onKeyDownProp,
            ...props
        },
        ref,
    ) => {
        const formContext = useTextFieldFormContext();
        const isFormControlled = !!(formContext && name);
        const { isFocused, onFocus: onFocusHook, onBlur: onBlurHook } = useTextFieldFocus();
        const inputId = useId();
        const internalRef = useRef<HTMLInputElement>(null);
        const inputRef = (ref as React.RefObject<HTMLInputElement>) ?? internalRef;

        const currentValue = isFormControlled
            ? (formContext.values[name!] ?? '')
            : externalValue !== undefined
              ? externalValue
              : undefined;

        const fieldError = isFormControlled ? formContext.errors[name!] : propError;
        const hasError = Boolean(fieldError);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const filtered = stripDigits(e.target.value);
            if (filtered === e.target.value) {
                // No digits found — propagate normally
                if (isFormControlled && formContext) {
                    formContext.handleChange(e);
                } else if (externalOnChange) {
                    externalOnChange(e);
                }
            } else {
                // Digits were stripped — create a new synthetic event with the clean value
                const syntheticEvent = {
                    ...e,
                    target: { ...e.target, value: filtered, name: e.target.name },
                } as React.ChangeEvent<HTMLInputElement>;
                if (isFormControlled && formContext) {
                    formContext.handleChange(syntheticEvent);
                } else if (externalOnChange) {
                    externalOnChange(syntheticEvent);
                }
            }
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (isDigitKey(e.key)) {
                e.preventDefault();
            }
            if (onKeyDownProp) onKeyDownProp(e);
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

        const handleClear = () => {
            if (isFormControlled && formContext && name) {
                formContext.setFieldValue(name, '');
            } else if (externalOnChange) {
                const syntheticEvent = {
                    target: { name: name ?? '', value: '', type: 'text' },
                } as React.ChangeEvent<HTMLInputElement>;
                externalOnChange(syntheticEvent);
            }
            if (onClear) onClear();
            inputRef.current?.focus();
        };

        const currentLength = String(currentValue ?? '').length;
        const hasValue = currentLength > 0;
        const isFloating = isFocused || hasValue || Boolean(placeholder);

        const showClearButton = clearable && hasValue && !disabled;
        const hasTrailingContent = Boolean(trailingIcon) || showClearButton;

        return (
            <div className={buildContainerClasses(className, unstyled)}>
                <div className={buildWrapperClasses(size)}>
                    {leadingIcon && (
                        <div className={TEXTFIELD_CLASSES.iconLeading}>{leadingIcon}</div>
                    )}

                    <input
                        ref={inputRef}
                        id={inputId}
                        type={type}
                        name={name}
                        value={currentValue}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        disabled={disabled}
                        required={required}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        autoFocus={autoFocus}
                        aria-invalid={hasError}
                        aria-describedby={
                            fieldError
                                ? `${inputId}-error`
                                : helperText
                                  ? `${inputId}-helper`
                                  : undefined
                        }
                        className={buildInputClasses(Boolean(leadingIcon), hasTrailingContent)}
                        {...props}
                    />

                    {(trailingIcon || showClearButton) && (
                        <div
                            className={TEXTFIELD_CLASSES.iconTrailing}
                            onClick={showClearButton ? handleClear : onIconClick}
                            style={{ cursor: showClearButton || onIconClick ? 'pointer' : 'default' }}
                        >
                            {showClearButton ? <X size={16} /> : trailingIcon}
                        </div>
                    )}

                    <label
                        htmlFor={inputId}
                        className={buildLabelClasses(isFloating, !isFloating && Boolean(leadingIcon))}
                    >
                        {label}
                        {required && <span className={TEXTFIELD_CLASSES.required}> *</span>}
                    </label>
                </div>

                <div className={TEXTFIELD_CLASSES.paddingX}>
                    {showCount && maxLength && (
                        <span className={TEXTFIELD_CLASSES.count}>
                            {currentLength}/{maxLength}
                        </span>
                    )}
                    {fieldError ? (
                        <p
                            id={`${inputId}-error`}
                            className={`${TEXTFIELD_CLASSES.message} ${TEXTFIELD_CLASSES.messageError}`}
                            role="alert"
                        >
                            {fieldError}
                        </p>
                    ) : helperText ? (
                        <p
                            id={`${inputId}-helper`}
                            className={`${TEXTFIELD_CLASSES.message} ${TEXTFIELD_CLASSES.messageHelper}`}
                        >
                            {helperText}
                        </p>
                    ) : null}
                </div>
            </div>
        );
    },
);

TextField.displayName = 'TextField';
export { TextField };
export default TextField;
