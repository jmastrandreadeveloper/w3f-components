import type { BoxPlotGroup, BoxPlotStats } from './BoxPlot.types';
import { BOXPLOT_ROOT_CLASS } from './BoxPlot.constants';
import { buildChartRootClasses, buildBandScale, buildLinearScale, safeExtent, formatTick } from '../_base/utils';

export function buildBoxPlotClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(BOXPLOT_ROOT_CLASS, className, unstyled);
}

function quantile(sorted: number[], q: number): number {
    const pos = (sorted.length - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;
    return sorted[base + 1] !== undefined
        ? sorted[base] + rest * (sorted[base + 1] - sorted[base])
        : sorted[base];
}

export function computeStats(group: BoxPlotGroup): BoxPlotStats {
    const sorted = [...group.values].sort((a, b) => a - b);
    const q1 = quantile(sorted, 0.25);
    const median = quantile(sorted, 0.5);
    const q3 = quantile(sorted, 0.75);
    const iqr = q3 - q1;
    const lowerFence = q1 - 1.5 * iqr;
    const upperFence = q3 + 1.5 * iqr;
    const outliers = sorted.filter((v) => v < lowerFence || v > upperFence);
    const whiskerMin = Math.min(...sorted.filter((v) => v >= lowerFence));
    const whiskerMax = Math.max(...sorted.filter((v) => v <= upperFence));

    return {
        group: group.group,
        min: whiskerMin,
        firstQuartile: q1,
        median,
        thirdQuartile: q3,
        max: whiskerMax,
        outliers,
    };
}

export function buildBoxPlotScales(
    stats: readonly BoxPlotStats[],
    innerWidth: number,
    innerHeight: number,
    yDomain?: [number, number],
) {
    const groups = stats.map((s) => s.group);
    const allValues = stats.flatMap((s) => [s.min, s.max, ...s.outliers]);
    const [yMin, yMax] = yDomain ?? safeExtent(allValues);

    const xScale = buildBandScale(groups, [0, innerWidth], 0.3);
    const yScale = buildLinearScale(yMin, yMax, [innerHeight, 0]);

    return { xScale, yScale };
}

export { formatTick };

export function buildTooltipContent(stats: BoxPlotStats): string {
    return `${stats.group}: med=${stats.median.toFixed(1)}, Q1=${stats.firstQuartile.toFixed(1)}, Q3=${stats.thirdQuartile.toFixed(1)}`;
}
