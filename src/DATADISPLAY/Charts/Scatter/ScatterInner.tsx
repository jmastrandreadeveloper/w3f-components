import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { Circle } from '@visx/shape';
import type { ScatterDatum, ScatterInnerProps } from './Scatter.types';
import { SCATTER_DEFAULTS } from './Scatter.constants';
import { buildScatterClasses, buildTooltipContent, formatTick } from './Scatter.utils';
import {
    useScatterAccessors,
    useScatterScales,
    useScatterColors,
    useScatterInteraction,
    useInnerDims,
} from './Scatter.hooks';
import { ChartAxis } from '../primitives/ChartAxis';
import { ChartGrid } from '../primitives/ChartGrid';
import { ChartTooltip } from '../primitives/ChartTooltip';
import { BASE_CHART_CLASSES } from '../_base/constants';
import { ChartHeader } from '../_base/ChartHeader';

export const ScatterInner: React.FC<ScatterInnerProps> = (props) => {
    const {
        data,
        width,
        height,
        margin,
        className,
        unstyled = SCATTER_DEFAULTS.unstyled,
        bindId,
        ariaLabel,
        description,
        colorScheme, title, subtitle,
        getX: getXProp,
        getY: getYProp,
        getR: getRProp,
        getLabel: getLabelProp,
        showXAxis = SCATTER_DEFAULTS.showXAxis,
        showYAxis = SCATTER_DEFAULTS.showYAxis,
        showGrid = SCATTER_DEFAULTS.showGrid,
        showTooltip = SCATTER_DEFAULTS.showTooltip,
        pointRadius = SCATTER_DEFAULTS.pointRadius,
        xDomain,
        yDomain,
        formatX,
        formatY,
        onHover,
        onSelect,
        highlightIndex = null,
    } = props;

    const { getX, getY, getR, getLabel } = useScatterAccessors(getXProp, getYProp, getRProp, getLabelProp);
    const dims = useInnerDims(width, height, margin);
    const { xScale, yScale } = useScatterScales(data, dims.innerWidth, dims.innerHeight, getX, getY, xDomain, yDomain);
    const colors = useScatterColors(data, colorScheme);
    const { hoveredIndex, handleEnter, handleLeave, handleClick } = useScatterInteraction(onHover, onSelect);

    const classes = useMemo(() => buildScatterClasses(className, unstyled), [className, unstyled]);
    const xTickFormat = formatX ?? formatTick;
    const yTickFormat = formatY ?? formatTick;

    if (data.length === 0) {
        return (
            <div className={classes}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Empty scatter chart'} />
            </div>
        );
    }

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            <div className={BASE_CHART_CLASSES.container} style={{ position: 'relative' }}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Scatter chart'}>
                    {description && <desc>{description}</desc>}
                    <Group top={dims.margin.top} left={dims.margin.left}>
                        {showGrid && (
                            <ChartGrid
                                xScale={xScale}
                                yScale={yScale}
                                width={dims.innerWidth}
                                height={dims.innerHeight}
                                axis="both"
                            />
                        )}

                        {data.map((d, i) => {
                            const cx = xScale(getX(d)) ?? 0;
                            const cy = yScale(getY(d)) ?? 0;
                            const r = getR(d) ?? pointRadius;

                            return (
                                <Circle
                                    key={i}
                                    cx={cx}
                                    cy={cy}
                                    r={r}
                                    fill={colors[i]}
                                    opacity={
                                        highlightIndex != null
                                            ? (highlightIndex === i ? 1 : 0.3)
                                            : hoveredIndex != null && hoveredIndex !== i ? 0.4 : 0.8
                                    }
                                    stroke={highlightIndex === i ? '#fff' : undefined}
                                    strokeWidth={highlightIndex === i ? 2 : undefined}
                                    onMouseEnter={() => handleEnter(d, i)}
                                    onMouseLeave={handleLeave}
                                    onClick={onSelect ? () => handleClick(d, i) : undefined}
                                    style={{ cursor: highlightIndex === i ? 'pointer' : onSelect ? 'pointer' : undefined, transition: 'opacity 120ms ease-out' }}
                                />
                            );
                        })}

                        {showXAxis && (
                            <ChartAxis scale={xScale} orientation="bottom" top={dims.innerHeight} tickFormat={xTickFormat} />
                        )}
                        {showYAxis && (
                            <ChartAxis scale={yScale} orientation="left" tickFormat={yTickFormat} />
                        )}
                    </Group>
                </svg>

                {showTooltip && hoveredIndex != null && (
                    <ChartTooltip
                        left={(xScale(getX(data[hoveredIndex])) ?? 0) + dims.margin.left}
                        top={(yScale(getY(data[hoveredIndex])) ?? 0) + dims.margin.top}
                        visible
                        offsetY={-12}
                    >
                        {buildTooltipContent(data[hoveredIndex], getX, getY)}
                    </ChartTooltip>
                )}
            </div>
        </div>
    );
};

ScatterInner.displayName = 'ScatterInner';
export default ScatterInner;
