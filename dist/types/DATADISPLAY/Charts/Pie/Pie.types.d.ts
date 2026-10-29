import type { BaseChartProps, ChartEventProps, DatumSlice } from '../_base/types';
export type PieDatum = DatumSlice;
export type PieData = readonly PieDatum[];
export interface PieInnerProps extends BaseChartProps, ChartEventProps<PieDatum> {
    width: number;
    height: number;
    data: PieData;
    getValue?: (d: PieDatum) => number;
    getLabel?: (d: PieDatum) => string;
    /** Inner radius ratio (0 = full pie, 0.5 = donut). Default: 0 */
    innerRadius?: number;
    /** Gap between slices in radians. Default: 0.02 */
    padAngle?: number;
    /** Corner radius for slices. Default: 0 */
    cornerRadius?: number;
    showLabels?: boolean;
    showTooltip?: boolean;
    showLegend?: boolean;
    /** External highlight index — when set, the matching slice gets full opacity + white stroke, others dim to 0.3. */
    highlightIndex?: number | null;
    /** 0022 B53.2: qué dice el rótulo de cada porción: el nombre, el valor, el % o el nombre con el % / el valor.
     *  Default 'name'. */
    sliceLabel?: 'name' | 'value' | 'percent' | 'name_percent' | 'name_value';
    /** 0022 B53.2: el rótulo adentro de la porción o afuera (con una línea guía). Default 'inside'. */
    labelPosition?: 'inside' | 'outside';
    /** 0022 B53.2: tamaño de la letra de los rótulos (px). Default 11. */
    sliceLabelSize?: number;
    /** 0022 B53.2: dónde empieza la primera porción, en grados (0 = arriba, sentido horario). Default 0. */
    startAngle?: number;
    /** 0022 B53.2: orden de las porciones: 'auto' (de mayor a menor), 'data' (como vienen), 'asc' (de menor a mayor). */
    sliceOrder?: 'auto' | 'data' | 'asc';
    /** VX3 (explode): separar porciones del centro: ninguna, la más grande, la primera o todas. */
    explode?: 'none' | 'largest' | 'first' | 'all';
    /** VX3: cuánto se separan (px). Default 10. */
    explodeOffset?: number;
    /** VX3 (counterclock): las porciones en sentido antihorario. */
    counterClockwise?: boolean;
    /** VX3 (rotatelabels): los rótulos de adentro girados según su porción. */
    rotateLabels?: boolean;
}
export type PieProps = Omit<PieInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=Pie.types.d.ts.map