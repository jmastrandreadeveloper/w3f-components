import type React from 'react';
import type { ButtonColor, ButtonSize } from '../Button/Button.types';

// ─── Tipos de valor ────────────────────────────────────────────────
export type ButtonToggleValue = string | number | Array<string | number> | null;

// ─── Estructura de una opción ──────────────────────────────────────
export interface ButtonToggleOption {
    value: string | number;
    label: React.ReactNode;
    disabled?: boolean;
}

// ─── Evento sintético para integración con Form ───────────────────
export interface ButtonToggleChangeEvent {
    target: {
        name?: string;
        value: ButtonToggleValue;
    };
}

// ─── Props del componente ──────────────────────────────────────────
export interface ButtonToggleProps {
    options?: ButtonToggleOption[];
    onSelect?: (value: ButtonToggleValue) => void;
    /** Valor controlado externamente */
    value?: ButtonToggleValue;
    /** Valor inicial en modo no controlado */
    defaultValue?: ButtonToggleValue;
    multiple?: boolean;
    /** Permite deseleccionar en modo simple */
    allowDeselect?: boolean;
    color?: ButtonColor;
    size?: ButtonSize;
    disabled?: boolean;
    ariaLabel?: string;
    /** If true, removes all visual/preset styles — only structural CSS remains. */
    unstyled?: boolean;
    className?: string;
    /** Nombre del campo para integración con Form/LiveForm */
    name?: string;
    onChange?: (e: ButtonToggleChangeEvent) => void;
}
