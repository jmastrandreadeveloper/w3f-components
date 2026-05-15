import type { FunnelDatum } from './Funnel.types';
export declare function buildFunnelClasses(className: string | undefined, unstyled: boolean | undefined): string;
export type FunnelSegment = {
    datum: FunnelDatum;
    index: number;
    topLeft: number;
    topRight: number;
    bottomLeft: number;
    bottomRight: number;
    y: number;
    height: number;
    percentage: number;
};
/**
 * Compute trapezoid segments for a funnel chart.
 * Each stage width is proportional to its value relative to the max.
 */
export declare function computeFunnelSegments(data: readonly FunnelDatum[], width: number, height: number, gap: number): FunnelSegment[];
export declare function buildSegmentPath(seg: FunnelSegment): string;
export declare function buildTooltipContent(datum: FunnelDatum, percentage: number, formatValue?: (n: number) => string): string;
//# sourceMappingURL=Funnel.utils.d.ts.map