import type { AlertContextValue, DispatchAlertOptions } from './Alert.types';
/**
 * Hook del contexto para usar dentro de AlertProvider.
 * Retorna { alerts, addAlert, removeAlert }
 */
export declare const useAlert: () => AlertContextValue;
/**
 * Función para disparar alertas via CustomEvent (sin necesidad de contexto).
 */
export declare const dispatchAlert: (options: DispatchAlertOptions) => void;
/**
 * Hook alternativo que retorna la función dispatchAlert.
 * No requiere contexto, usa CustomEvents.
 */
export declare const useAlertEvent: () => ((options: DispatchAlertOptions) => void);
//# sourceMappingURL=Alert.hooks.d.ts.map