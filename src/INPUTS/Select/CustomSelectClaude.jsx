import React, { useState, useId, forwardRef, useMemo } from 'react';

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

/**
 * CustomSelect Component
 * 
 * @param {Object} props
 * @param {string} props.label - Etiqueta del select
 * @param {string} props.name - Nombre del campo
 * @param {Array} props.options - Array de opciones. Formato: [{value, label, disabled?}, ...] o con optgroups: [{label, options: [...], disabled?}]
 * @param {string|Array} props.value - Valor seleccionado (string para simple, array para múltiple)
 * @param {Function} props.onChange - Callback cuando cambia el valor
 * @param {string} props.error - Mensaje de error
 * @param {string} props.helperText - Texto de ayuda
 * @param {boolean} props.disabled - Si está deshabilitado
 * @param {boolean} props.required - Si es requerido
 * @param {boolean} props.multiple - Si permite múltiple selección
 * @param {boolean} props.autoFocus - Si debe auto-enfocarse
 * @param {React.ReactNode} props.leadingIcon - Icono al inicio
 * @param {React.ReactNode} props.trailingIcon - Icono al final (por defecto muestra flecha)
 * @param {string} props.placeholder - Texto placeholder cuando no hay selección
 * @param {boolean} props.allowDeselect - Permite deseleccionar en select simple
 * @param {string} props.className - Clases CSS adicionales
 */
const CustomSelectClaude = forwardRef(({
  label,
  name,
  options = [],
  value,
  onChange,
  error,
  helperText,
  disabled = false,
  required = false,
  multiple = false,
  autoFocus = false,
  leadingIcon,
  trailingIcon,
  placeholder = '',
  allowDeselect = false,
  className = '',
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputId = useId();

  const handleFocus = () => !disabled && setIsFocused(true);

  const handleBlur = (e) => {
    setIsFocused(false);
    if (props.onBlur) props.onBlur(e);
  };

  // Lógica mejorada para detectar si hay valor (memoizada para performance)
  const hasValue = useMemo(() => {
    if (Array.isArray(value)) return value.length > 0;
    return value !== '' && value !== null && value !== undefined;
  }, [value]);

  const isFloating = isFocused || hasValue;
  const hasError = Boolean(error);

  // Validación de options
  const validOptions = useMemo(() => {
    if (!Array.isArray(options)) {
      console.warn('CustomSelect: options debe ser un array');
      return [];
    }
    return options;
  }, [options]);

  // Renderizado recursivo de opciones
  const renderOptions = (items) => {
    if (!items || items.length === 0) return null;

    return items.map((item, index) => {
      // Validación de estructura de item
      if (!item || typeof item !== 'object') {
        console.warn(`CustomSelect: Opción en índice ${index} inválida`);
        return null;
      }

      // Optgroup
      if (item.options) {
        return (
          <optgroup
            key={`group-${item.label}-${index}`}
            label={item.label || `Grupo ${index}`}
            disabled={item.disabled}
          >
            {renderOptions(item.options)}
          </optgroup>
        );
      }

      // Opción regular
      const optionValue = item.value === null || item.value === undefined ? '' : item.value;
      const optionLabel = item.label !== undefined ? item.label : optionValue;

      return (
        <option
          key={`opt-${optionValue}-${index}`}
          value={optionValue}
          disabled={item.disabled}
        >
          {optionLabel}
        </option>
      );
    });
  };

  const handleMultipleChange = (event) => {
    if (!onChange) return;

    const selectedOptions = Array.from(event.target.options)
      .filter(option => option.selected)
      .map(option => option.value);

    onChange(selectedOptions);
  };

  const handleSingleChange = (event) => {
    if (!onChange) return;
    onChange(event);
  };

  // Icono final: usa el prop o el defecto, excepto si es múltiple
  const finalTrailingIcon = trailingIcon !== undefined
    ? trailingIcon
    : (!multiple ? <DefaultChevron /> : null);

  // Construcción de clases dinámicas
  const selectClasses = [
    'w3f-select',
    leadingIcon && 'w3f-select--has-leading',
    finalTrailingIcon && 'w3f-select--has-trailing',
    hasError && 'w3f-select--error',
    isFocused && 'w3f-select--focused',
    disabled && 'w3f-select--disabled',
    multiple && 'w3f-select--multiple',
  ].filter(Boolean).join(' ');

  const labelClasses = [
    'w3f-select-label',
    isFloating && 'w3f-select-label--floating',
    (!isFloating && leadingIcon) && 'w3f-select-label--shifted',
    hasError && 'w3f-select-label--error',
    isFocused && 'w3f-select-label--focused',
  ].filter(Boolean).join(' ');

  const trailingIconClasses = [
    'w3f-select-icon',
    'w3f-select-icon--trailing',
    isFocused && !multiple && 'w3f-select-icon--rotated',
    hasError && 'w3f-select-icon--error',
    isFocused && 'w3f-select-icon--focused',
  ].filter(Boolean).join(' ');

  return (
    <div className={`w3f-select-container ${className}`}>
      <div className="w3f-select-wrapper">

        {/* Leading Icon */}
        {leadingIcon && (
          <div className="w3f-select-icon w3f-select-icon--leading">
            {leadingIcon}
          </div>
        )}

        {/* SELECT */}
        <select
          ref={ref}
          id={inputId}
          name={name}
          value={value}
          onChange={multiple ? handleMultipleChange : handleSingleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          multiple={multiple}
          autoFocus={autoFocus}
          aria-invalid={hasError}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          className={selectClasses}
          {...props}
        >
          {/* Opción placeholder/vacía para select simple */}
          {!multiple && (
            <option
              value=""
              disabled={!allowDeselect && required}
              hidden={!placeholder && hasValue}
            >
              {placeholder || ''}
            </option>
          )}

          {renderOptions(validOptions)}
        </select>

        {/* Trailing Icon (Arrow) */}
        {finalTrailingIcon && (
          <div className={trailingIconClasses}>
            {finalTrailingIcon}
          </div>
        )}

        {/* Label flotante */}
        <label htmlFor={inputId} className={labelClasses}>
          {label}
          {required && <span className="w3f-select-required"> *</span>}
        </label>
      </div>

      {/* Mensajes (Error o Helper) */}
      <div className="w3f-px-1">
        {error ? (
          <p
            id={`${inputId}-error`}
            className="w3f-select-message w3f-select-message--error"
            role="alert"
          >
            {error}
          </p>
        ) : helperText ? (
          <p
            id={`${inputId}-helper`}
            className="w3f-select-message w3f-select-message--helper"
          >
            {helperText}
          </p>
        ) : null}
      </div>
    </div>
  );
});

CustomSelectClaude.displayName = 'CustomSelect';

export default CustomSelectClaude;