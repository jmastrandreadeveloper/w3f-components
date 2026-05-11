export const HEATMAP_CHART_CLASSES = {
  root: 'w3f-chart w3f-heatmap-chart',
  unstyled: 'w3f-chart w3f-heatmap-chart w3f-heatmap-chart--unstyled',
  container: 'w3f-chart__container',
} as const;

export const HEATMAP_CHART_DEFAULTS = {
  width: 400,
  height: 300,
  colors: ['#e0e7ff', '#6366f1'] as [string, string],
  unstyled: false,
} as const;

export const HEATMAP_CHART_MARGIN = {
  top: 20,
  right: 20,
  bottom: 40,
  left: 60,
} as const;
