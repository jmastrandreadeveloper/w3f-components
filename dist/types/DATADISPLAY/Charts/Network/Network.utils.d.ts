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
/** Agranda (o achica) el dibujo para que ocupe el área, dejando lugar a los rótulos: con pocos nodos muy conectados
 *  la fuerza los juntaba en el centro y el gráfico quedaba diminuto. */
export declare function fitToArea(nodes: {
    x: number;
    y: number;
}[], width: number, height: number, marginX?: number, marginY?: number): void;
export declare function buildTooltipContent(node: NetworkNode): string;
//# sourceMappingURL=Network.utils.d.ts.map