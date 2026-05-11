// ─── ButtonGrid Defaults ──────────────────────────────────────────
export const BUTTON_GRID_DEFAULTS = {
    align: 'start' as const,
    as: 'div' as const,
} as const;

// ─── CSS Class tokens ─────────────────────────────────────────────
export const BUTTON_GRID_CLASSES = {
    base: 'w3f-flex',
    gap: 'w3f-gap-4',
    wrap: 'w3f-flex-wrap',
    mt: 'w3f-mt-4',
} as const;

// ─── Align map ────────────────────────────────────────────────────
export const BUTTON_GRID_ALIGN_MAP = {
    start: 'w3f-items-start',
    center: 'w3f-items-center',
    end: 'w3f-items-end',
    stretch: 'w3f-items-stretch',
} as const;
