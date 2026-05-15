import type { BubbleDatum } from './Bubble.types';
import { formatTick } from '../_base/utils';
export declare function buildBubbleClasses(className: string | undefined, unstyled: boolean | undefined): string;
export declare function buildBubbleScales(data: readonly BubbleDatum[], innerWidth: number, innerHeight: number, getX: (d: BubbleDatum) => number, getY: (d: BubbleDatum) => number, getR: (d: BubbleDatum) => number, minRadius: number, maxRadius: number, xDomain?: [number, number], yDomain?: [number, number]): {
    xScale: import("d3-scale").ScaleLinear<number, number, never>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
    rScale: import("d3-scale").ScaleLinear<number, number, never>;
};
export declare const defaultGetX: (d: BubbleDatum) => number;
export declare const defaultGetY: (d: BubbleDatum) => number;
export declare const defaultGetR: (d: BubbleDatum) => number;
export declare const defaultGetLabel: (d: BubbleDatum) => string;
export { formatTick };
export declare function buildTooltipContent(datum: BubbleDatum, getX: (d: BubbleDatum) => number, getY: (d: BubbleDatum) => number, getR: (d: BubbleDatum) => number): string;
//# sourceMappingURL=Bubble.utils.d.ts.map