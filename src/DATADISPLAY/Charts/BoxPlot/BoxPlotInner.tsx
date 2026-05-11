import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import type { BoxPlotInnerProps } from './BoxPlot.types';
import { BOXPLOT_DEFAULTS } from './BoxPlot.constants';
import { buildBoxPlotClasses, buildTooltipContent, formatTick } from './BoxPlot.utils';
import {
    useBoxPlotStats,
    useBoxPlotScales,
    useBoxPlotColors,
    useBoxPlotInteraction,
    useInnerDims,
} from './BoxPlot.hooks';
import { ChartAxis } from '../primitives/ChartAxis';
import { ChartGrid } from '../primitives/ChartGrid';
import { ChartTooltip } from '../primitives/ChartTooltip';
import { BASE_CHART_CLASSES } from '../_base/constants';
import { ChartHeader } from '../_base/ChartHeader';

export const BoxPlotInner: React.FC<BoxPlotInnerProps> = (props) => {
    const {
        data, width, height, margin, className,
        unstyled = BOXPLOT_DEFAULTS.unstyled, bindId, ariaLabel, description, colorScheme, title, subtitle,
        showXAxis = BOXPLOT_DEFAULTS.showXAxis, showYAxis = BOXPLOT_DEFAULTS.showYAxis,
        showGrid = BOXPLOT_DEFAULTS.showGrid, showTooltip = BOXPLOT_DEFAULTS.showTooltip,
        showOutliers = BOXPLOT_DEFAULTS.showOutliers, boxWidth = BOXPLOT_DEFAULTS.boxWidth,
        yDomain, formatY, onHover, onSelect,
    } = props;

    const stats = useBoxPlotStats(data);
    const dims = useInnerDims(width, height, margin);
    const { xScale, yScale } = useBoxPlotScales(stats, dims.innerWidth, dims.innerHeight, yDomain);
    const colors = useBoxPlotColors(stats, colorScheme);
    const { hoveredIndex, handleEnter, handleLeave, handleClick } = useBoxPlotInteraction(onHover, onSelect);

    const classes = useMemo(() => buildBoxPlotClasses(className, unstyled), [className, unstyled]);
    const yf = formatY ?? formatTick;

    if (data.length === 0) {
        return (
            <div className={classes}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Empty box plot'} />
            </div>
        );
    }

    const halfBox = Math.min(boxWidth, xScale.bandwidth()) / 2;

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            <div className={BASE_CHART_CLASSES.container} style={{ position: 'relative' }}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Box plot'}>
                    {description && <desc>{description}</desc>}
                    <Group top={dims.margin.top} left={dims.margin.left}>
                        {showGrid && <ChartGrid yScale={yScale} width={dims.innerWidth} height={dims.innerHeight} axis="rows" />}

                        {stats.map((s, i) => {
                            const cx = (xScale(s.group) ?? 0) + xScale.bandwidth() / 2;
                            const isHovered = hoveredIndex === i;
                            const opacity = hoveredIndex != null && !isHovered ? 0.4 : 1;
                            const fill = colors[i];

                            return (
                                <g
                                    key={s.group}
                                    opacity={opacity}
                                    style={{ transition: 'opacity 120ms ease-out', cursor: onSelect ? 'pointer' : undefined }}
                                    onMouseEnter={() => handleEnter(s, i)}
                                    onMouseLeave={handleLeave}
                                    onClick={onSelect ? () => handleClick(s, i) : undefined}
                                >
                                    {/* Whisker line (min → max) */}
                                    <line
                                        x1={cx} x2={cx}
                                        y1={yScale(s.max)} y2={yScale(s.min)}
                                        stroke={fill} strokeWidth={1.5}
                                    />
                                    {/* Whisker caps */}
                                    <line x1={cx - halfBox * 0.5} x2={cx + halfBox * 0.5} y1={yScale(s.max)} y2={yScale(s.max)} stroke={fill} strokeWidth={1.5} />
                                    <line x1={cx - halfBox * 0.5} x2={cx + halfBox * 0.5} y1={yScale(s.min)} y2={yScale(s.min)} stroke={fill} strokeWidth={1.5} />

                                    {/* IQR Box (Q1 → Q3) */}
                                    <rect
                                        x={cx - halfBox}
                                        y={yScale(s.thirdQuartile)}
                                        width={halfBox * 2}
                                        height={yScale(s.firstQuartile) - yScale(s.thirdQuartile)}
                                        fill={fill}
                                        fillOpacity={0.3}
                                        stroke={fill}
                                        strokeWidth={1.5}
                                        rx={2}
                                    />

                                    {/* Median line */}
                                    <line
                                        x1={cx - halfBox} x2={cx + halfBox}
                                        y1={yScale(s.median)} y2={yScale(s.median)}
                                        stroke={fill} strokeWidth={2.5}
                                    />

                                    {/* Outliers */}
                                    {showOutliers && s.outliers.map((v, oi) => (
                                        <circle
                                            key={oi}
                                            cx={cx}
                                            cy={yScale(v)}
                                            r={3}
                                            fill="none"
                                            stroke={fill}
                                            strokeWidth={1.5}
                                        />
                                    ))}
                                </g>
                            );
                        })}

                        {showXAxis && <ChartAxis scale={xScale} orientation="bottom" top={dims.innerHeight} />}
                        {showYAxis && <ChartAxis scale={yScale} orientation="left" tickFormat={yf} />}
                    </Group>
                </svg>

                {showTooltip && hoveredIndex != null && (() => {
                    const s = stats[hoveredIndex];
                    const cx = (xScale(s.group) ?? 0) + xScale.bandwidth() / 2 + dims.margin.left;
                    const cy = yScale(s.median) + dims.margin.top;
                    return (
                        <ChartTooltip left={cx} top={cy} visible offsetY={-12}>
                            {buildTooltipContent(s)}
                        </ChartTooltip>
                    );
                })()}
            </div>
        </div>
    );
};

BoxPlotInner.displayName = 'BoxPlotInner';
export default BoxPlotInner;
