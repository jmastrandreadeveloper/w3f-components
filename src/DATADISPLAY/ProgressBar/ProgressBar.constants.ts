export const PROGRESS_BAR_DEFAULTS = {
  color: 'success' as const,
  showLabel: true as const,
  size: 'md' as const,
  unstyled: false as const,
} as const;

export const PROGRESS_BAR_BUFFER_DEFAULTS = {
  progressColor: 'success' as const,
  bufferColor: 'primary' as const,
  showLabel: true as const,
  size: 'md' as const,
} as const;

export const PROGRESS_BAR_INDETERMINATE_DEFAULTS = {
  color: 'primary' as const,
  ariaLabel: 'Cargando' as const,
  size: 'md' as const,
  variant: 'slide' as const,
} as const;
