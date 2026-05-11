/** BEM root class for the Bar chart. */
export const BAR_ROOT_CLASS = 'w3f-chart-bar';

/** Default props that Bar uses when not explicitly overridden. */
export const BAR_DEFAULTS = {
    showXAxis: true,
    showYAxis: true,
    showGrid: true,
    showTooltip: true,
    showLegend: false,
    padding: 0.2,
    barRadius: 2,
    unstyled: false,
} as const;
