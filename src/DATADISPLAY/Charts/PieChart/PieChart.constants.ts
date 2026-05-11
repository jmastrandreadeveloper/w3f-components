export const PIE_CHART_CLASSES = {
  root: 'w3f-chart w3f-pie-chart',
  unstyled: 'w3f-chart w3f-pie-chart w3f-pie-chart--unstyled',
  container: 'w3f-chart__container',
} as const;

export const PIE_CHART_DEFAULTS = {
  width: 300,
  height: 300,
  donut: false,
  unstyled: false,
} as const;

export const PIE_COLOR_PALETTE = [
  '#6366f1', '#f59e0b', '#10b981', '#ef4444',
  '#8b5cf6', '#06b6d4', '#f97316', '#ec4899',
] as const;
