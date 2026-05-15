import type { WaterfallDatum, WaterfallData } from './Waterfall.types';
import { computeWaterfallBars } from './Waterfall.utils';
export declare function useWaterfallBars(data: WaterfallData): import("./Waterfall.utils").WaterfallBar[];
export declare function useWaterfallScales(bars: ReturnType<typeof computeWaterfallBars>, data: WaterfallData, innerWidth: number, innerHeight: number): {
    xScale: import("d3-scale").ScaleBand<string>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
};
export declare function useWaterfallInteraction(onHover?: (datum: WaterfallDatum | null, index: number | null) => void, onSelect?: (datum: WaterfallDatum, index: number) => void): {
    hoveredIndex: number | null;
    handleEnter: (datum: WaterfallDatum, index: number) => void;
    handleLeave: () => void;
    handleClick: (datum: WaterfallDatum, index: number) => void;
};
export { useChartDimensions, useInnerDims } from '../_base/hooks';
//# sourceMappingURL=Waterfall.hooks.d.ts.map