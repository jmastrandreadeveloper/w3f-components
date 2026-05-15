import type { RadarDatum } from './Radar.types';
import { scaleLinear } from '@visx/scale';
export declare function buildRadarClasses(className: string | undefined, unstyled: boolean | undefined): string;
export declare const defaultGetLabel: (d: RadarDatum) => string;
export declare const defaultGetValue: (d: RadarDatum) => number;
/** Angle in radians for axis i out of n total, starting from top (−π/2). */
export declare function axisAngle(i: number, n: number): number;
/** Build a polygon points string for given values + radius scale. */
export declare function buildPolygon(data: readonly RadarDatum[], getValue: (d: RadarDatum) => number, rScale: ReturnType<typeof scaleLinear>): string;
/** Build concentric grid polygon for a given level. */
export declare function buildGridPolygon(n: number, radius: number): string;
/** Position for axis label, pushed outside the radius. */
export declare function labelPosition(i: number, n: number, radius: number, offset?: number): {
    x: number;
    y: number;
    anchor: string;
};
export declare function buildRadarScale(maxValue: number, radius: number): import("d3-scale").ScaleLinear<number, number, never>;
export declare function buildTooltipContent(d: RadarDatum, getLabel: (d: RadarDatum) => string, getValue: (d: RadarDatum) => number): string;
//# sourceMappingURL=Radar.utils.d.ts.map