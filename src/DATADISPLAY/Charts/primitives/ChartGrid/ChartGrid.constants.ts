export const CHART_GRID_CLASSES = {
    root: 'w3f-chart-grid',
    rows: 'w3f-chart-grid--rows',
    columns: 'w3f-chart-grid--columns',
} as const;

export const CHART_GRID_DEFAULTS = {
    axis: 'rows' as const,
    numTicks: 5,
} as const;
