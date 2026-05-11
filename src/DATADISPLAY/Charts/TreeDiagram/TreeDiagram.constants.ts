export const TREE_DIAGRAM_ROOT_CLASS = 'w3f-chart-tree-diagram';

export const TREE_DIAGRAM_DEFAULTS = {
    layout: 'top-down' as const,
    showLabels: true,
    showTooltip: true,
    nodeRadius: 6,
    linkStroke: 'var(--w3f-border, #ccc)',
    unstyled: false,
} as const;
