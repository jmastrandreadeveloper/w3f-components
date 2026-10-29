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
    /** 0022 B53.4: el valor dentro de cada celda (con un color que se lee sobre el de la celda). Default false. */
    showCellValues?: boolean;
    /** 0022 B53.4: tamaño de esos valores (px). Default 10. */
    cellValueSize?: number;
    /** 0022 B53.4: borde de las celdas (un color CSS; vacío = sin borde). */
    cellStroke?: string;
}
export type HeatmapProps = Omit<HeatmapInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=Heatmap.types.d.ts.map