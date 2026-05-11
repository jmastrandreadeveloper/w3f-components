import type { AlertPosition } from './Alert.types';
import { ALERT_POSITIONS } from './Alert.constants';

export function buildAlertContainerClasses(position: AlertPosition, className?: string): string {
  return [
    'w3f-alert-container',
    ALERT_POSITIONS[position] || ALERT_POSITIONS['top-right'],
    className,
  ].filter(Boolean).join(' ');
}

export function generateAlertId(): number {
  return Date.now() + Math.random();
}
