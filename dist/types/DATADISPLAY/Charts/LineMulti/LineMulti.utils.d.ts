import type { MultiSeriesTime } from '../_base/types';
import { formatTick } from '../_base/utils';
export declare function buildLineMultiClasses(className: string | undefined, unstyled: boolean | undefined): string;
export declare function toDate(v: Date | number | string): Date;
export declare function buildMultiTimeScales(data: readonly MultiSeriesTime[], innerWidth: number, innerHeight: number): {
    xScale: import("d3-scale").ScaleTime<number, number, never>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
};
export { formatTick };
//# sourceMappingURL=LineMulti.utils.d.ts.map