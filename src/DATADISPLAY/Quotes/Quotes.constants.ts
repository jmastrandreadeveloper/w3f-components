import type { QuoteColor, QuoteSize } from './Quotes.types';

export const QUOTES_DEFAULTS = {
  color: 'primary' as QuoteColor,
  size: 'md' as QuoteSize,
  showQuoteMark: true,
  unstyled: false,
} as const;
