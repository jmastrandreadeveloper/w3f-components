import type React from 'react';
export type AlertType = 'info' | 'success' | 'warning' | 'danger';
export type AlertPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
export interface AlertItem {
    id: number;
    message: React.ReactNode;
    type: AlertType;
    duration: number;
    dismissible: boolean;
    icon?: React.ReactNode;
    round?: string | boolean;
    shadow?: string | boolean;
    border?: string | string[] | boolean;
}
export interface AddAlertOptions {
    message: React.ReactNode;
    type?: AlertType;
    duration?: number;
    dismissible?: boolean;
    icon?: React.ReactNode;
    round?: string | boolean;
    shadow?: string | boolean;
    border?: string | string[] | boolean;
}
export interface AlertContextValue {
    alerts: AlertItem[];
    addAlert: (options: AddAlertOptions) => number;
    removeAlert: (id: number) => void;
}
export interface AlertProviderProps {
    children: React.ReactNode;
    position?: AlertPosition;
    maxAlerts?: number;
}
export interface DispatchAlertOptions extends AddAlertOptions {
}
//# sourceMappingURL=Alert.types.d.ts.map