import { useCallback, useState } from 'react';
import type { UseChartTooltipResult } from './ChartTooltip.types';

/**
 * Lightweight tooltip state manager. Does not depend on
 * `@visx/tooltip`'s `useTooltip` to keep the surface area minimal and
 * testable.
 */
export function useChartTooltip<T>(): UseChartTooltipResult<T> {
    const [state, setState] = useState<{
        data: T | null;
        left: number;
        top: number;
        open: boolean;
    }>({ data: null, left: 0, top: 0, open: false });

    const showTooltip = useCallback(
        (args: { data: T; left: number; top: number }) => {
            setState({ data: args.data, left: args.left, top: args.top, open: true });
        },
        [],
    );

    const hideTooltip = useCallback(() => {
        setState((s) => ({ ...s, open: false }));
    }, []);

    return {
        tooltipData: state.data,
        tooltipLeft: state.left,
        tooltipTop: state.top,
        tooltipOpen: state.open,
        showTooltip,
        hideTooltip,
    };
}
