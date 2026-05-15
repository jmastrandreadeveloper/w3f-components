import type { BoxPlotGroup, BoxPlotStats } from './BoxPlot.types';
import { formatTick } from '../_base/utils';
export declare function buildBoxPlotClasses(className: string | undefined, unstyled: boolean | undefined): string;
export declare function computeStats(group: BoxPlotGroup): BoxPlotStats;
export declare function buildBoxPlotScales(stats: readonly BoxPlotStats[], innerWidth: number, innerHeight: number, yDomain?: [number, number]): {
    xScale: import("d3-scale").ScaleBand<string>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
};
export { formatTick };
export declare function buildTooltipContent(stats: BoxPlotStats): string;
//# sourceMappingURL=BoxPlot.utils.d.ts.map