export const TREEMAP_CHART_CLASSES = {
  root: 'w3f-chart w3f-treemap-chart',
  unstyled: 'w3f-chart w3f-treemap-chart w3f-treemap-chart--unstyled',
  container: 'w3f-chart__container',
} as const;

export const TREEMAP_CHART_DEFAULTS = {
  width: 400,
  height: 300,
  unstyled: false,
} as const;

export const DEFAULT_TREEMAP_COLORS = [
  '#6366f1', '#f59e0b', '#10b981', '#ef4444',
  '#8b5cf6', '#06b6d4', '#f97316', '#ec4899',
] as const;
