import React from 'react';
import type { NotificationProviderProps, NotificationContextValue } from './Notifications.types';
export type { NotificationType, NotificationPosition, NotificationItem, AddNotificationOptions, NotificationContextValue, NotificationProviderProps, DispatchNotificationOptions, } from './Notifications.types';
export { useNotification, dispatchNotification, useNotificationEvent } from './Notifications.hooks';
export declare const NotificationContext: React.Context<NotificationContextValue | null>;
declare const NotificationProvider: React.FC<NotificationProviderProps>;
export { NotificationProvider };
export default NotificationProvider;
//# sourceMappingURL=Notifications.d.ts.map