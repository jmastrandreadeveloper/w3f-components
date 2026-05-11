import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import type { WaterfallInnerProps } from './Waterfall.types';
import { WATERFALL_DEFAULTS } from './Waterfall.constants';
import { buildWaterfallClasses, buildTooltipContent, formatTick } from './Waterfall.utils';
import {
    useWaterfallBars,
    useWaterfallScales,
    useWaterfallInteraction,
    useInnerDims,
} from './Waterfall.hooks';
import { ChartAxis } from '../primitives/ChartAxis';
import { ChartGrid } from '../primitives/ChartGrid';
import { ChartTooltip } from '../primitives/ChartTooltip';
import { BASE_CHART_CLASSES } from '../_base/constants';
import { ChartHeader } from '../_base/ChartHeader';

export const WaterfallInner: React.FC<WaterfallInnerProps> = (props) => {
    const {
        data,
        width,
        height,
        margin,
        className,
        unstyled = WATERFALL_DEFAULTS.unstyled,
        bindId,
        ariaLabel,
        description, title, subtitle,
        showXAxis = WATERFALL_DEFAULTS.showXAxis,
        showYAxis = WATERFALL_DEFAULTS.showYAxis,
        showGrid = WATERFALL_DEFAULTS.showGrid,
        showTooltip = WATERFALL_DEFAULTS.showTooltip,
        showLabels = WATERFALL_DEFAULTS.showLabels,
        showConnectors = WATERFALL_DEFAULTS.showConnectors,
        positiveColor = WATERFALL_DEFAULTS.positiveColor,
        negativeColor = WATERFALL_DEFAULTS.negativeColor,
        totalColor = WATERFALL_DEFAULTS.totalColor,
        formatY,
        onHover,
        onSelect,
        highlightIndex = null,
    } = props;

    const bars = useWaterfallBars(data);
    const dims = useInnerDims(width, height, margin);
    const { xScale, yScale } = useWaterfallScales(bars, data, dims.innerWidth, dims.innerHeight);
    const { hoveredIndex, handleEnter, handleLeave, handleClick } = useWaterfallInteraction(onHover, onSelect);

    const classes = useMemo(() => buildWaterfallClasses(className, unstyled), [className, unstyled]);
    const yTickFormat = formatY ?? formatTick;

    if (data.length === 0) {
        return (
            <div className={classes}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Empty waterfall chart'} />
            </div>
        );
    }

    const bandwidth = xScale.bandwidth();

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            <div className={BASE_CHART_CLASSES.container} style={{ position: 'relative' }}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Waterfall chart'}>
                    {description && <desc>{description}</desc>}
                    <Group top={dims.margin.top} left={dims.margin.left}>
                        {showGrid && (
                            <ChartGrid
                                xScale={xScale}
                                yScale={yScale}
                                width={dims.innerWidth}
                                height={dims.innerHeight}
                                axis="y"
                            />
                        )}

                        {bars.map((bar, i) => {
                            const x = xScale(bar.datum.label) ?? 0;
                            const yTop = yScale(Math.max(bar.y0, bar.y1)) ?? 0;
                            const yBot = yScale(Math.min(bar.y0, bar.y1)) ?? 0;
                            const barHeight = Math.max(yBot - yTop, 1);
                            const fill = bar.datum.isTotal
                                ? totalColor
                                : bar.datum.value >= 0
                                    ? positiveColor
                                    : negativeColor;

                            return (
                                <g key={i}>
                                    {/* Connector line from previous bar */}
                                    {showConnectors && i > 0 && !bar.datum.isTotal && (
                                        <line
                                            x1={xScale(bars[i - 1].datum.label)! + bandwidth}
                                            y1={yScale(bar.y0) ?? 0}
                                            x2={x}
                                            y2={yScale(bar.y0) ?? 0}
                                            stroke="#94a3b8"
                                            strokeWidth={1}
                                            strokeDasharray="3,3"
                                        />
                                    )}
                                    <rect
                                        x={x}
                                        y={yTop}
                                        width={bandwidth}
                                        height={barHeight}
                                        fill={fill}
                                        opacity={
                                            highlightIndex != null
                                                ? (highlightIndex === i ? 1 : 0.3)
                                                : hoveredIndex != null && hoveredIndex !== i ? 0.4 : 0.85
                                        }
                                        stroke={highlightIndex === i ? '#fff' : undefined}
                                        strokeWidth={highlightIndex === i ? 2 : undefined}
                                        rx={2}
                                        onMouseEnter={() => handleEnter(bar.datum, i)}
                                        onMouseLeave={handleLeave}
                                        onClick={onSelect ? () => handleClick(bar.datum, i) : undefined}
                                        style={{ cursor: highlightIndex === i ? 'pointer' : onSelect ? 'pointer' : 'default', transition: 'opacity 120ms ease-out' }}
                                    />
                                    {showLabels && (
                                        <text
                                            x={x + bandwidth / 2}
                                            y={yTop - 4}
                                            textAnchor="middle"
                                            fontSize={10}
                                            fill="currentColor"
                                            pointerEvents="none"
                                        >
                                            {bar.datum.isTotal
                                                ? bar.cumulative.toLocaleString()
                                                : `${bar.datum.value >= 0 ? '+' : ''}${bar.datum.value.toLocaleString()}`}
                                        </text>
                                    )}
                                </g>
                            );
                        })}

                        {showXAxis && (
                            <ChartAxis scale={xScale} orientation="bottom" top={dims.innerHeight} />
                        )}
                        {showYAxis && (
                            <ChartAxis scale={yScale} orientation="left" tickFormat={yTickFormat} />
                        )}
                    </Group>
                </svg>

                {showTooltip && hoveredIndex != null && bars[hoveredIndex] && (
                    <ChartTooltip
                        left={(xScale(bars[hoveredIndex].datum.label) ?? 0) + bandwidth / 2 + dims.margin.left}
                        top={(yScale(Math.max(bars[hoveredIndex].y0, bars[hoveredIndex].y1)) ?? 0) + dims.margin.top}
                        visible
                        offsetY={-16}
                    >
                        {buildTooltipContent(bars[hoveredIndex])}
                    </ChartTooltip>
                )}
            </div>
        </div>
    );
};

WaterfallInner.displayName = 'WaterfallInner';
export default WaterfallInner;
