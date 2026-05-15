import type { AutocompleteVariant, AutocompleteSize, AutocompleteOption } from './Autocomplete.types';
/**
 * Construye las clases CSS del input del Autocomplete.
 */
export declare function buildAutocompleteInputClasses({ variant, size, error, round, hasIcon, className, unstyled, }: {
    variant: AutocompleteVariant;
    size: AutocompleteSize;
    error: boolean;
    round: boolean;
    hasIcon: boolean;
    className?: string;
    unstyled?: boolean;
}): string;
/**
 * Extrae el texto a mostrar de una opción (objeto o string).
 */
export declare function getOptionText(option: AutocompleteOption, optionLabel: string): string;
/**
 * Función de filtrado por defecto: busca el query en el texto de la opción.
 */
export declare function defaultFilter(item: AutocompleteOption, query: string, optionLabel: string): boolean;
//# sourceMappingURL=Autocomplete.utils.d.ts.map