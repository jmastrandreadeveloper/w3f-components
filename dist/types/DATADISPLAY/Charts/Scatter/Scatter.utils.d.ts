import type { ScatterDatum } from './Scatter.types';
import { formatTick } from '../_base/utils';
export declare function buildScatterClasses(className: string | undefined, unstyled: boolean | undefined): string;
export declare function buildScatterScales(data: readonly ScatterDatum[], innerWidth: number, innerHeight: number, getX: (d: ScatterDatum) => number, getY: (d: ScatterDatum) => number, xDomain?: [number, number], yDomain?: [number, number]): {
    xScale: import("d3-scale").ScaleLinear<number, number, never>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
};
export declare const defaultGetX: (d: ScatterDatum) => number;
export declare const defaultGetY: (d: ScatterDatum) => number;
export declare const defaultGetR: (d: ScatterDatum) => number;
export declare const defaultGetLabel: (d: ScatterDatum) => string;
export { formatTick };
export declare function buildTooltipContent(datum: ScatterDatum, getX: (d: ScatterDatum) => number, getY: (d: ScatterDatum) => number): string;
//# sourceMappingURL=Scatter.utils.d.ts.map