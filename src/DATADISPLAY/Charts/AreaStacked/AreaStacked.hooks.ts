import { useMemo, useCallback, useState } from 'react';
import { scaleTime, scaleLinear } from '@visx/scale';
import type { AreaStackedInnerProps } from './AreaStacked.types';
import type { StackLayer } from './AreaStacked.utils';
import { toDate } from './AreaStacked.utils';
import { useInnerDims } from '../_base/hooks';
import { resolveColorScheme } from '../_base/utils';

export function useAreaStackedScales(
    layers: StackLayer[],
    dates: Date[],
    innerWidth: number,
    innerHeight: number,
    yDomain?: [number, number],
) {
    return useMemo(() => {
        if (dates.length === 0) {
            const xScale = scaleTime({ domain: [0, 1], range: [0, innerWidth] });
            const yScale = scaleLinear<number>({ domain: [0, 1], range: [innerHeight, 0] });
            return { xScale, yScale };
        }

        const minDate = Math.min(...dates.map(Number));
        const maxDate = Math.max(...dates.map(Number));

        let maxY1 = 0;
        for (const layer of layers) {
            for (const pt of layer.points) {
                if (pt.y1 > maxY1) maxY1 = pt.y1;
            }
        }

        const [domainMin, domainMax] = yDomain ?? [0, maxY1 * 1.1];

        const xScale = scaleTime({ domain: [minDate, maxDate], range: [0, innerWidth] });
        const yScale = scaleLinear<number>({ domain: [domainMin, domainMax], range: [innerHeight, 0], nice: true });

        return { xScale, yScale };
    }, [layers, dates, innerWidth, innerHeight, yDomain]);
}

export function useAreaStackedColors(keys: readonly string[], colorScheme: AreaStackedInnerProps['colorScheme']) {
    return useMemo(() => {
        const palette = resolveColorScheme(colorScheme);
        const map: Record<string, string> = {};
        keys.forEach((k, i) => { map[k] = palette[i % palette.length]; });
        return map;
    }, [keys, colorScheme]);
}

export function useAreaStackedHover(onHover?: (seriesId: string | null) => void) {
    const [hovered, setHovered] = useState<string | null>(null);
    const enter = useCallback((seriesId: string) => { setHovered(seriesId); onHover?.(seriesId); }, [onHover]);
    const leave = useCallback(() => { setHovered(null); onHover?.(null); }, [onHover]);
    return { hovered, enter, leave };
}

export { useChartDimensions, useInnerDims } from '../_base/hooks';
