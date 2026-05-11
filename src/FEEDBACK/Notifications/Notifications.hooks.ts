import { useContext, useCallback } from 'react';
import { NotificationContext } from './Notifications';
import type {
    NotificationContextValue,
    DispatchNotificationOptions,
} from './Notifications.types';
import { SHOW_NOTIFICATION_EVENT, NOTIFICATION_DEFAULTS } from './Notifications.constants';

/**
 * Hook del contexto para usar dentro de NotificationProvider.
 * Retorna { notifications, addNotification, removeNotification, clearAll }
 */
export const useNotification = (): NotificationContextValue => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification debe ser usado dentro de un NotificationProvider');
    }
    return context;
};

/**
 * Función para disparar notificaciones via CustomEvent (sin necesidad de contexto).
 * Útil para llamar desde servicios, interceptors, o cualquier parte de la app.
 */
export const dispatchNotification = (options: DispatchNotificationOptions): void => {
    const event = new CustomEvent(SHOW_NOTIFICATION_EVENT, {
        detail: {
            title: options.title,
            message: options.message,
            type: options.type ?? NOTIFICATION_DEFAULTS.type,
            duration: options.duration ?? NOTIFICATION_DEFAULTS.duration,
            dismissible: options.dismissible ?? NOTIFICATION_DEFAULTS.dismissible,
            icon: options.icon,
            showProgress: options.showProgress ?? NOTIFICATION_DEFAULTS.showProgress,
        },
    });
    window.dispatchEvent(event);
};

/**
 * Hook alternativo que retorna la función dispatchNotification.
 * No requiere contexto, usa CustomEvents.
 */
export const useNotificationEvent = (): ((options: DispatchNotificationOptions) => void) => {
    return useCallback((options: DispatchNotificationOptions) => {
        dispatchNotification(options);
    }, []);
};
