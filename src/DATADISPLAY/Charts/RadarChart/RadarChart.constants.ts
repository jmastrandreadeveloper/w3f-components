export const RADAR_CHART_CLASSES = {
  root: 'w3f-chart w3f-radar-chart',
  unstyled: 'w3f-chart w3f-radar-chart w3f-radar-chart--unstyled',
  container: 'w3f-chart__container',
} as const;

export const RADAR_CHART_DEFAULTS = {
  width: 400,
  height: 400,
  color: '#6366f1',
  unstyled: false,
} as const;

export const RADAR_CHART_MARGIN = {
  top: 40,
  right: 40,
  bottom: 40,
  left: 40,
} as const;
