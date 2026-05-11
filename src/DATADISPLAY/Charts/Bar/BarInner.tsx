import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { Bar as VisxBar } from '@visx/shape';
import type { BarDatum, BarInnerProps } from './Bar.types';
import { BAR_DEFAULTS } from './Bar.constants';
import { buildBarClasses, buildTooltipContent, formatTick } from './Bar.utils';
import {
    useBarAccessors,
    useBarScales,
    useBarColors,
    useBarInteraction,
    useInnerDims,
} from './Bar.hooks';
import { ChartAxis } from '../primitives/ChartAxis';
import { ChartGrid } from '../primitives/ChartGrid';
import { ChartTooltip } from '../primitives/ChartTooltip';
import { ChartLegend } from '../primitives/ChartLegend';
import { ChartHeader } from '../_base/ChartHeader';
import { BASE_CHART_CLASSES } from '../_base/constants';

/**
 * BarInner — the core bar chart renderer with fixed width/height.
 *
 * Use this directly when you control dimensions, or wrap with `<Bar>`
 * for responsive behavior.
 */
export const BarInner: React.FC<BarInnerProps> = (props) => {
    const {
        data,
        width,
        height,
        margin,
        className,
        unstyled = BAR_DEFAULTS.unstyled,
        bindId,
        ariaLabel,
        description,
        colorScheme,
        title,
        subtitle,
        getLabel: getLabelProp,
        getValue: getValueProp,
        showXAxis = BAR_DEFAULTS.showXAxis,
        showYAxis = BAR_DEFAULTS.showYAxis,
        showGrid = BAR_DEFAULTS.showGrid,
        showTooltip = BAR_DEFAULTS.showTooltip,
        showLegend = BAR_DEFAULTS.showLegend,
        padding = BAR_DEFAULTS.padding,
        barRadius = BAR_DEFAULTS.barRadius,
        yDomain,
        formatY,
        highlightIndex = null,
        onHover,
        onSelect,
    } = props;

    const { getLabel, getValue } = useBarAccessors(getLabelProp, getValueProp);
    const dims = useInnerDims(width, height, margin);
    const { xScale, yScale } = useBarScales(
        data,
        dims.innerWidth,
        dims.innerHeight,
        getLabel,
        getValue,
        padding,
        yDomain,
    );
    const colors = useBarColors(data, getLabel, colorScheme);
    const { hoveredIndex, handleEnter, handleLeave, handleClick } = useBarInteraction(
        onHover,
        onSelect,
    );

    const classes = useMemo(() => buildBarClasses(className, unstyled), [className, unstyled]);
    const yTickFormat = formatY ?? formatTick;

    const legendItems = useMemo(
        () => showLegend ? data.map((d, i) => ({ id: String(getLabel(d)), label: String(getLabel(d)), color: colors[i] })) : [],
        [showLegend, data, getLabel, colors],
    );

    // Empty data guard
    if (data.length === 0) {
        return (
            <div className={classes}>
                <svg
                    width={width}
                    height={height}
                    className={BASE_CHART_CLASSES.svg}
                    role="img"
                    aria-label={ariaLabel ?? 'Empty bar chart'}
                />
            </div>
        );
    }

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            <div className={BASE_CHART_CLASSES.container} style={{ position: 'relative' }}>
                <svg
                    width={width}
                    height={height}
                    className={BASE_CHART_CLASSES.svg}
                    role="img"
                    aria-label={ariaLabel ?? 'Bar chart'}
                >
                    {description && (
                        <desc>{description}</desc>
                    )}
                    <Group top={dims.margin.top} left={dims.margin.left}>
                        {/* Grid */}
                        {showGrid && (
                            <ChartGrid
                                yScale={yScale}
                                width={dims.innerWidth}
                                height={dims.innerHeight}
                                axis="rows"
                            />
                        )}

                        {/* Bars */}
                        {data.map((d, i) => {
                            const label = String(getLabel(d));
                            const value = getValue(d);
                            const bw = xScale.bandwidth();
                            const barX = xScale(label) ?? 0;
                            const barY = yScale(value) ?? 0;
                            const barHeight = dims.innerHeight - barY;

                            return (
                                <VisxBar
                                    key={label}
                                    x={barX}
                                    y={barY}
                                    width={bw}
                                    height={Math.max(barHeight, 0)}
                                    fill={colors[i]}
                                    opacity={
                                        highlightIndex != null
                                            ? (highlightIndex === i ? 1 : 0.3)
                                            : hoveredIndex != null && hoveredIndex !== i ? 0.5 : 1
                                    }
                                    stroke={highlightIndex === i ? '#fff' : undefined}
                                    strokeWidth={highlightIndex === i ? 2 : undefined}
                                    rx={barRadius}
                                    onMouseEnter={() => handleEnter(d, i)}
                                    onMouseLeave={handleLeave}
                                    onClick={onSelect ? () => handleClick(d, i) : undefined}
                                    style={{ cursor: onSelect ? 'pointer' : undefined, transition: 'opacity 120ms ease-out' }}
                                />
                            );
                        })}

                        {/* Axes */}
                        {showXAxis && (
                            <ChartAxis
                                scale={xScale}
                                orientation="bottom"
                                top={dims.innerHeight}
                            />
                        )}
                        {showYAxis && (
                            <ChartAxis
                                scale={yScale}
                                orientation="left"
                                tickFormat={yTickFormat}
                            />
                        )}
                    </Group>
                </svg>

                {/* Tooltip */}
                {showTooltip && hoveredIndex != null && (
                    <ChartTooltip
                        left={(xScale(String(getLabel(data[hoveredIndex]))) ?? 0) + xScale.bandwidth() / 2 + dims.margin.left}
                        top={(yScale(getValue(data[hoveredIndex])) ?? 0) + dims.margin.top}
                        visible
                        offsetY={-8}
                    >
                        {buildTooltipContent(data[hoveredIndex], getLabel, getValue)}
                    </ChartTooltip>
                )}
            </div>

            {showLegend && legendItems.length > 0 && (
                <ChartLegend items={legendItems} direction="horizontal" />
            )}
        </div>
    );
};

BarInner.displayName = 'BarInner';

export default BarInner;
