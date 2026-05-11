import { useContext, useCallback } from 'react';
import { AlertContext } from './Alert';
import type { AlertContextValue, DispatchAlertOptions } from './Alert.types';
import { SHOW_ALERT_EVENT, ALERT_DEFAULTS } from './Alert.constants';

/**
 * Hook del contexto para usar dentro de AlertProvider.
 * Retorna { alerts, addAlert, removeAlert }
 */
export const useAlert = (): AlertContextValue => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert debe ser usado dentro de un AlertProvider');
  }
  return context;
};

/**
 * Función para disparar alertas via CustomEvent (sin necesidad de contexto).
 */
export const dispatchAlert = (options: DispatchAlertOptions): void => {
  const event = new CustomEvent(SHOW_ALERT_EVENT, {
    detail: {
      message: options.message,
      type: options.type ?? ALERT_DEFAULTS.type,
      duration: options.duration ?? ALERT_DEFAULTS.duration,
      dismissible: options.dismissible ?? ALERT_DEFAULTS.dismissible,
      icon: options.icon,
      round: options.round ?? ALERT_DEFAULTS.round,
      shadow: options.shadow ?? ALERT_DEFAULTS.shadow,
      border: options.border ?? ALERT_DEFAULTS.border,
    },
  });
  window.dispatchEvent(event);
};

/**
 * Hook alternativo que retorna la función dispatchAlert.
 * No requiere contexto, usa CustomEvents.
 */
export const useAlertEvent = (): ((options: DispatchAlertOptions) => void) => {
  return useCallback((options: DispatchAlertOptions) => {
    dispatchAlert(options);
  }, []);
};
