import type { BarStackedHDatum } from './BarStackedHorizontal.types';
import { BAR_SH_ROOT_CLASS } from './BarStackedHorizontal.constants';
import { buildChartRootClasses, buildBandScale, buildLinearScale, formatTick } from '../_base/utils';

export function buildBarSHClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(BAR_SH_ROOT_CLASS, className, unstyled);
}

export const defaultGetLabel = (d: BarStackedHDatum) => d.label;

export function buildStackedHScales(
    data: readonly BarStackedHDatum[],
    keys: readonly string[],
    innerWidth: number,
    innerHeight: number,
    getLabel: (d: BarStackedHDatum) => string | number,
    padding: number,
) {
    const labels = data.map((d) => String(getLabel(d)));
    let maxTotal = 0;
    for (const d of data) {
        let total = 0;
        for (const k of keys) total += Number(d[k]) || 0;
        if (total > maxTotal) maxTotal = total;
    }

    const yScale = buildBandScale(labels, [0, innerHeight], padding);
    const xScale = buildLinearScale(0, maxTotal, [0, innerWidth]);

    return { xScale, yScale };
}

export type StackHSegment = { key: string; x0: number; x1: number; value: number };
export type StackedHRow = { label: string; segments: StackHSegment[] };

export function computeStackH(
    data: readonly BarStackedHDatum[],
    keys: readonly string[],
    getLabel: (d: BarStackedHDatum) => string | number,
): StackedHRow[] {
    return data.map((d) => {
        let cumulative = 0;
        const segments: StackHSegment[] = keys.map((key) => {
            const value = Number(d[key]) || 0;
            const x0 = cumulative;
            cumulative += value;
            return { key, x0, x1: cumulative, value };
        });
        return { label: String(getLabel(d)), segments };
    });
}

export { formatTick };
