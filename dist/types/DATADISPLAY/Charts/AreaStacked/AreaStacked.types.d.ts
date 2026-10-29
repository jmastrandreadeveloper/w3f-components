import type { BaseChartProps, ChartMargin, MultiSeriesTime } from '../_base/types';
import type { ChartDateFormat } from '../primitives/ChartLineMarks';
import type { SeriesSelect } from '../_base/seriesClick';
export type AreaStackedDatum = MultiSeriesTime;
export type AreaStackedData = readonly AreaStackedDatum[];
export interface AreaStackedInnerProps extends BaseChartProps {
    width: number;
    height: number;
    data: AreaStackedData;
    keys: readonly string[];
    /** VX9 (matplotlib stackplot baseline): 'zero' (default), 'sym' (symmetric) or 'wiggle' (streamgraph). */
    stackBaseline?: 'zero' | 'sym' | 'wiggle';
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
    /** Click on a series (drill-down): the series and the nearest point (0022 M4-drill2). */
    onSelect?: (datum: SeriesSelect, index: number) => void;
    /** 0022 B53.1: cómo se escriben las fechas del eje X ('auto' = las de siempre). */
    xDateFormat?: ChartDateFormat;
}
export type AreaStackedProps = Omit<AreaStackedInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=AreaStacked.types.d.ts.map