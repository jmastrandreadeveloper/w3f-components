import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { Pie as VisxPie } from '@visx/shape';
import type { PieInnerProps } from './Pie.types';
import { PIE_DEFAULTS } from './Pie.constants';
import { buildPieClasses, buildTooltipContent, centroidAngle, labelFits } from './Pie.utils';
import { usePieAccessors, usePieColors, usePieInteraction } from './Pie.hooks';
import { ChartTooltip } from '../primitives/ChartTooltip';
import { ChartLegend } from '../primitives/ChartLegend';
import { BASE_CHART_CLASSES } from '../_base/constants';
import { ChartHeader } from '../_base/ChartHeader';

export const PieInner: React.FC<PieInnerProps> = (props) => {
    const {
        data, width, height, className,
        unstyled = PIE_DEFAULTS.unstyled, bindId, ariaLabel, description, colorScheme, title, subtitle,
        getValue: gvp, getLabel: glp,
        innerRadius: innerRadioProp = PIE_DEFAULTS.innerRadius,
        padAngle = PIE_DEFAULTS.padAngle,
        cornerRadius = PIE_DEFAULTS.cornerRadius,
        showLabels = PIE_DEFAULTS.showLabels,
        showTooltip = PIE_DEFAULTS.showTooltip,
        showLegend = PIE_DEFAULTS.showLegend,
        onHover, onSelect,
        highlightIndex = null,
    } = props;

    const { getValue, getLabel } = usePieAccessors(gvp, glp);
    const colors = usePieColors(data, colorScheme);
    const { hoveredIndex, handleEnter, handleLeave, handleClick } = usePieInteraction(onHover, onSelect);

    const classes = useMemo(() => buildPieClasses(className, unstyled), [className, unstyled]);

    const legendHeight = showLegend ? 36 : 0;
    const svgHeight = height - legendHeight;
    const radius = Math.min(width, svgHeight) / 2 * 0.85;
    const innerR = radius * innerRadioProp;
    const cx = width / 2;
    const cy = svgHeight / 2;

    const legendItems = useMemo(
        () => data.map((d, i) => ({ id: d.id, label: d.label, color: colors[i] })),
        [data, colors],
    );

    if (data.length === 0) {
        return (
            <div className={classes}>
                <svg width={width} height={svgHeight} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Empty pie chart'} />
            </div>
        );
    }

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            <div className={BASE_CHART_CLASSES.container} style={{ position: 'relative' }}>
                <svg width={width} height={svgHeight} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Pie chart'}>
                    {description && <desc>{description}</desc>}
                    <Group top={cy} left={cx}>
                        <VisxPie
                            data={[...data]}
                            pieValue={getValue}
                            outerRadius={radius}
                            innerRadius={innerR}
                            padAngle={padAngle}
                            cornerRadius={cornerRadius}
                        >
                            {(pie) =>
                                pie.arcs.map((arc, i) => {
                                    const d = arc.data;
                                    const isHighlighted = highlightIndex != null && highlightIndex === i;
                                    const opacity = highlightIndex != null
                                        ? (isHighlighted ? 1 : 0.3)
                                        : (hoveredIndex != null && hoveredIndex !== i ? 0.5 : 1);
                                    const path = pie.path(arc) ?? '';

                                    // Centroid for label
                                    const [lx, ly] = pie.path.centroid(arc);

                                    return (
                                        <g
                                            key={d.id}
                                            opacity={opacity}
                                            style={{ transition: 'opacity 120ms ease-out', cursor: onSelect ? 'pointer' : undefined }}
                                            onMouseEnter={() => handleEnter(d, i)}
                                            onMouseLeave={handleLeave}
                                            onClick={onSelect ? () => handleClick(d, i) : undefined}
                                        >
                                            <path
                                                d={path}
                                                fill={colors[i]}
                                                stroke={isHighlighted ? '#fff' : undefined}
                                                strokeWidth={isHighlighted ? 2 : undefined}
                                            />
                                            {showLabels && labelFits(arc.startAngle, arc.endAngle) && (
                                                <text
                                                    x={lx}
                                                    y={ly}
                                                    fill="#fff"
                                                    fontSize={11}
                                                    fontWeight={600}
                                                    textAnchor="middle"
                                                    dominantBaseline="central"
                                                    pointerEvents="none"
                                                >
                                                    {getLabel(d)}
                                                </text>
                                            )}
                                        </g>
                                    );
                                })
                            }
                        </VisxPie>
                    </Group>
                </svg>

                {showTooltip && hoveredIndex != null && (() => {
                    const d = data[hoveredIndex];
                    return (
                        <ChartTooltip left={cx} top={cy} visible offsetY={-radius - 12}>
                            {buildTooltipContent(d, getValue)}
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

PieInner.displayName = 'PieInner';
export default PieInner;
