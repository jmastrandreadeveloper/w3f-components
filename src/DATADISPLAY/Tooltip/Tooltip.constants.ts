import type { TooltipConfig } from './Tooltip.types';

export const TOOLTIP_DEFAULTS = {
  message: 'Tooltip' as const,
  position: 'top' as const,
  showDelay: 0 as const,
  hideDelay: 0 as const,
  arrow: true as const,
  variant: 'dark' as const,
  unstyled: false as const,
} as const;

/**
 * Configuraciones preset de Tooltip.
 */
export const tooltipConfigs: Record<string, TooltipConfig> = {
    DEFAULT: {
        message: 'Tooltip cargado desde un archivo de configuración externo (JSON).',
    },
    UPPER_DELAYED: {
        message: 'Aparezco arriba después de 500ms, ¡como en Angular Material!',
        position: 'top',
        showDelay: 500,
    },
    SLOW_HIDE: {
        message: '¡Me quedo 1 segundo extra! (hideDelay: 1000ms)',
        position: 'left',
        hideDelay: 1000,
    },
    BELOW_IMPORTANT: {
        message: 'Advertencia: posición inferior.',
        position: 'bottom',
    },
};
