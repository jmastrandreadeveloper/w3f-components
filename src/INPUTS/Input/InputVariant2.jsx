import React, { useState, useId, forwardRef } from 'react';

const InputVariant2 = forwardRef(({ 
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
  const inputId = useId();

  const handleFocus = () => !disabled && setIsFocused(true);
  const handleBlur = (e) => {
    if (e.target.value === '') {
      setIsFocused(false);
    }
    // Si pasaste un onBlur en props extras, ejecutarlo
    if (props.onBlur) props.onBlur(e);
  };

  const hasValue = value !== '';
  const isFloating = isFocused || hasValue;
  const hasError = Boolean(error);

  // --- LÓGICA DE ESTILOS ---

  // Colores según estado
  const getMainColor = () => {
    if (hasError) return 'var(--w3f-danger, #dc2626)';
    if (isFocused) return 'var(--w3f-primary, #2563eb)';
    return 'var(--w3f-gray-400, #9ca3af)';
  };

  const getBorderColor = () => {
    if (hasError) return 'var(--w3f-danger, #dc2626)';
    if (isFocused) return 'var(--w3f-primary, #2563eb)';
    return 'var(--w3f-gray-300, #d1d5db)'; // Color de borde suave por defecto
  };

  // Estilo del Label
  const labelStyle = {
    position: 'absolute',
    left: '12px', // Alineado un poco más adentro
    top: isFloating ? '-10px' : '50%',
    transform: isFloating ? 'none' : 'translateY(-50%)',
    fontSize: isFloating ? '0.75rem' : '1rem',
    color: getMainColor(),
    backgroundColor: isFloating ? 'white' : 'transparent', // Fondo blanco para tapar el borde al flotar
    padding: '0 4px', // Espacio para que el fondo blanco respire
    transition: 'all 0.2s ease-out',
    pointerEvents: 'none',
    zIndex: 10,
    // Si hay icono leading y NO está flotando, empujamos el label
    marginLeft: (!isFloating && leadingIcon) ? '28px' : '0' 
  };

  return (
    <div className={`w3f-relative w3f-mb-6 ${className}`}>
      <div className="w3f-relative w3f-flex w3f-items-center">
        
        {/* Leading Icon */}
        {leadingIcon && (
          <div 
            className="w3f-absolute w3f-left-3 w3f-flex w3f-items-center w3f-justify-center"
            style={{ 
              color: getMainColor(),
              pointerEvents: 'none', // Para que el click pase al input
              height: '100%'
            }}
          >
            {leadingIcon}
          </div>
        )}

        {/* INPUT */}
        <input
          ref={ref}
          id={inputId}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          aria-invalid={hasError}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          // Estilos directos para asegurar padding y borde
          style={{
            width: '100%',
            paddingTop: '12px',
            paddingBottom: '12px',
            // PADDING DINÁMICO: Deja 40px si hay icono, sino 12px estándar
            paddingLeft: leadingIcon ? '40px' : '12px',
            paddingRight: trailingIcon ? '40px' : '12px',
            
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: getBorderColor(),
            borderRadius: '8px', // Bordes redondeados
            
            outline: 'none',
            backgroundColor: disabled ? '#f3f4f6' : 'transparent',
            color: disabled ? '#9ca3af' : 'inherit',
            cursor: disabled ? 'not-allowed' : 'text',
            transition: 'border-color 0.2s'
          }}
          className="w3f-block" // Clase base mínima
          {...props}
        />

        {/* Trailing Icon */}
        {trailingIcon && (
          <div 
            className="w3f-absolute w3f-right-3 w3f-flex w3f-items-center w3f-justify-center"
            style={{ 
              color: getMainColor(),
              cursor: onIconClick ? 'pointer' : 'default',
              height: '100%'
            }}
            onClick={onIconClick}
          >
            {trailingIcon}
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

InputVariant2.displayName = 'Input';

export default InputVariant2;