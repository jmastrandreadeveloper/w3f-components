import type { BaseChartProps, ChartMargin, MultiSeriesTime } from '../_base/types';
export type StreamgraphDatum = MultiSeriesTime;
export type StreamgraphData = readonly StreamgraphDatum[];
export interface StreamgraphInnerProps extends BaseChartProps {
    width: number;
    height: number;
    data: StreamgraphData;
    keys: readonly string[];
    curved?: boolean;
    fillOpacity?: number;
    showXAxis?: boolean;
    showLegend?: boolean;
    margin?: ChartMargin;
    highlightSeriesId?: string | null;
    onHover?: (seriesId: string | null) => void;
}
export type StreamgraphProps = Omit<StreamgraphInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=Streamgraph.types.d.ts.map