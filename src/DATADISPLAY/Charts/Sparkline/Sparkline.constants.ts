export const SPARKLINE_ROOT_CLASS = 'w3f-chart-sparkline';

export const SPARKLINE_DEFAULTS = {
    color: '#6366f1',
    showArea: true,
    showEndDot: true,
    showMinMax: false,
    strokeWidth: 2,
    curve: 'monotone' as const,
    showTooltip: false,
    unstyled: false,
} as const;
