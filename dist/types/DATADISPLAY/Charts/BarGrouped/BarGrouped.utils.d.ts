import type { BarGroupedDatum } from './BarGrouped.types';
import { formatTick } from '../_base/utils';
export declare function buildBarGroupedClasses(className: string | undefined, unstyled: boolean | undefined): string;
export declare const defaultGetLabel: (d: BarGroupedDatum) => string | number;
export declare function buildGroupedScales(data: readonly BarGroupedDatum[], keys: readonly string[], innerWidth: number, innerHeight: number, getLabel: (d: BarGroupedDatum) => string | number, padding: number, yDomain?: [number, number]): {
    x0Scale: import("d3-scale").ScaleBand<string>;
    x1Scale: import("d3-scale").ScaleBand<string>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
};
export { formatTick };
//# sourceMappingURL=BarGrouped.utils.d.ts.map