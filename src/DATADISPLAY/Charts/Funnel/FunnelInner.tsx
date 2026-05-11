import React, { useMemo } from 'react';
import type { FunnelInnerProps } from './Funnel.types';
import { FUNNEL_DEFAULTS } from './Funnel.constants';
import { buildFunnelClasses, buildSegmentPath, buildTooltipContent } from './Funnel.utils';
import { useFunnelSegments, useFunnelColors, useFunnelInteraction } from './Funnel.hooks';
import { ChartTooltip } from '../primitives/ChartTooltip';
import { BASE_CHART_CLASSES } from '../_base/constants';
import { ChartHeader } from '../_base/ChartHeader';

export const FunnelInner: React.FC<FunnelInnerProps> = (props) => {
    const {
        data,
        width,
        height,
        className,
        unstyled = FUNNEL_DEFAULTS.unstyled,
        bindId,
        ariaLabel,
        description,
        colorScheme, title, subtitle,
        showLabels = FUNNEL_DEFAULTS.showLabels,
        showPercentage = FUNNEL_DEFAULTS.showPercentage,
        showTooltip = FUNNEL_DEFAULTS.showTooltip,
        gap = FUNNEL_DEFAULTS.gap,
        formatValue,
        onHover,
        onSelect,
        highlightIndex = null,
    } = props;

    const segments = useFunnelSegments(data, width, height, gap);
    const colors = useFunnelColors(data, colorScheme);
    const { hoveredIndex, handleEnter, handleLeave, handleClick } = useFunnelInteraction(onHover, onSelect);

    const classes = useMemo(() => buildFunnelClasses(className, unstyled), [className, unstyled]);

    if (data.length === 0) {
        return (
            <div className={classes}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Empty funnel chart'} />
            </div>
        );
    }

    const centerX = width / 2;

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            <div className={BASE_CHART_CLASSES.container} style={{ position: 'relative' }}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Funnel chart'}>
                    {description && <desc>{description}</desc>}

                    {segments.map((seg, i) => (
                        <g key={i}>
                            <path
                                d={buildSegmentPath(seg)}
                                fill={colors[i]}
                                opacity={
                                    highlightIndex != null
                                        ? (highlightIndex === i ? 1 : 0.3)
                                        : hoveredIndex != null && hoveredIndex !== i ? 0.4 : 0.85
                                }
                                stroke={highlightIndex === i ? '#fff' : undefined}
                                strokeWidth={highlightIndex === i ? 2 : undefined}
                                onMouseEnter={() => handleEnter(seg.datum, i)}
                                onMouseLeave={handleLeave}
                                onClick={onSelect ? () => handleClick(seg.datum, i) : undefined}
                                style={{ cursor: highlightIndex === i ? 'pointer' : onSelect ? 'pointer' : 'default', transition: 'opacity 120ms ease-out' }}
                            />
                            {showLabels && (
                                <text
                                    x={centerX}
                                    y={seg.y + seg.height / 2}
                                    dy="0.35em"
                                    textAnchor="middle"
                                    fontSize={12}
                                    fontWeight={600}
                                    fill="#fff"
                                    pointerEvents="none"
                                >
                                    {seg.datum.label}
                                    {showPercentage && ` (${seg.percentage.toFixed(0)}%)`}
                                </text>
                            )}
                        </g>
                    ))}
                </svg>

                {showTooltip && hoveredIndex != null && segments[hoveredIndex] && (
                    <ChartTooltip
                        left={centerX}
                        top={segments[hoveredIndex].y}
                        visible
                        offsetY={-16}
                    >
                        {buildTooltipContent(segments[hoveredIndex].datum, segments[hoveredIndex].percentage, formatValue)}
                    </ChartTooltip>
                )}
            </div>
        </div>
    );
};

FunnelInner.displayName = 'FunnelInner';
export default FunnelInner;
