import React, { forwardRef, useId } from 'react';
import { X, Search, Loader2 } from 'lucide-react';
import type { AutocompleteProps } from './Autocomplete.types';
import { AUTOCOMPLETE_DEFAULTS, AUTOCOMPLETE_CLASSES } from './Autocomplete.constants';
import { buildAutocompleteInputClasses, getOptionText } from './Autocomplete.utils';
import { useAutocomplete } from './Autocomplete.hooks';
import { useBridgeBind } from '@w3f/bridge';

/**
 * Renderiza las partes coincidentes del texto resaltadas.
 * Retorna un array de strings y elementos React.
 */
function HighlightedText({
    text,
    highlight,
}: {
    text: string;
    highlight: string;
}) {
    if (!highlight) return <>{text}</>;
    const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = text.split(new RegExp(`(${escapeRegExp(highlight)})`, 'gi'));
    return (
        <>
            {parts.map((part, i) =>
                part.toLowerCase() === highlight.toLowerCase() ? (
                    <span key={i} className="w3f-match-highlight">
                        {part}
                    </span>
                ) : (
                    part
                ),
            )}
        </>
    );
}

/**
 * Autocomplete Component - W3F Framework
 *
 * Input con búsqueda y sugerencias en dropdown. Compatible con Form y LiveForm.
 * Soporta navegación por teclado, resaltado de coincidencias y estado de carga.
 *
 * @example
 * // Uso independiente
 * <Autocomplete
 *   data={['Argentina', 'Brasil', 'Chile']}
 *   onSelect={(item) => console.log(item)}
 *   placeholder="Buscar país..."
 *   clearable
 * />
 *
 * @example
 * // Con objetos y optionLabel
 * <Autocomplete
 *   data={[{ id: 1, name: 'React' }, { id: 2, name: 'Vue' }]}
 *   optionLabel="name"
 *   onSelect={(item) => setFramework(item)}
 * />
 *
 * @example
 * // Integrado con Form
 * <Form initialValues={{ country: '' }}>
 *   <Autocomplete
 *     name="country"
 *     data={countries}
 *     optionLabel="label"
 *     placeholder="Seleccionar país"
 *   />
 * </Form>
 */
const Autocomplete = forwardRef<HTMLDivElement, AutocompleteProps>(({
    data,
    onSelect,
    optionLabel = AUTOCOMPLETE_DEFAULTS.optionLabel,
    filterFn,
    maxResults = AUTOCOMPLETE_DEFAULTS.maxResults,
    emptyMessage = AUTOCOMPLETE_DEFAULTS.emptyMessage,
    clearable = AUTOCOMPLETE_DEFAULTS.clearable,
    className = AUTOCOMPLETE_DEFAULTS.className,
    variant = AUTOCOMPLETE_DEFAULTS.variant,
    size = AUTOCOMPLETE_DEFAULTS.size,
    error: propError = AUTOCOMPLETE_DEFAULTS.error,
    round = AUTOCOMPLETE_DEFAULTS.round,
    searchIcon = AUTOCOMPLETE_DEFAULTS.searchIcon,
    placeholder = AUTOCOMPLETE_DEFAULTS.placeholder,
    name,
    value,
    onChange,
    onBlur,
    label,
    unstyled = AUTOCOMPLETE_DEFAULTS.unstyled,
    bindId,
    ...rest
}, ref) => {
    const inputId = useId();
    const { dispatch } = useBridgeBind({ bindId });

    const bridgeOnSelect = (item: import('./Autocomplete.types').AutocompleteOption | null) => {
        const text = item ? (typeof item === 'string' ? item : (item as any)[optionLabel] ?? String(item)) : '';
        dispatch('change', { value: text });
        if (onSelect) onSelect(item);
    };

    const {
        inputValue,
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
    } = useAutocomplete({
        data,
        onSelect: bridgeOnSelect,
        optionLabel,
        filterFn,
        maxResults,
        name,
        value,
        onChange,
    });

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (isFormControlled && formContext) {
            formContext.handleBlur(e);
        }
        if (onBlur) onBlur(e);
    };

    // Error: puede venir del contexto o de la prop
    const inputError = isFormControlled
        ? formContext!.errors[name!]
        : typeof propError === 'string'
        ? propError
        : undefined;
    const hasError = Boolean(inputError || propError);

    const iconSize = size === 'sm' ? 16 : 20;
    const inputClasses = buildAutocompleteInputClasses({
        variant,
        size,
        error: hasError,
        round,
        hasIcon: searchIcon,
        className: '',
        unstyled,
    });

    return (
        <div ref={ref} className={`${AUTOCOMPLETE_CLASSES.container} ${className}`}>
            {label && (
                <label
                    htmlFor={inputId}
                    className="w3f-label"
                >
                    {label}
                </label>
            )}

            <div
                className={`${AUTOCOMPLETE_CLASSES.base}${unstyled ? ' w3f-autocomplete--unstyled' : ''}`}
                ref={containerRef}
                role="combobox"
                aria-haspopup="listbox"
                aria-expanded={showSuggestions}
                aria-owns={`${inputId}-list`}
            >
                <div
                    className={AUTOCOMPLETE_CLASSES.wrapper}
                >
                    {searchIcon && (
                        <div className={AUTOCOMPLETE_CLASSES.iconStart}>
                            {isLoading ? (
                                <Loader2
                                    size={iconSize}
                                    className={AUTOCOMPLETE_CLASSES.spinner}
                                />
                            ) : (
                                <Search size={iconSize} />
                            )}
                        </div>
                    )}

                    <input
                        id={inputId}
                        type="text"
                        name={name}
                        value={inputValue}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                        className={inputClasses}
                        placeholder={placeholder}
                        ref={inputRef}
                        aria-autocomplete="list"
                        aria-controls={`${inputId}-list`}
                        aria-activedescendant={
                            activeSuggestionIndex >= 0
                                ? `${inputId}-option-${activeSuggestionIndex}`
                                : undefined
                        }
                        aria-invalid={hasError}
                        {...rest}
                    />

                    {clearable && inputValue && !isLoading && (
                        <div
                            className={AUTOCOMPLETE_CLASSES.clear}
                            onClick={handleClearInput}
                            role="button"
                            aria-label="Limpiar búsqueda"
                            tabIndex={0}
                            onKeyDown={(e) =>
                                e.key === 'Enter' && handleClearInput()
                            }
                        >
                            <X size={iconSize} />
                        </div>
                    )}

                    {showSuggestions && inputValue && (
                        <div
                            id={`${inputId}-list`}
                            className={AUTOCOMPLETE_CLASSES.list}
                            role="listbox"
                        >
                            {isLoading ? (
                                <div className={AUTOCOMPLETE_CLASSES.message}>
                                    Buscando...
                                </div>
                            ) : suggestions.length > 0 ? (
                                suggestions.map((suggestion, index) => {
                                    const text = getOptionText(
                                        suggestion,
                                        optionLabel,
                                    );
                                    return (
                                        <div
                                            key={index}
                                            id={`${inputId}-option-${index}`}
                                            role="option"
                                            aria-selected={
                                                index === activeSuggestionIndex
                                            }
                                            className={[
                                                AUTOCOMPLETE_CLASSES.item,
                                                index === activeSuggestionIndex &&
                                                    AUTOCOMPLETE_CLASSES.active,
                                            ]
                                                .filter(Boolean)
                                                .join(' ')}
                                            onMouseDown={(e) => e.preventDefault()}
                                            onClick={() =>
                                                handleItemClick(suggestion)
                                            }
                                        >
                                            <HighlightedText
                                                text={text}
                                                highlight={inputValue}
                                            />
                                        </div>
                                    );
                                })
                            ) : (
                                <div className={AUTOCOMPLETE_CLASSES.message}>
                                    {emptyMessage}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {hasError && inputError && (
                    <div className="w3f-px-1">
                        <p
                            id={`${inputId}-error`}
                            className="w3f-input-message w3f-input-message--error"
                            role="alert"
                        >
                            {inputError}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
});

Autocomplete.displayName = 'Autocomplete';

export { Autocomplete };
export default Autocomplete;
