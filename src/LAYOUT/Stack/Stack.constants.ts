// ─── Stack Defaults ───────────────────────────────────────────────
export const STACK_DEFAULTS = {
    horizontal: false,
    size: 'default' as const,
} as const;

// ─── CSS Class tokens ─────────────────────────────────────────────
export const STACK_CLASSES = {
    vertical:   'w3f-stack',
    verticalSm: 'w3f-stack-sm',
    horizontal:  'w3f-h-stack',
} as const;

// ─── Flex value maps ──────────────────────────────────────────────
export const ALIGN_MAP: Record<string, string> = {
    start:    'flex-start',
    center:   'center',
    end:      'flex-end',
    stretch:  'stretch',
    baseline: 'baseline',
};

export const JUSTIFY_MAP: Record<string, string> = {
    start:   'flex-start',
    center:  'center',
    end:     'flex-end',
    between: 'space-between',
    around:  'space-around',
    evenly:  'space-evenly',
};
