import type { BaseChartProps, ChartEventProps, ChartMargin, DatumXY } from '../_base/types';
export type BubbleDatum = DatumXY;
export type BubbleData = readonly BubbleDatum[];
export interface BubbleInnerProps extends BaseChartProps, ChartEventProps<BubbleDatum> {
    width: number;
    height: number;
    data: BubbleData;
    getX?: (d: BubbleDatum) => number;
    getY?: (d: BubbleDatum) => number;
    getR?: (d: BubbleDatum) => number;
    getLabel?: (d: BubbleDatum) => string;
    showXAxis?: boolean;
    showYAxis?: boolean;
    showGrid?: boolean;
    showTooltip?: boolean;
    minRadius?: number;
    maxRadius?: number;
    xDomain?: [number, number];
    yDomain?: [number, number];
    formatX?: (n: number) => string;
    formatY?: (n: number) => string;
    margin?: ChartMargin;
    highlightIndex?: number | null;
}
export type BubbleProps = Omit<BubbleInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=Bubble.types.d.ts.map