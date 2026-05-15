import type { CalendarDatum, CalendarData } from './CalendarHeatmap.types';
export declare function useCalendarCells(data: CalendarData): {
    cells: import("./CalendarHeatmap.utils").CalendarCell[];
    year: number;
    weeksCount: number;
};
export declare function useCalendarInteraction(onHover?: (datum: CalendarDatum | null, index: number | null) => void, onSelect?: (datum: CalendarDatum, index: number) => void): {
    hoveredIndex: number | null;
    handleEnter: (datum: CalendarDatum, index: number) => void;
    handleLeave: () => void;
    handleClick: (datum: CalendarDatum, index: number) => void;
};
export { useChartDimensions } from '../_base/hooks';
//# sourceMappingURL=CalendarHeatmap.hooks.d.ts.map