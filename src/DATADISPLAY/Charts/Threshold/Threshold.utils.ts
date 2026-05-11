import { scaleTime, scaleLinear } from '@visx/scale';
import type { ThresholdDatum } from './Threshold.types';
import { THRESHOLD_ROOT_CLASS } from './Threshold.constants';
import { buildChartRootClasses, safeExtent, formatTick } from '../_base/utils';

export function buildThresholdClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(THRESHOLD_ROOT_CLASS, className, unstyled);
}

export const defaultGetDate = (d: ThresholdDatum) => d.date;
export const defaultGetValue0 = (d: ThresholdDatum) => d.value0;
export const defaultGetValue1 = (d: ThresholdDatum) => d.value1;

export function toDate(v: Date | number | string): Date {
    return v instanceof Date ? v : new Date(v);
}

export function buildThresholdScales(
    data: readonly ThresholdDatum[],
    innerWidth: number,
    innerHeight: number,
    getDate: (d: ThresholdDatum) => Date | number | string,
    getValue0: (d: ThresholdDatum) => number,
    getValue1: (d: ThresholdDatum) => number,
    yDomain?: [number, number],
) {
    const dates = data.map((d) => toDate(getDate(d)));
    const allValues = [...data.map(getValue0), ...data.map(getValue1)];
    const [minVal, maxVal] = yDomain ?? safeExtent(allValues);

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
