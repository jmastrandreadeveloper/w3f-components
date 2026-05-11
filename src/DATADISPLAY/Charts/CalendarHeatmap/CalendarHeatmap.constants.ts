export const CALENDAR_ROOT_CLASS = 'w3f-chart-calendar-heatmap';

export const CALENDAR_DEFAULTS = {
    showMonthLabels: true,
    showDayLabels: true,
    showTooltip: true,
    emptyColor: '#ebedf0',
    colorRamp: ['#9be9a8', '#40c463', '#30a14e', '#216e39'] as readonly string[],
    cellGap: 2,
    cellRadius: 2,
    unstyled: false,
} as const;
