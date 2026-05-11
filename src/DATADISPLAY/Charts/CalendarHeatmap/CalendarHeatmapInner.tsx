import React, { useMemo } from 'react';
import type { CalendarHeatmapInnerProps } from './CalendarHeatmap.types';
import { CALENDAR_DEFAULTS } from './CalendarHeatmap.constants';
import { buildCalendarClasses, valueToColor, buildTooltipContent, getMonthBoundaries } from './CalendarHeatmap.utils';
import { useCalendarCells, useCalendarInteraction } from './CalendarHeatmap.hooks';
import { ChartTooltip } from '../primitives/ChartTooltip';
import { BASE_CHART_CLASSES } from '../_base/constants';
import { ChartHeader } from '../_base/ChartHeader';

const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

export const CalendarHeatmapInner: React.FC<CalendarHeatmapInnerProps> = (props) => {
    const {
        data, width, height, className,
        unstyled = CALENDAR_DEFAULTS.unstyled,
        bindId, ariaLabel, description, title, subtitle,
        showMonthLabels = CALENDAR_DEFAULTS.showMonthLabels,
        showDayLabels = CALENDAR_DEFAULTS.showDayLabels,
        showTooltip = CALENDAR_DEFAULTS.showTooltip,
        emptyColor = CALENDAR_DEFAULTS.emptyColor,
        colorRamp = CALENDAR_DEFAULTS.colorRamp,
        cellGap = CALENDAR_DEFAULTS.cellGap,
        cellRadius = CALENDAR_DEFAULTS.cellRadius,
        formatValue, onHover, onSelect,
    } = props;

    const { cells, weeksCount } = useCalendarCells(data);
    const { hoveredIndex, handleEnter, handleLeave, handleClick } = useCalendarInteraction(onHover, onSelect);
    const classes = useMemo(() => buildCalendarClasses(className, unstyled), [className, unstyled]);

    const maxValue = useMemo(() => {
        if (data.length === 0) return 1;
        return Math.max(...data.map((d) => d.value), 1);
    }, [data]);

    if (data.length === 0) {
        return (
            <div className={classes}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Empty calendar heatmap'} />
            </div>
        );
    }

    const leftPad = showDayLabels ? 30 : 0;
    const topPad = showMonthLabels ? 18 : 0;
    const availWidth = width - leftPad - 8;
    const cellSize = Math.max(Math.floor((availWidth - weeksCount * cellGap) / weeksCount), 6);
    const svgWidth = leftPad + weeksCount * (cellSize + cellGap) + 8;
    const svgHeight = topPad + 7 * (cellSize + cellGap) + 8;
    const monthBoundaries = useMemo(() => getMonthBoundaries(cells), [cells]);

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            <div className={BASE_CHART_CLASSES.container} style={{ position: 'relative', overflowX: 'auto' }}>
                <svg width={svgWidth} height={svgHeight} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Calendar heatmap'}>
                    {description && <desc>{description}</desc>}
                    {showMonthLabels && monthBoundaries.map((mb, i) => (
                        <text key={i} x={leftPad + mb.weekIndex * (cellSize + cellGap)} y={12}
                            fontSize={10} fill="currentColor" opacity={0.7}
                        >
                            {mb.month}
                        </text>
                    ))}
                    {showDayLabels && DAY_LABELS.map((label, i) => (
                        label ? (
                            <text key={i} x={leftPad - 6}
                                y={topPad + i * (cellSize + cellGap) + cellSize / 2}
                                textAnchor="end" dominantBaseline="central"
                                fontSize={9} fill="currentColor" opacity={0.6}
                            >
                                {label}
                            </text>
                        ) : null
                    ))}
                    {cells.map((cell, i) => {
                        const x = leftPad + cell.weekIndex * (cellSize + cellGap);
                        const y = topPad + cell.dayOfWeek * (cellSize + cellGap);
                        const fill = valueToColor(cell.value, maxValue, emptyColor, colorRamp);
                        return (
                            <rect key={i} x={x} y={y} width={cellSize} height={cellSize}
                                fill={fill} rx={cellRadius}
                                opacity={hoveredIndex != null && hoveredIndex !== i ? 0.6 : 1}
                                style={{ transition: 'opacity 80ms ease-out', cursor: onSelect ? 'pointer' : 'default' }}
                                onMouseEnter={() => { if (cell.datum) handleEnter(cell.datum, i); }}
                                onMouseLeave={handleLeave}
                                onClick={() => { if (cell.datum && onSelect) handleClick(cell.datum, i); }}
                            />
                        );
                    })}
                </svg>
                {showTooltip && hoveredIndex != null && cells[hoveredIndex] && (
                    <ChartTooltip
                        left={leftPad + cells[hoveredIndex].weekIndex * (cellSize + cellGap) + cellSize / 2}
                        top={topPad + cells[hoveredIndex].dayOfWeek * (cellSize + cellGap)}
                        visible offsetY={-12}
                    >
                        {buildTooltipContent(cells[hoveredIndex], formatValue)}
                    </ChartTooltip>
                )}
            </div>
        </div>
    );
};

CalendarHeatmapInner.displayName = 'CalendarHeatmapInner';
export default CalendarHeatmapInner;
