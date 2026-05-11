import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { scaleTime, scaleBand } from '@visx/scale';
import type { GanttInnerProps } from './Gantt.types';
import { GANTT_DEFAULTS } from './Gantt.constants';
import { buildGanttClasses, buildTooltipContent, toDate } from './Gantt.utils';
import { useGanttColors, useGanttInteraction, useInnerDims } from './Gantt.hooks';
import { ChartAxis } from '../primitives/ChartAxis';
import { ChartGrid } from '../primitives/ChartGrid';
import { ChartTooltip } from '../primitives/ChartTooltip';
import { BASE_CHART_CLASSES } from '../_base/constants';
import { ChartHeader } from '../_base/ChartHeader';

const DEFAULT_MARGIN = { top: 20, right: 20, bottom: 40, left: 120 };

export const GanttInner: React.FC<GanttInnerProps> = (props) => {
    const {
        data, width, height, margin = DEFAULT_MARGIN, className,
        unstyled = GANTT_DEFAULTS.unstyled,
        bindId, ariaLabel, description, colorScheme, title, subtitle,
        showLabels = GANTT_DEFAULTS.showLabels,
        showTooltip = GANTT_DEFAULTS.showTooltip,
        showXAxis = GANTT_DEFAULTS.showXAxis,
        showGrid = GANTT_DEFAULTS.showGrid,
        barHeight = GANTT_DEFAULTS.barHeight,
        barGap = GANTT_DEFAULTS.barGap,
        barRadius = GANTT_DEFAULTS.barRadius,
        onHover, onSelect,
    } = props;

    const dims = useInnerDims(width, height, margin);

    // Extract unique groups for coloring
    const groups = useMemo(() => {
        const seen = new Set<string>();
        data.forEach((t) => {
            const g = t.group ?? t.id;
            seen.add(g);
        });
        return Array.from(seen);
    }, [data]);

    const colorMap = useGanttColors(groups, colorScheme);
    const { hoveredIndex, handleEnter, handleLeave, handleClick } = useGanttInteraction(onHover, onSelect);
    const classes = useMemo(() => buildGanttClasses(className, unstyled), [className, unstyled]);

    // Compute time domain
    const { xScale, yScale } = useMemo(() => {
        if (data.length === 0) {
            const now = new Date();
            const later = new Date(now.getTime() + 86400000);
            return {
                xScale: scaleTime<number>({ domain: [now, later], range: [0, dims.innerWidth] }),
                yScale: scaleBand<string>({ domain: [], range: [0, dims.innerHeight], padding: 0.2 }),
            };
        }

        const dates = data.flatMap((t) => [toDate(t.start).getTime(), toDate(t.end).getTime()]);
        const minDate = new Date(Math.min(...dates));
        const maxDate = new Date(Math.max(...dates));

        // Add a small padding to domain
        const span = maxDate.getTime() - minDate.getTime();
        const padded = span * 0.02;

        const xs = scaleTime<number>({
            domain: [new Date(minDate.getTime() - padded), new Date(maxDate.getTime() + padded)],
            range: [0, dims.innerWidth],
        });

        const labels = data.map((t) => t.label);
        const ys = scaleBand<string>({
            domain: [...labels],
            range: [0, dims.innerHeight],
            padding: 0.2,
        });

        return { xScale: xs, yScale: ys };
    }, [data, dims.innerWidth, dims.innerHeight]);

    if (data.length === 0) {
        return (
            <div className={classes}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Empty Gantt chart'} />
            </div>
        );
    }

    const bandwidth = yScale.bandwidth();
    const taskBarHeight = Math.min(barHeight, bandwidth);
    const barY = (bandwidth - taskBarHeight) / 2;

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            <div className={BASE_CHART_CLASSES.container} style={{ position: 'relative' }}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Gantt chart'}>
                    {description && <desc>{description}</desc>}
                    <Group top={dims.margin.top} left={dims.margin.left}>
                        {showGrid && (
                            <ChartGrid xScale={xScale} yScale={yScale} width={dims.innerWidth} height={dims.innerHeight} axis="x" />
                        )}

                        {data.map((task, i) => {
                            const startX = xScale(toDate(task.start)) ?? 0;
                            const endX = xScale(toDate(task.end)) ?? 0;
                            const taskWidth = Math.max(endX - startX, 2);
                            const y = (yScale(task.label) ?? 0) + barY;
                            const color = colorMap[task.group ?? task.id] ?? colorMap[groups[i % groups.length]];

                            return (
                                <g key={task.id}
                                    opacity={hoveredIndex != null && hoveredIndex !== i ? 0.4 : 1}
                                    style={{ transition: 'opacity 120ms ease-out' }}
                                    onMouseEnter={() => handleEnter(task, i)}
                                    onMouseLeave={handleLeave}
                                    onClick={onSelect ? () => handleClick(task, i) : undefined}
                                    cursor={onSelect ? 'pointer' : 'default'}
                                >
                                    {/* Task bar background */}
                                    <rect
                                        x={startX}
                                        y={y}
                                        width={taskWidth}
                                        height={taskBarHeight}
                                        fill={color}
                                        fillOpacity={0.3}
                                        rx={barRadius}
                                        ry={barRadius}
                                    />
                                    {/* Progress overlay */}
                                    {task.progress != null && task.progress > 0 && (
                                        <rect
                                            x={startX}
                                            y={y}
                                            width={taskWidth * Math.min(task.progress, 1)}
                                            height={taskBarHeight}
                                            fill={color}
                                            fillOpacity={0.85}
                                            rx={barRadius}
                                            ry={barRadius}
                                        />
                                    )}
                                    {/* Full bar outline when no progress */}
                                    {task.progress == null && (
                                        <rect
                                            x={startX}
                                            y={y}
                                            width={taskWidth}
                                            height={taskBarHeight}
                                            fill={color}
                                            fillOpacity={0.75}
                                            rx={barRadius}
                                            ry={barRadius}
                                        />
                                    )}
                                </g>
                            );
                        })}

                        {/* Task labels on the left */}
                        {showLabels && data.map((task, i) => {
                            const y = (yScale(task.label) ?? 0) + barY + taskBarHeight / 2;
                            return (
                                <text
                                    key={`label-${task.id}`}
                                    x={-8}
                                    y={y}
                                    textAnchor="end"
                                    dominantBaseline="central"
                                    fontSize={12}
                                    fill="var(--w3f-text-primary, #333)"
                                    opacity={hoveredIndex != null && hoveredIndex !== i ? 0.4 : 1}
                                    style={{ transition: 'opacity 120ms ease-out' }}
                                >
                                    {task.label}
                                </text>
                            );
                        })}

                        {showXAxis && (
                            <ChartAxis scale={xScale} orientation="bottom" top={dims.innerHeight} />
                        )}
                    </Group>
                </svg>
                {showTooltip && hoveredIndex != null && data[hoveredIndex] && (
                    <ChartTooltip
                        left={(xScale(toDate(data[hoveredIndex].start)) ?? 0) + dims.margin.left}
                        top={(yScale(data[hoveredIndex].label) ?? 0) + dims.margin.top}
                        visible offsetY={-16}
                    >
                        {buildTooltipContent(data[hoveredIndex])}
                    </ChartTooltip>
                )}
            </div>
        </div>
    );
};

GanttInner.displayName = 'GanttInner';
export default GanttInner;
