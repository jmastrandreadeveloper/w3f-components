import type { FunnelDatum } from './Funnel.types';
import { FUNNEL_ROOT_CLASS } from './Funnel.constants';
import { buildChartRootClasses } from '../_base/utils';

export function buildFunnelClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(FUNNEL_ROOT_CLASS, className, unstyled);
}

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
export function computeFunnelSegments(
    data: readonly FunnelDatum[],
    width: number,
    height: number,
    gap: number,
): FunnelSegment[] {
    if (data.length === 0) return [];

    const maxValue = data[0].value; // First stage is typically the largest
    const totalGap = gap * (data.length - 1);
    const segmentHeight = (height - totalGap) / data.length;
    const centerX = width / 2;
    const maxHalfWidth = width * 0.45; // 90% of width for the widest stage

    return data.map((datum, i) => {
        const currentRatio = maxValue > 0 ? datum.value / maxValue : 0;
        const nextRatio = i < data.length - 1 && maxValue > 0 ? data[i + 1].value / maxValue : currentRatio * 0.7;

        const topHalf = currentRatio * maxHalfWidth;
        const bottomHalf = (i < data.length - 1 ? nextRatio : currentRatio * 0.7) * maxHalfWidth;

        const y = i * (segmentHeight + gap);

        return {
            datum,
            index: i,
            topLeft: centerX - topHalf,
            topRight: centerX + topHalf,
            bottomLeft: centerX - bottomHalf,
            bottomRight: centerX + bottomHalf,
            y,
            height: segmentHeight,
            percentage: maxValue > 0 ? (datum.value / maxValue) * 100 : 0,
        };
    });
}

export function buildSegmentPath(seg: FunnelSegment): string {
    return [
        `M${seg.topLeft},${seg.y}`,
        `L${seg.topRight},${seg.y}`,
        `L${seg.bottomRight},${seg.y + seg.height}`,
        `L${seg.bottomLeft},${seg.y + seg.height}`,
        'Z',
    ].join(' ');
}

export function buildTooltipContent(datum: FunnelDatum, percentage: number, formatValue?: (n: number) => string): string {
    const val = formatValue ? formatValue(datum.value) : datum.value.toLocaleString();
    return `${datum.label}: ${val} (${percentage.toFixed(1)}%)`;
}
