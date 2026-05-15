import type { NotificationType, NotificationPosition } from './Notifications.types';
export declare const NOTIFICATION_DEFAULTS: {
    readonly duration: 5000;
    readonly type: NotificationType;
    readonly dismissible: true;
    readonly position: NotificationPosition;
    readonly maxNotifications: 5;
    readonly showProgress: true;
    readonly exitAnimationDuration: 300;
};
export declare const NOTIFICATION_POSITIONS: Record<NotificationPosition, string>;
export declare const SHOW_NOTIFICATION_EVENT = "notification:show";
/**
 * Iconos SVG inline por tipo de notificación.
 * Se usan como fallback cuando no se provee un icono custom.
 */
export declare const NOTIFICATION_ICONS: Record<NotificationType, string>;
//# sourceMappingURL=Notifications.constants.d.ts.map