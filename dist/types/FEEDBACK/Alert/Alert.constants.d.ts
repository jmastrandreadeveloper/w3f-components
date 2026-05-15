import type { AlertType, AlertPosition } from './Alert.types';
export declare const ALERT_DEFAULTS: {
    readonly duration: 5000;
    readonly type: AlertType;
    readonly dismissible: true;
    readonly position: AlertPosition;
    readonly round: string | boolean;
    readonly shadow: string | boolean;
    readonly border: string | string[] | boolean;
    readonly maxAlerts: 5;
};
export declare const ALERT_POSITIONS: Record<AlertPosition, string>;
export declare const SHOW_ALERT_EVENT = "alert:show";
//# sourceMappingURL=Alert.constants.d.ts.map