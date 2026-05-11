export const SCATTER_PLOT_CLASSES = {
  root: 'w3f-chart w3f-scatter-plot',
  unstyled: 'w3f-chart w3f-scatter-plot w3f-scatter-plot--unstyled',
  container: 'w3f-chart__container',
} as const;

export const SCATTER_PLOT_DEFAULTS = {
  width: 400,
  height: 300,
  color: '#6366f1',
  defaultPointSize: 5,
  unstyled: false,
} as const;

export const SCATTER_PLOT_MARGIN = {
  top: 20,
  right: 20,
  bottom: 40,
  left: 50,
} as const;
