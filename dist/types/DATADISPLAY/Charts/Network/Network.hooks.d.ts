import type { NetworkNode, NetworkData } from './Network.types';
import type { ColorSchemeName } from '../_base/types';
export declare function useNetworkLayout(data: NetworkData, width: number, height: number, iterations: number): {
    nodes: (NetworkNode & {
        x: number;
        y: number;
    })[];
    links: import("./Network.types").NetworkLink[];
};
export declare function useNetworkColors(nodes: readonly NetworkNode[], colorScheme: ColorSchemeName | readonly string[] | undefined): string[];
export declare function useNetworkInteraction(onHover?: (datum: NetworkNode | null, index: number | null) => void, onSelect?: (datum: NetworkNode, index: number) => void): {
    hoveredIndex: number | null;
    handleEnter: (node: NetworkNode, index: number) => void;
    handleLeave: () => void;
    handleClick: (node: NetworkNode, index: number) => void;
};
export { useChartDimensions, useInnerDims } from '../_base/hooks';
//# sourceMappingURL=Network.hooks.d.ts.map