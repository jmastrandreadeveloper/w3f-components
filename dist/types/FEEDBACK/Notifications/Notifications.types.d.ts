import type React from 'react';
export type NotificationType = 'info' | 'success' | 'warning' | 'danger';
export type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
export interface NotificationItem {
    id: number;
    title?: React.ReactNode;
    message: React.ReactNode;
    type: NotificationType;
    duration: number;
    dismissible: boolean;
    icon?: React.ReactNode;
    showProgress: boolean;
}
export interface AddNotificationOptions {
    title?: React.ReactNode;
    message: React.ReactNode;
    type?: NotificationType;
    duration?: number;
    dismissible?: boolean;
    icon?: React.ReactNode;
    showProgress?: boolean;
}
export interface NotificationContextValue {
    notifications: NotificationItem[];
    addNotification: (options: AddNotificationOptions) => number;
    removeNotification: (id: number) => void;
    clearAll: () => void;
}
export interface NotificationProviderProps {
    children: React.ReactNode;
    position?: NotificationPosition;
    maxNotifications?: number;
}
export interface DispatchNotificationOptions extends AddNotificationOptions {
}
export interface NotificationCardProps {
    notification: NotificationItem;
    onDismiss: (id: number) => void;
}
//# sourceMappingURL=Notifications.types.d.ts.map