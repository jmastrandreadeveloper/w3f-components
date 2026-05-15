import type { NotificationContextValue, DispatchNotificationOptions } from './Notifications.types';
/**
 * Hook del contexto para usar dentro de NotificationProvider.
 * Retorna { notifications, addNotification, removeNotification, clearAll }
 */
export declare const useNotification: () => NotificationContextValue;
/**
 * Función para disparar notificaciones via CustomEvent (sin necesidad de contexto).
 * Útil para llamar desde servicios, interceptors, o cualquier parte de la app.
 */
export declare const dispatchNotification: (options: DispatchNotificationOptions) => void;
/**
 * Hook alternativo que retorna la función dispatchNotification.
 * No requiere contexto, usa CustomEvents.
 */
export declare const useNotificationEvent: () => ((options: DispatchNotificationOptions) => void);
//# sourceMappingURL=Notifications.hooks.d.ts.map