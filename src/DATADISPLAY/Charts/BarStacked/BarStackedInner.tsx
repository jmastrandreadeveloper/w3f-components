import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { Bar as VisxBar } from '@visx/shape';
import type { BarStackedInnerProps } from './BarStacked.types';
import { BAR_STACKED_DEFAULTS } from './BarStacked.constants';
import { buildBarStackedClasses, formatTick } from './BarStacked.utils';
import { useBarStackedAccessors, useBarStackedScales, useStackData, useBarStackedColors, useBarStackedInteraction, useInnerDims } from './BarStacked.hooks';
import { ChartAxis } from '../primitives/ChartAxis';
import { ChartGrid } from '../primitives/ChartGrid';
import { ChartTooltip } from '../primitives/ChartTooltip';
import { ChartLegend } from '../primitives/ChartLegend';
import { BASE_CHART_CLASSES } from '../_base/constants';
import { ChartHeader } from '../_base/ChartHeader';

export const BarStackedInner: React.FC<BarStackedInnerProps> = (props) => {
    const {
        data, width, height, margin, className, keys,
        unstyled = BAR_STACKED_DEFAULTS.unstyled, bindId, ariaLabel, description, colorScheme, title, subtitle,
        getLabel: gL,
        showXAxis = BAR_STACKED_DEFAULTS.showXAxis, showYAxis = BAR_STACKED_DEFAULTS.showYAxis,
        showGrid = BAR_STACKED_DEFAULTS.showGrid, showTooltip = BAR_STACKED_DEFAULTS.showTooltip,
        showLegend = BAR_STACKED_DEFAULTS.showLegend,
        padding = BAR_STACKED_DEFAULTS.padding, barRadius = BAR_STACKED_DEFAULTS.barRadius,
        formatY, highlightIndex = null, highlightKey = null, onHover, onSelect,
    } = props;

    const { getLabel } = useBarStackedAccessors(gL);
    const dims = useInnerDims(width, height, margin);
    const { xScale, yScale } = useBarStackedScales(data, keys, dims.innerWidth, dims.innerHeight, getLabel, padding);
    const stackRows = useStackData(data, keys, getLabel);
    const colorMap = useBarStackedColors(keys, colorScheme);
    const { hovered, handleEnter, handleLeave, handleClick } = useBarStackedInteraction(onHover, onSelect);
    const classes = useMemo(() => buildBarStackedClasses(className, unstyled), [className, unstyled]);
    const yTickFormat = formatY ?? formatTick;

    const legendItems = useMemo(() => keys.map((k) => ({ id: k, label: k, color: colorMap[k] })), [keys, colorMap]);

    if (data.length === 0) {
        return (<div className={classes}><svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Empty stacked bar chart'} /></div>);
    }

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            {showLegend && <ChartLegend items={legendItems} />}
            <div className={BASE_CHART_CLASSES.container} style={{ position: 'relative' }}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Stacked bar chart'}>
                    {description && <desc>{description}</desc>}
                    <Group top={dims.margin.top} left={dims.margin.left}>
                        {showGrid && <ChartGrid yScale={yScale} width={dims.innerWidth} height={dims.innerHeight} axis="rows" />}

                        {stackRows.map((row, gi) => {
                            const barX = xScale(row.label) ?? 0;
                            const bw = xScale.bandwidth();
                            return (
                                <Group key={row.label}>
                                    {row.segments.map((seg, ki) => {
                                        const y0 = yScale(seg.y0) ?? 0;
                                        const y1 = yScale(seg.y1) ?? 0;
                                        const barY = y1;
                                        const barH = y0 - y1;
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
                                                width={bw} height={Math.max(barH, 0)}
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

                        {showXAxis && <ChartAxis scale={xScale} orientation="bottom" top={dims.innerHeight} />}
                        {showYAxis && <ChartAxis scale={yScale} orientation="left" tickFormat={yTickFormat} />}
                    </Group>
                </svg>

                {showTooltip && hovered != null && (() => {
                    const row = stackRows[hovered.groupIdx];
                    const seg = row.segments[hovered.keyIdx];
                    return (
                        <ChartTooltip
                            left={(xScale(row.label) ?? 0) + xScale.bandwidth() / 2 + dims.margin.left}
                            top={(yScale(seg.y1) ?? 0) + dims.margin.top}
                            visible offsetY={-8}
                        >
                            {`${seg.key}: ${seg.value.toLocaleString()}`}
                        </ChartTooltip>
                    );
                })()}
            </div>
        </div>
    );
};

BarStackedInner.displayName = 'BarStackedInner';
export default BarStackedInner;
