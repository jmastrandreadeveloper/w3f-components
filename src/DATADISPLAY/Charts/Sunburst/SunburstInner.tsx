import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { hierarchy } from '@visx/hierarchy';
import { partition } from 'd3-hierarchy';
import { scaleSqrt } from '@visx/scale';
import { arc as d3arc } from 'd3-shape';
import type { SunburstInnerProps } from './Sunburst.types';
import { SUNBURST_DEFAULTS } from './Sunburst.constants';
import { buildSunburstClasses, buildTooltipContent, arcLabelFits } from './Sunburst.utils';
import { useSunburstColors, useSunburstInteraction } from './Sunburst.hooks';
import { ChartTooltip } from '../primitives/ChartTooltip';
import { BASE_CHART_CLASSES } from '../_base/constants';
import { ChartHeader } from '../_base/ChartHeader';

export const SunburstInner: React.FC<SunburstInnerProps> = (props) => {
    const {
        data, width, height, className,
        unstyled = SUNBURST_DEFAULTS.unstyled, bindId, ariaLabel, description, colorScheme, title, subtitle,
        showLabels = SUNBURST_DEFAULTS.showLabels,
        showTooltip = SUNBURST_DEFAULTS.showTooltip,
        padAngle = SUNBURST_DEFAULTS.padAngle,
        cornerRadius = SUNBURST_DEFAULTS.cornerRadius,
        onHover, onSelect,
    } = props;

    const root = useMemo(() => {
        const r = hierarchy(data)
            .sum((d) => d.value ?? 0)
            .sort((a, b) => (b.value ?? 0) - (a.value ?? 0));
        return partition<typeof data>().size([2 * Math.PI, r.height + 1])(r);
    }, [data]);

    const nodes = useMemo(() => root.descendants().filter(d => d.depth > 0), [root]);
    const maxDepth = useMemo(() => Math.max(...nodes.map(n => n.depth), 1), [nodes]);

    const colors = useSunburstColors(nodes.length, colorScheme);
    const { hoveredIndex, handleEnter, handleLeave, handleClick } = useSunburstInteraction(onHover, onSelect);

    const classes = useMemo(() => buildSunburstClasses(className, unstyled), [className, unstyled]);

    const radius = Math.min(width, height) / 2 * 0.9;
    const cx = width / 2;
    const cy = height / 2;

    const yScale = useMemo(() => scaleSqrt({
        domain: [0, maxDepth + 1],
        range: [radius * 0.15, radius],
    }), [maxDepth, radius]);

    const arcGen = useMemo(() => d3arc<any>().cornerRadius(cornerRadius), [cornerRadius]);

    if (nodes.length === 0) {
        return (
            <div className={classes}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Empty sunburst'} />
            </div>
        );
    }

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            <div className={BASE_CHART_CLASSES.container} style={{ position: 'relative' }}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Sunburst chart'}>
                    {description && <desc>{description}</desc>}
                    <Group top={cy} left={cx}>
                        {nodes.map((node, i) => {
                            const innerR = yScale(node.depth);
                            const outerR = yScale(node.depth + 1);
                            const isHovered = hoveredIndex === i;
                            const opacity = hoveredIndex != null && !isHovered ? 0.5 : 1;
                            const d = node.data;
                            const startAngle = node.x0;
                            const endAngle = node.x1;

                            const pathStr = arcGen({
                                startAngle,
                                endAngle,
                                innerRadius: innerR,
                                outerRadius: outerR,
                                padAngle,
                            }) ?? '';

                            return (
                                <g
                                    key={d.id + '-' + i}
                                    opacity={opacity}
                                    style={{ transition: 'opacity 120ms ease-out', cursor: onSelect ? 'pointer' : undefined }}
                                    onMouseEnter={() => handleEnter(d, i)}
                                    onMouseLeave={handleLeave}
                                    onClick={onSelect ? () => handleClick(d, i) : undefined}
                                >
                                    <path d={pathStr} fill={colors[i]} />
                                    {showLabels && arcLabelFits(startAngle, endAngle, node.depth) && (() => {
                                        const angle = (startAngle + endAngle) / 2;
                                        const r = (innerR + outerR) / 2;
                                        const x = Math.cos(angle - Math.PI / 2) * r;
                                        const y = Math.sin(angle - Math.PI / 2) * r;
                                        const rotate = angle > Math.PI
                                            ? (angle * 180 / Math.PI) - 270
                                            : (angle * 180 / Math.PI) - 90;
                                        return (
                                            <text
                                                x={x}
                                                y={y}
                                                fontSize={10}
                                                fill="#fff"
                                                fontWeight={500}
                                                textAnchor="middle"
                                                dominantBaseline="central"
                                                pointerEvents="none"
                                                transform={`rotate(${rotate}, ${x}, ${y})`}
                                            >
                                                {d.label ?? d.id}
                                            </text>
                                        );
                                    })()}
                                </g>
                            );
                        })}
                    </Group>
                </svg>

                {showTooltip && hoveredIndex != null && (() => {
                    const node = nodes[hoveredIndex];
                    if (!node) return null;
                    return (
                        <ChartTooltip left={cx} top={cy} visible offsetY={-radius - 12}>
                            {buildTooltipContent(node.data)}
                        </ChartTooltip>
                    );
                })()}
            </div>
        </div>
    );
};

SunburstInner.displayName = 'SunburstInner';
export default SunburstInner;
