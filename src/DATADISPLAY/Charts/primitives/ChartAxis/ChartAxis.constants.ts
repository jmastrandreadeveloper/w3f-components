export const CHART_AXIS_CLASSES = {
    root: 'w3f-chart-axis',
    top: 'w3f-chart-axis--top',
    right: 'w3f-chart-axis--right',
    bottom: 'w3f-chart-axis--bottom',
    left: 'w3f-chart-axis--left',
} as const;

export const CHART_AXIS_DEFAULTS = {
    numTicks: 5,
    labelOffset: 36,
    hideAxisLine: false,
    hideTicks: false,
    hideTickLabels: false,
} as const;

export const CHART_AXIS_TICK_LABEL_PROPS = {
    fill: 'var(--w3f-chart-axis-tick-label-color)',
    fontSize: 'var(--w3f-chart-axis-tick-label-size, 11px)' as unknown as number,
    fontFamily: 'inherit',
} as const;
