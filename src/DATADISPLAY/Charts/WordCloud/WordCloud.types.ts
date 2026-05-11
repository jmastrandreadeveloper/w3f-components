import type { BaseChartProps, ChartEventProps } from '../_base/types';

export type WordCloudDatum = {
    text: string;
    value: number;
};

export type WordCloudData = readonly WordCloudDatum[];

export interface WordCloudInnerProps extends BaseChartProps, ChartEventProps<WordCloudDatum> {
    width: number;
    height: number;
    data: WordCloudData;
    showTooltip?: boolean;
    fontFamily?: string;
    fontMinSize?: number;
    fontMaxSize?: number;
    spiral?: 'archimedean' | 'rectangular';
    rotate?: number | ((d: WordCloudDatum) => number);
    padding?: number;
}

export type WordCloudProps = Omit<WordCloudInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
