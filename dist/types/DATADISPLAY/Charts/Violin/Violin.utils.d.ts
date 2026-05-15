import type { ViolinGroup } from './Violin.types';
import { formatTick } from '../_base/utils';
export declare function buildViolinClasses(className: string | undefined, unstyled: boolean | undefined): string;
/** Simple kernel density estimation using Gaussian kernel. */
export declare function kde(values: number[], min: number, max: number, resolution: number, bandwidthMul: number): {
    value: number;
    density: number;
}[];
export declare function buildViolinScales(data: readonly ViolinGroup[], innerWidth: number, innerHeight: number, yDomain?: [number, number]): {
    xScale: import("d3-scale").ScaleBand<string>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
};
export { formatTick };
export declare function buildTooltipContent(group: ViolinGroup): string;
//# sourceMappingURL=Violin.utils.d.ts.map