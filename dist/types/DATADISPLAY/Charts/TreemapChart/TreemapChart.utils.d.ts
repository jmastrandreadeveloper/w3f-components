export declare function buildTreemapChartClasses(className: string | undefined, unstyled: boolean | undefined): string;
/** Pick a color from the palette based on leaf index. */
export declare function tileColor(index: number, colors: readonly string[]): string;
/** Determine if text fits inside a rectangle. */
export declare function textFits(width: number, height: number, minWidth?: number, minHeight?: number): boolean;
/** Truncate text to fit within a given pixel width (approximate). */
export declare function truncateLabel(label: string, availableWidth: number, fontSize?: number): string;
//# sourceMappingURL=TreemapChart.utils.d.ts.map