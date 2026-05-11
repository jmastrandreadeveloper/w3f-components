// ─── FlexContainer Defaults ───────────────────────────────────────
export const FLEX_CONTAINER_DEFAULTS = {
    direction: 'row' as const,
    wrap: 'nowrap' as const,
    justifyContent: 'start',
    alignItems: 'stretch',
    alignContent: 'stretch',
    inline: false,
} as const;

// ─── FlexBoxItem Defaults ─────────────────────────────────────────
export const FLEX_BOX_ITEM_DEFAULTS = {
    bgColor: '#3498db',
} as const;

// ─── Standard values for class mapping ────────────────────────────
export const STANDARD_DIRECTIONS = ['row', 'row-reverse', 'column', 'column-reverse'] as const;
export const STANDARD_WRAPS = [true, false, 'wrap', 'nowrap', 'wrap-reverse'] as const;
export const STANDARD_JUSTIFY = ['start', 'end', 'center', 'between', 'around', 'evenly'] as const;
export const STANDARD_ALIGN = ['start', 'end', 'center', 'baseline', 'stretch'] as const;
export const STANDARD_ALIGN_CONTENT = ['start', 'end', 'center', 'between', 'around', 'stretch'] as const;
