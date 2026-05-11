import { useState, useEffect, useRef, useContext } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from '../Form/Form';
import type { AutocompleteOption } from './Autocomplete.types';
import { AUTOCOMPLETE_DEFAULTS } from './Autocomplete.constants';
import { getOptionText, defaultFilter } from './Autocomplete.utils';

interface UseAutocompleteParams {
    data: AutocompleteOption[];
    onSelect?: (item: AutocompleteOption | null) => void;
    optionLabel: string;
    filterFn?: (item: AutocompleteOption, query: string) => boolean;
    maxResults: number;
    name?: string;
    value?: string;
    onChange?: (e: any) => void;
}

/**
 * Hook principal del Autocomplete.
 * Gestiona búsqueda debounced, navegación por teclado e integración con Form.
 */
export function useAutocomplete({
    data,
    onSelect,
    optionLabel,
    filterFn,
    maxResults,
    name,
    value: externalValue,
    onChange: externalOnChange,
}: UseAutocompleteParams) {
    const formContext = useContext(FormContext);
    const isFormControlled = !!(formContext && name);

    const [internalValue, setInternalValue] = useState('');
    const [suggestions, setSuggestions] = useState<AutocompleteOption[]>([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Prioridad: FormContext > prop value > estado interno
    const currentValue = isFormControlled
        ? (formContext!.values[name!] ?? '')
        : (externalValue !== undefined ? externalValue : internalValue);

    // Cerrar dropdown al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Helper para sincronizar el valor con el origen correcto
    const updateValue = (value: string, source: 'change' | 'select') => {
        if (isFormControlled && formContext) {
            formContext.handleChange({
                target: { name, value, type: 'text' },
            } as ChangeEvent<HTMLInputElement>);
            if (source === 'select') {
                formContext.handleBlur({
                    target: { name, value },
                } as any);
            }
        } else if (externalOnChange) {
            externalOnChange({ target: { name, value } });
        } else {
            setInternalValue(value);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        updateValue(value, 'change');
        setIsLoading(true);
        setShowSuggestions(true);

        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
        debounceTimeout.current = setTimeout(() => {
            if (value) {
                const filterLogic =
                    filterFn ??
                    ((item: AutocompleteOption, q: string) =>
                        defaultFilter(item, q, optionLabel));
                const filtered = data
                    .filter((item) => filterLogic(item, value))
                    .slice(0, maxResults);
                setSuggestions(filtered);
                setActiveSuggestionIndex(-1);
            } else {
                setSuggestions([]);
            }
            setIsLoading(false);
        }, AUTOCOMPLETE_DEFAULTS.debounceTime);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (!showSuggestions) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveSuggestionIndex((prev) =>
                prev < suggestions.length - 1 ? prev + 1 : 0,
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveSuggestionIndex((prev) =>
                prev > 0 ? prev - 1 : suggestions.length - 1,
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

    const handleItemClick = (suggestion: AutocompleteOption) => {
        const text = getOptionText(suggestion, optionLabel);
        updateValue(text, 'select');
        setSuggestions([]);
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
        if (onSelect) onSelect(suggestion);
        if (inputRef.current) inputRef.current.focus();
    };

    const handleClearInput = () => {
        updateValue('', 'select');
        setSuggestions([]);
        setShowSuggestions(false);
        if (onSelect) onSelect(null);
        if (inputRef.current) inputRef.current.focus();
    };

    return {
        inputValue: currentValue,
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
        isFormControlled,
        formContext,
    };
}

export const useAutocompleteFormDispatch = () => useContext(FormDispatchContext);
export const useAutocompleteFormMeta = () => useContext(FormMetaContext);
export const useAutocompleteFieldStore = () => useContext(FormFieldStoreContext);
