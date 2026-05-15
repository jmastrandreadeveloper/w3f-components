import type { LineDatum, LineInnerProps } from './Line.types';
export declare function useLineAccessors(getDate?: (d: LineDatum) => Date | number | string, getValue?: (d: LineDatum) => number): {
    getDate: (d: LineDatum) => string | number | Date;
    getValue: (d: LineDatum) => number;
};
export declare function useLineScales(data: readonly LineDatum[], innerWidth: number, innerHeight: number, getDate: (d: LineDatum) => Date | number | string, getValue: (d: LineDatum) => number, yDomain?: [number, number]): {
    xScale: import("d3-scale").ScaleTime<number, number, never>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
};
export declare function useLineColor(colorScheme: LineInnerProps['colorScheme']): string;
export declare function useLineInteraction(onHover?: (datum: LineDatum | null, index: number | null) => void, onSelect?: (datum: LineDatum, index: number) => void): {
    hoveredIndex: number | null;
    handleEnter: (datum: LineDatum, index: number) => void;
    handleLeave: () => void;
    handleClick: (datum: LineDatum, index: number) => void;
};
export { useChartDimensions, useInnerDims } from '../_base/hooks';
//# sourceMappingURL=Line.hooks.d.ts.map