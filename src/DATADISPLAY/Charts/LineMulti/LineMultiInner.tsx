import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import { curveMonotoneX, curveLinear } from '@visx/curve';
import type { LineMultiInnerProps } from './LineMulti.types';
import { LINE_MULTI_DEFAULTS } from './LineMulti.constants';
import { buildLineMultiClasses, toDate, formatTick } from './LineMulti.utils';
import { useLineMultiScales, useLineMultiColors, useLineMultiHover, useInnerDims } from './LineMulti.hooks';
import { ChartAxis } from '../primitives/ChartAxis';
import { ChartGrid } from '../primitives/ChartGrid';
import { ChartLegend } from '../primitives/ChartLegend';
import { BASE_CHART_CLASSES } from '../_base/constants';
import { ChartHeader } from '../_base/ChartHeader';

export const LineMultiInner: React.FC<LineMultiInnerProps> = (props) => {
    const {
        data, width, height, margin, className,
        unstyled = LINE_MULTI_DEFAULTS.unstyled, bindId, ariaLabel, description, colorScheme, title, subtitle,
        curved = LINE_MULTI_DEFAULTS.curved, showDots = LINE_MULTI_DEFAULTS.showDots,
        strokeWidth = LINE_MULTI_DEFAULTS.strokeWidth,
        showXAxis = LINE_MULTI_DEFAULTS.showXAxis, showYAxis = LINE_MULTI_DEFAULTS.showYAxis,
        showGrid = LINE_MULTI_DEFAULTS.showGrid, showLegend = LINE_MULTI_DEFAULTS.showLegend,
        highlightSeriesId = null,
        formatY, onHover,
    } = props;

    const dims = useInnerDims(width, height, margin);
    const seriesIds = useMemo(() => data.map((s) => s.id), [data]);
    const { xScale, yScale } = useLineMultiScales(data, dims.innerWidth, dims.innerHeight);
    const colorMap = useLineMultiColors(seriesIds, colorScheme);
    const { hovered, enter, leave } = useLineMultiHover(onHover);
    const classes = useMemo(() => buildLineMultiClasses(className, unstyled), [className, unstyled]);
    const yTickFormat = formatY ?? formatTick;
    const curve = curved ? curveMonotoneX : curveLinear;

    const legendItems = useMemo(
        () => data.map((s) => ({ id: s.id, label: s.label ?? s.id, color: colorMap[s.id] })),
        [data, colorMap],
    );

    if (data.length === 0) {
        return (<div className={classes}><svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Empty multi-line chart'} /></div>);
    }

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            {showLegend && <ChartLegend items={legendItems} />}
            <div className={BASE_CHART_CLASSES.container} style={{ position: 'relative' }}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Multi-line chart'}>
                    {description && <desc>{description}</desc>}
                    <Group top={dims.margin.top} left={dims.margin.left}>
                        {showGrid && <ChartGrid yScale={yScale} width={dims.innerWidth} height={dims.innerHeight} axis="rows" />}

                        {data.map((series) => {
                            const active = highlightSeriesId ?? hovered;
                            const isDimmed = active != null && active !== series.id;
                            return (
                                <g key={series.id}
                                    onMouseEnter={() => enter(series.id)}
                                    onMouseLeave={leave}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <LinePath
                                        data={[...series.data]}
                                        x={(d) => xScale(toDate(d.date)) ?? 0}
                                        y={(d) => yScale(d.value) ?? 0}
                                        stroke={colorMap[series.id]}
                                        strokeWidth={hovered === series.id ? strokeWidth + 1 : strokeWidth}
                                        strokeOpacity={isDimmed ? 0.2 : 1}
                                        curve={curve}
                                    />
                                    {/* Wider invisible hit area */}
                                    <LinePath
                                        data={[...series.data]}
                                        x={(d) => xScale(toDate(d.date)) ?? 0}
                                        y={(d) => yScale(d.value) ?? 0}
                                        stroke="transparent"
                                        strokeWidth={12}
                                        curve={curve}
                                    />
                                    {showDots && series.data.map((pt, pi) => (
                                        <circle
                                            key={pi}
                                            cx={xScale(toDate(pt.date)) ?? 0}
                                            cy={yScale(pt.value) ?? 0}
                                            r={3} fill={colorMap[series.id]}
                                            opacity={isDimmed ? 0.2 : 1}
                                        />
                                    ))}
                                </g>
                            );
                        })}

                        {showXAxis && <ChartAxis scale={xScale} orientation="bottom" top={dims.innerHeight} />}
                        {showYAxis && <ChartAxis scale={yScale} orientation="left" tickFormat={yTickFormat} />}
                    </Group>
                </svg>
            </div>
        </div>
    );
};

LineMultiInner.displayName = 'LineMultiInner';
export default LineMultiInner;
