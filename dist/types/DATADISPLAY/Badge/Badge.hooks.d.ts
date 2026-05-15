import type React from 'react';
import type { BadgeVariant } from './Badge.types';
/**
 * Centraliza el procesamiento de contenido y aria-label del Badge.
 * Permite reutilizar la lógica fuera del componente si fuera necesario.
 */
export declare function useBadgeContent(children: React.ReactNode, max: number, variant: BadgeVariant, ariaLabel: string): {
    processed: React.ReactNode;
    effectiveAriaLabel: string | undefined;
};
//# sourceMappingURL=Badge.hooks.d.ts.map