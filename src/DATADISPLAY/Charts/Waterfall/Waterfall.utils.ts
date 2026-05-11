import type { WaterfallDatum } from './Waterfall.types';
import { WATERFALL_ROOT_CLASS } from './Waterfall.constants';
import { buildChartRootClasses, buildBandScale, buildLinearScale, formatTick } from '../_base/utils';

export function buildWaterfallClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(WATERFALL_ROOT_CLASS, className, unstyled);
}

export type WaterfallBar = {
    datum: WaterfallDatum;
    index: number;
    y0: number; // bottom of bar (cumulative start)
    y1: number; // top of bar (cumulative end)
    cumulative: number; // running total after this bar
};

/**
 * Compute cumulative bar positions for a waterfall chart.
 */
export function computeWaterfallBars(data: readonly WaterfallDatum[]): WaterfallBar[] {
    let cumulative = 0;
    return data.map((datum, index) => {
        if (datum.isTotal) {
            const bar: WaterfallBar = {
                datum,
                index,
                y0: 0,
                y1: cumulative,
                cumulative,
            };
            return bar;
        }
        const start = cumulative;
        cumulative += datum.value;
        return {
            datum,
            index,
            y0: start,
            y1: cumulative,
            cumulative,
        };
    });
}

export function buildWaterfallScales(
    bars: readonly WaterfallBar[],
    data: readonly WaterfallDatum[],
    innerWidth: number,
    innerHeight: number,
) {
    const labels = data.map((d) => d.label);
    const allValues = bars.flatMap((b) => [b.y0, b.y1]);
    const min = Math.min(0, ...allValues);
    const max = Math.max(0, ...allValues);

    const xScale = buildBandScale(labels, [0, innerWidth], 0.3);
    const yScale = buildLinearScale(min, max, [innerHeight, 0]);

    return { xScale, yScale };
}

export function buildTooltipContent(bar: WaterfallBar): string {
    const { datum } = bar;
    if (datum.isTotal) {
        return `${datum.label}: ${bar.cumulative.toLocaleString()} (total)`;
    }
    const sign = datum.value >= 0 ? '+' : '';
    return `${datum.label}: ${sign}${datum.value.toLocaleString()} → ${bar.cumulative.toLocaleString()}`;
}

export { formatTick };
