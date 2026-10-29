import type { BaseChartProps, ChartMargin, MultiSeriesTime } from '../_base/types';
import type { ChartDateFormat } from '../primitives/ChartLineMarks';
import type { SeriesSelect } from '../_base/seriesClick';
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
    /** Click on a series (drill-down): the series and the nearest point (0022 M4-drill2). */
    onSelect?: (datum: SeriesSelect, index: number) => void;
    /** 0022 B53.1: cómo se escriben las fechas del eje X ('auto' = las de siempre). */
    xDateFormat?: ChartDateFormat;
}
export type StreamgraphProps = Omit<StreamgraphInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=Streamgraph.types.d.ts.map