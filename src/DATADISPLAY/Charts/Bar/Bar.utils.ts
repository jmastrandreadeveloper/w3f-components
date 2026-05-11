import type { BarDatum } from './Bar.types';
import { BAR_ROOT_CLASS } from './Bar.constants';
import {
    buildChartRootClasses,
    buildBandScale,
    buildLinearScale,
    safeExtent,
    formatTick,
} from '../_base/utils';

// ── Class builder ────────────────────────────────────────────────────────

export function buildBarClasses(
    className: string | undefined,
    unstyled: boolean | undefined,
): string {
    return buildChartRootClasses(BAR_ROOT_CLASS, className, unstyled);
}

// ── Scale builders ───────────────────────────────────────────────────────

export function buildBarScales(
    data: readonly BarDatum[],
    innerWidth: number,
    innerHeight: number,
    getLabel: (d: BarDatum) => string | number,
    getValue: (d: BarDatum) => number,
    padding: number,
    yDomain?: [number, number],
) {
    const labels = data.map((d) => String(getLabel(d)));
    const values = data.map(getValue);
    const [minVal, maxVal] = yDomain ?? safeExtent(values);

    const xScale = buildBandScale(labels, [0, innerWidth], padding);
    const yScale = buildLinearScale(minVal, maxVal, [innerHeight, 0]);

    return { xScale, yScale };
}

// ── Accessors ────────────────────────────────────────────────────────────

export const defaultGetLabel = (d: BarDatum) => d.label;
export const defaultGetValue = (d: BarDatum) => d.value;

// ── Re-export formatTick for axes ────────────────────────────────────────

export { formatTick };

// ── Tooltip content builder ──────────────────────────────────────────────

export function buildTooltipContent(datum: BarDatum, getLabel: (d: BarDatum) => string | number, getValue: (d: BarDatum) => number): string {
    return `${getLabel(datum)}: ${getValue(datum).toLocaleString()}`;
}
