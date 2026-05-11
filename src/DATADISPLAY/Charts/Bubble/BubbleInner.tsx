import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { Circle } from '@visx/shape';
import type { BubbleInnerProps } from './Bubble.types';
import { BUBBLE_DEFAULTS } from './Bubble.constants';
import { buildBubbleClasses, buildTooltipContent, formatTick } from './Bubble.utils';
import { useBubbleAccessors, useBubbleScales, useBubbleColors, useBubbleInteraction, useInnerDims } from './Bubble.hooks';
import { ChartAxis } from '../primitives/ChartAxis';
import { ChartGrid } from '../primitives/ChartGrid';
import { ChartTooltip } from '../primitives/ChartTooltip';
import { BASE_CHART_CLASSES } from '../_base/constants';
import { ChartHeader } from '../_base/ChartHeader';

export const BubbleInner: React.FC<BubbleInnerProps> = (props) => {
    const {
        data, width, height, margin, className,
        unstyled = BUBBLE_DEFAULTS.unstyled, bindId, ariaLabel, description, colorScheme, title, subtitle,
        getX: gxp, getY: gyp, getR: grp, getLabel: glp,
        showXAxis = BUBBLE_DEFAULTS.showXAxis, showYAxis = BUBBLE_DEFAULTS.showYAxis,
        showGrid = BUBBLE_DEFAULTS.showGrid, showTooltip = BUBBLE_DEFAULTS.showTooltip,
        minRadius = BUBBLE_DEFAULTS.minRadius, maxRadius = BUBBLE_DEFAULTS.maxRadius,
        xDomain, yDomain, formatX, formatY, onHover, onSelect,
        highlightIndex = null,
    } = props;

    const { getX, getY, getR, getLabel } = useBubbleAccessors(gxp, gyp, grp, glp);
    const dims = useInnerDims(width, height, margin);
    const { xScale, yScale, rScale } = useBubbleScales(data, dims.innerWidth, dims.innerHeight, getX, getY, getR, minRadius, maxRadius, xDomain, yDomain);
    const colors = useBubbleColors(data, colorScheme);
    const { hoveredIndex, handleEnter, handleLeave, handleClick } = useBubbleInteraction(onHover, onSelect);

    const classes = useMemo(() => buildBubbleClasses(className, unstyled), [className, unstyled]);
    const xf = formatX ?? formatTick;
    const yf = formatY ?? formatTick;

    if (data.length === 0) {
        return <div className={classes}><svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Empty bubble chart'} /></div>;
    }

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            <div className={BASE_CHART_CLASSES.container} style={{ position: 'relative' }}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Bubble chart'}>
                    {description && <desc>{description}</desc>}
                    <Group top={dims.margin.top} left={dims.margin.left}>
                        {showGrid && <ChartGrid xScale={xScale} yScale={yScale} width={dims.innerWidth} height={dims.innerHeight} axis="both" />}
                        {data.map((d, i) => (
                            <Circle
                                key={i}
                                cx={xScale(getX(d)) ?? 0}
                                cy={yScale(getY(d)) ?? 0}
                                r={rScale(getR(d))}
                                fill={colors[i]}
                                fillOpacity={
                                    highlightIndex != null
                                        ? (highlightIndex === i ? 1 : 0.3)
                                        : hoveredIndex != null && hoveredIndex !== i ? 0.3 : 0.6
                                }
                                stroke={highlightIndex === i ? '#fff' : colors[i]}
                                strokeWidth={highlightIndex === i ? 2 : 1.5}
                                onMouseEnter={() => handleEnter(d, i)}
                                onMouseLeave={handleLeave}
                                onClick={onSelect ? () => handleClick(d, i) : undefined}
                                style={{ cursor: highlightIndex === i ? 'pointer' : onSelect ? 'pointer' : undefined, transition: 'fill-opacity 120ms ease-out' }}
                            />
                        ))}
                        {showXAxis && <ChartAxis scale={xScale} orientation="bottom" top={dims.innerHeight} tickFormat={xf} />}
                        {showYAxis && <ChartAxis scale={yScale} orientation="left" tickFormat={yf} />}
                    </Group>
                </svg>
                {showTooltip && hoveredIndex != null && (
                    <ChartTooltip
                        left={(xScale(getX(data[hoveredIndex])) ?? 0) + dims.margin.left}
                        top={(yScale(getY(data[hoveredIndex])) ?? 0) + dims.margin.top}
                        visible offsetY={-12}
                    >
                        {buildTooltipContent(data[hoveredIndex], getX, getY, getR)}
                    </ChartTooltip>
                )}
            </div>
        </div>
    );
};
BubbleInner.displayName = 'BubbleInner';
export default BubbleInner;
