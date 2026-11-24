import type { BoxPlotGroup, BoxPlotStats } from './BoxPlot.types';
import { formatTick } from '../_base/utils';
export declare function buildBoxPlotClasses(className: string | undefined, unstyled: boolean | undefined): string;
/** VX6 (whis): hasta dónde llegan los bigotes: 1,5 × RIC (como siempre), 3 × RIC, mínimo y máximo, o percentiles. */
export type BoxWhisker = 'iqr15' | 'iqr3' | 'minmax' | 'p5_95' | 'p1_99' | 'p10_90';
export declare function computeStats(group: BoxPlotGroup, whis?: BoxWhisker): BoxPlotStats;
export declare function buildBoxPlotScales(stats: readonly BoxPlotStats[], innerWidth: number, innerHeight: number, yDomain?: [number, number]): {
    xScale: import("d3-scale").ScaleBand<string>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
};
export { formatTick };
/** Los cinco números de la caja, de abajo hacia arriba como se dibujan, y los atípicos (0022 P96: igual que la
 *  tabla del documento; antes «med=87177.2, Q1=…, Q3=…», sin bigotes ni atípicos y con otro formato). */
export declare function buildTooltipContent(stats: BoxPlotStats): string;
//# sourceMappingURL=BoxPlot.utils.d.ts.map