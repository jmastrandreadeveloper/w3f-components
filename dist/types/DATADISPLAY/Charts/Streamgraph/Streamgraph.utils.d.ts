import type { MultiSeriesTime } from '../_base/types';
export declare function buildStreamgraphClasses(className: string | undefined, unstyled: boolean | undefined): string;
export declare function toDate(v: Date | number | string): Date;
/**
 * Layer point for stream/stacked rendering.
 */
export type StreamLayer = {
    key: string;
    points: {
        date: Date;
        y0: number;
        y1: number;
        value: number;
    }[];
};
/**
 * Compute streamgraph layers with wiggle (silhouette) offset.
 * The baseline is centered around zero so the stream is symmetric.
 *
 * 1. Build a matrix [dateIndex][keyIndex] of values
 * 2. For each date, compute the total and center the baseline at -total/2
 * 3. Stack upward from the baseline
 */
export declare function computeStreamLayers(data: readonly MultiSeriesTime[], keys: readonly string[]): {
    dates: Date[];
    layers: StreamLayer[];
};
//# sourceMappingURL=Streamgraph.utils.d.ts.map