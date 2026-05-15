import type { AreaDatum, AreaInnerProps } from './Area.types';
export declare function useAreaAccessors(getDate?: (d: AreaDatum) => Date | number | string, getValue?: (d: AreaDatum) => number): {
    getDate: (d: AreaDatum) => string | number | Date;
    getValue: (d: AreaDatum) => number;
};
export declare function useAreaScales(data: readonly AreaDatum[], innerWidth: number, innerHeight: number, getDate: (d: AreaDatum) => Date | number | string, getValue: (d: AreaDatum) => number, yDomain?: [number, number]): {
    xScale: import("d3-scale").ScaleTime<number, number, never>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
};
export declare function useAreaColor(colorScheme: AreaInnerProps['colorScheme']): string;
export declare function useAreaInteraction(onHover?: (datum: AreaDatum | null, index: number | null) => void, onSelect?: (datum: AreaDatum, index: number) => void): {
    hoveredIndex: number | null;
    handleEnter: (d: AreaDatum, i: number) => void;
    handleLeave: () => void;
    handleClick: (d: AreaDatum, i: number) => void;
};
export { useChartDimensions, useInnerDims } from '../_base/hooks';
//# sourceMappingURL=Area.hooks.d.ts.map