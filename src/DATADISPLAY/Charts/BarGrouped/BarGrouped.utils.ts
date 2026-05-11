import { scaleBand } from '@visx/scale';
import type { BarGroupedDatum } from './BarGrouped.types';
import { BAR_GROUPED_ROOT_CLASS } from './BarGrouped.constants';
import {
    buildChartRootClasses,
    buildBandScale,
    buildLinearScale,
    formatTick,
} from '../_base/utils';

export function buildBarGroupedClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(BAR_GROUPED_ROOT_CLASS, className, unstyled);
}

export const defaultGetLabel = (d: BarGroupedDatum) => d.label;

export function buildGroupedScales(
    data: readonly BarGroupedDatum[],
    keys: readonly string[],
    innerWidth: number,
    innerHeight: number,
    getLabel: (d: BarGroupedDatum) => string | number,
    padding: number,
    yDomain?: [number, number],
) {
    const labels = data.map((d) => String(getLabel(d)));

    // Find max across all keys
    let max = 0;
    for (const d of data) {
        for (const k of keys) {
            const v = Number(d[k]) || 0;
            if (v > max) max = v;
        }
    }
    const [minVal, maxVal] = yDomain ?? [0, max];

    const x0Scale = buildBandScale(labels, [0, innerWidth], padding);
    const x1Scale = scaleBand<string>({
        domain: [...keys],
        range: [0, x0Scale.bandwidth()],
        padding: 0.05,
    });
    const yScale = buildLinearScale(minVal, maxVal, [innerHeight, 0]);

    return { x0Scale, x1Scale, yScale };
}

export { formatTick };
