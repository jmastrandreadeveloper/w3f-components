import type { FontSize, FontFamily, FontWeight, FontWritingMode, FontTransform } from './Fonts.types';

export const FONTS_DEFAULTS = {
  text: 'Texto de ejemplo',
  customClasses: '',
  size: 'base' as FontSize,
  family: 'sans' as FontFamily,
  weight: 'normal' as FontWeight,
  italic: false,
  underline: false,
  writingMode: 'horizontal' as FontWritingMode,
  transform: 'none' as FontTransform,
  unstyled: false,
} as const;
