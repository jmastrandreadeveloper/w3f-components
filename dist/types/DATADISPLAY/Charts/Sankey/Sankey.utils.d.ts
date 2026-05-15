import type { SankeyNode, SankeyLink, SankeyData } from './Sankey.types';
export declare function buildSankeyClasses(className: string | undefined, unstyled: boolean | undefined): string;
type LayoutNode = SankeyNode & {
    x0: number;
    x1: number;
    y0: number;
    y1: number;
    value: number;
    layer: number;
};
type LayoutLink = SankeyLink & {
    sy0: number;
    sy1: number;
    ty0: number;
    ty1: number;
    width: number;
};
/**
 * Compute a simple Sankey layout.
 * Assigns nodes to layers via topological ordering, distributes vertically
 * proportional to their throughput, and computes cubic Bezier link paths.
 */
export declare function computeSankeyLayout(data: SankeyData, width: number, height: number, nodeWidth: number, nodePadding: number): {
    nodes: LayoutNode[];
    links: LayoutLink[];
};
/**
 * Build a cubic Bezier path for a Sankey link.
 */
export declare function buildLinkPath(sx: number, sy0: number, sy1: number, tx: number, ty0: number, ty1: number): string;
export declare function buildTooltipContent(node: SankeyNode): string;
export {};
//# sourceMappingURL=Sankey.utils.d.ts.map