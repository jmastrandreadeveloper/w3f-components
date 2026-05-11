import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import VisxThreshold from '@visx/threshold/lib/Threshold';
import { curveMonotoneX, curveLinear } from '@visx/curve';
import type { ThresholdDatum, ThresholdInnerProps } from './Threshold.types';
import { THRESHOLD_DEFAULTS } from './Threshold.constants';
import { buildThresholdClasses, toDate, formatTick } from './Threshold.utils';
import { useThresholdAccessors, useThresholdScales, useThresholdColors, useThresholdInteraction, useInnerDims } from './Threshold.hooks';
import { ChartAxis } from '../primitives/ChartAxis';
import { ChartGrid } from '../primitives/ChartGrid';
import { ChartTooltip } from '../primitives/ChartTooltip';
import { ChartLegend } from '../primitives/ChartLegend';
import { BASE_CHART_CLASSES } from '../_base/constants';
import { ChartHeader } from '../_base/ChartHeader';

export const ThresholdInner: React.FC<ThresholdInnerProps> = (props) => {
    const {
        data, width, height, margin, className,
        unstyled = THRESHOLD_DEFAULTS.unstyled, bindId, ariaLabel, description, colorScheme, title, subtitle,
        getDate: gD, getValue0: gV0, getValue1: gV1,
        label0 = 'Series A', label1 = 'Series B',
        aboveColor, belowColor, fillOpacity = THRESHOLD_DEFAULTS.fillOpacity,
        curved = THRESHOLD_DEFAULTS.curved, strokeWidth = THRESHOLD_DEFAULTS.strokeWidth,
        showXAxis = THRESHOLD_DEFAULTS.showXAxis, showYAxis = THRESHOLD_DEFAULTS.showYAxis,
        showGrid = THRESHOLD_DEFAULTS.showGrid, showTooltip = THRESHOLD_DEFAULTS.showTooltip,
        showLegend = THRESHOLD_DEFAULTS.showLegend,
        yDomain, formatY, onHover,
        highlightIndex = null,
    } = props;

    const { getDate, getValue0, getValue1 } = useThresholdAccessors(gD, gV0, gV1);
    const dims = useInnerDims(width, height, margin);
    const { xScale, yScale } = useThresholdScales(data, dims.innerWidth, dims.innerHeight, getDate, getValue0, getValue1, yDomain);
    const colors = useThresholdColors(aboveColor, belowColor, colorScheme);
    const { hoveredIndex, handleEnter, handleLeave } = useThresholdInteraction(onHover);
    const classes = useMemo(() => buildThresholdClasses(className, unstyled), [className, unstyled]);
    const yTickFormat = formatY ?? formatTick;
    const curve = curved ? curveMonotoneX : curveLinear;

    const legendItems = useMemo(() => [
        { id: 'above', label: `${label0} > ${label1}`, color: colors.above },
        { id: 'below', label: `${label1} > ${label0}`, color: colors.below },
    ], [label0, label1, colors]);

    if (data.length === 0) {
        return (
            <div className={classes}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Empty threshold chart'} />
            </div>
        );
    }

    const mutableData = [...data];
    const thresholdId = `threshold-${bindId ?? 'default'}-${width}`;

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            {showLegend && <ChartLegend items={legendItems} />}
            <div className={BASE_CHART_CLASSES.container} style={{ position: 'relative' }}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Threshold chart'}>
                    {description && <desc>{description}</desc>}
                    <Group top={dims.margin.top} left={dims.margin.left}>
                        {showGrid && <ChartGrid yScale={yScale} width={dims.innerWidth} height={dims.innerHeight} axis="rows" />}

                        <VisxThreshold<ThresholdDatum>
                            id={thresholdId}
                            data={mutableData}
                            x={(d) => xScale(toDate(getDate(d))) ?? 0}
                            y0={(d) => yScale(getValue0(d)) ?? 0}
                            y1={(d) => yScale(getValue1(d)) ?? 0}
                            clipAboveTo={0}
                            clipBelowTo={dims.innerHeight}
                            curve={curve}
                            aboveAreaProps={{ fill: colors.above, fillOpacity }}
                            belowAreaProps={{ fill: colors.below, fillOpacity }}
                        />

                        {/* Line for value0 */}
                        <LinePath
                            data={mutableData}
                            x={(d) => xScale(toDate(getDate(d))) ?? 0}
                            y={(d) => yScale(getValue0(d)) ?? 0}
                            stroke={colors.line0}
                            strokeWidth={strokeWidth}
                            curve={curve}
                        />

                        {/* Line for value1 */}
                        <LinePath
                            data={mutableData}
                            x={(d) => xScale(toDate(getDate(d))) ?? 0}
                            y={(d) => yScale(getValue1(d)) ?? 0}
                            stroke={colors.line1}
                            strokeWidth={strokeWidth}
                            strokeDasharray="4,2"
                            curve={curve}
                        />

                        {/* Hover targets */}
                        {data.map((d, i) => {
                            const cx = xScale(toDate(getDate(d))) ?? 0;
                            const midY = (yScale(getValue0(d)) + yScale(getValue1(d))) / 2;
                            return (
                                <circle
                                    key={i}
                                    cx={cx} cy={midY} r={8}
                                    fill="transparent"
                                    onMouseEnter={() => handleEnter(d, i)}
                                    onMouseLeave={handleLeave}
                                    style={{ cursor: 'default' }}
                                />
                            );
                        })}

                        {/* Hovered indicator dots */}
                        {hoveredIndex != null && (() => {
                            const d = data[hoveredIndex];
                            const cx = xScale(toDate(getDate(d))) ?? 0;
                            return (
                                <>
                                    <circle cx={cx} cy={yScale(getValue0(d))} r={4} fill={colors.line0} stroke="#fff" strokeWidth={2} pointerEvents="none" />
                                    <circle cx={cx} cy={yScale(getValue1(d))} r={4} fill={colors.line1} stroke="#fff" strokeWidth={2} pointerEvents="none" />
                                </>
                            );
                        })()}

                        {/* External highlight */}
                        {highlightIndex != null && highlightIndex < data.length && (() => {
                            const d = data[highlightIndex];
                            const cx = xScale(toDate(getDate(d))) ?? 0;
                            const cy = (yScale(getValue0(d)) + yScale(getValue1(d))) / 2;
                            const hlColor = colors.above ?? 'var(--w3f-primary)';
                            return (
                                <g pointerEvents="none">
                                    <line x1={cx} y1={0} x2={cx} y2={dims.innerHeight} stroke={hlColor} strokeWidth={1} strokeDasharray="4 3" opacity={0.6} />
                                    <circle cx={cx} cy={yScale(getValue0(d))} r={12} fill={colors.line0} opacity={0.2} />
                                    <circle cx={cx} cy={yScale(getValue0(d))} r={6} fill={colors.line0} stroke="#fff" strokeWidth={2.5} />
                                    <circle cx={cx} cy={yScale(getValue1(d))} r={12} fill={colors.line1} opacity={0.2} />
                                    <circle cx={cx} cy={yScale(getValue1(d))} r={6} fill={colors.line1} stroke="#fff" strokeWidth={2.5} />
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
                    const v0 = getValue0(d);
                    const v1 = getValue1(d);
                    const cx = (xScale(date) ?? 0) + dims.margin.left;
                    const cy = ((yScale(v0) + yScale(v1)) / 2) + dims.margin.top;
                    return (
                        <ChartTooltip left={cx} top={cy} visible offsetY={-12}>
                            {`${date.toLocaleDateString()}\n${label0}: ${v0.toLocaleString()}\n${label1}: ${v1.toLocaleString()}`}
                        </ChartTooltip>
                    );
                })()}
            </div>
        </div>
    );
};

ThresholdInner.displayName = 'ThresholdInner';
export default ThresholdInner;
