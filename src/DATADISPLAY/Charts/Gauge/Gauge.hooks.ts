import { useMemo } from 'react';
import { buildGaugeScale, getGaugeColor } from './Gauge.utils';

export function useGaugeScale(min: number, max: number) {
    return useMemo(() => buildGaugeScale(min, max), [min, max]);
}

export function useGaugeColor(value: number, color: string, thresholds: unknown) {
    return useMemo(() => getGaugeColor(value, color, thresholds as any), [value, color, thresholds]);
}

export { useChartDimensions } from '../_base/hooks';
