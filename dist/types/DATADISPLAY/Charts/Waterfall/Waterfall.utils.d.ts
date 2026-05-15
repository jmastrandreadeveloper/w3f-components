import type { WaterfallDatum } from './Waterfall.types';
import { formatTick } from '../_base/utils';
export declare function buildWaterfallClasses(className: string | undefined, unstyled: boolean | undefined): string;
export type WaterfallBar = {
    datum: WaterfallDatum;
    index: number;
    y0: number;
    y1: number;
    cumulative: number;
};
/**
 * Compute cumulative bar positions for a waterfall chart.
 */
export declare function computeWaterfallBars(data: readonly WaterfallDatum[]): WaterfallBar[];
export declare function buildWaterfallScales(bars: readonly WaterfallBar[], data: readonly WaterfallDatum[], innerWidth: number, innerHeight: number): {
    xScale: import("d3-scale").ScaleBand<string>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
};
export declare function buildTooltipContent(bar: WaterfallBar): string;
export { formatTick };
//# sourceMappingURL=Waterfall.utils.d.ts.map