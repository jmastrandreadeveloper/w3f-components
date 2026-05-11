import { STREAMGRAPH_ROOT_CLASS } from './Streamgraph.constants';
import { buildChartRootClasses } from '../_base/utils';
import type { MultiSeriesTime } from '../_base/types';

export function buildStreamgraphClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(STREAMGRAPH_ROOT_CLASS, className, unstyled);
}

export function toDate(v: Date | number | string): Date {
    return v instanceof Date ? v : new Date(v);
}

/**
 * Layer point for stream/stacked rendering.
 */
export type StreamLayer = {
    key: string;
    points: { date: Date; y0: number; y1: number; value: number }[];
};

/**
 * Compute streamgraph layers with wiggle (silhouette) offset.
 * The baseline is centered around zero so the stream is symmetric.
 *
 * 1. Build a matrix [dateIndex][keyIndex] of values
 * 2. For each date, compute the total and center the baseline at -total/2
 * 3. Stack upward from the baseline
 */
export function computeStreamLayers(
    data: readonly MultiSeriesTime[],
    keys: readonly string[],
): { dates: Date[]; layers: StreamLayer[] } {
    if (data.length === 0 || keys.length === 0) return { dates: [], layers: [] };

    // Map series id → series data for fast lookup
    const seriesMap = new Map<string, readonly { date: Date | number | string; value: number }[]>();
    for (const s of data) seriesMap.set(s.id, s.data);

    // Use dates from the first matching series
    const firstSeries = seriesMap.get(keys[0]);
    if (!firstSeries || firstSeries.length === 0) return { dates: [], layers: [] };

    const dates = firstSeries.map((pt) => toDate(pt.date));
    const numDates = dates.length;

    // Build value matrix [keyIdx][dateIdx]
    const matrix: number[][] = keys.map((key) => {
        const series = seriesMap.get(key);
        if (!series) return new Array(numDates).fill(0);
        return series.map((pt) => pt.value);
    });

    // For each date, compute total and center baseline
    const layers: StreamLayer[] = keys.map((key) => ({
        key,
        points: [] as StreamLayer['points'],
    }));

    for (let di = 0; di < numDates; di++) {
        let total = 0;
        for (let ki = 0; ki < keys.length; ki++) total += matrix[ki][di];

        let y0 = -total / 2; // centered baseline
        for (let ki = 0; ki < keys.length; ki++) {
            const value = matrix[ki][di];
            const y1 = y0 + value;
            layers[ki].points.push({ date: dates[di], y0, y1, value });
            y0 = y1;
        }
    }

    return { dates, layers };
}
