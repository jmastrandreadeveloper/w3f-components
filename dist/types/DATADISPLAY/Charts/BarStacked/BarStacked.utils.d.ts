import type { BarStackedDatum } from './BarStacked.types';
import { formatTick } from '../_base/utils';
export declare function buildBarStackedClasses(className: string | undefined, unstyled: boolean | undefined): string;
export declare const defaultGetLabel: (d: BarStackedDatum) => string | number;
export declare function buildStackedScales(data: readonly BarStackedDatum[], keys: readonly string[], innerWidth: number, innerHeight: number, getLabel: (d: BarStackedDatum) => string | number, padding: number): {
    xScale: import("d3-scale").ScaleBand<string>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
};
/** Computes y0/y1 for each segment in each group. Pure arithmetic — no d3. */
export type StackSegment = {
    key: string;
    y0: number;
    y1: number;
    value: number;
};
export type StackedRow = {
    label: string;
    segments: StackSegment[];
};
export declare function computeStack(data: readonly BarStackedDatum[], keys: readonly string[], getLabel: (d: BarStackedDatum) => string | number): StackedRow[];
export { formatTick };
//# sourceMappingURL=BarStacked.utils.d.ts.map