export const MODAL_DEFAULTS = {
  size: 'md' as const,
  closeOnBackdrop: true as const,
  showCloseButton: true as const,
  headerVariant: 'primary' as const,
  unstyled: false as const,
} as const;

export const MODAL_CONFIRM_DEFAULTS = {
  title: '¿Estás seguro?' as const,
  confirmText: 'Confirmar' as const,
  cancelText: 'Cancelar' as const,
  variant: 'danger' as const,
} as const;
