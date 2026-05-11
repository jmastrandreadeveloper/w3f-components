// Link tiene lógica mínima — este hook centraliza el handler de click
import type React from 'react';

/**
 * Hook que retorna un handler de click seguro para Link.
 * Previene la navegación si el link está deshabilitado.
 */
export function useLinkClick(
    disabled: boolean,
    onClick: ((e: React.MouseEvent) => void) | undefined,
) {
    return (e: React.MouseEvent) => {
        if (disabled) {
            e.preventDefault();
            return;
        }
        if (onClick) onClick(e);
    };
}
