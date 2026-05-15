import type { SparklineData } from './Sparkline.types';
export declare function useSparklineScales(data: SparklineData, width: number, height: number): {
    xScale: import("d3-scale").ScaleLinear<number, number, never>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
    min: number;
    max: number;
};
export declare function useSparklineHover(onHover?: (datum: number | null, index: number | null) => void): {
    hoveredIndex: number | null;
    handleMove: (index: number, datum: number) => void;
    handleLeave: () => void;
};
export { useChartDimensions } from '../_base/hooks';
//# sourceMappingURL=Sparkline.hooks.d.ts.map