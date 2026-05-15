import type { LineDatum } from './Line.types';
import { formatTick } from '../_base/utils';
export declare function buildLineClasses(className: string | undefined, unstyled: boolean | undefined): string;
export declare const defaultGetDate: (d: LineDatum) => string | number | Date;
export declare const defaultGetValue: (d: LineDatum) => number;
export declare function toDate(v: Date | number | string): Date;
export declare function buildTimeScales(data: readonly LineDatum[], innerWidth: number, innerHeight: number, getDate: (d: LineDatum) => Date | number | string, getValue: (d: LineDatum) => number, yDomain?: [number, number]): {
    xScale: import("d3-scale").ScaleTime<number, number, never>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
};
export { formatTick };
//# sourceMappingURL=Line.utils.d.ts.map