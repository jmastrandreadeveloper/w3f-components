import type { CandlestickDatum, CandlestickData } from './Candlestick.types';
export declare function useCandlestickScales(data: CandlestickData, innerWidth: number, innerHeight: number, volumeHeight: number): {
    xScale: import("d3-scale").ScaleBand<string>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
    volumeScale: import("d3-scale").ScaleLinear<number, number, never> | null;
    priceChartHeight: number;
};
export declare function useCandlestickInteraction(onHover?: (datum: CandlestickDatum | null, index: number | null) => void, onSelect?: (datum: CandlestickDatum, index: number) => void): {
    hoveredIndex: number | null;
    handleEnter: (datum: CandlestickDatum, index: number) => void;
    handleLeave: () => void;
    handleClick: (datum: CandlestickDatum, index: number) => void;
};
export { useChartDimensions, useInnerDims } from '../_base/hooks';
//# sourceMappingURL=Candlestick.hooks.d.ts.map