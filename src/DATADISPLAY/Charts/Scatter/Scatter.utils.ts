import type { ScatterDatum } from './Scatter.types';
import { SCATTER_ROOT_CLASS } from './Scatter.constants';
import { buildChartRootClasses, buildLinearScale, safeExtent, formatTick } from '../_base/utils';

export function buildScatterClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(SCATTER_ROOT_CLASS, className, unstyled);
}

export function buildScatterScales(
    data: readonly ScatterDatum[],
    innerWidth: number,
    innerHeight: number,
    getX: (d: ScatterDatum) => number,
    getY: (d: ScatterDatum) => number,
    xDomain?: [number, number],
    yDomain?: [number, number],
) {
    const xs = data.map(getX);
    const ys = data.map(getY);
    const [xMin, xMax] = xDomain ?? safeExtent(xs);
    const [yMin, yMax] = yDomain ?? safeExtent(ys);

    const xScale = buildLinearScale(xMin, xMax, [0, innerWidth]);
    const yScale = buildLinearScale(yMin, yMax, [innerHeight, 0]);

    return { xScale, yScale };
}

export const defaultGetX = (d: ScatterDatum) => d.x;
export const defaultGetY = (d: ScatterDatum) => d.y;
export const defaultGetR = (d: ScatterDatum) => d.r ?? 5;
export const defaultGetLabel = (d: ScatterDatum) => d.label ?? '';

export { formatTick };

export function buildTooltipContent(datum: ScatterDatum, getX: (d: ScatterDatum) => number, getY: (d: ScatterDatum) => number): string {
    const label = datum.label ? `${datum.label}: ` : '';
    return `${label}(${getX(datum).toLocaleString()}, ${getY(datum).toLocaleString()})`;
}
