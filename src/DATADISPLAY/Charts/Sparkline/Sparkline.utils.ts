import { SPARKLINE_ROOT_CLASS } from './Sparkline.constants';
import { buildChartRootClasses } from '../_base/utils';
import { scaleLinear } from '@visx/scale';

export function buildSparklineClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(SPARKLINE_ROOT_CLASS, className, unstyled);
}

export function buildSparklineScales(data: readonly number[], width: number, height: number, padding = 2) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const span = max - min || 1;

    const xScale = scaleLinear<number>({
        domain: [0, data.length - 1],
        range: [padding, width - padding],
    });

    const yScale = scaleLinear<number>({
        domain: [min - span * 0.05, max + span * 0.05],
        range: [height - padding, padding],
    });

    return { xScale, yScale, min, max };
}

export function buildSparklinePath(
    data: readonly number[],
    xScale: (v: number) => number,
    yScale: (v: number) => number,
): string {
    if (data.length === 0) return '';
    const points = data.map((v, i) => `${xScale(i)},${yScale(v)}`);
    return `M${points.join('L')}`;
}

export function buildAreaPath(
    data: readonly number[],
    xScale: (v: number) => number,
    yScale: (v: number) => number,
    height: number,
    padding: number,
): string {
    if (data.length === 0) return '';
    const line = data.map((v, i) => `${xScale(i)},${yScale(v)}`);
    return `M${xScale(0)},${height - padding}L${line.join('L')}L${xScale(data.length - 1)},${height - padding}Z`;
}
