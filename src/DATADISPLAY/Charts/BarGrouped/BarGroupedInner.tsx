import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { Bar as VisxBar } from '@visx/shape';
import type { BarGroupedInnerProps } from './BarGrouped.types';
import { BAR_GROUPED_DEFAULTS } from './BarGrouped.constants';
import { buildBarGroupedClasses, formatTick } from './BarGrouped.utils';
import {
    useBarGroupedAccessors,
    useBarGroupedScales,
    useBarGroupedColors,
    useBarGroupedInteraction,
    useInnerDims,
} from './BarGrouped.hooks';
import { ChartAxis } from '../primitives/ChartAxis';
import { ChartGrid } from '../primitives/ChartGrid';
import { ChartTooltip } from '../primitives/ChartTooltip';
import { ChartLegend } from '../primitives/ChartLegend';
import { BASE_CHART_CLASSES } from '../_base/constants';
import { ChartHeader } from '../_base/ChartHeader';

export const BarGroupedInner: React.FC<BarGroupedInnerProps> = (props) => {
    const {
        data, width, height, margin, className, keys,
        unstyled = BAR_GROUPED_DEFAULTS.unstyled, bindId, ariaLabel, description, colorScheme, title, subtitle,
        getLabel: gL,
        showXAxis = BAR_GROUPED_DEFAULTS.showXAxis, showYAxis = BAR_GROUPED_DEFAULTS.showYAxis,
        showGrid = BAR_GROUPED_DEFAULTS.showGrid, showTooltip = BAR_GROUPED_DEFAULTS.showTooltip,
        showLegend = BAR_GROUPED_DEFAULTS.showLegend,
        padding = BAR_GROUPED_DEFAULTS.padding, barRadius = BAR_GROUPED_DEFAULTS.barRadius,
        yDomain, formatY, highlightIndex = null, highlightKey = null, onHover, onSelect,
    } = props;

    const { getLabel } = useBarGroupedAccessors(gL);
    const dims = useInnerDims(width, height, margin);
    const { x0Scale, x1Scale, yScale } = useBarGroupedScales(data, keys, dims.innerWidth, dims.innerHeight, getLabel, padding, yDomain);
    const colorMap = useBarGroupedColors(keys, colorScheme);
    const { hovered, handleEnter, handleLeave, handleClick } = useBarGroupedInteraction(onHover, onSelect);
    const classes = useMemo(() => buildBarGroupedClasses(className, unstyled), [className, unstyled]);
    const yTickFormat = formatY ?? formatTick;

    const legendItems = useMemo(
        () => keys.map((k) => ({ id: k, label: k, color: colorMap[k] })),
        [keys, colorMap],
    );

    if (data.length === 0) {
        return (
            <div className={classes}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Empty grouped bar chart'} />
            </div>
        );
    }

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            {showLegend && <ChartLegend items={legendItems} />}
            <div className={BASE_CHART_CLASSES.container} style={{ position: 'relative' }}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Grouped bar chart'}>
                    {description && <desc>{description}</desc>}
                    <Group top={dims.margin.top} left={dims.margin.left}>
                        {showGrid && <ChartGrid yScale={yScale} width={dims.innerWidth} height={dims.innerHeight} axis="rows" />}

                        {data.map((d, gi) => {
                            const label = String(getLabel(d));
                            const groupX = x0Scale(label) ?? 0;
                            return (
                                <Group key={label} left={groupX}>
                                    {keys.map((key, ki) => {
                                        const value = Number(d[key]) || 0;
                                        const barX = x1Scale(key) ?? 0;
                                        const barY = yScale(value) ?? 0;
                                        const barH = dims.innerHeight - barY;
                                        const isHovered = hovered?.groupIdx === gi && hovered?.keyIdx === ki;
                                        const isHighlightedGroup = highlightIndex === gi;
                                        const isHighlightedBar = isHighlightedGroup && (highlightKey == null || highlightKey === key);
                                        const isDimmed = highlightIndex != null
                                            ? !isHighlightedBar
                                            : hovered != null && !isHovered;
                                        return (
                                            <VisxBar
                                                key={key}
                                                x={barX}
                                                y={barY}
                                                width={x1Scale.bandwidth()}
                                                height={Math.max(barH, 0)}
                                                fill={colorMap[key]}
                                                opacity={isDimmed ? 0.3 : 1}
                                                stroke={isHighlightedBar ? '#fff' : undefined}
                                                strokeWidth={isHighlightedBar ? 2 : undefined}
                                                rx={barRadius}
                                                onMouseEnter={() => handleEnter(d, gi, ki)}
                                                onMouseLeave={handleLeave}
                                                onClick={onSelect ? () => handleClick(d, gi) : undefined}
                                                style={{ cursor: onSelect ? 'pointer' : undefined, transition: 'opacity 120ms ease-out' }}
                                            />
                                        );
                                    })}
                                </Group>
                            );
                        })}

                        {showXAxis && <ChartAxis scale={x0Scale} orientation="bottom" top={dims.innerHeight} />}
                        {showYAxis && <ChartAxis scale={yScale} orientation="left" tickFormat={yTickFormat} />}
                    </Group>
                </svg>

                {showTooltip && hovered != null && (() => {
                    const d = data[hovered.groupIdx];
                    const key = keys[hovered.keyIdx];
                    const label = String(getLabel(d));
                    const value = Number(d[key]) || 0;
                    const groupX = x0Scale(label) ?? 0;
                    const barX = x1Scale(key) ?? 0;
                    return (
                        <ChartTooltip
                            left={groupX + barX + x1Scale.bandwidth() / 2 + dims.margin.left}
                            top={(yScale(value) ?? 0) + dims.margin.top}
                            visible
                            offsetY={-8}
                        >
                            {`${key}: ${value.toLocaleString()}`}
                        </ChartTooltip>
                    );
                })()}
            </div>
        </div>
    );
};

BarGroupedInner.displayName = 'BarGroupedInner';
export default BarGroupedInner;
