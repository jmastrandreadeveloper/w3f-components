import type { BarStackedDatum } from './BarStacked.types';
import { BAR_STACKED_ROOT_CLASS } from './BarStacked.constants';
import { buildChartRootClasses, buildBandScale, buildLinearScale, formatTick } from '../_base/utils';

export function buildBarStackedClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(BAR_STACKED_ROOT_CLASS, className, unstyled);
}

export const defaultGetLabel = (d: BarStackedDatum) => d.label;

export function buildStackedScales(
    data: readonly BarStackedDatum[],
    keys: readonly string[],
    innerWidth: number,
    innerHeight: number,
    getLabel: (d: BarStackedDatum) => string | number,
    padding: number,
) {
    const labels = data.map((d) => String(getLabel(d)));

    let maxTotal = 0;
    for (const d of data) {
        let total = 0;
        for (const k of keys) total += Number(d[k]) || 0;
        if (total > maxTotal) maxTotal = total;
    }

    const xScale = buildBandScale(labels, [0, innerWidth], padding);
    const yScale = buildLinearScale(0, maxTotal, [innerHeight, 0]);

    return { xScale, yScale };
}

/** Computes y0/y1 for each segment in each group. Pure arithmetic — no d3. */
export type StackSegment = { key: string; y0: number; y1: number; value: number };
export type StackedRow = { label: string; segments: StackSegment[] };

export function computeStack(
    data: readonly BarStackedDatum[],
    keys: readonly string[],
    getLabel: (d: BarStackedDatum) => string | number,
): StackedRow[] {
    return data.map((d) => {
        let cumulative = 0;
        const segments: StackSegment[] = keys.map((key) => {
            const value = Number(d[key]) || 0;
            const y0 = cumulative;
            cumulative += value;
            return { key, y0, y1: cumulative, value };
        });
        return { label: String(getLabel(d)), segments };
    });
}

export { formatTick };
