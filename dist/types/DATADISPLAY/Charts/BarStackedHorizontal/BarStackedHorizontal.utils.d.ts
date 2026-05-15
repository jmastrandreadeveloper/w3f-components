import type { BarStackedHDatum } from './BarStackedHorizontal.types';
import { formatTick } from '../_base/utils';
export declare function buildBarSHClasses(className: string | undefined, unstyled: boolean | undefined): string;
export declare const defaultGetLabel: (d: BarStackedHDatum) => string | number;
export declare function buildStackedHScales(data: readonly BarStackedHDatum[], keys: readonly string[], innerWidth: number, innerHeight: number, getLabel: (d: BarStackedHDatum) => string | number, padding: number): {
    xScale: import("d3-scale").ScaleLinear<number, number, never>;
    yScale: import("d3-scale").ScaleBand<string>;
};
export type StackHSegment = {
    key: string;
    x0: number;
    x1: number;
    value: number;
};
export type StackedHRow = {
    label: string;
    segments: StackHSegment[];
};
export declare function computeStackH(data: readonly BarStackedHDatum[], keys: readonly string[], getLabel: (d: BarStackedHDatum) => string | number): StackedHRow[];
export { formatTick };
//# sourceMappingURL=BarStackedHorizontal.utils.d.ts.map