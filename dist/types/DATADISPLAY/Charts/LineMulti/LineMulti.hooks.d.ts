import type { MultiSeriesTime } from '../_base/types';
import type { LineMultiInnerProps } from './LineMulti.types';
export declare function useLineMultiScales(data: readonly MultiSeriesTime[], innerWidth: number, innerHeight: number): {
    xScale: import("d3-scale").ScaleTime<number, number, never>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
};
export declare function useLineMultiColors(seriesIds: readonly string[], colorScheme: LineMultiInnerProps['colorScheme']): Record<string, string>;
export declare function useLineMultiHover(onHover?: (seriesId: string | null, index: number | null) => void): {
    hovered: string | null;
    enter: (seriesId: string) => void;
    leave: () => void;
};
export { useChartDimensions, useInnerDims } from '../_base/hooks';
//# sourceMappingURL=LineMulti.hooks.d.ts.map