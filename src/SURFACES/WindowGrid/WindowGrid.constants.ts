import type { WindowGridBreakpoints, WindowGridColumns } from './WindowGrid.types';

export const WINDOW_GRID_DEFAULTS = {
    unstyled: false,
    gap: 'var(--w3f-space-4)',
    autoResponsive: true,
    responsiveBreakpoints: {
        sm: 400,
        md: 600,
        lg: 800,
        xl: 1000,
    } as WindowGridBreakpoints,
    responsiveColumns: {
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 6,
    } as WindowGridColumns,
} as const;

export const WINDOW_GRID_CLASSES = {
    gridBase: 'w3f-window-grid',
    gridBody: 'w3f-window-grid-body',
} as const;
