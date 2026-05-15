import type { ChartMargin } from './types';
/** Default chart dimensions when width/height are not provided. */
export declare const DEFAULT_CHART_WIDTH = 600;
export declare const DEFAULT_CHART_HEIGHT = 300;
/** Default margin reserved for axes, labels, and padding. */
export declare const DEFAULT_CHART_MARGIN: ChartMargin;
/** Tighter margin for charts without axes (pie, donut, gauge, wordcloud). */
export declare const COMPACT_CHART_MARGIN: ChartMargin;
/** Base CSS class names shared by all charts. */
export declare const BASE_CHART_CLASSES: {
    readonly root: "w3f-chart";
    readonly rootUnstyled: "w3f-chart w3f-chart--unstyled";
    readonly svg: "w3f-chart__svg";
    readonly container: "w3f-chart__container";
    readonly tooltipLayer: "w3f-chart__tooltip-layer";
    readonly legendLayer: "w3f-chart__legend-layer";
    readonly title: "w3f-chart__title";
    readonly subtitle: "w3f-chart__subtitle";
    readonly header: "w3f-chart__header";
};
/** Padding for band scales — 0 tight, 1 max gap. */
export declare const DEFAULT_BAND_PADDING = 0.2;
/** Nice domain padding applied to linear scales. */
export declare const DOMAIN_PADDING_RATIO = 0.1;
//# sourceMappingURL=constants.d.ts.map