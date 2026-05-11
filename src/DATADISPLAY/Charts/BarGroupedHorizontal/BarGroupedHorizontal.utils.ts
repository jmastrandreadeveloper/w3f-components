import { scaleBand } from '@visx/scale';
import type { BarGroupedHDatum } from './BarGroupedHorizontal.types';
import { BAR_GH_ROOT_CLASS } from './BarGroupedHorizontal.constants';
import { buildChartRootClasses, buildBandScale, buildLinearScale, formatTick } from '../_base/utils';

export function buildBarGHClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(BAR_GH_ROOT_CLASS, className, unstyled);
}

export const defaultGetLabel = (d: BarGroupedHDatum) => d.label;

export function buildGroupedHScales(
    data: readonly BarGroupedHDatum[],
    keys: readonly string[],
    innerWidth: number,
    innerHeight: number,
    getLabel: (d: BarGroupedHDatum) => string | number,
    padding: number,
    xDomain?: [number, number],
) {
    const labels = data.map((d) => String(getLabel(d)));
    let max = 0;
    for (const d of data) {
        for (const k of keys) {
            const v = Number(d[k]) || 0;
            if (v > max) max = v;
        }
    }
    const [minVal, maxVal] = xDomain ?? [0, max];

    const y0Scale = buildBandScale(labels, [0, innerHeight], padding);
    const y1Scale = scaleBand<string>({
        domain: [...keys],
        range: [0, y0Scale.bandwidth()],
        padding: 0.05,
    });
    const xScale = buildLinearScale(minVal, maxVal, [0, innerWidth]);

    return { y0Scale, y1Scale, xScale };
}

export { formatTick };
