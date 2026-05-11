import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { Pack as VisxPack, hierarchy } from '@visx/hierarchy';
import type { PackInnerProps } from './Pack.types';
import { PACK_DEFAULTS } from './Pack.constants';
import { buildPackClasses, buildTooltipContent } from './Pack.utils';
import { usePackColors, usePackInteraction } from './Pack.hooks';
import { ChartTooltip } from '../primitives/ChartTooltip';
import { BASE_CHART_CLASSES } from '../_base/constants';
import { ChartHeader } from '../_base/ChartHeader';

export const PackInner: React.FC<PackInnerProps> = (props) => {
    const {
        data, width, height, className,
        unstyled = PACK_DEFAULTS.unstyled, bindId, ariaLabel, description, colorScheme, title, subtitle,
        showLabels = PACK_DEFAULTS.showLabels,
        showTooltip = PACK_DEFAULTS.showTooltip,
        circlePadding = PACK_DEFAULTS.circlePadding,
        onHover, onSelect,
    } = props;

    const root = useMemo(() =>
        hierarchy(data)
            .sum((d) => d.value ?? 0)
            .sort((a, b) => (b.value ?? 0) - (a.value ?? 0)),
        [data],
    );

    const leaves = useMemo(() => root.leaves(), [root]);
    const colors = usePackColors(leaves.length, colorScheme);
    const { hoveredIndex, handleEnter, handleLeave, handleClick } = usePackInteraction(onHover, onSelect);

    const classes = useMemo(() => buildPackClasses(className, unstyled), [className, unstyled]);

    if (leaves.length === 0) {
        return (
            <div className={classes}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Empty pack chart'} />
            </div>
        );
    }

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            <div className={BASE_CHART_CLASSES.container} style={{ position: 'relative' }}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Circle pack chart'}>
                    {description && <desc>{description}</desc>}
                    <VisxPack
                        root={root}
                        size={[width, height]}
                        padding={circlePadding}
                    >
                        {(pack) => {
                            const leafNodes = pack.descendants().filter((n) => !n.children);
                            return (
                                <Group>
                                    {/* Parent circles (transparent containers) */}
                                    {pack.descendants().filter((n) => n.children && n.depth > 0).map((node, i) => (
                                        <circle
                                            key={'p-' + i}
                                            cx={node.x}
                                            cy={node.y}
                                            r={node.r}
                                            fill="none"
                                            stroke="var(--w3f-chart-grid-stroke, #e2e8f0)"
                                            strokeWidth={1}
                                            strokeDasharray="3 3"
                                        />
                                    ))}

                                    {/* Leaf circles */}
                                    {leafNodes.map((node, i) => {
                                        const d = node.data;
                                        const isHovered = hoveredIndex === i;
                                        const opacity = hoveredIndex != null && !isHovered ? 0.5 : 1;

                                        return (
                                            <g
                                                key={d.id + '-' + i}
                                                opacity={opacity}
                                                style={{ transition: 'opacity 120ms ease-out', cursor: onSelect ? 'pointer' : undefined }}
                                                onMouseEnter={() => handleEnter(d, i)}
                                                onMouseLeave={handleLeave}
                                                onClick={onSelect ? () => handleClick(d, i) : undefined}
                                            >
                                                <circle
                                                    cx={node.x}
                                                    cy={node.y}
                                                    r={node.r}
                                                    fill={colors[i]}
                                                    fillOpacity={0.75}
                                                />
                                                {showLabels && node.r > 14 && (
                                                    <text
                                                        x={node.x}
                                                        y={node.y}
                                                        textAnchor="middle"
                                                        dominantBaseline="central"
                                                        fontSize={Math.min(11, node.r * 0.45)}
                                                        fill="#fff"
                                                        fontWeight={500}
                                                        pointerEvents="none"
                                                    >
                                                        {(d.label ?? d.id).slice(0, Math.floor(node.r / 4))}
                                                    </text>
                                                )}
                                            </g>
                                        );
                                    })}
                                </Group>
                            );
                        }}
                    </VisxPack>
                </svg>

                {showTooltip && hoveredIndex != null && (() => {
                    const leafNodes = root.leaves();
                    const node = leafNodes[hoveredIndex];
                    if (!node) return null;
                    return (
                        <ChartTooltip
                            left={node.x ?? 0}
                            top={(node.y ?? 0) - (node.r ?? 0)}
                            visible offsetY={-12}
                        >
                            {buildTooltipContent(node.data)}
                        </ChartTooltip>
                    );
                })()}
            </div>
        </div>
    );
};

PackInner.displayName = 'PackInner';
export default PackInner;
