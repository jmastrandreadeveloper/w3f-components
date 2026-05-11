import { scaleTime, scaleLinear } from '@visx/scale';
import type { MultiSeriesTime } from '../_base/types';
import { LINE_MULTI_ROOT_CLASS } from './LineMulti.constants';
import { buildChartRootClasses, formatTick } from '../_base/utils';

export function buildLineMultiClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(LINE_MULTI_ROOT_CLASS, className, unstyled);
}

export function toDate(v: Date | number | string): Date {
    return v instanceof Date ? v : new Date(v);
}

export function buildMultiTimeScales(
    data: readonly MultiSeriesTime[],
    innerWidth: number,
    innerHeight: number,
) {
    let minDate = Infinity;
    let maxDate = -Infinity;
    let maxVal = 0;

    for (const series of data) {
        for (const pt of series.data) {
            const t = Number(toDate(pt.date));
            if (t < minDate) minDate = t;
            if (t > maxDate) maxDate = t;
            if (pt.value > maxVal) maxVal = pt.value;
        }
    }

    const xScale = scaleTime({ domain: [minDate, maxDate], range: [0, innerWidth] });
    const yScale = scaleLinear<number>({ domain: [0, maxVal * 1.1], range: [innerHeight, 0], nice: true });

    return { xScale, yScale };
}

export { formatTick };
