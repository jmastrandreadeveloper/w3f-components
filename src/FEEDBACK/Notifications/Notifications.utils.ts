import type { NotificationPosition } from './Notifications.types';
import { NOTIFICATION_POSITIONS } from './Notifications.constants';

/**
 * Construye las clases CSS del contenedor de notificaciones según la posición.
 */
export function buildNotificationContainerClasses(
    position: NotificationPosition,
    className?: string
): string {
    return [
        'w3f-notification-container',
        NOTIFICATION_POSITIONS[position] || NOTIFICATION_POSITIONS['top-right'],
        className,
    ]
        .filter(Boolean)
        .join(' ');
}

/**
 * Genera un ID único para cada notificación.
 */
export function generateNotificationId(): number {
    return Date.now() + Math.random();
}

/**
 * Construye las clases CSS de una notificación individual.
 */
export function buildNotificationClasses(
    type: string,
    isExiting: boolean,
    className?: string
): string {
    return [
        'w3f-notification',
        `w3f-notification--${type}`,
        isExiting && 'w3f-notification--exit',
        className,
    ]
        .filter(Boolean)
        .join(' ');
}
