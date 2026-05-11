import { useCallback, useState } from 'react';
import type { ChartLegendItem } from './ChartLegend.types';

/**
 * Manages toggled (disabled) state for legend items.
 * Returns a Set of disabled ids and a toggle callback.
 */
export function useLegendToggle(
    items: readonly ChartLegendItem[],
    onToggle?: (item: ChartLegendItem, index: number) => void,
) {
    const [disabledIds, setDisabledIds] = useState<Set<string>>(() => {
        const s = new Set<string>();
        for (const item of items) {
            if (item.disabled) s.add(item.id);
        }
        return s;
    });

    const toggle = useCallback(
        (item: ChartLegendItem, index: number) => {
            setDisabledIds((prev) => {
                const next = new Set(prev);
                if (next.has(item.id)) {
                    next.delete(item.id);
                } else {
                    next.add(item.id);
                }
                return next;
            });
            onToggle?.(item, index);
        },
        [onToggle],
    );

    return { disabledIds, toggle };
}
