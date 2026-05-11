import type { AlertType, AlertPosition } from './Alert.types';

export const ALERT_DEFAULTS = {
  duration: 5000,
  type: 'info' as AlertType,
  dismissible: true,
  position: 'top-right' as AlertPosition,
  round: 'lg' as string | boolean,
  shadow: 'md' as string | boolean,
  border: false as string | string[] | boolean,
  maxAlerts: 5,
} as const;

export const ALERT_POSITIONS: Record<AlertPosition, string> = {
  'top-right': 'w3f-alert-container--top-right',
  'top-left': 'w3f-alert-container--top-left',
  'bottom-right': 'w3f-alert-container--bottom-right',
  'bottom-left': 'w3f-alert-container--bottom-left',
  'top-center': 'w3f-alert-container--top-center',
  'bottom-center': 'w3f-alert-container--bottom-center',
};

export const SHOW_ALERT_EVENT = 'alert:show';
