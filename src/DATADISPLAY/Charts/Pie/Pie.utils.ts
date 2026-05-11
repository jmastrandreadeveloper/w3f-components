import type { PieDatum } from './Pie.types';
import { PIE_ROOT_CLASS } from './Pie.constants';
import { buildChartRootClasses, resolveColorScheme } from '../_base/utils';

export function buildPieClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(PIE_ROOT_CLASS, className, unstyled);
}

export const defaultGetValue = (d: PieDatum) => d.value;
export const defaultGetLabel = (d: PieDatum) => d.label;

export function buildPieColors(data: readonly PieDatum[], colorScheme: unknown): string[] {
    const palette = resolveColorScheme(colorScheme as any);
    return data.map((d, i) => d.color ?? palette[i % palette.length]);
}

export function buildTooltipContent(d: PieDatum, getValue: (d: PieDatum) => number): string {
    return `${d.label}: ${getValue(d).toLocaleString()}`;
}

/** Compute centroid angle for label placement */
export function centroidAngle(startAngle: number, endAngle: number): number {
    return (startAngle + endAngle) / 2;
}

/** Check if a label fits in the arc */
export function labelFits(startAngle: number, endAngle: number, minAngle = 0.35): boolean {
    return endAngle - startAngle > minAngle;
}
