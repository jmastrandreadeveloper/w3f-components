import { useState, useRef, useEffect, useCallback } from 'react';
import type { WindowGridBreakpoints, WindowGridColumns } from './WindowGrid.types';

export interface UseResponsiveGridReturn {
    gridColumns: string;
    currentBreakpoint: string;
    bodyRef: React.RefObject<HTMLDivElement>;
}

export function useResponsiveGrid(
    autoResponsive: boolean,
    responsiveBreakpoints: WindowGridBreakpoints,
    responsiveColumns: WindowGridColumns,
    gridTemplateColumns: string | undefined,
    /** Trigger recalculation when these change (e.g. maximized / dimensions) */
    deps: unknown[],
): UseResponsiveGridReturn {
    const [currentBreakpoint, setCurrentBreakpoint] = useState('md');
    const [gridColumns, setGridColumns] = useState(gridTemplateColumns ?? '');
    const bodyRef = useRef<HTMLDivElement>(null);

    const calculateGridColumns = useCallback(
        (width: number) => {
            if (!autoResponsive) return;

            const sorted = Object.entries(responsiveBreakpoints).sort((a, b) => a[1]! - b[1]!);
            let breakpoint = 'xs';

            for (const [bp, minWidth] of sorted) {
                if (width >= minWidth!) breakpoint = bp;
            }

            setCurrentBreakpoint(breakpoint);
            const cols = responsiveColumns[breakpoint] ?? responsiveColumns.xs ?? 1;
            setGridColumns(`repeat(${cols}, minmax(0, 1fr))`);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [autoResponsive, responsiveBreakpoints, responsiveColumns],
    );

    // ResizeObserver
    useEffect(() => {
        if (!bodyRef.current || !autoResponsive) return;
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                calculateGridColumns(entry.contentRect.width);
            }
        });
        observer.observe(bodyRef.current);
        return () => observer.disconnect();
    }, [calculateGridColumns, autoResponsive]);

    // Recalculate on external dimension/maximize changes
    useEffect(() => {
        if (bodyRef.current && autoResponsive) {
            calculateGridColumns(bodyRef.current.offsetWidth);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [calculateGridColumns, autoResponsive, ...deps]);

    return { gridColumns, currentBreakpoint, bodyRef };
}
