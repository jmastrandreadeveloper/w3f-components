import type { PieDatum } from './Pie.types';
export declare function usePieAccessors(getValue?: (d: PieDatum) => number, getLabel?: (d: PieDatum) => string): {
    getValue: (d: PieDatum) => number;
    getLabel: (d: PieDatum) => string;
};
export declare function usePieColors(data: readonly PieDatum[], colorScheme: unknown): string[];
export declare function usePieInteraction(onHover?: (datum: PieDatum | null, index: number | null) => void, onSelect?: (datum: PieDatum, index: number) => void): {
    hoveredIndex: number | null;
    handleEnter: (d: PieDatum, i: number) => void;
    handleLeave: () => void;
    handleClick: (d: PieDatum, i: number) => void;
};
export { useChartDimensions } from '../_base/hooks';
//# sourceMappingURL=Pie.hooks.d.ts.map