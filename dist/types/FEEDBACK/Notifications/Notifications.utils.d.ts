import type { NotificationPosition } from './Notifications.types';
/**
 * Construye las clases CSS del contenedor de notificaciones según la posición.
 */
export declare function buildNotificationContainerClasses(position: NotificationPosition, className?: string): string;
/**
 * Genera un ID único para cada notificación.
 */
export declare function generateNotificationId(): number;
/**
 * Construye las clases CSS de una notificación individual.
 */
export declare function buildNotificationClasses(type: string, isExiting: boolean, className?: string): string;
//# sourceMappingURL=Notifications.utils.d.ts.map