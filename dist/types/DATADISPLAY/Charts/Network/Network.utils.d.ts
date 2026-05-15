import type { NetworkNode, NetworkLink, NetworkData } from './Network.types';
export declare function buildNetworkClasses(className: string | undefined, unstyled: boolean | undefined): string;
/**
 * Simple force-directed layout using velocity Verlet integration.
 * No external physics library needed — just iterative repulsion + attraction.
 */
export declare function computeForceLayout(data: NetworkData, width: number, height: number, iterations: number): {
    nodes: (NetworkNode & {
        x: number;
        y: number;
    })[];
    links: NetworkLink[];
};
export declare function buildTooltipContent(node: NetworkNode): string;
//# sourceMappingURL=Network.utils.d.ts.map