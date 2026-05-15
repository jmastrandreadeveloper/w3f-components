import type { StreamgraphInnerProps } from './Streamgraph.types';
import type { StreamLayer } from './Streamgraph.utils';
export declare function useStreamScales(layers: StreamLayer[], dates: Date[], innerWidth: number, innerHeight: number): {
    xScale: import("d3-scale").ScaleTime<number, number, never>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
};
export declare function useStreamColors(keys: readonly string[], colorScheme: StreamgraphInnerProps['colorScheme']): import("d3-scale").ScaleOrdinal<string, string, never>;
export declare function useStreamHover(onHover?: (seriesId: string | null) => void): {
    hovered: string | null;
    enter: (id: string) => void;
    leave: () => void;
};
export { useChartDimensions, useInnerDims } from '../_base/hooks';
//# sourceMappingURL=Streamgraph.hooks.d.ts.map