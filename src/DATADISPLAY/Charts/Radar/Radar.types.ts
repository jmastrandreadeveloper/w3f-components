import type { BaseChartProps, ChartEventProps, Datum1D } from '../_base/types';

export type RadarDatum = Datum1D;
export type RadarData = readonly RadarDatum[];

export interface RadarInnerProps extends BaseChartProps, ChartEventProps<RadarDatum> {
    width: number;
    height: number;
    data: RadarData;
    getLabel?: (d: RadarDatum) => string;
    getValue?: (d: RadarDatum) => number;
    /** Number of concentric grid rings. Default: 5 */
    gridLevels?: number;
    showGrid?: boolean;
    showLabels?: boolean;
    showTooltip?: boolean;
    showDots?: boolean;
    /** Fill opacity of the data polygon. Default: 0.25 */
    fillOpacity?: number;
    /** Max domain value. Default: auto from data */
    maxValue?: number;
    /** External highlight index — when set, the matching vertex dot gets full opacity + white stroke, others dim to 0.3. */
    highlightIndex?: number | null;
}

export type RadarProps = Omit<RadarInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
