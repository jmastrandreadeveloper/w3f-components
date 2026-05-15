import type { HeatmapDatum } from './Heatmap.types';
export declare function useHeatmapAccessors(getRow?: (d: HeatmapDatum) => string | number, getCol?: (d: HeatmapDatum) => string | number, getValue?: (d: HeatmapDatum) => number): {
    getRow: (d: HeatmapDatum) => string | number;
    getCol: (d: HeatmapDatum) => string | number;
    getValue: (d: HeatmapDatum) => number;
};
export declare function useHeatmapAxes(data: readonly HeatmapDatum[], getRow: (d: HeatmapDatum) => string | number, getCol: (d: HeatmapDatum) => string | number): {
    rows: string[];
    cols: string[];
};
export declare function useHeatmapScales(rows: readonly string[], cols: readonly string[], data: readonly HeatmapDatum[], getValue: (d: HeatmapDatum) => number, innerWidth: number, innerHeight: number, colorRange: [string, string]): {
    xScale: import("d3-scale").ScaleBand<string>;
    yScale: import("d3-scale").ScaleBand<string>;
    colorScale: import("d3-scale").ScaleLinear<string, string, never>;
};
export declare function useHeatmapInteraction(onHover?: (datum: HeatmapDatum | null, index: number | null) => void, onSelect?: (datum: HeatmapDatum, index: number) => void): {
    hoveredIndex: number | null;
    handleEnter: (datum: HeatmapDatum, index: number) => void;
    handleLeave: () => void;
    handleClick: (datum: HeatmapDatum, index: number) => void;
};
export { useChartDimensions, useInnerDims } from '../_base/hooks';
//# sourceMappingURL=Heatmap.hooks.d.ts.map