import React, { useState, useEffect, useRef, useId, forwardRef } from 'react';

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

const CustomMultiSelectWithCheckboxes = forwardRef(({ 
  label, 
  name, 
  options = [], 
  value = [], // Espera un array de valores seleccionados
  onChange, 
  error, 
  helperText, 
  disabled = false, 
  required = false, 
  leadingIcon, 
  className = '',
  maxDisplayItems = 2, // Cuántos ítems mostrar antes de usar "...y X más"
  enableParentSelection = false, // <-- HABILITA/DESHABILITA la selección en cascada
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const inputId = useId();
  
  // Lógica para cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- LÓGICA DE ESTILOS (Unificada con Input/CustomSelect) ---
  const hasValue = value.length > 0;
  const isFloating = isOpen || hasValue;
  const hasError = Boolean(error);
  const isFocused = isOpen; 

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
    backgroundColor: 'var(--w3f-surface, #ffffff)', // Fondo para tapar el borde
    padding: '0 4px',
    transition: 'all 0.2s ease-out',
    pointerEvents: 'none',
    zIndex: 10,
    marginLeft: (!isFloating && leadingIcon) ? '28px' : '0' 
  };
  
  // --- LÓGICA DE MANEJO DE SELECCIÓN ---

  const handleToggleOpen = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  // Maneja la selección de un ítem individual (Hijo)
  const handleCheckboxChange = (optionValue) => {
    let newValues;
    if (value.includes(optionValue)) {
      newValues = value.filter(val => val !== optionValue);
    } else {
      newValues = [...value, optionValue];
    }
    onChange(newValues);
  };
  
  // Función que maneja la selección del grupo padre (NUEVO)
  const handleParentSelection = (group, isChecked) => {
    if (!enableParentSelection) return;
    
    // Obtiene solo los valores de los hijos NO deshabilitados
    const childValues = getChildValues(group.options);
    let newValues = [...value];
    
    if (isChecked) {
      // Si el padre estaba TOTALMENTE seleccionado (isChecked=true), deseleccionar todo.
      newValues = newValues.filter(val => !childValues.includes(val));
    } else {
      // Si el padre no estaba totalmente seleccionado, seleccionar todos los hijos válidos.
      childValues.forEach(val => {
        if (!newValues.includes(val)) {
          newValues.push(val);
        }
      });
    }
    onChange(newValues);
  };
  
  // Lógica para obtener las etiquetas de los valores seleccionados para el Display
  const getLabelForValue = (val) => {
    const allOptions = options.flatMap(item => item.options || [item]);
    const option = allOptions.find(opt => opt.value === val);
    return option ? option.label : '';
  };
  
  const selectedLabels = value.map(getLabelForValue).filter(label => label !== '');
  
  // Función para limitar la cantidad de etiquetas visibles
  const getDisplayLabel = () => {
    if (selectedLabels.length === 0) {
      return ''; 
    }
    if (selectedLabels.length > maxDisplayItems) {
      return `${selectedLabels.slice(0, maxDisplayItems).join(', ')} y ${selectedLabels.length - maxDisplayItems} más...`;
    }
    return selectedLabels.join(', ');
  };
  
  // Renderizado recursivo de opciones (con lógica de grupo NUEVA)
  const renderOptionsList = (items) => {
    return items.map((item, index) => {
      if (item.options) {
        
        // --- Lógica del Padre (Selección en cascada) ---
        const childValues = getChildValues(item.options);
        const allChildrenSelected = childValues.length > 0 && childValues.every(val => value.includes(val));
        const someChildrenSelected = childValues.some(val => value.includes(val)) && !allChildrenSelected;
        const parentCheckboxState = allChildrenSelected ? true : someChildrenSelected ? 'indeterminate' : false;
        // --- Fin Lógica del Padre ---

        return (
          <div key={`group-${index}`} className="w3f-p-2 w3f-pt-3 w3f-border-b" style={{ borderColor: 'var(--w3f-gray-200)' }}>
            
            <label 
              className={`w3f-flex w3f-items-center w3f-p-1 w3f-rounded-md w3f-font-medium ${
                enableParentSelection ? 'w3f-cursor-pointer w3f-hover-bg-gray-100' : 'w3f-text-sm'
              }`}
              style={{ color: 'var(--w3f-gray-700)' }}
            >
              {/* Checkbox del Padre (solo si está habilitado) */}
              {enableParentSelection && (
                <input
                  type="checkbox"
                  // Usamos el estado determinado (true/false) para 'checked'
                  checked={parentCheckboxState === true} 
                  ref={el => {
                    // Usamos la ref para forzar el estado 'indeterminate'
                    if (el) el.indeterminate = parentCheckboxState === 'indeterminate';
                  }}
                  // La función asume que el cambio es para seleccionar todos si no estaban todos seleccionados
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
            
            {/* Opciones Hijo */}
            <div className="w3f-pl-2">
              {renderOptionsList(item.options)}
            </div>
          </div>
        );
      }
      
      // Lógica de Opción Hija estándar
      const isChecked = value.includes(item.value);
      
      return (
        <label 
          key={`opt-${index}`}
          className={`w3f-flex w3f-items-center w3f-p-2 w3f-rounded-md w3f-transition ${
            item.disabled ? 'w3f-opacity-50 w3f-cursor-not-allowed' : 'w3f-cursor-pointer w3f-hover-bg-gray-100'
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

  return (
    <div className={`w3f-relative w3f-mb-6 ${className}`} ref={selectRef}>
      <div 
        className={`w3f-relative w3f-flex w3f-items-center w3f-rounded-lg w3f-transition ${
          disabled ? 'w3f-bg-gray-100' : 'w3f-bg-surface'
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

        {/* Display Box / Botón */}
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
          // Manejo de teclado para abrir/cerrar
          onKeyDown={(e) => { 
            if (e.key === ' ' || e.key === 'Enter') { 
              e.preventDefault(); 
              handleToggleOpen(); 
            }
          }}
          className={`w3f-block w3f-cursor-pointer w3f-w-full w3f-py-3 w3f-transition w3f-text-sm`}
          style={{
            minHeight: '44px',
            paddingLeft: leadingIcon ? '40px' : '12px',
            paddingRight: '40px', // Espacio para el chevron
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
            // Ajuste de padding para el Floating Label
            paddingTop: isFloating ? '12px' : '12px',
            paddingBottom: isFloating ? '12px' : '12px',
          }}
        >
          <span style={{ 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            whiteSpace: 'nowrap',
            lineHeight: isFloating ? '1.2' : '1.5',
            fontSize: isFloating ? '1rem' : '1rem',
          }}>
            {getDisplayLabel()}
          </span>
        </div>

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
          className="w3f-absolute w3f-mt-1 w3f-w-full w3f-rounded-lg w3f-shadow-md w3f-z-20 w3f-p-2"
          style={{ 
            backgroundColor: 'var(--w3f-surface, #ffffff)', 
            maxHeight: '250px', 
            overflowY: 'auto',
            border: `1px solid ${getMainColor()}`
          }}
        >
          {options.length > 0 ? renderOptionsList(options) : (
             <p className="w3f-text-center w3f-text-sm" style={{ color: 'var(--w3f-gray-500)' }}>
                No hay opciones disponibles.
            </p>
          )}
          
          {/* Opción de cerrar (Mejora de UX) */}
          <div className="w3f-py-2 w3f-px-2 w3f-text-center">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w3f-text-sm w3f-font-medium w3f-p-1 w3f-rounded w3f-transition w3f-hover-bg-gray-100"
              style={{ color: 'var(--w3f-primary)' }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

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

CustomMultiSelectWithCheckboxes.displayName = 'CustomMultiSelectWithCheckboxes';

export default CustomMultiSelectWithCheckboxes;