import type { BubbleDatum } from './Bubble.types';
import { BUBBLE_ROOT_CLASS } from './Bubble.constants';
import { buildChartRootClasses, buildLinearScale, safeExtent, formatTick } from '../_base/utils';
import { scaleLinear } from '@visx/scale';

export function buildBubbleClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(BUBBLE_ROOT_CLASS, className, unstyled);
}

export function buildBubbleScales(
    data: readonly BubbleDatum[],
    innerWidth: number,
    innerHeight: number,
    getX: (d: BubbleDatum) => number,
    getY: (d: BubbleDatum) => number,
    getR: (d: BubbleDatum) => number,
    minRadius: number,
    maxRadius: number,
    xDomain?: [number, number],
    yDomain?: [number, number],
) {
    const xs = data.map(getX);
    const ys = data.map(getY);
    const rs = data.map(getR);
    const [xMin, xMax] = xDomain ?? safeExtent(xs);
    const [yMin, yMax] = yDomain ?? safeExtent(ys);
    const [rMin, rMax] = safeExtent(rs);

    const xScale = buildLinearScale(xMin, xMax, [0, innerWidth]);
    const yScale = buildLinearScale(yMin, yMax, [innerHeight, 0]);
    const rScale = scaleLinear<number>({ domain: [rMin, rMax], range: [minRadius, maxRadius] });

    return { xScale, yScale, rScale };
}

export const defaultGetX = (d: BubbleDatum) => d.x;
export const defaultGetY = (d: BubbleDatum) => d.y;
export const defaultGetR = (d: BubbleDatum) => d.r ?? 10;
export const defaultGetLabel = (d: BubbleDatum) => d.label ?? '';

export { formatTick };

export function buildTooltipContent(datum: BubbleDatum, getX: (d: BubbleDatum) => number, getY: (d: BubbleDatum) => number, getR: (d: BubbleDatum) => number): string {
    const label = datum.label ? `${datum.label}: ` : '';
    return `${label}(${getX(datum)}, ${getY(datum)}) r=${getR(datum)}`;
}
