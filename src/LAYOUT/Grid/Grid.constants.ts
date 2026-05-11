// ─── CSS Class tokens ─────────────────────────────────────────────
export const GRID_CLASSES = {
    base: 'w3f-grid',
} as const;

// ─── Valid column counts for class mapping ────────────────────────
export const VALID_GRID_COLS = ['1', '2', '3', '4', '5', '6', '7', '12'] as const;

// ─── Valid col-span values ────────────────────────────────────────
export const VALID_COL_SPANS = ['full', '1', '2', '3', '4', '6'] as const;
