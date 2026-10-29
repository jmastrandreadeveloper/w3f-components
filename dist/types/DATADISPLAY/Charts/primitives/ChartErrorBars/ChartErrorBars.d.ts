import React from 'react';
/** VX8: what the error bar of each point measures (matplotlib errorbar yerr / xerr). */
export type ChartErrorKind = 'none' | 'std' | 'sem' | 'ci95' | 'range' | 'col' | 'pct';
/**
 * VX8 (w3f-data-analysis): error bars, as matplotlib errorbar. The data rows bring their own figures (the app's
 * chart engine adds them): `errStd` (standard deviation of the group), `errSem` (standard error), `errCi`
 * (half the 95 % confidence interval), `errMin` / `errMax` (the group's range) and `errCol` (another column).
 */
export interface ChartErrorBarsProps {
    /** Which figure the bars show; 'pct' = a fixed percentage of the value. */
    errorBars?: ChartErrorKind;
    /** For 'pct': the percentage (10 = ±10 %). */
    errorPct?: number;
    /** Half the width of the caps, px (matplotlib capsize; 0 = no caps). */
    errorCapSize?: number;
    /** Thickness of the caps, px (matplotlib capthick). */
    errorCapThick?: number;
    /** Color of the bars (matplotlib ecolor). Default: the text color. */
    errorColor?: string;
    /** Thickness of the bars, px (matplotlib elinewidth). */
    errorLineWidth?: number;
    /** 'solid' | 'dashed' | 'dotted' (matplotlib elinestyle). */
    errorLineStyle?: string;
    /** 'both', or only the part above ('up') or below ('down') the value (matplotlib uplims / lolims). */
    errorSide?: 'both' | 'up' | 'down';
    /** VX9 (matplotlib fill_between y2): a shaded band from low to high of each point (same figures as the bars). */
    errorBand?: ChartErrorKind;
    /** Opacity of the band (0–1). */
    errorBandOpacity?: number;
}
/** The props that turn the error bars on (to pass them through from a chart). */
export declare const ERROR_BAR_PROPS: readonly ["errorBars", "errorPct", "errorCapSize", "errorCapThick", "errorColor", "errorLineWidth", "errorLineStyle", "errorSide", "errorBand", "errorBandOpacity"];
/** [low, high] of a point's error bar, in data units; null when the point has no figure for that kind. */
export declare function errorExtent(d: any, value: number, kind: ChartErrorKind | undefined, pct?: number, side?: 'both' | 'up' | 'down'): [number, number] | null;
/**
 * The value scale widened so the error bars fit (when the user did not fix the axis limits).
 * `scale` is a linear scale (copy / domain / nice).
 */
export declare function scaleForErrors<S>(scale: S, rows: readonly any[], value: (d: any) => number, p: ChartErrorBarsProps & {
    yMin?: number;
    yMax?: number;
    xMin?: number;
    xMax?: number;
}, axis: 'x' | 'y'): S;
export interface ChartErrorBarsLayerProps extends ChartErrorBarsProps {
    /** One item per point: where it is across the axis (px) and its row and value. */
    items: readonly {
        at: number;
        row: any;
        value: number;
    }[];
    /** The value scale (value → px). */
    valueScale: (v: number) => number | undefined;
    /** true = the values run along X (horizontal bars: matplotlib xerr). */
    horizontal?: boolean;
}
export declare const ERROR_BAR_CLASS = "w3f-chart-errorbar";
export declare const ChartErrorBars: React.FC<ChartErrorBarsLayerProps>;
/** VX9: the band from low to high of each point (matplotlib fill_between with y2), under the line. */
export declare const ChartErrorBand: React.FC<ChartErrorBarsProps & {
    items: readonly {
        at: number;
        row: any;
        value: number;
    }[];
    valueScale: (v: number) => number | undefined;
    color: string;
    curve?: any;
}>;
export default ChartErrorBars;
//# sourceMappingURL=ChartErrorBars.d.ts.map