import React, { createContext, useState, useCallback, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Note from '../../DATADISPLAY/Note/Note';
import type {
  AlertProviderProps,
  AlertContextValue,
  AlertItem,
  AddAlertOptions,
  AlertPosition,
} from './Alert.types';
import { ALERT_DEFAULTS, SHOW_ALERT_EVENT } from './Alert.constants';
import { buildAlertContainerClasses, generateAlertId } from './Alert.utils';

export type {
  AlertType,
  AlertPosition,
  AlertItem,
  AddAlertOptions,
  AlertContextValue,
  AlertProviderProps,
  DispatchAlertOptions,
} from './Alert.types';

// Contexto exportado para ser usado por el hook useAlert
export const AlertContext = createContext<AlertContextValue | null>(null);

/**
 * AlertProvider - Gestiona y renderiza alertas tipo toast.
 * Soporta tanto Context API (addAlert) como CustomEvents (dispatchAlert).
 */
const AlertProvider: React.FC<AlertProviderProps> = ({
  children,
  position = ALERT_DEFAULTS.position,
  maxAlerts = ALERT_DEFAULTS.maxAlerts,
}) => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  const removeAlert = useCallback((id: number) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  const addAlert = useCallback((options: AddAlertOptions): number => {
    const id = generateAlertId();
    const newAlert: AlertItem = {
      id,
      message: options.message,
      type: options.type ?? ALERT_DEFAULTS.type,
      duration: options.duration ?? ALERT_DEFAULTS.duration,
      dismissible: options.dismissible ?? ALERT_DEFAULTS.dismissible,
      icon: options.icon,
      round: options.round ?? ALERT_DEFAULTS.round,
      shadow: options.shadow ?? ALERT_DEFAULTS.shadow,
      border: options.border ?? ALERT_DEFAULTS.border,
    };

    setAlerts((prev) => {
      const updated = [...prev, newAlert];
      return updated.length > maxAlerts ? updated.slice(-maxAlerts) : updated;
    });

    if (newAlert.duration > 0) {
      setTimeout(() => removeAlert(id), newAlert.duration);
    }

    return id;
  }, [maxAlerts, removeAlert]);

  // Listener para CustomEvents (dispatchAlert)
  useEffect(() => {
    const handleEvent = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail) addAlert(detail as AddAlertOptions);
    };
    window.addEventListener(SHOW_ALERT_EVENT, handleEvent);
    return () => window.removeEventListener(SHOW_ALERT_EVENT, handleEvent);
  }, [addAlert]);

  const contextValue = useMemo<AlertContextValue>(
    () => ({ alerts, addAlert, removeAlert }),
    [alerts, addAlert, removeAlert]
  );

  const containerClasses = useMemo(
    () => buildAlertContainerClasses(position as AlertPosition),
    [position]
  );

  const alertPortal = useMemo(() => {
    if (alerts.length === 0) return null;

    return createPortal(
      <div className={containerClasses}>
        {alerts.map((alert) => (
          <div key={alert.id} className="w3f-alert-wrapper">
            <Note
              type={alert.type}
              dismissible={alert.dismissible}
              onDismiss={() => removeAlert(alert.id)}
              icon={alert.icon}
              round={alert.round}
              shadow={alert.shadow}
              border={alert.border}
            >
              {alert.message}
            </Note>
          </div>
        ))}
      </div>,
      document.body
    );
  }, [alerts, containerClasses, removeAlert]);

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
      {alertPortal}
    </AlertContext.Provider>
  );
};

AlertProvider.displayName = 'AlertProvider';

export { AlertProvider };
export default AlertProvider;
