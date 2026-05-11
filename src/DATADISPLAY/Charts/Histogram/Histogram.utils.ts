import type { HistogramBin } from './Histogram.types';
import { HISTOGRAM_ROOT_CLASS } from './Histogram.constants';
import { buildChartRootClasses, buildLinearScale, safeExtent, formatTick } from '../_base/utils';

export function buildHistogramClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(HISTOGRAM_ROOT_CLASS, className, unstyled);
}

export function computeBins(values: readonly number[], binCount: number, xDomain?: [number, number]): HistogramBin[] {
    if (values.length === 0) return [];
    const [min, max] = xDomain ?? safeExtent(values as number[]);
    const step = (max - min) / binCount;
    const bins: HistogramBin[] = Array.from({ length: binCount }, (_, i) => ({
        x0: min + i * step,
        x1: min + (i + 1) * step,
        count: 0,
    }));
    for (const v of values) {
        let idx = Math.floor((v - min) / step);
        if (idx >= binCount) idx = binCount - 1;
        if (idx < 0) idx = 0;
        bins[idx].count++;
    }
    return bins;
}

export function buildHistogramScales(
    bins: readonly HistogramBin[],
    innerWidth: number,
    innerHeight: number,
) {
    const xMin = bins.length > 0 ? bins[0].x0 : 0;
    const xMax = bins.length > 0 ? bins[bins.length - 1].x1 : 1;
    const yMax = Math.max(...bins.map((b) => b.count), 1);

    const xScale = buildLinearScale(xMin, xMax, [0, innerWidth]);
    const yScale = buildLinearScale(0, yMax, [innerHeight, 0]);

    return { xScale, yScale };
}

export { formatTick };

export function buildTooltipContent(bin: HistogramBin): string {
    return `${bin.x0.toFixed(1)}–${bin.x1.toFixed(1)}: ${bin.count}`;
}
