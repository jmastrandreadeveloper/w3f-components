export const BAR_CHART_CLASSES = {
  root: 'w3f-chart w3f-bar-chart',
  unstyled: 'w3f-chart w3f-bar-chart w3f-bar-chart--unstyled',
  container: 'w3f-chart__container',
} as const;

export const BAR_CHART_DEFAULTS = {
  width: 400,
  height: 300,
  color: '#6366f1',
  horizontal: false,
  unstyled: false,
} as const;

export const BAR_CHART_MARGIN = {
  top: 20,
  right: 20,
  bottom: 40,
  left: 50,
} as const;

export const DEFAULT_COLOR_PALETTE = [
  '#6366f1', '#f59e0b', '#10b981', '#ef4444',
  '#8b5cf6', '#06b6d4', '#f97316', '#ec4899',
] as const;
