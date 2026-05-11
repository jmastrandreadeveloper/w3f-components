import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { Treemap as VisxTreemap, hierarchy, treemapSquarify } from '@visx/hierarchy';
import type { TreemapInnerProps } from './Treemap.types';
import { TREEMAP_DEFAULTS } from './Treemap.constants';
import { buildTreemapClasses, buildTooltipContent, textFits, truncateLabel } from './Treemap.utils';
import { useTreemapColors, useTreemapInteraction } from './Treemap.hooks';
import { ChartTooltip } from '../primitives/ChartTooltip';
import { BASE_CHART_CLASSES } from '../_base/constants';
import { ChartHeader } from '../_base/ChartHeader';

export const TreemapInner: React.FC<TreemapInnerProps> = (props) => {
    const {
        data, width, height, className,
        unstyled = TREEMAP_DEFAULTS.unstyled, bindId, ariaLabel, description, colorScheme, title, subtitle,
        showLabels = TREEMAP_DEFAULTS.showLabels,
        showTooltip = TREEMAP_DEFAULTS.showTooltip,
        tilePadding = TREEMAP_DEFAULTS.tilePadding,
        tileRadius = TREEMAP_DEFAULTS.tileRadius,
        onHover, onSelect,
    } = props;

    const root = useMemo(() =>
        hierarchy(data)
            .sum((d) => d.value ?? 0)
            .sort((a, b) => (b.value ?? 0) - (a.value ?? 0)),
        [data],
    );

    const leaves = useMemo(() => root.leaves(), [root]);
    const colors = useTreemapColors(leaves.length, colorScheme);
    const { hoveredIndex, handleEnter, handleLeave, handleClick } = useTreemapInteraction(onHover, onSelect);

    const classes = useMemo(() => buildTreemapClasses(className, unstyled), [className, unstyled]);

    if (leaves.length === 0) {
        return (
            <div className={classes}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Empty treemap'} />
            </div>
        );
    }

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            <div className={BASE_CHART_CLASSES.container} style={{ position: 'relative' }}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Treemap'}>
                    {description && <desc>{description}</desc>}
                    <VisxTreemap
                        root={root}
                        size={[width, height]}
                        tile={treemapSquarify}
                        padding={tilePadding}
                    >
                        {(treemap) => (
                            <Group>
                                {treemap.descendants().filter((n) => !n.children).map((node, i) => {
                                    const w = node.x1 - node.x0;
                                    const h = node.y1 - node.y0;
                                    const d = node.data;
                                    const isHovered = hoveredIndex === i;
                                    const opacity = hoveredIndex != null && !isHovered ? 0.5 : 1;
                                    const label = d.label ?? d.id;

                                    return (
                                        <g
                                            key={d.id + '-' + i}
                                            opacity={opacity}
                                            style={{ transition: 'opacity 120ms ease-out', cursor: onSelect ? 'pointer' : undefined }}
                                            onMouseEnter={() => handleEnter(d, i)}
                                            onMouseLeave={handleLeave}
                                            onClick={onSelect ? () => handleClick(d, i) : undefined}
                                        >
                                            <rect
                                                x={node.x0}
                                                y={node.y0}
                                                width={w}
                                                height={h}
                                                fill={colors[i]}
                                                rx={tileRadius}
                                            />
                                            {showLabels && textFits(w, h) && (
                                                <text
                                                    x={node.x0 + 4}
                                                    y={node.y0 + 14}
                                                    fontSize={11}
                                                    fill="#fff"
                                                    fontWeight={500}
                                                    pointerEvents="none"
                                                >
                                                    {truncateLabel(label, w - 8)}
                                                </text>
                                            )}
                                        </g>
                                    );
                                })}
                            </Group>
                        )}
                    </VisxTreemap>
                </svg>

                {showTooltip && hoveredIndex != null && (() => {
                    const leafNodes = root.leaves();
                    const node = leafNodes[hoveredIndex];
                    if (!node) return null;
                    return (
                        <ChartTooltip
                            left={(node.x0 + node.x1) / 2}
                            top={node.y0}
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

TreemapInner.displayName = 'TreemapInner';
export default TreemapInner;
