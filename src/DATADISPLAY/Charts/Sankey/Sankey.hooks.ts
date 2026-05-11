import { useMemo, useCallback } from 'react';
import type { SankeyNode, SankeyData } from './Sankey.types';
import type { ColorSchemeName } from '../_base/types';
import { computeSankeyLayout } from './Sankey.utils';
import { useHoveredIndex, useInnerDims } from '../_base/hooks';
import { resolveColorScheme } from '../_base/utils';

export function useSankeyLayout(
    data: SankeyData,
    width: number,
    height: number,
    nodeWidth: number,
    nodePadding: number,
) {
    return useMemo(
        () => computeSankeyLayout(data, width, height, nodeWidth, nodePadding),
        [data, width, height, nodeWidth, nodePadding],
    );
}

export function useSankeyColors(
    nodes: readonly SankeyNode[],
    colorScheme: ColorSchemeName | readonly string[] | undefined,
) {
    return useMemo(() => {
        const palette = resolveColorScheme(colorScheme);
        const groups = [...new Set(nodes.map((n) => n.group ?? n.id))];
        const groupMap = new Map(groups.map((g, i) => [g, palette[i % palette.length]]));
        return new Map(nodes.map((n) => [n.id, groupMap.get(n.group ?? n.id) ?? palette[0]]));
    }, [nodes, colorScheme]);
}

export function useSankeyInteraction(
    onHover?: (datum: SankeyNode | null, index: number | null) => void,
    onSelect?: (datum: SankeyNode, index: number) => void,
) {
    const { hoveredIndex, enter, leave } = useHoveredIndex();

    const handleEnter = useCallback(
        (node: SankeyNode, index: number) => {
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
        (node: SankeyNode, index: number) => {
            onSelect?.(node, index);
        },
        [onSelect],
    );

    return { hoveredIndex, handleEnter, handleLeave, handleClick };
}

export { useChartDimensions, useInnerDims } from '../_base/hooks';
