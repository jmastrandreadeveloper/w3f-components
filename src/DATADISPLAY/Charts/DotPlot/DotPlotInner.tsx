import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { Circle } from '@visx/shape';
import type { DotPlotInnerProps } from './DotPlot.types';
import { DOTPLOT_DEFAULTS } from './DotPlot.constants';
import { buildDotPlotClasses, buildTooltipContent, formatTick } from './DotPlot.utils';
import { useDotPlotAccessors, useDotPlotScales, useDotPlotColors, useDotPlotInteraction, useInnerDims } from './DotPlot.hooks';
import { ChartAxis } from '../primitives/ChartAxis';
import { ChartGrid } from '../primitives/ChartGrid';
import { ChartTooltip } from '../primitives/ChartTooltip';
import { BASE_CHART_CLASSES } from '../_base/constants';
import { ChartHeader } from '../_base/ChartHeader';

export const DotPlotInner: React.FC<DotPlotInnerProps> = (props) => {
    const {
        data, width, height, margin, className, categories,
        unstyled = DOTPLOT_DEFAULTS.unstyled, bindId, ariaLabel, description, colorScheme, title, subtitle,
        getX: gxp, getCategory: gcp,
        showXAxis = DOTPLOT_DEFAULTS.showXAxis, showCategoryLabels = DOTPLOT_DEFAULTS.showCategoryLabels,
        showGrid = DOTPLOT_DEFAULTS.showGrid, showTooltip = DOTPLOT_DEFAULTS.showTooltip,
        pointRadius = DOTPLOT_DEFAULTS.pointRadius,
        xDomain, formatX, onHover, onSelect,
    } = props;

    const { getX, getCategory } = useDotPlotAccessors(gxp, gcp);
    const dims = useInnerDims(width, height, margin ?? { top: 20, right: 20, bottom: 40, left: 80 });
    const { xScale, yScale } = useDotPlotScales(data, categories, dims.innerWidth, dims.innerHeight, getX, xDomain);
    const categoryColors = useDotPlotColors(categories, colorScheme);
    const { hoveredIndex, handleEnter, handleLeave, handleClick } = useDotPlotInteraction(onHover, onSelect);

    const classes = useMemo(() => buildDotPlotClasses(className, unstyled), [className, unstyled]);
    const xf = formatX ?? formatTick;

    if (data.length === 0) {
        return <div className={classes}><svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Empty dot plot'} /></div>;
    }

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            <div className={BASE_CHART_CLASSES.container} style={{ position: 'relative' }}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Dot plot'}>
                    {description && <desc>{description}</desc>}
                    <Group top={dims.margin.top} left={dims.margin.left}>
                        {showGrid && <ChartGrid xScale={xScale} width={dims.innerWidth} height={dims.innerHeight} axis="columns" />}

                        {data.map((d, i) => {
                            const catIdx = getCategory(d);
                            const catName = categories[catIdx] ?? '';
                            const cx = xScale(getX(d)) ?? 0;
                            const cy = (yScale(catName) ?? 0) + yScale.bandwidth() / 2;

                            return (
                                <Circle
                                    key={i}
                                    cx={cx}
                                    cy={cy}
                                    r={pointRadius}
                                    fill={categoryColors[catIdx % categoryColors.length]}
                                    opacity={hoveredIndex != null && hoveredIndex !== i ? 0.4 : 0.8}
                                    onMouseEnter={() => handleEnter(d, i)}
                                    onMouseLeave={handleLeave}
                                    onClick={onSelect ? () => handleClick(d, i) : undefined}
                                    style={{ cursor: onSelect ? 'pointer' : undefined, transition: 'opacity 120ms ease-out' }}
                                />
                            );
                        })}

                        {showXAxis && <ChartAxis scale={xScale} orientation="bottom" top={dims.innerHeight} tickFormat={xf} />}
                        {showCategoryLabels && categories.map((cat) => (
                            <text
                                key={cat}
                                x={-8}
                                y={(yScale(cat) ?? 0) + yScale.bandwidth() / 2}
                                textAnchor="end"
                                dominantBaseline="central"
                                fontSize={11}
                                fill="var(--w3f-chart-axis-tick-label-color, #64748b)"
                            >
                                {cat}
                            </text>
                        ))}
                    </Group>
                </svg>

                {showTooltip && hoveredIndex != null && (() => {
                    const d = data[hoveredIndex];
                    const catIdx = getCategory(d);
                    const catName = categories[catIdx] ?? '';
                    return (
                        <ChartTooltip
                            left={(xScale(getX(d)) ?? 0) + dims.margin.left}
                            top={(yScale(catName) ?? 0) + yScale.bandwidth() / 2 + dims.margin.top}
                            visible offsetY={-12}
                        >
                            {buildTooltipContent(d, getX, catName)}
                        </ChartTooltip>
                    );
                })()}
            </div>
        </div>
    );
};
DotPlotInner.displayName = 'DotPlotInner';
export default DotPlotInner;
