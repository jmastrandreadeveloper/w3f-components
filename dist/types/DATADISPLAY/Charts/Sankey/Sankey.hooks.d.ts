import type { SankeyNode, SankeyData } from './Sankey.types';
import type { ColorSchemeName } from '../_base/types';
export declare function useSankeyLayout(data: SankeyData, width: number, height: number, nodeWidth: number, nodePadding: number): {
    nodes: (SankeyNode & {
        x0: number;
        x1: number;
        y0: number;
        y1: number;
        value: number;
        layer: number;
    })[];
    links: (import("./Sankey.types").SankeyLink & {
        sy0: number;
        sy1: number;
        ty0: number;
        ty1: number;
        width: number;
    })[];
};
export declare function useSankeyColors(nodes: readonly SankeyNode[], colorScheme: ColorSchemeName | readonly string[] | undefined): Map<string, string>;
export declare function useSankeyInteraction(onHover?: (datum: SankeyNode | null, index: number | null) => void, onSelect?: (datum: SankeyNode, index: number) => void): {
    hoveredIndex: number | null;
    handleEnter: (node: SankeyNode, index: number) => void;
    handleLeave: () => void;
    handleClick: (node: SankeyNode, index: number) => void;
};
export { useChartDimensions, useInnerDims } from '../_base/hooks';
//# sourceMappingURL=Sankey.hooks.d.ts.map