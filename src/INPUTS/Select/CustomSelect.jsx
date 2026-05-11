import React, { useState, useId, forwardRef } from 'react';
import { useFormContext } from '../../../components/INPUTS/Form/Form';

// Icono de flecha hacia abajo por defecto (SVG simple)
const DefaultChevron = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const CustomSelect = forwardRef(({
  label,
  name,
  options = [],
  value: externalValue,
  onChange: externalOnChange,
  error: propError,
  helperText,
  disabled = false,
  required = false,
  multiple = false,
  autoFocus = false,
  leadingIcon,
  trailingIcon,
  className = '',
  onBlur: externalOnBlur,
  ...props
}, ref) => {
  // ✅ Integración con Form Context
  const formContext = useFormContext();
  const isFormControlled = !!(formContext && name);

  // ✅ Estado interno como fallback
  const [internalValue, setInternalValue] = useState(multiple ? [] : '');
  const [isFocused, setIsFocused] = useState(false);
  const inputId = useId();

  // ✅ DETERMINACIÓN INTELIGENTE DEL VALOR ACTUAL
  // Prioridad: FormContext > prop value > estado interno
  const currentValue = isFormControlled
    ? (formContext.values[name] !== undefined ? formContext.values[name] : (multiple ? [] : ''))
    : (externalValue !== undefined ? externalValue : internalValue);

  // ✅ Obtener error del contexto o props
  const inputError = isFormControlled ? formContext.errors[name] : propError;
  const hasError = Boolean(inputError);

  // ✅ MANEJADOR DE CAMBIO UNIFICADO
  const handleChange = (e) => {
    let value;

    if (multiple) {
      // Para select múltiple, extraer array de valores seleccionados
      value = Array.from(e.target.options)
        .filter(option => option.selected)
        .map(option => option.value);
    } else {
      value = e.target.value;
    }

    // 1. Si está controlado por FormContext
    if (isFormControlled && formContext) {
      formContext.handleChange(e);
    }
    // 2. Si tiene onChange externo (componente controlado)
    else if (externalOnChange) {
      if (multiple) {
        externalOnChange(value); // Para múltiple, pasar el array directamente
      } else {
        externalOnChange(e); // Para simple, pasar el evento
      }
    }
    // 3. Fallback: usar estado interno (componente no controlado)
    else {
      setInternalValue(value);
    }
  };

  const handleFocus = () => {
    if (!disabled) {
      setIsFocused(true);
    }
  };

  const handleBlur = (e) => {
    setIsFocused(false);

    // 1. Si está controlado por FormContext
    if (isFormControlled && formContext) {
      formContext.handleBlur(e);
    }
    // 2. Si tiene onBlur externo
    if (externalOnBlur) {
      externalOnBlur(e);
    }
  };

  // Lógica para detectar si hay valor (para flotar el label)
  const hasValue = Array.isArray(currentValue)
    ? currentValue.length > 0
    : currentValue !== '' && currentValue !== null && currentValue !== undefined;

  const isFloating = isFocused || hasValue;

  // --- LÓGICA DE ESTILOS ---
  const getMainColor = () => {
    if (hasError) return 'var(--w3f-danger, #dc2626)';
    if (isFocused) return 'var(--w3f-primary, #2563eb)';
    return 'var(--w3f-gray-400, #9ca3af)';
  };

  const getBorderColor = () => {
    if (hasError) return 'var(--w3f-danger, #dc2626)';
    if (isFocused) return 'var(--w3f-primary, #2563eb)';
    return 'var(--w3f-gray-300, #d1d5db)';
  };

  const labelStyle = {
    position: 'absolute',
    left: '12px',
    top: isFloating ? '-10px' : '50%',
    transform: isFloating ? 'none' : 'translateY(-50%)',
    fontSize: isFloating ? '0.75rem' : '1rem',
    color: getMainColor(),
    backgroundColor: 'var(--w3f-surface, #ffffff)',
    padding: '0 4px',
    transition: 'all 0.2s ease-out',
    pointerEvents: 'none',
    zIndex: 10,
    marginLeft: (!isFloating && leadingIcon) ? '28px' : '0'
  };

  // Renderizado recursivo de opciones
  const renderOptions = (items) => {
    return items.map((item, index) => {
      if (item.options) {
        return (
          <optgroup key={`group-${index}`} label={item.label} disabled={item.disabled}>
            {renderOptions(item.options)}
          </optgroup>
        );
      }
      return (
        <option
          key={`opt-${index}`}
          value={item.value === null || item.value === undefined ? '' : item.value}
          disabled={item.disabled}
        >
          {item.label}
        </option>
      );
    });
  };

  // Icono final: usa el prop o el defecto, excepto si es múltiple
  const finalTrailingIcon = trailingIcon || (!multiple ? <DefaultChevron /> : null);

  return (
    <div className={`w3f-relative w3f-mb-6 ${className}`}>
      <div className="w3f-relative w3f-flex w3f-items-center">

        {/* Leading Icon */}
        {leadingIcon && (
          <div
            className="w3f-absolute w3f-left-3 w3f-flex w3f-items-center w3f-justify-center"
            style={{
              color: getMainColor(),
              pointerEvents: 'none',
              height: '100%',
              zIndex: 5
            }}
          >
            {leadingIcon}
          </div>
        )}

        {/* SELECT */}
        <select
          ref={ref}
          id={inputId}
          name={name}
          value={currentValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          multiple={multiple}
          autoFocus={autoFocus}
          aria-invalid={hasError}
          aria-describedby={inputError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          style={{
            width: '100%',
            paddingTop: '12px',
            paddingBottom: '12px',
            paddingLeft: leadingIcon ? '40px' : '12px',
            paddingRight: finalTrailingIcon ? '40px' : '12px',

            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: getBorderColor(),
            borderRadius: '8px',

            outline: 'none',
            backgroundColor: disabled ? 'var(--w3f-gray-100, #f3f4f6)' : 'transparent',
            color: disabled ? 'var(--w3f-gray-500, #9ca3af)' : 'inherit',
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'border-color 0.2s',

            // Ocultar apariencia nativa para consistencia visual
            appearance: 'none',
            WebkitAppearance: 'none',
            MozAppearance: 'none',

            // Ajuste de altura para Select multiple
            height: multiple ? 'auto' : undefined,
            minHeight: multiple ? '100px' : undefined
          }}
          className="w3f-block"
          {...props}
        >
          {/* Opción vacía oculta para permitir que funcione el floating label */}
          {!multiple && <option value="" disabled hidden></option>}
          {renderOptions(options)}
        </select>

        {/* Trailing Icon (Arrow) */}
        {finalTrailingIcon && (
          <div
            className="w3f-absolute w3f-right-3 w3f-flex w3f-items-center w3f-justify-center"
            style={{
              color: getMainColor(),
              pointerEvents: 'none',
              height: '100%'
            }}
          >
            {finalTrailingIcon}
          </div>
        )}

        {/* Label flotante */}
        <label htmlFor={inputId} style={labelStyle}>
          {label}
          {required && <span style={{ color: 'var(--w3f-danger, #dc2626)' }}> *</span>}
        </label>
      </div>

      {/* Mensajes (Error o Helper) */}
      <div className="w3f-px-1">
        {inputError ? (
          <p
            id={`${inputId}-error`}
            style={{ color: 'var(--w3f-danger, #dc2626)', fontSize: '0.75rem', marginTop: '4px' }}
            role="alert"
          >
            {inputError}
          </p>
        ) : helperText ? (
          <p
            id={`${inputId}-helper`}
            style={{ color: 'var(--w3f-gray-400, #9ca3af)', fontSize: '0.75rem', marginTop: '4px' }}
          >
            {helperText}
          </p>
        ) : null}
      </div>
    </div>
  );
});

CustomSelect.displayName = 'CustomSelect';

export default CustomSelect;