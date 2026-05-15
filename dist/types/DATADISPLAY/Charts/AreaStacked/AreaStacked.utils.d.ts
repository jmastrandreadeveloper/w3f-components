import type { AreaStackedData } from './AreaStacked.types';
import { formatTick } from '../_base/utils';
export declare function buildAreaStackedClasses(className: string | undefined, unstyled: boolean | undefined): string;
export declare function toDate(v: Date | number | string): Date;
export type StackPoint = {
    date: Date;
    y0: number;
    y1: number;
    value: number;
};
export type StackLayer = {
    key: string;
    points: StackPoint[];
};
export type StackResult = {
    dates: Date[];
    layers: StackLayer[];
};
/**
 * For each date point across all series, compute cumulative y0/y1 per key.
 * All series must share the same date points (aligned dates).
 */
export declare function computeAreaStack(data: AreaStackedData, keys: readonly string[]): StackResult;
export { formatTick };
//# sourceMappingURL=AreaStacked.utils.d.ts.map