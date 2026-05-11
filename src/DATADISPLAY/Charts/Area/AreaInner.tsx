import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { AreaClosed, LinePath } from '@visx/shape';
import { curveMonotoneX, curveLinear } from '@visx/curve';
import type { AreaDatum, AreaInnerProps } from './Area.types';
import { AREA_DEFAULTS } from './Area.constants';
import { buildAreaClasses, toDate, formatTick } from './Area.utils';
import { useAreaAccessors, useAreaScales, useAreaColor, useAreaInteraction, useInnerDims } from './Area.hooks';
import { ChartAxis } from '../primitives/ChartAxis';
import { ChartGrid } from '../primitives/ChartGrid';
import { ChartTooltip } from '../primitives/ChartTooltip';
import { BASE_CHART_CLASSES } from '../_base/constants';
import { ChartHeader } from '../_base/ChartHeader';

export const AreaInner: React.FC<AreaInnerProps> = (props) => {
    const {
        data, width, height, margin, className,
        unstyled = AREA_DEFAULTS.unstyled, bindId, ariaLabel, description, colorScheme, title, subtitle,
        getDate: gD, getValue: gV,
        curved = AREA_DEFAULTS.curved, fillOpacity = AREA_DEFAULTS.fillOpacity,
        showLine = AREA_DEFAULTS.showLine, strokeWidth = AREA_DEFAULTS.strokeWidth,
        showXAxis = AREA_DEFAULTS.showXAxis, showYAxis = AREA_DEFAULTS.showYAxis,
        showGrid = AREA_DEFAULTS.showGrid, showTooltip = AREA_DEFAULTS.showTooltip,
        yDomain, formatY, tickRotateX = 0, highlightIndex = null, onHover, onSelect,
    } = props;

    const { getDate, getValue } = useAreaAccessors(gD, gV);
    const dims = useInnerDims(width, height, margin);
    const { xScale, yScale } = useAreaScales(data, dims.innerWidth, dims.innerHeight, getDate, getValue, yDomain);
    const color = useAreaColor(colorScheme);
    const { hoveredIndex, handleEnter, handleLeave, handleClick } = useAreaInteraction(onHover, onSelect);
    const classes = useMemo(() => buildAreaClasses(className, unstyled), [className, unstyled]);
    const yTickFormat = formatY ?? formatTick;
    const curve = curved ? curveMonotoneX : curveLinear;

    if (data.length === 0) {
        return (<div className={classes}><svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Empty area chart'} /></div>);
    }

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            <div className={BASE_CHART_CLASSES.container} style={{ position: 'relative' }}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Area chart'}>
                    {description && <desc>{description}</desc>}
                    <Group top={dims.margin.top} left={dims.margin.left}>
                        {showGrid && <ChartGrid yScale={yScale} width={dims.innerWidth} height={dims.innerHeight} axis="rows" />}

                        <AreaClosed
                            data={[...data]}
                            x={(d) => xScale(toDate(getDate(d))) ?? 0}
                            y={(d) => yScale(getValue(d)) ?? 0}
                            yScale={yScale}
                            fill={color}
                            fillOpacity={fillOpacity}
                            curve={curve}
                        />

                        {showLine && (
                            <LinePath
                                data={[...data]}
                                x={(d) => xScale(toDate(getDate(d))) ?? 0}
                                y={(d) => yScale(getValue(d)) ?? 0}
                                stroke={color}
                                strokeWidth={strokeWidth}
                                curve={curve}
                            />
                        )}

                        {/* Hover targets */}
                        {data.map((d, i) => (
                            <circle
                                key={i}
                                cx={xScale(toDate(getDate(d))) ?? 0}
                                cy={yScale(getValue(d)) ?? 0}
                                r={8} fill="transparent"
                                onMouseEnter={() => handleEnter(d, i)}
                                onMouseLeave={handleLeave}
                                onClick={onSelect ? () => handleClick(d, i) : undefined}
                                style={{ cursor: onSelect ? 'pointer' : undefined }}
                            />
                        ))}

                        {hoveredIndex != null && (
                            <circle
                                cx={xScale(toDate(getDate(data[hoveredIndex]))) ?? 0}
                                cy={yScale(getValue(data[hoveredIndex])) ?? 0}
                                r={5} fill={color} stroke="#fff" strokeWidth={2} pointerEvents="none"
                            />
                        )}

                        {showXAxis && <ChartAxis scale={xScale} orientation="bottom" top={dims.innerHeight} tickRotate={tickRotateX} />}
                        {showYAxis && <ChartAxis scale={yScale} orientation="left" tickFormat={yTickFormat} />}

                        {/* Punto resaltado externamente (ej. fila seleccionada en tabla) */}
                        {highlightIndex != null && data[highlightIndex] != null && (() => {
                            const d = data[highlightIndex];
                            const cx = xScale(toDate(getDate(d))) ?? 0;
                            const cy = yScale(getValue(d)) ?? 0;
                            return (
                                <g>
                                    <circle cx={cx} cy={cy} r={12} fill={color} opacity={0.2} pointerEvents="none" />
                                    <circle cx={cx} cy={cy} r={6} fill={color} stroke="#fff" strokeWidth={2.5} pointerEvents="none" />
                                    <line x1={cx} y1={0} x2={cx} y2={dims.innerHeight} stroke={color} strokeWidth={1} strokeDasharray="4 3" opacity={0.6} pointerEvents="none" />
                                </g>
                            );
                        })()}
                    </Group>
                </svg>

                {showTooltip && hoveredIndex != null && (() => {
                    const d = data[hoveredIndex];
                    const date = toDate(getDate(d));
                    return (
                        <ChartTooltip left={(xScale(date) ?? 0) + dims.margin.left} top={(yScale(getValue(d)) ?? 0) + dims.margin.top} visible offsetY={-12}>
                            {`${date.toLocaleDateString()}: ${getValue(d).toLocaleString()}`}
                        </ChartTooltip>
                    );
                })()}
            </div>
        </div>
    );
};

AreaInner.displayName = 'AreaInner';
export default AreaInner;
