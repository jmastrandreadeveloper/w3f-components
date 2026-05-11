import type { RadarDatum } from './Radar.types';
import { RADAR_ROOT_CLASS } from './Radar.constants';
import { buildChartRootClasses } from '../_base/utils';
import { scaleLinear } from '@visx/scale';

export function buildRadarClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(RADAR_ROOT_CLASS, className, unstyled);
}

export const defaultGetLabel = (d: RadarDatum) => String(d.label);
export const defaultGetValue = (d: RadarDatum) => d.value;

/** Angle in radians for axis i out of n total, starting from top (−π/2). */
export function axisAngle(i: number, n: number): number {
    return (Math.PI * 2 * i) / n - Math.PI / 2;
}

/** Build a polygon points string for given values + radius scale. */
export function buildPolygon(
    data: readonly RadarDatum[],
    getValue: (d: RadarDatum) => number,
    rScale: ReturnType<typeof scaleLinear>,
): string {
    return data
        .map((d, i) => {
            const angle = axisAngle(i, data.length);
            const r = rScale(getValue(d)) as number;
            return `${Math.cos(angle) * r},${Math.sin(angle) * r}`;
        })
        .join(' ');
}

/** Build concentric grid polygon for a given level. */
export function buildGridPolygon(n: number, radius: number): string {
    return Array.from({ length: n }, (_, i) => {
        const angle = axisAngle(i, n);
        return `${Math.cos(angle) * radius},${Math.sin(angle) * radius}`;
    }).join(' ');
}

/** Position for axis label, pushed outside the radius. */
export function labelPosition(i: number, n: number, radius: number, offset = 14) {
    const angle = axisAngle(i, n);
    const r = radius + offset;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    const anchor = Math.abs(x) < 1 ? 'middle' : x > 0 ? 'start' : 'end';
    return { x, y, anchor };
}

export function buildRadarScale(maxValue: number, radius: number) {
    return scaleLinear({ domain: [0, maxValue], range: [0, radius], clamp: true });
}

export function buildTooltipContent(d: RadarDatum, getLabel: (d: RadarDatum) => string, getValue: (d: RadarDatum) => number): string {
    return `${getLabel(d)}: ${getValue(d).toLocaleString()}`;
}
