import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { Area } from '@visx/shape';
import { curveMonotoneX, curveLinear } from '@visx/curve';
import type { AreaStackedInnerProps } from './AreaStacked.types';
import { AREA_STACKED_DEFAULTS } from './AreaStacked.constants';
import { buildAreaStackedClasses, computeAreaStack, toDate, formatTick } from './AreaStacked.utils';
import { useAreaStackedScales, useAreaStackedColors, useAreaStackedHover, useInnerDims } from './AreaStacked.hooks';
import { ChartAxis } from '../primitives/ChartAxis';
import { ChartGrid } from '../primitives/ChartGrid';
import { ChartLegend } from '../primitives/ChartLegend';
import { BASE_CHART_CLASSES } from '../_base/constants';
import { ChartHeader } from '../_base/ChartHeader';

export const AreaStackedInner: React.FC<AreaStackedInnerProps> = (props) => {
    const {
        data, width, height, margin, className, keys,
        unstyled = AREA_STACKED_DEFAULTS.unstyled, bindId, ariaLabel, description, colorScheme, title, subtitle,
        curved = AREA_STACKED_DEFAULTS.curved, fillOpacity = AREA_STACKED_DEFAULTS.fillOpacity,
        showXAxis = AREA_STACKED_DEFAULTS.showXAxis, showYAxis = AREA_STACKED_DEFAULTS.showYAxis,
        showGrid = AREA_STACKED_DEFAULTS.showGrid, showTooltip = AREA_STACKED_DEFAULTS.showTooltip,
        showLegend = AREA_STACKED_DEFAULTS.showLegend,
        yDomain, formatY, tickRotateX = 0, highlightSeriesId, onHover,
    } = props;

    const dims = useInnerDims(width, height, margin);
    const { dates, layers } = useMemo(() => computeAreaStack(data, keys), [data, keys]);
    const { xScale, yScale } = useAreaStackedScales(layers, dates, dims.innerWidth, dims.innerHeight, yDomain);
    const colorMap = useAreaStackedColors(keys, colorScheme);
    const { hovered, enter, leave } = useAreaStackedHover(onHover);
    const classes = useMemo(() => buildAreaStackedClasses(className, unstyled), [className, unstyled]);
    const yTickFormat = formatY ?? formatTick;
    const curve = curved ? curveMonotoneX : curveLinear;

    const legendItems = useMemo(
        () => keys.map((k) => {
            const series = data.find((s) => s.id === k);
            return { id: k, label: series?.label ?? k, color: colorMap[k] };
        }),
        [keys, data, colorMap],
    );

    if (data.length === 0) {
        return (<div className={classes}><svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Empty stacked area chart'} /></div>);
    }

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            {showLegend && <ChartLegend items={legendItems} />}
            <div className={BASE_CHART_CLASSES.container} style={{ position: 'relative' }}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Stacked area chart'}>
                    {description && <desc>{description}</desc>}
                    <Group top={dims.margin.top} left={dims.margin.left}>
                        {showGrid && <ChartGrid yScale={yScale} width={dims.innerWidth} height={dims.innerHeight} axis="rows" />}

                        {/* Render layers bottom-up (first key = bottom) */}
                        {layers.map((layer) => {
                            const activeHover = highlightSeriesId !== undefined ? highlightSeriesId : hovered;
                            const isDimmed = activeHover != null && activeHover !== layer.key;
                            return (
                                <g
                                    key={layer.key}
                                    onMouseEnter={() => enter(layer.key)}
                                    onMouseLeave={leave}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Area
                                        data={layer.points}
                                        x={(d) => xScale(toDate(d.date)) ?? 0}
                                        y0={(d) => yScale(d.y0) ?? 0}
                                        y1={(d) => yScale(d.y1) ?? 0}
                                        fill={colorMap[layer.key]}
                                        fillOpacity={isDimmed ? 0.2 : fillOpacity}
                                        curve={curve}
                                        style={{ transition: 'fill-opacity 120ms ease-out' }}
                                    />
                                    {/* Wider invisible hit area along the top edge */}
                                    <Area
                                        data={layer.points}
                                        x={(d) => xScale(toDate(d.date)) ?? 0}
                                        y0={(d) => yScale(d.y1 - (d.y1 - d.y0) * 0.2) ?? 0}
                                        y1={(d) => yScale(d.y1) ?? 0}
                                        fill="transparent"
                                        strokeWidth={0}
                                    />
                                </g>
                            );
                        })}

                        {showXAxis && <ChartAxis scale={xScale} orientation="bottom" top={dims.innerHeight} tickRotate={tickRotateX} />}
                        {showYAxis && <ChartAxis scale={yScale} orientation="left" tickFormat={yTickFormat} />}
                    </Group>
                </svg>
            </div>
        </div>
    );
};

AreaStackedInner.displayName = 'AreaStackedInner';
export default AreaStackedInner;
