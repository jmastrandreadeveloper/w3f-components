import type { AreaDatum } from './Area.types';
import { formatTick } from '../_base/utils';
export declare function buildAreaClasses(className: string | undefined, unstyled: boolean | undefined): string;
export declare const defaultGetDate: (d: AreaDatum) => string | number | Date;
export declare const defaultGetValue: (d: AreaDatum) => number;
export declare function toDate(v: Date | number | string): Date;
export declare function buildAreaScales(data: readonly AreaDatum[], innerWidth: number, innerHeight: number, getDate: (d: AreaDatum) => Date | number | string, getValue: (d: AreaDatum) => number, yDomain?: [number, number]): {
    xScale: import("d3-scale").ScaleTime<number, number, never>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
};
export { formatTick };
//# sourceMappingURL=Area.utils.d.ts.map