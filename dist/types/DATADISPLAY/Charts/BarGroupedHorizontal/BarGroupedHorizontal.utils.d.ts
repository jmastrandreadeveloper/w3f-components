import type { BarGroupedHDatum } from './BarGroupedHorizontal.types';
import { formatTick } from '../_base/utils';
export declare function buildBarGHClasses(className: string | undefined, unstyled: boolean | undefined): string;
export declare const defaultGetLabel: (d: BarGroupedHDatum) => string | number;
export declare function buildGroupedHScales(data: readonly BarGroupedHDatum[], keys: readonly string[], innerWidth: number, innerHeight: number, getLabel: (d: BarGroupedHDatum) => string | number, padding: number, xDomain?: [number, number]): {
    y0Scale: import("d3-scale").ScaleBand<string>;
    y1Scale: import("d3-scale").ScaleBand<string>;
    xScale: import("d3-scale").ScaleLinear<number, number, never>;
};
export { formatTick };
//# sourceMappingURL=BarGroupedHorizontal.utils.d.ts.map