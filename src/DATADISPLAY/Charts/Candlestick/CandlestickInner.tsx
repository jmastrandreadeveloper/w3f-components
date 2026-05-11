import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import type { CandlestickInnerProps } from './Candlestick.types';
import { CANDLESTICK_DEFAULTS } from './Candlestick.constants';
import { buildCandlestickClasses, buildTooltipContent, defaultFormatX, formatTick } from './Candlestick.utils';
import { useCandlestickScales, useCandlestickInteraction, useInnerDims } from './Candlestick.hooks';
import { ChartAxis } from '../primitives/ChartAxis';
import { ChartGrid } from '../primitives/ChartGrid';
import { ChartTooltip } from '../primitives/ChartTooltip';
import { BASE_CHART_CLASSES } from '../_base/constants';
import { ChartHeader } from '../_base/ChartHeader';

export const CandlestickInner: React.FC<CandlestickInnerProps> = (props) => {
    const {
        data, width, height, margin, className,
        unstyled = CANDLESTICK_DEFAULTS.unstyled,
        bindId, ariaLabel, description, title, subtitle,
        showXAxis = CANDLESTICK_DEFAULTS.showXAxis,
        showYAxis = CANDLESTICK_DEFAULTS.showYAxis,
        showGrid = CANDLESTICK_DEFAULTS.showGrid,
        showTooltip = CANDLESTICK_DEFAULTS.showTooltip,
        bullishColor = CANDLESTICK_DEFAULTS.bullishColor,
        bearishColor = CANDLESTICK_DEFAULTS.bearishColor,
        candleWidthRatio = CANDLESTICK_DEFAULTS.candleWidthRatio,
        showVolume = CANDLESTICK_DEFAULTS.showVolume,
        formatY, formatX, onHover, onSelect,
    } = props;

    const dims = useInnerDims(width, height, margin);
    const volumeHeight = showVolume ? Math.round(dims.innerHeight * 0.2) : 0;
    const { xScale, yScale, volumeScale, priceChartHeight } = useCandlestickScales(
        data, dims.innerWidth, dims.innerHeight, volumeHeight,
    );
    const { hoveredIndex, handleEnter, handleLeave, handleClick } = useCandlestickInteraction(onHover, onSelect);
    const classes = useMemo(() => buildCandlestickClasses(className, unstyled), [className, unstyled]);
    const yTickFormat = formatY ?? formatTick;
    const xTickFormat = formatX ?? defaultFormatX;

    if (data.length === 0) {
        return (
            <div className={classes}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Empty candlestick chart'} />
            </div>
        );
    }

    const bandwidth = xScale.bandwidth();
    const bodyWidth = bandwidth * candleWidthRatio;
    const bodyOffset = (bandwidth - bodyWidth) / 2;

    const xAxisFormat = (v: string) => {
        const idx = Number(v);
        return idx < data.length ? xTickFormat(data[idx].date) : '';
    };

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            <div className={BASE_CHART_CLASSES.container} style={{ position: 'relative' }}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Candlestick chart'}>
                    {description && <desc>{description}</desc>}
                    <Group top={dims.margin.top} left={dims.margin.left}>
                        {showGrid && (
                            <ChartGrid xScale={xScale} yScale={yScale} width={dims.innerWidth} height={priceChartHeight} axis="y" />
                        )}
                        {data.map((datum, i) => {
                            const x = xScale(String(i)) ?? 0;
                            const isBullish = datum.close >= datum.open;
                            const color = isBullish ? bullishColor : bearishColor;
                            const bodyTop = yScale(Math.max(datum.open, datum.close)) ?? 0;
                            const bodyBottom = yScale(Math.min(datum.open, datum.close)) ?? 0;
                            const bodyH = Math.max(bodyBottom - bodyTop, 1);
                            const wickX = x + bandwidth / 2;
                            return (
                                <g key={i}
                                    opacity={hoveredIndex != null && hoveredIndex !== i ? 0.4 : 1}
                                    style={{ transition: 'opacity 120ms ease-out' }}
                                    onMouseEnter={() => handleEnter(datum, i)}
                                    onMouseLeave={handleLeave}
                                    onClick={onSelect ? () => handleClick(datum, i) : undefined}
                                    cursor={onSelect ? 'pointer' : 'default'}
                                >
                                    <line x1={wickX} y1={yScale(datum.high) ?? 0} x2={wickX} y2={yScale(datum.low) ?? 0} stroke={color} strokeWidth={1.5} />
                                    <rect x={x + bodyOffset} y={bodyTop} width={bodyWidth} height={bodyH}
                                        fill={color} stroke={color} strokeWidth={1}
                                        fillOpacity={isBullish ? 0.3 : 0.85} rx={1}
                                    />
                                </g>
                            );
                        })}
                        {showVolume && volumeScale && data.map((datum, i) => {
                            if (datum.volume == null) return null;
                            const x = xScale(String(i)) ?? 0;
                            const isBullish = datum.close >= datum.open;
                            const barH = volumeHeight - (volumeScale(datum.volume) ?? 0);
                            return (
                                <rect key={"vol-" + i}
                                    x={x + bodyOffset} y={priceChartHeight + 8 + volumeHeight - barH}
                                    width={bodyWidth} height={Math.max(barH, 0)}
                                    fill={isBullish ? bullishColor : bearishColor}
                                    fillOpacity={0.35} rx={1}
                                />
                            );
                        })}
                        {showXAxis && (
                            <ChartAxis scale={xScale} orientation="bottom"
                                top={showVolume ? dims.innerHeight : priceChartHeight}
                                tickFormat={xAxisFormat} numTicks={Math.min(data.length, 10)}
                            />
                        )}
                        {showYAxis && (
                            <ChartAxis scale={yScale} orientation="left" tickFormat={yTickFormat} />
                        )}
                    </Group>
                </svg>
                {showTooltip && hoveredIndex != null && data[hoveredIndex] && (
                    <ChartTooltip
                        left={(xScale(String(hoveredIndex)) ?? 0) + bandwidth / 2 + dims.margin.left}
                        top={(yScale(data[hoveredIndex].high) ?? 0) + dims.margin.top}
                        visible offsetY={-16}
                    >
                        {buildTooltipContent(data[hoveredIndex])}
                    </ChartTooltip>
                )}
            </div>
        </div>
    );
};

CandlestickInner.displayName = 'CandlestickInner';
export default CandlestickInner;
