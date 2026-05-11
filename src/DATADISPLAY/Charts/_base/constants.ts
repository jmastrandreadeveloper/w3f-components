import type { ChartMargin } from './types';

/** Default chart dimensions when width/height are not provided. */
export const DEFAULT_CHART_WIDTH = 600;
export const DEFAULT_CHART_HEIGHT = 300;

/** Default margin reserved for axes, labels, and padding. */
export const DEFAULT_CHART_MARGIN: ChartMargin = {
    top: 20,
    right: 20,
    bottom: 40,
    left: 50,
};

/** Tighter margin for charts without axes (pie, donut, gauge, wordcloud). */
export const COMPACT_CHART_MARGIN: ChartMargin = {
    top: 8,
    right: 8,
    bottom: 8,
    left: 8,
};

/** Base CSS class names shared by all charts. */
export const BASE_CHART_CLASSES = {
    root: 'w3f-chart',
    rootUnstyled: 'w3f-chart w3f-chart--unstyled',
    svg: 'w3f-chart__svg',
    container: 'w3f-chart__container',
    tooltipLayer: 'w3f-chart__tooltip-layer',
    legendLayer: 'w3f-chart__legend-layer',
    title: 'w3f-chart__title',
    subtitle: 'w3f-chart__subtitle',
    header: 'w3f-chart__header',
} as const;

/** Padding for band scales — 0 tight, 1 max gap. */
export const DEFAULT_BAND_PADDING = 0.2;

/** Nice domain padding applied to linear scales. */
export const DOMAIN_PADDING_RATIO = 0.1;
