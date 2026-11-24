import type React from 'react';
/**
 * Hook para manejar la visibilidad del tooltip con delays.
 */
export declare const useTooltipVisibility: (showDelay: number, hideDelay: number) => {
    isVisible: boolean;
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
    handleFocus: (e: React.FocusEvent) => void;
    handleBlur: () => void;
};
//# sourceMappingURL=Tooltip.hooks.d.ts.map