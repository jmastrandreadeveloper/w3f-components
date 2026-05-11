import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import { curveMonotoneX, curveLinear } from '@visx/curve';
import type { LineDatum, LineInnerProps } from './Line.types';
import { LINE_DEFAULTS } from './Line.constants';
import { buildLineClasses, toDate, formatTick } from './Line.utils';
import { useLineAccessors, useLineScales, useLineColor, useLineInteraction, useInnerDims } from './Line.hooks';
import { ChartAxis } from '../primitives/ChartAxis';
import { ChartGrid } from '../primitives/ChartGrid';
import { ChartTooltip } from '../primitives/ChartTooltip';
import { BASE_CHART_CLASSES } from '../_base/constants';
import { ChartHeader } from '../_base/ChartHeader';

export const LineInner: React.FC<LineInnerProps> = (props) => {
    const {
        data, width, height, margin, className,
        unstyled = LINE_DEFAULTS.unstyled, bindId, ariaLabel, description, colorScheme, title, subtitle,
        getDate: gD, getValue: gV,
        curved = LINE_DEFAULTS.curved, showDots = LINE_DEFAULTS.showDots,
        strokeWidth = LINE_DEFAULTS.strokeWidth,
        showXAxis = LINE_DEFAULTS.showXAxis, showYAxis = LINE_DEFAULTS.showYAxis,
        showGrid = LINE_DEFAULTS.showGrid, showTooltip = LINE_DEFAULTS.showTooltip,
        yDomain, formatY, onHover, onSelect,
        highlightIndex = null,
    } = props;

    const { getDate, getValue } = useLineAccessors(gD, gV);
    const dims = useInnerDims(width, height, margin);
    const { xScale, yScale } = useLineScales(data, dims.innerWidth, dims.innerHeight, getDate, getValue, yDomain);
    const color = useLineColor(colorScheme);
    const { hoveredIndex, handleEnter, handleLeave, handleClick } = useLineInteraction(onHover, onSelect);
    const classes = useMemo(() => buildLineClasses(className, unstyled), [className, unstyled]);
    const yTickFormat = formatY ?? formatTick;
    const curve = curved ? curveMonotoneX : curveLinear;

    if (data.length === 0) {
        return (<div className={classes}><svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Empty line chart'} /></div>);
    }

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            <div className={BASE_CHART_CLASSES.container} style={{ position: 'relative' }}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Line chart'}>
                    {description && <desc>{description}</desc>}
                    <Group top={dims.margin.top} left={dims.margin.left}>
                        {showGrid && <ChartGrid yScale={yScale} width={dims.innerWidth} height={dims.innerHeight} axis="rows" />}

                        <LinePath
                            data={[...data]}
                            x={(d) => xScale(toDate(getDate(d))) ?? 0}
                            y={(d) => yScale(getValue(d)) ?? 0}
                            stroke={color}
                            strokeWidth={strokeWidth}
                            curve={curve}
                        />

                        {showDots && data.map((d, i) => {
                            const cx = xScale(toDate(getDate(d))) ?? 0;
                            const cy = yScale(getValue(d)) ?? 0;
                            return (
                                <circle
                                    key={i}
                                    cx={cx} cy={cy} r={hoveredIndex === i ? 5 : 3}
                                    fill={color} stroke="#fff" strokeWidth={1.5}
                                    opacity={hoveredIndex != null && hoveredIndex !== i ? 0.4 : 1}
                                    onMouseEnter={() => handleEnter(d, i)}
                                    onMouseLeave={handleLeave}
                                    onClick={onSelect ? () => handleClick(d, i) : undefined}
                                    style={{ cursor: onSelect ? 'pointer' : undefined, transition: 'r 120ms, opacity 120ms' }}
                                />
                            );
                        })}

                        {/* Invisible hover targets when dots are hidden */}
                        {!showDots && data.map((d, i) => {
                            const cx = xScale(toDate(getDate(d))) ?? 0;
                            const cy = yScale(getValue(d)) ?? 0;
                            return (
                                <circle
                                    key={i}
                                    cx={cx} cy={cy} r={8}
                                    fill="transparent"
                                    onMouseEnter={() => handleEnter(d, i)}
                                    onMouseLeave={handleLeave}
                                    onClick={onSelect ? () => handleClick(d, i) : undefined}
                                    style={{ cursor: onSelect ? 'pointer' : undefined }}
                                />
                            );
                        })}

                        {/* Hovered dot indicator */}
                        {hoveredIndex != null && (
                            <circle
                                cx={xScale(toDate(getDate(data[hoveredIndex]))) ?? 0}
                                cy={yScale(getValue(data[hoveredIndex])) ?? 0}
                                r={5} fill={color} stroke="#fff" strokeWidth={2}
                                pointerEvents="none"
                            />
                        )}

                        {/* External highlight */}
                        {highlightIndex != null && highlightIndex < data.length && (() => {
                            const d = data[highlightIndex];
                            const cx = xScale(toDate(getDate(d))) ?? 0;
                            const cy = yScale(getValue(d)) ?? 0;
                            return (
                                <g pointerEvents="none">
                                    <line x1={cx} y1={0} x2={cx} y2={dims.innerHeight} stroke={color} strokeWidth={1} strokeDasharray="4 3" opacity={0.6} />
                                    <circle cx={cx} cy={cy} r={12} fill={color} opacity={0.2} />
                                    <circle cx={cx} cy={cy} r={6} fill={color} stroke="#fff" strokeWidth={2.5} />
                                </g>
                            );
                        })()}

                        {showXAxis && <ChartAxis scale={xScale} orientation="bottom" top={dims.innerHeight} />}
                        {showYAxis && <ChartAxis scale={yScale} orientation="left" tickFormat={yTickFormat} />}
                    </Group>
                </svg>

                {showTooltip && hoveredIndex != null && (() => {
                    const d = data[hoveredIndex];
                    const date = toDate(getDate(d));
                    return (
                        <ChartTooltip
                            left={(xScale(date) ?? 0) + dims.margin.left}
                            top={(yScale(getValue(d)) ?? 0) + dims.margin.top}
                            visible offsetY={-12}
                        >
                            {`${date.toLocaleDateString()}: ${getValue(d).toLocaleString()}`}
                        </ChartTooltip>
                    );
                })()}
            </div>
        </div>
    );
};

LineInner.displayName = 'LineInner';
export default LineInner;
