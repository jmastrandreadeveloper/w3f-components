// ============================================
// useAutocomplete.js - Hook Unificado
// ============================================

import { useState, useEffect, useRef } from 'react';

export const useAutocomplete = ({
  data,
  onSelect,
  optionLabel = 'label',
  filterFn,
  debounceTime = 300,
  maxResults = 10,
  // Props para integración con Form
  name,
  value: externalValue,
  isFormControlled,
  formContext,
  onChange: externalOnChange,
}) => {
  // ✅ ESTADO INTERNO como fallback (cuando no hay control externo)
  const [internalValue, setInternalValue] = useState('');

  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const debounceTimeout = useRef(null);

  // ✅ DETERMINACIÓN INTELIGENTE DEL VALOR ACTUAL
  // Prioridad: FormContext > prop value > estado interno
  const currentValue = isFormControlled
    ? (formContext.values[name] || '')
    : (externalValue !== undefined ? externalValue : internalValue);

  // Helper para obtener texto de opción
  const getOptionText = (option) => {
    if (!option) return '';
    return typeof option === 'object' ? option[optionLabel] : option;
  };

  // Función de filtrado por defecto
  const defaultFilter = (item, query) => {
    const text = getOptionText(item).toLowerCase();
    return text.includes(query.toLowerCase());
  };

  // Click outside para cerrar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ✅ MANEJADOR DE CAMBIO UNIFICADO
  const handleChange = (e) => {
    const value = e.target.value;

    // 1. Si está controlado por FormContext
    if (isFormControlled && formContext) {
      formContext.handleChange(e);
    }
    // 2. Si tiene onChange externo (componente controlado)
    else if (externalOnChange) {
      externalOnChange(e);
    }
    // 3. Fallback: usar estado interno (componente no controlado)
    else {
      setInternalValue(value);
    }

    // Lógica de búsqueda y filtrado
    setIsLoading(true);
    setShowSuggestions(true);

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      if (value) {
        const filterLogic = filterFn || defaultFilter;
        const filtered = data
          .filter((item) => filterLogic(item, value))
          .slice(0, maxResults);

        setSuggestions(filtered);
        setActiveSuggestionIndex(-1);
      } else {
        setSuggestions([]);
      }
      setIsLoading(false);
    }, debounceTime);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeSuggestionIndex > -1) {
        handleItemClick(suggestions[activeSuggestionIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // ✅ MANEJADOR DE SELECCIÓN UNIFICADO
  const handleItemClick = (suggestion) => {
    const text = getOptionText(suggestion);

    // 1. Si está controlado por FormContext
    if (isFormControlled && formContext) {
      formContext.handleChange({
        target: { name, value: text, type: 'text' },
      });
      formContext.handleBlur({
        target: { name, value: text },
      });
    }
    // 2. Si tiene onChange externo (componente controlado)
    else if (externalOnChange) {
      externalOnChange({ target: { name, value: text } });
    }
    // 3. Fallback: usar estado interno (componente no controlado)
    else {
      setInternalValue(text);
    }

    // Callback al padre
    if (onSelect) {
      onSelect(suggestion);
    }

    // Limpiar estados internos
    setSuggestions([]);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);

    if (inputRef.current) inputRef.current.focus();
  };

  // ✅ MANEJADOR DE LIMPIEZA UNIFICADO
  const handleClearInput = () => {
    // 1. Si está controlado por FormContext
    if (isFormControlled && formContext) {
      formContext.handleChange({
        target: { name, value: '', type: 'text' },
      });
      formContext.handleBlur({
        target: { name, value: '' },
      });
    }
    // 2. Si tiene onChange externo (componente controlado)
    else if (externalOnChange) {
      externalOnChange({ target: { name, value: '' } });
    }
    // 3. Fallback: usar estado interno (componente no controlado)
    else {
      setInternalValue('');
    }

    setSuggestions([]);
    setShowSuggestions(false);
    if (onSelect) onSelect(null);
    if (inputRef.current) inputRef.current.focus();
  };

  // Helper para resaltar texto
  const getHighlightedText = (text, highlight) => {
    if (!highlight) return text;
    const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = text.split(new RegExp(`(${escapeRegExp(highlight)})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ?
        <span key={i} className="w3f-match-highlight">{part}</span> : part
    );
  };

  return {
    inputValue: currentValue, // ✅ Valor unificado
    suggestions,
    activeSuggestionIndex,
    showSuggestions,
    isLoading,
    inputRef,
    containerRef,
    handleChange,
    handleKeyDown,
    handleItemClick,
    handleClearInput,
    getOptionText,
    getHighlightedText: (text) => getHighlightedText(text, currentValue)
  };
};