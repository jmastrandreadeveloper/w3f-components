import { useMemo, useCallback, useState } from 'react';
import { scaleTime, scaleLinear } from '@visx/scale';
import type { StreamgraphInnerProps } from './Streamgraph.types';
import type { StreamLayer } from './Streamgraph.utils';
import { useColorScale, useInnerDims } from '../_base/hooks';

export function useStreamScales(
    layers: StreamLayer[],
    dates: Date[],
    innerWidth: number,
    innerHeight: number,
) {
    return useMemo(() => {
        if (dates.length === 0 || layers.length === 0) {
            return {
                xScale: scaleTime({ domain: [new Date(), new Date()], range: [0, innerWidth] }),
                yScale: scaleLinear<number>({ domain: [0, 1], range: [innerHeight, 0] }),
            };
        }

        let yMin = 0;
        let yMax = 0;
        for (const layer of layers) {
            for (const pt of layer.points) {
                if (pt.y0 < yMin) yMin = pt.y0;
                if (pt.y1 > yMax) yMax = pt.y1;
            }
        }

        const xScale = scaleTime({
            domain: [dates[0], dates[dates.length - 1]],
            range: [0, innerWidth],
        });
        const yScale = scaleLinear<number>({
            domain: [yMin, yMax],
            range: [innerHeight, 0],
        });

        return { xScale, yScale };
    }, [layers, dates, innerWidth, innerHeight]);
}

export function useStreamColors(keys: readonly string[], colorScheme: StreamgraphInnerProps['colorScheme']) {
    return useColorScale(keys as readonly string[], colorScheme);
}

export function useStreamHover(onHover?: (seriesId: string | null) => void) {
    const [hovered, setHovered] = useState<string | null>(null);
    const enter = useCallback((id: string) => { setHovered(id); onHover?.(id); }, [onHover]);
    const leave = useCallback(() => { setHovered(null); onHover?.(null); }, [onHover]);
    return { hovered, enter, leave };
}

export { useChartDimensions, useInnerDims } from '../_base/hooks';
