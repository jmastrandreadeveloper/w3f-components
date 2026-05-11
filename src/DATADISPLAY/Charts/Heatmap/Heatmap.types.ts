import type { BaseChartProps, ChartEventProps, ChartMargin, DatumMatrix } from '../_base/types';

export type HeatmapDatum = DatumMatrix;
export type HeatmapData = readonly HeatmapDatum[];

export interface HeatmapInnerProps extends BaseChartProps, ChartEventProps<HeatmapDatum> {
    width: number;
    height: number;
    data: HeatmapData;
    getRow?: (d: HeatmapDatum) => string | number;
    getCol?: (d: HeatmapDatum) => string | number;
    getValue?: (d: HeatmapDatum) => number;
    showRowLabels?: boolean;
    showColLabels?: boolean;
    cellRadius?: number;
    colors?: [string, string];
    margin?: ChartMargin;
    highlightIndex?: number | null;
}

export type HeatmapProps = Omit<HeatmapInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
