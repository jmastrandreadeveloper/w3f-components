import type { BarHorizontalDatum } from './BarHorizontal.types';
import { formatTick } from '../_base/utils';
export declare function buildBarHClasses(className: string | undefined, unstyled: boolean | undefined): string;
export declare function buildBarHScales(data: readonly BarHorizontalDatum[], innerWidth: number, innerHeight: number, getLabel: (d: BarHorizontalDatum) => string | number, getValue: (d: BarHorizontalDatum) => number, padding: number, xDomain?: [number, number]): {
    xScale: import("d3-scale").ScaleLinear<number, number, never>;
    yScale: import("d3-scale").ScaleBand<string>;
};
export declare const defaultGetLabel: (d: BarHorizontalDatum) => string | number;
export declare const defaultGetValue: (d: BarHorizontalDatum) => number;
export { formatTick };
export declare function buildTooltipContent(datum: BarHorizontalDatum, getLabel: (d: BarHorizontalDatum) => string | number, getValue: (d: BarHorizontalDatum) => number): string;
//# sourceMappingURL=BarHorizontal.utils.d.ts.map