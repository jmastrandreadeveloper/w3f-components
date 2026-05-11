import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import type { HeatmapDatum, HeatmapInnerProps } from './Heatmap.types';
import { HEATMAP_DEFAULTS } from './Heatmap.constants';
import { buildHeatmapClasses, buildTooltipContent, lookupValue } from './Heatmap.utils';
import {
    useHeatmapAccessors,
    useHeatmapAxes,
    useHeatmapScales,
    useHeatmapInteraction,
    useInnerDims,
} from './Heatmap.hooks';
import { ChartTooltip } from '../primitives/ChartTooltip';
import { BASE_CHART_CLASSES } from '../_base/constants';
import { ChartHeader } from '../_base/ChartHeader';

export const HeatmapInner: React.FC<HeatmapInnerProps> = (props) => {
    const {
        data,
        width,
        height,
        margin,
        className,
        unstyled = HEATMAP_DEFAULTS.unstyled,
        bindId,
        ariaLabel,
        description, title, subtitle,
        getRow: getRowProp,
        getCol: getColProp,
        getValue: getValueProp,
        showRowLabels = HEATMAP_DEFAULTS.showRowLabels,
        showColLabels = HEATMAP_DEFAULTS.showColLabels,
        cellRadius = HEATMAP_DEFAULTS.cellRadius,
        colors = HEATMAP_DEFAULTS.colors,
        onHover,
        onSelect,
    } = props;

    const { getRow, getCol, getValue } = useHeatmapAccessors(getRowProp, getColProp, getValueProp);
    const dims = useInnerDims(width, height, margin ?? { top: 10, right: 10, bottom: 40, left: 60 });
    const { rows, cols } = useHeatmapAxes(data, getRow, getCol);
    const { xScale, yScale, colorScale } = useHeatmapScales(rows, cols, data, getValue, dims.innerWidth, dims.innerHeight, colors);
    const { hoveredIndex, handleEnter, handleLeave, handleClick } = useHeatmapInteraction(onHover, onSelect);

    const classes = useMemo(() => buildHeatmapClasses(className, unstyled), [className, unstyled]);

    if (data.length === 0) {
        return (
            <div className={classes}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Empty heatmap'} />
            </div>
        );
    }

    const cellWidth = xScale.bandwidth();
    const cellHeight = yScale.bandwidth();

    // Build cell list for indexed hover
    const cells = useMemo(() => {
        const result: { row: string; col: string; datum: HeatmapDatum; value: number }[] = [];
        for (const row of rows) {
            for (const col of cols) {
                const val = lookupValue(data, row, col, getRow, getCol, getValue);
                if (val != null) {
                    const datum = data.find((d) => String(getRow(d)) === row && String(getCol(d)) === col)!;
                    result.push({ row, col, datum, value: val });
                }
            }
        }
        return result;
    }, [data, rows, cols, getRow, getCol, getValue]);

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            <div className={BASE_CHART_CLASSES.container} style={{ position: 'relative' }}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Heatmap'}>
                    {description && <desc>{description}</desc>}
                    <Group top={dims.margin.top} left={dims.margin.left}>
                        {/* Cells */}
                        {cells.map((cell, i) => (
                            <rect
                                key={`${cell.row}-${cell.col}`}
                                x={xScale(cell.col) ?? 0}
                                y={yScale(cell.row) ?? 0}
                                width={cellWidth}
                                height={cellHeight}
                                rx={cellRadius}
                                fill={String(colorScale(cell.value))}
                                opacity={hoveredIndex != null && hoveredIndex !== i ? 0.6 : 1}
                                onMouseEnter={() => handleEnter(cell.datum, i)}
                                onMouseLeave={handleLeave}
                                onClick={onSelect ? () => handleClick(cell.datum, i) : undefined}
                                style={{ cursor: onSelect ? 'pointer' : undefined, transition: 'opacity 120ms ease-out' }}
                            />
                        ))}

                        {/* Row labels (left) */}
                        {showRowLabels && rows.map((row) => (
                            <text
                                key={`row-${row}`}
                                x={-6}
                                y={(yScale(row) ?? 0) + cellHeight / 2}
                                textAnchor="end"
                                dominantBaseline="central"
                                fontSize={11}
                                fill="var(--w3f-chart-axis-tick-label-color, #64748b)"
                            >
                                {row}
                            </text>
                        ))}

                        {/* Col labels (bottom) */}
                        {showColLabels && cols.map((col) => (
                            <text
                                key={`col-${col}`}
                                x={(xScale(col) ?? 0) + cellWidth / 2}
                                y={dims.innerHeight + 16}
                                textAnchor="middle"
                                fontSize={11}
                                fill="var(--w3f-chart-axis-tick-label-color, #64748b)"
                            >
                                {col}
                            </text>
                        ))}
                    </Group>
                </svg>

                {showColLabels && hoveredIndex != null && (
                    <ChartTooltip
                        left={(xScale(cells[hoveredIndex].col) ?? 0) + cellWidth / 2 + dims.margin.left}
                        top={(yScale(cells[hoveredIndex].row) ?? 0) + dims.margin.top}
                        visible
                        offsetY={-8}
                    >
                        {buildTooltipContent(cells[hoveredIndex].row, cells[hoveredIndex].col, cells[hoveredIndex].value)}
                    </ChartTooltip>
                )}
            </div>
        </div>
    );
};

HeatmapInner.displayName = 'HeatmapInner';
export default HeatmapInner;
