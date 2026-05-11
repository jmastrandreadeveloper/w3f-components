import type { SankeyNode, SankeyLink, SankeyData } from './Sankey.types';
import { SANKEY_ROOT_CLASS } from './Sankey.constants';
import { buildChartRootClasses } from '../_base/utils';

export function buildSankeyClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(SANKEY_ROOT_CLASS, className, unstyled);
}

type LayoutNode = SankeyNode & { x0: number; x1: number; y0: number; y1: number; value: number; layer: number };
type LayoutLink = SankeyLink & { sy0: number; sy1: number; ty0: number; ty1: number; width: number };

/**
 * Compute a simple Sankey layout.
 * Assigns nodes to layers via topological ordering, distributes vertically
 * proportional to their throughput, and computes cubic Bezier link paths.
 */
export function computeSankeyLayout(
    data: SankeyData,
    width: number,
    height: number,
    nodeWidth: number,
    nodePadding: number,
): { nodes: LayoutNode[]; links: LayoutLink[] } {
    // Require links to have value for Sankey
    const linksRaw = data.links.filter((l) => (l.value ?? 0) > 0) as { source: string; target: string; value: number }[];

    // Build adjacency
    const outgoing = new Map<string, { target: string; value: number }[]>();
    const incoming = new Map<string, { source: string; value: number }[]>();
    const nodeIds = new Set<string>();

    for (const n of data.nodes) nodeIds.add(n.id);
    for (const l of linksRaw) {
        nodeIds.add(l.source);
        nodeIds.add(l.target);
        if (!outgoing.has(l.source)) outgoing.set(l.source, []);
        outgoing.get(l.source)!.push({ target: l.target, value: l.value });
        if (!incoming.has(l.target)) incoming.set(l.target, []);
        incoming.get(l.target)!.push({ source: l.source, value: l.value });
    }

    // Assign layers via longest path from sources
    const layerMap = new Map<string, number>();
    const visited = new Set<string>();

    function assignLayer(id: string): number {
        if (layerMap.has(id)) return layerMap.get(id)!;
        if (visited.has(id)) return 0; // cycle guard
        visited.add(id);
        const inc = incoming.get(id) ?? [];
        const layer = inc.length === 0 ? 0 : Math.max(...inc.map((l) => assignLayer(l.source) + 1));
        layerMap.set(id, layer);
        return layer;
    }

    for (const id of nodeIds) assignLayer(id);

    const maxLayer = Math.max(0, ...layerMap.values());
    const layerWidth = maxLayer > 0 ? (width - nodeWidth) / maxLayer : 0;

    // Group by layer
    const layers: string[][] = Array.from({ length: maxLayer + 1 }, () => []);
    for (const [id, layer] of layerMap) layers[layer].push(id);

    // Compute node values (sum of outgoing or incoming, whichever is larger)
    const nodeValueMap = new Map<string, number>();
    for (const id of nodeIds) {
        const outVal = (outgoing.get(id) ?? []).reduce((s, l) => s + l.value, 0);
        const inVal = (incoming.get(id) ?? []).reduce((s, l) => s + l.value, 0);
        nodeValueMap.set(id, Math.max(outVal, inVal));
    }

    // Compute vertical positions per layer
    const nodeMap = new Map<string, LayoutNode>();
    const nodeLabel = new Map<string, string>();
    for (const n of data.nodes) nodeLabel.set(n.id, n.label ?? n.id);

    for (let li = 0; li <= maxLayer; li++) {
        const ids = layers[li];
        const totalValue = ids.reduce((s, id) => s + nodeValueMap.get(id)!, 0);
        const totalPadding = (ids.length - 1) * nodePadding;
        const availableHeight = Math.max(height - totalPadding, 10);
        const scale = totalValue > 0 ? availableHeight / totalValue : 1;

        let y = 0;
        for (const id of ids) {
            const val = nodeValueMap.get(id)!;
            const h = Math.max(val * scale, 2);
            const x0 = li * layerWidth;
            nodeMap.set(id, {
                id,
                label: nodeLabel.get(id) ?? id,
                group: data.nodes.find((n) => n.id === id)?.group,
                x0,
                x1: x0 + nodeWidth,
                y0: y,
                y1: y + h,
                value: val,
                layer: li,
            });
            y += h + nodePadding;
        }
    }

    // Compute link positions
    const sourceOffsets = new Map<string, number>();
    const targetOffsets = new Map<string, number>();

    const layoutLinks: LayoutLink[] = linksRaw.map((l) => {
        const sNode = nodeMap.get(l.source)!;
        const tNode = nodeMap.get(l.target)!;
        const sH = sNode.y1 - sNode.y0;
        const tH = tNode.y1 - tNode.y0;
        const sTotal = nodeValueMap.get(l.source)!;
        const tTotal = nodeValueMap.get(l.target)!;
        const linkSHeight = sTotal > 0 ? (l.value / sTotal) * sH : 0;
        const linkTHeight = tTotal > 0 ? (l.value / tTotal) * tH : 0;

        const sOff = sourceOffsets.get(l.source) ?? 0;
        const tOff = targetOffsets.get(l.target) ?? 0;

        const sy0 = sNode.y0 + sOff;
        const sy1 = sy0 + linkSHeight;
        const ty0 = tNode.y0 + tOff;
        const ty1 = ty0 + linkTHeight;

        sourceOffsets.set(l.source, sOff + linkSHeight);
        targetOffsets.set(l.target, tOff + linkTHeight);

        return { ...l, sy0, sy1, ty0, ty1, width: Math.max(linkSHeight, 1) };
    });

    return { nodes: [...nodeMap.values()], links: layoutLinks };
}

/**
 * Build a cubic Bezier path for a Sankey link.
 */
export function buildLinkPath(
    sx: number, sy0: number, sy1: number,
    tx: number, ty0: number, ty1: number,
): string {
    const midX = (sx + tx) / 2;
    return [
        `M${sx},${sy0}`,
        `C${midX},${sy0} ${midX},${ty0} ${tx},${ty0}`,
        `L${tx},${ty1}`,
        `C${midX},${ty1} ${midX},${sy1} ${sx},${sy1}`,
        'Z',
    ].join(' ');
}

export function buildTooltipContent(node: SankeyNode): string {
    const label = node.label ?? node.id;
    return node.value != null ? `${label}: ${node.value.toLocaleString()}` : label;
}
