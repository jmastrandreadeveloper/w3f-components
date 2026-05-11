import type { BarHorizontalDatum } from './BarHorizontal.types';
import { BAR_H_ROOT_CLASS } from './BarHorizontal.constants';
import {
    buildChartRootClasses,
    buildBandScale,
    buildLinearScale,
    safeExtent,
    formatTick,
} from '../_base/utils';

export function buildBarHClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(BAR_H_ROOT_CLASS, className, unstyled);
}

export function buildBarHScales(
    data: readonly BarHorizontalDatum[],
    innerWidth: number,
    innerHeight: number,
    getLabel: (d: BarHorizontalDatum) => string | number,
    getValue: (d: BarHorizontalDatum) => number,
    padding: number,
    xDomain?: [number, number],
) {
    const labels = data.map((d) => String(getLabel(d)));
    const values = data.map(getValue);
    const [minVal, maxVal] = xDomain ?? safeExtent(values);

    const yScale = buildBandScale(labels, [0, innerHeight], padding);
    const xScale = buildLinearScale(minVal, maxVal, [0, innerWidth]);

    return { xScale, yScale };
}

export const defaultGetLabel = (d: BarHorizontalDatum) => d.label;
export const defaultGetValue = (d: BarHorizontalDatum) => d.value;
export { formatTick };

export function buildTooltipContent(datum: BarHorizontalDatum, getLabel: (d: BarHorizontalDatum) => string | number, getValue: (d: BarHorizontalDatum) => number): string {
    return `${getLabel(datum)}: ${getValue(datum).toLocaleString()}`;
}
