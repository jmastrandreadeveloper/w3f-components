import { useMemo } from 'react';
import type { ChartAxisProps } from './ChartAxis.types';
import { formatTick } from '../../_base/utils';

/**
 * Resolve the final tick formatter: user-provided or default.
 */
export function useTickFormat(
    tickFormat: ChartAxisProps['tickFormat'],
): NonNullable<ChartAxisProps['tickFormat']> {
    return useMemo(
        () => tickFormat ?? ((value: unknown) => formatTick(value)),
        [tickFormat],
    );
}
