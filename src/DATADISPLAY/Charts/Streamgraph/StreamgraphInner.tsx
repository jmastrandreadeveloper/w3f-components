import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { Area } from '@visx/shape';
import { curveMonotoneX, curveLinear, curveBasis } from '@visx/curve';
import type { StreamgraphInnerProps } from './Streamgraph.types';
import { STREAMGRAPH_DEFAULTS } from './Streamgraph.constants';
import { buildStreamgraphClasses, computeStreamLayers } from './Streamgraph.utils';
import { useStreamScales, useStreamColors, useStreamHover, useInnerDims } from './Streamgraph.hooks';
import { ChartAxis } from '../primitives/ChartAxis';
import { ChartLegend } from '../primitives/ChartLegend';
import { BASE_CHART_CLASSES } from '../_base/constants';
import { ChartHeader } from '../_base/ChartHeader';

export const StreamgraphInner: React.FC<StreamgraphInnerProps> = (props) => {
    const {
        data, width, height, margin, className, keys,
        unstyled = STREAMGRAPH_DEFAULTS.unstyled, bindId, ariaLabel, description, colorScheme, title, subtitle,
        curved = STREAMGRAPH_DEFAULTS.curved, fillOpacity = STREAMGRAPH_DEFAULTS.fillOpacity,
        showXAxis = STREAMGRAPH_DEFAULTS.showXAxis, showLegend = STREAMGRAPH_DEFAULTS.showLegend,
        highlightSeriesId = null,
        onHover,
    } = props;

    const dims = useInnerDims(width, height, margin);
    const { dates, layers } = useMemo(() => computeStreamLayers(data, keys), [data, keys]);
    const { xScale, yScale } = useStreamScales(layers, dates, dims.innerWidth, dims.innerHeight);
    const colorMap = useStreamColors(keys, colorScheme);
    const { hovered, enter, leave } = useStreamHover(onHover);
    const classes = useMemo(() => buildStreamgraphClasses(className, unstyled), [className, unstyled]);
    const curve = curved ? curveBasis : curveLinear;

    const legendItems = useMemo(
        () => keys.map((k) => ({ id: k, label: data.find((s) => s.id === k)?.label ?? k, color: colorMap(k) })),
        [keys, data, colorMap],
    );

    if (layers.length === 0) {
        return (
            <div className={classes}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Empty streamgraph'} />
            </div>
        );
    }

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            {showLegend && <ChartLegend items={legendItems} />}
            <div className={BASE_CHART_CLASSES.container} style={{ position: 'relative' }}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Streamgraph'}>
                    {description && <desc>{description}</desc>}
                    <Group top={dims.margin.top} left={dims.margin.left}>
                        {layers.map((layer) => {
                            const active = highlightSeriesId ?? hovered;
                            const isDimmed = active != null && active !== layer.key;
                            return (
                                <Area
                                    key={layer.key}
                                    data={layer.points}
                                    x={(d) => xScale(d.date) ?? 0}
                                    y0={(d) => yScale(d.y0) ?? 0}
                                    y1={(d) => yScale(d.y1) ?? 0}
                                    curve={curve}
                                >
                                    {({ path }) => (
                                        <path
                                            d={path([...layer.points]) ?? ''}
                                            fill={colorMap(layer.key)}
                                            fillOpacity={isDimmed ? 0.15 : fillOpacity}
                                            stroke={colorMap(layer.key)}
                                            strokeWidth={0.5}
                                            onMouseEnter={() => enter(layer.key)}
                                            onMouseLeave={leave}
                                            style={{ cursor: 'pointer', transition: 'fill-opacity 120ms' }}
                                        />
                                    )}
                                </Area>
                            );
                        })}

                        {showXAxis && <ChartAxis scale={xScale} orientation="bottom" top={dims.innerHeight} />}
                    </Group>
                </svg>
            </div>
        </div>
    );
};

StreamgraphInner.displayName = 'StreamgraphInner';
export default StreamgraphInner;
