import type { AutocompleteVariant, AutocompleteSize, AutocompleteOption } from './Autocomplete.types';
import { AUTOCOMPLETE_CLASSES } from './Autocomplete.constants';

/**
 * Construye las clases CSS del input del Autocomplete.
 */
export function buildAutocompleteInputClasses({
    variant,
    size,
    error,
    round,
    hasIcon,
    className,
    unstyled,
}: {
    variant: AutocompleteVariant;
    size: AutocompleteSize;
    error: boolean;
    round: boolean;
    hasIcon: boolean;
    className?: string;
    unstyled?: boolean;
}): string {
    if (unstyled) {
        return [
            AUTOCOMPLETE_CLASSES.input.base,
            className,
        ]
            .filter(Boolean)
            .join(' ');
    }
    return [
        AUTOCOMPLETE_CLASSES.input.base,
        AUTOCOMPLETE_CLASSES.input.variants[variant],
        AUTOCOMPLETE_CLASSES.input.sizes[size],
        error && AUTOCOMPLETE_CLASSES.input.error,
        round && AUTOCOMPLETE_CLASSES.input.round,
        hasIcon && AUTOCOMPLETE_CLASSES.input.hasIcon,
        className,
    ]
        .filter(Boolean)
        .join(' ');
}

/**
 * Extrae el texto a mostrar de una opción (objeto o string).
 */
export function getOptionText(option: AutocompleteOption, optionLabel: string): string {
    if (!option) return '';
    return typeof option === 'object' ? (option[optionLabel] ?? '') : String(option);
}

/**
 * Función de filtrado por defecto: busca el query en el texto de la opción.
 */
export function defaultFilter(
    item: AutocompleteOption,
    query: string,
    optionLabel: string,
): boolean {
    const text = getOptionText(item, optionLabel).toLowerCase();
    return text.includes(query.toLowerCase());
}
