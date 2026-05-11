export const LINE_CHART_CLASSES = {
  root: 'w3f-chart w3f-line-chart',
  unstyled: 'w3f-chart w3f-line-chart w3f-line-chart--unstyled',
  container: 'w3f-chart__container',
} as const;

export const LINE_CHART_DEFAULTS = {
  width: 400,
  height: 300,
  color: '#6366f1',
  curved: true,
  showDots: true,
  unstyled: false,
} as const;

export const LINE_CHART_MARGIN = {
  top: 20,
  right: 20,
  bottom: 40,
  left: 50,
} as const;
