import type { HistogramBin } from './Histogram.types';
import { formatTick } from '../_base/utils';
export declare function buildHistogramClasses(className: string | undefined, unstyled: boolean | undefined): string;
export declare function computeBins(values: readonly number[], binCount: number, xDomain?: [number, number]): HistogramBin[];
export declare function buildHistogramScales(bins: readonly HistogramBin[], innerWidth: number, innerHeight: number): {
    xScale: import("d3-scale").ScaleLinear<number, number, never>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
};
export { formatTick };
export declare function buildTooltipContent(bin: HistogramBin): string;
//# sourceMappingURL=Histogram.utils.d.ts.map