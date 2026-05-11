import type React from 'react';

export type TooltipPosition =
    | 'top' | 'bottom' | 'left' | 'right'
    | 'top-start' | 'top-end'
    | 'bottom-start' | 'bottom-end';

export type TooltipVariant = 'dark' | 'light' | 'primary' | 'success' | 'warning' | 'danger' | 'info';

export interface TooltipConfig {
    /** Texto del tooltip */
    message?: string;
    /** Posición del tooltip */
    position?: TooltipPosition;
    /** Delay antes de mostrar (ms) */
    showDelay?: number;
    /** Delay antes de ocultar (ms) */
    hideDelay?: number;
    /** Mostrar flecha indicadora */
    arrow?: boolean;
    /** Variante de color */
    variant?: TooltipVariant;
}

export interface TooltipProps {
    /** Elemento al que se adjunta el tooltip */
    children: React.ReactNode;
    /** Configuración del tooltip */
    config?: TooltipConfig;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
}
