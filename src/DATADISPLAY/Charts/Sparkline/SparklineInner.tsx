import React, { useMemo, useCallback, useRef } from 'react';
import type { SparklineInnerProps } from './Sparkline.types';
import { SPARKLINE_DEFAULTS } from './Sparkline.constants';
import { buildSparklineClasses, buildSparklinePath, buildAreaPath } from './Sparkline.utils';
import { useSparklineScales, useSparklineHover } from './Sparkline.hooks';
import { ChartTooltip } from '../primitives/ChartTooltip';
import { ChartHeader } from '../_base/ChartHeader';

const PADDING = 4;

export const SparklineInner: React.FC<SparklineInnerProps> = (props) => {
    const {
        data, width, height, className,
        unstyled = SPARKLINE_DEFAULTS.unstyled,
        bindId, ariaLabel, title, subtitle,
        color = SPARKLINE_DEFAULTS.color,
        showArea = SPARKLINE_DEFAULTS.showArea,
        showEndDot = SPARKLINE_DEFAULTS.showEndDot,
        showMinMax = SPARKLINE_DEFAULTS.showMinMax,
        strokeWidth = SPARKLINE_DEFAULTS.strokeWidth,
        showTooltip = SPARKLINE_DEFAULTS.showTooltip,
        onHover, onSelect,
        highlightIndex = null,
    } = props;

    const svgRef = useRef<SVGSVGElement>(null);
    const { xScale, yScale } = useSparklineScales(data, width, height);
    const { hoveredIndex, handleMove, handleLeave } = useSparklineHover(onHover);
    const classes = useMemo(() => buildSparklineClasses(className, unstyled), [className, unstyled]);

    const linePath = useMemo(() => buildSparklinePath(data, xScale, yScale), [data, xScale, yScale]);
    const areaPath = useMemo(
        () => showArea ? buildAreaPath(data, xScale, yScale, height, PADDING) : '',
        [data, xScale, yScale, height, showArea],
    );

    const minIdx = useMemo(() => {
        if (!showMinMax || data.length === 0) return -1;
        let mi = 0;
        for (let i = 1; i < data.length; i++) if (data[i] < data[mi]) mi = i;
        return mi;
    }, [data, showMinMax]);

    const maxIdx = useMemo(() => {
        if (!showMinMax || data.length === 0) return -1;
        let mi = 0;
        for (let i = 1; i < data.length; i++) if (data[i] > data[mi]) mi = i;
        return mi;
    }, [data, showMinMax]);

    const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
        if (data.length === 0) return;
        const svg = svgRef.current;
        if (!svg) return;
        const rect = svg.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        let nearest = 0;
        let nearestDist = Infinity;
        for (let i = 0; i < data.length; i++) {
            const dist = Math.abs(xScale(i) - mouseX);
            if (dist < nearestDist) { nearestDist = dist; nearest = i; }
        }
        handleMove(nearest, data[nearest]);
    }, [data, xScale, handleMove]);

    const handleClick = useCallback(() => {
        if (hoveredIndex != null && onSelect) onSelect(data[hoveredIndex], hoveredIndex);
    }, [hoveredIndex, data, onSelect]);

    if (data.length === 0) {
        return (
            <div className={classes}>
                <svg width={width} height={height} role="img" aria-label={ariaLabel ?? 'Empty sparkline'} />
            </div>
        );
    }

    return (
        <div className={classes} data-bind-id={bindId} style={{ display: 'inline-block', lineHeight: 0 }}>
            <ChartHeader title={title} subtitle={subtitle} />
            <div style={{ position: 'relative', display: 'inline-block' }}>
                <svg ref={svgRef} width={width} height={height} role="img"
                    aria-label={ariaLabel ?? 'Sparkline'}
                    onMouseMove={handleMouseMove} onMouseLeave={handleLeave}
                    onClick={handleClick}
                    style={{ cursor: onSelect ? 'pointer' : 'default' }}
                >
                    {showArea && <path d={areaPath} fill={color} fillOpacity={0.15} />}
                    <path d={linePath} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
                    {showEndDot && data.length > 0 && (
                        <circle cx={xScale(data.length - 1)} cy={yScale(data[data.length - 1])} r={strokeWidth + 1} fill={color} />
                    )}
                    {showMinMax && minIdx >= 0 && (
                        <circle cx={xScale(minIdx)} cy={yScale(data[minIdx])} r={strokeWidth + 1} fill="#ef4444" />
                    )}
                    {showMinMax && maxIdx >= 0 && (
                        <circle cx={xScale(maxIdx)} cy={yScale(data[maxIdx])} r={strokeWidth + 1} fill="#22c55e" />
                    )}
                    {hoveredIndex != null && (
                        <>
                            <line x1={xScale(hoveredIndex)} y1={PADDING} x2={xScale(hoveredIndex)} y2={height - PADDING}
                                stroke={color} strokeWidth={1} strokeDasharray="3,3" opacity={0.5}
                            />
                            <circle cx={xScale(hoveredIndex)} cy={yScale(data[hoveredIndex])}
                                r={strokeWidth + 1.5} fill="white" stroke={color} strokeWidth={1.5}
                            />
                        </>
                    )}
                    {/* External highlight */}
                    {highlightIndex != null && highlightIndex < data.length && (
                        <circle
                            cx={xScale(highlightIndex)} cy={yScale(data[highlightIndex])}
                            r={4} fill={color} stroke="#fff" strokeWidth={2}
                            pointerEvents="none"
                        />
                    )}
                </svg>
                {showTooltip && hoveredIndex != null && (
                    <ChartTooltip left={xScale(hoveredIndex)} top={yScale(data[hoveredIndex])} visible offsetY={-12}>
                        {data[hoveredIndex].toLocaleString()}
                    </ChartTooltip>
                )}
            </div>
        </div>
    );
};

SparklineInner.displayName = 'SparklineInner';
export default SparklineInner;
