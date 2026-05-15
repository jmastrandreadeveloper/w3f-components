import type { DotPlotDatum } from './DotPlot.types';
import { formatTick } from '../_base/utils';
export declare function buildDotPlotClasses(className: string | undefined, unstyled: boolean | undefined): string;
export declare function buildDotPlotScales(data: readonly DotPlotDatum[], categories: readonly string[], innerWidth: number, innerHeight: number, getX: (d: DotPlotDatum) => number, xDomain?: [number, number]): {
    xScale: import("d3-scale").ScaleLinear<number, number, never>;
    yScale: import("d3-scale").ScaleBand<string>;
};
export declare const defaultGetX: (d: DotPlotDatum) => number;
export declare const defaultGetCategory: (d: DotPlotDatum) => number;
export { formatTick };
export declare function buildTooltipContent(datum: DotPlotDatum, getX: (d: DotPlotDatum) => number, category: string): string;
//# sourceMappingURL=DotPlot.utils.d.ts.map