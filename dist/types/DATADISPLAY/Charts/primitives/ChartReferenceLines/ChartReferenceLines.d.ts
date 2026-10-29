import React from 'react';
import type { ChartReferenceLine, ChartReferenceBand, ChartAnnotation } from '../../_base/types';
/** A point of the data, in the chart's own units (x = category, date or number). */
export type ChartOverlayPoint = {
    x: unknown;
    y: number;
};
export interface ChartReferenceLinesProps {
    /** Reference lines (objective, average, threshold…): horizontal, or vertical with `axis: 'x'`. */
    lines?: readonly ChartReferenceLine[];
    /** Reference bands (matplotlib axhspan / axvspan): the zone between two values. */
    bands?: readonly ChartReferenceBand[];
    /** A note on one data point, with an optional arrow (matplotlib annotate). */
    annotation?: ChartAnnotation;
    /** The chart's points (for the annotation): see `overlayPoints`. */
    points?: readonly ChartOverlayPoint[];
    /** The chart's Y scale (value → px inside the plot group). */
    yScale: (value: number) => number | undefined;
    /** The chart's X scale (category / date / number → px). Needed for vertical lines, bands and the annotation. */
    xScale?: any;
    /** Plot width in px (inner width). */
    width: number;
    /** Plot height in px (inner height). Needed for vertical lines and bands. */
    height?: number;
}
export declare const REFERENCE_LINE_CLASS = "w3f-chart-reference-line";
export declare const REFERENCE_BAND_CLASS = "w3f-chart-reference-band";
export declare const ANNOTATION_CLASS = "w3f-chart-annotation";
/**
 * Where a value of the X axis goes, whatever the scale: a category (band scale: the middle of its band), a date
 * (time scale) or a number. `undefined` when the value is not on the axis.
 */
export declare function xPosition(xScale: any, v: unknown): number | undefined;
/**
 * The points of a chart's data, for the annotation: {label, value} (bars), {date, value} (lines, areas),
 * {date, close} (candles), {date, value0} (threshold), {x, y} (scatter), series with `data` (multi-line) and
 * rows of several keys (grouped / stacked bars: the largest or the sum).
 */
export declare function overlayPoints(data: readonly any[] | undefined, keys?: readonly string[], stacked?: boolean): ChartOverlayPoint[];
/** The waterfall's points: each bar ends at the running total (a total bar, at its own value). */
export declare function waterfallPoints(data: readonly {
    label: string;
    value: number;
    isTotal?: boolean;
}[] | undefined): ChartOverlayPoint[];
/** The point the annotation points at: the largest, the smallest, the first, the last or the one of a given X. */
export declare function annotatedPoint(points: readonly ChartOverlayPoint[], at: string): ChartOverlayPoint | undefined;
/**
 * W3F ChartReferenceLines — reference lines, bands and an annotation over the plot (0022 M4.6.5; VX7: matplotlib
 * axhline xmin / xmax, axvline, axhspan, axvspan and annotate).
 *
 * Drawn inside the plot group (after the marks, so they stay on top; bands are translucent). Colors come from
 * each item or from `--w3f-chart-reference-color`.
 */
export declare const ChartReferenceLines: React.FC<ChartReferenceLinesProps>;
export default ChartReferenceLines;
//# sourceMappingURL=ChartReferenceLines.d.ts.map