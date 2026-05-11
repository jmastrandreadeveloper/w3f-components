import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { Bar as VisxBar } from '@visx/shape';
import type { BarHorizontalDatum, BarHorizontalInnerProps } from './BarHorizontal.types';
import { BAR_H_DEFAULTS } from './BarHorizontal.constants';
import { buildBarHClasses, buildTooltipContent, formatTick } from './BarHorizontal.utils';
import {
    useBarHAccessors,
    useBarHScales,
    useBarHColors,
    useBarHInteraction,
    useInnerDims,
} from './BarHorizontal.hooks';
import { ChartAxis } from '../primitives/ChartAxis';
import { ChartGrid } from '../primitives/ChartGrid';
import { ChartTooltip } from '../primitives/ChartTooltip';
import { BASE_CHART_CLASSES } from '../_base/constants';
import { ChartHeader } from '../_base/ChartHeader';

export const BarHorizontalInner: React.FC<BarHorizontalInnerProps> = (props) => {
    const {
        data, width, height, margin, className,
        unstyled = BAR_H_DEFAULTS.unstyled, bindId, ariaLabel, description, colorScheme, title, subtitle,
        getLabel: gL, getValue: gV,
        showXAxis = BAR_H_DEFAULTS.showXAxis, showYAxis = BAR_H_DEFAULTS.showYAxis,
        showGrid = BAR_H_DEFAULTS.showGrid, showTooltip = BAR_H_DEFAULTS.showTooltip,
        padding = BAR_H_DEFAULTS.padding, barRadius = BAR_H_DEFAULTS.barRadius,
        xDomain, formatX, highlightIndex = null, onHover, onSelect,
    } = props;

    const { getLabel, getValue } = useBarHAccessors(gL, gV);
    const dims = useInnerDims(width, height, margin);
    const { xScale, yScale } = useBarHScales(data, dims.innerWidth, dims.innerHeight, getLabel, getValue, padding, xDomain);
    const colors = useBarHColors(data, colorScheme);
    const { hoveredIndex, handleEnter, handleLeave, handleClick } = useBarHInteraction(onHover, onSelect);
    const classes = useMemo(() => buildBarHClasses(className, unstyled), [className, unstyled]);
    const xTickFormat = formatX ?? formatTick;

    if (data.length === 0) {
        return (
            <div className={classes}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Empty horizontal bar chart'} />
            </div>
        );
    }

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            <div className={BASE_CHART_CLASSES.container} style={{ position: 'relative' }}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Horizontal bar chart'}>
                    {description && <desc>{description}</desc>}
                    <Group top={dims.margin.top} left={dims.margin.left}>
                        {showGrid && (
                            <ChartGrid xScale={xScale} width={dims.innerWidth} height={dims.innerHeight} axis="columns" />
                        )}
                        {data.map((d, i) => {
                            const label = String(getLabel(d));
                            const value = getValue(d);
                            const bh = yScale.bandwidth();
                            const barY = yScale(label) ?? 0;
                            const barWidth = xScale(value) ?? 0;
                            return (
                                <VisxBar
                                    key={label}
                                    x={0}
                                    y={barY}
                                    width={Math.max(barWidth, 0)}
                                    height={bh}
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
                        {showXAxis && <ChartAxis scale={xScale} orientation="bottom" top={dims.innerHeight} tickFormat={xTickFormat} />}
                        {showYAxis && <ChartAxis scale={yScale} orientation="left" />}
                    </Group>
                </svg>
                {showTooltip && hoveredIndex != null && (
                    <ChartTooltip
                        left={(xScale(getValue(data[hoveredIndex])) ?? 0) + dims.margin.left}
                        top={(yScale(String(getLabel(data[hoveredIndex]))) ?? 0) + yScale.bandwidth() / 2 + dims.margin.top}
                        visible
                        offsetX={8}
                    >
                        {buildTooltipContent(data[hoveredIndex], getLabel, getValue)}
                    </ChartTooltip>
                )}
            </div>
        </div>
    );
};

BarHorizontalInner.displayName = 'BarHorizontalInner';
export default BarHorizontalInner;
