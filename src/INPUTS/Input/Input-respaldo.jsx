import React, { useState, useId, forwardRef } from 'react';
import { useFormContext } from '../Form/Form.jsx';

const Input = forwardRef(({
  label,
  type = 'text',
  name,
  value,
  onChange,
  error,
  helperText,
  disabled = false,
  required = false,
  autoComplete,
  autoFocus = false,
  leadingIcon,
  trailingIcon,
  onIconClick,
  className = '',
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const formContext = useFormContext();
  const inputId = useId();

  // Determine if we are controlled by FormContext
  const isFormControlled = formContext && name;

  // Get values from context or props
  const inputValue = isFormControlled ? (formContext.values[name] || '') : value;
  const inputError = isFormControlled ? formContext.errors[name] : error;

  const handleFocus = () => !disabled && setIsFocused(true);

  const handleBlur = (e) => {
    if (e.target.value === '') {
      setIsFocused(false);
    }
    if (isFormControlled) {
      formContext.handleBlur(e);
    }
    if (props.onBlur) props.onBlur(e);
  };

  const handleChangeInternal = (e) => {
    if (isFormControlled) {
      formContext.handleChange(e);
    }
    if (onChange) {
      onChange(e);
    }
  };

  const hasValue = inputValue !== '' && inputValue !== undefined && inputValue !== null;
  const isFloating = isFocused || hasValue;
  const hasError = Boolean(inputError);

  // Construcción de clases dinámicas
  const inputClasses = [
    'w3f-input',
    leadingIcon && 'w3f-input--has-leading',
    trailingIcon && 'w3f-input--has-trailing',
    className
  ].filter(Boolean).join(' ');

  const labelClasses = [
    'w3f-input-label',
    isFloating && 'w3f-input-label--floating',
    (!isFloating && leadingIcon) && 'w3f-input-label--shifted'
  ].filter(Boolean).join(' ');

  return (
    <div className={`w3f-input-container ${className}`}>
      <div className="w3f-input-wrapper">

        {/* Leading Icon */}
        {leadingIcon && (
          <div className="w3f-input-icon w3f-input-icon--leading">
            {leadingIcon}
          </div>
        )}

        {/* INPUT */}
        <input
          ref={ref}
          id={inputId}
          type={type}
          name={name}
          value={inputValue}
          onChange={handleChangeInternal}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          aria-invalid={hasError}
          aria-describedby={inputError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          className={inputClasses}
          {...props}
        />

        {/* Trailing Icon */}
        {trailingIcon && (
          <div
            className={`w3f-input-icon w3f-input-icon--trailing ${onIconClick ? 'w3f-input-icon--clickable' : ''}`}
            onClick={onIconClick}
          >
            {trailingIcon}
          </div>
        )}

        {/* Label flotante */}
        <label htmlFor={inputId} className={labelClasses}>
          {label}
          {required && <span className="w3f-input-required"> *</span>}
        </label>
      </div>

      {/* Mensajes (Error o Helper) */}
      <div className="w3f-px-1">
        {inputError ? (
          <p
            id={`${inputId}-error`}
            className="w3f-input-message w3f-input-message--error"
            role="alert"
          >
            {inputError}
          </p>
        ) : helperText ? (
          <p
            id={`${inputId}-helper`}
            className="w3f-input-message w3f-input-message--helper"
          >
            {helperText}
          </p>
        ) : null}
      </div>
    </div>
  );
});

Input.displayName = 'Input';

export default Input;