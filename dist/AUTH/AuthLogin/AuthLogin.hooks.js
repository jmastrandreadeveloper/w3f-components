import { useState, useCallback } from "react";
import { INITIAL_FORM_STATE } from "./AuthLogin.constants";
import {
  validateLoginForm,
  validateRegisterForm,
  validateForgotForm,
  hasErrors
} from "./AuthLogin.utils";
function useAuthForm(initialView = "login", onViewChange) {
  const [state, setState] = useState({
    ...INITIAL_FORM_STATE,
    view: initialView
  });
  const setField = useCallback(
    (key, value) => {
      setState((prev) => ({
        ...prev,
        [key]: value,
        // Clear specific field error on change
        fieldErrors: { ...prev.fieldErrors, [key]: void 0 }
      }));
    },
    []
  );
  const setEmail = useCallback((v) => setField("email", v), [setField]);
  const setPassword = useCallback((v) => setField("password", v), [setField]);
  const setConfirmPassword = useCallback(
    (v) => setField("confirmPassword", v),
    [setField]
  );
  const setName = useCallback((v) => setField("name", v), [setField]);
  const setRememberMe = useCallback((v) => setField("rememberMe", v), [setField]);
  const setAcceptTerms = useCallback((v) => setField("acceptTerms", v), [setField]);
  const toggleShowPassword = useCallback(() => {
    setState((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  }, []);
  const toggleShowConfirmPassword = useCallback(() => {
    setState((prev) => ({ ...prev, showConfirmPassword: !prev.showConfirmPassword }));
  }, []);
  const switchView = useCallback(
    (view) => {
      setState((prev) => ({
        ...prev,
        view,
        fieldErrors: {},
        password: "",
        confirmPassword: "",
        showPassword: false,
        showConfirmPassword: false
      }));
      onViewChange?.(view);
    },
    [onViewChange]
  );
  const validateLogin = useCallback(() => {
    const errors = validateLoginForm(state.email, state.password);
    setState((prev) => ({ ...prev, fieldErrors: errors }));
    return errors;
  }, [state.email, state.password]);
  const validateRegister = useCallback(() => {
    const errors = validateRegisterForm(
      state.name,
      state.email,
      state.password,
      state.confirmPassword,
      state.acceptTerms
    );
    setState((prev) => ({ ...prev, fieldErrors: errors }));
    return errors;
  }, [state.name, state.email, state.password, state.confirmPassword, state.acceptTerms]);
  const validateForgot = useCallback(() => {
    const errors = validateForgotForm(state.email);
    setState((prev) => ({ ...prev, fieldErrors: errors }));
    return errors;
  }, [state.email]);
  const tryLogin = useCallback(() => {
    const errors = validateLoginForm(state.email, state.password);
    setState((prev) => ({ ...prev, fieldErrors: errors }));
    return !hasErrors(errors);
  }, [state.email, state.password]);
  const tryRegister = useCallback(() => {
    const errors = validateRegisterForm(
      state.name,
      state.email,
      state.password,
      state.confirmPassword,
      state.acceptTerms
    );
    setState((prev) => ({ ...prev, fieldErrors: errors }));
    return !hasErrors(errors);
  }, [state.name, state.email, state.password, state.confirmPassword, state.acceptTerms]);
  const tryForgot = useCallback(() => {
    const errors = validateForgotForm(state.email);
    setState((prev) => ({ ...prev, fieldErrors: errors }));
    return !hasErrors(errors);
  }, [state.email]);
  return {
    state,
    setEmail,
    setPassword,
    setConfirmPassword,
    setName,
    setRememberMe,
    setAcceptTerms,
    toggleShowPassword,
    toggleShowConfirmPassword,
    switchView,
    validateLogin,
    validateRegister,
    validateForgot,
    tryLogin,
    tryRegister,
    tryForgot
  };
}
export {
  useAuthForm
};
//# sourceMappingURL=AuthLogin.hooks.js.map
