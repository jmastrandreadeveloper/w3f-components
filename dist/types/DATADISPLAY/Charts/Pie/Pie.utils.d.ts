import type { PieDatum } from './Pie.types';
export declare function buildPieClasses(className: string | undefined, unstyled: boolean | undefined): string;
export declare const defaultGetValue: (d: PieDatum) => number;
export declare const defaultGetLabel: (d: PieDatum) => string;
export declare function buildPieColors(data: readonly PieDatum[], colorScheme: unknown): string[];
export declare function buildTooltipContent(d: PieDatum, getValue: (d: PieDatum) => number): string;
/** Compute centroid angle for label placement */
export declare function centroidAngle(startAngle: number, endAngle: number): number;
/** Check if a label fits in the arc */
export declare function labelFits(startAngle: number, endAngle: number, minAngle?: number): boolean;
//# sourceMappingURL=Pie.utils.d.ts.map