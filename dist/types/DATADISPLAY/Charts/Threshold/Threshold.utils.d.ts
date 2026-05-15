import type { ThresholdDatum } from './Threshold.types';
import { formatTick } from '../_base/utils';
export declare function buildThresholdClasses(className: string | undefined, unstyled: boolean | undefined): string;
export declare const defaultGetDate: (d: ThresholdDatum) => string | number | Date;
export declare const defaultGetValue0: (d: ThresholdDatum) => number;
export declare const defaultGetValue1: (d: ThresholdDatum) => number;
export declare function toDate(v: Date | number | string): Date;
export declare function buildThresholdScales(data: readonly ThresholdDatum[], innerWidth: number, innerHeight: number, getDate: (d: ThresholdDatum) => Date | number | string, getValue0: (d: ThresholdDatum) => number, getValue1: (d: ThresholdDatum) => number, yDomain?: [number, number]): {
    xScale: import("d3-scale").ScaleTime<number, number, never>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
};
export { formatTick };
//# sourceMappingURL=Threshold.utils.d.ts.map