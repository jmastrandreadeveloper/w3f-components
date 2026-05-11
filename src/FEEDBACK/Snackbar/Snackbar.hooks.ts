import { useState, useCallback } from 'react';
import type {
  UseSnackbarOptions,
  UseSnackbarReturn,
  SnackbarState,
  ShowSnackbarConfig,
} from './Snackbar.types';
import { SNACKBAR_DEFAULTS } from './Snackbar.constants';

/**
 * Hook completo para gestionar el estado del Snackbar.
 * Incluye helpers para variantes comunes.
 */
function useSnackbar(options: UseSnackbarOptions = {}): UseSnackbarReturn {
  const {
    defaultDuration = SNACKBAR_DEFAULTS.autoHideDuration,
    defaultVariant = SNACKBAR_DEFAULTS.variant,
  } = options;

  const [state, setState] = useState<SnackbarState>({
    show: false,
    message: '',
    variant: defaultVariant,
    duration: defaultDuration,
  });

  const showSnackbar = useCallback((message: React.ReactNode, config: ShowSnackbarConfig = {}) => {
    setState({
      show: true,
      message,
      variant: config.variant || defaultVariant,
      duration: config.duration || defaultDuration,
      anchorOrigin: config.anchorOrigin,
      action: config.action,
    });
  }, [defaultVariant, defaultDuration]);

  const closeSnackbar = useCallback(() => {
    setState((prev) => ({ ...prev, show: false }));
  }, []);

  const showSuccess = useCallback((message: React.ReactNode, config: ShowSnackbarConfig = {}) => {
    showSnackbar(message, { ...config, variant: 'success' });
  }, [showSnackbar]);

  const showWarning = useCallback((message: React.ReactNode, config: ShowSnackbarConfig = {}) => {
    showSnackbar(message, { ...config, variant: 'warning' });
  }, [showSnackbar]);

  const showDanger = useCallback((message: React.ReactNode, config: ShowSnackbarConfig = {}) => {
    showSnackbar(message, { ...config, variant: 'danger' });
  }, [showSnackbar]);

  const showInfo = useCallback((message: React.ReactNode, config: ShowSnackbarConfig = {}) => {
    showSnackbar(message, { ...config, variant: 'info' });
  }, [showSnackbar]);

  return {
    show: state.show,
    message: state.message,
    variant: state.variant,
    duration: state.duration,
    anchorOrigin: state.anchorOrigin,
    action: state.action,
    showSnackbar,
    closeSnackbar,
    showSuccess,
    showWarning,
    showDanger,
    showInfo,
  };
}

export default useSnackbar;
