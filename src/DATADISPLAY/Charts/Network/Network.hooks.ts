import { useMemo, useCallback } from 'react';
import type { NetworkNode, NetworkData } from './Network.types';
import type { ColorSchemeName } from '../_base/types';
import { computeForceLayout } from './Network.utils';
import { useHoveredIndex, useInnerDims } from '../_base/hooks';
import { resolveColorScheme } from '../_base/utils';

export function useNetworkLayout(
    data: NetworkData,
    width: number,
    height: number,
    iterations: number,
) {
    return useMemo(
        () => computeForceLayout(data, width, height, iterations),
        [data, width, height, iterations],
    );
}

export function useNetworkColors(
    nodes: readonly NetworkNode[],
    colorScheme: ColorSchemeName | readonly string[] | undefined,
) {
    return useMemo(() => {
        const palette = resolveColorScheme(colorScheme);
        const groups = [...new Set(nodes.map((n) => n.group ?? n.id))];
        const groupMap = new Map(groups.map((g, i) => [g, palette[i % palette.length]]));
        return nodes.map((n) => groupMap.get(n.group ?? n.id) ?? palette[0]);
    }, [nodes, colorScheme]);
}

export function useNetworkInteraction(
    onHover?: (datum: NetworkNode | null, index: number | null) => void,
    onSelect?: (datum: NetworkNode, index: number) => void,
) {
    const { hoveredIndex, enter, leave } = useHoveredIndex();

    const handleEnter = useCallback(
        (node: NetworkNode, index: number) => {
            enter(index);
            onHover?.(node, index);
        },
        [enter, onHover],
    );

    const handleLeave = useCallback(() => {
        leave();
        onHover?.(null, null);
    }, [leave, onHover]);

    const handleClick = useCallback(
        (node: NetworkNode, index: number) => {
            onSelect?.(node, index);
        },
        [onSelect],
    );

    return { hoveredIndex, handleEnter, handleLeave, handleClick };
}

export { useChartDimensions, useInnerDims } from '../_base/hooks';
