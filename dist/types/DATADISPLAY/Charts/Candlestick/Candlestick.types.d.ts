import type { BaseChartProps, ChartEventProps, ChartMargin } from '../_base/types';
/** OHLC candlestick datum — financial/trading charts. */
export type CandlestickDatum = {
    date: Date | number | string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume?: number;
};
export type CandlestickData = readonly CandlestickDatum[];
export interface CandlestickInnerProps extends BaseChartProps, ChartEventProps<CandlestickDatum> {
    width: number;
    height: number;
    data: CandlestickData;
    /** Show X axis (dates). */
    showXAxis?: boolean;
    /** Show Y axis (price). */
    showYAxis?: boolean;
    /** Show grid lines. */
    showGrid?: boolean;
    /** Show tooltip on hover. */
    showTooltip?: boolean;
    /** Color for bullish (close > open) candles. */
    bullishColor?: string;
    /** Color for bearish (close < open) candles. */
    bearishColor?: string;
    /** Candle body width ratio (0-1). */
    candleWidthRatio?: number;
    /** Show volume bars at bottom. */
    showVolume?: boolean;
    /** Format Y axis ticks. */
    formatY?: (n: number) => string;
    /** Format X axis ticks. */
    formatX?: (d: Date | number | string) => string;
    margin?: ChartMargin;
    /** Externally highlight a specific candle by index. */
    highlightIndex?: number | null;
}
export type CandlestickProps = Omit<CandlestickInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=Candlestick.types.d.ts.map