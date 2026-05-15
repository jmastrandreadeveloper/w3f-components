import type { AreaStackedInnerProps } from './AreaStacked.types';
import type { StackLayer } from './AreaStacked.utils';
export declare function useAreaStackedScales(layers: StackLayer[], dates: Date[], innerWidth: number, innerHeight: number, yDomain?: [number, number]): {
    xScale: import("d3-scale").ScaleTime<number, number, never>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
};
export declare function useAreaStackedColors(keys: readonly string[], colorScheme: AreaStackedInnerProps['colorScheme']): Record<string, string>;
export declare function useAreaStackedHover(onHover?: (seriesId: string | null) => void): {
    hovered: string | null;
    enter: (seriesId: string) => void;
    leave: () => void;
};
export { useChartDimensions, useInnerDims } from '../_base/hooks';
//# sourceMappingURL=AreaStacked.hooks.d.ts.map