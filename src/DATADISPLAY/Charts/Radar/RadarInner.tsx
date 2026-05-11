import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import type { RadarInnerProps } from './Radar.types';
import { RADAR_DEFAULTS } from './Radar.constants';
import {
    buildRadarClasses, buildPolygon, buildGridPolygon, labelPosition, axisAngle, buildTooltipContent,
} from './Radar.utils';
import { useRadarAccessors, useRadarScale, useRadarColor, useRadarInteraction } from './Radar.hooks';
import { ChartTooltip } from '../primitives/ChartTooltip';
import { BASE_CHART_CLASSES } from '../_base/constants';
import { ChartHeader } from '../_base/ChartHeader';

export const RadarInner: React.FC<RadarInnerProps> = (props) => {
    const {
        data, width, height, className,
        unstyled = RADAR_DEFAULTS.unstyled, bindId, ariaLabel, description, colorScheme, title, subtitle,
        getLabel: glp, getValue: gvp,
        gridLevels = RADAR_DEFAULTS.gridLevels,
        showGrid = RADAR_DEFAULTS.showGrid,
        showLabels = RADAR_DEFAULTS.showLabels,
        showTooltip = RADAR_DEFAULTS.showTooltip,
        showDots = RADAR_DEFAULTS.showDots,
        fillOpacity = RADAR_DEFAULTS.fillOpacity,
        maxValue,
        onHover, onSelect,
    } = props;

    const { getLabel, getValue } = useRadarAccessors(glp, gvp);
    const margin = 40;
    const radius = Math.min(width, height) / 2 - margin;
    const rScale = useRadarScale(data, getValue, radius, maxValue);
    const color = useRadarColor(colorScheme);
    const { hoveredIndex, handleEnter, handleLeave, handleClick } = useRadarInteraction(onHover, onSelect);

    const classes = useMemo(() => buildRadarClasses(className, unstyled), [className, unstyled]);
    const cx = width / 2;
    const cy = height / 2;
    const n = data.length;

    if (n === 0) {
        return (
            <div className={classes}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Empty radar chart'} />
            </div>
        );
    }

    const polygon = buildPolygon(data, getValue, rScale);

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            <div className={BASE_CHART_CLASSES.container} style={{ position: 'relative' }}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Radar chart'}>
                    {description && <desc>{description}</desc>}
                    <Group top={cy} left={cx}>
                        {/* Grid rings */}
                        {showGrid && Array.from({ length: gridLevels }, (_, level) => {
                            const r = (radius * (level + 1)) / gridLevels;
                            return (
                                <polygon
                                    key={level}
                                    points={buildGridPolygon(n, r)}
                                    fill="none"
                                    stroke="var(--w3f-chart-grid-stroke, #e2e8f0)"
                                    strokeWidth={0.5}
                                    strokeDasharray="2 4"
                                />
                            );
                        })}

                        {/* Axis lines */}
                        {showGrid && data.map((_, i) => {
                            const angle = axisAngle(i, n);
                            return (
                                <line
                                    key={i}
                                    x1={0} y1={0}
                                    x2={Math.cos(angle) * radius}
                                    y2={Math.sin(angle) * radius}
                                    stroke="var(--w3f-chart-grid-stroke, #e2e8f0)"
                                    strokeWidth={0.5}
                                />
                            );
                        })}

                        {/* Data polygon */}
                        <polygon
                            points={polygon}
                            fill={color}
                            fillOpacity={fillOpacity}
                            stroke={color}
                            strokeWidth={2}
                        />

                        {/* Data points */}
                        {showDots && data.map((d, i) => {
                            const angle = axisAngle(i, n);
                            const r = rScale(getValue(d)) as number;
                            const px = Math.cos(angle) * r;
                            const py = Math.sin(angle) * r;
                            const isHovered = hoveredIndex === i;

                            return (
                                <circle
                                    key={i}
                                    cx={px} cy={py}
                                    r={isHovered ? 5 : 3.5}
                                    fill={color}
                                    stroke="#fff"
                                    strokeWidth={2}
                                    onMouseEnter={() => handleEnter(d, i)}
                                    onMouseLeave={handleLeave}
                                    onClick={onSelect ? () => handleClick(d, i) : undefined}
                                    style={{ cursor: onSelect ? 'pointer' : undefined, transition: 'r 120ms ease-out' }}
                                />
                            );
                        })}

                        {/* Axis labels */}
                        {showLabels && data.map((d, i) => {
                            const pos = labelPosition(i, n, radius);
                            return (
                                <text
                                    key={i}
                                    x={pos.x} y={pos.y}
                                    textAnchor={pos.anchor}
                                    dominantBaseline="central"
                                    fontSize={11}
                                    fill="var(--w3f-chart-axis-tick-label-color, #64748b)"
                                >
                                    {getLabel(d)}
                                </text>
                            );
                        })}
                    </Group>
                </svg>

                {showTooltip && hoveredIndex != null && (() => {
                    const d = data[hoveredIndex];
                    const angle = axisAngle(hoveredIndex, n);
                    const r = rScale(getValue(d)) as number;
                    return (
                        <ChartTooltip
                            left={cx + Math.cos(angle) * r}
                            top={cy + Math.sin(angle) * r}
                            visible offsetY={-12}
                        >
                            {buildTooltipContent(d, getLabel, getValue)}
                        </ChartTooltip>
                    );
                })()}
            </div>
        </div>
    );
};

RadarInner.displayName = 'RadarInner';
export default RadarInner;
