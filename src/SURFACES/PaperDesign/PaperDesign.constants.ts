import type { PaperDesignGap } from './PaperDesign.types';

export const PAPER_DESIGN_DEFAULTS = {
    columns: 1,
    gap: 'md' as PaperDesignGap,
    unstyled: false,
} as const;

/** Map de gap a variable CSS del espacio */
export const GAP_MAP: Record<PaperDesignGap, string> = {
    none: '0',
    xs: 'var(--w3f-space-1)',
    sm: 'var(--w3f-space-2)',
    md: 'var(--w3f-space-4)',
    lg: 'var(--w3f-space-6)',
    xl: 'var(--w3f-space-8)',
};

export const PAPER_DESIGN_CLASSES = {
    grid: 'w3f-paper-design-grid',
} as const;
