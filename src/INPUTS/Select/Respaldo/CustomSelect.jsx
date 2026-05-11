import React, { useState, useId, forwardRef } from 'react';

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
  value, 
  onChange, 
  error, 
  helperText, 
  disabled = false, 
  required = false, 
  multiple = false,
  autoFocus = false,
  leadingIcon,
  trailingIcon, // Si no se pasa, usaremos el DefaultChevron
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

  // Lógica para detectar si hay valor (para flotar el label)
  const hasValue = Array.isArray(value) ? value.length > 0 : value !== '' && value !== null && value !== undefined;
  const isFloating = isFocused || hasValue;
  const hasError = Boolean(error);

  // --- LÓGICA DE ESTILOS (Idéntica a Input.jsx) ---
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
    backgroundColor: 'white', // Necesario para tapar el borde
    padding: '0 4px',
    transition: 'all 0.2s ease-out',
    pointerEvents: 'none',
    zIndex: 10,
    marginLeft: (!isFloating && leadingIcon) ? '28px' : '0' 
  };

  // Renderizado recursivo de opciones (Mantenido del original)
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

  const handleMultipleChange = (event) => {
    const selectedOptions = Array.from(event.target.options)
      .filter(option => option.selected)
      .map(option => option.value);
    onChange(selectedOptions); // Asume que el padre maneja el array
  };

  // Icono final: usas el prop o el defecto, excepto si es múltiple (las listas múltiples no suelen llevar flecha)
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
          value={value}
          onChange={multiple ? handleMultipleChange : onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          multiple={multiple}
          autoFocus={autoFocus}
          aria-invalid={hasError}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          style={{
            width: '100%',
            paddingTop: '12px',
            paddingBottom: '12px',
            paddingLeft: leadingIcon ? '40px' : '12px',
            // Padding derecho extra para evitar que el texto pise la flecha
            paddingRight: finalTrailingIcon ? '40px' : '12px',
            
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: getBorderColor(),
            borderRadius: '8px',
            
            outline: 'none',
            backgroundColor: disabled ? '#f3f4f6' : 'transparent',
            color: disabled ? '#9ca3af' : 'inherit',
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'border-color 0.2s',
            
            // Ocultar apariencia nativa para consistencia visual (crucial para Custom Selects)
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
          {/* Opción vacía oculta para permitir que funcione el floating label cuando no hay selección */}
          {!multiple && <option value="" disabled hidden></option>}
          {renderOptions(options)}
        </select>

        {/* Trailing Icon (Arrow) */}
        {finalTrailingIcon && (
          <div 
            className="w3f-absolute w3f-right-3 w3f-flex w3f-items-center w3f-justify-center"
            style={{ 
              color: getMainColor(),
              pointerEvents: 'none', // Click pass-through
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
        {error ? (
          <p 
            id={`${inputId}-error`}
            style={{ color: 'var(--w3f-danger, #dc2626)', fontSize: '0.75rem', marginTop: '4px' }}
            role="alert"
          >
            {error}
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