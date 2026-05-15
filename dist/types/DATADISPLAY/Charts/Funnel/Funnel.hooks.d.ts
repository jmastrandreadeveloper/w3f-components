import type { FunnelDatum } from './Funnel.types';
import type { ColorSchemeName } from '../_base/types';
export declare function useFunnelSegments(data: readonly FunnelDatum[], width: number, height: number, gap: number): import("./Funnel.utils").FunnelSegment[];
export declare function useFunnelColors(data: readonly FunnelDatum[], colorScheme: ColorSchemeName | readonly string[] | undefined): string[];
export declare function useFunnelInteraction(onHover?: (datum: FunnelDatum | null, index: number | null) => void, onSelect?: (datum: FunnelDatum, index: number) => void): {
    hoveredIndex: number | null;
    handleEnter: (datum: FunnelDatum, index: number) => void;
    handleLeave: () => void;
    handleClick: (datum: FunnelDatum, index: number) => void;
};
export { useChartDimensions, useInnerDims } from '../_base/hooks';
//# sourceMappingURL=Funnel.hooks.d.ts.map