import React, { useMemo } from 'react';
import type { NetworkInnerProps } from './Network.types';
import { NETWORK_DEFAULTS } from './Network.constants';
import { buildNetworkClasses, buildTooltipContent } from './Network.utils';
import {
    useNetworkLayout,
    useNetworkColors,
    useNetworkInteraction,
} from './Network.hooks';
import { ChartTooltip } from '../primitives/ChartTooltip';
import { BASE_CHART_CLASSES } from '../_base/constants';
import { ChartHeader } from '../_base/ChartHeader';

export const NetworkInner: React.FC<NetworkInnerProps> = (props) => {
    const {
        data,
        width,
        height,
        className,
        unstyled = NETWORK_DEFAULTS.unstyled,
        bindId,
        ariaLabel,
        description,
        colorScheme, title, subtitle,
        nodeRadius = NETWORK_DEFAULTS.nodeRadius,
        showLabels = NETWORK_DEFAULTS.showLabels,
        showTooltip = NETWORK_DEFAULTS.showTooltip,
        linkWidth = NETWORK_DEFAULTS.linkWidth,
        iterations = NETWORK_DEFAULTS.iterations,
        onHover,
        onSelect,
    } = props;

    const layout = useNetworkLayout(data, width, height, iterations);
    const colors = useNetworkColors(layout.nodes, colorScheme);
    const { hoveredIndex, handleEnter, handleLeave, handleClick } = useNetworkInteraction(onHover, onSelect);

    const classes = useMemo(() => buildNetworkClasses(className, unstyled), [className, unstyled]);

    // Build a node map for link rendering
    const nodeMap = useMemo(() => {
        const map = new Map<string, { x: number; y: number }>();
        for (const n of layout.nodes) {
            map.set(n.id, { x: n.x!, y: n.y! });
        }
        return map;
    }, [layout.nodes]);

    if (data.nodes.length === 0) {
        return (
            <div className={classes}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Empty network chart'} />
            </div>
        );
    }

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            <div className={BASE_CHART_CLASSES.container} style={{ position: 'relative' }}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Network chart'}>
                    {description && <desc>{description}</desc>}

                    {/* Links */}
                    {layout.links.map((link, i) => {
                        const s = nodeMap.get(link.source);
                        const t = nodeMap.get(link.target);
                        if (!s || !t) return null;
                        const isHighlighted = hoveredIndex != null && (
                            data.nodes[hoveredIndex]?.id === link.source ||
                            data.nodes[hoveredIndex]?.id === link.target
                        );
                        return (
                            <line
                                key={`link-${i}`}
                                x1={s.x}
                                y1={s.y}
                                x2={t.x}
                                y2={t.y}
                                stroke={isHighlighted ? 'var(--w3f-primary, #6366f1)' : '#94a3b8'}
                                strokeWidth={isHighlighted ? linkWidth * 2 : linkWidth}
                                strokeOpacity={hoveredIndex != null && !isHighlighted ? 0.2 : 0.6}
                                style={{ transition: 'stroke-opacity 120ms, stroke-width 120ms' }}
                            />
                        );
                    })}

                    {/* Nodes */}
                    {layout.nodes.map((node, i) => (
                        <g key={node.id}>
                            <circle
                                cx={node.x}
                                cy={node.y}
                                r={nodeRadius}
                                fill={colors[i]}
                                stroke="#fff"
                                strokeWidth={1.5}
                                opacity={hoveredIndex != null && hoveredIndex !== i ? 0.4 : 1}
                                onMouseEnter={() => handleEnter(node, i)}
                                onMouseLeave={handleLeave}
                                onClick={onSelect ? () => handleClick(node, i) : undefined}
                                style={{ cursor: onSelect ? 'pointer' : 'default', transition: 'opacity 120ms ease-out' }}
                            />
                            {showLabels && (
                                <text
                                    x={node.x}
                                    y={node.y! - nodeRadius - 4}
                                    textAnchor="middle"
                                    fontSize={10}
                                    fill="currentColor"
                                    pointerEvents="none"
                                    opacity={hoveredIndex != null && hoveredIndex !== i ? 0.3 : 0.8}
                                >
                                    {node.label ?? node.id}
                                </text>
                            )}
                        </g>
                    ))}
                </svg>

                {showTooltip && hoveredIndex != null && layout.nodes[hoveredIndex] && (
                    <ChartTooltip
                        left={layout.nodes[hoveredIndex].x!}
                        top={layout.nodes[hoveredIndex].y!}
                        visible
                        offsetY={-nodeRadius - 16}
                    >
                        {buildTooltipContent(layout.nodes[hoveredIndex])}
                    </ChartTooltip>
                )}
            </div>
        </div>
    );
};

NetworkInner.displayName = 'NetworkInner';
export default NetworkInner;
