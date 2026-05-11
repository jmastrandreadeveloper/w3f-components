import type { ViolinGroup } from './Violin.types';
import { VIOLIN_ROOT_CLASS } from './Violin.constants';
import { buildChartRootClasses, buildBandScale, buildLinearScale, safeExtent, formatTick } from '../_base/utils';

export function buildViolinClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(VIOLIN_ROOT_CLASS, className, unstyled);
}

/** Simple kernel density estimation using Gaussian kernel. */
export function kde(
    values: number[],
    min: number,
    max: number,
    resolution: number,
    bandwidthMul: number,
): { value: number; density: number }[] {
    if (values.length === 0) return [];
    const sorted = [...values].sort((a, b) => a - b);
    const n = sorted.length;
    // Silverman's rule of thumb
    const std = Math.sqrt(sorted.reduce((s, v) => s + (v - sorted[n >> 1]) ** 2, 0) / n) || 1;
    const h = 1.06 * std * Math.pow(n, -0.2) * bandwidthMul;
    const step = (max - min) / resolution;
    const points: { value: number; density: number }[] = [];

    for (let i = 0; i <= resolution; i++) {
        const x = min + i * step;
        let sum = 0;
        for (const v of sorted) {
            const z = (x - v) / h;
            sum += Math.exp(-0.5 * z * z);
        }
        points.push({ value: x, density: sum / (n * h * Math.sqrt(2 * Math.PI)) });
    }
    return points;
}

export function buildViolinScales(
    data: readonly ViolinGroup[],
    innerWidth: number,
    innerHeight: number,
    yDomain?: [number, number],
) {
    const groups = data.map((d) => d.group);
    const allValues = data.flatMap((d) => d.values);
    const [yMin, yMax] = yDomain ?? safeExtent(allValues);

    const xScale = buildBandScale(groups, [0, innerWidth], 0.2);
    const yScale = buildLinearScale(yMin, yMax, [innerHeight, 0]);

    return { xScale, yScale };
}

export { formatTick };

export function buildTooltipContent(group: ViolinGroup): string {
    const n = group.values.length;
    const mean = group.values.reduce((s, v) => s + v, 0) / n;
    return `${group.group}: n=${n}, mean=${mean.toFixed(1)}`;
}
