import type { PaperGridColor, PaperSize, PaperVariant } from './Paper.types';

export const PAPER_DEFAULTS = {
    variant: 'default' as PaperVariant,
    gridColor: 'default' as PaperGridColor,
    size: 'md' as PaperSize,
    fullWidth: false,
    debug: false,
    className: '',
    unstyled: false,
} as const;

export const PAPER_CLASSES = {
    base: 'w3f-paper',
    fullWidth: 'w3f-paper--full-width',
    debug: 'w3f-paper--debug',
} as const;
