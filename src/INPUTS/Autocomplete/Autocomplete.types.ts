import type React from 'react';

// ─── Tipos de variantes ────────────────────────────────────────────
export type AutocompleteVariant = 'outline' | 'filled' | 'flushed';
export type AutocompleteSize = 'sm' | 'md' | 'lg';

// ─── Estructura de opción genérica ────────────────────────────────
export type AutocompleteOption = Record<string, any> | string;

// ─── Props del componente ──────────────────────────────────────────
export interface AutocompleteProps {
    /** Array de opciones a filtrar */
    data: AutocompleteOption[];
    /** Callback cuando el usuario selecciona una opción */
    onSelect?: (item: AutocompleteOption | null) => void;
    /** Propiedad del objeto que se muestra como texto */
    optionLabel?: string;
    /** Función de filtrado personalizada */
    filterFn?: (item: AutocompleteOption, query: string) => boolean;
    maxResults?: number;
    emptyMessage?: string;
    clearable?: boolean;
    className?: string;
    variant?: AutocompleteVariant;
    size?: AutocompleteSize;
    error?: boolean | string;
    round?: boolean;
    searchIcon?: boolean;
    placeholder?: string;
    /** Nombre del campo para integración con Form/LiveForm */
    name?: string;
    value?: string;
    onChange?: (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | { target: { name?: string; value: string } },
    ) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    label?: string;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
    /** Bridge binding ID — connects this component to business logic via the Bridge. */
    bindId?: string;
}
