import type { DotPlotDatum } from './DotPlot.types';
import { DOTPLOT_ROOT_CLASS } from './DotPlot.constants';
import { buildChartRootClasses, buildLinearScale, buildBandScale, safeExtent, formatTick } from '../_base/utils';

export function buildDotPlotClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(DOTPLOT_ROOT_CLASS, className, unstyled);
}

export function buildDotPlotScales(
    data: readonly DotPlotDatum[],
    categories: readonly string[],
    innerWidth: number,
    innerHeight: number,
    getX: (d: DotPlotDatum) => number,
    xDomain?: [number, number],
) {
    const xs = data.map(getX);
    const [xMin, xMax] = xDomain ?? safeExtent(xs);
    const xScale = buildLinearScale(xMin, xMax, [0, innerWidth], { padding: 0.05 });
    const yScale = buildBandScale(categories as string[], [0, innerHeight], 0.3);
    return { xScale, yScale };
}

export const defaultGetX = (d: DotPlotDatum) => d.x;
export const defaultGetCategory = (d: DotPlotDatum) => d.y;

export { formatTick };

export function buildTooltipContent(datum: DotPlotDatum, getX: (d: DotPlotDatum) => number, category: string): string {
    return `${category}: ${getX(datum).toLocaleString()}`;
}
