import { scaleTime, scaleLinear } from '@visx/scale';
import type { LineDatum } from './Line.types';
import { LINE_ROOT_CLASS } from './Line.constants';
import { buildChartRootClasses, safeExtent, formatTick } from '../_base/utils';

export function buildLineClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(LINE_ROOT_CLASS, className, unstyled);
}

export const defaultGetDate = (d: LineDatum) => d.date;
export const defaultGetValue = (d: LineDatum) => d.value;

export function toDate(v: Date | number | string): Date {
    return v instanceof Date ? v : new Date(v);
}

export function buildTimeScales(
    data: readonly LineDatum[],
    innerWidth: number,
    innerHeight: number,
    getDate: (d: LineDatum) => Date | number | string,
    getValue: (d: LineDatum) => number,
    yDomain?: [number, number],
) {
    const dates = data.map((d) => toDate(getDate(d)));
    const values = data.map(getValue);
    const [minVal, maxVal] = yDomain ?? safeExtent(values);

    const xScale = scaleTime({
        domain: [Math.min(...dates.map(Number)), Math.max(...dates.map(Number))],
        range: [0, innerWidth],
    });
    const yScale = scaleLinear<number>({
        domain: [minVal, maxVal * 1.1],
        range: [innerHeight, 0],
        nice: true,
    });

    return { xScale, yScale };
}

export { formatTick };
