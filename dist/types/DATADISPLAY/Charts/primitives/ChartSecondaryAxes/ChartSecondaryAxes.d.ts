import React from 'react';
/**
 * VX9 (w3f-data-analysis): secondary axes, as matplotlib secondary_yaxis / secondary_xaxis: the same data read in
 * other units (value × factor + offset), on the right (Y) or on top (X). Only numeric axes (not categories nor dates).
 */
export interface ChartSecondaryAxesProps {
    /** Right axis: each value of the left axis × this factor (+ offset). Unset = no right axis. */
    secondaryYFactor?: number;
    secondaryYOffset?: number;
    /** Title of the right axis. */
    secondaryYLabel?: string;
    /** Top axis: each value of the bottom axis × this factor (+ offset). Unset = no top axis. */
    secondaryXFactor?: number;
    secondaryXOffset?: number;
    /** Title of the top axis. */
    secondaryXLabel?: string;
}
/** A copy of `scale` whose domain reads value × factor + offset (or null if it is not a numeric scale). */
export declare function convertedScale(scale: any, factor: number, offset?: number): any | null;
export declare const ChartSecondaryAxes: React.FC<ChartSecondaryAxesProps & {
    xScale?: any;
    yScale?: any;
    width: number;
    height: number;
}>;
export default ChartSecondaryAxes;
//# sourceMappingURL=ChartSecondaryAxes.d.ts.map