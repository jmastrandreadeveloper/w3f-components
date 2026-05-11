import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from '../Form/Form.jsx';

/**
 * ToggleButton Component - W3F Framework
 * 
 * Componente de botón toggle que puede usarse individualmente o dentro de un ToggleButtonGroup.
 * 
 * @component
 * @example
 * <ToggleButton value="bold" selected={true} onChange={handleChange}>
 *   Bold
 * </ToggleButton>
 */
const ToggleButton = ({
  children,
  value,
  selected = false,
  onChange,
  color = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled = false,
  'aria-label': ariaLabel,
  ...props
}) => {
  // Construcción dinámica de clases siguiendo metodología BEM
  const classes = [
    'w3f-toggle-button',
    selected && 'w3f-toggle-button--selected',
    selected && color !== 'primary' && `w3f-toggle-button--${color}`,
    `w3f-toggle-button--${size}`,
    fullWidth && 'w3f-toggle-button--full',
    disabled && 'w3f-toggle-button--disabled',
    className
  ].filter(Boolean).join(' ');

  const handleClick = (event) => {
    if (!disabled && onChange) {
      onChange(event, value);
    }
  };

  const handleKeyDown = (event) => {
    // Mejora de accesibilidad: activar con Space o Enter
    if ((event.key === ' ' || event.key === 'Enter') && !disabled) {
      event.preventDefault();
      handleClick(event);
    }
  };

  return (
    <button
      type="button"
      role="button"
      className={classes}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-pressed={selected}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      {...props}
    >
      {children}
    </button>
  );
};

ToggleButton.propTypes = {
  /** Contenido del botón */
  children: PropTypes.node.isRequired,
  /** Valor único que identifica este botón */
  value: PropTypes.any.isRequired,
  /** Estado de selección */
  selected: PropTypes.bool,
  /** Callback cuando cambia la selección: (event, value) => void */
  onChange: PropTypes.func,
  /** Color del botón cuando está seleccionado */
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info']),
  /** Tamaño del botón */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Si el botón ocupa todo el ancho disponible */
  fullWidth: PropTypes.bool,
  /** Clases CSS adicionales */
  className: PropTypes.string,
  /** Estado deshabilitado */
  disabled: PropTypes.bool,
  /** Etiqueta ARIA para accesibilidad */
  'aria-label': PropTypes.string,
};

/**
 * ToggleButtonGroup Component - W3F Framework
 * 
 * Componente que gestiona la lógica de selección de múltiples ToggleButtons.
 * Compatible con Form y LiveForm mediante Context API.
 *
 * @component
 * @example
 * // Modo exclusivo (radio) - uso independiente
 * <ToggleButtonGroup value="left" onChange={handleChange} exclusive>
 *   <ToggleButton value="left">Left</ToggleButton>
 *   <ToggleButton value="center">Center</ToggleButton>
 *   <ToggleButton value="right">Right</ToggleButton>
 * </ToggleButtonGroup>
 * 
 * @example
 * // Modo múltiple (checkbox) - uso independiente
 * <ToggleButtonGroup value={['bold', 'italic']} onChange={handleChange}>
 *   <ToggleButton value="bold">Bold</ToggleButton>
 *   <ToggleButton value="italic">Italic</ToggleButton>
 *   <ToggleButton value="underline">Underline</ToggleButton>
 * </ToggleButtonGroup>
 * 
 * @example
 * // Dentro de un Form - modo exclusivo
 * <Form initialValues={{ alignment: 'left' }}>
 *   <ToggleButtonGroup name="alignment" exclusive label="Alineación">
 *     <ToggleButton value="left">Izquierda</ToggleButton>
 *     <ToggleButton value="center">Centro</ToggleButton>
 *     <ToggleButton value="right">Derecha</ToggleButton>
 *   </ToggleButtonGroup>
 * </Form>
 * 
 * @example
 * // Dentro de un LiveForm - modo múltiple
 * <LiveForm 
 *   initialValues={{ textFormat: [] }}
 *   onValuesChange={(values) => applyFormat(values.textFormat)}
 * >
 *   <ToggleButtonGroup name="textFormat" label="Formato de texto">
 *     <ToggleButton value="bold">Negrita</ToggleButton>
 *     <ToggleButton value="italic">Cursiva</ToggleButton>
 *     <ToggleButton value="underline">Subrayado</ToggleButton>
 *   </ToggleButtonGroup>
 * </LiveForm>
 */
const ToggleButtonGroup = ({
  name,
  value,
  onChange,
  exclusive = false,
  color = 'primary',
  size = 'md',
  fullWidth = false,
  orientation = 'horizontal',
  className = '',
  children,
  label,
  error,
  helperText,
  required = false,
  disabled = false,
  'aria-label': ariaLabel,
  ...props
}) => {
  const formContext = useFormContext();

  // Determinar si está controlado por FormContext
  const isFormControlled = formContext && name;

  // Obtener valores del contexto o props
  const groupValue = isFormControlled
    ? (formContext.values[name] ?? (exclusive ? null : []))
    : value;

  const groupError = isFormControlled ? formContext.errors[name] : error;
  const hasError = Boolean(groupError);

  // Normalización del valor actual para comparaciones seguras
  const currentValue = exclusive
    ? groupValue
    : (Array.isArray(groupValue) ? groupValue : []);

  // Handler unificado para cambios de selección
  const handleToggleChange = useCallback((event, buttonValue) => {
    if (disabled) return;

    let newValue;

    if (exclusive) {
      // Modo exclusivo: permite deseleccionar si se hace clic en el activo
      newValue = currentValue === buttonValue ? null : buttonValue;
    } else {
      // Modo múltiple
      const isSelected = currentValue.includes(buttonValue);
      if (isSelected) {
        newValue = currentValue.filter((v) => v !== buttonValue);
      } else {
        newValue = [...currentValue, buttonValue];
      }
    }

    // Si está controlado por formulario, actualizar el contexto
    if (isFormControlled) {
      formContext.setFieldValue(name, newValue);
    }

    // Llamar al onChange del prop si existe
    if (onChange) {
      onChange(event, newValue);
    }
  }, [exclusive, currentValue, onChange, isFormControlled, disabled, name, formContext]);

  // Clases del contenedor
  const containerClasses = [
    'w3f-toggle-group',
    `w3f-toggle-group--${orientation}`,
    fullWidth && 'w3f-toggle-group--full',
    hasError && 'w3f-toggle-group--error',
    disabled && 'w3f-toggle-group--disabled',
    className
  ].filter(Boolean).join(' ');

  // Validación de children
  const validChildren = React.Children.toArray(children).filter(
    child => React.isValidElement(child)
  );

  if (validChildren.length === 0) {
    console.warn('ToggleButtonGroup: No hay botones válidos como children');
    return null;
  }

  return (
    <div className="w3f-toggle-group-wrapper">
      {/* Label del grupo */}
      {label && (
        <label className="w3f-toggle-group-label">
          {label}
          {required && <span className="w3f-input-required"> *</span>}
        </label>
      )}

      <div
        className={containerClasses}
        role={exclusive ? 'radiogroup' : 'group'}
        aria-label={ariaLabel || label}
        aria-required={required}
        aria-invalid={hasError}
        aria-describedby={groupError ? `${name}-error` : helperText ? `${name}-helper` : undefined}
        {...props}
      >
        {validChildren.map((child, index) => {
          const buttonValue = child.props.value;

          // Validación de valor único
          if (buttonValue === undefined) {
            console.warn(`ToggleButton en índice ${index} no tiene prop 'value'`);
            return child;
          }

          // Determinamos si este hijo específico está seleccionado
          const isSelected = exclusive
            ? buttonValue === currentValue
            : currentValue.includes(buttonValue);

          // Clonamos el hijo inyectando las props de control y estilo
          return React.cloneElement(child, {
            key: buttonValue,
            selected: isSelected,
            onChange: handleToggleChange,
            // Inyección de estilos desde el padre (el hijo puede sobrescribir)
            color: child.props.color || color,
            size: child.props.size || size,
            fullWidth: fullWidth,
            disabled: child.props.disabled || disabled,
            // Mejora de accesibilidad
            role: exclusive ? 'radio' : 'checkbox',
            'aria-checked': isSelected,
          });
        })}
      </div>

      {/* Mensajes de error o ayuda */}
      <div className="w3f-px-1">
        {groupError ? (
          <p
            id={`${name}-error`}
            className="w3f-input-message w3f-input-message--error"
            role="alert"
          >
            {groupError}
          </p>
        ) : helperText ? (
          <p
            id={`${name}-helper`}
            className="w3f-input-message w3f-input-message--helper"
          >
            {helperText}
          </p>
        ) : null}
      </div>

      {/* Hidden input para envío de formularios tradicionales */}
      {name && (
        <input
          type="hidden"
          name={name}
          value={exclusive ? (currentValue || '') : JSON.stringify(currentValue)}
        />
      )}
    </div>
  );
};

ToggleButtonGroup.propTypes = {
  /** Nombre del campo (requerido para integración con formularios) */
  name: PropTypes.string,
  /** Valor(es) seleccionado(s). String para exclusive, Array para múltiple */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.any),
  ]),
  /** Callback cuando cambia la selección: (event, newValue) => void */
  onChange: PropTypes.func,
  /** Si true, solo un botón puede estar activo (modo radio) */
  exclusive: PropTypes.bool,
  /** Color heredado a todos los hijos */
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info']),
  /** Tamaño heredado a todos los hijos */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Si true, el grupo ocupa el 100% del ancho */
  fullWidth: PropTypes.bool,
  /** Orientación del grupo */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /** Botones hijos */
  children: PropTypes.node.isRequired,
  /** Etiqueta del grupo */
  label: PropTypes.string,
  /** Mensaje de error (si no está en formulario) */
  error: PropTypes.string,
  /** Texto de ayuda */
  helperText: PropTypes.string,
  /** Si es campo requerido */
  required: PropTypes.bool,
  /** Si el grupo está deshabilitado */
  disabled: PropTypes.bool,
  /** Clases CSS adicionales */
  className: PropTypes.string,
  /** Etiqueta ARIA para accesibilidad */
  'aria-label': PropTypes.string,
};

export { ToggleButton, ToggleButtonGroup };
export default ToggleButtonGroup;