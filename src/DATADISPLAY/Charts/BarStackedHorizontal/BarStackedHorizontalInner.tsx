import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { Bar as VisxBar } from '@visx/shape';
import type { BarStackedHInnerProps } from './BarStackedHorizontal.types';
import { BAR_SH_DEFAULTS } from './BarStackedHorizontal.constants';
import { buildBarSHClasses, formatTick } from './BarStackedHorizontal.utils';
import { useBarSHAccessors, useBarSHScales, useStackHData, useBarSHColors, useBarSHInteraction, useInnerDims } from './BarStackedHorizontal.hooks';
import { ChartAxis } from '../primitives/ChartAxis';
import { ChartGrid } from '../primitives/ChartGrid';
import { ChartTooltip } from '../primitives/ChartTooltip';
import { ChartLegend } from '../primitives/ChartLegend';
import { BASE_CHART_CLASSES } from '../_base/constants';
import { ChartHeader } from '../_base/ChartHeader';

export const BarStackedHorizontalInner: React.FC<BarStackedHInnerProps> = (props) => {
    const {
        data, width, height, margin, className, keys,
        unstyled = BAR_SH_DEFAULTS.unstyled, bindId, ariaLabel, description, colorScheme, title, subtitle,
        getLabel: gL,
        showXAxis = BAR_SH_DEFAULTS.showXAxis, showYAxis = BAR_SH_DEFAULTS.showYAxis,
        showGrid = BAR_SH_DEFAULTS.showGrid, showTooltip = BAR_SH_DEFAULTS.showTooltip,
        showLegend = BAR_SH_DEFAULTS.showLegend,
        padding = BAR_SH_DEFAULTS.padding, barRadius = BAR_SH_DEFAULTS.barRadius,
        formatX, highlightIndex = null, highlightKey = null, onHover, onSelect,
    } = props;

    const { getLabel } = useBarSHAccessors(gL);
    const dims = useInnerDims(width, height, margin);
    const { xScale, yScale } = useBarSHScales(data, keys, dims.innerWidth, dims.innerHeight, getLabel, padding);
    const stackRows = useStackHData(data, keys, getLabel);
    const colorMap = useBarSHColors(keys, colorScheme);
    const { hovered, handleEnter, handleLeave, handleClick } = useBarSHInteraction(onHover, onSelect);
    const classes = useMemo(() => buildBarSHClasses(className, unstyled), [className, unstyled]);
    const xTickFormat = formatX ?? formatTick;

    const legendItems = useMemo(() => keys.map((k) => ({ id: k, label: k, color: colorMap[k] })), [keys, colorMap]);

    if (data.length === 0) {
        return (<div className={classes}><svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Empty stacked horizontal bar chart'} /></div>);
    }

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            {showLegend && <ChartLegend items={legendItems} />}
            <div className={BASE_CHART_CLASSES.container} style={{ position: 'relative' }}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Stacked horizontal bar chart'}>
                    {description && <desc>{description}</desc>}
                    <Group top={dims.margin.top} left={dims.margin.left}>
                        {showGrid && <ChartGrid xScale={xScale} width={dims.innerWidth} height={dims.innerHeight} axis="columns" />}

                        {stackRows.map((row, gi) => {
                            const barY = yScale(row.label) ?? 0;
                            const bh = yScale.bandwidth();
                            return (
                                <Group key={row.label}>
                                    {row.segments.map((seg, ki) => {
                                        const x0 = xScale(seg.x0) ?? 0;
                                        const x1 = xScale(seg.x1) ?? 0;
                                        const barX = x0;
                                        const barW = x1 - x0;
                                        const isHovered = hovered?.groupIdx === gi && hovered?.keyIdx === ki;
                                        const isHighlightedGroup = highlightIndex === gi;
                                        const isHighlightedBar = isHighlightedGroup && (highlightKey == null || highlightKey === seg.key);
                                        const isDimmed = highlightIndex != null
                                            ? !isHighlightedBar
                                            : hovered != null && !isHovered;
                                        return (
                                            <VisxBar
                                                key={seg.key}
                                                x={barX} y={barY}
                                                width={Math.max(barW, 0)} height={bh}
                                                fill={colorMap[seg.key]}
                                                opacity={isDimmed ? 0.3 : 1}
                                                stroke={isHighlightedBar ? '#fff' : undefined}
                                                strokeWidth={isHighlightedBar ? 2 : undefined}
                                                rx={barRadius}
                                                onMouseEnter={() => handleEnter(data[gi], gi, ki)}
                                                onMouseLeave={handleLeave}
                                                onClick={onSelect ? () => handleClick(data[gi], gi) : undefined}
                                                style={{ cursor: onSelect ? 'pointer' : undefined, transition: 'opacity 120ms ease-out' }}
                                            />
                                        );
                                    })}
                                </Group>
                            );
                        })}

                        {showXAxis && <ChartAxis scale={xScale} orientation="bottom" top={dims.innerHeight} tickFormat={xTickFormat} />}
                        {showYAxis && <ChartAxis scale={yScale} orientation="left" />}
                    </Group>
                </svg>

                {showTooltip && hovered != null && (() => {
                    const row = stackRows[hovered.groupIdx];
                    const seg = row.segments[hovered.keyIdx];
                    return (
                        <ChartTooltip
                            left={(xScale(seg.x1) ?? 0) + dims.margin.left}
                            top={(yScale(row.label) ?? 0) + yScale.bandwidth() / 2 + dims.margin.top}
                            visible offsetX={8}
                        >
                            {`${seg.key}: ${seg.value.toLocaleString()}`}
                        </ChartTooltip>
                    );
                })()}
            </div>
        </div>
    );
};

BarStackedHorizontalInner.displayName = 'BarStackedHorizontalInner';
export default BarStackedHorizontalInner;
