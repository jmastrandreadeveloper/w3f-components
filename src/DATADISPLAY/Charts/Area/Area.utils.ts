import { scaleTime, scaleLinear } from '@visx/scale';
import type { AreaDatum } from './Area.types';
import { AREA_ROOT_CLASS } from './Area.constants';
import { buildChartRootClasses, safeExtent, formatTick } from '../_base/utils';

export function buildAreaClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(AREA_ROOT_CLASS, className, unstyled);
}

export const defaultGetDate = (d: AreaDatum) => d.date;
export const defaultGetValue = (d: AreaDatum) => d.value;

export function toDate(v: Date | number | string): Date {
    return v instanceof Date ? v : new Date(v);
}

export function buildAreaScales(
    data: readonly AreaDatum[], innerWidth: number, innerHeight: number,
    getDate: (d: AreaDatum) => Date | number | string,
    getValue: (d: AreaDatum) => number,
    yDomain?: [number, number],
) {
    const dates = data.map((d) => toDate(getDate(d)));
    const values = data.map(getValue);
    const [minVal, maxVal] = yDomain ?? safeExtent(values);

    const xScale = scaleTime({ domain: [Math.min(...dates.map(Number)), Math.max(...dates.map(Number))], range: [0, innerWidth] });
    const yScale = scaleLinear<number>({ domain: [Math.min(0, minVal), maxVal * 1.1], range: [innerHeight, 0], nice: true });

    return { xScale, yScale };
}

export { formatTick };
