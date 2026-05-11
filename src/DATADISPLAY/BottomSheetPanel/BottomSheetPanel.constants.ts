import type { BottomSheetSize } from './BottomSheetPanel.types';

export const SIZE_MAX_HEIGHTS: Record<BottomSheetSize, string> = {
  small: '35vh',
  medium: '60vh',
  large: '85vh',
  full: '95vh',
  auto: 'calc(100vh - 64px)',
};

export const BSP_DEFAULTS = {
  size: 'auto' as BottomSheetSize,
  showCloseButton: true,
  closeOnBackdropClick: true,
  closeOnEscape: true,
  className: '',
  unstyled: false as const,
} as const;
