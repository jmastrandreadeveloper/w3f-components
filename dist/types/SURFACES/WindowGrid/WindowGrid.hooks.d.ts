import type { WindowGridBreakpoints, WindowGridColumns } from './WindowGrid.types';
export interface UseResponsiveGridReturn {
    gridColumns: string;
    currentBreakpoint: string;
    bodyRef: React.RefObject<HTMLDivElement>;
}
export declare function useResponsiveGrid(autoResponsive: boolean, responsiveBreakpoints: WindowGridBreakpoints, responsiveColumns: WindowGridColumns, gridTemplateColumns: string | undefined, 
/** Trigger recalculation when these change (e.g. maximized / dimensions) */
deps: unknown[]): UseResponsiveGridReturn;
//# sourceMappingURL=WindowGrid.hooks.d.ts.map