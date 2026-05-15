import type { ChartLegendItem } from './ChartLegend.types';
/**
 * Manages toggled (disabled) state for legend items.
 * Returns a Set of disabled ids and a toggle callback.
 */
export declare function useLegendToggle(items: readonly ChartLegendItem[], onToggle?: (item: ChartLegendItem, index: number) => void): {
    disabledIds: Set<string>;
    toggle: (item: ChartLegendItem, index: number) => void;
};
//# sourceMappingURL=ChartLegend.hooks.d.ts.map