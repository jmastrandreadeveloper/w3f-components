export const CHART_LEGEND_CLASSES = {
    root: 'w3f-chart-legend',
    horizontal: 'w3f-chart-legend--horizontal',
    vertical: 'w3f-chart-legend--vertical',
    item: 'w3f-chart-legend__item',
    itemDisabled: 'w3f-chart-legend__item--disabled',
    itemClickable: 'w3f-chart-legend__item--clickable',
    swatch: 'w3f-chart-legend__swatch',
    label: 'w3f-chart-legend__label',
} as const;

export const CHART_LEGEND_DEFAULTS = {
    swatchShape: 'square' as const,
    direction: 'horizontal' as const,
} as const;
