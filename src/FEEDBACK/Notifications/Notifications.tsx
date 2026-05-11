import React, { createContext, useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import type {
    NotificationProviderProps,
    NotificationContextValue,
    NotificationItem,
    AddNotificationOptions,
    NotificationPosition,
    NotificationCardProps,
    NotificationType,
} from './Notifications.types';
import { NOTIFICATION_DEFAULTS, SHOW_NOTIFICATION_EVENT } from './Notifications.constants';
import { buildNotificationContainerClasses, buildNotificationClasses, generateNotificationId } from './Notifications.utils';

const NOTIFICATION_ICON_MAP: Record<NotificationType, React.ReactNode> = {
    info: <Info size={20} />,
    success: <CheckCircle size={20} />,
    warning: <AlertTriangle size={20} />,
    danger: <XCircle size={20} />,
};

export type {
    NotificationType,
    NotificationPosition,
    NotificationItem,
    AddNotificationOptions,
    NotificationContextValue,
    NotificationProviderProps,
    DispatchNotificationOptions,
} from './Notifications.types';

// Re-export hooks
export { useNotification, dispatchNotification, useNotificationEvent } from './Notifications.hooks';

// Contexto exportado para ser usado por el hook useNotification
export const NotificationContext = createContext<NotificationContextValue | null>(null);

/* =====================================================================
   NotificationCard — Componente individual de notificación
   ===================================================================== */

const NotificationCard: React.FC<NotificationCardProps> = ({ notification, onDismiss }) => {
    const [isExiting, setIsExiting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [progress, setProgress] = useState(100);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const startTimeRef = useRef<number>(Date.now());
    const remainingRef = useRef<number>(notification.duration);
    const animFrameRef = useRef<number>(0);

    const handleDismiss = useCallback(() => {
        setIsExiting(true);
        setTimeout(() => {
            onDismiss(notification.id);
        }, NOTIFICATION_DEFAULTS.exitAnimationDuration);
    }, [notification.id, onDismiss]);

    // Progreso animado
    useEffect(() => {
        if (notification.duration <= 0 || !notification.showProgress) return;

        const updateProgress = () => {
            if (isPaused) return;
            const elapsed = Date.now() - startTimeRef.current;
            const total = notification.duration;
            const pct = Math.max(0, 100 - (elapsed / total) * 100);
            setProgress(pct);
            if (pct > 0) {
                animFrameRef.current = requestAnimationFrame(updateProgress);
            }
        };

        animFrameRef.current = requestAnimationFrame(updateProgress);
        return () => cancelAnimationFrame(animFrameRef.current);
    }, [notification.duration, notification.showProgress, isPaused]);

    // Auto-dismiss timer
    useEffect(() => {
        if (notification.duration <= 0 || isPaused) return;

        startTimeRef.current = Date.now();

        timerRef.current = setTimeout(() => {
            handleDismiss();
        }, remainingRef.current);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [notification.duration, isPaused, handleDismiss]);

    const handleMouseEnter = useCallback(() => {
        setIsPaused(true);
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            remainingRef.current = Math.max(0, remainingRef.current - (Date.now() - startTimeRef.current));
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsPaused(false);
    }, []);

    const cardClasses = useMemo(
        () => buildNotificationClasses(notification.type, isExiting),
        [notification.type, isExiting]
    );

    return (
        <div
            className={cardClasses}
            role="alert"
            aria-live="polite"
            aria-atomic="true"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Icono */}
            <div className="w3f-notification__icon">
                {notification.icon || NOTIFICATION_ICON_MAP[notification.type]}
            </div>

            {/* Contenido */}
            <div className="w3f-notification__content">
                {notification.title && (
                    <div className="w3f-notification__title">{notification.title}</div>
                )}
                <div className="w3f-notification__message">{notification.message}</div>
            </div>

            {/* Botón cerrar */}
            {notification.dismissible && (
                <button
                    className="w3f-notification__close"
                    onClick={handleDismiss}
                    aria-label="Cerrar notificación"
                    type="button"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            )}

            {/* Barra de progreso */}
            {notification.showProgress && notification.duration > 0 && (
                <div className="w3f-notification__progress-track">
                    <div
                        className="w3f-notification__progress-bar"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}
        </div>
    );
};

NotificationCard.displayName = 'NotificationCard';

/* =====================================================================
   NotificationProvider — Gestiona y renderiza notificaciones
   Soporta tanto Context API (addNotification) como CustomEvents (dispatchNotification).
   ===================================================================== */

const NotificationProvider: React.FC<NotificationProviderProps> = ({
    children,
    position = NOTIFICATION_DEFAULTS.position,
    maxNotifications = NOTIFICATION_DEFAULTS.maxNotifications,
}) => {
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);

    const removeNotification = useCallback((id: number) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    const clearAll = useCallback(() => {
        setNotifications([]);
    }, []);

    const addNotification = useCallback((options: AddNotificationOptions): number => {
        const id = generateNotificationId();
        const newNotification: NotificationItem = {
            id,
            title: options.title,
            message: options.message,
            type: options.type ?? NOTIFICATION_DEFAULTS.type,
            duration: options.duration ?? NOTIFICATION_DEFAULTS.duration,
            dismissible: options.dismissible ?? NOTIFICATION_DEFAULTS.dismissible,
            icon: options.icon,
            showProgress: options.showProgress ?? NOTIFICATION_DEFAULTS.showProgress,
        };

        setNotifications((prev) => {
            const updated = [...prev, newNotification];
            return updated.length > maxNotifications ? updated.slice(-maxNotifications) : updated;
        });

        return id;
    }, [maxNotifications]);

    // Listener para CustomEvents (dispatchNotification)
    useEffect(() => {
        const handleEvent = (e: Event) => {
            const detail = (e as CustomEvent).detail;
            if (detail) addNotification(detail as AddNotificationOptions);
        };
        window.addEventListener(SHOW_NOTIFICATION_EVENT, handleEvent);
        return () => window.removeEventListener(SHOW_NOTIFICATION_EVENT, handleEvent);
    }, [addNotification]);

    const contextValue = useMemo<NotificationContextValue>(
        () => ({ notifications, addNotification, removeNotification, clearAll }),
        [notifications, addNotification, removeNotification, clearAll]
    );

    const containerClasses = useMemo(
        () => buildNotificationContainerClasses(position as NotificationPosition),
        [position]
    );

    const notificationPortal = useMemo(() => {
        if (notifications.length === 0) return null;

        return createPortal(
            <div className={containerClasses}>
                {notifications.map((notification) => (
                    <NotificationCard
                        key={notification.id}
                        notification={notification}
                        onDismiss={removeNotification}
                    />
                ))}
            </div>,
            document.body
        );
    }, [notifications, containerClasses, removeNotification]);

    return (
        <NotificationContext.Provider value={contextValue}>
            {children}
            {notificationPortal}
        </NotificationContext.Provider>
    );
};

NotificationProvider.displayName = 'NotificationProvider';

export { NotificationProvider };
export default NotificationProvider;
