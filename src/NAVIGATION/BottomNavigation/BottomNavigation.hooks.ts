import { useState, useCallback, useContext, createContext } from 'react';
import type React from 'react';
import type { BottomNavContextValue, BottomNavColor } from './BottomNavigation.types';

// ─── Contexto interno de BottomNavigation ─────────────────────────────────
export const BottomNavContext = createContext<BottomNavContextValue>({
    value: null,
    onChange: () => {},
    showLabels: true,
    color: 'primary',
});

// ─── Hook para el estado del BottomNavigation ──────────────────────────────
export function useBottomNav(
    valueProp: string | number | undefined,
    defaultValue: string | number | undefined,
    onChange: ((e: React.MouseEvent<HTMLButtonElement>, value: string | number) => void) | undefined,
    disabled: boolean,
) {
    const [internalValue, setInternalValue] = useState<string | number | null>(
        defaultValue ?? null,
    );
    const isControlled = valueProp !== undefined;
    const currentValue = isControlled ? valueProp! : internalValue;

    const handleChange = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>, newValue: string | number) => {
            if (disabled) return;
            if (!isControlled) setInternalValue(newValue);
            if (onChange) onChange(e, newValue);
        },
        [disabled, isControlled, onChange],
    );

    return { currentValue, handleChange };
}

// ─── Hook para las acciones (consume el contexto) ─────────────────────────
export function useBottomNavAction() {
    return useContext(BottomNavContext);
}

// ─── Hook para construir el valor del contexto ────────────────────────────
export function useBottomNavContext(
    currentValue: string | number | null,
    handleChange: (e: React.MouseEvent<HTMLButtonElement>, value: string | number) => void,
    showLabels: boolean,
    color: BottomNavColor,
): BottomNavContextValue {
    return { value: currentValue, onChange: handleChange, showLabels, color };
}
