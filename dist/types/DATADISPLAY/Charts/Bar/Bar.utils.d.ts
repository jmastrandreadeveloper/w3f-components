import type { BarDatum } from './Bar.types';
import { formatTick } from '../_base/utils';
export declare function buildBarClasses(className: string | undefined, unstyled: boolean | undefined): string;
export declare function buildBarScales(data: readonly BarDatum[], innerWidth: number, innerHeight: number, getLabel: (d: BarDatum) => string | number, getValue: (d: BarDatum) => number, padding: number, yDomain?: [number, number]): {
    xScale: import("d3-scale").ScaleBand<string>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
};
export declare const defaultGetLabel: (d: BarDatum) => string | number;
export declare const defaultGetValue: (d: BarDatum) => number;
export { formatTick };
export declare function buildTooltipContent(datum: BarDatum, getLabel: (d: BarDatum) => string | number, getValue: (d: BarDatum) => number): string;
//# sourceMappingURL=Bar.utils.d.ts.map