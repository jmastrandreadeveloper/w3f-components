import type { BaseChartProps, ChartEventProps, ChartMargin } from '../_base/types';

export type GanttTask = {
    id: string;
    label: string;
    start: Date | string | number;
    end: Date | string | number;
    group?: string;
    progress?: number; // 0-1
};

export type GanttDatum = GanttTask;
export type GanttData = readonly GanttTask[];

export interface GanttInnerProps extends BaseChartProps, ChartEventProps<GanttTask> {
    width: number;
    height: number;
    data: GanttData;
    showLabels?: boolean;
    showTooltip?: boolean;
    showXAxis?: boolean;
    showGrid?: boolean;
    barHeight?: number;
    barGap?: number;
    barRadius?: number;
    margin?: ChartMargin;
}

export type GanttProps = Omit<GanttInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
