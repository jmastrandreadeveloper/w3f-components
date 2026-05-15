import { useState, useCallback } from "react";
import { SNACKBAR_DEFAULTS } from "./Snackbar.constants";
function useSnackbar(options = {}) {
  const {
    defaultDuration = SNACKBAR_DEFAULTS.autoHideDuration,
    defaultVariant = SNACKBAR_DEFAULTS.variant
  } = options;
  const [state, setState] = useState({
    show: false,
    message: "",
    variant: defaultVariant,
    duration: defaultDuration
  });
  const showSnackbar = useCallback((message, config = {}) => {
    setState({
      show: true,
      message,
      variant: config.variant || defaultVariant,
      duration: config.duration || defaultDuration,
      anchorOrigin: config.anchorOrigin,
      action: config.action
    });
  }, [defaultVariant, defaultDuration]);
  const closeSnackbar = useCallback(() => {
    setState((prev) => ({ ...prev, show: false }));
  }, []);
  const showSuccess = useCallback((message, config = {}) => {
    showSnackbar(message, { ...config, variant: "success" });
  }, [showSnackbar]);
  const showWarning = useCallback((message, config = {}) => {
    showSnackbar(message, { ...config, variant: "warning" });
  }, [showSnackbar]);
  const showDanger = useCallback((message, config = {}) => {
    showSnackbar(message, { ...config, variant: "danger" });
  }, [showSnackbar]);
  const showInfo = useCallback((message, config = {}) => {
    showSnackbar(message, { ...config, variant: "info" });
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
    showInfo
  };
}
var Snackbar_hooks_default = useSnackbar;
export {
  Snackbar_hooks_default as default
};
//# sourceMappingURL=Snackbar.hooks.js.map
