import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { scaleLinear } from '@visx/scale';
import { arc as d3arc } from 'd3-shape';
import type { PolarBarInnerProps } from './PolarBar.types';
import { POLAR_BAR_DEFAULTS } from './PolarBar.constants';
import { buildPolarBarClasses, buildTooltipContent } from './PolarBar.utils';
import { usePolarBarColors, usePolarBarInteraction } from './PolarBar.hooks';
import { ChartTooltip } from '../primitives/ChartTooltip';
import { ChartLegend } from '../primitives/ChartLegend';
import { BASE_CHART_CLASSES } from '../_base/constants';
import { ChartHeader } from '../_base/ChartHeader';

export const PolarBarInner: React.FC<PolarBarInnerProps> = (props) => {
    const {
        data, width, height, className,
        unstyled = POLAR_BAR_DEFAULTS.unstyled, bindId, ariaLabel, description, colorScheme, title, subtitle,
        showLabels = POLAR_BAR_DEFAULTS.showLabels,
        showTooltip = POLAR_BAR_DEFAULTS.showTooltip,
        showLegend = POLAR_BAR_DEFAULTS.showLegend,
        padAngle = POLAR_BAR_DEFAULTS.padAngle,
        cornerRadius = POLAR_BAR_DEFAULTS.cornerRadius,
        innerRadius: innerRadiusRatio = POLAR_BAR_DEFAULTS.innerRadius,
        onHover, onSelect,
    } = props;

    const colors = usePolarBarColors(data.length, colorScheme);
    const { hoveredIndex, handleEnter, handleLeave, handleClick } = usePolarBarInteraction(onHover, onSelect);

    const classes = useMemo(() => buildPolarBarClasses(className, unstyled), [className, unstyled]);

    const legendHeight = showLegend ? 36 : 0;
    const svgHeight = height - legendHeight;
    const radius = Math.min(width, svgHeight) / 2 * 0.85;
    const innerR = radius * innerRadiusRatio;
    const cx = width / 2;
    const cy = svgHeight / 2;

    const maxValue = useMemo(() => Math.max(...data.map(d => d.value), 1), [data]);

    const radiusScale = useMemo(() => scaleLinear<number>({
        domain: [0, maxValue],
        range: [innerR, radius],
    }), [maxValue, innerR, radius]);

    const arcGen = useMemo(() => d3arc<any>().cornerRadius(cornerRadius), [cornerRadius]);

    const sliceAngle = data.length > 0 ? (2 * Math.PI) / data.length : 0;

    const legendItems = useMemo(
        () => data.map((d, i) => ({ id: String(d.label), label: String(d.label), color: colors[i] })),
        [data, colors],
    );

    if (data.length === 0) {
        return (
            <div className={classes}>
                <svg width={width} height={svgHeight} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Empty polar bar'} />
            </div>
        );
    }

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            <div className={BASE_CHART_CLASSES.container} style={{ position: 'relative' }}>
                <svg width={width} height={svgHeight} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Polar bar chart'}>
                    {description && <desc>{description}</desc>}
                    <Group top={cy} left={cx}>
                        {data.map((d, i) => {
                            const startAngle = i * sliceAngle;
                            const endAngle = startAngle + sliceAngle - padAngle;
                            const outerR = radiusScale(d.value);
                            const isHovered = hoveredIndex === i;
                            const opacity = hoveredIndex != null && !isHovered ? 0.5 : 1;

                            const pathStr = arcGen({
                                startAngle,
                                endAngle,
                                innerRadius: innerR,
                                outerRadius: outerR,
                            }) ?? '';

                            const midAngle = (startAngle + endAngle) / 2;
                            const labelR = radius + 14;
                            const lx = Math.cos(midAngle - Math.PI / 2) * labelR;
                            const ly = Math.sin(midAngle - Math.PI / 2) * labelR;

                            return (
                                <g
                                    key={String(d.label) + '-' + i}
                                    opacity={opacity}
                                    style={{ transition: 'opacity 120ms ease-out', cursor: onSelect ? 'pointer' : undefined }}
                                    onMouseEnter={() => handleEnter(d, i)}
                                    onMouseLeave={handleLeave}
                                    onClick={onSelect ? () => handleClick(d, i) : undefined}
                                >
                                    <path d={pathStr} fill={colors[i]} />
                                    {showLabels && (
                                        <text
                                            x={lx}
                                            y={ly}
                                            fontSize={10}
                                            fill="var(--w3f-text, #333)"
                                            fontWeight={500}
                                            textAnchor={midAngle > Math.PI ? 'end' : 'start'}
                                            dominantBaseline="central"
                                            pointerEvents="none"
                                        >
                                            {String(d.label)}
                                        </text>
                                    )}
                                </g>
                            );
                        })}
                    </Group>
                </svg>

                {showTooltip && hoveredIndex != null && (() => {
                    const d = data[hoveredIndex];
                    return (
                        <ChartTooltip left={cx} top={cy} visible offsetY={-radius - 12}>
                            {buildTooltipContent(d)}
                        </ChartTooltip>
                    );
                })()}
            </div>

            {showLegend && (
                <ChartLegend items={legendItems} direction="horizontal" />
            )}
        </div>
    );
};

PolarBarInner.displayName = 'PolarBarInner';
export default PolarBarInner;
