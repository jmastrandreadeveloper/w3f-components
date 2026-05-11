import React, { useState } from 'react';
import { useFormContext } from '../Form/Form.jsx';
import Button from '../Button/Button';

const ButtonToggleClaude = ({
  options = [],
  onSelect,
  value, // Controlado externamente
  defaultValue, // No controlado
  multiple = false,
  allowDeselect = false, // Solo para modo simple
  color = 'primary',
  size = 'md',
  disabled = false,
  ariaLabel,
  className = '',
  name, // ✅ Para integración con Form
  onChange, // ✅ Para integración externa
  ...props
}) => {
  const formContext = useFormContext();

  // ✅ Determinar si está controlado por FormContext
  const isFormControlled = !!(formContext && name);

  // ✅ Estado interno como fallback (componente no controlado)
  const [internalValue, setInternalValue] = useState(() => {
    if (defaultValue !== undefined) return defaultValue;
    return multiple ? [] : null;
  });

  // ✅ DETERMINACIÓN INTELIGENTE DEL VALOR ACTUAL
  // Prioridad: FormContext > prop value > estado interno
  const currentValue = isFormControlled
    ? (formContext.values[name] ?? (multiple ? [] : null))
    : (value !== undefined ? value : internalValue);

  // Determinar si es controlado externamente (no por Form)
  const isExternallyControlled = value !== undefined;

  // ✅ MANEJADOR DE SELECCIÓN UNIFICADO
  const handleSelect = (newValue) => {
    let newSelection;

    if (multiple) {
      const current = Array.isArray(currentValue) ? currentValue : [];
      if (current.includes(newValue)) {
        newSelection = current.filter((item) => item !== newValue);
      } else {
        newSelection = [...current, newValue];
      }
    } else {
      if (currentValue === newValue) {
        newSelection = allowDeselect ? null : newValue;
      } else {
        newSelection = newValue;
      }
    }

    // 1. Si está controlado por FormContext
    if (isFormControlled && formContext) {
      formContext.handleChange({
        target: { name, value: newSelection, type: multiple ? 'select-multiple' : 'select' },
      });
      formContext.handleBlur({
        target: { name, value: newSelection },
      });
    }
    // 2. Si tiene onChange externo (componente controlado)
    else if (onChange) {
      onChange({ target: { name, value: newSelection } });
    }
    // 3. Fallback: usar estado interno (componente no controlado)
    else if (!isExternallyControlled) {
      setInternalValue(newSelection);
    }

    // Callback al padre (siempre se ejecuta)
    if (onSelect) {
      onSelect(newSelection);
    }
  };

  if (!options.length) return null;

  return (
    <div
      className={`w3f-button-toggle ${className}`}
      role="group"
      aria-label={ariaLabel || (name ? `${name} toggle` : 'button toggle')}
      {...props}
    >
      {options.map((option) => {
        const active = multiple
          ? (Array.isArray(currentValue) && currentValue.includes(option.value))
          : currentValue === option.value;

        return (
          <Button
            key={option.value}
            type="button" // ✅ Siempre type="button" para evitar submits accidentales
            variant={active ? 'raised' : 'outline'}
            color={color}
            size={size}
            disabled={disabled || option.disabled}
            onClick={() => handleSelect(option.value)}
            aria-pressed={active}
          >
            {option.label}
          </Button>
        );
      })}
    </div>
  );
};

ButtonToggleClaude.displayName = 'ButtonToggleClaude';

export default ButtonToggleClaude;