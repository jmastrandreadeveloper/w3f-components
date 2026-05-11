import type { BaseChartProps, ChartMargin, MultiSeriesTime, ColorSchemeName } from '../_base/types';

export type AreaStackedDatum = MultiSeriesTime;
export type AreaStackedData = readonly AreaStackedDatum[];

export interface AreaStackedInnerProps extends BaseChartProps {
    width: number;
    height: number;
    data: AreaStackedData;
    keys: readonly string[];
    curved?: boolean;
    fillOpacity?: number;
    showXAxis?: boolean;
    showYAxis?: boolean;
    showGrid?: boolean;
    showTooltip?: boolean;
    showLegend?: boolean;
    yDomain?: [number, number];
    formatY?: (n: number) => string;
    /** Rotate X axis tick labels by N degrees. Use -45 or -90 for dense axes. */
    tickRotateX?: number;
    /** Fuerza el resaltado de una serie desde afuera (ej. fila seleccionada en tabla). */
    highlightSeriesId?: string | null;
    margin?: ChartMargin;
    onHover?: (seriesId: string | null) => void;
}

export type AreaStackedProps = Omit<AreaStackedInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
