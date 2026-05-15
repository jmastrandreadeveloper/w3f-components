import type { GaugeThreshold } from './GaugeChart.types';
export declare function buildGaugeChartClasses(className: string | undefined, unstyled: boolean | undefined): string;
/** Build a linear scale mapping value to angle (in radians). */
export declare function buildGaugeScale(min: number, max: number): import("d3-scale").ScaleLinear<number, number, never>;
/** Determine the fill color for the current value based on thresholds. */
export declare function getGaugeColor(value: number, defaultColor: string, thresholds?: GaugeThreshold[]): string;
/** Create an arc path for a semicircle segment. */
export declare function arcPath(cx: number, cy: number, radius: number, startAngle: number, endAngle: number, innerRadius: number): string;
/** Build the needle path as a thin triangle. */
export declare function needlePath(cx: number, cy: number, length: number, angle: number, baseWidth?: number): string;
//# sourceMappingURL=GaugeChart.utils.d.ts.map