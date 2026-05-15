import React from 'react';
import type { AlertProviderProps, AlertContextValue } from './Alert.types';
export type { AlertType, AlertPosition, AlertItem, AddAlertOptions, AlertContextValue, AlertProviderProps, DispatchAlertOptions, } from './Alert.types';
export declare const AlertContext: React.Context<AlertContextValue | null>;
/**
 * AlertProvider - Gestiona y renderiza alertas tipo toast.
 * Soporta tanto Context API (addAlert) como CustomEvents (dispatchAlert).
 */
declare const AlertProvider: React.FC<AlertProviderProps>;
export { AlertProvider };
export default AlertProvider;
//# sourceMappingURL=Alert.d.ts.map