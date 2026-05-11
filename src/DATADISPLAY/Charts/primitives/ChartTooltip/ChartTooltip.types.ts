import type React from 'react';

export interface ChartTooltipProps {
    /** Left position in px relative to the chart wrapper. */
    left: number;
    /** Top position in px relative to the chart wrapper. */
    top: number;
    /** Whether the tooltip is visible. */
    visible: boolean;
    /** Tooltip content. */
    children: React.ReactNode;
    /** Extra className. */
    className?: string;
    /** Offset from the anchor point (px). */
    offsetX?: number;
    offsetY?: number;
}

export interface UseChartTooltipResult<T> {
    tooltipData: T | null;
    tooltipLeft: number;
    tooltipTop: number;
    tooltipOpen: boolean;
    showTooltip: (args: { data: T; left: number; top: number }) => void;
    hideTooltip: () => void;
}
