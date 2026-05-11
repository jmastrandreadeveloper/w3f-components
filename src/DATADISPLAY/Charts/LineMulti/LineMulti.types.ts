import type { BaseChartProps, ChartMargin, MultiSeriesTime } from '../_base/types';

export type LineMultiDatum = MultiSeriesTime;
export type LineMultiData = readonly LineMultiDatum[];

export interface LineMultiInnerProps extends BaseChartProps {
    width: number;
    height: number;
    data: LineMultiData;
    curved?: boolean;
    showDots?: boolean;
    strokeWidth?: number;
    showXAxis?: boolean;
    showYAxis?: boolean;
    showGrid?: boolean;
    showTooltip?: boolean;
    showLegend?: boolean;
    formatY?: (n: number) => string;
    margin?: ChartMargin;
    highlightSeriesId?: string | null;
    onHover?: (seriesId: string | null, index: number | null) => void;
}

export type LineMultiProps = Omit<LineMultiInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
