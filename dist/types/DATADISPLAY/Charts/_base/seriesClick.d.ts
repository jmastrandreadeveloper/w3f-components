import type React from 'react';
/** What multi-series time charts (LineMulti, AreaStacked, Streamgraph) report on click (0022 M4-drill2). */
export type SeriesSelect = {
    /** The series under the mouse. */
    seriesId: string;
    /** The original date of the nearest point (as it came in `data`: an ISO text stays a text). */
    date: Date | number | string;
};
/**
 * Index of the date nearest to the mouse X: localPoint() accounts for transforms (the Desktop zoom), then the time
 * scale is inverted inside the plot group (shifted by the left margin).
 */
export declare function nearestIndex(event: React.MouseEvent<Element>, marginLeft: number, xScale: {
    invert: (x: number) => Date | number;
}, dates: readonly (Date | number | string)[]): number;
//# sourceMappingURL=seriesClick.d.ts.map