import React, { useMemo } from 'react';
import type { BulletInnerProps } from './Bullet.types';
import { BULLET_DEFAULTS } from './Bullet.constants';
import { buildBulletClasses, buildBulletScale, buildTooltipContent } from './Bullet.utils';
import { useBulletInteraction } from './Bullet.hooks';
import { ChartTooltip } from '../primitives/ChartTooltip';
import { BASE_CHART_CLASSES } from '../_base/constants';
import { ChartHeader } from '../_base/ChartHeader';

export const BulletInner: React.FC<BulletInnerProps> = (props) => {
    const {
        data,
        width,
        height,
        className,
        unstyled = BULLET_DEFAULTS.unstyled,
        bindId,
        ariaLabel,
        description, title, subtitle,
        showLabels = BULLET_DEFAULTS.showLabels,
        showValues = BULLET_DEFAULTS.showValues,
        showTooltip = BULLET_DEFAULTS.showTooltip,
        barHeight = BULLET_DEFAULTS.barHeight,
        rowGap = BULLET_DEFAULTS.rowGap,
        valueColor = BULLET_DEFAULTS.valueColor,
        targetColor = BULLET_DEFAULTS.targetColor,
        rangeColors = BULLET_DEFAULTS.rangeColors,
        highlightIndex,
        onHover,
        onSelect,
    } = props;
    const labelWidth = 80;

    const { hoveredIndex, handleEnter, handleLeave, handleClick } = useBulletInteraction(onHover, onSelect);
    const classes = useMemo(() => buildBulletClasses(className, unstyled), [className, unstyled]);

    if (data.length === 0) {
        return (
            <div className={classes}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Empty bullet chart'} />
            </div>
        );
    }

    const leftOffset = showLabels ? labelWidth : 0;
    const barWidth = width - leftOffset - (showValues ? 50 : 0);
    const totalHeight = data.length * barHeight + (data.length - 1) * rowGap;
    const fmt = (n: number) => n.toLocaleString();

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            <div className={BASE_CHART_CLASSES.container} style={{ position: 'relative' }}>
                <svg
                    width={width}
                    height={Math.max(totalHeight, height)}
                    className={BASE_CHART_CLASSES.svg}
                    role="img"
                    aria-label={ariaLabel ?? 'Bullet chart'}
                >
                    {description && <desc>{description}</desc>}
                    {data.map((datum, i) => {
                        const scale = buildBulletScale(datum, barWidth);
                        const y = i * (barHeight + rowGap);
                        const measureH = barHeight * 0.4;
                        const measureY = y + (barHeight - measureH) / 2;
                        const dimmed =
                            (highlightIndex != null && highlightIndex !== i) ||
                            (highlightIndex == null && hoveredIndex != null && hoveredIndex !== i);

                        return (
                            <g key={i}>
                                {/* Label */}
                                {showLabels && (
                                    <text
                                        x={leftOffset - 8}
                                        y={y + barHeight / 2}
                                        textAnchor="end"
                                        dominantBaseline="central"
                                        fontSize={11}
                                        fill="currentColor"
                                    >
                                        {datum.label}
                                    </text>
                                )}

                                {/* Qualitative ranges (background) */}
                                <g transform={`translate(${leftOffset}, ${y})`}>
                                    {/* Good (full range background) — lightest = rangeColors[2] */}
                                    <rect
                                        x={0} y={0}
                                        width={scale(datum.ranges[2]) ?? 0}
                                        height={barHeight}
                                        fill={rangeColors[2]}
                                        rx={2}
                                    />
                                    {/* Satisfactory — rangeColors[1] */}
                                    <rect
                                        x={0} y={0}
                                        width={scale(datum.ranges[1]) ?? 0}
                                        height={barHeight}
                                        fill={rangeColors[1]}
                                        rx={2}
                                    />
                                    {/* Poor — darkest = rangeColors[0] */}
                                    <rect
                                        x={0} y={0}
                                        width={scale(datum.ranges[0]) ?? 0}
                                        height={barHeight}
                                        fill={rangeColors[0]}
                                        rx={2}
                                    />

                                    {/* Primary measure bar */}
                                    <rect
                                        x={0}
                                        y={measureY - y}
                                        width={scale(datum.value) ?? 0}
                                        height={measureH}
                                        fill={valueColor}
                                        opacity={dimmed ? 0.4 : 0.9}
                                        rx={1}
                                        onMouseEnter={() => handleEnter(datum, i)}
                                        onMouseLeave={handleLeave}
                                        onClick={onSelect ? () => handleClick(datum, i) : undefined}
                                        style={{ cursor: onSelect ? 'pointer' : 'default', transition: 'opacity 120ms ease-out' }}
                                    />

                                    {/* Target marker — shown when datum.target is defined */}
                                    {datum.target !== undefined && (
                                        <line
                                            x1={scale(datum.target) ?? 0}
                                            y1={2}
                                            x2={scale(datum.target) ?? 0}
                                            y2={barHeight - 2}
                                            stroke={targetColor}
                                            strokeWidth={2.5}
                                        />
                                    )}
                                </g>

                                {/* Value text */}
                                {showValues && (
                                    <text
                                        x={leftOffset + barWidth + 8}
                                        y={y + barHeight / 2}
                                        dominantBaseline="central"
                                        fontSize={11}
                                        fontWeight={600}
                                        fill="currentColor"
                                    >
                                        {fmt(datum.value)}
                                    </text>
                                )}
                            </g>
                        );
                    })}
                </svg>

                {showTooltip && hoveredIndex != null && data[hoveredIndex] && (
                    <ChartTooltip
                        left={leftOffset + ((buildBulletScale(data[hoveredIndex], barWidth)(data[hoveredIndex].value) ?? 0)) / 2}
                        top={hoveredIndex * (barHeight + rowGap)}
                        visible
                        offsetY={-16}
                    >
                        {buildTooltipContent(data[hoveredIndex], undefined)}
                    </ChartTooltip>
                )}
            </div>
        </div>
    );
};

BulletInner.displayName = 'BulletInner';
export default BulletInner;
