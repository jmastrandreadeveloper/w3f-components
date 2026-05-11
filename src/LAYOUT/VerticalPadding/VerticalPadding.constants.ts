// ─── VerticalPadding Defaults ─────────────────────────────────────
export const VERTICAL_PADDING_DEFAULTS = {
    size: 'md' as const,
} as const;

// ─── Size to class map ───────────────────────────────────────────
export const SIZE_TO_PADDING_CLASS: Record<string, string> = {
    '0': 'w3f-py-0',
    none: 'w3f-py-0',
    xs: 'w3f-py-1',
    sm: 'w3f-py-2',
    md: 'w3f-py-4',
    lg: 'w3f-py-6',
    xl: 'w3f-py-8',
    '2xl': 'w3f-py-12',
    '3xl': 'w3f-py-16',
} as const;
