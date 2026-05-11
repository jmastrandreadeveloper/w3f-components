import type { AreaStackedData } from './AreaStacked.types';
import { AREA_STACKED_ROOT_CLASS } from './AreaStacked.constants';
import { buildChartRootClasses, formatTick } from '../_base/utils';

export function buildAreaStackedClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(AREA_STACKED_ROOT_CLASS, className, unstyled);
}

export function toDate(v: Date | number | string): Date {
    return v instanceof Date ? v : new Date(v);
}

// ── Stack computation (pure arithmetic — no d3-shape) ────────────────

export type StackPoint = { date: Date; y0: number; y1: number; value: number };
export type StackLayer = { key: string; points: StackPoint[] };
export type StackResult = { dates: Date[]; layers: StackLayer[] };

/**
 * For each date point across all series, compute cumulative y0/y1 per key.
 * All series must share the same date points (aligned dates).
 */
export function computeAreaStack(data: AreaStackedData, keys: readonly string[]): StackResult {
    // Build a lookup: seriesId → index in data array
    const seriesMap = new Map<string, readonly { date: Date | number | string; value: number }[]>();
    for (const series of data) {
        seriesMap.set(series.id, series.data);
    }

    // Use the first matching series' dates as the reference (all aligned)
    const refSeries = seriesMap.get(keys[0]);
    if (!refSeries || refSeries.length === 0) {
        return { dates: [], layers: keys.map((key) => ({ key, points: [] })) };
    }

    const dates = refSeries.map((pt) => toDate(pt.date));
    const numPoints = dates.length;

    // Build layers with cumulative stacking
    const layers: StackLayer[] = [];

    for (const key of keys) {
        const seriesData = seriesMap.get(key);
        const points: StackPoint[] = [];

        for (let i = 0; i < numPoints; i++) {
            const value = seriesData ? (seriesData[i]?.value ?? 0) : 0;
            // y0 = sum of all previous layers at this index
            let baseline = 0;
            for (const prevLayer of layers) {
                baseline += prevLayer.points[i]?.value ?? 0;
            }
            points.push({
                date: dates[i],
                y0: baseline,
                y1: baseline + value,
                value,
            });
        }

        layers.push({ key, points });
    }

    return { dates, layers };
}

export { formatTick };
