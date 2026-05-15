import type { CandlestickDatum } from './Candlestick.types';
import { formatTick } from '../_base/utils';
export declare function buildCandlestickClasses(className: string | undefined, unstyled: boolean | undefined): string;
export type CandleGeometry = {
    datum: CandlestickDatum;
    index: number;
    isBullish: boolean;
};
/**
 * Parse date strings/numbers to Date for consistent handling.
 */
export declare function toDate(d: Date | number | string): Date;
/**
 * Build scales for candlestick chart.
 */
export declare function buildCandlestickScales(data: readonly CandlestickDatum[], innerWidth: number, innerHeight: number, volumeHeight: number): {
    xScale: import("d3-scale").ScaleBand<string>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
    volumeScale: import("d3-scale").ScaleLinear<number, number, never> | null;
    priceChartHeight: number;
};
export declare function buildTooltipContent(datum: CandlestickDatum): string;
export declare function defaultFormatX(d: Date | number | string): string;
export { formatTick };
//# sourceMappingURL=Candlestick.utils.d.ts.map