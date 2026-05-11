import React, { useState, useEffect, useRef, useId, forwardRef, useMemo, useCallback } from 'react';
import Button from '../Button/Button';
import { useFormContext } from '../../../components/INPUTS/Form/Form';

// Icono por defecto para el trailingIcon (flecha)
const DefaultChevron = ({ isOpen, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

// Icono de búsqueda
const SearchIcon = ({ color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
);

// Icono de limpiar (X)
const ClearIcon = ({ color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// Función de utilidad para extraer todos los valores de los hijos de un grupo que NO estén deshabilitados.
const getChildValues = (items) => {
  let values = [];
  items.forEach(item => {
    if (item.options) {
      values = values.concat(getChildValues(item.options));
    } else if (item.value && !item.disabled) {
      values.push(item.value);
    }
  });
  return values;
};

// Obtener todas las opciones planas (sin grupos)
const getAllFlatOptions = (items) => {
  let flatOptions = [];
  items.forEach(item => {
    if (item.options) {
      flatOptions = flatOptions.concat(getAllFlatOptions(item.options));
    } else {
      flatOptions.push(item);
    }
  });
  return flatOptions;
};

// Estilos del componente
const styles = {
  container: (disabled) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '8px',
    transition: 'all 0.2s',
    backgroundColor: disabled ? 'var(--w3f-gray-100)' : 'var(--w3f-surface, #ffffff)'
  }),
  displayBox: (disabled, hasValue, isFloating, leadingIcon, hasClearButton, getBorderColor) => ({
    minHeight: '44px',
    paddingLeft: leadingIcon ? '40px' : '12px',
    paddingRight: hasClearButton ? '70px' : '40px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: getBorderColor(),
    borderRadius: '8px',
    outline: 'none',
    color: disabled ? 'var(--w3f-gray-500)' : hasValue ? 'var(--w3f-on-surface)' : 'var(--w3f-gray-500)',
    backgroundColor: disabled ? 'var(--w3f-gray-100)' : 'transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '12px',
    paddingBottom: '12px',
    transition: 'all 0.2s'
  }),
  dropdown: (getMainColor) => ({
    backgroundColor: 'var(--w3f-surface, #ffffff)',
    maxHeight: '320px',
    overflowY: 'auto',
    border: `1px solid ${getMainColor()}`,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  }),
  searchInput: {
    width: '100%',
    padding: '8px 12px 8px 32px',
    border: '1px solid var(--w3f-gray-300)',
    borderRadius: '6px',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'border-color 0.2s'
  }
};

const CustomMultiSelectWithCheckboxesClaude = forwardRef(({
  label,
  name,
  options = [],
  value: externalValue,
  onChange: externalOnChange,
  error: propError,
  helperText,
  disabled = false,
  required = false,
  leadingIcon,
  className = '',
  maxDisplayItems = 2,
  enableParentSelection = false,
  placeholder = '',
  searchable = false,
  showSelectAll = false,
  clearable = true,
  renderOption,
  onBlur: externalOnBlur,
  ...props
}, ref) => {
  // ✅ Integración con Form Context
  const formContext = useFormContext();
  const isFormControlled = !!(formContext && name);

  // ✅ DETERMINACIÓN INTELIGENTE DEL VALOR ACTUAL
  // Prioridad: FormContext > prop value > estado interno
  const [internalValue, setInternalValue] = useState([]);

  const currentValue = isFormControlled
    ? (formContext.values[name] || [])
    : (externalValue !== undefined ? externalValue : internalValue);

  // ✅ Obtener error del contexto o props
  const inputError = isFormControlled ? formContext.errors[name] : propError;
  const hasError = Boolean(inputError);

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const selectRef = useRef(null);
  const searchInputRef = useRef(null);
  const inputId = useId();

  // Lógica para cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchQuery('');
        // Trigger onBlur cuando se cierra
        if (isFormControlled && formContext && name) {
          formContext.handleBlur({ target: { name } });
        } else if (externalOnBlur) {
          externalOnBlur({ target: { name, value: currentValue } });
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isFormControlled, formContext, name, externalOnBlur, currentValue]);

  // Focus en el input de búsqueda cuando se abre
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isOpen, searchable]);

  // --- LÓGICA DE ESTILOS ---
  const hasValue = currentValue.length > 0;
  const isFloating = isOpen || hasValue || searchQuery;
  const isFocused = isOpen;

  const getMainColor = useCallback(() => {
    if (hasError) return 'var(--w3f-danger, #dc2626)';
    if (isFocused) return 'var(--w3f-primary, #2563eb)';
    return 'var(--w3f-gray-400, #9ca3af)';
  }, [hasError, isFocused]);

  const getBorderColor = useCallback(() => {
    if (hasError) return 'var(--w3f-danger, #dc2626)';
    if (isFocused) return 'var(--w3f-primary, #2563eb)';
    return 'var(--w3f-gray-300, #d1d5db)';
  }, [hasError, isFocused]);

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

  // --- MEMOIZACIÓN ---

  // Todas las opciones planas (sin grupos)
  const allFlatOptions = useMemo(() => getAllFlatOptions(options), [options]);

  // Todos los valores disponibles (no deshabilitados)
  const allAvailableValues = useMemo(() =>
    allFlatOptions.filter(opt => !opt.disabled).map(opt => opt.value),
    [allFlatOptions]
  );

  // Función para obtener label por valor (memoizada)
  const getLabelForValue = useCallback((val) => {
    const option = allFlatOptions.find(opt => opt.value === val);
    return option ? option.label : '';
  }, [allFlatOptions]);

  // Labels seleccionadas (memoizado)
  const selectedLabels = useMemo(() =>
    currentValue.map(getLabelForValue).filter(Boolean),
    [currentValue, getLabelForValue]
  );

  // Opciones filtradas por búsqueda
  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return options;

    const query = searchQuery.toLowerCase();

    const filterRecursive = (items) => {
      return items.reduce((acc, item) => {
        if (item.options) {
          // Es un grupo
          const filteredChildren = filterRecursive(item.options);
          if (filteredChildren.length > 0 || item.label.toLowerCase().includes(query)) {
            acc.push({ ...item, options: filteredChildren });
          }
        } else {
          // Es una opción
          if (item.label.toLowerCase().includes(query)) {
            acc.push(item);
          }
        }
        return acc;
      }, []);
    };

    return filterRecursive(options);
  }, [options, searchQuery]);

  // --- MANEJADORES UNIFICADOS ---

  // ✅ MANEJADOR DE CAMBIO UNIFICADO
  const handleValueChange = useCallback((newValues) => {
    // 1. Si está controlado por FormContext
    if (isFormControlled && formContext) {
      formContext.setFieldValue(name, newValues);
    }
    // 2. Si tiene onChange externo (componente controlado)
    else if (externalOnChange) {
      externalOnChange(newValues);
    }
    // 3. Fallback: usar estado interno (componente no controlado)
    else {
      setInternalValue(newValues);
    }
  }, [isFormControlled, formContext, name, externalOnChange]);

  const handleToggleOpen = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (isOpen) {
        setSearchQuery('');
        // Trigger onBlur cuando se cierra
        if (isFormControlled && formContext && name) {
          formContext.handleBlur({ target: { name } });
        } else if (externalOnBlur) {
          externalOnBlur({ target: { name, value: currentValue } });
        }
      }
    }
  };

  // Maneja la selección de un ítem individual
  const handleCheckboxChange = useCallback((optionValue) => {
    let newValues;
    if (currentValue.includes(optionValue)) {
      newValues = currentValue.filter(val => val !== optionValue);
    } else {
      newValues = [...currentValue, optionValue];
    }
    handleValueChange(newValues);
  }, [currentValue, handleValueChange]);

  // Función que maneja la selección del grupo padre
  const handleParentSelection = useCallback((group, isChecked) => {
    if (!enableParentSelection) return;

    const childValues = getChildValues(group.options);
    let newValues = [...currentValue];

    if (isChecked) {
      newValues = newValues.filter(val => !childValues.includes(val));
    } else {
      childValues.forEach(val => {
        if (!newValues.includes(val)) {
          newValues.push(val);
        }
      });
    }
    handleValueChange(newValues);
  }, [enableParentSelection, currentValue, handleValueChange]);

  // Seleccionar todos
  const handleSelectAll = useCallback(() => {
    if (currentValue.length === allAvailableValues.length) {
      // Deseleccionar todos
      handleValueChange([]);
    } else {
      // Seleccionar todos
      handleValueChange([...allAvailableValues]);
    }
  }, [currentValue.length, allAvailableValues, handleValueChange]);

  // Limpiar selección
  const handleClear = useCallback((e) => {
    e.stopPropagation();
    handleValueChange([]);
  }, [handleValueChange]);

  // Display label
  const getDisplayLabel = () => {
    if (selectedLabels.length === 0) {
      return placeholder || '';
    }
    if (selectedLabels.length > maxDisplayItems) {
      return `${selectedLabels.slice(0, maxDisplayItems).join(', ')} y ${selectedLabels.length - maxDisplayItems} más`;
    }
    return selectedLabels.join(', ');
  };

  // Renderizado de opciones
  const renderOptionsList = (items) => {
    return items.map((item, index) => {
      if (item.options) {
        const childValues = getChildValues(item.options);
        const allChildrenSelected = childValues.length > 0 && childValues.every(val => currentValue.includes(val));
        const someChildrenSelected = childValues.some(val => currentValue.includes(val)) && !allChildrenSelected;
        const parentCheckboxState = allChildrenSelected ? true : someChildrenSelected ? 'indeterminate' : false;

        return (
          <div key={`group-${index}`} className="w3f-p-2 w3f-pt-3 w3f-border-b" style={{ borderColor: 'var(--w3f-gray-200)' }}>
            <label
              className={`w3f-flex w3f-items-center w3f-p-1 w3f-rounded-md w3f-font-medium ${enableParentSelection ? 'w3f-cursor-pointer w3f-hover-bg-gray-100' : 'w3f-text-sm'
                }`}
              style={{ color: 'var(--w3f-gray-700)' }}
            >
              {enableParentSelection && (
                <input
                  type="checkbox"
                  checked={parentCheckboxState === true}
                  ref={el => {
                    if (el) el.indeterminate = parentCheckboxState === 'indeterminate';
                  }}
                  onChange={() => handleParentSelection(item, allChildrenSelected)}
                  disabled={disabled || item.disabled}
                  className="w3f-mr-3"
                  style={{ accentColor: 'var(--w3f-primary)' }}
                />
              )}
              <span style={{ marginLeft: enableParentSelection ? '0' : '4px' }}>
                {item.label}
              </span>
            </label>

            <div className="w3f-pl-2">
              {renderOptionsList(item.options)}
            </div>
          </div>
        );
      }

      const isChecked = currentValue.includes(item.value);

      // Usar renderOption personalizado si se proporciona
      if (renderOption) {
        return renderOption(item, isChecked, () => handleCheckboxChange(item.value), disabled);
      }

      return (
        <label
          key={`opt-${index}`}
          className={`w3f-flex w3f-items-center w3f-p-2 w3f-rounded-md w3f-transition ${item.disabled ? 'w3f-opacity-50 w3f-cursor-not-allowed' : 'w3f-cursor-pointer w3f-hover-bg-gray-100'
            }`}
          style={{
            color: isChecked ? 'var(--w3f-primary-700)' : 'var(--w3f-on-surface)',
            fontWeight: isChecked ? '600' : '400'
          }}
        >
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => handleCheckboxChange(item.value)}
            disabled={item.disabled || disabled}
            className="w3f-mr-3"
            style={{ accentColor: 'var(--w3f-primary)' }}
          />
          {item.label}
        </label>
      );
    });
  };

  const hasClearButton = clearable && hasValue && !disabled;

  return (
    <div className={`w3f-relative w3f-mb-6 ${className}`} ref={selectRef}>
      <div
        className={`w3f-relative w3f-flex w3f-items-center w3f-rounded-lg w3f-transition ${disabled ? 'w3f-bg-gray-100' : 'w3f-bg-surface'
          }`}
        ref={ref}
      >

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

        {/* Display Box */}
        <div
          id={inputId}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={`${inputId}-listbox`}
          aria-labelledby={`${inputId}-label`}
          aria-invalid={hasError}
          tabIndex={disabled ? -1 : 0}
          onClick={handleToggleOpen}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault();
              handleToggleOpen();
            }
          }}
          className="w3f-block w3f-cursor-pointer w3f-w-full w3f-py-3 w3f-transition w3f-text-sm"
          style={styles.displayBox(disabled, hasValue, isFloating, leadingIcon, hasClearButton, getBorderColor)}
        >
          <span style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            lineHeight: '1.2',
            fontSize: '1rem',
          }}>
            {getDisplayLabel()}
          </span>
        </div>

        {/* Clear Button */}
        {hasClearButton && (
          <Button
            variant="flat"
            onClick={handleClear}
            className="w3f-absolute w3f-p-0"
            style={{
              color: getMainColor(),
              height: '24px',
              width: '24px',
              minWidth: '24px',
              zIndex: 5,
              right: '40px',
              top: '50%',
              transform: 'translateY(-50%)'
            }}
            aria-label="Limpiar selección"
            icon={<ClearIcon color={getMainColor()} />}
          />
        )}

        {/* Trailing Icon (Chevron) */}
        <div
          className="w3f-absolute w3f-right-3 w3f-flex w3f-items-center w3f-justify-center"
          style={{
            color: getMainColor(),
            pointerEvents: 'none',
            height: '100%',
            zIndex: 5,
            top: 0
          }}
        >
          <DefaultChevron isOpen={isOpen} color={getMainColor()} />
        </div>

        {/* Label flotante */}
        <label
          id={`${inputId}-label`}
          htmlFor={inputId}
          style={labelStyle}
        >
          {label}
          {required && <span style={{ color: 'var(--w3f-danger, #dc2626)' }}> *</span>}
        </label>

      </div>

      {/* Dropdown Content */}
      {isOpen && (
        <div
          id={`${inputId}-listbox`}
          role="listbox"
          className="w3f-absolute w3f-mt-1 w3f-w-full w3f-rounded-lg w3f-z-20"
          style={styles.dropdown(getMainColor)}
        >
          {/* Barra de búsqueda */}
          {searchable && (
            <div className="w3f-p-2 w3f-border-b w3f-sticky w3f-top-0 w3f-bg-surface" style={{ borderColor: 'var(--w3f-gray-200)', zIndex: 10 }}>
              <div className="w3f-relative">
                <div className="w3f-absolute w3f-left-2 w3f-top-1/2" style={{ transform: 'translateY(-50%)' }}>
                  <SearchIcon color="var(--w3f-gray-400)" />
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Buscar opciones..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={styles.searchInput}
                  onClick={(e) => e.stopPropagation()}
                  onFocus={(e) => e.target.style.borderColor = 'var(--w3f-primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--w3f-gray-300)'}
                />
              </div>
            </div>
          )}

          {/* Botón de seleccionar todos */}
          {showSelectAll && allAvailableValues.length > 0 && (
            <div className="w3f-p-2 w3f-border-b w3f-sticky w3f-top-0 w3f-bg-surface"
              style={{
                borderColor: 'var(--w3f-gray-200)',
                top: searchable ? '57px' : '0',
                zIndex: 9
              }}>
              <Button
                variant="flat"
                fullWidth
                onClick={handleSelectAll}
                className="w3f-justify-start w3f-text-left w3f-p-2 w3f-font-medium w3f-text-sm"
                style={{ color: 'var(--w3f-primary)' }}
              >
                {currentValue.length === allAvailableValues.length ? '✓ Deseleccionar todos' : 'Seleccionar todos'}
              </Button>
            </div>
          )}

          {/* Opciones */}
          <div className="w3f-p-2">
            {filteredOptions.length > 0 ? renderOptionsList(filteredOptions) : (
              <p className="w3f-text-center w3f-text-sm w3f-py-4" style={{ color: 'var(--w3f-gray-500)' }}>
                {searchQuery ? 'No se encontraron resultados' : 'No hay opciones disponibles'}
              </p>
            )}
          </div>

          {/* Botón de cerrar */}
          <div className="w3f-py-2 w3f-px-2 w3f-text-center w3f-border-t w3f-sticky w3f-bottom-0 w3f-bg-surface" style={{ borderColor: 'var(--w3f-gray-200)' }}>
            <Button
              variant="flat"
              size="sm"
              onClick={() => {
                setIsOpen(false);
                setSearchQuery('');
                // Trigger onBlur cuando se cierra
                if (isFormControlled && formContext && name) {
                  formContext.handleBlur({ target: { name } });
                } else if (externalOnBlur) {
                  externalOnBlur({ target: { name, value: currentValue } });
                }
              }}
              className="w3f-font-medium"
              style={{ color: 'var(--w3f-primary)' }}
            >
              Cerrar
            </Button>
          </div>
        </div>
      )}

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

CustomMultiSelectWithCheckboxesClaude.displayName = 'CustomMultiSelectWithCheckboxesClaude';

export default CustomMultiSelectWithCheckboxesClaude;