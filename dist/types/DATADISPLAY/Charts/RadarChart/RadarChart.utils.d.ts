import type { RadarChartDataPoint } from './RadarChart.types';
export declare function buildRadarChartClasses(className: string | undefined, unstyled: boolean | undefined): string;
export declare function buildRadarScale(data: RadarChartDataPoint[], radius: number): import("d3-scale").ScaleLinear<number, number, never>;
/** Convert a value on a given axis index to x, y coordinates. */
export declare function radarPoint(index: number, total: number, value: number, radius: number, maxValue: number): {
    x: number;
    y: number;
};
/** Build the SVG polygon points string for the data shape. */
export declare function buildRadarPolygon(data: RadarChartDataPoint[], radius: number): string;
/** Build concentric grid polygon points for a given level. */
export declare function buildGridPolygon(total: number, radius: number, level: number, levels: number): string;
/** Get the label position for a given axis. */
export declare function labelPosition(index: number, total: number, radius: number, offset?: number): {
    x: number;
    y: number;
    anchor: string;
};
//# sourceMappingURL=RadarChart.utils.d.ts.map