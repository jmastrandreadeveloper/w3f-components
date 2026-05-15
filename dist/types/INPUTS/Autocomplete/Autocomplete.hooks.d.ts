import type { ChangeEvent, KeyboardEvent } from 'react';
import type { AutocompleteOption } from './Autocomplete.types';
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
export declare function useAutocomplete({ data, onSelect, optionLabel, filterFn, maxResults, name, value: externalValue, onChange: externalOnChange, }: UseAutocompleteParams): {
    inputValue: any;
    suggestions: AutocompleteOption[];
    activeSuggestionIndex: number;
    showSuggestions: boolean;
    isLoading: boolean;
    inputRef: import("react").RefObject<HTMLInputElement | null>;
    containerRef: import("react").RefObject<HTMLDivElement | null>;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
    handleItemClick: (suggestion: AutocompleteOption) => void;
    handleClearInput: () => void;
    isFormControlled: boolean;
    formContext: import("../..").FormContextValue | null;
};
export declare const useAutocompleteFormDispatch: () => import("../Form/Form.types").FormDispatchValue | null;
export declare const useAutocompleteFormMeta: () => import("../Form/Form.types").FormMetaValue | null;
export declare const useAutocompleteFieldStore: () => import("../Form/Form.types").FormFieldStore | null;
export {};
//# sourceMappingURL=Autocomplete.hooks.d.ts.map