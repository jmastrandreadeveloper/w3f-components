import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { Bar as VisxBar } from '@visx/shape';
import type { BarGroupedHInnerProps } from './BarGroupedHorizontal.types';
import { BAR_GH_DEFAULTS } from './BarGroupedHorizontal.constants';
import { buildBarGHClasses, formatTick } from './BarGroupedHorizontal.utils';
import { useBarGHAccessors, useBarGHScales, useBarGHColors, useBarGHInteraction, useInnerDims } from './BarGroupedHorizontal.hooks';
import { ChartAxis } from '../primitives/ChartAxis';
import { ChartGrid } from '../primitives/ChartGrid';
import { ChartTooltip } from '../primitives/ChartTooltip';
import { ChartLegend } from '../primitives/ChartLegend';
import { BASE_CHART_CLASSES } from '../_base/constants';
import { ChartHeader } from '../_base/ChartHeader';

export const BarGroupedHorizontalInner: React.FC<BarGroupedHInnerProps> = (props) => {
    const {
        data, width, height, margin, className, keys,
        unstyled = BAR_GH_DEFAULTS.unstyled, bindId, ariaLabel, description, colorScheme, title, subtitle,
        getLabel: gL,
        showXAxis = BAR_GH_DEFAULTS.showXAxis, showYAxis = BAR_GH_DEFAULTS.showYAxis,
        showGrid = BAR_GH_DEFAULTS.showGrid, showTooltip = BAR_GH_DEFAULTS.showTooltip,
        showLegend = BAR_GH_DEFAULTS.showLegend,
        padding = BAR_GH_DEFAULTS.padding, barRadius = BAR_GH_DEFAULTS.barRadius,
        xDomain, formatX, highlightIndex = null, highlightKey = null, onHover, onSelect,
    } = props;

    const { getLabel } = useBarGHAccessors(gL);
    const dims = useInnerDims(width, height, margin);
    const { y0Scale, y1Scale, xScale } = useBarGHScales(data, keys, dims.innerWidth, dims.innerHeight, getLabel, padding, xDomain);
    const colorMap = useBarGHColors(keys, colorScheme);
    const { hovered, handleEnter, handleLeave, handleClick } = useBarGHInteraction(onHover, onSelect);
    const classes = useMemo(() => buildBarGHClasses(className, unstyled), [className, unstyled]);
    const xTickFormat = formatX ?? formatTick;

    const legendItems = useMemo(() => keys.map((k) => ({ id: k, label: k, color: colorMap[k] })), [keys, colorMap]);

    if (data.length === 0) {
        return (<div className={classes}><svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Empty grouped horizontal bar chart'} /></div>);
    }

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            {showLegend && <ChartLegend items={legendItems} />}
            <div className={BASE_CHART_CLASSES.container} style={{ position: 'relative' }}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Grouped horizontal bar chart'}>
                    {description && <desc>{description}</desc>}
                    <Group top={dims.margin.top} left={dims.margin.left}>
                        {showGrid && <ChartGrid xScale={xScale} width={dims.innerWidth} height={dims.innerHeight} axis="columns" />}
                        {data.map((d, gi) => {
                            const label = String(getLabel(d));
                            const groupY = y0Scale(label) ?? 0;
                            return (
                                <Group key={label} top={groupY}>
                                    {keys.map((key, ki) => {
                                        const value = Number(d[key]) || 0;
                                        const barY = y1Scale(key) ?? 0;
                                        const barW = xScale(value) ?? 0;
                                        const isHovered = hovered?.groupIdx === gi && hovered?.keyIdx === ki;
                                        const isHighlightedGroup = highlightIndex === gi;
                                        const isHighlightedBar = isHighlightedGroup && (highlightKey == null || highlightKey === key);
                                        const isDimmed = highlightIndex != null
                                            ? !isHighlightedBar
                                            : hovered != null && !isHovered;
                                        return (
                                            <VisxBar
                                                key={key} x={0} y={barY}
                                                width={Math.max(barW, 0)} height={y1Scale.bandwidth()}
                                                fill={colorMap[key]}
                                                opacity={isDimmed ? 0.3 : 1}
                                                stroke={isHighlightedBar ? '#fff' : undefined}
                                                strokeWidth={isHighlightedBar ? 2 : undefined}
                                                rx={barRadius}
                                                onMouseEnter={() => handleEnter(d, gi, ki)} onMouseLeave={handleLeave}
                                                onClick={onSelect ? () => handleClick(d, gi) : undefined}
                                                style={{ cursor: onSelect ? 'pointer' : undefined, transition: 'opacity 120ms ease-out' }}
                                            />
                                        );
                                    })}
                                </Group>
                            );
                        })}
                        {showXAxis && <ChartAxis scale={xScale} orientation="bottom" top={dims.innerHeight} tickFormat={xTickFormat} />}
                        {showYAxis && <ChartAxis scale={y0Scale} orientation="left" />}
                    </Group>
                </svg>
                {showTooltip && hovered != null && (() => {
                    const d = data[hovered.groupIdx];
                    const key = keys[hovered.keyIdx];
                    const label = String(getLabel(d));
                    const value = Number(d[key]) || 0;
                    const groupY = y0Scale(label) ?? 0;
                    const barY = y1Scale(key) ?? 0;
                    return (
                        <ChartTooltip left={(xScale(value) ?? 0) + dims.margin.left} top={groupY + barY + y1Scale.bandwidth() / 2 + dims.margin.top} visible offsetX={8}>
                            {`${key}: ${value.toLocaleString()}`}
                        </ChartTooltip>
                    );
                })()}
            </div>
        </div>
    );
};

BarGroupedHorizontalInner.displayName = 'BarGroupedHorizontalInner';
export default BarGroupedHorizontalInner;
