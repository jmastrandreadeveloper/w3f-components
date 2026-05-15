import type { GaugeThreshold } from './Gauge.types';
export declare function buildGaugeClasses(className: string | undefined, unstyled: boolean | undefined): string;
export declare function buildGaugeScale(min: number, max: number): import("d3-scale").ScaleLinear<number, number, never>;
export declare function getGaugeColor(value: number, color: string, thresholds?: GaugeThreshold[]): string;
/** Build SVG arc path (from startAngle to endAngle, clockwise). */
export declare function arcPath(cx: number, cy: number, outerR: number, innerR: number, startAngle: number, endAngle: number): string;
/** Build needle path (triangle pointing at angle). */
export declare function needlePath(cx: number, cy: number, length: number, angle: number): string;
//# sourceMappingURL=Gauge.utils.d.ts.map