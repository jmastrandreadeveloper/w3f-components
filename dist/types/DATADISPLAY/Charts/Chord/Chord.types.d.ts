import type { BaseChartProps, ChartEventProps } from '../_base/types';
export type ChordDatum = {
    matrix: number[][];
    labels: string[];
};
export type ChordData = ChordDatum;
export type ChordRibbonInfo = {
    source: string;
    target: string;
    value: number;
};
export interface ChordInnerProps extends BaseChartProps, ChartEventProps<ChordRibbonInfo> {
    width: number;
    height: number;
    data: ChordData;
    showLabels?: boolean;
    showTooltip?: boolean;
    /** Padding between groups in radians. Default: 0.05 */
    padAngle?: number;
}
export type ChordProps = Omit<ChordInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=Chord.types.d.ts.map